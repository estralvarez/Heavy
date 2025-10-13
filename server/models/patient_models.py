from sqlalchemy import Integer, Column, String, Boolean, create_engine, ForeignKey
from sqlalchemy.orm import relationship, Session
from sqlalchemy.ext.declarative import declarative_base
from config.database import Config

Base = declarative_base()
engine = create_engine(
    Config.SQLALCHEMY_DATABASE_URI, 
    echo=True,
    **Config.SQLALCHEMY_ENGINE_OPTIONS
)
session = Session(bind=engine)

class Patient(Base):
    __tablename__ = 'patient'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100))
    apellido = Column(String(100))
    edad = Column(Integer)
    sexo = Column(String(20))
    sector = Column(String(100))
    zona = Column(String(100))
    direccion = Column(String(200))
    telefono = Column(String(20))
    email = Column(String(100))
    ocupacion_madre = Column(String(100))
    ocupacion_padre = Column(String(100))
    institucion = Column(String(100))
    venopuncion = Column(Boolean, default=False)

    risk_zones= relationship("RiskZones", back_populates="patient")
    illnesses = relationship("Illness", back_populates="patient")
    food = relationship("Food", back_populates="patient")
    health = relationship("Health", back_populates="patient")


class RiskZones(Base):
    __tablename__ = 'risk_zones'
    
    id = Column(Integer, primary_key=True)
    paciente_id = Column(Integer, ForeignKey('patient.id'))
    talleres = Column(String(500))
    industrias = Column(String(500))
    lugares = Column(String(500))

    patient = relationship("Patient", back_populates="risk_zones")

class Illness(Base):
    __tablename__ = 'illness'
    
    id = Column(Integer, primary_key=True)
    paciente_id = Column(Integer, ForeignKey('patient.id'))
    sintomas = Column(String(500))
    patologias = Column(String(500))
    metal = Column(String(500))

    patient = relationship("Patient", back_populates="illnesses")

class Food(Base):
    __tablename__ = 'food'
    
    id = Column(Integer, primary_key=True)
    paciente_id = Column(Integer, ForeignKey('patient.id'))
    cereales = Column(String(500))
    leguminosas = Column(String(500))
    tuberculos = Column(String(500))
    carnes = Column(String(500))
    pescados = Column(String(500))
    pescados_procesados = Column(String(500))
    bebidas = Column(String(500))
    huevos = Column(String(500))
    lacteos = Column(String(500))
    frutas = Column(String(500))
    vegetales = Column(String(500))
    azucar = Column(String(500))
    grasas = Column(String(500))
    chocolate = Column(String(500))

    patient = relationship("Patient", back_populates="food")

class Health(Base):
    __tablename__ = 'health'
    
    id = Column(Integer, primary_key=True)
    paciente_id = Column(Integer, ForeignKey('patient.id'))
    fuma = Column(String(500))
    actividad = Column(String(500))
    bombillos = Column(String(500))
    techo = Column(String(500))
    joyeria = Column(String(500))
    transporte = Column(String(500))
    agua = Column(String(500))
    suplementos = Column(String(500))

    patient = relationship("Patient", back_populates="health")

class User(Base):
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    password = Column(String(50))
    
    

