import ageGroupsJson from "@/content/age-groups.json";
import beltsJson from "@/content/belts.json";
import campsJson from "@/content/camps.json";
import championsJson from "@/content/champions.json";
import chinaJson from "@/content/china-camp.json";
import coachesJson from "@/content/coaches.json";
import comparisonJson from "@/content/comparison.json";
import consentJson from "@/content/consent.json";
import directionsJson from "@/content/directions.json";
import districtsJson from "@/content/districts.json";
import eventsJson from "@/content/events.json";
import faqJson from "@/content/faq.json";
import formJson from "@/content/form.json";
import groupsJson from "@/content/groups.json";
import lessonJson from "@/content/lesson.json";
import motivationJson from "@/content/motivation.json";
import ofertaJson from "@/content/oferta.json";
import offerJson from "@/content/offer.json";
import pricesJson from "@/content/prices.json";
import privacyJson from "@/content/privacy.json";
import rentJson from "@/content/rent.json";
import reviewsJson from "@/content/reviews.json";
import scheduleJson from "@/content/schedule.json";
import sectionsJson from "@/content/sections.json";
import siteJson from "@/content/site.json";
import statsJson from "@/content/stats.json";
import videosJson from "@/content/videos.json";

export const site = siteJson;
export const formOptions = formJson;
export const groupsDoc = groupsJson;
export const groups = groupsJson.items;
export const scheduleDoc = scheduleJson;
export const lessons = scheduleJson.items;
export const coachesDoc = coachesJson;
export const coaches = coachesJson.items;
export const prices = pricesJson;
export const belts = beltsJson;
export const faq = faqJson.items;
export type YandexReview = {
  name: string;
  date: string;
  score: number | null;
  text: string;
  url: string;
  visible: boolean;
};

export const reviewsDoc = {
  ...reviewsJson,
  yandex: {
    ...reviewsJson.yandex,
    items: reviewsJson.yandex.items as YandexReview[],
  },
};

export type ClubEvent = {
  id: string;
  title: string;
  type: string;
  direction: string;
  startDate: string | null;
  endDate: string | null;
  dateText: string;
  needsYear: boolean;
  stale: boolean;
  place: string | null;
  registration: boolean;
  link: string | null;
  photo: string | null;
  source: string;
};

export const eventsDoc = eventsJson;
export const events = eventsJson.items as ClubEvent[];
export const videosDoc = videosJson;
export const videos = videosJson.items;
export const stats = statsJson.items;
export const directions = directionsJson;
export const districts = districtsJson.items;
export const publishedDistricts = districtsJson.items.filter((item) => item.published);
export const privacy = privacyJson;
export const consent = consentJson;
export const oferta = ofertaJson;
export const offer = offerJson;
export const sections = sectionsJson.items;
export const ageGroups = ageGroupsJson;
export const comparison = comparisonJson;
export const lessonPlan = lessonJson;
export const motivation = motivationJson;
export type ChampionCard = {
  name: string;
  rank: string;
  direction: string;
  year: string | null;
  photo: string | null;
  featured: boolean;
  consent: boolean;
  detail: string | null;
};

export const championsDoc = {
  ...championsJson,
  items: championsJson.items as ChampionCard[],
};
export const chinaCamp = chinaJson;
export const camps = campsJson;
export const rent = rentJson;

export type DirectionId = keyof typeof directionsJson;
export type Audience = "child" | "adult";
export type Group = (typeof groups)[number];

const directionNames: Record<string, string> = {
  wushu: "Ушу",
  acrobatics: "Акробатика",
  breakdance: "Брейкданс",
  "group-3plus": "Группа 3+",
  aikido: "Айкидо",
  "wushu-adult": "Ушу для взрослых",
  unsure: "Пока не знаю",
};

export function directionLabel(id: string) {
  return directionNames[id] ?? id;
}

export function sectionLabel(id: string) {
  return sections.find((item) => item.id === id)?.label ?? "";
}

export function groupById(id: string) {
  return groups.find((group) => group.id === id);
}

export function groupsFor(direction: string) {
  return groups.filter((group) => group.direction === direction);
}

export function coachById(id: string) {
  return coaches.find((coach) => coach.id === id);
}

export function groupDetails(group: Group) {
  if (group.duration && group.size) return `${group.duration} · ${group.size}`;
  return "Длительность занятия и размер группы уточняются";
}

export function upcomingEvents(today = new Date()) {
  const stamp = today.toISOString().slice(0, 10);
  return events.filter((item) => {
    if (item.needsYear || item.stale || !item.startDate) return false;
    const end = item.endDate || item.startDate;
    return end >= stamp;
  });
}

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://club3v.ru").replace(/\/$/, "");

export const leadAges = [...formOptions.ages, ...formOptions.campAges, ...formOptions.quizAges.map((item) => item.label)];

export const leadDirections = [
  ...formOptions.directions.map((item) => item.id),
  ...formOptions.adultDirections.map((item) => item.id),
];
