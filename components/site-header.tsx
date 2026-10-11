"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneIcon, TelegramIcon, WhatsappIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";
import { buttonClass } from "@/lib/styles";

type NavItem = { href: string; label: string };

export function SiteHeader({
  nav,
  phoneDisplay,
  phoneTel,
  whatsapp,
  telegram,
}: {
  nav: NavItem[];
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  telegram: string;
}) {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center gap-3 px-4">
        <Logo />
        <nav aria-label="Разделы" className="ml-4 hidden items-center gap-4 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`text-sm ${pathname === item.href ? "font-semibold text-ink" : "text-ink-soft hover:text-ink"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <TrackLink
            href={`tel:${phoneTel}`}
            goal="phone_click"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold"
            aria-label={`Позвонить ${phoneDisplay}`}
          >
            <PhoneIcon />
            <span className="hidden xl:inline">{phoneDisplay}</span>
          </TrackLink>
          <TrackLink href={whatsapp} goal="whatsapp_click" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full" aria-label="WhatsApp">
            <WhatsappIcon />
          </TrackLink>
          <TrackLink href={telegram} goal="telegram_click" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full" aria-label="Telegram">
            <TelegramIcon />
          </TrackLink>
          <SignupButton placement="header" className={`${buttonClass()} max-sm:hidden!`}>
            Записаться
          </SignupButton>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Разделы" className="border-t border-line bg-paper lg:hidden">
          <div className="mx-auto grid w-full max-w-6xl gap-1 px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="rounded-2xl px-3 py-3 text-base hover:bg-card"
              >
                {item.label}
              </Link>
            ))}
            <SignupButton placement="menu" className={`${buttonClass()} mt-2`}>
              Записаться
            </SignupButton>
          </div>
        </nav>
      )}
    </header>
  );
}
