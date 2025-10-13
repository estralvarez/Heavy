import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function FoodFrequencyForm({ data, onChange }) {
  // 1. DATOS MEJORADOS: Combinamos los datos para que sean más ricos, como en el .tsx
  const alimentos = [
    { id: "cereales", label: "Cereales", categoria: "arroz, avena, maíz, trigo (pan, harina)"},
    { id: "leguminosas", label: "Leguminosas", categoria: "arvejas, caraotas, frijoles, lentejas, soya"},
    { id: "tuberculos", label: "Tubérculos y plátano", categoria: "batata, ñame, ocumo, papa, yuca y plátano"},
    { id: "carnes", label: "Carnes", categoria: "carne de res, cerdo, embutidos, pollo"},
    { id: "pescados", label: "Pescados y mariscos (frescos)", categoria: "atún, sushi, sardina"},
    { id: "pescados_procesados", label: "Pescados y mariscos (procesados)", categoria: "atun enlatado"},
    { id: "bebidas", label: "Bebidas", categoria: "Refrescos, bebidas energeticas"},
    { id: "huevos", label: "Huevos", categoria: "cocido"},
    { id: "lacteos", label: "Lácteos", categoria: "leche, queso amarillo, queso blanco, suero, yogurt"},
    { id: "frutas", label: "Frutas", categoria: "frescas, jugo natural"},
    { id: "vegetales", label: "Vegetales", categoria: "albahaca, berenjena, berro, cebolla, espinaca"},
    { id: "azucar", label: "Azúcar", categoria: "azúcar, miel"},
    { id: "grasas", label: "Grasas", categoria: "aceite, mantequilla, margarina, mayonesa"},
    { id: "chocolate", label: "Productos de Cacao", categoria: "chocolate, cacao en polvo"},
  ];

  const opcionesFrecuencia = [
    { id: "nunca", label: "1", value: "Nunca"},
    { id: "rara_vez", label: "2", value: "Rara vez"},
    { id: "a_veces", label: "3", value: "A veces"},
    { id: "frecuentemente", label: "4", value: "Frecuentemente"},
    { id: "diario", label: "5", value: "Diario"},
  ];

  // 2. LÓGICA DE ESTADO AVANZADA: Tomada del .tsx para la interactividad
  const [responses, setResponses] = useState(data || {});

  const handleFrequencySelect = (alimentoId, frecuenciaId) => {
    const newResponses = { ...responses, [alimentoId]: frecuenciaId };
    setResponses(newResponses);
    onChange(newResponses); // Notificar al componente padre
  };
  
  return (
    <form>
          <hr className="border-t border-white my-4" />
          {alimentos.map((alimento) => (
            <div
              key={alimento.id}
              className={`card-shadow p-3 border rounded-3 transition-all ${
                responses[alimento.id] }`}
            >
              <div className="d-flex align-items-center mb-2">
                <span className="fs-4 me-3">{alimento.emoji}</span>
                <div className="flex-grow-1">
                  <h3 className="h6 mb-0 fw-semibold">{alimento.label}</h3>
                  <p className="food-category-label mb-0">{alimento.categoria}</p>
                </div>
                {responses[alimento.id] && <CheckCircle className="text-success ms-auto" />}
              </div>
              
              {/* Rejilla de Botones de Bootstrap */}
              <div className="row row-cols-2 row-cols-md-5 g-2">
                {opcionesFrecuencia.map((freq) => (
                  <div className="col" key={freq.id}>
                    <button
                      type="button"
                      onClick={() => handleFrequencySelect(alimento.id, freq.id)}
                      className={`circular-btn w-100 ${
                        responses[alimento.id] === freq.id ? 'selected' : ''
                      }`}
                    >
                      <span>{freq.label}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </form>
  );
}