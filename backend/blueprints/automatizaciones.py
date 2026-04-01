import os
import uuid
from datetime import datetime
import stripe
from flask import Blueprint, jsonify, request
from db import get_db

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

automatizaciones_bp = Blueprint('automatizaciones', __name__, url_prefix='/api')


@automatizaciones_bp.route('/automatizaciones', methods=['POST'])
def crear_automatizacion():
    """POST /api/automatizaciones — Crea una automatización en estado 'pendiente_revision'.
    Verifica que el usuario exista y que no haya duplicado por id_cita_origen."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    data = request.get_json()

    required_fields = ['titulo', 'descripcion', 'tipo_automatizacion',
                       'email_propietario', 'nombre_propietario']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"success": False, "message": f"Falta el campo obligatorio: {field}"}), 400

    usuario = db.Usuarios.find_one({"correo_electronico_acceso": data['email_propietario']})
    if not usuario:
        return jsonify({"success": False, "message": "No existe un usuario con ese email"}), 404

    id_propietario = usuario['identificador_unico_usuario']

    id_cita_origen = data.get('id_cita_origen')
    if id_cita_origen:
        existente = db.Automatizaciones.find_one({"id_cita_origen": id_cita_origen})
        if existente:
            return jsonify({"success": False, "message": "Ya existe una automatización para esta cita"}), 409

    nueva_automatizacion = {
        "identificador_unico": str(uuid.uuid4()),
        "identificador_propietario": id_propietario,
        "email_propietario": data['email_propietario'],
        "nombre_propietario": data['nombre_propietario'],
        "titulo": data['titulo'],
        "descripcion": data['descripcion'],
        "tipo_automatizacion": data['tipo_automatizacion'],
        "estado": "pendiente_revision",
        "gasto_estimado": None,
        "motivo_rechazo": None,
        "id_cita_origen": data.get('id_cita_origen', None),
        "fecha_solicitud": datetime.utcnow(),
        "fecha_actualizacion": datetime.utcnow(),
    }

    try:
        db.Automatizaciones.insert_one(nueva_automatizacion)
        return jsonify({"success": True, "message": "Automatización creada correctamente"}), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>', methods=['GET'])
def obtener_automatizacion(id):
    """GET /api/automatizaciones/<id> — Devuelve una automatización por su identificador único."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    try:
        automatizacion = db.Automatizaciones.find_one({"identificador_unico": id}, {'_id': 0})
        if not automatizacion:
            return jsonify({"success": False, "message": "Automatización no encontrada"}), 404
        return jsonify({"success": True, "data": automatizacion}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones', methods=['GET'])
def obtener_automatizaciones():
    """GET /api/automatizaciones — Devuelve todas las automatizaciones del sistema. Solo para el admin."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    try:
        automatizaciones = list(db.Automatizaciones.find({}, {'_id': 0}))
        return jsonify({"success": True, "data": automatizaciones}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/mis-automatizaciones', methods=['GET'])
def obtener_mis_automatizaciones():
    """GET /api/automatizaciones/mis-automatizaciones?userId=<id> — Devuelve las automatizaciones de un cliente."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({"success": False, "message": "Falta el parámetro userId"}), 400

    try:
        automatizaciones = list(db.Automatizaciones.find(
            {"identificador_propietario": user_id}, {'_id': 0}
        ))
        return jsonify({"success": True, "data": automatizaciones}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/aceptar-admin', methods=['PATCH'])
def aceptar_admin(id):
    """PATCH /api/automatizaciones/<id>/aceptar-admin — El admin acepta la revisión, asigna el gasto
    y se asigna como gestor. Pasa el estado a 'pendiente_pago_anticipo'."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    data = request.get_json()
    gasto_raw = data.get('gasto_estimado')
    if gasto_raw is None:
        return jsonify({"success": False, "message": "Falta gasto_estimado"}), 400
    try:
        gasto = float(gasto_raw)
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "gasto_estimado debe ser un número"}), 400

    identificador_admin = data.get('identificador_admin')
    nombre_admin = data.get('nombre_admin')
    if not identificador_admin or not nombre_admin:
        return jsonify({"success": False, "message": "Faltan datos del admin"}), 400

    try:
        result = db.Automatizaciones.update_one(
            {"identificador_unico": id, "estado": "pendiente_revision"},
            {"$set": {
                "estado": "pendiente_pago_anticipo",
                "gasto_estimado": gasto,
                "identificador_admin": identificador_admin,
                "nombre_admin": nombre_admin,
                "fecha_actualizacion": datetime.utcnow(),
            }}
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Automatización no encontrada o estado incorrecto"}), 404
        return jsonify({"success": True, "message": "Automatización aceptada, pendiente de anticipo"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/rechazar', methods=['PATCH'])
def rechazar(id):
    """PATCH /api/automatizaciones/<id>/rechazar — El admin rechaza la automatización indicando el motivo.
    Pasa el estado a 'rechazada'."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    data = request.get_json()
    if 'motivo_rechazo' not in data or not data['motivo_rechazo']:
        return jsonify({"success": False, "message": "Falta el campo obligatorio: motivo_rechazo"}), 400

    try:
        result = db.Automatizaciones.update_one(
            {"identificador_unico": id, "estado": "pendiente_revision"},
            {"$set": {
                "estado": "rechazada",
                "motivo_rechazo": data['motivo_rechazo'],
                "fecha_actualizacion": datetime.utcnow(),
            }}
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Automatización no encontrada o estado incorrecto"}), 404
        return jsonify({"success": True, "message": "Automatización rechazada"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/crear-sesion-pago-anticipo', methods=['POST'])
def crear_sesion_pago_anticipo(id):
    """POST /api/automatizaciones/<id>/crear-sesion-pago-anticipo — Crea una sesión Stripe por el 50%
    del gasto total. El webhook actualiza el estado a 'en_desarrollo' al completarse el pago."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    automatizacion = db.Automatizaciones.find_one({"identificador_unico": id})
    if not automatizacion:
        return jsonify({"success": False, "message": "Automatización no encontrada"}), 404
    if automatizacion.get('estado') != 'pendiente_pago_anticipo':
        return jsonify({"success": False, "message": "La automatización no está pendiente de anticipo"}), 400
    if automatizacion.get('gasto_estimado') is None:
        return jsonify({"success": False, "message": "No hay gasto estimado definido"}), 400

    frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
    importe_anticipo = int(automatizacion['gasto_estimado'] * 0.5 * 100)

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'eur',
                    'product_data': {
                        'name': f"Anticipo — {automatizacion['titulo']}",
                        'description': '50% del coste total (anticipo para inicio del desarrollo)',
                    },
                    'unit_amount': importe_anticipo,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f"{frontend_url}/pago-completado?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{frontend_url}/dashboard/cliente",
            metadata={'automatizacion_id': id, 'tipo_pago': 'anticipo'},
        )

        db.Automatizaciones.update_one(
            {"identificador_unico": id},
            {"$set": {"stripe_session_anticipo_id": session.id, "fecha_actualizacion": datetime.utcnow()}}
        )

        return jsonify({"success": True, "url": session.url}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error al crear sesión de pago: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/crear-sesion-pago-final', methods=['POST'])
def crear_sesion_pago_final(id):
    """POST /api/automatizaciones/<id>/crear-sesion-pago-final — Crea una sesión Stripe por el 50%
    restante del gasto total. El webhook actualiza el estado a 'terminada' al completarse el pago."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    automatizacion = db.Automatizaciones.find_one({"identificador_unico": id})
    if not automatizacion:
        return jsonify({"success": False, "message": "Automatización no encontrada"}), 404
    if automatizacion.get('estado') != 'pendiente_pago_final':
        return jsonify({"success": False, "message": "La automatización no está pendiente de pago final"}), 400
    if automatizacion.get('gasto_estimado') is None:
        return jsonify({"success": False, "message": "No hay gasto estimado definido"}), 400

    frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
    importe_final = int(automatizacion['gasto_estimado'] * 0.5 * 100)

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'eur',
                    'product_data': {
                        'name': f"Pago final — {automatizacion['titulo']}",
                        'description': '50% restante del coste total',
                    },
                    'unit_amount': importe_final,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f"{frontend_url}/pago-completado?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{frontend_url}/dashboard/cliente",
            metadata={'automatizacion_id': id, 'tipo_pago': 'final'},
        )

        db.Automatizaciones.update_one(
            {"identificador_unico": id},
            {"$set": {"stripe_session_final_id": session.id, "fecha_actualizacion": datetime.utcnow()}}
        )

        return jsonify({"success": True, "url": session.url}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error al crear sesión de pago: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/marcar-terminada', methods=['PATCH'])
def marcar_terminada(id):
    """PATCH /api/automatizaciones/<id>/marcar-terminada — El admin marca el desarrollo como terminado.
    Pasa el estado a 'pendiente_pago_final'."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    try:
        result = db.Automatizaciones.update_one(
            {"identificador_unico": id, "estado": "en_desarrollo"},
            {"$set": {
                "estado": "pendiente_pago_final",
                "fecha_actualizacion": datetime.utcnow(),
            }}
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Automatización no encontrada o estado incorrecto"}), 404
        return jsonify({"success": True, "message": "Automatización terminada, pendiente de pago final"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/actualizar-desarrollo', methods=['PATCH'])
def actualizar_desarrollo(id):
    """PATCH /api/automatizaciones/<id>/actualizar-desarrollo — El admin publica un avance de desarrollo.
    El porcentaje debe ser mayor que el de la última actualización publicada."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    data = request.get_json()
    mensaje = data.get('mensaje', '').strip()
    porcentaje_raw = data.get('porcentaje')

    if not mensaje:
        return jsonify({"success": False, "message": "El campo mensaje es obligatorio"}), 400

    try:
        porcentaje = int(porcentaje_raw)
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "porcentaje debe ser un número entero"}), 400

    if not (0 <= porcentaje <= 100):
        return jsonify({"success": False, "message": "porcentaje debe estar entre 0 y 100"}), 400

    doc = db.Automatizaciones.find_one(
        {"identificador_unico": id, "estado": "en_desarrollo"},
        {"actualizaciones_desarrollo": 1}
    )
    if not doc:
        return jsonify({"success": False, "message": "Automatización no encontrada o no está en desarrollo"}), 404

    updates = doc.get("actualizaciones_desarrollo") or []
    if updates:
        ultimo_porcentaje = updates[-1]["porcentaje"]
        if porcentaje <= ultimo_porcentaje:
            return jsonify({
                "success": False,
                "message": f"El porcentaje debe ser mayor que el anterior ({ultimo_porcentaje}%)"
            }), 400

    nueva_actualizacion = {
        "mensaje": mensaje,
        "porcentaje": porcentaje,
        "fecha": datetime.utcnow().isoformat(),
    }

    try:
        result = db.Automatizaciones.update_one(
            {"identificador_unico": id, "estado": "en_desarrollo"},
            {
                "$push": {"actualizaciones_desarrollo": nueva_actualizacion},
                "$set": {"fecha_actualizacion": datetime.utcnow()},
            }
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Automatización no encontrada o no está en desarrollo"}), 404
        return jsonify({"success": True, "message": "Actualización publicada"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/valorar', methods=['POST'])
def valorar(id):
    """POST /api/automatizaciones/<id>/valorar — El cliente valora una automatización 'terminada'
    con puntuación del 1 al 5. Solo se puede valorar una vez."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    data = request.get_json()
    puntuacion = data.get('puntuacion')
    comentario = data.get('comentario', '').strip()

    if puntuacion is None or not isinstance(puntuacion, int) or not (1 <= puntuacion <= 5):
        return jsonify({"success": False, "message": "puntuacion debe ser un entero entre 1 y 5"}), 400

    automatizacion = db.Automatizaciones.find_one({"identificador_unico": id})
    if not automatizacion:
        return jsonify({"success": False, "message": "Automatización no encontrada"}), 404
    if automatizacion.get('estado') != 'terminada':
        return jsonify({"success": False, "message": "Solo se puede valorar una automatización terminada"}), 400
    if automatizacion.get('valoracion'):
        return jsonify({"success": False, "message": "Esta automatización ya ha sido valorada"}), 409

    try:
        db.Automatizaciones.update_one(
            {"identificador_unico": id},
            {"$set": {
                "valoracion": {
                    "puntuacion": puntuacion,
                    "comentario": comentario,
                    "fecha": datetime.utcnow().isoformat(),
                },
                "fecha_actualizacion": datetime.utcnow(),
            }}
        )
        return jsonify({"success": True, "message": "Valoración guardada"}), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/cancelar', methods=['PATCH'])
def cancelar_automatizacion(id):
    """PATCH /api/automatizaciones/<id>/cancelar — Cancela una automatización. Permitido en estados:
    'pendiente_revision', 'pendiente_pago_anticipo', 'en_desarrollo' y 'pendiente_pago_final'."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    try:
        result = db.Automatizaciones.update_one(
            {"identificador_unico": id, "estado": {"$in": [
                "pendiente_revision", "pendiente_pago_anticipo", "en_desarrollo", "pendiente_pago_final"
            ]}},
            {"$set": {
                "estado": "cancelada",
                "fecha_actualizacion": datetime.utcnow(),
            }}
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Automatización no encontrada o no se puede cancelar"}), 404
        return jsonify({"success": True, "message": "Automatización cancelada"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500
