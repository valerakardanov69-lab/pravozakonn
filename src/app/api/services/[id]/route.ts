import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sanitizeForStorage } from "@/lib/security";

// PATCH - обновить услугу
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description } = body;

    const updateData: { title?: string; description?: string } = {};
    if (title) updateData.title = sanitizeForStorage(title);
    if (description) updateData.description = sanitizeForStorage(description);

    const service = await db.service.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: "Ошибка при обновлении услуги" }, { status: 500 });
  }
}

// DELETE - удалить услугу
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.service.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Ошибка при удалении услуги" }, { status: 500 });
  }
}
