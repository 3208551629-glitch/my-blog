---
layout: page
title: gitkit
description: Git 工具包 — 仓库清理、日志分析、统计、Hooks 管理、活动脉搏、智能差异对比
projectName: gitkit
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

Git 工具包 — 仓库清理、日志分析、统计、Hooks 管理、活动脉搏、智能差异对比。让 Git 操作更高效。

## 功能特性

- 仓库清理：自动清理无用分支和标签
- 日志分析：可视化提交历史和贡献统计
- Hooks 管理：统一配置 Git Hooks
- 活动脉搏：实时监控仓库活跃度
- 智能差异对比：增强的 diff 视图

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

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
