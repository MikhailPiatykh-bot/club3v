export type Messenger = "whatsapp" | "telegram" | "call";
export type LeadSource = "form" | "quiz";

export type ChildInput = {
  age: string;
  direction: string;
};

export type CleanLead = {
  parentName: string;
  phone: string;
  messenger: Messenger;
  children: ChildInput[];
  coachId: string | null;
  source: LeadSource;
  placement: string;
  page: string;
  utm: Record<string, string>;
};

export type LeadRules = {
  ages: readonly string[];
  directions: readonly string[];
  messengers: readonly string[];
  coachIds: readonly string[];
};

const placements = new Set([
  "header",
  "hero",
  "dock",
  "menu",
  "prices",
  "contacts",
  "coach",
  "direction",
  "quiz",
  "schedule",
  "events",
  "footer",
  "other",
]);

const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid"] as const;

const messengerLabel: Record<Messenger, string> = {
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  call: "Звонок",
};

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}

function asRecord(input: unknown): Record<string, unknown> | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  return input as Record<string, unknown>;
}

export function normalizePhone(input: string) {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return `+7${digits.slice(1)}`;
  }
  if (digits.length === 10) return `+7${digits}`;
  return null;
}

export function validateLead(
  input: unknown,
  rules: LeadRules,
  now = Date.now(),
): { ok: true; spam: true } | { ok: true; spam: false; lead: CleanLead } | { ok: false; error: string } {
  const data = asRecord(input);
  if (!data) return { ok: false, error: "Некорректная заявка." };

  if (cleanText(data.fax, 200)) return { ok: true, spam: true };

  if (typeof data.renderedAt === "number" && Number.isFinite(data.renderedAt)) {
    const delta = now - data.renderedAt;
    if (delta >= 0 && delta < 1200) return { ok: true, spam: true };
  }

  const parentName = cleanText(data.parentName, 80);
  if (!/^[\p{L}\s.'-]{2,80}$/u.test(parentName)) {
    return { ok: false, error: "Напишите имя родителя." };
  }

  const phone = normalizePhone(cleanText(data.phone, 40));
  if (!phone) return { ok: false, error: "Проверьте номер телефона." };

  const messenger = cleanText(data.messenger, 20);
  if (!rules.messengers.includes(messenger)) {
    return { ok: false, error: "Выберите, как с вами связаться." };
  }

  if (data.consent !== true) {
    return { ok: false, error: "Нужно согласие на обработку персональных данных." };
  }

  if (!Array.isArray(data.children) || data.children.length < 1 || data.children.length > 4) {
    return { ok: false, error: "Добавьте хотя бы одного ребёнка." };
  }

  const children: ChildInput[] = [];
  for (const child of data.children) {
    const row = asRecord(child);
    if (!row) return { ok: false, error: "Проверьте данные ребёнка." };
    const age = cleanText(row.age, 40);
    const direction = cleanText(row.direction, 20);
    if (!rules.ages.includes(age)) return { ok: false, error: "Выберите возраст ребёнка." };
    if (!rules.directions.includes(direction)) return { ok: false, error: "Выберите направление." };
    children.push({ age, direction });
  }

  const coachRaw = cleanText(data.coachId, 80);
  const coachId = coachRaw && rules.coachIds.includes(coachRaw) ? coachRaw : null;
  const source = data.source === "quiz" ? "quiz" : data.source === "form" ? "form" : null;
  if (!source) return { ok: false, error: "Некорректная заявка." };

  const placementRaw = cleanText(data.placement, 40);
  const placement = placements.has(placementRaw) ? placementRaw : "other";
  let page = cleanText(data.page, 200);
  if (!page || !/^\/[a-z0-9\-/_]*$/i.test(page)) page = "/";

  const utm: Record<string, string> = {};
  const utmRaw = asRecord(data.utm);
  if (utmRaw) {
    for (const key of utmKeys) {
      const value = cleanText(utmRaw[key], 120);
      if (value) utm[key] = value;
    }
  }

  return {
    ok: true,
    spam: false,
    lead: {
      parentName,
      phone,
      messenger: messenger as Messenger,
      children,
      coachId,
      source,
      placement,
      page,
      utm,
    },
  };
}

export function leadText(
  lead: CleanLead,
  labels: { direction: (id: string) => string; coach: (id: string | null) => string },
) {
  const kids = lead.children.map((child) => `• ${child.age}, ${labels.direction(child.direction)}`).join("\n");
  const utm = Object.entries(lead.utm)
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");

  return [
    "Новая заявка — Veni Vidi Vici",
    `Источник: ${lead.source === "quiz" ? "квиз" : "форма"} (${lead.placement})`,
    `Имя: ${lead.parentName}`,
    `Телефон: ${lead.phone}`,
    `Связь: ${messengerLabel[lead.messenger]}`,
    "Дети:",
    kids,
    `Тренер: ${labels.coach(lead.coachId)}`,
    `Страница: ${lead.page}`,
    utm ? `Метки: ${utm}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
