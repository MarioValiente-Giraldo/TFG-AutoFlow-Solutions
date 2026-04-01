import uuid
from datetime import datetime
from flask import Blueprint, jsonify, request
from db import get_db

citas_bp = Blueprint('citas', __name__, url_prefix='/api')


@citas_bp.route('/citas', methods=['GET'])
def get_citas():
    """GET /api/citas?email=<email> — Devuelve las citas de un cliente filtradas por email."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    email = request.args.get('email')
    if not email:
        return jsonify({"success": False, "message": "Falta el parámetro email"}), 400

    citas = list(db.Citas.find({"email": email}, {"_id": 0}))
    return jsonify({"success": True, "data": citas}), 200


@citas_bp.route('/admin/citas', methods=['GET'])
def get_todas_citas():
    """GET /api/admin/citas — Devuelve todas las citas del sistema. Solo para el admin."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    citas = list(db.Citas.find({}, {"_id": 0}))
    return jsonify({"success": True, "data": citas}), 200


@citas_bp.route('/citas/<id>/marcar-atendida', methods=['PATCH'])
def marcar_atendida(id):
    """PATCH /api/citas/<id>/marcar-atendida — Cambia el estado de una cita de 'pendiente' a 'atendida'."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    result = db.Citas.update_one(
        {"identificador_unico_cita": id, "estado": "pendiente"},
        {"$set": {"estado": "atendida"}}
    )
    if result.matched_count == 0:
        return jsonify({"success": False, "message": "Cita no encontrada o ya atendida"}), 404

    return jsonify({"success": True, "message": "Cita marcada como atendida"}), 200


@citas_bp.route('/agendar-cita', methods=['POST'])
def agendar_cita():
    """POST /api/agendar-cita — Crea una nueva solicitud de cita con estado 'pendiente'. Accesible sin autenticación."""
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    data = request.get_json()

    required_fields = ['nombre', 'email', 'tipoAutomatizacion', 'descripcion', 'fechaPreferida', 'franjaHoraria']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"success": False, "message": f"Falta el campo obligatorio: {field}"}), 400

    nueva_cita = {
        "identificador_unico_cita": str(uuid.uuid4()),
        "nombre": data['nombre'],
        "email": data['email'],
        "telefono": data.get('telefono', ''),
        "empresa": data.get('empresa', ''),
        "tipo_automatizacion": data['tipoAutomatizacion'],
        "descripcion": data['descripcion'],
        "fecha_preferida": data['fechaPreferida'],
        "franja_horaria": data['franjaHoraria'],
        "estado": "pendiente",
        "fecha_solicitud": datetime.utcnow(),
    }

    try:
        db.Citas.insert_one(nueva_cita)
        return jsonify({
            "success": True,
            "message": "Consultoría solicitada correctamente. Nos pondremos en contacto en menos de 24h."
        }), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500
