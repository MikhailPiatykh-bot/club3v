"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLockup } from "@/components/brand-lockup";
import { TgIcon, WaIcon } from "@/components/mock-icons";
import { TrackLink } from "@/components/track-link";

export function SiteHeader({
  phoneDisplay,
  phoneTel,
  whatsapp,
  telegram,
}: {
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  telegram: string;
}) {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const home = pathname === "/";
  const links = [
    { href: home ? "#dir" : "/#dir", label: "Направления" },
    { href: home ? "#coach" : "/#coach", label: "Тренеры" },
    { href: home ? "#price" : "/#price", label: "Цены" },
    { href: "/schedule", label: "Расписание", current: pathname === "/schedule" },
    { href: home ? "#cont" : "/#cont", label: "Контакты" },
  ];

  return (
    <header className="site-header">
      <div className="wrap hdr">
        <BrandLockup />
        <nav className="menu" aria-label="Разделы">
          {links.map((item) => (
            <Link key={item.label} href={item.href} className={item.current ? "cur" : undefined} aria-current={item.current ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hdr-right">
          <TrackLink href={`tel:${phoneTel}`} goal="phone_click" className="phone">
            {phoneDisplay}
          </TrackLink>
          <TrackLink href={telegram} goal="telegram_click" target="_blank" rel="noopener noreferrer" className="ico ico-tg" aria-label="Telegram">
            <TgIcon />
          </TrackLink>
          <TrackLink href={whatsapp} goal="whatsapp_click" target="_blank" rel="noopener noreferrer" className="ico ico-wa" aria-label="WhatsApp">
            <WaIcon />
          </TrackLink>
          <Link className="btn btn-red" href={home ? "#quiz" : "/#quiz"}>
            Записаться
          </Link>
          <button
            type="button"
            className="burger"
            aria-label={open ? "Закрыть меню" : "Меню"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </div>
      <div id="mobile-nav" className={open ? "menu-panel open" : "menu-panel"}>
        {links.map((item) => (
          <Link key={item.label} href={item.href} aria-current={item.current ? "page" : undefined} onClick={() => setMenuPath(null)}>
            {item.label}
          </Link>
        ))}
        <Link href="/events" onClick={() => setMenuPath(null)}>
          События
        </Link>
        <Link className="btn btn-red" href={home ? "#quiz" : "/#quiz"} onClick={() => setMenuPath(null)}>
          Записаться
        </Link>
      </div>
    </header>
  );
}
