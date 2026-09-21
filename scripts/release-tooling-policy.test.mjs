import assert from "node:assert/strict";
import test from "node:test";

import { shouldWriteAgents } from "./release-tooling-policy.mjs";

test("creates missing AGENTS.md", () => {
  assert.equal(shouldWriteAgents({
    exists: false,
    current: "",
    expected: "generated",
    refreshAgents: false,
  }), true);
});

test("preserves a customized AGENTS.md unless refresh is explicit", () => {
  assert.equal(shouldWriteAgents({
    exists: true,
    current: "custom project instructions",
    expected: "generated template",
    refreshAgents: false,
  }), false);
  assert.equal(shouldWriteAgents({
    exists: true,
    current: "custom project instructions",
    expected: "generated template",
    refreshAgents: true,
  }), true);
});

test("does not rewrite an identical AGENTS.md", () => {
  assert.equal(shouldWriteAgents({
    exists: true,
    current: "same",
    expected: "same",
    refreshAgents: true,
  }), false);
});
