---
title: flowkit
description: 工作流引擎 — 工作流编排、Agent 代理执行、项目规划、自动化构建、AI 内容生成
projectName: flowkit
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

flowkit 是一个强大的工作流引擎，支持可视化工作流编排和 Agent 代理执行。

通过 YAML 定义工作流程，你可以轻松编排复杂的任务链，支持 HTTP 请求、Shell 命令、文件操作等多种节点类型。

## 功能特性

- **可视化工作流编排**：通过 YAML 定义复杂工作流
- **Agent 代理执行引擎**：支持 AI Agent 自主决策和执行
- **项目规划和自动化构建**：集成 CI/CD 流程
- **AI 内容生成工作流**：自动化内容创作流程
- **支持多种节点类型**：HTTP、Shell、文件、条件分支

## 技术栈

- **TypeScript**
- **Node.js**
- **Zod**
- **Commander.js**

## 项目状态

- **状态**: 活跃开发中 ⭐
- **分类**: 工具包


## 快速开始

### 安装

```bash
npm install -g @toolkits/flowkit
```

### 运行

```bash
cd packages/flowkit && pnpm build && pnpm test
```

## 使用示例

```bash
flowkit <command> [options]
```

## 适用场景

- **自动化部署**：定义从构建到部署的完整流程
- **数据处理**：编排多步骤数据转换任务
- **AI 工作流**：自动化内容生成和审核流程

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
