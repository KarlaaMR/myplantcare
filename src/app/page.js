import { plantas } from "../data/plantas";
import Catalogo from "../components/Catalogo";

export const metadata = {
  title: "Catálogo de plantas | MyPlantCare",
  description: "Busca plantas de interior por luz, riego y compatibilidad con mascotas.",
};

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-green-600">Catálogo de plantas</h1>
        <p className="text-gray-300 text-lg mt-1">
          Explora especies de interior y encuentra la ideal para tu espacio.
        </p>
      </div>

      {/* Vista interactiva del catálogo */}
      <Catalogo plantas={plantas} />
    </div>
  );
}