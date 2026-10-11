import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

function readJson(path: string) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
}

function filesIn(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return filesIn(full);
    return [full];
  });
}

test("ages stay the same for both directions", () => {
  const groups = readJson("../content/groups.json");
  const ages = (direction: string) =>
    groups.items.filter((item: { direction: string }) => item.direction === direction).map((item: { ages: string }) => item.ages);
  assert.deepEqual(ages("wushu"), ages("acrobatics"));
  assert.deepEqual(ages("wushu"), ["3–4 года", "5–6 лет", "7 лет и старше"]);
});

test("schedule and coaches point at real groups", () => {
  const groups = readJson("../content/groups.json");
  const ids = new Set(groups.items.map((item: { id: string }) => item.id));
  const schedule = readJson("../content/schedule.json");
  const coaches = readJson("../content/coaches.json");
  for (const lesson of schedule.items) assert.equal(ids.has(lesson.groupId), true);
  for (const coach of coaches.items) {
    for (const groupId of coach.groupIds) assert.equal(ids.has(groupId), true);
  }
});

test("prices, contacts and required blocks match the brief", () => {
  const prices = readJson("../content/prices.json");
  const site = readJson("../content/site.json");
  const faq = readJson("../content/faq.json");
  const videos = readJson("../content/videos.json");
  const reviews = readJson("../content/reviews.json");
  const districts = readJson("../content/districts.json");
  assert.equal(prices.subscription, 9000);
  assert.equal(prices.largeFamilyDiscountPercent, 11);
  assert.equal(site.phoneDisplay, "+7 (977) 880-25-71");
  assert.match(site.address.full, /Маршала Жукова, 51/);
  assert.equal(site.hero.h1, "Ушу и акробатика для детей с 3 лет в СЗАО");
  assert.ok(faq.items.length >= 8);
  assert.ok(videos.items.length >= 4 && videos.items.length <= 6);
  assert.ok(reviews.items.length >= 4 && reviews.items.every((item: { name: string }) => item.name));
  assert.equal(districts.items.filter((item: { published: boolean }) => item.published).length, 0);
  const directions = readJson("../content/directions.json");
  assert.match(directions.wushu.h1, /Хорошёво-Мнёвниках, пр-т Маршала Жукова, 51/);
  assert.match(directions.acrobatics.h1, /Хорошёво-Мнёвниках, пр-т Маршала Жукова, 51/);
});

test("public copy does not revive closed halls, other sports or old prices", () => {
  const forbidden = ["вершинин", "каратэ", "карате", "железняк", "айкидо", "капоэйр", "брейкданс", "бесплатн", "3300", "4200", "4400", "5500"];
  const roots = ["content", "app", "components", "lib"].map((dir) => join(root, dir));
  const hits: string[] = [];
  for (const dir of roots) {
    for (const file of filesIn(dir)) {
      if (!/\.(json|ts|tsx|css|md)$/.test(file)) continue;
      const text = readFileSync(file, "utf8").toLowerCase();
      for (const word of forbidden) {
        if (text.includes(word)) hits.push(`${file}: ${word}`);
      }
    }
  }
  assert.deepEqual(hits, []);
});
