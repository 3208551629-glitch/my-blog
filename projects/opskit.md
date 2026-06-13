---
title: opskit
description: 运维工具包 — Docker 管理、监控、定时任务、缓存清理、包体积分析、数据库模式管理
projectName: opskit
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

运维工具包 — Docker 管理、监控、定时任务、缓存清理、包体积分析、数据库模式管理。

## 功能特性

- Docker 助手：容器管理和监控
- 定时任务解析和健康监控
- 缓存清理：自动清理过期缓存
- 包体积分析：分析 npm 包体积
- 数据库模式管理：Schema 版本控制

## 技术栈

- **TypeScript**
- **Node.js**
- **Docker API**
- **Commander.js**

## 项目状态

- **状态**: 稳定维护中
- **分类**: 工具包


## 快速开始

### 安装

```bash
npm install -g @toolkits/opskit
```

### 运行

```bash
cd packages/opskit && pnpm build && pnpm test
```

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
