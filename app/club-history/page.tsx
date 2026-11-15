import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SignupButton } from "@/components/signup-button";
import { history } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "История клуба",
  description: "История детского клуба Veni Vidi Vici с 2015 года: ушу, акробатика и брейкданс. Зал на пр-те Маршала Жукова, 51.",
  path: "/club-history",
});

const directionLinks = [
  { href: "/wushu", label: "Ушу" },
  { href: "/acrobatics", label: "Акробатика" },
  { href: "/breakdance", label: "Брейкданс" },
];

export default function ClubHistoryPage() {
  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "История клуба", path: "/club-history" }]} />
          <h1 className="mt-4 font-display text-h1 font-black">{history.title}</h1>
          <p className="mt-4 max-w-2xl">{history.lead}</p>
        </div>
      </header>
      <section className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
        <ul className="grid gap-3 md:grid-cols-2">
          {history.chapters.map((chapter) => (
            <li key={chapter.title} className="rounded-card border-[3px] border-ink bg-white p-5 shadow-card-sm">
              <h2 className="font-display text-2xl font-black">{chapter.title}</h2>
              <p className="mt-2">{chapter.text}</p>
              {chapter.title === "Направления" ? (
                <p className="mt-3 flex flex-wrap gap-2">
                  {directionLinks.map((item) => (
                    <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-pill border-[2.5px] border-ink bg-sun px-4 font-black">
                      {item.label}
                    </Link>
                  ))}
                </p>
              ) : null}
              {chapter.title === "Лагеря и Китай" ? (
                <p className="mt-3 flex flex-wrap gap-3">
                  <Link href="/sbory" className="inline-flex min-h-11 items-center font-black text-blue underline">
                    Сборы
                  </Link>
                  <Link href="/china-camp" className="inline-flex min-h-11 items-center font-black text-blue underline">
                    Сборы в Китае
                  </Link>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
        <SignupButton placement="history" className="mt-8 inline-flex h-14 items-center rounded-btn border-[2.5px] border-ink bg-orange px-5 font-black text-ink shadow-btn-main">
          Записаться в группу
        </SignupButton>
      </section>
      <section className="mx-auto max-w-wrap px-10 pb-12 max-md:px-[18px]">
        <h2 className="font-display text-3xl font-black">Как это было</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {history.photos.map((photo) => (
            <li key={photo.src} className="overflow-hidden rounded-card border-[3px] border-ink bg-cream shadow-card-sm">
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} className="h-auto w-full" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
