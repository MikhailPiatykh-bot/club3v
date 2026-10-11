import beltsJson from "@/content/belts.json";
import coachesJson from "@/content/coaches.json";
import consentJson from "@/content/consent.json";
import directionsJson from "@/content/directions.json";
import districtsJson from "@/content/districts.json";
import eventsJson from "@/content/events.json";
import faqJson from "@/content/faq.json";
import formJson from "@/content/form.json";
import groupsJson from "@/content/groups.json";
import ofertaJson from "@/content/oferta.json";
import pricesJson from "@/content/prices.json";
import privacyJson from "@/content/privacy.json";
import reviewsJson from "@/content/reviews.json";
import scheduleJson from "@/content/schedule.json";
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
export const reviews = reviewsJson.items;
export const events = eventsJson.items;
export const videosDoc = videosJson;
export const videos = videosJson.items;
export const stats = statsJson.items;
export const directions = directionsJson;
export const districts = districtsJson.items;
export const publishedDistricts = districtsJson.items.filter((item) => item.published);
export const privacy = privacyJson;
export const consent = consentJson;
export const oferta = ofertaJson;

export type DirectionId = "wushu" | "acrobatics";
export type Group = (typeof groups)[number];

export function directionLabel(id: string) {
  if (id === "wushu") return "Ушу";
  if (id === "acrobatics") return "Акробатика";
  if (id === "unsure") return "Пока не знаю";
  return id;
}

export function groupById(id: string) {
  return groups.find((group) => group.id === id);
}

export function groupsFor(direction: DirectionId) {
  return groups.filter((group) => group.direction === direction);
}

export function coachById(id: string) {
  return coaches.find((coach) => coach.id === id);
}

export function groupDetails(group: Group) {
  if (group.duration && group.size) return `${group.duration} · ${group.size}`;
  return "Длительность занятия и размер группы уточняются";
}

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://club3v.ru").replace(/\/$/, "");

export const leadAges = [...formOptions.ages, ...formOptions.quizAges.map((item) => item.label)];
