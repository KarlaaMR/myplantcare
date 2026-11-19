"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    //Revisar si ya hay una sesión activa al cargar
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUsuario(user);
    });

    //Actualizar automáticamente el botón cuando el usuario inicia o cierra sesión
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function cerrarSesion() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="bg-green-700 text-white p-4 flex flex-wrap items-center justify-between gap-2">
      <Link href="/" className="font-bold text-4xl">
        MyPlantCare
      </Link>
      <div className="flex flex-wrap items-center gap-4 text-lg">
        <Link href="/plantas">Plantas</Link>
        <Link href="/diagnostico">Diagnóstico</Link>
        <Link href="/calendario">Calendario</Link>
        <Link href="/mis-plantas">Mis plantas</Link>

        {usuario ? (
          <button
            onClick={cerrarSesion}
            className="rounded-lg bg-white/15 px-3 py-1 text-base font-semibold transition hover:bg-white/25"
          >
            Cerrar sesión
          </button>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-white px-3 py-1 text-base font-semibold text-green-900 transition hover:bg-green-100"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}