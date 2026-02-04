from pymongo import MongoClient
import os

def get_db():
    # Obtiene la URI desde las variables de entorno definidas en docker-compose
    mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/autoflow_db')
    
    try:
        client = MongoClient(mongo_uri)
        # Verifica la conexión
        client.admin.command('ping')
        print("✅ Conexión exitosa a MongoDB Local")
        
        # Retorna la base de datos 'autoflow_db'
        return client.autoflow_db
        
    except Exception as e:
        print(f"❌ Error conectando a MongoDB: {e}")
        return None