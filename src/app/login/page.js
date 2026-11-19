"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Leaf, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [esRegistro, setEsRegistro] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function manejarSubmit(e) {
    e.preventDefault();
    setCargando(true);
    setError("");
    setMensaje("");

    if (esRegistro) {
      // Crear cuenta nueva
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMensaje("¡Cuenta creada! Ya puedes iniciar sesión.");
        setEsRegistro(false);
      }
    } else {
      // Iniciar sesión
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Correo o contraseña incorrectos.");
      } else {
        router.push("/mis-plantas");
        router.refresh();
      }
    }

    setCargando(false);
  }

  return (
    <section className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border-2 border-green-900 bg-lime-100 p-6 shadow-md sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-900 text-white">
            <Leaf className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-green-950">
            {esRegistro ? "Crear cuenta" : "Iniciar sesión"}
          </h1>
          <p className="mt-1 text-sm text-green-900/75">
            {esRegistro
              ? "Regístrate para guardar tus plantas y llevar el control de riego."
              : "Entra para ver tu colección de plantas y favoritos."}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-100 px-3 py-2 text-sm font-medium text-red-800">
            {error}
          </div>
        )}

        {mensaje && (
          <div className="mb-4 rounded-lg border border-green-400 bg-green-100 px-3 py-2 text-sm font-medium text-green-900">
            {mensaje}
          </div>
        )}

        <form onSubmit={manejarSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-green-950">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-green-800" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="min-h-11 w-full rounded-lg border-2 border-green-900/30 bg-white pl-10 pr-3 text-green-950 focus:border-green-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
  <label htmlFor="password" className="mb-1 block text-sm font-semibold text-green-950">
    Contraseña
  </label>
  <div className="relative">
    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-green-800" />
    <input
      id="password"
      type={mostrarPassword ? "text" : "password"}
      required
      minLength={6}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Mínimo 6 caracteres"
      className="min-h-11 w-full rounded-lg border-2 border-green-900/30 bg-white pl-10 pr-10 text-green-950 focus:border-green-900 focus:outline-none"
    />
    <button
      type="button"
      onClick={() => setMostrarPassword(!mostrarPassword)}
      aria-label={mostrarPassword ? "Ocultar contraseña" : "Ver contraseña"}
      className="absolute right-3 top-3 text-green-800 hover:text-green-950"
    >
      {mostrarPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  </div>
</div>

          <button
            type="submit"
            disabled={cargando}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 font-bold text-white transition hover:bg-green-800 disabled:opacity-60"
          >
            {cargando ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : esRegistro ? (
              "Registrarme"
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-green-950">
          {esRegistro ? "¿Ya tienes cuenta?" : "¿Todavía no tienes cuenta?"}{" "}
          <button
            type="button"
            onClick={() => {
              setEsRegistro(!esRegistro);
              setError("");
              setMensaje("");
            }}
            className="font-bold underline hover:text-green-700"
          >
            {esRegistro ? "Inicia sesión" : "Regístrate aquí"}
          </button>
        </div>
      </div>
    </section>
  );
}