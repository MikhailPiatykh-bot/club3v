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

test("age columns and schedule groups stay explicit", () => {
  const columns = readJson("../content/age-groups.json");
  assert.deepEqual(
    columns.items.map((item: { ages: string }) => item.ages),
    ["3+", "6–10", "10–14", "15+"],
  );
  assert.equal(columns.note, "");
  const groups = readJson("../content/groups.json");
  const ages = (direction: string) =>
    groups.items.filter((item: { direction: string }) => item.direction === direction).map((item: { ages: string }) => item.ages);
  assert.deepEqual(ages("wushu"), ["6–10", "10–14", "15+"]);
  assert.deepEqual(ages("acrobatics"), ["6–9", "10–13", "14–16"]);
  assert.deepEqual(ages("group-3plus"), ["3+"]);
});

test("visible progress lists wushu with acrobatics and breakdance", () => {
  const belts = readJson("../content/belts.json");
  assert.deepEqual(
    belts.tracks.map((track: { title: string; items: { name: string }[] }) => [track.title, track.items.map((item) => item.name)]),
    [
      ["Ушу Акробатика", ["Старт", "База", "Техника", "Дальше"]],
      ["Брейкданс", ["Старт", "База", "Техника", "Дальше"]],
    ],
  );
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
  const offer = readJson("../content/offer.json");
  const site = readJson("../content/site.json");
  const faq = readJson("../content/faq.json");
  const videos = readJson("../content/videos.json");
  const reviews = readJson("../content/reviews.json");
  const districts = readJson("../content/districts.json");
  assert.equal(prices.subscription, 9000);
  assert.equal(offer.mainCondition, "При посещении 8 занятий в первый месяц, для новых учеников.");
  assert.equal(offer.bullets[2], "Вернём деньги за первый месяц, если не подойдёт (по условиям гарантии)");
  assert.equal(
    offer.conditionsNote,
    "Гарантия действует для новых учеников при посещении 8 занятий в первый месяц. Если ребёнок заболел, первый месяц продлевается по справке. Заявление на возврат подаётся в течение 7 дней после окончания первого месяца, деньги возвращаем в течение 10 дней.",
  );
  assert.equal(offer.guaranteeHref, "/oferta#guarantee");
  assert.equal(offer.conditionsNote.includes("ещё утверждает"), false);
  const oferta = readJson("../content/oferta.json");
  const guarantee = oferta.blocks.find((block: { id?: string }) => block.id === "guarantee");
  assert.equal(oferta.blocks[oferta.blocks.indexOf(guarantee) + 1].text, offer.conditionsNote);
  assert.match(prices.subscriptionCard.note, /8 занятий в первый месяц/);
  assert.match(offer.finalText, /8 занятий в первый месяц/);
  assert.equal(prices.largeFamilyDiscountPercent, 11);
  assert.equal(prices.secondChildDiscountPercent, 5);
  assert.equal(site.phoneDisplay, "+7 (977) 880-25-71");
  assert.match(site.address.full, /Маршала Жукова, 51/);
  assert.equal(site.hero.h1, "Ушу, акробатика, брейкданс и айкидо для детей и взрослых с 3 лет в СЗАО");
  assert.equal(site.hero.h1.endsWith(site.hero.h1Accent), true);
  assert.match(site.hero.subtitle, /брейкданс/);
  assert.match(site.hero.subtitle, /айкидо/);
  assert.match(site.hero.subtitle, /взрослых/);
  assert.deepEqual(
    site.why.cards.map((card: { problem: string; help: string }) => [card.problem, card.help]),
    [
      ["Физическое развитие", "Родители понимают необходимость физически развивать тело своего ребёнка."],
      [
        "Чтобы сформировать характер и дисциплину",
        "Регулярные посещения занятий вырабатывают у ребёнка привычку к труду, которая очень пригодится в жизни.",
      ],
      [
        "Энергия через край",
        "На занятии энергия уходит в дело: разминка, короткое задание, повтор. В младших группах темп частый.",
      ],
      ["Не вытащить из телефона", "В зале телефон не нужен. Ребёнок занят вместе с группой своего возраста."],
    ],
  );
  assert.ok(faq.items.length >= 8);
  assert.ok(videos.items.length >= 4 && videos.items.length <= 6);
  assert.equal(reviews.yandex.score, 5);
  assert.equal(reviews.yandex.scoreLabel, "5,0");
  assert.equal(reviews.yandex.ratingCount, 70);
  assert.equal(reviews.yandex.reviewCount, 60);
  assert.equal(reviews.yandex.countLabel, "70");
  assert.deepEqual(
    site.hero.openings.map((item: { name: string; places: string }) => `${item.name}: ${item.places}`),
    [
      "Ушу для взрослых: 5 мест",
      "Айкидо для взрослых: 2 места",
      "Раннее развитие 3+: 4 места",
      "Ушу младшая группа: 2 места",
      "Акробатика младшая группа: 2 места",
    ],
  );
  assert.equal(reviews.yandex.items.length, reviews.yandex.reviewCount);
  assert.ok(reviews.yandex.items.every((item: { name: string; date: string; url: string; visible: boolean }) => item.visible && item.name && item.date && item.url));
  assert.equal(districts.items.filter((item: { published: boolean }) => item.published).length, 0);
  const directions = readJson("../content/directions.json");
  assert.match(directions.wushu.h1, /Хорошёво-Мнёвниках, пр-т Маршала Жукова, 51/);
  assert.match(directions.acrobatics.h1, /Хорошёво-Мнёвниках, пр-т Маршала Жукова, 51/);
  assert.match(directions.breakdance.h1, /Хорошёво-Мнёвниках, пр-т Маршала Жукова, 51/);
  assert.match(directions.group3.h1, /Хорошёво-Мнёвниках, пр-т Маршала Жукова, 51/);
  const sections = readJson("../content/sections.json");
  assert.equal(sections.items.find((item: { id: string }) => item.id === "ages").label, "03 / ВОЗРАСТ");
  assert.equal(sections.items.find((item: { id: string }) => item.id === "start").label, "09 / СТАРТ");
});

test("public copy does not revive closed halls, other sports or old prices", () => {
  const forbidden = ["вершинин", "каратэ", "карате", "железняк", "капоэйр", "бесплатн", "пробн", "3300", "4200", "4400", "5500"];
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
