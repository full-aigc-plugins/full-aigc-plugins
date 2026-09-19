## Why

市场条目显示语义版本，但安装源仍可能指向移动的 `main`，因此同一市场版本在不同时间可能安装出不同内容，也无法与 tag 和 GitHub Release 建立确定对应关系。

## What Changes

- 生成市场时将插件安装源固定到对应发布 tag，而不是移动分支。
- 在生成和检查阶段验证市场版本、插件 manifest、tag 与 Release 的一致性。
- 支持含 Codex 构建元数据与纯语义版本的插件 manifest，并同步可选根 `plugin.json`。

## Capabilities

### New Capabilities

- `immutable-plugin-installation`: 定义市场安装来源与正式插件发布的一致性契约。

### Modified Capabilities

无。

## Impact

影响市场生成脚本、三个市场清单、catalog、版本提升脚本与发布验证；不会改变插件自身业务能力。
