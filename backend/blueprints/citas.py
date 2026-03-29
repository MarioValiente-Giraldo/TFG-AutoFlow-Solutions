import uuid
from datetime import datetime
from flask import Blueprint, jsonify, request
from db import get_db

citas_bp = Blueprint('citas', __name__, url_prefix='/api')


@citas_bp.route('/citas', methods=['GET'])
def get_citas():
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    email = request.args.get('email')
    if not email:
        return jsonify({"success": False, "message": "Falta el parámetro email"}), 400

    citas = list(db.Citas.find({"email": email}, {"_id": 0}))
    return jsonify({"success": True, "data": citas}), 200


@citas_bp.route('/agendar-cita', methods=['POST'])
def agendar_cita():
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
        "presupuesto": data.get('presupuesto', ''),
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
