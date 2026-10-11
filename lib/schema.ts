import { faq, prices, site, siteUrl } from "@/lib/content";
import { formatRub, largeFamilyPrice } from "@/lib/money";

export function businessJsonLd() {
  const family = largeFamilyPrice(prices.subscription, prices.largeFamilyDiscountPercent);
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Детский клуб Veni Vidi Vici",
    description:
      "Традиционное и оздоровительное ушу и спортивная акробатика для детей с 3 лет. Хорошёво-Мнёвники, пр-т Маршала Жукова, 51.",
    url: siteUrl,
    telephone: site.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: "проспект Маршала Жукова, 51",
      addressLocality: "Москва",
      addressRegion: "Хорошёво-Мнёвники",
      addressCountry: "RU",
    },
    hasMap: site.mapsUrl,
    currenciesAccepted: "RUB",
    priceRange: `${prices.subscription} ₽ в месяц`,
    makesOffer: {
      "@type": "Offer",
      price: String(prices.subscription),
      priceCurrency: "RUB",
      description: `Абонемент на месяц. Многодетным скидка ${prices.largeFamilyDiscountPercent}%, ${formatRub(family)}.`,
    },
    areaServed: "Москва",
  };
}

export function faqJsonLd(items: { question: string; answer: string }[] = faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, `${siteUrl}/`).toString(),
    })),
  };
}

export function founderJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.founder.name,
    jobTitle: site.founder.role,
    worksFor: {
      "@type": "SportsActivityLocation",
      name: "Детский клуб Veni Vidi Vici",
      url: siteUrl,
    },
  };
}
