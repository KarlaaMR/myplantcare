import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4 flex flex-wrap items-center justify-between gap-2">
      <span className="font-bold text-4xl">MyPlantCare</span>
      <div className="flex gap-4 text-lg">
        <Link href="/">Plantas</Link>
        <Link href="/diagnostico">Diagnóstico</Link>
        <Link href="/calendario">Calendario</Link>
        <Link href="/mis-plantas">Mis plantas</Link>
      </div>
    </nav>
  );
}