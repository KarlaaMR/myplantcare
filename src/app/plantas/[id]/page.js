import {plantas} from "@/data/plantas";

export default async function DetallePlanta ({params}) {
    const {id} = await params;
    const plantaEncontrada = plantas.find((p) => p.id === parseInt(id));

    if(!plantaEncontrada){
        return <div>Planta no encontrada</div>;
        
    }

    return(
        <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-3 grid-rows-4 gap-4 min-h-[calc(100vh-172px)] p-6 bg-green-100 rounded-2xl mt-6 font-gothic">
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
                <div className="col-span-1 row-span-2 m-4">
                    <span className="text-2xl text-green-900 font-bold ">Detalles</span>
                    <div className="border-2 border-green-900 p-2 text-green-900">
                        <p>Nombre : {plantaEncontrada.nombre}</p>
                        <p>Pet friendly : {plantaEncontrada.petFriendly ? "Sí" : "No"}</p>
                        <p>Detalles: {plantaEncontrada.luzDetalle}</p>
                        <p>Riego cada {plantaEncontrada.riegoDias} días</p>
                        <p>recomendaciones: {plantaEncontrada.sustrato}</p>
                    </div>
                    
                </div>


            </div>
        </div>
    )   
}