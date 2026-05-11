import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.capacity <= 0) {
    return NextResponse.json(
      {
        error: "La capacidad debe ser mayor a 0",
      },
      {
        status: 400,
      }
    );
  }

  const event = await prisma.event.create({
    data: {
      name: body.name,
      date: new Date(body.date),
      capacity: body.capacity,
      category: body.category,
    },
  });

  return NextResponse.json(event);
}