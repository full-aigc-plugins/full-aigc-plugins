import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));

test("Content Factory is centrally tracked as a blocked, non-installable candidate", () => {
  const catalog = readJson("catalog.json");
  const candidate = catalog.candidatePlugins?.find(entry => entry.id === "content-factory");

  assert.ok(candidate, "content-factory must be present in catalog.candidatePlugins");
  assert.equal(candidate.status, "release_candidate_blocked");
  assert.equal(candidate.version, "1.0.0-rc.2");
  assert.equal(candidate.releaseGate, "docs/verification/release-candidate.json");

  for (const file of [
    ".agents/plugins/marketplace.json",
    "marketplace.json",
    "kimi-marketplace.json"
  ]) {
    const manifest = readJson(file);
    const ids = manifest.plugins.map(entry => entry.name ?? entry.id);
    assert.equal(ids.includes("content-factory"), false, `${file} must exclude blocked candidates`);
  }

  const validation = spawnSync(
    process.execPath,
    [path.join(root, "scripts", "sync-marketplaces.mjs"), "--candidate=content-factory"],
    { cwd: root, encoding: "utf8" }
  );
  assert.equal(validation.status, 0, `${validation.stdout}\n${validation.stderr}`);
});
