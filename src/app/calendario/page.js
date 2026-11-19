import CalendarioSiembra from "../../components/CalendarioSiembra";
import { supabase } from "@/lib/supabase";

export default async function Calendario() {
  const { data: plantas, error } = await supabase
    .from("plantas")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error al cargar plantas para el calendario:", error);
  }

  return (
    <div className="p-6">
      <CalendarioSiembra plantas={plantas || []} />
    </div>
  );
}