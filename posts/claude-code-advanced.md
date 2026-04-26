---
title: Claude Code 高级技巧
date: 2026-04-19
tags:
  - Claude Code
  - AI
  - 工具
category: 技术
---

# Claude Code 高级技巧

掌握 Claude Code 的高级功能，让 AI 助手发挥更大价值。

## 自定义规则

### 创建规则文件

在项目根目录创建 `.claude/rules.md`：

```markdown
# 项目规则

## 代码风格
- 使用 TypeScript
- 优先使用 Composition API
- 使用 Tailwind CSS

## 命名规范
- 组件：PascalCase
- 函数：camelCase
- 常量：UPPER_SNAKE_CASE

## 禁止事项
- 不要使用 any 类型
- 不要使用 var
- 不要忽略错误
```

### 规则生效

Claude Code 会自动读取并遵循这些规则。

## Hooks 系统

### PreToolUse Hook

在工具执行前运行：

```json
// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "eslint --fix $FILE_PATH"
      }
    ]
  }
}
```

### PostToolUse Hook

在工具执行后运行：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "command": "prettier --write $FILE_PATH"
      }
    ]
  }
}
```

## 多模型协作

### 模型选择策略

```markdown
# 简单任务 → Haiku
- 格式化代码
- 简单重构
- 文档更新

# 常规任务 → Sonnet
- 功能开发
- Bug 修复
- 代码审查

# 复杂任务 → Opus
- 架构设计
- 性能优化
- 复杂重构
```

### 配置模型路由

```json
{
  "modelRouting": {
    "refactor": "claude-sonnet-4-6",
    "architecture": "claude-opus-4-5",
    "docs": "claude-haiku-4-5"
  }
}
```

## 上下文管理

### 压缩策略

```
# 自动压缩
claude config set autoCompress true

# 手动压缩
/compact

# 查看上下文使用
/context
```

### 记忆系统

```bash
# 保存记忆
/remember 项目使用 Vue 3 + TypeScript

# 查看记忆
/memory

# 清除记忆
/forget
```

## 工作流自动化

### 创建 Skill

```markdown
<!-- .claude/skills/review.md -->
# Code Review Skill

## 步骤
1. 运行测试
2. 检查类型
3. 审查代码风格
4. 检查安全问题
5. 生成报告
```

### 使用 Skill

```bash
/skill review
```

## 调试技巧

### 查看执行日志

```bash
claude --debug
```

### 分析 Token 使用

```bash
claude --stats
```

## 实战案例

### 批量重构

```
"将所有组件从 Options API 改为 Composition API"
```

### 生成测试

```
"为 src/utils 目录下的所有函数生成单元测试"
```

### 文档生成

```
"根据代码生成 API 文档，使用 JSDoc 格式"
```

## 总结

掌握这些高级技巧，能让 Claude Code 成为更强大的开发伙伴。建议根据项目需求选择合适的配置。
