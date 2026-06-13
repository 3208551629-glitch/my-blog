---
title: reposcope
description: 仓库范围分析工具
projectName: reposcope
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

RepoScope 是一个 Git 仓库分析仪表板，提供热力图、贡献者分析、代码复杂度评估等功能。

通过可视化方式展示仓库的健康状况，帮助团队了解项目进展和代码质量。

## 功能特性

- **Git 仓库热力图**：可视化代码提交频率
- **贡献者分析**：统计和分析团队成员贡献
- **代码复杂度评估**：识别复杂代码区域
- **AI 智能摘要**：自动生成项目摘要和洞察
- **CLI 和 Web 双模式**：命令行和 Web 界面两种使用方式

## 技术栈

- **TypeScript**
- **Express**
- **React 19**
- **Recharts**
- **simple-git**
- **Anthropic SDK**

## 项目状态

- **状态**: 稳定维护中
- **分类**: 开发工具


## 快速开始

### 安装

```bash
pnpm install
```

### 运行

```bash
pnpm install && pnpm build
```

## 使用示例

pnpm build && pnpm dev

## 适用场景

- **项目管理**：了解项目整体健康状况
- **团队评估**：评估团队成员贡献度
- **代码审查**：识别需要重构的复杂代码

## 相关链接

- [GitHub 仓库](${GH}/reposcope)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
