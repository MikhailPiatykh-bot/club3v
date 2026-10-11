import assert from "node:assert/strict";
import test from "node:test";
import { createRateLimiter } from "../lib/rate-limit.ts";
import { isAllowedOrigin } from "../lib/origin.ts";

test("limits repeated leads from one address", () => {
  const limiter = createRateLimiter(2, 1_000);
  assert.equal(limiter.check("1.1.1.1", 0), true);
  assert.equal(limiter.check("1.1.1.1", 10), true);
  assert.equal(limiter.check("1.1.1.1", 20), false);
  assert.equal(limiter.check("1.1.1.1", 2_000), true);
});

test("accepts only the same host", () => {
  assert.equal(isAllowedOrigin("https://club3v.ru", "club3v.ru"), true);
  assert.equal(isAllowedOrigin("https://evil.example", "club3v.ru"), false);
  assert.equal(isAllowedOrigin(null, "club3v.ru"), false);
});
