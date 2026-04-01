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

        if automatizacion_id:
            db = get_db()
            if db is not None:
                db.Automatizaciones.update_one(
                    {"identificador_unico": automatizacion_id, "estado": "pendiente_pago"},
                    {"$set": {
                        "estado": "en_desarrollo",
                        "fecha_pago": datetime.utcnow(),
                        "fecha_actualizacion": datetime.utcnow(),
                    }}
                )

    return jsonify({"success": True}), 200
