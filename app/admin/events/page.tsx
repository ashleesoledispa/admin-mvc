"use client";

import { useEffect, useState } from "react";

type EventType = {
  id: number;
  name: string;
  date: string;
  capacity: number;
  category: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);

  const [form, setForm] = useState({
    name: "",
    date: "",
    capacity: "",
    category: "",
  });

  async function loadEvents() {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        capacity: Number(form.capacity),
      }),
    });

    setForm({
      name: "",
      date: "",
      capacity: "",
      category: "",
    });

    loadEvents();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Administración de Eventos
        </h1>

        <form
          onSubmit={createEvent}
          className="bg-zinc-900 p-6 rounded-2xl mb-10 space-y-4"
        >
          <input
            placeholder="Nombre del evento"
            className="w-full p-3 rounded bg-zinc-800"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="date"
            className="w-full p-3 rounded bg-zinc-800"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Capacidad"
            className="w-full p-3 rounded bg-zinc-800"
            value={form.capacity}
            onChange={(e) =>
              setForm({ ...form, capacity: e.target.value })
            }
          />

          <input
            placeholder="Categoría"
            className="w-full p-3 rounded bg-zinc-800"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl">
            Crear Evento
          </button>
        </form>

        <div className="grid gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800"
            >
              <h2 className="text-2xl font-semibold">
                {event.name}
              </h2>

              <p className="text-zinc-400">
                {new Date(event.date).toLocaleDateString()}
              </p>

              <p>
                Capacidad: {event.capacity}
              </p>

              <p>
                Categoría: {event.category}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}