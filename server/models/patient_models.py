from sqlalchemy import Integer, Column, String,create_engine, ForeignKey
from sqlalchemy.orm import relationship, joinedload, subqueryload, Session
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
engine = create_engine('sqlite:///patients.db', echo=True)
session = Session(bind=engine)

class Patient(Base):
    __tablename__ = 'patients'
    
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=False)
    edad = Column(Integer, nullable=False)
    sexo = Column(String(10), nullable=False)
    sector = Column(String(100), nullable=False)
    zona = Column(String(100), nullable=False)
    direccion = Column(String(200), nullable=False)
    telefono = Column(String(20), nullable=False)
    email = Column(String(100), nullable=False)
    ocupacion = Column(String(100), nullable=False)
    institucion = Column(String(100), nullable=False)
