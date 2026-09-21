import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUMP = path.join(ROOT, "scripts", "bump-plugin.mjs");

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

test("version bump synchronizes README versions and invalidates host acceptance", () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "aigc-plugin-bump-"));
  try {
    const marketRoot = path.join(temporary, "full-aigc-plugins");
    const pluginRoot = path.join(
      temporary,
      "full-aigc-plugins-repositories",
      "fixture-plugin",
    );
    fs.mkdirSync(path.join(marketRoot, "scripts"), { recursive: true });
    fs.mkdirSync(pluginRoot, { recursive: true });
    writeJson(path.join(marketRoot, "catalog.json"), {
      plugins: [{
        id: "fixture",
        version: "1.2.3",
        localDirectory: "fixture-plugin",
        repository: "example/fixture-plugin",
        logo: "assets/logo.png",
      }],
    });
    fs.writeFileSync(
      path.join(marketRoot, "scripts", "sync-marketplaces.mjs"),
      "process.exit(0);\n",
    );
    writeJson(path.join(pluginRoot, ".zcode-plugin", "plugin.json"), {
      version: "1.2.3",
    });
    writeJson(path.join(pluginRoot, "kimi.plugin.json"), { version: "1.2.3" });
    writeJson(path.join(pluginRoot, ".codex-plugin", "plugin.json"), {
      version: "1.2.3+codex.20260919",
    });
    writeJson(path.join(pluginRoot, ".agents", "plugins", "marketplace.json"), {
      plugins: [{
        version: "1.2.3",
        source: { ref: "v1.2.3" },
        icon: "https://old.invalid/logo.png",
        interface: { logo: "https://old.invalid/logo.png" },
      }],
    });
    writeJson(path.join(pluginRoot, "runtime", "host-acceptance.json"), {
      schema: "jianying-host-release-acceptance/v1",
      status: "passed",
      pluginVersion: "1.2.3",
      hosts: [{ host: "codex" }],
    });
    fs.writeFileSync(
      path.join(pluginRoot, "README.md"),
      "Current package version: `1.2.3+codex.20260919`.\n",
    );
    fs.writeFileSync(
      path.join(pluginRoot, "README.zh-CN.md"),
      "当前包版本：`1.2.3+codex.20260919`。\n",
    );

    const result = spawnSync(process.execPath, [BUMP, "fixture", "patch"], {
      encoding: "utf8",
      env: { ...process.env, PARTME_PLUGINS_ROOT: marketRoot },
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stdout, /发版候选已生成（尚未提交、推送、打 tag 或发布）/);
    assert.match(result.stdout, /不可变 Release、制品校验和真实市场安装验证/);
    assert.doesNotMatch(result.stdout, /发版完成/);

    const codex = JSON.parse(
      fs.readFileSync(path.join(pluginRoot, ".codex-plugin", "plugin.json")),
    );
    assert.match(codex.version, /^1\.2\.4\+codex\.\d{8}$/);
    assert.ok(
      fs.readFileSync(path.join(pluginRoot, "README.md"), "utf8").includes(codex.version),
    );
    assert.ok(
      fs.readFileSync(path.join(pluginRoot, "README.zh-CN.md"), "utf8").includes(codex.version),
    );
    const acceptance = JSON.parse(
      fs.readFileSync(path.join(pluginRoot, "runtime", "host-acceptance.json")),
    );
    assert.equal(acceptance.status, "pending");
    assert.equal(acceptance.pluginVersion, "1.2.4");
    assert.deepEqual(acceptance.hosts, []);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
