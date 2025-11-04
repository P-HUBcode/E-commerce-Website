# app/__init__.py (config phần liên quan)
from .extensions import db, migrate, jwt, sess
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.from_url(os.getenv('REDIS_URL','redis://redis:6379/0'))
sess.init_app(app)
