"use client";

import { useMemo, useState } from "react";
import type { ScheduleRow } from "@/lib/schedule-rows";

export function ScheduleBoard({
  rows,
  note,
  directionLock,
}: {
  rows: ScheduleRow[];
  note?: string;
  directionLock?: ScheduleRow["directionId"];
}) {
  const [direction, setDirection] = useState<"all" | ScheduleRow["directionId"]>(directionLock ?? "all");
  const [age, setAge] = useState("all");
  const ages = useMemo(() => [...new Set(rows.map((row) => row.ages))], [rows]);
  const visible = rows.filter((row) => {
    if (direction !== "all" && row.directionId !== direction) return false;
    if (age !== "all" && row.ages !== age) return false;
    return true;
  });

  return (
    <div>
      {note && <p className="mb-4 rounded-2xl bg-gold-soft px-4 py-3 text-sm text-gold">{note}</p>}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр направления">
        {!directionLock && (
          <>
            <FilterChip pressed={direction === "all"} onClick={() => setDirection("all")}>
              Все
            </FilterChip>
            <FilterChip pressed={direction === "wushu"} onClick={() => setDirection("wushu")}>
              Ушу
            </FilterChip>
            <FilterChip pressed={direction === "acrobatics"} onClick={() => setDirection("acrobatics")}>
              Акробатика
            </FilterChip>
          </>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Фильтр возраста">
        <FilterChip pressed={age === "all"} onClick={() => setAge("all")}>
          Любой возраст
        </FilterChip>
        {ages.map((item) => (
          <FilterChip key={item} pressed={age === item} onClick={() => setAge(item)}>
            {item}
          </FilterChip>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
        {visible.length === 0 ? "Такой группы нет." : `Групп: ${visible.length}`}
      </p>
      {visible.length === 0 ? (
        <p className="mt-3 text-ink-soft">Оставьте заявку — подскажем, куда записать ребёнка.</p>
      ) : (
        <>
          <ul className="mt-3 grid gap-3 md:hidden">
            {visible.map((row) => (
              <li key={row.id} className="rounded-3xl border border-line bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-cinnabar">{row.direction}</p>
                <p className="mt-1 font-display text-xl">
                  {row.name}, {row.ages}
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  {row.days}, {row.time}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-3 hidden overflow-hidden rounded-3xl border border-line bg-card md:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Расписание групп ушу и акробатики</caption>
              <thead className="bg-paper-2 text-ink-soft">
                <tr>
                  <th className="px-4 py-3 font-medium">Направление</th>
                  <th className="px-4 py-3 font-medium">Группа</th>
                  <th className="px-4 py-3 font-medium">Возраст</th>
                  <th className="px-4 py-3 font-medium">Дни</th>
                  <th className="px-4 py-3 font-medium">Время</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <tr key={row.id} className="border-t border-line">
                    <td className="px-4 py-3">{row.direction}</td>
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3">{row.ages}</td>
                    <td className="px-4 py-3">{row.days}</td>
                    <td className="px-4 py-3">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-11 rounded-full px-4 text-sm ${pressed ? "bg-ink text-paper" : "bg-card text-ink ring-1 ring-line"}`}
    >
      {children}
    </button>
  );
}
