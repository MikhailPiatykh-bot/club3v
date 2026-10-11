import Link from "next/link";
import { Logo } from "@/components/logo";
import { TrackLink } from "@/components/track-link";
import { site } from "@/lib/content";

const legal = [
  { href: "/privacy", label: "Политика" },
  { href: "/consent", label: "Согласие" },
  { href: "/oferta", label: "Оферта" },
];

export function SiteFooter() {
  const inn = site.inn || "будет добавлен";
  const ogrnip = site.ogrnip || "будет добавлен";

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm text-paper/75">
            Традиционное и оздоровительное ушу и спортивная акробатика для детей с 3 лет.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Зал</p>
          <p className="mt-2 text-sm text-paper/75">{site.address.full}</p>
          <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold">
            {site.phoneDisplay}
          </TrackLink>
        </div>
        <div>
          <p className="text-sm font-semibold">{site.legalName}</p>
          <p className="mt-2 text-sm text-paper/75">ИНН: {inn}</p>
          <p className="text-sm text-paper/75">ОГРНИП: {ogrnip}</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-offset-2 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
