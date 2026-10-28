"use client";

import { useMemo, useState } from "react";
import { TrackLink } from "@/components/track-link";
import { reachGoal } from "@/lib/analytics";

const typeName: Record<string, string> = {
  tournament: "турнир",
  camp: "сборы",
  seminar: "семинар",
  festival: "фестиваль",
};

type Item = {
  id: string;
  title: string;
  type: string;
  direction: string;
  dateText: string;
  needsYear: boolean;
  stale: boolean;
  place: string | null;
  link: string | null;
  startDate: string | null;
};

export function EventsBoard({
  items,
  captions,
  lead,
  certification,
}: {
  items: Item[];
  captions: string[];
  lead: string;
  certification: boolean;
}) {
  const [when, setWhen] = useState<"next" | "past">("next");
  const [direction, setDirection] = useState("all");
  const [type, setType] = useState("all");
  const visible = useMemo(
    () =>
      items.filter((item) => {
        const upcoming = Boolean(item.startDate) && !item.needsYear && !item.stale;
        if (when === "next" && !upcoming) return false;
        if (when === "past" && upcoming) return false;
        if (direction !== "all" && item.direction !== direction) return false;
        if (type !== "all" && item.type !== type) return false;
        return true;
      }),
    [items, when, direction, type],
  );

  return (
    <div className="mx-auto max-w-wrap px-10 py-10 max-md:px-[18px]">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={`min-h-11 rounded-pill border-[2.5px] border-ink px-4 font-black ${when === "next" ? "bg-sun" : "bg-white"}`} onClick={() => setWhen("next")}>
          Ближайшие
        </button>
        <button type="button" className={`min-h-11 rounded-pill border-[2.5px] border-ink px-4 font-black ${when === "past" ? "bg-sun" : "bg-white"}`} onClick={() => setWhen("past")}>
          Прошедшие
        </button>
        <select value={direction} onChange={(event) => setDirection(event.target.value)} className="min-h-11 rounded-btn border-[2.5px] border-ink bg-white px-3" aria-label="Направление">
          <option value="all">Все направления</option>
          <option value="wushu">Ушу</option>
          <option value="acrobatics">Акробатика</option>
          <option value="breakdance">Брейкданс</option>
          <option value="aikido">Айкидо</option>
        </select>
        <select value={type} onChange={(event) => setType(event.target.value)} className="min-h-11 rounded-btn border-[2.5px] border-ink bg-white px-3" aria-label="Тип">
          <option value="all">Все типы</option>
          <option value="tournament">Турнир</option>
          <option value="camp">Сборы</option>
          <option value="seminar">Семинар</option>
          <option value="festival">Фестиваль</option>
        </select>
      </div>
      {when === "next" && visible.length === 0 ? <p className="mt-6">Расписание турниров уточняется.</p> : null}
      <ul className="mt-6 grid gap-3">
        {visible.map((item) => (
          <li key={item.id} className="rounded-card border-[3px] border-ink bg-white p-4">
            <button type="button" className="text-left" onClick={() => reachGoal("calendar_event")}>
              <b className="font-display text-2xl">{item.title}</b>
              <p className="text-sm">
                {item.dateText}
                {item.place ? ` · ${item.place}` : ""} · {typeName[item.type] ?? item.type}
              </p>
              {item.needsYear ? <span className="ph">год не подтверждён</span> : null}
            </button>
            {item.link ? (
              <TrackLink href={item.link} goal="calendar_event" className="mt-2 inline-flex font-black text-blue underline">
                Подробнее
              </TrackLink>
            ) : null}
          </li>
        ))}
      </ul>
      <section id="competitions" className="mt-12">
        <h2 className="font-display text-3xl font-black">Соревнования</h2>
        <p className="mt-3 max-w-3xl">{lead}</p>
        <ul className="mt-4 grid gap-2">
          {captions.map((caption) => (
            <li key={caption} className="rounded-card border-[3px] border-ink bg-cream p-3">
              {caption} <span className="ph">фото после согласия</span>
            </li>
          ))}
        </ul>
      </section>
      {certification ? (
        <section id="certification" className="mt-12">
          <h2 className="font-display text-3xl font-black">Аттестации</h2>
        </section>
      ) : (
        <p id="certification" className="mt-8 text-sm">
          <span className="ph">Аттестации: на старом сайте страница была пустой. Секция скрыта, пока клуб не пришлёт даты.</span>
        </p>
      )}
    </div>
  );
}
