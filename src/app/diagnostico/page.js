
"use client";

import { useState } from "react";
import { AlertTriangle, Lightbulb, Check, Loader2, Search } from "lucide-react";

export default function Diagnostico() {
  const [sintomasSeleccionados, setSintomasSeleccionados] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [consultando, setConsultando] = useState(false);

  const sintomas = [
    {
      id: "hojas-amarillas",
      nombre: "Hojas amarillas",
      imagen: "/sintomas/hojas-amarillas.jpg",
    },
    {
      id: "bordes-secos",
      nombre: "Bordes secos",
      imagen: "/sintomas/bordes-secos.jpg",
    },
    {
      id: "manchas-hojas",
      nombre: "Manchas en hojas",
      imagen: "/sintomas/manchas-hojas.jpg",
    },
    {
      id: "hojas-caidas",
      nombre: "Hojas caídas o flácidas",
      imagen: "/sintomas/hojas-caidas.jpg",
    },
    {
      id: "crecimiento-lento",
      nombre: "Crecimiento lento",
      imagen: "/sintomas/crecimiento-lento.jpg",
    },
    {
      id: "hojas-quemaduras",
      nombre: "Hojas con quemaduras",
      imagen: "/sintomas/hojas-quemaduras.jpg",
    },
    {
      id: "raices-podridas",
      nombre: "Raíces podridas",
      imagen: "/sintomas/raices-podridas.jpg",
    },
  ];

  const obtenerDiagnostico = (sintomas) => {
    const keys = sintomas.sort().join(",");

    const diagnosticos = {
      "hojas-amarillas": {
        causa: "Clorosis por exceso de riego o deficiencia de nitrógeno/hierro",
        solucion: "Deja secar el sustrato entre riegos. Si el sustrato está seco, aplica quelato de hierro o fertilizante con nitrógeno.",
        gravedad: "media",
      },
      "bordes-secos": {
        causa: "Humedad relativa baja (<40%) o corriente de aire",
        solucion: "Pulveriza agua tibia sobre las hojas, agrupa plantas para crear microclima o usa humidificador. Evita corrientes de aire.",
        gravedad: "baja",
      },
      "manchas-hojas": {
        causa: "Infección fúngica (mancha foliar) o quemaduras por agua fría",
        solucion: "Mejora la ventilación, reduce el riego, elimina hojas afectadas. Si es por agua fría, riega con agua a temperatura ambiente.",
        gravedad: "media",
      },
      "hojas-caidas": {
        causa: "Estrés hídrico: deshidratación severa o anegamiento radicular",
        solucion: "Verifica humedad del sustrato: si seco, riega profundamente. Si húmedo, mejora drenaje y espera a que seque antes de regar.",
        gravedad: "alta",
      },
      "crecimiento-lento": {
        causa: "Fotoperíodo inadecuado o deficiencia nutricional general",
        solucion: "Aumenta horas de luz indirecta (12-14 horas). Aplica fertilizante NPK balanceado 20-20-20 cada 4 semanas en temporada activa.",
        gravedad: "baja",
      },
      "hojas-quemaduras": {
        causa: "Fototoxicidad por radiación UV directa excesiva",
        solucion: "Traslada a sombra parcial o luz filtrada. Usa cortinas translúcidas. Las hojas dañadas no se recuperan, espera crecimiento nuevo.",
        gravedad: "media",
      },
      "raices-podridas": {
        causa: "Pythium o Phytophthora (pudrición radicular) por encharcamiento",
        solucion: "Extrae planta, poda raíces negras/marrones, desinfecta con canela o agua oxigenada diluida, trasplanta a sustrato estéril y drenante.",
        gravedad: "alta",
      },
      "bordes-secos,crecimiento-lento": {
        causa: "Ambiente xérico (seco) con deficiencia de macronutrientes",
        solucion: "Incrementa humedad ambiental al 60-70%. Aplica fertilizante completo con micronutrientes. Verifica que la planta reciba luz adecuada.",
        gravedad: "media",
      },
      "hojas-amarillas,manchas-hojas": {
        causa: "Septoria o Cercospora (enfermedades fúngicas foliares)",
        solucion: "Aísla la planta, elimina hojas afectadas, aplica fungicida a base de cobre o azufre. Mejora circulación de aire y reduce riego.",
        gravedad: "alta",
      },
      "hojas-amarillas,hojas-caidas": {
        causa: "Asfixia radicular por compactación o encharcamiento prolongado",
        solucion: "Saca planta y verifica raíces. Si están podridas, poda y trasplanta a mezcla con perlita (30-40%). Reduce frecuencia de riego drásticamente.",
        gravedad: "alta",
      },
      "bordes-secos,hojas-quemaduras": {
        causa: "Insolación excesiva en ambiente de baja humedad",
        solucion: "Mueve a ubicación con luz filtrada norte/este. Aumenta humedad al 50-60%. Evita riego foliar con sol directo.",
        gravedad: "media",
      },
      "hojas-amarillas,crecimiento-lento": {
        causa: "Deficiencia de nitrógeno (N) o potasio (K) con riego adecuado",
        solucion: "Aplica fertilizante rico en nitrógeno (urea o nitrato de amonio) en primavera/verano. Verifica pH del sustrato (ideal 5.5-6.5).",
        gravedad: "media",
      },
      "manchas-hojas,hojas-caidas": {
        causa: "Marchitez vascular o pudrición del cuello de la raíz",
        solucion: "Revisa cuello de la planta: si está blando/negro, es probable Fusarium. Trasplanta a sustrato estéril, aplica fungicida sistémico.",
        gravedad: "alta",
      },
      "hojas-amarillas,bordes-secos,crecimiento-lento": {
        causa: "Estrés abiótico múltiple: desequilibrio nutricional + ambiente seco",
        solucion: "Realiza análisis de sustrato. Ajusta pH, aplica fertilizante quelatado, aumenta humedad gradualmente. Reduce riego temporalmente.",
        gravedad: "alta",
      },
      "hojas-amarillas,manchas-hojas,hojas-caidas": {
        causa: "Enfermedad sistémica avanzada (posible Pythium + infección foliar)",
        solucion: "Poda tejido afectado, aplica fungicida sistémico, ajusta riego, mejora ventilación. Pronóstico reservado: considera propagación por esquejes sanos.",
        gravedad: "alta",
      },
      "bordes-secos,manchas-hojas": {
        causa: "Oidio (moho polvoriento) en ambiente seco con alta humedad puntual",
        solucion: "Aumenta ventilación, reduce densidad de follaje. Aplica leche diluida (1:10) o azufre. Evita riego foliar en horas de calor.",
        gravedad: "media",
      },
      "hojas-caidas,raices-podridas": {
        causa: "Pudrición radicular severa en etapa avanzada",
        solucion: "Diagnóstico crítico: extrae planta, elimina todo tejido necrótico, sumerge raíces en fungicida, trasplanta a medio inerte (perlita/vermiculita).",
        gravedad: "alta",
      },
      "crecimiento-lento,hojas-quemaduras": {
        causa: "Fotoinhibición por exposición a radiación excesiva",
        solucion: "Reduce intensidad lumínica inmediatamente. Mueve a ventana con luz indirecta. Protege con cortinas. El crecimiento se reanudará en 2-3 semanas.",
        gravedad: "media",
      },
      "hojas-amarillas,bordes-secos": {
        causa: "Clorosis por deficiencia de magnesio (Mg) en ambiente seco",
        solucion: "Aplica sulfato de magnesio (sal de Epsom) diluido en agua de riego. Aumenta humedad ambiental progresivamente.",
        gravedad: "media",
      },
      "manchas-hojas,raices-podridas": {
        causa: "Complejo de enfermedades: patógenos foliares + pudrición radicular",
        solucion: "Intervención urgente: poda foliar, desinfección radicular con peróxido de hidrógeno 3%, trasplante a sustrato esterilizado, aislamiento total.",
        gravedad: "alta",
      },
      "bordes-secos,raices-podridas": {
        causa: "Estrés hídrico contradictorio: raíces dañadas con ambiente seco",
        solucion: "Poda raíces dañadas, trasplanta a medio drenante. No riegues hasta que veas brotes nuevos. Aumenta humedad ambiental para compensar.",
        gravedad: "alta",
      },
      "hojas-amarillas,raices-podridas": {
        causa: "Anoxia radicular con clorosis foliar por deficiencia nutricional",
        solucion: "Diagnóstico severo: raíces no absorben nutrientes. Poda radicular agresiva, trasplante emergente, suspende fertilización hasta recuperación.",
        gravedad: "alta",
      },
      "bordes-secos,manchas-hojas,hojas-caidas": {
        causa: "Infestación de ácaros (araña roja) con estrés ambiental",
        solucion: "Inspecciona envés de hojas. Si hay arañitas rojas, lava con agua jabonosa, aplica aceite de neem. Aumenta humedad para desfavorar ácaros.",
        gravedad: "alta",
      },
      "hojas-amarillas,crecimiento-lento,hojas-caidas": {
        causa: "Deficiencia múltiple de micronutrientes (hierro, manganeso, zinc)",
        solucion: "Aplica quelato de hierro EDDHA, suplemento de micronutrientes. Ajusta pH del sustrato a 5.5-6.0 para mejorar absorción.",
        gravedad: "alta",
      },
      "manchas-hojas,hojas-quemaduras": {
        causa: "Fitotoxicidad por productos químicos o radiación intensa",
        solucion: "Identifica si aplicaste recientemente pesticidas/fertilizantes. Si es por luz, filtra radiación. Lave foliar con agua pura para remover residuos.",
        gravedad: "media",
      },
      "hojas-amarillas,bordes-secos,manchas-hojas": {
        causa: "Múltiples deficiencias nutricionales con estrés ambiental",
        solucion: "Análisis de sustrato recomendado. Aplica fertilizante completo NPK + micronutrientes. Ajusta riego y humedad progresivamente.",
        gravedad: "alta",
      },
      "crecimiento-lento,raices-podridas": {
        causa: "Pudrición radicular inhibiendo absorción de nutrientes",
        solucion: "Poda radicular, trasplante a medio inerte. Suspende fertilización hasta que raíces se recuperen (2-4 semanas). Riego moderado.",
        gravedad: "alta",
      },
      "hojas-amarillas,manchas-hojas,raices-podridas": {
        causa: "Colapso sistémico de la planta (prognóstico reservado)",
        solucion: "Intervención máxima: poda drástica de raíces y follaje, tratamiento fungicida sistémico, trasplante a medio estéril. Considera propagación.",
        gravedad: "alta",
      },
    };

    if (diagnosticos[keys]) {
      return diagnosticos[keys];
    }

    if (sintomas.length === 1) {
      return diagnosticos[sintomas[0]];
    }

    return {
      causa: "Combinación compleja de síntomas múltiples",
      solucion: "Tu planta presenta una combinación poco común de síntomas. Te recomendamos: 1) Verificar drenaje y riego, 2) Ajustar ubicación lumínica, 3) Aplicar fertilizante balanceado, 4) Considerar trasplante con sustrato fresco. Si los síntomas persisten tras 2 semanas, consulta con especialista.",
      gravedad: "alta",
    };
  };

  const toggleSintoma = (id) => {
    setSintomasSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const diagnosticar = () => {
    if (sintomasSeleccionados.length > 0) {
      setConsultando(true);
      setTimeout(() => {
        setResultado(obtenerDiagnostico(sintomasSeleccionados));
        setConsultando(false);
      }, 1500);
    }
  };

  const reiniciar = () => {
    setSintomasSeleccionados([]);
    setResultado(null);
  };

  const getGravedadColor = (gravedad) => {
    switch (gravedad) {
      case "baja":
        return "bg-green-100 text-green-800 border-green-300";
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "alta":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (consultando) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <Loader2 className="w-16 h-16 text-green-700 animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-green-900 mb-2 font-gothic">
          Consultando posibles síntomas...
        </h2>
        <p className="text-gray-600">Analizando la información de tu planta</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto font-gothic">
      <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-2 md:mb-4 flex items-center gap-3">
        <Search className="w-8 h-8 md:w-10 md:h-10" />
        Diagnóstico visual
      </h1>
      <p className="text-gray-700 mb-6 md:mb-8">
        Selecciona todos los síntomas que presenta tu planta
      </p>

      {!resultado ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {sintomas.map((sintoma) => (
              <div
                key={sintoma.id}
                onClick={() => toggleSintoma(sintoma.id)}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                  sintomasSeleccionados.includes(sintoma.id)
                    ? "border-green-900 shadow-lg scale-105 ring-2 ring-green-900"
                    : "border-green-200 shadow-md hover:shadow-lg hover:border-green-700"
                }`}
              >
                <div className="aspect-square bg-gradient-to-br from-green-50 to-lime-100 flex items-center justify-center">
                  <img
                    src={sintoma.imagen}
                    alt={sintoma.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div class="text-6xl text-green-400">🌱</div>
                      `;
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 md:p-4 border-t-2 border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-900 text-sm md:text-base">
                      {sintoma.nombre}
                    </span>
                    <div
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        sintomasSeleccionados.includes(sintoma.id)
                          ? "bg-green-700 border-green-700"
                          : "border-green-300"
                      }`}
                    >
                      {sintomasSeleccionados.includes(sintoma.id) && (
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={diagnosticar}
            disabled={sintomasSeleccionados.length === 0}
            className="w-full bg-green-900 text-white py-4 px-8 rounded-xl font-bold text-lg md:text-xl disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-green-900"
          >
            Diagnosticar ({sintomasSeleccionados.length} seleccionados)
          </button>
        </div>
      ) : (
        <div className="bg-lime-100 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-green-900">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 flex items-center gap-3">
              <Search className="w-8 h-8 md:w-10 md:h-10" />
              Resultado del diagnóstico
            </h2>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getGravedadColor(
                resultado.gravedad
              )}`}
            >
              Gravedad: {resultado.gravedad.toUpperCase()}
            </span>
          </div>

          <div className="space-y-6">
            <div className="bg-amber-200 rounded-xl p-5 border-2 border-green-900">
              <h3 className="font-bold text-lg text-green-950 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Posible causa:
              </h3>
              <p className="text-green-950 text-base md:text-lg leading-relaxed">
                {resultado.causa}
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border-2 border-green-900">
              <h3 className="font-bold text-lg text-green-950 mb-3 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                Recomendación:
              </h3>
              <p className="text-green-950 text-base md:text-lg leading-relaxed">
                {resultado.solucion}
              </p>
            </div>
          </div>

          <button
            onClick={reiniciar}
            className="mt-8 w-full bg-green-900 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-green-900"
          >
            Realizar otro diagnóstico
          </button>
        </div>
      )}
    </div>
  );
}