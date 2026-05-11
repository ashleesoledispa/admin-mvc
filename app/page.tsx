import Link from "next/link";
import { CalendarDays, BarChart3, Ticket } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-5xl font-bold mb-4">
          Event Analytics Manager
        </h1>

        <p className="text-zinc-400 mb-10 text-lg">
          Sistema MVC para gestión y análisis comparativo de eventos.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            href="/admin/events"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition"
          >
            <CalendarDays className="mb-4" size={40} />
            <h2 className="text-2xl font-semibold mb-2">
              Eventos
            </h2>
            <p className="text-zinc-400">
              Crear y administrar eventos.
            </p>
          </Link>

          <Link
            href="/admin/sales"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition"
          >
            <Ticket className="mb-4" size={40} />
            <h2 className="text-2xl font-semibold mb-2">
              Ventas
            </h2>
            <p className="text-zinc-400">
              Registrar ventas de entradas.
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition"
          >
            <BarChart3 className="mb-4" size={40} />
            <h2 className="text-2xl font-semibold mb-2">
              Dashboard
            </h2>
            <p className="text-zinc-400">
              Comparación inteligente de eventos.
            </p>
          </Link>

        </div>
      </div>
    </main>
  );
}