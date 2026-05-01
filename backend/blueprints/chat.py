import uuid
from datetime import datetime
from flask import Blueprint, jsonify, request
from db import get_db
from middleware.auth import require_auth, require_admin

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chat')


@chat_bp.route('/mensaje', methods=['POST'])
@require_auth
def enviar_mensaje():
    """POST /api/chat/mensaje
    Body: { "contenido": str }
    Admin ademas: { "cliente_id": str }
    """
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 503

    payload = request.token_payload
    rol = payload.get('rol', 'cliente')
    user_id = payload.get('sub')

    data = request.get_json() or {}
    contenido = (data.get('contenido') or '').strip()

    if not contenido:
        return jsonify({"success": False, "message": "El mensaje no puede estar vacío"}), 400
    if len(contenido) > 2000:
        return jsonify({"success": False, "message": "El mensaje no puede superar 2000 caracteres"}), 400

    if rol in ('admin', 'superadmin'):
        cliente_id = data.get('cliente_id')
        if not cliente_id:
            return jsonify({"success": False, "message": "Falta cliente_id"}), 400
        remitente = 'admin'
    else:
        cliente_id = user_id
        remitente = 'cliente'

    mensaje = {
        "cliente_id": cliente_id,
        "remitente": remitente,
        "contenido": contenido,
        "timestamp": datetime.utcnow(),
        "leido": False,
    }
    result = db.mensajes.insert_one(mensaje)
    mensaje["_id"] = str(result.inserted_id)
    mensaje["timestamp"] = mensaje["timestamp"].isoformat()

    return jsonify({"success": True, "mensaje": mensaje}), 201


@chat_bp.route('/mensajes', methods=['GET'])
@require_auth
def get_mensajes():
    """GET /api/chat/mensajes?limit=50&before=<ISO>&cliente_id=<id> (cliente_id solo para admin)"""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 503

    payload = request.token_payload
    rol = payload.get('rol', 'cliente')
    user_id = payload.get('sub')

    try:
        limit = min(int(request.args.get('limit', 50)), 100)
    except (ValueError, TypeError):
        limit = 50
    before = request.args.get('before')

    if rol in ('admin', 'superadmin'):
        cliente_id = request.args.get('cliente_id')
        if not cliente_id:
            return jsonify({"success": False, "message": "Falta cliente_id"}), 400
    else:
        cliente_id = user_id

    query = {"cliente_id": cliente_id}
    if before:
        try:
            before_dt = datetime.fromisoformat(before)
            query["timestamp"] = {"$lt": before_dt}
        except ValueError:
            return jsonify({"success": False, "message": "Formato de fecha inválido"}), 400

    cursor = db.mensajes.find(query).sort("timestamp", 1).limit(limit)
    mensajes = []
    for m in cursor:
        m["_id"] = str(m["_id"])
        m["timestamp"] = m["timestamp"].isoformat()
        mensajes.append(m)

    return jsonify({"success": True, "mensajes": mensajes}), 200


@chat_bp.route('/unread-count', methods=['GET'])
@require_auth
def unread_count():
    """GET /api/chat/unread-count"""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 503

    payload = request.token_payload
    rol = payload.get('rol', 'cliente')
    user_id = payload.get('sub')

    if rol in ('admin', 'superadmin'):
        query = {"remitente": "cliente", "leido": False}
        count = db.mensajes.count_documents(query)
        clientes = len(db.mensajes.distinct("cliente_id", query))
        return jsonify({"success": True, "count": count, "clientes_con_mensajes": clientes}), 200
    else:
        count = db.mensajes.count_documents({
            "cliente_id": user_id,
            "remitente": "admin",
            "leido": False
        })
        return jsonify({"success": True, "count": count}), 200


@chat_bp.route('/marcar-leidos', methods=['PUT'])
@require_auth
def marcar_leidos():
    """PUT /api/chat/marcar-leidos
    Admin: Body { "cliente_id": str }
    """
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 503

    payload = request.token_payload
    rol = payload.get('rol', 'cliente')
    user_id = payload.get('sub')

    if rol in ('admin', 'superadmin'):
        data = request.get_json() or {}
        cliente_id = data.get('cliente_id')
        if not cliente_id:
            return jsonify({"success": False, "message": "Falta cliente_id"}), 400
        query = {"cliente_id": cliente_id, "remitente": "cliente", "leido": False}
    else:
        cliente_id = user_id
        query = {"cliente_id": cliente_id, "remitente": "admin", "leido": False}

    result = db.mensajes.update_many(query, {"$set": {"leido": True}})
    return jsonify({"success": True, "updated": result.modified_count}), 200


@chat_bp.route('/hilos', methods=['GET'])
@require_admin
def get_hilos():
    """GET /api/chat/hilos — Lista de todos los clientes con datos de mensajes si los hay."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 503

    # Agregar mensajes por cliente
    pipeline = [
        {"$sort": {"timestamp": -1}},
        {"$group": {
            "_id": "$cliente_id",
            "ultimo_mensaje": {"$first": "$contenido"},
            "ultimo_timestamp": {"$first": "$timestamp"},
            "unread_count": {
                "$sum": {
                    "$cond": [
                        {"$and": [{"$eq": ["$remitente", "cliente"]}, {"$eq": ["$leido", False]}]},
                        1, 0
                    ]
                }
            }
        }}
    ]
    mensajes_por_cliente = {h["_id"]: h for h in db.mensajes.aggregate(pipeline)}

    # Solo clientes que tienen al menos una automatización
    ids_con_automatizacion = db.Automatizaciones.distinct("identificador_propietario")
    clientes = list(db.Usuarios.find(
        {"rol": {"$in": ["cliente"]}, "identificador_unico_usuario": {"$in": ids_con_automatizacion}},
        {"identificador_unico_usuario": 1, "datos_perfil_comercial.nombre": 1, "_id": 0}
    ))

    hilos = []
    for c in clientes:
        cliente_id = c["identificador_unico_usuario"]
        nombre = c.get("datos_perfil_comercial", {}).get("nombre", "Cliente desconocido")
        m = mensajes_por_cliente.get(cliente_id)

        hilos.append({
            "cliente_id": cliente_id,
            "nombre_cliente": nombre,
            "ultimo_mensaje": m["ultimo_mensaje"] if m else None,
            "ultimo_timestamp": m["ultimo_timestamp"].isoformat() if m and m.get("ultimo_timestamp") else None,
            "unread_count": m["unread_count"] if m else 0,
        })

    # Ordenar: primero los que tienen mensajes (por timestamp), luego los sin mensajes (por nombre)
    hilos.sort(key=lambda h: (h["ultimo_timestamp"] is None, h["ultimo_timestamp"] or "", h["nombre_cliente"]))
    hilos.reverse() if any(h["ultimo_timestamp"] for h in hilos) else None

    # Ordenar correctamente: con mensajes primero (desc por timestamp), sin mensajes al final (asc por nombre)
    con_mensajes = sorted(
        [h for h in hilos if h["ultimo_timestamp"]],
        key=lambda h: h["ultimo_timestamp"],
        reverse=True
    )
    sin_mensajes = sorted(
        [h for h in hilos if not h["ultimo_timestamp"]],
        key=lambda h: h["nombre_cliente"]
    )

    return jsonify({"success": True, "hilos": con_mensajes + sin_mensajes}), 200


@chat_bp.route('/mi-admin', methods=['GET'])
@require_auth
def get_mi_admin():
    """GET /api/chat/mi-admin — Devuelve el nombre del admin asignado al cliente."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 503

    payload = request.token_payload
    user_id = payload.get('sub')

    automatizacion = db.Automatizaciones.find_one(
        {"identificador_propietario": user_id, "identificador_admin": {"$ne": None}},
        {"nombre_admin": 1, "_id": 0}
    )

    if automatizacion and automatizacion.get("nombre_admin"):
        return jsonify({"success": True, "nombre_admin": automatizacion["nombre_admin"]}), 200

    return jsonify({"success": True, "nombre_admin": None}), 200
