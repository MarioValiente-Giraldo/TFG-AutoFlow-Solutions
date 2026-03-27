import uuid
from datetime import datetime
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_db

auth_bp = Blueprint('auth', __name__, url_prefix='/api')


@auth_bp.route('/register', methods=['POST'])
def register():
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    data = request.get_json()

    required_fields = ['email', 'password', 'fullName', 'company', 'acceptTerms']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"success": False, "message": f"Falta el campo obligatorio: {field}"}), 400

    if db.Usuarios.find_one({"correo_electronico_acceso": data['email']}):
        return jsonify({"success": False, "message": "Este correo electrónico ya está registrado."}), 409

    hashed_password = generate_password_hash(data['password'])

    nuevo_usuario = {
        "identificador_unico_usuario": str(uuid.uuid4()),
        "correo_electronico_acceso": data['email'],
        "contrasena": hashed_password,
        "telefono": data.get('phone', ""),
        "datos_perfil_comercial": {
            "nombre": data['fullName'],
            "empresa": data['company']
        },
        "rol": "cliente",
        "fecha_registro": datetime.utcnow(),
        "aceptacion_terminos": True
    }

    try:
        db.Usuarios.insert_one(nuevo_usuario)
        return jsonify({"success": True, "message": "Usuario registrado exitosamente"}), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a BD"}), 500

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Por favor introduce correo y contraseña"}), 400

    user = db.Usuarios.find_one({"correo_electronico_acceso": email})

    if user and check_password_hash(user['contrasena'], password):
        return jsonify({
            "success": True,
            "message": "Inicio de sesión correcto",
            "user": {
                "id": user['identificador_unico_usuario'],
                "email": user['correo_electronico_acceso'],
                "nombre": user['datos_perfil_comercial']['nombre'],
                "empresa": user['datos_perfil_comercial'].get('empresa', ''),
                "telefono": user.get('telefono', ''),
                "rol": user['rol']
            }
        }), 200
    else:
        return jsonify({"success": False, "message": "Correo o contraseña incorrectos"}), 401


@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({"success": True, "message": "Sesión cerrada correctamente"}), 200
