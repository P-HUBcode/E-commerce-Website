# backend/app/extensions.py
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_session import Session
import redis
from flask_session import Session

def init_redis(app):
    redis_url = app.config.get("REDIS_URL")
    app.config["SESSION_TYPE"] = "redis"
    app.config["SESSION_REDIS"] = redis.from_url(redis_url)
    Session(app)

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
sess = Session()
