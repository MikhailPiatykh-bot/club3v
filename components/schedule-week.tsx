"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PinMark } from "@/components/mock-icons";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";
import { site } from "@/lib/content";

type Direction = "wushu" | "acro";
type Tier = "junior" | "middle" | "senior";

type Session = {
  id: string;
  direction: Direction;
  direction_label: string;
  group: string;
  tier: Tier;
  age: string;
  age_alt?: string;
  days: string[];
  time: string;
  flag: "уточнить" | null;
};

const DAYS: [string, string][] = [
  ["Пн", "Понедельник"],
  ["Вт", "Вторник"],
  ["Ср", "Среда"],
  ["Чт", "Четверг"],
  ["Пт", "Пятница"],
  ["Сб", "Суббота"],
  ["Вс", "Воскресенье"],
];

const SLOTS = ["17:00–18:20", "18:20–19:40", "19:40–21:00"];

const SESSIONS: Session[] = [
  { id: "w-jr", direction: "wushu", direction_label: "Ушу", group: "Младшая группа", tier: "junior", age: "6–10", age_alt: "6–9", days: ["Пн", "Пт", "Вс"], time: "17:00–18:20", flag: "уточнить" },
  { id: "w-md", direction: "wushu", direction_label: "Ушу", group: "Средняя группа", tier: "middle", age: "10–14", age_alt: "10–13", days: ["Пн", "Пт", "Вс"], time: "18:20–19:40", flag: "уточнить" },
  { id: "w-sr", direction: "wushu", direction_label: "Ушу", group: "Старшая группа", tier: "senior", age: "15+", age_alt: "14–16", days: ["Пн", "Пт", "Вс"], time: "19:40–21:00", flag: "уточнить" },
  { id: "a-jr", direction: "acro", direction_label: "Акробатика", group: "Младшая группа", tier: "junior", age: "6–9", days: ["Вт", "Чт"], time: "17:00–18:20", flag: null },
  { id: "a-md", direction: "acro", direction_label: "Акробатика", group: "Средняя группа", tier: "middle", age: "10–13", days: ["Вт", "Чт"], time: "18:20–19:40", flag: null },
  { id: "a-sr", direction: "acro", direction_label: "Акробатика", group: "Старшая группа", tier: "senior", age: "14–16", days: ["Вт", "Чт"], time: "19:40–21:00", flag: null },
];

const DIRS = ["all", "wushu", "acro"] as const;
const TIERS = ["all", "kids", "junior", "middle", "senior"] as const;
type DirFilter = (typeof DIRS)[number];
type TierFilter = (typeof TIERS)[number];

function isDir(value: string | null): value is DirFilter {
  return DIRS.includes(value as DirFilter);
}

function isTier(value: string | null): value is TierFilter {
  return TIERS.includes(value as TierFilter);
}

function matches(session: Session, dir: DirFilter, tier: TierFilter) {
  return (dir === "all" || session.direction === dir) && (tier === "all" || session.tier === tier);
}

function Flag({ session }: { session: Session }) {
  if (session.flag !== "уточнить") return null;
  return (
    <span className="flag" title={session.age_alt ? `На странице «Ушу» указан возраст ${session.age_alt}` : undefined}>
      уточнить
    </span>
  );
}

function Book({ session }: { session: Session }) {
  return (
    <SignupButton placement="schedule" direction={session.direction === "acro" ? "acrobatics" : "wushu"} className="bk">
      Записаться
    </SignupButton>
  );
}

export function ScheduleWeek() {
  const params = useSearchParams();
  const dirParam = params.get("dir");
  const tierParam = params.get("tier");
  const [dir, setDir] = useState<DirFilter>(isDir(dirParam) ? dirParam : "all");
  const [tier, setTier] = useState<TierFilter>(isTier(tierParam) ? tierParam : "all");
  const activeDays = useMemo(() => new Set(SESSIONS.flatMap((session) => session.days)), []);
  const visible = SESSIONS.filter((session) => matches(session, dir, tier));
  const showKids = tier === "all" || tier === "kids";
  const any = visible.length > 0 || showKids;
  const firstDay = DAYS.find(([day]) => visible.some((session) => session.days.includes(day)))?.[0] ?? "";

  return (
    <section className="s-hero">
      <div className="wrap">
        <div className="crumbs">
          <Link href="/">Главная</Link> / Расписание
        </div>
        <div className="draft">Макет · черновик</div>
        <div className="s-top">
          <div>
            <h1>Расписание</h1>
            <div className="addr">
              <span className="pinm">
                <PinMark />
              </span>
              <span>
                пр-т Маршала Жукова, 51 <small>· Москва, СЗАО · единственный зал</small>
              </span>
            </div>
          </div>
          <div className="week">
            <div className="wk w">
              <div className="l">Ушу</div>
              <b>Пн · Пт · Вс</b>
              <span>3 группы · 17:00–21:00</span>
            </div>
            <div className="wk a">
              <div className="l">Акробатика</div>
              <b>Вт · Чт</b>
              <span>3 группы · 17:00–21:00</span>
            </div>
          </div>
        </div>

        <div className="filters">
          <div className="fgroup">
            <span className="fl">Направление</span>
            <div className="seg">
              <button type="button" className={dir === "all" ? "on" : undefined} onClick={() => setDir("all")}>
                Все
              </button>
              <button type="button" className={dir === "wushu" ? "on" : undefined} onClick={() => setDir("wushu")}>
                <span className="sw" style={{ background: "#E82430" }} />
                Ушу
              </button>
              <button type="button" className={dir === "acro" ? "on" : undefined} onClick={() => setDir("acro")}>
                <span className="sw" style={{ background: "#141414", boxShadow: "0 0 0 2px #C9A24A" }} />
                Акробатика
              </button>
            </div>
          </div>
          <div className="fgroup">
            <span className="fl">Возраст</span>
            <div className="fchips">
              {(
                [
                  ["all", "Все группы"],
                  ["kids", "3–6 лет"],
                  ["junior", "Младшие · 6–10"],
                  ["middle", "Средние · 10–14"],
                  ["senior", "Старшие · 14+"],
                ] as const
              ).map(([value, label]) => (
                <button key={value} type="button" className={tier === value ? "on" : undefined} onClick={() => setTier(value)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="legend desktop-only">
            <span>
              <i style={{ background: "#E82430" }} />
              Ушу
            </span>
            <span>
              <i style={{ background: "#141414", boxShadow: "inset 0 0 0 2px #C9A24A" }} />
              Акробатика
            </span>
            <span>
              <span className="flag">уточнить</span>возраст группы
            </span>
          </div>
        </div>

        <div className="weekgrid desktop-only">
          <div className="gh corner" />
          {DAYS.map(([day, name]) => (
            <div key={day} className={activeDays.has(day) ? "gh" : "gh off"}>
              {day}
              <small>{name}</small>
            </div>
          ))}
          {SLOTS.map((slot) => {
            const [start, end] = slot.split("–");
            return (
              <SlotRow key={slot} slot={slot} start={start} end={end} activeDays={activeDays} dir={dir} tier={tier} />
            );
          })}
        </div>

        <div className="mobile-only">
          <div className="daynav">
            {DAYS.map(([day]) => {
              const dots = visible.filter((session) => session.days.includes(day));
              return (
                <a key={day} href={`#d-${day}`} className={`${dots.length ? "" : "off"} ${day === firstDay ? "on" : ""}`.trim()}>
                  {day}
                  <i>
                    {dots.map((session) => (
                      <b key={session.id} style={{ background: session.direction === "wushu" ? "#E82430" : "#C9A24A" }} />
                    ))}
                  </i>
                </a>
              );
            })}
          </div>
          {DAYS.map(([day, name]) => {
            const sessions = visible.filter((session) => session.days.includes(day));
            if (!sessions.length) {
              return (
                <div key={day} className="day off" id={`d-${day}`}>
                  <div className="day-h">
                    <b>{name}</b>
                    <span>{activeDays.has(day) ? "нет групп по фильтру" : "нет занятий"}</span>
                  </div>
                </div>
              );
            }
            return (
              <div key={day} className="day" id={`d-${day}`}>
                <div className="day-h">
                  <b>{name}</b>
                  <span>
                    {sessions.length} {sessions.length === 1 ? "группа" : "группы"}
                  </span>
                </div>
                {sessions.map((session) => (
                  <div key={session.id} className={`msc ${session.direction}`}>
                    <div className="mbar bar" />
                    <div className="r1">
                      <span className="tm">{session.time}</span>
                      <span className="dl">{session.direction_label}</span>
                    </div>
                    <div className="gn">
                      {session.group} <small>· {session.age} лет</small> <Flag session={session} />
                    </div>
                    <Book session={session} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {showKids && <Kids />}

        <div className={any ? "noresult is-hidden" : "noresult"}>
          Нет групп по выбранным фильтрам.{" "}
          <button
            type="button"
            className="reset"
            onClick={() => {
              setDir("all");
              setTier("all");
            }}
          >
            Сбросить фильтры
          </button>
        </div>

        <div className="notes">
          <h3>
            <small>Для клуба · уточнить</small>
            Что нужно подтвердить перед публикацией
          </h3>
          <ul>
            <li>Возраст групп ушу: на странице «Расписание» 6–10 / 10–14 / 15+, на странице «Ушу» 6–9 / 10–13 / 14–16. В макете — версия «Расписания».</li>
            <li>Группы 3–6 лет: расписания на сайте нет; не указано, ушу это, акробатика или «Детские развивашки 3+».</li>
            <li>Суббота 13:00–14:30 («доп. день») относится к закрытому залу и в это расписание не входит.</li>
            <li>Длительность занятия — 1 ч 20 мин по данным сайта; длительность для 3–6 лет неизвестна.</li>
          </ul>
        </div>

        <div className="cta-band">
          <div>
            <h3>Подберём группу и время</h3>
            <p>Позвоните или напишите — администратор подскажет свободные места.</p>
          </div>
          <div className="acts">
            <TrackLink href={site.whatsapp} goal="whatsapp_click" target="_blank" rel="noopener noreferrer" className="btn btn-white">
              Написать в WhatsApp
            </TrackLink>
            <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="btn btn-dark">
              {site.phoneDisplay}
            </TrackLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlotRow({
  slot,
  start,
  end,
  activeDays,
  dir,
  tier,
}: {
  slot: string;
  start: string;
  end: string;
  activeDays: Set<string>;
  dir: DirFilter;
  tier: TierFilter;
}) {
  return (
    <>
      <div className="gt">
        {start}
        <small>до {end}</small>
      </div>
      {DAYS.map(([day]) => {
        if (!activeDays.has(day)) {
          return (
            <div key={day} className="cell offday">
              {slot === SLOTS[1] ? "Нет занятий" : ""}
            </div>
          );
        }
        const session = SESSIONS.find((item) => item.days.includes(day) && item.time === slot && matches(item, dir, tier));
        if (!session) return <div key={day} className="cell empty" />;
        return (
          <div key={day} className="cell">
            <div className={`sc ${session.direction}`}>
              <div className="dl">
                <i />
                {session.direction_label}
              </div>
              <div className="tm">{session.time}</div>
              <div className="gn">{session.group}</div>
              <div className="ag">
                {session.age} лет <Flag session={session} />
              </div>
              <Book session={session} />
            </div>
          </div>
        );
      })}
    </>
  );
}

function Kids() {
  return (
    <div className="kids">
      <div className="age">3–6</div>
      <div>
        <b>Группы 3–6 лет — время уточняется</b>
        <p>Клуб принимает детей с 3 лет. Направление, дни и время для этого возраста уточняйте у администратора.</p>
      </div>
      <TrackLink href={site.whatsapp} goal="whatsapp_click" target="_blank" rel="noopener noreferrer" className="btn btn-dark">
        Узнать расписание
      </TrackLink>
    </div>
  );
}
