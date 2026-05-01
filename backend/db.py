from pymongo import MongoClient
import os
import certifi

def get_db():
    mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/n8n_consultoria_db')

    try:
        if mongo_uri.startswith('mongodb+srv://'):
            # Atlas: TLS con OCSP desactivado (Railway bloquea las peticiones OCSP)
            client = MongoClient(
                mongo_uri,
                tlsCAFile=certifi.where(),
                tlsDisableOCSPEndpointCheck=True
            )
        else:
            # Local: sin TLS
            client = MongoClient(mongo_uri)

        client.admin.command('ping')
        print("✅ Conexión exitosa a MongoDB")
        return client.n8n_consultoria_db

    except Exception as e:
        print(f"❌ Error conectando a MongoDB: {e}")
        return None