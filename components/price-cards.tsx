import { prices } from "@/lib/content";
import { formatRub, largeFamilyPrice } from "@/lib/money";

export function PriceCards() {
  const family = largeFamilyPrice(prices.subscription, prices.largeFamilyDiscountPercent);
  const cards = [
    { title: prices.trial.title, value: "по запросу", note: prices.trial.note, accent: false },
    { title: prices.dropIn.title, value: "по запросу", note: prices.dropIn.note, accent: false },
    {
      title: prices.subscriptionCard.title,
      value: formatRub(prices.subscription),
      note: `${prices.subscriptionCard.note} Многодетным −${prices.largeFamilyDiscountPercent}%: ${formatRub(family)}.`,
      accent: true,
    },
  ];

  return (
    <div>
      <ul className="grid gap-3 md:grid-cols-3">
        {cards.map((card) => (
          <li key={card.title} className={`rounded-3xl border p-5 ${card.accent ? "border-pine bg-pine text-white" : "border-line bg-card"}`}>
            <h3 className="font-display text-2xl">{card.title}</h3>
            <p className="mt-3 font-display text-3xl">{card.value}</p>
            <p className={`mt-3 text-sm ${card.accent ? "text-white/80" : "text-ink-soft"}`}>{card.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-ink-soft">{prices.friend.title}: {prices.friend.note}</p>
    </div>
  );
}
