"use client";

import { useState } from "react";
import { plantas } from "../data/plantas";
import PlantCard from "../components/PlantCard";
import SearchBar from "../components/SearchBar";

const filtros = ["Todas", "Baja luz", "Riego escaso", "Pet-friendly"];

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todas");

  // Filtrado combinado por texto y por botones
  const resultado = plantas
    .filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((p) => {
      if (filtro === "Baja luz") return p.luz === "baja";
      if (filtro === "Riego escaso") return p.riego === "bajo";
      if (filtro === "Pet-friendly") return p.petFriendly;
      return true;
    });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-4xl font-bold text-green-600">Catálogo de plantas</h1>
        <p className="text-gray-300 text-lg mt-1">
          Explora especies de interior y encuentra la ideal para tu espacio.
        </p>
      </div>

      {/* Buscador y Filtros */}
      <div className="space-y-3">
        <SearchBar value={busqueda} onChange={setBusqueda} />

        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                filtro === f
                  ? "bg-green-600 text-white border-green-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Cuadrícula de plantas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resultado.map((p) => (
          <PlantCard key={p.id} planta={p} />
        ))}
      </div>

      {resultado.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 text-lg">No se encontraron plantas.</p>
        </div>
      )}
    </div>
  );
}