import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'super_secret_key_dev')

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    from blueprints.auth import auth_bp
    from blueprints.citas import citas_bp
    from blueprints.automatizaciones import automatizaciones_bp
    from blueprints.stripe_webhook import stripe_bp
    from blueprints.chat import chat_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(citas_bp)
    app.register_blueprint(automatizaciones_bp)
    app.register_blueprint(stripe_bp)
    app.register_blueprint(chat_bp)

    @app.route('/')
    def home():
        return jsonify({"message": "API AutoFlow Solutions Online"})

    return app


if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
