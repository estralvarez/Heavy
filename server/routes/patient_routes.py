from flask import Blueprint, request, jsonify
from models.patient_models import session, Patient, RiskZones, Illness
import json

patient_bp = Blueprint('patients', __name__)

@patient_bp.route('/', methods=['GET'])
def index():
    return "Hello from Patients!"

@patient_bp.route('/api/pacientes', methods=['POST'])
def create_patient_general_data():
    if not request.json or 'datos_generales' not in request.json:
        return jsonify({'error': 'Missing patient data'}), 400

    patient_data = request.json.get('datos_generales')
    required_fields = [
        'nombre', 'apellido', 'edad', 'sexo', 'sector', 'zona',
        'direccion', 'telefono', 'email', 'ocupacion', 'institucion'
    ]
    missing_fields = [f for f in required_fields if not patient_data.get(f)]
    if missing_fields:
        return jsonify({'error': f'Missing required fields: {missing_fields}'}), 400

    try:
        new_patient = Patient(
            nombre=patient_data['nombre'].strip(),
            apellido=patient_data['apellido'].strip(),
            edad=int(patient_data['edad']),
            sexo=patient_data['sexo'].strip(),
            sector=patient_data['sector'].strip(),
            zona=patient_data['zona'].strip(),
            direccion=patient_data['direccion'].strip(),
            telefono=patient_data['telefono'].strip(),
            email=patient_data['email'].strip(),
            ocupacion=patient_data['ocupacion'].strip(),
            institucion=patient_data['institucion'].strip(),
            venopuncion=bool(patient_data.get('venopuncion', False))
        )

        session.add(new_patient)
        session.commit()
        print(f"✅ Paciente creado: {new_patient.nombre} {new_patient.apellido}")

        return jsonify({'paciente_id': new_patient.id, 'message': 'Paciente creado exitosamente'}), 201
    except Exception as e:
        session.rollback()
        print(f"❌ Error creando paciente: {e}")
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/api/pacientes/<int:paciente_id>/risk-zones', methods=['POST'])
def create_risk_zones(paciente_id):
    print(f"📊 Datos recibidos para zonas de riesgo - Paciente ID: {paciente_id}")

    paciente = session.query(Patient).get(paciente_id)
    if not paciente:
        return jsonify({'error': 'Paciente no encontrado'}), 404

    zonas_data = request.json.get('zonas_exposicion', {})
    print("📝 Datos recibidos:", zonas_data)  # Para debugging
    
    try:
        talleres = zonas_data.get('talleres', [])
        industrias = zonas_data.get('industrias', [])
        lugares = zonas_data.get('lugares', [])

        print(f"🏭 Talleres: {talleres}")
        print(f"🏭 Industrias: {industrias}")
        print(f"🏭 Lugares: {lugares}")

        # Guardar en la base de datos 
        nueva_zona = RiskZones(
            paciente_id=paciente_id,
            talleres=', '.join(talleres),
            industrias=', '.join(industrias),
            lugares=', '.join(lugares)
        )
        session.add(nueva_zona)
        session.commit()

        print(f"✅ Zonas guardadas para paciente ID: {paciente_id}")
        return jsonify({'risk_zone_id': nueva_zona.id, 'message': 'Zonas guardadas exitosamente'}), 201
    except Exception as e:
        session.rollback()
        print(f"❌ Error guardando zonas: {e}")
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/api/pacientes/<int:paciente_id>/illness', methods=['POST'])
def create_illness(paciente_id):
    print(f"📊 Datos recibidos para enfermedades - Paciente ID: {paciente_id}")

    paciente = session.query(Patient).get(paciente_id)
    if not paciente:
        return jsonify({'error': 'Paciente no encontrado'}), 404

    illness_data = request.json.get('antecedentes_patologicos', {})
    print("📝 Datos recibidos:", illness_data)
    try:
        enfermedades = illness_data.get('enfermedades', [])
        sintomas = illness_data.get('sintomas', [])

        print(f"🦠 Enfermedades: {enfermedades}")
        print(f"🤒 Síntomas: {sintomas}")

        nueva_enfermedad = Illness(
            paciente_id=paciente_id,
            enfermedades=', '.join(enfermedades),
            sintomas=', '.join(sintomas)
        )
        session.add(nueva_enfermedad)
        session.commit()

        print(f"✅ Enfermedades guardadas para paciente ID: {paciente_id}")
        return jsonify({'illness_id': nueva_enfermedad.id, 'message': 'Enfermedades guardadas exitosamente'}), 201
    except Exception as e:
        session.rollback()
        print(f"❌ Error guardando enfermedades: {e}")
        return jsonify({'error': str(e)}), 500