import os
from flask import Flask
from app.extension import db, migrate
import cloudinary

def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY=os.getenv("SECRET_KEY", "dev-key"),
        SQLALCHEMY_DATABASE_URI=os.getenv("DATABASE_URL", "sqlite:///shop.db"),
    )
    db.init_app(app)
    migrate.init_app(app, db)

    # ⚙️ Cấu hình Cloudinary
    cloudinary.config(
        cloud_name=os.getenv('CLOUD_NAME'),
        api_key=os.getenv('CLOUD_API_KEY'),
        api_secret=os.getenv('CLOUD_API_SECRET')
    )

    from app.routes.upload import upload_bp
    app.register_blueprint(upload_bp)

    return app
