"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";
import {
  WEEK,
  SLOTS,
  closedDayIds,
  countLabel,
  directionSummaries,
  matchesFilter,
  type DayId,
  type GridSession,
  type ScheduleQuery,
} from "@/lib/schedule-grid";

const DIRECTIONS = ["all", "group-3plus", "wushu", "acrobatics", "breakdance", "aikido", "wushu-adult"] as const;
const TIERS = [
  ["all", "Все группы"],
  ["kids", "3+"],
  ["junior", "Младшие"],
  ["middle", "Средние"],
  ["senior", "Старшие"],
  ["adult", "Взрослые"],
] as const;

const AUDIENCES = [
  ["all", "Все"],
  ["child", "Дети"],
  ["adult", "Взрослые"],
] as const;

export function ScheduleExplorer({
  sessions,
  phoneDisplay,
  phoneTel,
  whatsapp,
}: {
  sessions: GridSession[];
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = readQuery(params, sessions);
  const visible = useMemo(() => sessions.filter((session) => matchesFilter(session, query)), [sessions, query]);
  const placed = visible.filter((session) => session.placed);
  const adults = visible.filter((session) => !session.placed);
  const summaries = directionSummaries(placed);
  const closed = new Set(closedDayIds(sessions));
  const filtered = query.audience !== "all" || query.direction !== "all" || query.tier !== "all";

  function write(patch: Partial<ScheduleQuery>) {
    const next = new URLSearchParams(params.toString());
    const merged = { ...query, ...patch };
    setParam(next, "audience", merged.audience);
    setParam(next, "direction", merged.direction);
    setParam(next, "tier", merged.tier);
    const text = next.toString();
    router.replace(text ? `${pathname}?${text}` : pathname, { scroll: false });
  }

  return (
    <div>
      {summaries.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {summaries.map((item) => (
            <li key={item.directionId} className={`rounded-card border-[3px] border-ink p-4 shadow-card-sm ${tone(item.directionId).card}`}>
              <p className={`text-xs font-extrabold uppercase tracking-[0.12em] ${tone(item.directionId).label}`}>{item.direction}</p>
              <p className="mt-1 font-display text-xl font-black leading-tight">{item.days}</p>
              <p className="mt-1 text-sm font-extrabold">
                {item.time} · {item.groupsLabel}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 rounded-card border-[3px] border-ink bg-white p-4 shadow-card-sm md:p-5">
        <fieldset>
          <legend className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Кто занимается</legend>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Кто занимается">
            {AUDIENCES.map(([value, label]) => (
              <FilterButton key={value} pressed={query.audience === value} onClick={() => write({ audience: value })}>
                {label}
              </FilterButton>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-4">
          <legend className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Направление</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {DIRECTIONS.map((value) => (
              <FilterButton key={value} pressed={query.direction === value} onClick={() => write({ direction: value })}>
                {value === "all" ? "Все" : directionName(sessions, value)}
              </FilterButton>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-4">
          <legend className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Возраст</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {TIERS.map(([value, label]) => (
              <FilterButton key={value} pressed={query.tier === value} onClick={() => write({ tier: value })}>
                {label}
              </FilterButton>
            ))}
          </div>
        </fieldset>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-extrabold text-ink-soft">
          <Legend />
          {filtered ? (
            <button type="button" className="min-h-11 font-extrabold text-blue underline underline-offset-2" onClick={() => write({ audience: "all", direction: "all", tier: "all" })}>
              Сбросить фильтры
            </button>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-sm font-extrabold text-ink-soft" aria-live="polite">
        {placed.length === 0 && adults.length === 0
          ? "Такой группы нет."
          : `${countLabel(placed.length, "занятие", "занятия", "занятий")}${adults.length ? `. Взрослых групп: ${adults.length}` : ""}`}
      </p>

      {placed.length === 0 && adults.length === 0 ? (
        <div className="mt-4 rounded-card border-[3px] border-ink bg-white p-5 shadow-card-sm">
          <p>Такой группы в расписании нет. Оставьте заявку — подскажем, куда записать.</p>
          <SignupButton placement="schedule-empty" className="mt-4 inline-flex min-h-11 items-center rounded-btn border-[2.5px] border-ink bg-orange px-5 font-black text-ink shadow-btn-main">
            Записаться
          </SignupButton>
        </div>
      ) : null}

      {placed.length > 0 ? (
        <>
          <WeekTable sessions={placed} closed={closed} />
          <DayList sessions={placed} closed={closed} />
        </>
      ) : null}

      {adults.length > 0 ? <AdultBand sessions={adults} /> : null}

      <div className="mt-8 rounded-[30px] border-4 border-ink bg-blue p-6 text-white shadow-cta md:rounded-cta md:flex md:items-center md:justify-between md:p-8">
        <div>
          <h2 className="font-display text-3xl font-black text-white">Подберём группу и время</h2>
          <p className="mt-2 max-w-xl text-[#EEF2FF]">Напишите или позвоните — подскажем свободные места. пр-т Маршала Жукова, 51.</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:flex-row">
          <SignupButton placement="schedule-cta" className="inline-flex min-h-14 items-center justify-center rounded-btn border-[3px] border-ink bg-sun px-5 font-black text-ink shadow-btn-alt">
            Записаться
          </SignupButton>
          <TrackLink href={whatsapp} goal="whatsapp_click" className="inline-flex min-h-14 items-center justify-center rounded-btn border-[3px] border-ink bg-white px-5 font-black text-ink shadow-btn-alt">
            WhatsApp
          </TrackLink>
          <TrackLink href={`tel:${phoneTel}`} goal="phone_click" className="inline-flex min-h-14 items-center justify-center rounded-btn border-[3px] border-ink bg-white px-5 font-black text-ink shadow-btn-alt">
            {phoneDisplay}
          </TrackLink>
        </div>
      </div>
    </div>
  );
}

function WeekTable({ sessions, closed }: { sessions: GridSession[]; closed: Set<DayId> }) {
  return (
    <div className="mt-4 hidden rounded-card border-[3px] border-ink bg-white p-3 shadow-card min-[1100px]:block">
      <table className="w-full table-fixed border-separate border-spacing-2">
        <caption className="sr-only">Расписание групп по дням недели. Суббота — выходной. Зал на пр-те Маршала Жукова, 51.</caption>
        <thead>
          <tr>
            <th scope="col" className="w-16">
              <span className="sr-only">Время</span>
            </th>
            {WEEK.map((day) => (
              <th key={day.id} scope="col" className={`rounded-chip px-1 py-2 text-center ${closed.has(day.id) ? "text-ink-soft" : "bg-blue-mist text-ink"}`}>
                <span className="sr-only">{day.name}</span>
                <span aria-hidden="true" className="font-display text-base font-black">
                  {day.short}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SLOTS.map((slot, slotIndex) => (
            <tr key={slot.id}>
              <th scope="row" className="w-16 pr-1 text-left align-middle">
                <span className="block font-display text-sm font-black">{slot.label}</span>
                <span className="block text-xs font-bold text-ink-soft">{slot.until}</span>
              </th>
              {WEEK.map((day) => {
                if (closed.has(day.id)) {
                  if (slotIndex > 0) return null;
                  return (
                    <td key={day.id} rowSpan={SLOTS.length} className="rounded-card bg-cream px-2 text-center align-middle text-sm font-black whitespace-nowrap text-ink-soft">
                      Выходной
                    </td>
                  );
                }
                const items = sessions.filter((session) => session.dayId === day.id && session.slotId === slot.id);
                return (
                  <td key={day.id} className="align-top">
                    {items.length > 0 ? (
                      <div className="grid gap-2">
                        {items.map((session) => (
                          <SessionCard key={session.id} session={session} />
                        ))}
                      </div>
                    ) : (
                      <div className="grid min-h-24 place-items-center rounded-card bg-[repeating-linear-gradient(135deg,#fff3c9_0_10px,#fff8de_10px_20px)] px-2 text-center text-xs font-extrabold text-ink-soft">
                        Нет занятий
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DayList({ sessions, closed }: { sessions: GridSession[]; closed: Set<DayId> }) {
  return (
    <div className="mt-4 min-[1100px]:hidden">
      <div className="sticky top-16 z-30 -mx-[18px] flex gap-2 overflow-x-auto bg-cream px-[18px] py-2 min-[768px]:mx-0 min-[768px]:px-0">
        {WEEK.map((day) => {
          const dots = [...new Set(sessions.filter((session) => session.dayId === day.id).map((session) => session.directionId))];
          return (
            <a
              key={day.id}
              href={`#day-${day.id}`}
              className={`grid h-14 w-12 shrink-0 place-items-center rounded-chip border-[2.5px] border-ink font-display text-sm font-black ${closed.has(day.id) ? "bg-cream text-ink-soft" : "bg-white text-ink"}`}
            >
              <span className="sr-only">{day.name}</span>
              <span aria-hidden="true">{day.short}</span>
              <span aria-hidden="true" className="flex h-2 gap-0.5">
                {dots.slice(0, 3).map((directionId) => (
                  <i key={directionId} className={`block h-1.5 w-1.5 rounded-full ${tone(directionId).dot}`} />
                ))}
              </span>
            </a>
          );
        })}
      </div>
      <div className="mt-3 grid gap-3">
        {WEEK.map((day) => {
          const items = sessions.filter((session) => session.dayId === day.id).sort((left, right) => (left.start ?? 0) - (right.start ?? 0));
          return (
            <section key={day.id} id={`day-${day.id}`} className="scroll-mt-36 rounded-card border-[3px] border-ink bg-white p-4 shadow-card-sm" aria-label={day.name}>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl font-black">{day.name}</h2>
                <p className="text-sm font-extrabold text-ink-soft">
                  {closed.has(day.id) ? "выходной" : countLabel(items.length, "занятие", "занятия", "занятий")}
                </p>
              </div>
              {!closed.has(day.id) && items.length === 0 ? <p className="mt-2 font-extrabold text-ink-soft">Нет занятий</p> : null}
              <div className="mt-3 grid gap-3">
                {items.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function AdultBand({ sessions }: { sessions: GridSession[] }) {
  return (
    <section className="mt-6" aria-labelledby="adult-schedule">
      <h2 id="adult-schedule" className="font-display text-3xl font-black">
        Взрослые
      </h2>
      <p className="mt-2 max-w-2xl">Айкидо по выходным и ушу для взрослых. Часы этих групп клуб ещё назовёт.</p>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {sessions.map((session) => (
          <li key={session.id} className={`rounded-card border-[3px] border-ink p-5 shadow-card-sm ${tone(session.directionId).card}`}>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-2xl font-black">{session.direction}</h3>
              <span className="rounded-pill border-2 border-ink bg-white px-2 py-0.5 text-xs font-black text-ink">взрослые</span>
              {session.recruiting ? <span className="recruit-blink rounded-pill border-2 border-ink px-2 py-0.5 text-xs font-black">Идёт набор</span> : null}
            </div>
            <p className="mt-2 font-extrabold">
              {session.name}, {session.ages}. {session.daysLabel}
              {session.time ? `, ${session.time}` : ""}.
            </p>
            {session.coachName ? <p className="mt-1 text-sm font-extrabold">Тренер: {session.coachName}</p> : null}
            {session.note ? (
              <p className="mt-2 text-sm">
                <span className="ph">{session.note}</span>
              </p>
            ) : null}
            <SignupButton
              placement="schedule"
              direction={session.directionId}
              audience="adult"
              kind={session.recruiting ? "waitlist" : "enroll"}
              className="mt-4 inline-flex min-h-11 items-center rounded-btn border-[2.5px] border-ink bg-orange px-4 font-black text-ink shadow-btn-main"
            >
              {session.recruiting ? "Записаться в группу" : "Записаться"}
            </SignupButton>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SessionCard({ session }: { session: GridSession }) {
  const colors = tone(session.directionId);
  const audience = session.audience === "adult" ? "взрослые" : "дети";
  return (
    <article className={`flex h-full flex-col gap-1 rounded-card border-[2.5px] border-ink p-3 ${colors.card}`} aria-label={`${session.direction}, ${audience}, ${session.name}, ${session.ages}, ${session.time}${session.coachName ? `, тренер ${session.coachName}` : ""}`}>
      <p className={`text-[11px] font-extrabold uppercase tracking-[0.08em] ${colors.label}`}>{session.direction}</p>
      <p className="font-display text-sm font-black leading-tight">{session.time}</p>
      <p className="text-sm font-extrabold leading-snug">{session.name}</p>
      <p className="text-xs font-extrabold">
        {session.ages} · {audience}
      </p>
      {session.coachName ? <p className="text-xs font-bold">Тренер: {session.coachName}</p> : null}
      {session.recruiting ? <p className="recruit-blink mt-1 w-fit rounded-pill border-2 border-ink px-2 py-0.5 text-[11px] font-black">Идёт набор</p> : null}
      <SignupButton
        placement="schedule"
        direction={session.directionId}
        audience={session.audience}
        coachId={session.coachId ?? undefined}
        coachName={session.coachName ?? undefined}
        kind={session.recruiting ? "waitlist" : "enroll"}
        className="mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-btn border-[2.5px] border-ink bg-orange px-2 text-sm font-black text-ink shadow-btn-main"
      >
        Записаться
      </SignupButton>
    </article>
  );
}

function FilterButton({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center rounded-pill border-[2.5px] border-ink px-4 text-sm font-black focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-blue ${pressed ? "bg-ink text-white" : "bg-white text-ink"}`}
    >
      {children}
    </button>
  );
}

function Legend() {
  const items = [
    ["wushu", "Ушу"],
    ["acrobatics", "Акробатика"],
    ["breakdance", "Брейкданс"],
    ["group-3plus", "Группа 3+"],
  ] as const;
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Цвета направлений">
      {items.map(([id, label]) => (
        <li key={id} className="inline-flex items-center gap-2">
          <i aria-hidden="true" className={`block h-3.5 w-3.5 rounded-sm border-2 border-ink ${tone(id).dot}`} />
          {label}
        </li>
      ))}
    </ul>
  );
}

function tone(directionId: string) {
  if (directionId === "wushu" || directionId === "wushu-adult") {
    return { card: "bg-ink text-white", label: "text-sun", dot: "bg-ink" };
  }
  if (directionId === "acrobatics") return { card: "bg-tint-pink text-ink", label: "text-ink", dot: "bg-pink" };
  if (directionId === "breakdance") return { card: "bg-orange text-ink", label: "text-ink", dot: "bg-orange" };
  if (directionId === "aikido") return { card: "bg-tint-mint text-ink", label: "text-ink", dot: "bg-mint" };
  return { card: "bg-sun text-ink", label: "text-ink", dot: "bg-sun" };
}

function directionName(sessions: GridSession[], directionId: string) {
  return sessions.find((session) => session.directionId === directionId)?.direction ?? directionId;
}

function readQuery(params: { get: (key: string) => string | null }, sessions: GridSession[]): ScheduleQuery {
  const audience = params.get("audience");
  const direction = params.get("direction");
  const tier = params.get("tier");
  const known = new Set(sessions.map((session) => session.directionId));
  return {
    audience: audience === "child" || audience === "adult" ? audience : "all",
    direction: direction && direction !== "all" && known.has(direction) ? direction : "all",
    tier: TIERS.some(([value]) => value === tier) ? (tier as ScheduleQuery["tier"]) : "all",
  };
}

function setParam(params: URLSearchParams, key: string, value: string) {
  if (value === "all") params.delete(key);
  else params.set(key, value);
}
