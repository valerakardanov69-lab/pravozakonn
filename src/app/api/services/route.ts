import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - получить все услуги
export async function GET() {
  try {
    const services = await db.service.findMany();
    return NextResponse.json(services);
  } catch {
    return NextResponse.json({ error: "Ошибка при получении услуг" }, { status: 500 });
  }
}
