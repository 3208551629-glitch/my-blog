---
title: Git 工作流最佳实践
date: 2026-04-05
tags:
  - Git
  - 工具
category: 技术
---

# Git 工作流最佳实践

良好的 Git 工作流能提高团队协作效率，本文介绍几种常见的工作流模式。

## 分支命名规范

```
main/master     - 主分支，生产环境代码
develop         - 开发分支
feature/xxx     - 功能分支
bugfix/xxx      - Bug 修复分支
hotfix/xxx      - 紧急修复分支
release/x.x.x   - 发布分支
```

## 常用工作流

### Git Flow

适合有明确发布周期的项目：

```
main ────────●──────●──────●
             \    /        \
develop ──────●──●──●───────●──●
              /       \
feature/x ───●──●──●──●
```

### GitHub Flow

适合持续部署的项目：

```
main ─────●──────●──────●──────●
           \    /        \
feature/ ──●──●──●       ●──●──●
```

## Commit 规范

### Conventional Commits

```
feat: 添加用户登录功能
fix: 修复登录验证 bug
docs: 更新 API 文档
style: 代码格式化
refactor: 重构用户模块
test: 添加单元测试
chore: 更新构建配置
```

### Commit 模板

```bash
# 配置模板
git config commit.template .gitmessage

# .gitmessage 内容
# <type>(<scope>): <subject>
#
# <body>
#
# <footer>
```

## 常用命令

### 交互式变基

```bash
# 合并最近 3 个 commit
git rebase -i HEAD~3

# 编辑后
pick abc1234 feat: 添加功能 A
squash def5678 fix: 修复问题
squash ghi9012 docs: 更新文档
```

### Cherry-pick

```bash
# 选择特定 commit 合并到当前分支
git cherry-pick abc1234
```

### Stash 使用

```bash
# 暂存当前修改
git stash

# 查看暂存列表
git stash list

# 恢复暂存
git stash pop
```

## 最佳实践

1. **频繁提交** - 每个小改动都提交
2. **原子提交** - 每个 commit 只做一件事
3. **写好信息** - 清晰描述改动内容
4. **及时同步** - 定期 pull 最新代码
5. **代码审查** - 合并前进行 Code Review

## 总结

选择适合团队的工作流，并坚持执行，能大大提升开发效率。
