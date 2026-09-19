## Context

仓库内市场文件是独立安装入口，必须与聚合市场一样绑定已发布版本。

## Decisions

- 使用 catalog 中的语义版本派生 `v<version>`，不读取默认分支。
- logo 使用同一 tag 下的 jsDelivr 地址，避免图片随分支漂移。
- 校验器同时检查 ref、icon 和 interface logo。
