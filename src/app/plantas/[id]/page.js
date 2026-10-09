import {plantas} from "@/data/plantas";
import {Heart} from "lucide-react";
import Link from "next/link";

const niveles = {
  baja: "33%", bajo: "33%", facil: "33%", fácil: "33%",
  media: "66%", medio: "66%",
  alta: "100%", alto: "100%", avanzado: "100%",
  dificil: "100%", difícil: "100%"
};


const BarraEstadistica = ({ titulo, nivel }) => {

  const nivelLimpio = nivel.toLowerCase();
  
  const porcentaje = niveles[nivelLimpio] || "0%";

  return (
    <div className="mb-4">
      {/* Textos de arriba */}
      <div className="flex justify-between items-end mb-1">
        <span className="font-bold text-green-900">{titulo}</span>
        <span className="text-sm font-semibold text-green-700 capitalize">{nivel}</span>
      </div>
      
      {/* Las dos cajas empalmadas */}
      <div className="w-full bg-green-200 h-3 rounded-full overflow-hidden">
        <div 
          className="bg-green-700 h-full rounded-full transition-all duration-1000 ease-out" 
          style={{ width: porcentaje }}
        ></div>
      </div>
    </div>
  );
};

export default async function DetallePlanta ({params}) {
    const {id} = await params;
    const plantaEncontrada = plantas.find((p) => p.id === parseInt(id));

    if(!plantaEncontrada){
        return <div>Planta no encontrada</div>;
        
    }

    return(
        <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-3 grid-rows-4 gap-4 min-h-[calc(100vh-172px)] p-6 bg-lime-100 rounded-2xl mt-6 font-gothic">
                {/* imagen */}
                <div className="col-span-1 row-span-2 overflow-hidden relative">
                    <img src={plantaEncontrada.imagen} alt={plantaEncontrada.nombre} className="absolute inset-0 w-full h-full object-cover border-4 border-green-900"/>
                </div>
                {/* Notas */}
                <div className="col-span-1 row-span-2 m-4 text-green-900">
                    <span className="text-2xl text-green-900 font-bold">Descripción</span>
                    <div className="mt-2 text-justify border-2 border-green-900 p-2 ">                     
                        <p>that's the reason because i prefer insted of It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    </div>
                </div>
                {/* stats*/}
                <div className="col-span-1 row-span-3">
                    <img src="/plantas/farmer.jpeg" alt="Farmer" className="w-full h-full object-cover border-4 border-green-900"/>
                </div>
                {/* Info */}
                <div className="col-span-1 row-span-2">
                    <span className="text-2xl text-green-900 font-bold">Detalles</span>
                    <div className="border-2 border-green-900 p-2 text-green-900 mb-2 mt-2">
                        <p className="font-bold">Nombre : {plantaEncontrada.nombre}</p>
                        <p>Pet friendly : {plantaEncontrada.petFriendly ? "Sí" : "No"}</p>
                        <p>Detalles: {plantaEncontrada.luzDetalle}</p>
                        <p>recomendaciones: {plantaEncontrada.sustrato}</p>
                    </div>
                </div>
                {/* stats */}
                <div className="col-span-1 row-span-3  mt-0 m-4 p-4 bg-amber-200  shadow-sm border-2 border-green-900">
                    <h3 className="text-xl font-bold text-green-950 mb-4 border-b-2 border-green-900 pb-2">
                        Cuidados
                    </h3>
                    
                    {/* Usamos el mini-componente 3 veces, inyectándole los datos reales */}
                    <BarraEstadistica titulo="Luz" nivel={plantaEncontrada.luz} />
                    <BarraEstadistica titulo="Riego" nivel={plantaEncontrada.riego} />
                    <BarraEstadistica titulo="Dificultad" nivel={plantaEncontrada.dificultad} />
                </div>
                {/* botones */}
                
                <div className="col-span-1 row-span-1 flex justify-center items-center gap-4">
                    {/* favoritos */}
                    <Heart className="w-6 h-6 text-red-600 mr-2" />

                    <Link href="/" className="bg-green-900 text-white py-2 px-4 rounded-lg">
                        volver
                    </Link>
                </div>

            </div>
        </div>
    )   
}