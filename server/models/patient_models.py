from sqlalchemy import Integer, Column, String, Boolean, create_engine, ForeignKey
from sqlalchemy.orm import relationship, joinedload, subqueryload, Session
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
engine = create_engine('sqlite:///patients.db', echo=True)
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
    ocupacion = Column(String(100))
    institucion = Column(String(100))
    venopuncion = Column(Boolean, default=False)

    risk_zones= relationship("RiskZones", back_populates="patient")
    illnesses = relationship("Illness", back_populates="patient")


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
    enfermedades = Column(String(500))
    sintomas = Column(String(500))

    patient = relationship("Patient", back_populates="illnesses")

