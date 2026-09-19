## Purpose

保证市场中声明的插件版本始终安装相同的 Git 内容，并能追溯到对应的不可变 tag 与正式 GitHub Release。

## ADDED Requirements

### Requirement: Marketplace sources are immutable
市场生成器 MUST 为每个已发布插件使用与市场版本对应的不可变 tag 或 commit，MUST NOT 将固定版本解析到移动的默认分支。

#### Scenario: User installs a catalog version
- **WHEN** 用户从任一受支持宿主安装市场中声明的插件版本
- **THEN** 安装源解析到该版本对应的不可变 Git 对象

### Requirement: Release identity is consistent
市场检查 MUST 验证 catalog 版本、三端 manifest、源码 tag 和 GitHub Release 具有一致身份，并在任一证据缺失或指向不同 commit 时失败。

#### Scenario: Release evidence matches
- **WHEN** 市场检查一个准备发布的插件条目
- **THEN** 版本、安装 ref、tag、Release 和目标 commit 相互一致

#### Scenario: Catalog is ahead of release
- **WHEN** catalog 声明的版本没有对应 tag 或正式 Release
- **THEN** 检查失败且不会把该条目认定为可发布

### Requirement: Version propagation covers supported manifests
版本提升工具 MUST 更新 Codex、ZCode、Kimi、marketplace 以及存在时的根 `plugin.json`，并正确处理纯语义版本与 Codex 构建元数据。

#### Scenario: Plugin has an additional root manifest
- **WHEN** 提升包含根 `plugin.json` 的插件版本
- **THEN** 根 manifest 与其他受支持发布面同步为同一基础版本
