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
        <button type="button" className="min-h-11 font-extrabold" aria-haspopup="true">
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
      <Link href="/schedule" className="min-h-11 font-extrabold leading-[44px]" onClick={onNavigate}>
        Расписание
      </Link>
      <Link href="/prices" className="min-h-11 font-extrabold leading-[44px]" onClick={onNavigate}>
        Цены
      </Link>
      <Link href="/coaches" className="min-h-11 font-extrabold leading-[44px]" onClick={onNavigate}>
        Тренеры
      </Link>
      <div className="nav-item relative">
        <button type="button" className="min-h-11 font-extrabold" aria-haspopup="true">
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
      <Link href="/champions" className="min-h-11 font-extrabold leading-[44px]" onClick={onNavigate}>
        Зал славы
      </Link>
      <Link href="/contacts" className="min-h-11 font-extrabold leading-[44px]" onClick={onNavigate}>
        Контакты
      </Link>
    </>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-white">
      <div className="mx-auto flex h-[84px] max-w-wrap items-center gap-4 px-10 max-md:h-16 max-md:px-[18px]">
        <BrandLockup />
        <nav aria-label="Основное меню" className="ml-4 hidden items-center gap-4 text-[14.5px] lg:flex">
          <MenuLinks />
        </nav>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="font-display text-[15.5px] font-black">
            {site.phoneDisplay}
          </TrackLink>
          <MessengerLinks />
          <MessengerLinks channel />
          <SignupButton placement="header" className="inline-flex h-[46px] items-center rounded-btn border-[2.5px] border-ink bg-orange px-4 text-[15px] font-black text-ink shadow-btn-main">
            Записаться
          </SignupButton>
        </div>
        <div className="ml-auto flex items-center gap-2 lg:hidden">
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
        <nav aria-label="Мобильное меню" className="grid gap-2 border-t-[3px] border-ink bg-white px-[18px] py-4 text-[16px] lg:hidden">
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
