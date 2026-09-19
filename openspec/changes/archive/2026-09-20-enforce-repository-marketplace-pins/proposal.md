## Why

聚合市场已固定发布 tag，但仓库内的单插件市场文件仍由同步器写入移动的 `main`，破坏了同一版本安装相同内容的既有契约。

## What Changes

- 仓库市场同步器按 catalog 版本生成 `v<version>` 安装 ref 与同 tag 的 logo URL。
- 市场检查器拒绝仓库市场中的移动 ref 或未固定的 logo URL。
- 将现有非排除插件的仓库市场文件迁移到对应发布 tag。

## Capabilities

### Modified Capabilities

- `immutable-plugin-installation`: 将不可变安装要求覆盖到仓库内单插件市场文件。

## Impact

影响市场生成和验证脚本，以及各插件仓库的 `.agents/plugins/marketplace.json`；不改变插件业务行为。
