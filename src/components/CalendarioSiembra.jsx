"use client";

import { useState } from 'react';

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];

export default function CalendarioSiembra({ plantas }) {
    const [mesActual, setMesActual] = useState("Enero");
    const [semanaActual, setSemanaActual] = useState("Semana 1");

    const plantasFiltradas = plantas.filter((p) => {
    const coincideMes = p.mesesSiembra?.includes(mesActual);
    const coincideSemana = p.semanasSiembra?.includes(semanaActual);
    return coincideMes && coincideSemana;
    });

    return (
    <div className="bg-lime-100 p-6 rounded-2xl border-4 border-green-900 font-gothic max-w-4xl mx-auto shadow-sm">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Calendario de Siembra en México</h2>
        
      {/* Selector de Meses */}
        <div className="flex flex-wrap gap-2 mb-4">
        {meses.map((mes) => (
            <button
            key={mes}
            onClick={() => setMesActual(mes)}
            className={`px-3 py-1.5 text-sm font-bold transition-colors border-2 ${
                mesActual === mes
                ? 'bg-green-900 text-white border-green-900'
                : 'bg-transparent text-green-900 border-green-900 hover:bg-green-200'
            }`}
            >
            {mes}
            </button>
        ))}
        </div>

      {/* Selector de Semanas */}
        <div className="flex gap-2 mb-8 border-t-2 border-green-900 pt-4">
        {semanas.map((semana) => (
            <button
            key={semana}
            onClick={() => setSemanaActual(semana)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors border-2 ${
                semanaActual === semana
                ? 'bg-amber-200 text-green-950 border-green-900 shadow-sm'
                : 'bg-transparent text-green-900 border-green-900 hover:bg-lime-200'
            }`}
            >
            {semana}
            </button>
        ))}
        </div>

      {/* Cuadrícula de Plantas Filtradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plantasFiltradas.length > 0 ? (
            plantasFiltradas.map((planta) => (
            <div key={planta.id} className="p-4 bg-transparent border-2 border-green-900 flex flex-col">
                <h3 className="text-lg font-bold text-green-900">{planta.nombre}</h3>
                <p className="text-sm text-green-900 mt-2 flex-grow">
                {planta.descripcion || `Ideal para plantar en ${mesActual}, ${semanaActual}.`}
                </p>
            </div>
            ))
        ) : (
            <div className="col-span-full text-center py-8 border-2 border-green-900 border-dashed bg-white/50">
            <p className="text-green-900 font-bold">No hay plantas recomendadas para esta fecha.</p>
            </div>
        )}
        </div>
    </div>
    );
}