import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "catalog.json"), "utf8"));
const documentedPlugins = [
  ...catalog.plugins,
  ...(catalog.candidatePlugins ?? []).filter(
    candidate => candidate.status === "release_candidate_installable",
  ),
];

for (const readme of ["README.md", "README.en.md"]) {
  test(`${readme} keeps catalog plugin counts and versions synchronized`, () => {
    const text = fs.readFileSync(path.join(root, readme), "utf8");
    const countLabel = readme === "README.md"
      ? `${catalog.plugins.length} 个插件`
      : `${catalog.plugins.length} plugins`;

    assert.ok(text.includes(countLabel), `${readme} must declare ${countLabel}`);
    for (const plugin of documentedPlugins) {
      const row = text
        .split("\n")
        .find(line => line.includes(`| \`${plugin.id}\` |`));
      assert.ok(row, `${readme} must document ${plugin.id}`);
      assert.ok(
        row.includes(`| ${plugin.version} |`),
        `${readme} must document ${plugin.id} ${plugin.version}`,
      );
    }
  });
}
