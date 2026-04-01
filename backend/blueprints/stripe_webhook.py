import os
from datetime import datetime
import stripe
from flask import Blueprint, jsonify, request
from db import get_db

stripe_bp = Blueprint('stripe', __name__, url_prefix='/api')

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
WEBHOOK_SECRET = os.getenv('STRIPE_WEBHOOK_SECRET')


@stripe_bp.route('/stripe/webhook', methods=['POST'])
def webhook():
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        return jsonify({"success": False, "message": "Firma inválida"}), 400

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        automatizacion_id = session.get('metadata', {}).get('automatizacion_id')

        if not automatizacion_id:
            return jsonify({"success": False, "message": "automatizacion_id no encontrado en metadata"}), 400

        db = get_db()
        if db is None:
            return jsonify({"success": False, "message": "Error de conexión a Base de Datos"}), 500

        try:
            result = db.Automatizaciones.update_one(
                {"identificador_unico": automatizacion_id, "estado": "pendiente_pago"},
                {"$set": {
                    "estado": "en_desarrollo",
                    "fecha_pago": datetime.utcnow(),
                    "fecha_actualizacion": datetime.utcnow(),
                }}
            )
            if result.matched_count == 0:
                return jsonify({"success": False, "message": "Automatización no encontrada o estado incorrecto"}), 404
        except Exception as e:
            return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500

    return jsonify({"success": True}), 200
