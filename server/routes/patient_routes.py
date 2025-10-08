from flask import Blueprint, request, jsonify
from models.patient_models import session, Patient

patient_bp = Blueprint('patients', __name__)

@patient_bp.route('/', methods=['GET'])
def index():
    return "Hello from Patients!"

@patient_bp.route('/api/pacientes', methods=['POST'])
def create_patient_general_data():
    # Verificar que existe JSON y datos_generales
    if not request.json or 'datos_generales' not in request.json:
        return jsonify({'error': 'Missing patient data'}), 400

    patient_data = request.json.get('datos_generales')
    
    # Validar campos requeridos
    required_fields = ['nombre', 'apellido', 'edad', 'sexo', 'sector', 'zona', 'direccion', 'telefono', 'email', 'ocupacion', 'institucion']
    missing_fields = []
    for field in required_fields:
        if field not in patient_data or patient_data[field] is None or str(patient_data[field]).strip() == '':
            missing_fields.append(field)
    
    if missing_fields:
        return jsonify({'error': f'Missing required fields: {missing_fields}'}), 400
    
    # Si pasa todas las validaciones, crear el paciente
    try:
        # Convertir edad a entero
        edad_int = int(patient_data.get('edad'))
        
        new_patient = Patient(
            nombre=patient_data.get('nombre').strip(),
            apellido=patient_data.get('apellido').strip(),
            edad=edad_int,
            sexo=patient_data.get('sexo').strip(),
            sector=patient_data.get('sector').strip(),
            zona=patient_data.get('zona').strip(),
            direccion=patient_data.get('direccion').strip(),
            telefono=patient_data.get('telefono').strip(),
            email=patient_data.get('email').strip(),
            ocupacion=patient_data.get('ocupacion').strip(),
            institucion=patient_data.get('institucion').strip()
        )
        
        session.add(new_patient)
        session.commit()
        print(f"✅ Paciente creado: {new_patient.nombre} {new_patient.apellido}")
        
        return jsonify({
            'paciente_id': new_patient.id, 
            'message': 'Paciente creado exitosamente'
        }), 201
        
    except Exception as e:
        session.rollback()
        print(f"❌ Error creating patient: {e}")
        return jsonify({'error': str(e)}), 500
