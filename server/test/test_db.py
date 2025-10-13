from config.database import Config
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, jsonify

test_db_bp = Blueprint('test_db', __name__)

@test_db_bp.route('/test-db', methods=['GET'])
def test_database_connection():
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        session.execute(text("SELECT 1"))
        message = "Database connection successful"
        print(message)
        return jsonify({"status": "success", "message": message})
    except Exception as e:
        error_msg = f"Database connection failed: {e}"
        print(error_msg)
        return jsonify({"status": "error", "message": error_msg}), 500
    finally:
        session.close()
    