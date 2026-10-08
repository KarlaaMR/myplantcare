import Link from "next/link";
import { Sun, Droplets, Tag, PawPrint } from "lucide-react";

export default function PlantCard({ planta }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between">
      <div>
        {/* Imagen de la planta */}
        <div className="w-full h-44 overflow-hidden rounded-lg mb-3 bg-gray-100">
          <img
            src={planta.imagen}
            alt={planta.nombre}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Encabezado y badges */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-gray-800">{planta.nombre}</h3>
          {planta.petFriendly && (
            <span
              className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
              title="Segura para mascotas"
            >
              <PawPrint className="w-3 h-3" />
              Pet-friendly
            </span>
          )}
        </div>

        {/* Detalles de cuidado */}
        <div className="space-y-1.5 text-sm text-gray-600 mb-4">
          <p className="flex items-center gap-2 capitalize">
            <Sun className="w-4 h-4 text-amber-500 shrink-0" />
            <span><strong>Luz:</strong> {planta.luz}</span>
          </p>
          <p className="flex items-center gap-2 capitalize">
            <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
            <span><strong>Riego:</strong> {planta.riego}</span>
          </p>
          <p className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Dificultad:</strong> {planta.dificultad}</span>
          </p>
        </div>
      </div>

      {/* Botón hacia la Ficha */}
      <Link
        href={`/plantas/${planta.id}`}
        className="block text-center w-full bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition"
      >
        Ver planta
      </Link>
    </div>
  );
}