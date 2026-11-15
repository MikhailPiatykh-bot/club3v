"use client";

import Link from "next/link";
import { useState } from "react";
import type { ScheduleRow } from "@/lib/schedule-rows";

export function HomeSchedule({ rows }: { rows: ScheduleRow[] }) {
  const [audience, setAudience] = useState<"child" | "adult">("child");
  const visible = rows.filter((row) => row.audience === audience);

  return (
    <div>
      <div className="flex gap-2" role="tablist" aria-label="Аудитория">
        {(
          [
            ["child", "Дети"],
            ["adult", "Взрослые"],
          ] as const
        ).map(([value, label]) => (
          <button key={value} type="button" role="tab" aria-selected={audience === value} className={`min-h-11 rounded-pill border-[2.5px] border-ink px-4 font-black ${audience === value ? "bg-sun" : "bg-white"}`} onClick={() => setAudience(value)}>
            {label}
          </button>
        ))}
      </div>
      <ul className="mt-4 grid gap-3">
        {visible.map((row) => (
          <li key={row.id} className="rounded-card border-[3px] border-ink bg-white p-4 shadow-card-sm">
            <div className="flex flex-wrap items-center gap-2">
              <b className="font-display text-xl">{row.direction}</b>
              {row.recruiting ? <span className="rounded-pill border-2 border-ink bg-sun px-2 py-0.5 text-xs font-black">Идёт набор</span> : null}
              {row.confirm ? <span className="ph">подтвердить</span> : null}
            </div>
            <p className="mt-1 text-sm">
              {row.name} · {row.ages} · {row.days} · {row.time}
            </p>
          </li>
        ))}
      </ul>
      <Link href="/schedule" className="mt-4 inline-flex min-h-11 items-center font-black text-blue underline">
        Всё расписание
      </Link>
    </div>
  );
}
