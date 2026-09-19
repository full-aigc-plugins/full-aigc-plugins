## Context

参见 `proposal.md`。当前市场数据由 catalog 生成，但安装 ref 与版本身份没有形成强约束，且不同插件的 manifest 形态并不完全一致。

## Goals / Non-Goals

**Goals:**

- 让市场版本对应唯一、不可变、可验证的插件内容。
- 让版本提升覆盖所有实际发布面并保留平台特有构建元数据。

**Non-Goals:**

- 不移动或重写历史 tag。
- 不在市场仓修改插件源码或技能内容。

## Decisions

1. 以 catalog 的基础版本推导 `v<version>` 安装 ref，并在远端验证 tag 的 peeled commit 与 Release target。相比固定 commit，tag 便于用户理解；peeled SHA 校验提供不可变性证据。
2. 版本提升工具统一读取基础语义版本，再为 Codex 保留或生成平台构建元数据；存在根 `plugin.json` 时一并更新。
3. 市场仓只在插件 CI、tag 和 Release 完成后提交版本更新，避免 catalog 领先正式发布。

## Risks / Trade-offs

- [网络或 GitHub API 暂时不可用] → 将本地结构检查与远端发布验证分层，正式发布门禁必须执行远端验证。
- [用户脏改动与自动生成结果交叠] → 仅暂存本轮目标插件字段，提交前检查 staged diff。

## Migration Plan

1. 增强生成与版本提升脚本并加入测试。
2. 完成插件正式 tag/Release 后重新生成市场文件。
3. 检查 staged diff，排除不相关用户改动。
4. 推送市场更新并验证三端安装源。
