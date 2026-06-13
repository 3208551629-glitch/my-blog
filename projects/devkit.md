---
layout: page
title: devkit
description: 开发工具包 — 变更日志、README 生成、徽章生成、代码质量分析、CI/CD 流水线、Schema 管理
projectName: devkit
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

开发工具包 — 变更日志、README 生成、徽章生成、代码质量分析、CI/CD 流水线、Schema 管理。

## 功能特性

- 自动生成变更日志
- README 自动生成
- GitHub 徽章生成
- 代码质量分析
- CI/CD 流水线配置

## 技术栈

- **TypeScript**
- **Node.js**
- **Commander.js**

## 项目状态

- **状态**: 稳定维护中
- **分类**: 工具包


## 快速开始

### 安装

```bash
npm install -g @toolkits/devkit
```

### 运行

```bash
cd packages/devkit && pnpm build && pnpm test
```

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
