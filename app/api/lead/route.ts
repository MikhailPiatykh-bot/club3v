import { NextResponse } from "next/server";
import { coachById, coaches, directionLabel, formOptions, leadAges } from "@/lib/content";
import { deliverLead } from "@/lib/deliver";
import { leadText, validateLead } from "@/lib/lead";
import { isAllowedOrigin } from "@/lib/origin";
import { limiter } from "@/lib/rate-limit";

export const runtime = "nodejs";

const rules = {
  ages: leadAges,
  directions: formOptions.directions.map((item) => item.id),
  messengers: formOptions.messengers.map((item) => item.id),
  coachIds: coaches.map((coach) => coach.id),
};

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get("origin"), request.headers.get("host"))) {
    return NextResponse.json({ ok: false, error: "Некорректный источник." }, { status: 403 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim().slice(0, 64) || "unknown";
  if (!limiter.check(ip)) {
    return NextResponse.json({ ok: false, error: "Слишком много заявок. Позвоните, пожалуйста." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректная заявка." }, { status: 400 });
  }

  const result = validateLead(body, rules);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  if (result.spam) return NextResponse.json({ ok: true });

  const text = leadText(result.lead, {
    direction: directionLabel,
    coach: (id) => (id ? (coachById(id)?.name ?? "не указан") : "не указан"),
  });

  const delivery = await deliverLead(result.lead, text);
  if (delivery.configured.length === 0) {
    if (process.env.NODE_ENV !== "production") return NextResponse.json({ ok: true, mode: "unconfigured" });
    return NextResponse.json(
      { ok: false, error: "Заявку пока некуда отправить. Позвоните или напишите в мессенджер." },
      { status: 503 },
    );
  }
  if (delivery.sent.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Позвоните или напишите в мессенджер." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
