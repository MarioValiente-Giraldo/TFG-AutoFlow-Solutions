import os
from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Conexión a la BD definida en docker-compose
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/n8n_consultoria_db')

def get_db():
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        return client.get_default_database()
    except Exception as e:
        return None

@app.route('/')
def home():
    return "API AutoFlow Solutions Online 🚀"

@app.route('/init-db')
def init_db():
    db = get_db()
    if db is None: return jsonify({"error": "Sin conexión a BD"}), 500

    # 1. Definimos datos de ejemplo reales según tu TFG
    datos_semilla = {
        "Usuarios": {
            "identificador_unico_usuario": "usr_001",
            "correo_electronico_acceso": "cliente@ejemplo.com",
            "datos_perfil_comercial": {"nombre": "Mario Cliente", "empresa": "Tech SL"},
            "rol": "admin"
        },
        "Tickets_De_Consulta": {
            "identificador_propietario": "usr_001",
            "titulo_idea_automatizacion": "Conectar Typeform con Google Sheets",
            "estado_gestion_consulta": "abierto",
            "valoracion_complejidad_inicial": "Simple (S1)"
        },
        "Proyectos_Implementacion": {
            "identificador_propietario": "usr_001",
            "categoria_definitiva_proyecto": "SIMPLE",
            "codigo_tarifa_aplicada": "S1",
            "importe_total_proyecto": 100,
            "estado_cobros_fraccionados": {"pago_inicial": "pagado", "pago_final": "pendiente"}
        },
        "Automatizaciones_Activas": {
            "referencia_proyecto_origen": "proy_001",
            "configuracion_docker_vps": {"container_id": "n8n_client_01", "port": 5678},
            "control_suscripcion_mantenimiento": {"estado_servicio": "cortesia", "precio_mes": 25}
        },
        "Eventos_De_Facturacion": {
            "referencia_automatizacion": "auto_001",
            "monto_bruto_pagado": 50.00,
            "concepto_de_pago": "reserva_implementacion",
            "fecha_pago": datetime.utcnow()
        }
    }

    reporte = {}

    # 2. Recorremos y creamos si no existen
    for coleccion, documento in datos_semilla.items():
        # Solo insertamos si la colección está vacía para no duplicar datos
        if db[coleccion].count_documents({}) == 0:
            db[coleccion].insert_one(documento)
            reporte[coleccion] = "✅ Creada con éxito"
        else:
            reporte[coleccion] = "ℹ️ Ya existía"

    return jsonify({
        "status": "success",
        "mensaje": "Base de datos inicializada con la estructura del TFG",
        "detalle": reporte,
        "colecciones_actuales": db.list_collection_names()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)