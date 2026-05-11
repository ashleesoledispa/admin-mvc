import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const sales = await prisma.sale.findMany({
    include: {
      event: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(sales);
}

export async function POST(req: Request) {
  const body = await req.json();

  const event = await prisma.event.findUnique({
    where: {
      id: body.eventId,
    },
  });

  if (!event) {
    return NextResponse.json(
      {
        error: "Evento no encontrado",
      },
      {
        status: 404,
      }
    );
  }

  if (body.ticketsSold > event.capacity) {
    return NextResponse.json(
      {
        error:
          "No puedes vender más entradas que la capacidad del evento",
      },
      {
        status: 400,
      }
    );
  }

  const sale = await prisma.sale.create({
    data: {
      ticketsSold: body.ticketsSold,
      price: body.price,
      eventId: body.eventId,
    },
  });

  return NextResponse.json(sale);
}