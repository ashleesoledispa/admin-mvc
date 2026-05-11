"use client";

import { useEffect, useState } from "react";

type EventType = {
  id: number;
  name: string;
  capacity: number;
};

type SaleType = {
  id: number;
  ticketsSold: number;
  price: number;
  event: EventType;
};

export default function SalesPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [sales, setSales] = useState<SaleType[]>([]);

  const [form, setForm] = useState({
    eventId: "",
    ticketsSold: "",
    price: "",
  });

  async function loadData() {
    const eventsRes = await fetch("/api/events");
    const eventsData = await eventsRes.json();
    setEvents(eventsData);

    const salesRes = await fetch("/api/sales");
    const salesData = await salesRes.json();
    setSales(salesData);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createSale(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: Number(form.eventId),
        ticketsSold: Number(form.ticketsSold),
        price: Number(form.price),
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    setForm({
      eventId: "",
      ticketsSold: "",
      price: "",
    });

    loadData();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Registro de Ventas
        </h1>

        <form
          onSubmit={createSale}
          className="bg-zinc-900 p-6 rounded-2xl mb-10 space-y-4"
        >

          <select
            className="w-full p-3 rounded bg-zinc-800"
            value={form.eventId}
            onChange={(e) =>
              setForm({ ...form, eventId: e.target.value })
            }
          >
            <option value="">
              Selecciona un evento
            </option>

            {events.map((event) => (
              <option
                key={event.id}
                value={event.id}
              >
                {event.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Entradas vendidas"
            className="w-full p-3 rounded bg-zinc-800"
            value={form.ticketsSold}
            onChange={(e) =>
              setForm({
                ...form,
                ticketsSold: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Precio"
            className="w-full p-3 rounded bg-zinc-800"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl">
            Registrar Venta
          </button>

        </form>

        <div className="grid gap-4">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800"
            >
              <h2 className="text-2xl font-semibold">
                {sale.event.name}
              </h2>

              <p>
                Entradas: {sale.ticketsSold}
              </p>

              <p>
                Precio: ${sale.price}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}