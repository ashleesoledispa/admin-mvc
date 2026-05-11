async function getData() {
  const res = await fetch("http://localhost:3000/api/sales", {
    cache: "no-store",
  });

  const sales = await res.json();

  return sales;
}

export default async function DashboardPage() {
  const sales = await getData();

  const groupedEvents: any = {};

  sales.forEach((sale: any) => {
    const eventId = sale.event.id;

    if (!groupedEvents[eventId]) {
      groupedEvents[eventId] = {
        id: sale.event.id,
        name: sale.event.name,
        date: sale.event.date,
        totalTickets: 0,
        totalRevenue: 0,
      };
    }

    groupedEvents[eventId].totalTickets += sale.ticketsSold;

    groupedEvents[eventId].totalRevenue +=
      sale.ticketsSold * sale.price;
  });

  const eventsArray = Object.values(groupedEvents);

  // ORDENAR EVENTOS POR FECHA
  eventsArray.sort(
    (a: any, b: any) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );

  // EVENTO MÁS RECIENTE
  const latestEvent: any =
  eventsArray[eventsArray.length - 1];

const previousEvent: any =
  eventsArray[eventsArray.length - 2];

  let comparisonMessage = "";
  let recommendation = "";

  if (latestEvent && previousEvent) {

    const difference =
      latestEvent.totalTickets -
      previousEvent.totalTickets;

    // EVENTO ACTUAL MEJOR
    if (difference > 0) {

      comparisonMessage =
        `${latestEvent.name} tiene ${difference} entradas más vendidas que ${previousEvent.name}.`;

      recommendation =
        "El evento más reciente tiene mejor rendimiento que el evento anterior.";

    }

    // EVENTO ACTUAL PEOR
    else if (difference < 0) {

      comparisonMessage =
        `${latestEvent.name} tiene ${Math.abs(
          difference
        )} entradas menos vendidas que ${previousEvent.name}.`;

      recommendation =
        "Se recomienda aumentar campañas de marketing y preventa.";

    }

    // MISMO RENDIMIENTO
    else {

      comparisonMessage =
        `${latestEvent.name} tiene el mismo rendimiento que ${previousEvent.name}.`;

      recommendation =
        "Las ventas se mantienen estables entre ambos eventos.";

    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Dashboard Analytics
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {eventsArray.map((event: any) => (

            <div
              key={event.id}
              className="bg-zinc-900 p-8 rounded-2xl"
            >

              <h2 className="text-3xl font-bold mb-4">
                {event.name}
              </h2>

              <p className="text-zinc-400">
                Fecha del Evento
              </p>

              <p className="text-xl mb-4">
                {new Date(event.date).toLocaleDateString()}
              </p>

              <p className="text-zinc-400">
                Entradas Vendidas
              </p>

              <p className="text-5xl font-bold mb-4">
                {event.totalTickets}
              </p>

              <p className="text-zinc-400">
                Ingresos
              </p>

              <p className="text-3xl font-bold">
                ${event.totalRevenue}
              </p>

            </div>
          ))}

        </div>

        <div className="bg-zinc-900 p-8 rounded-2xl">

          <h2 className="text-4xl font-bold mb-6">
            Comparación Inteligente
          </h2>

          <p className="text-2xl text-green-400 mb-4">
            {comparisonMessage}
          </p>

          <p className="text-zinc-300 text-xl">
            {recommendation}
          </p>

        </div>

      </div>

    </main>
  );
}