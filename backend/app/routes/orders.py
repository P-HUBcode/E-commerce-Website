# app/routes/orders.py (tạo checkout)
import stripe
from flask import Blueprint, request, jsonify, current_app, url_for

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

orders_bp = Blueprint("orders", __name__, url_prefix="/api/orders")

@orders_bp.route("/create-checkout", methods=["POST"])
def create_checkout():
    data = request.get_json()
    # data.items: [{name, price, quantity, image}]
    line_items = []
    for item in data.get('items', []):
        line_items.append({
            'price_data': {
                'currency': 'usd',
                'product_data': {'name': item['name'], 'images': [item.get('image')]},
                'unit_amount': int(float(item['price']) * 100),
            },
            'quantity': int(item.get('quantity',1)),
        })
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=line_items,
        mode="payment",
        success_url=os.getenv("FRONTEND_URL") + "/checkout/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url=os.getenv("FRONTEND_URL") + "/checkout/cancel",
        metadata={'user_id': data.get('user_id')}
    )
    return jsonify({'checkout_url': session.url, 'id': session.id})
