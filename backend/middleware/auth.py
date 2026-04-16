import os
from functools import wraps
import jwt
from flask import jsonify, request

SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret')


def _decode_access_token(token: str) -> dict:
    """Decodifica y valida un access_token JWT. Lanza excepción si es inválido o expirado."""
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    if payload.get('type') != 'access':
        raise jwt.InvalidTokenError('Token no es de tipo access')
    return payload


def require_auth(f):
    """Decorador que exige un access_token válido en la cabecera Authorization: Bearer <token>."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return jsonify({"success": False, "message": "Token no proporcionado"}), 401
        token = auth_header.split(' ', 1)[1]
        try:
            payload = _decode_access_token(token)
        except jwt.ExpiredSignatureError:
            return jsonify({"success": False, "message": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"success": False, "message": "Token inválido"}), 401
        request.token_payload = payload
        return f(*args, **kwargs)
    return decorated


def require_admin(f):
    """Decorador que exige access_token válido y rol admin."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return jsonify({"success": False, "message": "Token no proporcionado"}), 401
        token = auth_header.split(' ', 1)[1]
        try:
            payload = _decode_access_token(token)
        except jwt.ExpiredSignatureError:
            return jsonify({"success": False, "message": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"success": False, "message": "Token inválido"}), 401
        if payload.get('rol') not in ('admin', 'superadmin'):
            return jsonify({"success": False, "message": "Acceso denegado"}), 403
        request.token_payload = payload
        return f(*args, **kwargs)
    return decorated
