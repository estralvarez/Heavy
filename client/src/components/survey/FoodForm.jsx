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
    <form className="space-y-4">
      <p className="text-zinc-400 text-sm mb-6">Seleccione la frecuencia con la que consume cada grupo de alimentos</p>
        {alimentos.map((alimento) => (
        <div
          key={alimento.id}
          className={`p-4 rounded-lg border-2 transition-all ${
            responses[alimento.id]
              ? "bg-zinc-800/50 border-green-500"
              : "bg-zinc-900/50 border-zinc-700 hover:border-zinc-600"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">{alimento.label}</h3>
              <p className="text-sm text-zinc-400">{alimento.categoria}</p>
            </div>
            {responses[alimento.id] && <CheckCircle className="text-green-500 flex-shrink-0 ml-3" size={20} />}
          </div>
              
          {/* Botones de frecuencia en grid responsive */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {opcionesFrecuencia.map((freq) => (
              <button
                key={freq.id}
                type="button"
                onClick={() => handleFrequencySelect(alimento.id, freq.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  responses[alimento.id] === freq.id
                    ? "bg-red-500 text-white shadow-lg scale-105"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {freq.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
}