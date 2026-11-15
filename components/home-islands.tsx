"use client";

import { useState } from "react";
import { PlayIcon } from "@/components/mock-icons";
import { faq } from "@/lib/content";

const ageTabs = ["3–4 года", "5–6 лет", "7–10 лет", "11+ лет"];

export function HomeSchedule() {
  const [tab, setTab] = useState(ageTabs[0]);
  const rows = [
    { direction: "Ушу", color: "#141414" },
    { direction: "Акробатика", color: "#E82430" },
    { direction: "Ушу", color: "#141414" },
    { direction: "Акробатика", color: "#E82430" },
  ];

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Возраст группы">
        {ageTabs.map((item) => (
          <button key={item} type="button" role="tab" aria-selected={tab === item} className={tab === item ? "tab on" : "tab"} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="sched">
        <table>
          <thead>
            <tr>
              <th>День</th>
              <th>Время</th>
              <th>Направление</th>
              <th>Адрес</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${tab}-${index}`}>
                <td className="day">День недели</td>
                <td className="time">00:00–00:00</td>
                <td>
                  <span className="dot" style={{ background: row.color }} />
                  {row.direction}
                </td>
                <td className="place">пр-т Маршала Жукова, 51</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function HomeFaq() {
  const [openId, setOpenId] = useState(faq[0]?.id ?? "");

  return (
    <div className="acc">
      {faq.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className={open ? "qa open" : "qa"}>
            <button
              type="button"
              className="qh"
              aria-expanded={open}
              onClick={() => setOpenId(open ? "" : item.id)}
              style={{ width: "100%", background: "transparent", border: 0, color: "inherit", font: "inherit", textAlign: "left", cursor: "pointer" }}
            >
              {item.question}
              <span className="pm">{open ? "−" : "+"}</span>
            </button>
            {open && <div className="ans">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}

export function HomeMap({ widgetUrl }: { widgetUrl: string }) {
  const [open, setOpen] = useState(false);

  if (open) {
    return <iframe title="Карта: проспект Маршала Жукова, 51" src={widgetUrl} className="map" style={{ width: "100%", border: 0, minHeight: 460 }} loading="lazy" />;
  }

  return (
    <button type="button" className="ph map" onClick={() => setOpen(true)}>
      <div className="pin" />
      Карта Яндекс
      <small>пр-т Маршала Жукова, 51</small>
    </button>
  );
}

const videoLabels = ["тренировка ушу", "акробатика", "соревнования", "лагерь", "сборы в Китае"];

export function HomeVideos({ items }: { items: { id: string; title: string; src: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="vids">
      {videoLabels.map((label, index) => {
        const item = items[index];
        const opened = item && active === item.id && Boolean(item.src);
        return (
          <button
            key={label}
            type="button"
            className="ph vid"
            onClick={() => {
              if (item?.src) setActive(item.id);
            }}
          >
            {opened ? (
              <video className="ph vid" controls preload="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
                <source src={item.src} />
              </video>
            ) : (
              <>
                <div className="play">
                  <PlayIcon />
                </div>
                Видео 9:16
                <small>{label}</small>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
