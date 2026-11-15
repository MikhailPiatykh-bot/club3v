"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";
import { MessengerLinks } from "@/components/messengers";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";
import { site } from "@/lib/content";

function MenuLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="nav-item relative">
        <button type="button" className="min-h-11 whitespace-nowrap font-extrabold" aria-haspopup="true">
          Направления
        </button>
        <div className="nav-drop max-md:static max-md:mt-2 max-md:block max-md:shadow-none">
          <p className="px-3 pt-2 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Детям</p>
          {site.menu.directionsChild.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 font-extrabold hover:bg-cream" onClick={onNavigate}>
              {item.label}
            </Link>
          ))}
          <p className="px-3 pt-3 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Взрослым</p>
          {site.menu.directionsAdult.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 font-extrabold hover:bg-cream" onClick={onNavigate}>
              {item.label}
              {item.recruiting ? <span className="rounded-pill border-2 border-ink bg-sun px-2 py-0.5 text-[11px]">Идёт набор</span> : null}
            </Link>
          ))}
        </div>
      </div>
      <Link href="/schedule" className="inline-flex min-h-11 items-center whitespace-nowrap font-extrabold" onClick={onNavigate}>
        Расписание
      </Link>
      <Link href="/prices" className="inline-flex min-h-11 items-center whitespace-nowrap font-extrabold" onClick={onNavigate}>
        Цены
      </Link>
      <Link href="/coaches" className="inline-flex min-h-11 items-center whitespace-nowrap font-extrabold" onClick={onNavigate}>
        Тренеры
      </Link>
      <div className="nav-item relative">
        <button type="button" className="min-h-11 whitespace-nowrap font-extrabold" aria-haspopup="true">
          Мероприятия
        </button>
        <div className="nav-drop max-md:static max-md:mt-2 max-md:block max-md:shadow-none">
          {site.menu.events.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 font-extrabold hover:bg-cream" onClick={onNavigate}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <Link href="/champions" className="inline-flex min-h-11 items-center whitespace-nowrap font-extrabold" onClick={onNavigate}>
        Зал славы
      </Link>
      <Link href="/contacts" className="inline-flex min-h-11 items-center whitespace-nowrap font-extrabold" onClick={onNavigate}>
        Контакты
      </Link>
    </>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-white">
      <div className="mx-auto flex h-[76px] max-w-wrap items-center gap-3 px-4 max-md:h-16 max-md:px-[18px] xl:px-8">
        <BrandLockup />
        <nav aria-label="Основное меню" className="ml-2 hidden items-center gap-3 text-[13px] min-[1240px]:flex xl:gap-4 xl:text-[14px]">
          <MenuLinks />
        </nav>
        <div className="ml-auto hidden shrink-0 items-center gap-2 min-[1240px]:flex">
          <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="hidden whitespace-nowrap font-display text-sm font-black min-[1420px]:inline">
            {site.phoneDisplay}
          </TrackLink>
          <MessengerLinks compact />
          <MessengerLinks channel compact />
          <SignupButton placement="header" className="inline-flex h-11 items-center whitespace-nowrap rounded-btn border-[2.5px] border-ink bg-orange px-3.5 text-sm font-black text-ink shadow-btn-main">
            Записаться
          </SignupButton>
        </div>
        <div className="ml-auto flex items-center gap-2 min-[1240px]:hidden">
          <MessengerLinks />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border-[2.5px] border-ink bg-sun font-black"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      {open ? (
        <nav aria-label="Мобильное меню" className="grid max-h-[calc(100dvh-4rem-5.5rem)] gap-2 overflow-y-auto border-t-[3px] border-ink bg-white px-[18px] py-4 text-[16px] min-[1240px]:hidden">
          <MenuLinks onNavigate={() => setOpen(false)} />
          <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="font-display text-lg font-black" onClick={() => setOpen(false)}>
            {site.phoneDisplay}
          </TrackLink>
          <SignupButton placement="menu" className="inline-flex h-12 items-center justify-center rounded-btn border-[2.5px] border-ink bg-orange font-black text-ink shadow-btn-main" >
            Записаться
          </SignupButton>
        </nav>
      ) : null}
    </header>
  );
}
