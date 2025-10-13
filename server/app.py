import os
from flask import Flask
from flask_cors import CORS
from models.patient_models import Base, engine
from config.database import Config
from routes.patient_routes import patient_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configurar orígenes permitidos para CORS
    frontend_url = os.getenv('FRONTEND_URL')
    allowed_origins = [
        "http://localhost:3000",
        "https://localhost:3000",
        frontend_url
    ]

    # Inicializar extensiones
    CORS(app, resources={
        r"/api/*": {"origins": allowed_origins},
    })

    # Registrar blueprints
    app.register_blueprint(patient_bp)
    
    # Crear tablas
    with app.app_context():
        Base.metadata.create_all(bind=engine)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run()
