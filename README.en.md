<div align="center">

# Full AIGC Plugins

**10 plugins. The full AIGC pipeline. One unified ecosystem.**

*Image · Video · Audio · Music · 3D · Multimodal — production-grade, independently installable on Codex / ZCode / Kimi.*

[![License](https://img.shields.io/badge/License-Apache%202.0-green)](LICENSE)
[![Platforms](https://img.shields.io/badge/hosts-Codex%20%C2%B7%20ZCode%20%C2%B7%20Kimi-blue)](#install)
[![Plugins](https://img.shields.io/badge/plugins-10-green)](#plugin-catalog)

[简体中文](./README.md)

[About](#about) ·
[Install](#install) ·
[Plugin Catalog](#plugin-catalog) ·
[Architecture](#architecture) ·
[Ecosystem](#ecosystem) ·
[Contributing](#contributing)

</div>

---

## About

**Full AIGC Plugins** is the plugin marketplace for AI-generated content (AIGC), covering image generation, video creation, audio/music, 3D production, and multimodal workflows, across the Codex, ZCode, and Kimi Code host platforms.

This repository is the plugin-side counterpart of [Full AIGC Skills](https://github.com/partme-ai/full-aigc-skills): the skills side captures domain knowledge ("how to think"), while the plugin side ships executable capability ("what you can do") — MCP tools, generation pipelines, and approval/verification gates. Both follow the same domain layout within one ecosystem.

> This repository contains marketplace metadata only (catalog and per-platform manifests), not plugin runtime code. Each plugin is maintained in its own repository, aligned by `catalog.json` as the single source of truth for IDs, names, versions, categories, and repository addresses.

### Coverage

| Domain | Problem | Solution (plugins) |
|--------|---------|--------------------|
| **Image generation** | Text-to-image, batch production, quality evaluation | image-factory, dreamina-design, comfy-design |
| **Video creation** | Text/image-to-video, editing to final cut | minimax-design, video-factory, jianying-edit, volcengine-design |
| **3D production** | Scene building, previs, rendering | blender-design, maya-design |
| **Multimodal workflows** | Node canvases, structured orchestration | dreamina-canvas, comfy-design, volcengine-design |
| **Film production planning** | Story → shot list → storyboard | partme-cine-planning (planning repo, unreleased) |

---

## Install

### Codex

```bash
codex plugin marketplace add partme-ai/full-aigc-plugins
codex plugin add blender-design@full-aigc-plugins
codex plugin add comfy-design@full-aigc-plugins
codex plugin add dreamina-canvas@full-aigc-plugins
codex plugin add dreamina-design@full-aigc-plugins
codex plugin add image-factory@full-aigc-plugins
codex plugin add jianying-edit@full-aigc-plugins
codex plugin add maya-design@full-aigc-plugins
codex plugin add minimax-design@full-aigc-plugins
codex plugin add video-factory@full-aigc-plugins
codex plugin add volcengine-design@full-aigc-plugins
```

### ZCode

Open Settings → Plugins → Create → Add plugin marketplace, enter `partme-ai/full-aigc-plugins`, then install from the personal marketplace section.

### Kimi Code CLI

```text
/plugins marketplace https://raw.githubusercontent.com/partme-ai/full-aigc-plugins/main/kimi-marketplace.json
```

---

## Plugin Catalog

| Plugin | ID | Version | Focus | Repository |
|--------|----|:-------:|-------|------------|
| 🧱 **Blender Production** | `blender-design` | 0.3.1 | Controlled design, review, and export of Blender scenes (visual milestones + recovery checkpoints) | [partme-blender-plugin](https://github.com/full-aigc-plugins/partme-blender-plugin) |
| 🎞️ **Comfy Generation** | `comfy-design` | 0.1.1 | Comfy Cloud generation workflows (image / video / audio / 3D) | [partme-comfy-plugin](https://github.com/full-aigc-plugins/partme-comfy-plugin) |
| 🎨 **Dreamina Canvas** | `dreamina-canvas` | 0.1.3 | Build and run structured Dreamina canvases and timelines (approval-aware, recoverable) | [partme-dreamina-canvas](https://github.com/full-aigc-plugins/partme-dreamina-canvas) |
| 🖼️ **Dreamina Design** | `dreamina-design` | 0.4.1 | Create images and videos with Dreamina | [partme-dreamina-design](https://github.com/full-aigc-plugins/partme-dreamina-design) |
| 🏭 **Image Factory** | `image-factory` | 0.1.3 | Discover, batch-produce, and evaluate images | [partme-image-factory](https://github.com/full-aigc-plugins/partme-image-factory) |
| ✂️ **JianYing Edit** | `jianying-edit` | 0.11.0 | pyJianYingDraft-powered native draft engine | [partme-jianying-plugin](https://github.com/full-aigc-plugins/partme-jianying-plugin) |
| 🎬 **Maya Production** | `maya-design` | 0.1.2 | Inspect Maya scenes, create reversible Playblasts, produce verified Jimeng links | [partme-maya-plugin](https://github.com/full-aigc-plugins/partme-maya-plugin) |
| 🎵 **MiniMax Design** | `minimax-design` | 0.4.2 | Generate H3 videos with MiniMax — white-model first/last-frame anchoring | [partme-minimax-design](https://github.com/full-aigc-plugins/partme-minimax-design) |
| 🎥 **Video Factory** | `video-factory` | 0.1.2 | Edit, compose, review, and verify videos | [partme-video-factory](https://github.com/full-aigc-plugins/partme-video-factory) |
| 🌋 **Volcengine Design** | `volcengine-design` | 0.1.0 | Doubao ASR/TTS plus image and video generation workflows | [partme-volcengine-design](https://github.com/full-aigc-plugins/partme-volcengine-design) |

> The planning repository [`partme-cine-planning`](https://github.com/full-aigc-plugins/partme-cine-planning) (`director` / `script` / `storyboard`, specifications only) is tracked by this marketplace under the `design_baseline_not_released` status and stays out of every installable manifest until its own release boundary is complete.

---

## Architecture

### How the marketplace works

`catalog.json` is the single source of truth. `scripts/sync-marketplaces.mjs` generates the three platform manifests from it and validates each plugin repository's skills directories (frontmatter, naming consistency) and planning-repo constraints (no published manifests):

```
full-aigc-plugins/
├── catalog.json                        # Single source of truth: IDs / names / versions / categories / repos
├── .agents/plugins/marketplace.json    # Codex manifest (generated)
├── marketplace.json                    # ZCode manifest (generated)
├── kimi-marketplace.json               # Kimi manifest (generated)
└── scripts/                            # Sync and release tooling
```

Each independent plugin repository owns its runtime adapters: `.codex-plugin/plugin.json`, `.zcode-plugin/plugin.json`, and `kimi.plugin.json`.

### Progressive disclosure

Skills inside plugins follow the [Agent Skills specification](https://agentskills.io):

1. **At startup**: only skill names and descriptions are loaded (minimal context)
2. **On demand**: the full `SKILL.md` loads when the agent recognizes a relevant task
3. **In depth**: reference files are read only when explicitly needed

---

## Ecosystem

| Resource | Link |
|----------|------|
| **Skills hub (AIGC)** | [partme-ai/full-aigc-skills](https://github.com/partme-ai/full-aigc-skills) |
| **Skill packages org (AIGC)** | [github.com/full-aigc-skills](https://github.com/full-aigc-skills) |
| **Dev-side plugin marketplace** | [github.com/full-stack-plugins](https://github.com/full-stack-plugins) |
| **Skills hub (full stack)** | [partme-ai/full-stack-skills](https://github.com/partme-ai/full-stack-skills) |
| **Agent Skills specification** | [agentskills.io](https://agentskills.io) |
| **Skills CLI** | [github.com/vercel-labs/skills](https://github.com/vercel-labs/skills) |
| **PartMe.AI** | [github.com/partme-ai](https://github.com/partme-ai) |

---

## Contributing

### Release discipline

Any plugin code change (no matter the size) requires a version bump and release; marketplaces detect updates by version number:

```bash
node scripts/bump-plugin.mjs <plugin-id> <major|minor|patch>
```

The command updates the catalog version, syncs the four manifests in the plugin repository, and regenerates the three platform manifests.

### Adding a plugin

1. Build the plugin in its own repository with the three-platform adapter layer (`.codex-plugin` / `.zcode-plugin` / `kimi.plugin.json`)
2. Register the entry in `catalog.json`
3. Run `node scripts/sync-marketplaces.mjs --write` to regenerate manifests, then commit

---

## License

Apache 2.0 — see [LICENSE](LICENSE).

---

<div align="center">

**If this project helps you, please give us a ⭐️**

Made with ❤️ by PartMe.AI Team

</div>
