import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SignupButton } from "@/components/signup-button";
import { scheduleRows } from "@/lib/schedule-rows";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Айкидо и ушу для взрослых в СЗАО",
  description: "Айкидо по выходным и набор во взрослую группу ушу. Клуб Veni Vidi Vici, пр-т Маршала Жукова, 51, Хорошёво-Мнёвники.",
  path: "/adults",
});

export default function AdultsPage() {
  const aikido = scheduleRows("aikido");
  const wushu = scheduleRows("wushu-adult");

  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Взрослым", path: "/adults" }]} />
          <h1 className="mt-4 max-w-4xl font-display text-h1 font-black">Айкидо и ушу для взрослых в Москве, СЗАО</h1>
          <p className="mt-4 max-w-2xl">Зал один: {site.address.full}. Дни, тренеров и цены взрослых групп клуб ещё назовёт.</p>
        </div>
      </header>
      <section id="aikido" className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
        <h2 className="font-display text-h2 font-black">Айкидо</h2>
        <p className="mt-3">Группа для взрослых по выходным.</p>
        {aikido.map((row) => (
          <p key={row.id} className="mt-2 font-extrabold">
            {row.days}, {row.time}. <span className="ph">{row.note}</span>
          </p>
        ))}
        <SignupButton kind="enroll" audience="adult" direction="aikido" placement="direction" className="mt-4 inline-flex h-14 items-center rounded-btn border-[2.5px] border-ink bg-orange px-5 font-black text-ink shadow-btn-main">
          Записаться
        </SignupButton>
      </section>
      <section id="wushu" className="bg-white py-12">
        <div className="mx-auto max-w-wrap px-10 max-md:px-[18px]">
          <span className="rounded-pill border-2 border-ink bg-sun px-3 py-1 text-sm font-black">Идёт набор</span>
          <h2 className="mt-3 font-display text-h2 font-black">Ушу для взрослых</h2>
          {wushu.map((row) => (
            <p key={row.id} className="mt-3">
              <span className="ph">{row.note}</span>
            </p>
          ))}
          <SignupButton kind="waitlist" audience="adult" direction="wushu-adult" placement="direction" className="mt-4 inline-flex h-14 items-center rounded-btn border-[2.5px] border-ink bg-orange px-5 font-black text-ink shadow-btn-main">
            Записаться в группу
          </SignupButton>
        </div>
      </section>
    </>
  );
}
