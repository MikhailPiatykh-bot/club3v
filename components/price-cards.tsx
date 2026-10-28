import Link from "next/link";
import { offer, prices } from "@/lib/content";
import { formatRub, largeFamilyPrice } from "@/lib/money";

export function PriceCards() {
  const family = largeFamilyPrice(prices.subscription, prices.largeFamilyDiscountPercent);
  const secondChild = largeFamilyPrice(prices.subscription, prices.secondChildDiscountPercent);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-card border-[3px] border-ink bg-sun p-6 shadow-card">
        <h3 className="font-display text-3xl font-black">{prices.subscriptionCard.title}</h3>
        <p className="mt-3 font-display text-5xl font-black">{formatRub(prices.subscription)}</p>
        <p className="mt-3">{prices.subscriptionCard.note}</p>
        <p className="mt-2 font-extrabold">
          Многодетным −{prices.largeFamilyDiscountPercent}%: {formatRub(family)}
        </p>
        <p className="mt-2 font-extrabold">
          На второго ребёнка −{prices.secondChildDiscountPercent}%: {formatRub(secondChild)}
        </p>
        <Link href={offer.guaranteeHref} className="mt-3 inline-flex min-h-11 items-center font-black text-blue underline">
          {offer.guaranteeLabel}
        </Link>
      </article>
      <article className="rounded-card border-[3px] border-ink bg-white p-6 shadow-card">
        <h3 className="font-display text-2xl font-black">Взрослым и другие группы</h3>
        <p className="mt-3">{prices.adultsNote}</p>
        <p className="mt-3">
          <span className="ph">
            {prices.friend.title}: {prices.friend.note}
          </span>
        </p>
      </article>
    </div>
  );
}
