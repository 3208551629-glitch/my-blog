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

opskit 是一个面向开发者和运维人员的工具集，简化了 Docker 管理、监控、定时任务等日常运维工作。

无论是本地开发环境的容器管理，还是生产环境的监控告警，opskit 都能提供便捷的命令行操作。

## 功能特性

- **Docker 助手**：容器管理和监控，快速查看容器状态
- **定时任务解析**：解析和验证 cron 表达式
- **健康监控**：监控服务健康状态，生成报告
- **缓存清理**：自动清理过期缓存，释放磁盘空间
- **包体积分析**：分析 npm 包体积，识别体积大户
- **数据库模式管理**：Schema 版本控制和迁移

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

## 使用示例

opskit `<command>` [options]

## 适用场景

- **开发环境**：快速管理本地 Docker 容器
- **性能优化**：分析 npm 包体积，优化构建产物
- **运维监控**：定时检查服务健康状态

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
