from flask import Blueprint, request, jsonify
import cloudinary.uploader

upload_bp = Blueprint("upload", __name__, url_prefix="/api")

@upload_bp.route("/upload", methods=["POST"])
def upload_image():
    """Upload hình ảnh sản phẩm lên Cloudinary"""
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        result = cloudinary.uploader.upload(file)
        return jsonify({
            "url": result["secure_url"],  # link ảnh online
            "public_id": result["public_id"]
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
