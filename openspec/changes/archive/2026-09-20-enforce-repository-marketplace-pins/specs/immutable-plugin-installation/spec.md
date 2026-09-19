## MODIFIED Requirements

### Requirement: Marketplace sources are immutable
市场生成器 MUST 为每个已发布插件的聚合市场和仓库内单插件市场使用与市场版本对应的不可变 tag 或 commit，MUST NOT 将固定版本解析到移动的默认分支；远程 logo 也 MUST 绑定同一发布 ref。

#### Scenario: User installs a catalog version
- **WHEN** 用户从聚合市场或仓库内单插件市场安装已声明版本
- **THEN** 安装源与远程 logo 都解析到该版本对应的不可变 Git 对象
