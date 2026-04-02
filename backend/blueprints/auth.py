import os
import uuid
from datetime import datetime, timezone, timedelta
import jwt
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_db

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret')


def _generate_tokens(user_id: str, rol: str) -> dict:
    """Genera access_token (15min) y refresh_token (7d) para el usuario."""
    now = datetime.now(timezone.utc)
    access_payload = {
        'sub': user_id,
        'rol': rol,
        'iat': now,
        'exp': now + timedelta(minutes=15),
        'type': 'access',
    }
    refresh_payload = {
        'sub': user_id,
        'rol': rol,
        'iat': now,
        'exp': now + timedelta(days=7),
        'type': 'refresh',
    }
    return {
        'access_token': jwt.encode(access_payload, SECRET_KEY, algorithm='HS256'),
        'refresh_token': jwt.encode(refresh_payload, SECRET_KEY, algorithm='HS256'),
    }


@auth_bp.route('/register', methods=['POST'])
def register():
    """POST /api/register — Registra un nuevo usuario con rol 'cliente'. Hashea la contraseña con Werkzeug."""
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
    """POST /api/login — Autentica al usuario. Devuelve user + access_token + refresh_token."""
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
        tokens = _generate_tokens(user['identificador_unico_usuario'], user['rol'])
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
            },
            **tokens,
        }), 200
    else:
        return jsonify({"success": False, "message": "Correo o contraseña incorrectos"}), 401


@auth_bp.route('/auth/refresh', methods=['POST'])
def refresh():
    """POST /api/auth/refresh — Recibe refresh_token, devuelve nuevo access_token."""
    data = request.get_json()
    refresh_token = data.get('refresh_token') if data else None

    if not refresh_token:
        return jsonify({"success": False, "message": "Falta el refresh_token"}), 400

    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=['HS256'])
        if payload.get('type') != 'refresh':
            raise jwt.InvalidTokenError('Token no es de tipo refresh')
    except jwt.ExpiredSignatureError:
        return jsonify({"success": False, "message": "Refresh token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"success": False, "message": "Refresh token inválido"}), 401

    tokens = _generate_tokens(payload['sub'], payload['rol'])
    return jsonify({"success": True, "access_token": tokens['access_token']}), 200


@auth_bp.route('/logout', methods=['POST'])
def logout():
    """POST /api/logout — Confirma el cierre de sesión. El frontend limpia el localStorage."""
    return jsonify({"success": True, "message": "Sesión cerrada correctamente"}), 200
