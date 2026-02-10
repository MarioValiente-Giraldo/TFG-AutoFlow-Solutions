import os
import uuid
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

# 1. Cargar variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)

# Configuración de CORS: Permite que tu Frontend (React) hable con este Backend
CORS(app, resources={r"/api/*": {"origins": "*"}})

# 2. Obtener configuración del entorno (o usar valores por defecto)
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/n8n_consultoria_db')
SECRET_KEY = os.getenv('SECRET_KEY', 'super_secret_key_dev')

# --- Helper para conexión a BD ---
def get_db():
    try:
        # Time out corto para no bloquear si no hay conexión
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        return client.get_default_database()
    except Exception as e:
        print(f"Error conectando a Mongo: {e}")
        return None

@app.route('/')
def home():
    return "API AutoFlow Solutions Online 🚀"

# ==========================================
#  ENDPOINT: REGISTRO (Sign Up)
# ==========================================
@app.route('/api/register', methods=['POST'])
def register():
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

    data = request.get_json()
    
    # 1. Validar campos obligatorios que vienen del Frontend
    required_fields = ['email', 'password', 'fullName', 'company', 'acceptTerms']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"success": False, "message": f"Falta el campo obligatorio: {field}"}), 400

    # 2. Verificar si el usuario ya existe (por email)
    if db.Usuarios.find_one({"correo_electronico_acceso": data['email']}):
        return jsonify({"success": False, "message": "Este correo electrónico ya está registrado."}), 409

    # 3. Hashear la contraseña (Seguridad)
    hashed_password = generate_password_hash(data['password'])

    # 4. Crear el objeto usuario siguiendo TU ESQUEMA DE MONGO
    nuevo_usuario = {
        "identificador_unico_usuario": str(uuid.uuid4()), # ID único generado
        "correo_electronico_acceso": data['email'],
        "contrasena": hashed_password,
        "telefono": data.get('phone', ""), # Campo opcional
        "datos_perfil_comercial": {
            "nombre": data['fullName'],
            "empresa": data['company']
        },
        "rol": "cliente", # Por defecto siempre es cliente
        "fecha_registro": datetime.utcnow(),
        "aceptacion_terminos": True
    }

    try:
        db.Usuarios.insert_one(nuevo_usuario)
        return jsonify({
            "success": True, 
            "message": "Usuario registrado exitosamente"
        }), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500


# ==========================================
#  ENDPOINT: LOGIN (Sign In)
# ==========================================
@app.route('/api/login', methods=['POST'])
def login():
    db = get_db()
    if db is None:
        return jsonify({"success": False, "message": "Error de conexión a BD"}), 500

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Por favor introduce correo y contraseña"}), 400

    # 1. Buscar usuario por email
    user = db.Usuarios.find_one({"correo_electronico_acceso": email})

    # 2. Verificar contraseña
    if user and check_password_hash(user['contrasena'], password):
        # Login correcto
        return jsonify({
            "success": True,
            "message": "Inicio de sesión correcto",
            "user": {
                "id": user['identificador_unico_usuario'],
                "email": user['correo_electronico_acceso'],
                "nombre": user['datos_perfil_comercial']['nombre'],
                "rol": user['rol']
            }
        }), 200
    else:
        # Credenciales inválidas
        return jsonify({"success": False, "message": "Correo o contraseña incorrectos"}), 401

# ==========================================
#  INICIO DEL SERVIDOR
# ==========================================
if __name__ == '__main__':
    # Lee el puerto del .env o usa el 5000 por defecto
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)