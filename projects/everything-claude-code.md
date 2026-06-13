---
title: everything-claude-code
description: Claude Code 全能工具集 — 47 个 Agent、181 个 Skill、自动 Hook 工作流
projectName: everything-claude-code
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

Everything Claude Code (ECC) 是一个完整的 Claude Code 插件生态系统，包含 47 个 Agent、181 个 Skill 和自动 Hook 工作流。

作为 Anthropic 黑客马拉松获奖作品，ECC 提供了从 Token 优化到 Agent 编排的全方位 AI 开发工具链。支持 Claude Code、Codex、Cursor、OpenCode、Gemini 等多种 AI 开发环境。

## 功能特性

- **47 个预配置 Agent**：涵盖代码审查、安全扫描、性能优化等场景
- **181 个实用 Skill**：可复用的技能模块，支持自定义扩展
- **自动 Hook 工作流**：会话持久化、上下文管理
- **Token 优化**：智能模型选择、系统提示词精简
- **安全扫描**：AgentShield、CVE 扫描、沙箱隔离
- **多语言支持**：覆盖 12+ 编程生态系统
- **Rust 控制平面**：ECC 2.0 alpha 版本，提供仪表盘和会话管理

## 技术栈

- **Node.js**
- **TypeScript**
- **Python**
- **Rust**
- **Shell**

## 项目状态

- **状态**: 活跃开发中 ⭐
- **分类**: AI/Agent
- **精选项目**: ⭐

## 快速开始

### 安装

```bash
npm install -g ecc-universal
```

### 运行

```bash
npm install && npm link
```

## 使用示例

安装后配置到 `~/.claude/` 目录，即可在 Claude Code 中使用所有 Agent 和 Skill。

## 适用场景

- **AI 辅助开发**：利用预配置 Agent 提升编码效率
- **代码审查**：自动化代码质量和安全审查
- **团队协作**：统一团队 AI 开发规范和工具链

## 相关链接

- [GitHub 仓库](${GH}/everything-claude-code)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
