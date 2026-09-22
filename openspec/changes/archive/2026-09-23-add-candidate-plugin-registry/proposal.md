## Why

正在开发但尚未通过发布门禁的插件需要由中央市场追踪，同时不得冒充已发布、可安装的插件。个人市场或临时候选市场会绕开统一治理并在桌面端留下重复条目。

## What Changes

- 在 `catalog.json` 增加非安装型 `candidatePlugins` 登记区。
- 同步器校验候选仓、候选版本和发布门禁，并拒绝候选与正式插件重名。
- 候选插件不进入 Codex、ZCode、Kimi 三份安装清单。
- 首个登记项为 `content-factory` `1.0.0-rc.2`，状态保持 `release_candidate_blocked`。

## Capabilities

### Added Capabilities

- `candidate-plugin-governance`: 由中央市场跟踪发布受阻的插件候选，同时保持安装清单只包含不可变正式发布。

## Impact

影响中央 catalog、市场同步校验、文档与回归测试，不改变任何已发布插件版本或用户安装状态。
