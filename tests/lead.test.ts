import assert from "node:assert/strict";
import test from "node:test";
import { leadText, normalizePhone, validateLead, type LeadRules } from "../lib/lead.ts";
import { formatRub, largeFamilyPrice } from "../lib/money.ts";

const rules: LeadRules = {
  ages: ["4 года", "3–4 года"],
  directions: ["wushu", "acrobatics", "unsure"],
  messengers: ["whatsapp", "telegram", "call"],
  coachIds: ["wushu-coach"],
};

const base = {
  parentName: "Анна",
  phone: "+7 (977) 880-25-71",
  messenger: "whatsapp",
  children: [{ age: "4 года", direction: "wushu" }],
  consent: true,
  source: "form",
  placement: "hero",
  page: "/wushu",
  utm: { utm_source: "yandex", extra: "нет" },
  renderedAt: 1_000,
};

test("normalizes Russian phone numbers", () => {
  assert.equal(normalizePhone("+7 (977) 880-25-71"), "+79778802571");
  assert.equal(normalizePhone("8 977 880 25 71"), "+79778802571");
  assert.equal(normalizePhone("9778802571"), "+79778802571");
  assert.equal(normalizePhone("123"), null);
});

test("rejects a lead without consent", () => {
  const result = validateLead({ ...base, consent: false }, rules, 5_000);
  assert.equal(result.ok, false);
});

test("drops honeypot and too-fast submissions", () => {
  const honeypot = validateLead({ ...base, fax: "spam" }, rules, 5_000);
  assert.equal(honeypot.ok && honeypot.spam, true);
  const fast = validateLead({ ...base, renderedAt: 4_000 }, rules, 4_500);
  assert.equal(fast.ok && fast.spam, true);
});

test("keeps a valid lead, UTM and known coach only", () => {
  const result = validateLead({ ...base, coachId: "missing", children: [...base.children, { age: "3–4 года", direction: "unsure" }] }, rules, 5_000);
  assert.equal(result.ok, true);
  if (!result.ok || result.spam) return;
  assert.equal(result.lead.phone, "+79778802571");
  assert.equal(result.lead.coachId, null);
  assert.equal(result.lead.children.length, 2);
  assert.deepEqual(result.lead.utm, { utm_source: "yandex" });
  assert.match(leadText(result.lead, { direction: (id) => id, coach: () => "не указан" }), /Анна/);
});

test("formats the subscription discount", () => {
  assert.equal(largeFamilyPrice(9000, 11), 8010);
  assert.equal(largeFamilyPrice(9000, 5), 8550);
  assert.match(formatRub(9000), /9/);
  assert.match(formatRub(9000), /₽/);
});
