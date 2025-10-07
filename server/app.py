from flask import Flask
from flask_cors import CORS
from models.patient_models import Base, engine
from config.database import Config
from routes.patient_routes import patient_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # Registrar blueprints
    app.register_blueprint(patient_bp)

    # Crear tablas
    with app.app_context():
        Base.metadata.create_all(bind=engine)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)