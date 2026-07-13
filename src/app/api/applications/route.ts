import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sanitizeForStorage, sanitizePhone, validateEmail } from "@/lib/security";

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

// GET - получить все заявки
export async function GET(request: NextRequest) {
  try {
    const applications = await db.application.findMany();
    return NextResponse.json(applications);
  } catch {
    return NextResponse.json({ error: "Ошибка при получении заявок" }, { status: 500 });
  }
}

// POST - создать новую заявку
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Слишком много запросов. Попробуйте позже." }, { status: 429 });
    }

    const body = await request.json();
    const { name, phone, email, service, message } = body;

    // Валидация
    if (!name || !phone) {
      return NextResponse.json({ error: "Имя и телефон обязательны" }, { status: 400 });
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
      return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
    }

    const application = await db.application.create({
      data: {
        name: sanitizeForStorage(name),
        phone: sanitizePhone(phone),
        email: email ? sanitizeForStorage(email) : undefined,
        service: service ? sanitizeForStorage(service) : undefined,
        message: message ? sanitizeForStorage(message) : undefined,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Ошибка при создании заявки" }, { status: 500 });
  }
}
