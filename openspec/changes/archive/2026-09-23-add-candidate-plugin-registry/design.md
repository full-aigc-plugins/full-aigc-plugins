## Context

Content Factory 已有独立仓库和 RC 清单，但正式门禁仍为阻断状态。中央市场原先只有正式插件和纯规格规划仓两种类型：把 RC 放进正式 `plugins` 会错误生成安装入口，把它放进 `planningRepositories` 又与其真实可运行代码和 manifest 冲突。

## Decisions

- 新增 `candidatePlugins`，作为中央 catalog 的非安装型登记层。
- 候选必须绑定仓库、RC 版本和仓内发布门禁文件。
- 当前只接受 `release_candidate_blocked`；门禁不再阻断时必须先发布不可变版本，再迁入 `plugins`。
- 同步器继续只从 `plugins` 生成三宿主清单，并验证候选 ID 不与正式插件重叠。

## Rejected Alternatives

- 不使用个人 marketplace 或 `content-factory-candidate` 临时市场，因为它们会绕开中央 catalog。
- 不把候选登记为规划仓，因为 Content Factory 已包含运行代码和宿主 manifest。
- 不提前登记为正式插件，因为 `v1.0.0` 尚未通过发布门禁。
