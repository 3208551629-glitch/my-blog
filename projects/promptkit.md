---
title: promptkit
description: Prompt 工程工具包 — 提示词测试、优化锻造、对比评估、模板管理
projectName: promptkit
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

promptkit 是一个专业的 Prompt 工程工具集，帮助开发者测试、优化和管理 AI 提示词。

从提示词测试到多模型对比评估，promptkit 提供了完整的 Prompt 工程工作流。

## 功能特性

- **提示词测试框架**：系统化测试提示词效果
- **提示词优化和锻造**：迭代优化提示词质量
- **多模型对比评估**：同一提示词在不同模型上的表现对比
- **模板管理和版本控制**：提示词模板库和版本管理
- **支持 Anthropic 和 OpenAI**：多提供商支持

## 技术栈

- **TypeScript**
- **Node.js**
- **Anthropic SDK**
- **OpenAI SDK**

## 项目状态

- **状态**: 活跃开发中 ⭐
- **分类**: 工具包


## 快速开始

### 安装

```bash
npm install -g @toolkits/promptkit
```

### 运行

```bash
cd packages/promptkit && pnpm build && pnpm test
```

## 使用示例

promptkit `<command>` [options]

## 适用场景

- **AI 应用开发**：测试和优化应用中的提示词
- **模型选型**：对比不同模型对同一任务的响应质量
- **提示词版本管理**：追踪提示词变更历史

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
