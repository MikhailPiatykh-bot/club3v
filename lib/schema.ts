import { faq, prices, site, siteUrl, upcomingEvents } from "@/lib/content";
import { formatRub, largeFamilyPrice } from "@/lib/money";

export function businessJsonLd() {
  const family = largeFamilyPrice(prices.subscription, prices.largeFamilyDiscountPercent);
  const contactPoint = [
    {
      "@type": "ContactPoint",
      telephone: site.phoneTel,
      contactType: "customer service",
      availableLanguage: "ru",
    },
    { "@type": "ContactPoint", contactType: "customer service", url: site.whatsapp, availableLanguage: "ru" },
    { "@type": "ContactPoint", contactType: "customer service", url: site.telegram, availableLanguage: "ru" },
    ...(site.max ? [{ "@type": "ContactPoint", contactType: "customer service", url: site.max, availableLanguage: "ru" }] : []),
  ];
  const sameAs = [site.channels.telegram, site.channels.max, site.channels.vkConfirmed ? site.channels.vk : "", site.mapsUrl].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Клуб Veni Vidi Vici",
    description:
      "Ушу, акробатика и брейкданс для детей с 3 лет, айкидо и ушу для взрослых. Хорошёво-Мнёвники, пр-т Маршала Жукова, 51.",
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
    audience: [
      { "@type": "PeopleAudience", name: "Дети", suggestedMinAge: 3 },
      { "@type": "PeopleAudience", name: "Взрослые" },
    ],
    contactPoint,
    ...(sameAs.length ? { sameAs } : {}),
    makesOffer: {
      "@type": "Offer",
      price: String(prices.subscription),
      priceCurrency: "RUB",
      description: `Абонемент на месяц. Многодетным скидка ${prices.largeFamilyDiscountPercent}%, ${formatRub(family)}.`,
    },
    areaServed: "Москва",
  };
}

export function eventsJsonLd(today = new Date()) {
  const items = upcomingEvents(today);
  if (!items.length) return null;
  return items.map((item) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: item.title,
    startDate: item.startDate,
    ...(item.endDate ? { endDate: item.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatusNote: item.dateText,
    location: {
      "@type": "Place",
      name: item.place || "Клуб Veni Vidi Vici",
      address: item.place && item.place !== "Москва" ? item.place : "проспект Маршала Жукова, 51, Москва",
    },
    organizer: { "@type": "SportsActivityLocation", name: "Клуб Veni Vidi Vici", url: siteUrl },
    ...(item.photo ? { image: item.photo } : {}),
  }));
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
