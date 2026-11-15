"use client";

import { useEffect, useRef } from "react";
import type { YandexReview } from "@/lib/content";

function wrap(value: number, size: number) {
  if (size <= 0) return 0;
  return ((value % size) + size) % size;
}

function cardStep(track: HTMLElement) {
  const cards = [...track.children] as HTMLElement[];
  if (cards.length < 2) return track.clientWidth * 0.8;
  return cards[1].offsetLeft - cards[0].offsetLeft;
}

function loopWidth(track: HTMLElement) {
  const cards = [...track.children] as HTMLElement[];
  if (cards.length < 2) return 0;
  return cards[cards.length / 2].offsetLeft - cards[0].offsetLeft;
}

function Stars({ score }: { score: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(score)));
  return (
    <span className="tracking-wide text-[#FFB400]" aria-label={`Оценка ${filled} из 5`}>
      {"★".repeat(filled)}
      <span className="text-ink/25">{"★".repeat(5 - filled)}</span>
    </span>
  );
}

function ReviewCard({ item, hidden }: { item: YandexReview; hidden?: boolean }) {
  return (
    <article
      aria-hidden={hidden || undefined}
      className="flex w-[320px] shrink-0 flex-col gap-3 rounded-review border-[3px] border-ink bg-white p-4 text-left shadow-card max-md:w-[280px]"
    >
      <div className="flex items-center justify-between gap-3">
        <Stars score={item.score ?? 5} />
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold text-ink-soft underline-offset-2 hover:underline" tabIndex={hidden ? -1 : undefined}>
          Яндекс Карты
        </a>
      </div>
      <p className="whitespace-pre-line text-[15px] leading-snug">{item.text}</p>
      <footer className="mt-auto flex items-baseline justify-between gap-3">
        <strong className="text-[15px]">{item.name}</strong>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[13px] text-ink-soft underline-offset-2 hover:underline" tabIndex={hidden ? -1 : undefined}>
          {item.date}
        </a>
      </footer>
    </article>
  );
}

export function ReviewsRail({ items }: { items: YandexReview[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const target = useRef<number | null>(null);

  function nudge(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const base = target.current ?? offset.current;
    target.current = base + direction * cardStep(track);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.25, (now - last) / 1000);
      last = now;
      const loop = loopWidth(track);
      if (target.current !== null) {
        const delta = target.current - offset.current;
        const step = 900 * dt;
        if (Math.abs(delta) <= step) {
          offset.current = target.current;
          target.current = null;
        } else {
          offset.current += Math.sign(delta) * step;
        }
      } else if (!reduce.matches && document.visibilityState === "visible") {
        offset.current += 24 * dt;
      }
      if (loop > 0 && target.current === null) offset.current = wrap(offset.current, loop);
      track.scrollLeft = wrap(offset.current, loop);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!items.length) return null;

  return (
    <div className="relative mt-6" aria-label="Отзывы с Яндекс Карт">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between">
        <button type="button" aria-label="Предыдущие отзывы" onClick={() => nudge(-1)} className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-white text-2xl font-black text-ink shadow-icon">
          ‹
        </button>
        <button type="button" aria-label="Следующие отзывы" onClick={() => nudge(1)} className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-white text-2xl font-black text-ink shadow-icon">
          ›
        </button>
      </div>
      <div
        ref={trackRef}
        className="flex items-stretch gap-4 overflow-x-auto px-12 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {items.map((item, index) => (
          <ReviewCard key={`${item.name}-${item.date}-${index}`} item={item} />
        ))}
        {items.map((item, index) => (
          <ReviewCard key={`loop-${item.name}-${item.date}-${index}`} item={item} hidden />
        ))}
      </div>
    </div>
  );
}
