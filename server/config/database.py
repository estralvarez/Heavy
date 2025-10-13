import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

class Config:
    # Fix for Neon PostgreSQL connection
    database_url = os.getenv('DATABASE_URL')
    if database_url and database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    
    SQLALCHEMY_DATABASE_URI = database_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    
    # Additional SQLAlchemy engine options for Neon
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
        'connect_args': {
            'sslmode': 'require',
            'options': '-c default_transaction_isolation=read_committed'
        }
    }