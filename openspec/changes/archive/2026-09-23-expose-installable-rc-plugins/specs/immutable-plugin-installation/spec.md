## MODIFIED Requirements

### Requirement: Release identity is consistent

市场检查 MUST 验证 catalog 版本、三端 manifest、源码 tag 和 GitHub Release 具有一致身份，并在任一证据缺失或指向不同 commit 时失败。生产插件 MUST 对应正式 GitHub Release；可测试安装的语义预发布候选 MUST 对应标记为 pre-release 的 GitHub Release。

#### Scenario: Release evidence matches

- **WHEN** 市场检查一个生产插件条目
- **THEN** 版本、安装 ref、tag、正式 Release 和目标 commit 相互一致

#### Scenario: Installable RC evidence matches

- **WHEN** 市场检查一个 `release_candidate_installable` 条目
- **THEN** 候选版本、三端安装 ref、不可变 tag、GitHub pre-release 和目标 commit 相互一致

#### Scenario: Catalog is ahead of release

- **WHEN** catalog 声明的版本没有对应 tag 或匹配发布渠道的 GitHub Release
- **THEN** 检查失败且不会把该条目认定为可安装
