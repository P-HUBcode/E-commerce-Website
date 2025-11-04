# app/routes/cart.py (ví dụ)
from flask import Blueprint, session, request, jsonify
cart_bp = Blueprint("cart", __name__, url_prefix="/api/cart")

@cart_bp.route("/", methods=["GET"])
def get_cart():
    return jsonify(session.get('cart', {})), 200

@cart_bp.route("/add", methods=["POST"])
def add_cart():
    data = request.get_json()
    pid = str(data['product_id'])
    qty = int(data.get('quantity',1))
    cart = session.get('cart', {})
    if pid in cart:
        cart[pid]['quantity'] += qty
    else:
        cart[pid] = {'product_id': pid, 'quantity': qty}
    session['cart'] = cart
    session.modified = True
    return jsonify(cart), 200
