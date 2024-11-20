from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize CORS
    CORS(app)

    # Initialize database and migration
    db.init_app(app)
    migrate.init_app(app, db)

    # Register Blueprints
    from .routes import auth, students, pairings
    app.register_blueprint(auth.bp, url_prefix="/auth")
    app.register_blueprint(students.bp, url_prefix="/students")
    app.register_blueprint(pairings.bp, url_prefix="/pairings")

    return app
