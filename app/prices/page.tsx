import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { PriceCards } from "@/components/price-cards";
import { prices } from "@/lib/content";
import { formatRub, largeFamilyPrice } from "@/lib/money";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Цены и скидки",
  description: "Цены детского клуба Veni Vidi Vici: абонемент 9 000 ₽ в месяц, скидка многодетным 11%. Пробное и разовое — у администратора.",
  path: "/prices",
});

export default function PricesPage() {
  const family = largeFamilyPrice(prices.subscription, prices.largeFamilyDiscountPercent);

  return (
    <>
      <header className="border-b border-line bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Цены", path: "/prices" }]} />
          <h1 className="mt-4 font-display text-4xl leading-tight">Цены и скидки</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Абонемент {formatRub(prices.subscription)} в месяц. Многодетным −{prices.largeFamilyDiscountPercent}%: {formatRub(family)}.
          </p>
        </div>
      </header>
      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <PriceCards />
        <div className="mt-8 max-w-2xl space-y-3 text-sm leading-relaxed text-ink-soft">
          <p>Число занятий в неделю смотрите в расписании группы. Пока дни уточняются, администратор называет их при записи.</p>
          <p>Пробное и разовое без опубликованной цены: сумму скажет администратор. Скидку за друга тоже.</p>
        </div>
      </section>
      <CtaBand placement="prices" />
    </>
  );
}
