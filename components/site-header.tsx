"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";
import { HeaderSocial } from "@/components/messengers";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";
import { site } from "@/lib/content";

function MenuMark({ open }: { open: boolean }) {
  if (open) return <span className="text-2xl leading-none">×</span>;
  return (
    <span className="flex w-[18px] flex-col gap-[3px]" aria-hidden="true">
      <span className="block h-[2.5px] rounded-full bg-ink" />
      <span className="block h-[2.5px] rounded-full bg-ink" />
      <span className="block h-[2.5px] rounded-full bg-ink" />
    </span>
  );
}

function MenuLink({ href, children, onNavigate }: { href: string; children: string; onNavigate: () => void }) {
  return (
    <Link href={href} className="flex min-h-11 items-center rounded-xl px-3 font-extrabold hover:bg-cream" onClick={onNavigate}>
      {children}
    </Link>
  );
}

function MenuPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div>
        <p className="px-3 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Направления</p>
        <p className="mt-2 px-3 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Детям</p>
        {site.menu.directionsChild.map((item) => (
          <MenuLink key={item.href} href={item.href} onNavigate={onNavigate}>
            {item.label}
          </MenuLink>
        ))}
        <p className="mt-2 px-3 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Взрослым</p>
        {site.menu.directionsAdult.map((item) => (
          <Link key={item.href} href={item.href} className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 font-extrabold hover:bg-cream" onClick={onNavigate}>
            {item.label}
            {item.recruiting ? <span className="rounded-pill border-2 border-ink bg-sun px-2 py-0.5 text-[11px]">Идёт набор</span> : null}
          </Link>
        ))}
      </div>
      <div>
        <p className="px-3 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Мероприятия</p>
        {site.menu.events.map((item) => (
          <MenuLink key={item.href} href={item.href} onNavigate={onNavigate}>
            {item.label}
          </MenuLink>
        ))}
      </div>
      <div>
        <p className="px-3 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Клуб</p>
        <MenuLink href="/schedule" onNavigate={onNavigate}>
          Расписание
        </MenuLink>
        <MenuLink href="/prices" onNavigate={onNavigate}>
          Цены
        </MenuLink>
        <MenuLink href="/coaches" onNavigate={onNavigate}>
          Тренеры
        </MenuLink>
        <MenuLink href="/champions" onNavigate={onNavigate}>
          Зал славы
        </MenuLink>
        <MenuLink href="/club-history" onNavigate={onNavigate}>
          История
        </MenuLink>
        <MenuLink href="/contacts" onNavigate={onNavigate}>
          Контакты
        </MenuLink>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointer(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b-[3px] border-ink bg-white">
      <div className="mx-auto flex min-h-[76px] max-w-wrap flex-wrap items-center gap-x-4 gap-y-2 px-4 py-1.5 max-md:min-h-16 max-md:px-[18px] xl:px-8">
        <div className="flex w-full items-center gap-3 min-[900px]:w-auto">
          <BrandLockup />
          <button
            type="button"
            className="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-xl border-[2.5px] border-ink bg-sun min-[900px]:ml-3"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuMark open={open} />
          </button>
        </div>
        <div className="flex w-full items-center gap-6 min-[900px]:ml-auto min-[900px]:w-auto">
          <HeaderSocial />
          <SignupButton placement="header" className="hidden h-11 shrink-0 items-center whitespace-nowrap rounded-btn border-[2.5px] border-ink bg-orange px-3.5 text-sm font-black text-ink shadow-btn-main min-[900px]:inline-flex">
            Записаться
          </SignupButton>
        </div>
      </div>
      <div className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden" inert={open ? undefined : true}>
          <nav id="site-menu" aria-label="Основное меню" className="max-h-[calc(100dvh-16rem)] overflow-y-auto border-t-[3px] border-ink bg-white md:max-h-[calc(100dvh-8rem)]">
            <div className="mx-auto max-w-wrap px-4 py-4 max-md:px-[18px] xl:px-8">
              <MenuPanel onNavigate={close} />
              <div className="mt-4 flex flex-wrap items-center gap-3 min-[900px]:hidden">
                <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="font-display text-lg font-black" onClick={close}>
                  {site.phoneDisplay}
                </TrackLink>
                <SignupButton placement="menu" className="inline-flex h-12 items-center justify-center rounded-btn border-[2.5px] border-ink bg-orange px-5 font-black text-ink shadow-btn-main">
                  Записаться
                </SignupButton>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
