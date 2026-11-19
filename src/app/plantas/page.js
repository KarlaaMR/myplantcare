import Catalogo from "@/components/Catalogo";
import { supabase } from "@/lib/supabase";

export default async function Wiki() {
  const { data: plantas, error } = await supabase
    .from("plantas")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error al cargar plantas:", error);
  }

  return (
    <div>
      <Catalogo plantas={plantas || []} />
    </div>
  );
}