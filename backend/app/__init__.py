# backend/app/__init__.py
import os
import redis as redis_lib
from flask import Flask
from dotenv import load_dotenv
from flask import Flask
from app.extension import init_redis
# load .env nếu có
load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_prefixed_env()
    init_redis(app)
    return app

# import các extensions (phải có file app/extensions.py)
from app.extension import db, migrate, jwt, sess

def create_app(config_object=None):
    app = Flask(__name__, static_folder=None)

    # cấu hình cơ bản (có thể override bằng config_object hoặc biến env)
    app.config.from_mapping(
        SECRET_KEY=os.getenv("SECRET_KEY", "dev-secret"),
        SQLALCHEMY_DATABASE_URI=os.getenv("DATABASE_URL", "sqlite:///data.db"),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        JWT_SECRET_KEY=os.getenv("JWT_SECRET", "super-secret"),
        SESSION_TYPE=os.getenv("SESSION_TYPE", "filesystem"),
    )

    # nếu truyền config object (ví dụ class Config), load nó
    if config_object:
        app.config.from_object(config_object)

    # khởi tạo extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    sess.init_app(app)

    # cấu hình Redis cho Flask-Session nếu dùng
    if app.config.get("SESSION_TYPE") == "redis":
        redis_url = os.getenv("REDIS_URL", "redis://redis:6379/0")
        try:
            app.config["SESSION_REDIS"] = redis_lib.from_url(redis_url)
        except Exception:
            # nếu redis chưa cài/không khả dụng, bỏ qua (dev)
            app.logger.warning("Could not configure SESSION_REDIS from %s", redis_url)

    # CORS nếu cần (nếu bạn cài flask_cors)
    try:
        from flask_cors import CORS
        CORS(app, resources={r"/api/*": {"origins": os.getenv("CORS_ORIGINS", "*")}}, supports_credentials=True)
    except Exception:
        pass

    # register blueprints (nếu đã có)
    # from .routes.products import products_bp
    # app.register_blueprint(products_bp, url_prefix="/api/products")

    @app.route("/health")
    def health():
        return {"status": "ok"}, 200

    return app
