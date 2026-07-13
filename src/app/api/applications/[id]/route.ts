import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// PATCH - обновить статус заявки
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["new", "processing", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Неверный статус" }, { status: 400 });
    }

    const application = await db.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json(application);
  } catch {
    return NextResponse.json({ error: "Ошибка при обновлении заявки" }, { status: 500 });
  }
}

// DELETE - удалить заявку
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.application.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Ошибка при удалении заявки" }, { status: 500 });
  }
}
