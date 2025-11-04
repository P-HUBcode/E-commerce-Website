# app/routes/webhooks.py
import os
import stripe
from flask import Blueprint, request, jsonify, current_app

webhook_bp = Blueprint('webhooks', __name__, url_prefix='/webhook')

@webhook_bp.route('/stripe', methods=['POST'])
def stripe_webhook():
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')
    endpoint_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except Exception as e:
        return jsonify({'msg': str(e)}), 400

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object'] # noqa: S1481
        # xử lý tạo order, mark paid, gửi email, etc.
    return jsonify({'received': True})
