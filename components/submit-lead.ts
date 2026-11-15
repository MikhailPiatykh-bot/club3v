import { reachGoal } from "@/lib/analytics";

export function readUtm() {
  try {
    const raw = sessionStorage.getItem("vvv-utm");
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const utm: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string") utm[key] = value;
    }
    return utm;
  } catch {
    return {};
  }
}

export async function submitLead(payload: unknown, goal: string) {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || "Не удалось отправить заявку. Позвоните или напишите в мессенджер.");
  }
  reachGoal(goal);
}
