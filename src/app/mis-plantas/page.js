"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, Droplets, Leaf, Plus, Trash2, X } from "lucide-react";
import { plantas } from "@/data/plantas";

const STORAGE_KEY = "myplantcare-mis-plantas-v1";

function fechaLocalISO(fecha = new Date()) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

function fechaDesdeISO(valor) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor ?? "")) return null;
  const [anio, mes, dia] = valor.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia
    ? fecha
    : null;
}

function sumarDias(fecha, dias) {
  const resultado = new Date(fecha);
  resultado.setDate(resultado.getDate() + dias);
  return resultado;
}

function diferenciaEnDias(fechaFutura, fechaActual) {
  const futuraUTC = Date.UTC(fechaFutura.getFullYear(), fechaFutura.getMonth(), fechaFutura.getDate());
  const actualUTC = Date.UTC(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
  return Math.round((futuraUTC - actualUTC) / 86400000);
}

function mostrarFecha(fecha) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fecha);
}

function nuevoId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function leerEjemplares() {
  try {
    const guardados = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(guardados)) return [];

    return guardados.filter(
      (ejemplar) =>
        ejemplar &&
        typeof ejemplar.id === "string" &&
        plantas.some((planta) => planta.id === Number(ejemplar.plantaId)) &&
        fechaDesdeISO(ejemplar.ultimoRiego),
    );
  } catch {
    return [];
  }
}

export default function MisPlantas() {
  const [ejemplares, setEjemplares] = useState([]);
  const [cargado, setCargado] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [plantaSeleccionada, setPlantaSeleccionada] = useState(String(plantas[0]?.id ?? ""));
  const [nombreEjemplar, setNombreEjemplar] = useState("");
  const [ultimoRiego, setUltimoRiego] = useState(fechaLocalISO());
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    setEjemplares(leerEjemplares());
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ejemplares));
    } catch {
      setMensaje("No se pudieron guardar los cambios en este navegador.");
    }
  }, [ejemplares, cargado]);

  const ejemplaresConDatos = useMemo(
    () =>
      ejemplares
        .map((ejemplar) => ({
          ...ejemplar,
          planta: plantas.find((planta) => planta.id === Number(ejemplar.plantaId)),
        }))
        .filter((ejemplar) => ejemplar.planta),
    [ejemplares],
  );

  function abrirModal() {
    setPlantaSeleccionada(String(plantas[0]?.id ?? ""));
    setNombreEjemplar("");
    setUltimoRiego(fechaLocalISO());
    setModalAbierto(true);
  }

  function agregarEjemplar(evento) {
    evento.preventDefault();
    const planta = plantas.find((item) => item.id === Number(plantaSeleccionada));
    if (!planta) return;

    setEjemplares((actuales) => [
      ...actuales,
      {
        id: nuevoId(),
        plantaId: planta.id,
        nombre: nombreEjemplar.trim(),
        ultimoRiego: fechaDesdeISO(ultimoRiego) ? ultimoRiego : fechaLocalISO(),
      },
    ]);
    setMensaje(`${nombreEjemplar.trim() || planta.nombre} se agregó a Mis plantas.`);
    setModalAbierto(false);
  }

  function regarEjemplar(id, nombre) {
    const hoy = fechaLocalISO();
    setEjemplares((actuales) =>
      actuales.map((ejemplar) => (ejemplar.id === id ? { ...ejemplar, ultimoRiego: hoy } : ejemplar)),
    );
    setMensaje(`${nombre} quedó registrada como regada hoy.`);
  }

  function eliminarEjemplar(id, nombre) {
    setEjemplares((actuales) => actuales.filter((ejemplar) => ejemplar.id !== id));
    setMensaje(`${nombre} se eliminó de Mis plantas.`);
  }

  return (
    <section className="mx-auto max-w-5xl py-6 text-green-950 sm:py-10">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
            <Leaf className="h-4 w-4" aria-hidden="true" /> Tu colección
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">Mis plantas</h1>
          <p className="mt-2 max-w-xl text-green-900/75">
            Lleva un registro de cada ejemplar y consulta cuándo le toca su próximo riego.
          </p>
        </div>
        <button
          type="button"
          onClick={abrirModal}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
        >
          <Plus className="h-5 w-5" aria-hidden="true" /> Agregar planta
        </button>
      </div>

      <p className="sr-only" aria-live="polite">{mensaje}</p>

      {!cargado ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center text-green-900" aria-live="polite">
          Cargando tu colección…
        </div>
      ) : ejemplaresConDatos.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-green-300 bg-green-50 px-6 py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-800">
            <Leaf className="h-7 w-7" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold">Tu colección empieza aquí</h2>
          <p className="mx-auto mt-2 max-w-md text-green-900/75">
            Agrega una planta para empezar a registrar sus riegos. Puedes guardar varios ejemplares de la misma especie.
          </p>
          <button
            type="button"
            onClick={abrirModal}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-3 font-semibold text-white transition hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
          >
            <Plus className="h-5 w-5" aria-hidden="true" /> Agregar mi primera planta
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between text-sm text-green-900/75">
            <span>{ejemplaresConDatos.length} {ejemplaresConDatos.length === 1 ? "ejemplar" : "ejemplares"}</span>
            <span>Los datos se guardan en este navegador</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ejemplaresConDatos.map(({ id, plantaId, nombre, ultimoRiego: ultimoRiegoGuardado, planta }) => {
              const fechaRiego = fechaDesdeISO(ultimoRiegoGuardado);
              const proximoRiego = fechaRiego ? sumarDias(fechaRiego, planta.riegoDias) : null;
              const diasRestantes = proximoRiego
                ? diferenciaEnDias(proximoRiego, fechaDesdeISO(fechaLocalISO()))
                : 0;
              const etiqueta = nombre || planta.nombre;
              const estadoRiego = diasRestantes < 0
                ? { texto: `Riego pendiente desde hace ${Math.abs(diasRestantes)} ${Math.abs(diasRestantes) === 1 ? "día" : "días"}`, clase: "bg-amber-100 text-amber-900" }
                : diasRestantes === 0
                  ? { texto: "Le toca riego hoy", clase: "bg-blue-100 text-blue-900" }
                  : { texto: `Próximo riego en ${diasRestantes} ${diasRestantes === 1 ? "día" : "días"}`, clase: "bg-green-100 text-green-900" };

              return (
                <article key={id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">
                  <div className="relative h-48 bg-green-50">
                    <img src={planta.imagen} alt={planta.nombre} className="h-full w-full object-cover" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green-900 shadow-sm">
                      Ejemplar #{String(ejemplaresConDatos.filter((item) => item.plantaId === plantaId).findIndex((item) => item.id === id) + 1)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="text-xl font-bold">{etiqueta}</h2>
                    {nombre && <p className="mt-1 text-sm text-green-900/65">{planta.nombre}</p>}
                    <div className="mt-4 space-y-3 text-sm">
                      <p className="flex items-start gap-2 text-green-950">
                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-green-700" aria-hidden="true" />
                        <span>Último riego: <strong>{fechaRiego ? mostrarFecha(fechaRiego) : "Sin registro"}</strong></span>
                      </p>
                      <p className="flex items-start gap-2 text-green-950">
                        <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                        <span>Frecuencia recomendada: <strong>cada {planta.riegoDias} días</strong></span>
                      </p>
                    </div>
                    <p className={`mt-4 rounded-lg px-3 py-2 text-sm font-semibold ${estadoRiego.clase}`}>
                      {estadoRiego.texto}
                    </p>
                    <div className="mt-auto flex gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => regarEjemplar(id, etiqueta)}
                        className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-green-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                      >
                        <Check className="h-4 w-4" aria-hidden="true" /> Regada hoy
                      </button>
                      <button
                        type="button"
                        onClick={() => eliminarEjemplar(id, etiqueta)}
                        aria-label={`Eliminar ${etiqueta} de Mis plantas`}
                        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-red-200 px-3 text-red-700 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      {modalAbierto && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) setModalAbierto(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="agregar-planta-titulo"
            className="w-full max-w-lg rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl sm:p-7"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="agregar-planta-titulo" className="text-2xl font-bold text-green-950">Agregar ejemplar</h2>
                <p className="mt-1 text-sm text-green-900/70">Puedes agregar la misma especie varias veces.</p>
              </div>
              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                aria-label="Cerrar formulario"
                className="rounded-lg p-2 text-green-900 transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-800"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <form onSubmit={agregarEjemplar} className="space-y-4">
              <div>
                <label htmlFor="especie" className="mb-1.5 block text-sm font-semibold text-green-950">Especie</label>
                <select
                  id="especie"
                  value={plantaSeleccionada}
                  onChange={(evento) => setPlantaSeleccionada(evento.target.value)}
                  className="min-h-11 w-full rounded-lg border border-green-300 bg-white px-3 text-green-950 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                >
                  {plantas.map((planta) => <option key={planta.id} value={planta.id}>{planta.nombre}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="nombre-ejemplar" className="mb-1.5 block text-sm font-semibold text-green-950">Nombre para identificarlo <span className="font-normal text-green-900/65">(opcional)</span></label>
                <input
                  id="nombre-ejemplar"
                  type="text"
                  maxLength={40}
                  value={nombreEjemplar}
                  onChange={(evento) => setNombreEjemplar(evento.target.value)}
                  placeholder="Ej. Potos de la sala"
                  className="min-h-11 w-full rounded-lg border border-green-300 px-3 text-green-950 placeholder:text-gray-400 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
              <div>
                <label htmlFor="ultimo-riego" className="mb-1.5 block text-sm font-semibold text-green-950">Fecha del último riego</label>
                <input
                  id="ultimo-riego"
                  type="date"
                  max={fechaLocalISO()}
                  value={ultimoRiego}
                  onChange={(evento) => setUltimoRiego(evento.target.value)}
                  className="min-h-11 w-full rounded-lg border border-green-300 px-3 text-green-950 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-900">
                El intervalo de riego se toma de la recomendación del catálogo para esa especie.
              </p>
              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="min-h-11 rounded-lg border border-green-300 px-4 py-2 font-semibold text-green-900 transition hover:bg-green-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-green-800 px-4 py-2 font-semibold text-white transition hover:bg-green-900"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" /> Guardar ejemplar
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}

