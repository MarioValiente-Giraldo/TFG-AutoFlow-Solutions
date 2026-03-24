import uuid
from datetime import datetime
from flask import Blueprint, jsonify, request
from db import get_db

automatizaciones_bp = Blueprint('automatizaciones', __name__, url_prefix='/api')


@automatizaciones_bp.route('/automatizaciones', methods=['POST'])
def crear_automatizacion():
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    data = request.get_json()

    required_fields = ['titulo', 'descripcion', 'tipo_automatizacion',
                       'identificador_propietario', 'email_propietario', 'nombre_propietario']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"success": False, "message": f"Falta el campo obligatorio: {field}"}), 400

    nueva_automatizacion = {
        "identificador_unico": str(uuid.uuid4()),
        "identificador_propietario": data['identificador_propietario'],
        "email_propietario": data['email_propietario'],
        "nombre_propietario": data['nombre_propietario'],
        "titulo": data['titulo'],
        "descripcion": data['descripcion'],
        "tipo_automatizacion": data['tipo_automatizacion'],
        "estado": "pendiente_revision",
        "gasto_estimado": None,
        "motivo_rechazo": None,
        "fecha_solicitud": datetime.utcnow(),
        "fecha_actualizacion": datetime.utcnow(),
    }

    try:
        db.Automatizaciones.insert_one(nueva_automatizacion)
        return jsonify({"success": True, "message": "Automatización creada correctamente"}), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones', methods=['GET'])
def obtener_automatizaciones():
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

    try:
        result = db.Automatizaciones.update_one(
            {"identificador_unico": id, "estado": "pendiente_revision"},
            {"$set": {
                "estado": "aceptada_pendiente_cliente",
                "gasto_estimado": gasto,
                "fecha_actualizacion": datetime.utcnow(),
            }}
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Automatización no encontrada o estado incorrecto"}), 404
        return jsonify({"success": True, "message": "Automatización aceptada por el administrador"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/rechazar', methods=['PATCH'])
def rechazar(id):
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


@automatizaciones_bp.route('/automatizaciones/<id>/aceptar-cliente', methods=['PATCH'])
def aceptar_cliente(id):
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    try:
        result = db.Automatizaciones.update_one(
            {"identificador_unico": id, "estado": "aceptada_pendiente_cliente"},
            {"$set": {
                "estado": "en_desarrollo",
                "fecha_actualizacion": datetime.utcnow(),
            }}
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Automatización no encontrada o estado incorrecto"}), 404
        return jsonify({"success": True, "message": "Propuesta aceptada por el cliente"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/rechazar-cliente', methods=['PATCH'])
def rechazar_cliente(id):
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    try:
        result = db.Automatizaciones.update_one(
            {"identificador_unico": id, "estado": "aceptada_pendiente_cliente"},
            {"$set": {
                "estado": "rechazada",
                "motivo_rechazo": "Propuesta rechazada por el cliente",
                "fecha_actualizacion": datetime.utcnow(),
            }}
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Automatización no encontrada o estado incorrecto"}), 404
        return jsonify({"success": True, "message": "Propuesta rechazada por el cliente"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/marcar-desarrollo', methods=['PATCH'])
def marcar_desarrollo(id):
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    try:
        result = db.Automatizaciones.update_one(
            {"identificador_unico": id, "estado": "aceptada_pendiente_cliente"},
            {"$set": {
                "estado": "en_desarrollo",
                "fecha_actualizacion": datetime.utcnow(),
            }}
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Automatización no encontrada o estado incorrecto"}), 404
        return jsonify({"success": True, "message": "Automatización marcada en desarrollo"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@automatizaciones_bp.route('/automatizaciones/<id>/marcar-terminada', methods=['PATCH'])
def marcar_terminada(id):
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    try:
        result = db.Automatizaciones.update_one(
            {"identificador_unico": id, "estado": "en_desarrollo"},
            {"$set": {
                "estado": "terminada",
                "fecha_actualizacion": datetime.utcnow(),
            }}
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Automatización no encontrada o estado incorrecto"}), 404
        return jsonify({"success": True, "message": "Automatización marcada como terminada"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500
