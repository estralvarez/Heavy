from flask import Blueprint, request, jsonify
from models.patient_models import session, Patient, RiskZones, Illness, Food, Health

patient_bp = Blueprint('patients', __name__)

@patient_bp.route('/', methods=['GET'])
def index():
    return "Hello from Patients!"

@patient_bp.route('/api/pacientes', methods=['POST'])
def create_patient_general_data():
    if not request.json or 'datos_generales' not in request.json:
        return jsonify({'error': 'Missing patient data'}), 400

    patient_data = request.json.get('datos_generales')
    
    try:
        new_patient = Patient(
            nombre=patient_data.get('nombre', '').strip(),
            apellido=patient_data.get('apellido', '').strip(),
            edad=int(patient_data.get('edad', 0)),
            sexo=patient_data.get('sexo', '').strip(),
            sector=patient_data.get('sector', '').strip(),
            zona=patient_data.get('zona', '').strip(),
            direccion=patient_data.get('direccion', '').strip(),
            telefono=patient_data.get('telefono', '').strip(),
            email=patient_data.get('email', '').strip(),
            ocupacion_madre=patient_data.get('ocupacion_madre', '').strip(),
            ocupacion_padre=patient_data.get('ocupacion_padre', '').strip(),
            institucion=patient_data.get('institucion', '').strip(),
            venopuncion=bool(patient_data.get('venopuncion', False))
        )

        session.add(new_patient)
        session.commit()
        return jsonify({'paciente_id': new_patient.id, 'message': 'Paciente creado exitosamente'}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/api/pacientes/<int:paciente_id>/risk-zones', methods=['POST'])
def create_risk_zones(paciente_id):
    paciente = session.query(Patient).get(paciente_id)
    if not paciente:
        return jsonify({'error': 'Paciente no encontrado'}), 404

    zonas_data = request.json.get('zonas_exposicion', {})
    
    try:
        talleres = zonas_data.get('talleres', [])
        industrias = zonas_data.get('industrias', [])
        lugares = zonas_data.get('lugares', [])

        nueva_zona = RiskZones(
            paciente_id=paciente_id,
            talleres=', '.join(talleres),
            industrias=', '.join(industrias),
            lugares=', '.join(lugares)
        )
        session.add(nueva_zona)
        session.commit()
        return jsonify({'risk_zone_id': nueva_zona.id, 'message': 'Zonas guardadas exitosamente'}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/api/pacientes/<int:paciente_id>/illness', methods=['POST'])
def create_illness(paciente_id):
    paciente = session.query(Patient).get(paciente_id)
    if not paciente:
        return jsonify({'error': 'Paciente no encontrado'}), 404

    illness_data = request.json.get('antecedentes_patologicos', {})
    
    try:
        sintomas = illness_data.get('sintomas', [])
        patologias = illness_data.get('patologias', [])
        metal = illness_data.get('metal', '')

        nueva_enfermedad = Illness(
            paciente_id=paciente_id,
            sintomas=', '.join(sintomas),
            patologias=', '.join(patologias),
            metal=metal
        )
        session.add(nueva_enfermedad)
        session.commit()
        return jsonify({'illness_id': nueva_enfermedad.id, 'message': 'Enfermedades guardadas exitosamente'}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/api/pacientes/<int:paciente_id>/food-habits', methods=['POST'])
def create_food(paciente_id):
    paciente = session.query(Patient).get(paciente_id)
    if not paciente:
        return jsonify({'error': 'Paciente no encontrado'}), 404

    food_data = request.json.get('habitos_alimenticios', {})
    
    try:
        nueva_comida = Food(
            paciente_id=paciente_id,
            cereales=food_data.get('cereales', []),
            leguminosas=food_data.get('leguminosas', []),
            tuberculos=food_data.get('tuberculos', []),
            carnes=food_data.get('carnes', []),
            pescados=food_data.get('pescados', []),
            pescados_procesados=food_data.get('pescados_procesados', []),
            bebidas=food_data.get('bebidas', []),
            huevos=food_data.get('huevos', []),
            lacteos=food_data.get('lacteos', []),
            frutas=food_data.get('frutas', []),
            vegetales=food_data.get('vegetales', []),
            azucar=food_data.get('azucar', []),
            grasas=food_data.get('grasas', []),
            chocolate=food_data.get('chocolate', [])
        )
        session.add(nueva_comida)
        session.commit()
        return jsonify({'food_id': nueva_comida.id, 'message': 'Alimentos guardados exitosamente'}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/api/pacientes/<int:paciente_id>/health-habits', methods=['POST'])
def create_health_habits(paciente_id):
    paciente = session.query(Patient).get(paciente_id)
    if not paciente:
        return jsonify({'error': 'Paciente no encontrado'}), 404

    health_data = request.json.get('habitos_de_salud', {})
    
    try:
        transporte = health_data.get('transporte', [])
        agua = health_data.get('agua', [])
        suplementos = health_data.get('suplementos', [])

        nueva_salud = Health(
            paciente_id=paciente_id,
            fuma=health_data.get('fuma'),
            actividad=health_data.get('actividad'),
            bombillos=health_data.get('bombillos'),
            techo=health_data.get('techo'),
            joyeria=health_data.get('joyeria'),
            transporte=', '.join(transporte) if transporte else '',
            agua=', '.join(agua) if agua else '',
            suplementos=', '.join(suplementos) if suplementos else ''
        )
        session.add(nueva_salud)
        session.commit()
        return jsonify({'health_id': nueva_salud.id, 'message': 'Hábitos de salud guardados exitosamente'}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
        