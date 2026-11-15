import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildGrid, closedDayIds, matchesFilter, type CoachInput, type GroupInput, type LessonInput } from "../lib/schedule-grid.ts";

const labels: Record<string, string> = {
  wushu: "Ушу",
  acrobatics: "Акробатика",
  breakdance: "Брейкданс",
  "group-3plus": "Группа 3+",
  aikido: "Айкидо",
  "wushu-adult": "Ушу для взрослых",
};

function readJson(path: string) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
}

function sessions() {
  const schedule = readJson("../content/schedule.json");
  const groups = readJson("../content/groups.json");
  const coaches = readJson("../content/coaches.json");
  return buildGrid({
    lessons: schedule.items as LessonInput[],
    groups: groups.items as GroupInput[],
    coaches: coaches.items as CoachInput[],
    label: (id) => labels[id] ?? id,
  });
}

test("confirmed groups fill the week and Saturday stays closed", () => {
  const rows = sessions();
  const placed = rows.filter((row) => row.placed);
  assert.deepEqual(closedDayIds(rows), ["sat"]);
  assert.equal(placed.some((row) => row.dayId === "sat"), false);
  assert.equal(JSON.stringify(rows).includes("Вершинина"), false);

  const kids = placed.filter((row) => row.groupId === "g3");
  assert.deepEqual(
    kids.map((row) => row.dayId),
    ["tue", "thu"],
  );
  assert.equal(kids[0]?.time, "16:20–17:00");
  assert.equal(kids[0]?.slotId, "1600");

  const breaking = placed.filter((row) => row.groupId === "breakdance");
  assert.deepEqual(
    breaking.map((row) => `${row.dayId} ${row.time}`),
    ["wed 16:00–17:00", "wed 17:00–18:00", "wed 18:00–19:00"],
  );

  const wushuJunior = placed.filter((row) => row.lessonId === "wushu-jr");
  assert.deepEqual(
    wushuJunior.map((row) => `${row.dayId} ${row.time}`),
    ["mon 17:00–18:20", "fri 17:00–18:20"],
  );
  assert.equal(wushuJunior[0]?.coachName, "Виктория Сергеевна");
  assert.equal(kids[0]?.coachName, "Ольга Владимировна");
  assert.equal(breaking[0]?.coachName, "Алексей Юрьевич");
  assert.deepEqual(
    placed.filter((row) => row.lessonId === "wushu-sun-both").map((row) => `${row.dayId} ${row.time} ${row.name} ${row.ages}`),
    ["sun 17:00–18:30 Младшая и средняя 6–14"],
  );
  assert.deepEqual(
    placed.filter((row) => row.lessonId === "wushu-sun-sr").map((row) => `${row.dayId} ${row.time}`),
    ["sun 18:30–20:30"],
  );
  assert.deepEqual(
    placed.filter((row) => row.lessonId === "wushu-wed-both").map((row) => `${row.dayId} ${row.time}`),
    ["wed 19:00–20:00"],
  );
  assert.deepEqual(
    placed.filter((row) => row.lessonId === "wushu-wed-sr").map((row) => `${row.dayId} ${row.time}`),
    ["wed 20:00–21:00"],
  );
  assert.equal(placed.find((row) => row.lessonId === "wushu-sr")?.coachName, "Михаил Александрович");

  const acroSenior = placed.filter((row) => row.groupId === "acro-sr");
  assert.deepEqual(
    acroSenior.map((row) => `${row.dayId} ${row.time}`),
    ["tue 19:40–21:00", "thu 19:40–21:00"],
  );
});

test("adult groups stay out of the week grid until hours are known", () => {
  const rows = sessions();
  const adults = rows.filter((row) => row.audience === "adult");
  assert.equal(adults.every((row) => row.placed === false), true);
  assert.equal(adults.find((row) => row.groupId === "wushu-adult")?.recruiting, true);

  const onlyAdults = rows.filter((row) => matchesFilter(row, { audience: "adult", direction: "all", tier: "all" }));
  assert.deepEqual(
    onlyAdults.map((row) => row.groupId),
    ["aikido", "wushu-adult"],
  );

  const juniors = rows.filter((row) => matchesFilter(row, { audience: "child", direction: "all", tier: "junior" }) && row.placed);
  assert.equal(juniors.every((row) => row.tiers.includes("junior")), true);
  assert.equal(juniors.some((row) => row.lessonId === "wushu-sun-both"), true);
  assert.equal(juniors.some((row) => row.groupId === "breakdance" || row.groupId === "g3"), false);
  const middle = rows.filter((row) => matchesFilter(row, { audience: "child", direction: "all", tier: "middle" }) && row.placed);
  assert.equal(middle.some((row) => row.lessonId === "wushu-sun-both" || row.lessonId === "wushu-wed-both"), true);
  assert.equal(middle.some((row) => row.lessonId === "wushu-jr"), false);
});
