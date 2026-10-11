import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";
import { TrackLink } from "@/components/track-link";
import { site } from "@/lib/content";

const links = [
  { href: "/#dir", label: "Направления" },
  { href: "/#price", label: "Цены" },
  { href: "/schedule", label: "Расписание" },
  { href: "/#rev", label: "Отзывы" },
  { href: "/events", label: "События" },
  { href: "/#cont", label: "Контакты" },
];

export function SiteFooter() {
  const inn = site.inn || "будет добавлен";
  const ogrnip = site.ogrnip || "будет добавлен";

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="ft">
          <BrandLockup compact />
          <nav aria-label="В подвале">
            {links.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div>
            <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" style={{ fontWeight: 800, color: "#fff" }}>
              {site.phoneDisplay}
            </TrackLink>
            <div style={{ fontSize: 14 }}>Москва, СЗАО, пр-т Маршала Жукова, 51</div>
          </div>
        </div>
        <div className="ft-bottom">
          <span>© 2026 Veni Vidi Vici · CLUB3V</span>
          <span>
            {site.legalName} · ИНН: {inn} · ОГРНИП: {ogrnip}
          </span>
          <span>
            <Link href="/privacy" className="ul">
              Политика конфиденциальности
            </Link>
            {" · "}
            <Link href="/consent" className="ul">
              Согласие
            </Link>
            {" · "}
            <Link href="/oferta" className="ul">
              Оферта
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
