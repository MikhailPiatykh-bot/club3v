import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";
import { MessengerLinks } from "@/components/messengers";
import { TrackLink } from "@/components/track-link";
import { site } from "@/lib/content";

const links = [
  { href: "/wushu", label: "Ушу" },
  { href: "/acrobatics", label: "Акробатика" },
  { href: "/breakdance", label: "Брейкданс" },
  { href: "/group-3plus", label: "Группа 3+" },
  { href: "/adults", label: "Взрослым" },
  { href: "/schedule", label: "Расписание" },
  { href: "/prices", label: "Цены" },
  { href: "/coaches", label: "Тренеры" },
  { href: "/events", label: "Мероприятия" },
  { href: "/china-camp", label: "Сборы в Китае" },
  { href: "/camps", label: "Лагеря" },
  { href: "/champions", label: "Зал славы" },
  { href: "/contacts", label: "Контакты" },
  { href: "/rent", label: "Аренда зала" },
];

export function SiteFooter() {
  const inn = site.inn || "будет добавлен";
  const ogrnip = site.ogrnip || "будет добавлен";

  return (
    <footer className="border-t-[3px] border-ink bg-ink text-white">
      <div className="mx-auto grid max-w-wrap gap-8 px-10 py-12 max-md:px-[18px] md:grid-cols-[1.2fr_2fr]">
        <div className="grid content-start gap-4">
          <div className="w-fit rounded-full bg-white px-3 py-1">
            <BrandLockup />
          </div>
          <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="font-display text-xl font-black text-white">
            {site.phoneDisplay}
          </TrackLink>
          <p>{site.address.full}</p>
          <MessengerLinks />
          <MessengerLinks channel />
          {site.showAccount && site.accountUrl ? (
            <a href={site.accountUrl} className="underline">
              Личный кабинет
            </a>
          ) : null}
        </div>
        <nav aria-label="Разделы в подвале" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="min-h-11 font-extrabold text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-wrap flex-wrap gap-x-4 gap-y-2 px-10 py-4 text-sm text-[#D6D8F5] max-md:px-[18px]">
          <span>© {new Date().getFullYear()} Veni Vidi Vici</span>
          <span>
            {site.legalName} · ИНН {inn} · ОГРНИП {ogrnip}
          </span>
          <Link href="/privacy" className="underline">
            Политика
          </Link>
          <Link href="/consent" className="underline">
            Согласие
          </Link>
          <Link href="/oferta" className="underline">
            Оферта
          </Link>
        </div>
      </div>
    </footer>
  );
}
