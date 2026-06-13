---
title: gitkit
description: Git 工具包 — 仓库清理、日志分析、统计、Hooks 管理、活动脉搏、智能差异对比
projectName: gitkit
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

gitkit 是一个专为提升 Git 工作效率而设计的 CLI 工具集。它封装了日常 Git 操作中最常用但最繁琐的任务，让开发者能够专注于代码本身而非版本控制的管理。

从仓库清理到日志分析，从 Hooks 管理到智能差异对比，gitkit 提供了全面的 Git 工作流增强功能。

## 功能特性

- **仓库清理**：自动识别并清理无用分支、标签和远程追踪分支
- **日志分析**：可视化提交历史，生成贡献统计报告
- **Hooks 管理**：统一配置 Git Hooks，支持多种预设模板
- **活动脉搏**：实时监控仓库活跃度，生成团队贡献热力图
- **智能差异对比**：增强的 diff 视图，支持忽略空白、格式化对比

## 技术栈

- **TypeScript**
- **Node.js**
- **simple-git**
- **Commander.js**

## 项目状态

- **状态**: 稳定维护中
- **分类**: 工具包


## 快速开始

### 安装

```bash
npm install -g @toolkits/gitkit
```

### 运行

```bash
cd packages/gitkit && pnpm build && pnpm test
```

## 使用示例

```bash
gitkit <command> [options]
```

## 适用场景

- **团队协作**：定期清理本地分支，保持仓库整洁
- **代码审查**：使用增强 diff 功能快速定位变更
- **项目管理**：生成团队贡献报告，了解项目活跃度

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
