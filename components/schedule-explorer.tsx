"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SignupButton } from "@/components/signup-button";
import { directionLabel } from "@/lib/content";
import type { ScheduleRow } from "@/lib/schedule-rows";

const directions = ["all", "wushu", "acrobatics", "breakdance", "group-3plus", "aikido", "wushu-adult"] as const;

export function ScheduleExplorer({ rows }: { rows: ScheduleRow[] }) {
  const params = useSearchParams();
  const [audience, setAudience] = useState(params.get("audience") ?? "all");
  const [direction, setDirection] = useState(params.get("direction") ?? "all");
  const [tier, setTier] = useState(params.get("tier") ?? "all");

  const visible = useMemo(
    () =>
      rows.filter((row) => {
        if (audience !== "all" && row.audience !== audience) return false;
        if (direction !== "all" && row.directionId !== direction) return false;
        if (tier !== "all" && row.tier !== tier && row.tier !== "all") return false;
        return true;
      }),
    [rows, audience, direction, tier],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", "Все"],
            ["child", "Дети"],
            ["adult", "Взрослые"],
          ] as const
        ).map(([value, label]) => (
          <button key={value} type="button" className={`min-h-11 rounded-pill border-[2.5px] border-ink px-4 font-black ${audience === value ? "bg-sun" : "bg-white"}`} onClick={() => setAudience(value)}>
            {label}
          </button>
        ))}
      </div>
      <label className="mt-4 grid max-w-xs gap-1 text-sm font-extrabold">
        Направление
        <select value={direction} onChange={(event) => setDirection(event.target.value)} className="min-h-11 rounded-btn border-[2.5px] border-ink bg-white px-3">
          {directions.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "Все" : directionLabel(item)}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-3 grid max-w-xs gap-1 text-sm font-extrabold">
        Возраст
        <select value={tier} onChange={(event) => setTier(event.target.value)} className="min-h-11 rounded-btn border-[2.5px] border-ink bg-white px-3">
          <option value="all">Все</option>
          <option value="kids">3+</option>
          <option value="junior">Младшая</option>
          <option value="middle">Средняя</option>
          <option value="senior">Старшая</option>
          <option value="adult">Взрослые</option>
        </select>
      </label>
      <ul className="mt-6 grid gap-3">
        {visible.map((row) => (
          <li key={row.id} className="rounded-card border-[3px] border-ink bg-white p-4 shadow-card-sm">
            <div className="flex flex-wrap items-center gap-2">
              <b className="font-display text-xl">{row.direction}</b>
              <span className="text-sm">{row.audience === "adult" ? "взрослые" : "дети"}</span>
              {row.recruiting ? <span className="rounded-pill border-2 border-ink bg-sun px-2 text-xs font-black">Идёт набор</span> : null}
            </div>
            <p className="mt-1">
              {row.name}, {row.ages}. {row.days}, {row.time}.
            </p>
            {row.note ? <p className="mt-1 text-sm"><span className="ph">{row.note}</span></p> : null}
            <SignupButton
              placement="schedule"
              direction={row.directionId}
              audience={row.audience}
              kind={row.recruiting ? "waitlist" : "enroll"}
              className="mt-3 inline-flex h-12 items-center rounded-btn border-[2.5px] border-ink bg-orange px-4 font-black text-ink shadow-btn-main"
            >
              Записаться
            </SignupButton>
          </li>
        ))}
      </ul>
    </div>
  );
}
