---
title: apikit
description: API 工具包 — 接口测试、快速构建、可视化、差异对比、哨兵监控、Webhook 测试
projectName: apikit
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

apikit 是一站式 API 开发工具集，从 Mock 服务器生成到接口测试，从版本差异对比到哨兵监控，覆盖了 API 开发全生命周期。

无论你是前端开发者需要 Mock 数据，还是后端开发者需要测试接口，apikit 都能提供高效的解决方案。

## 功能特性

- **API Forge**：从 OpenAPI 规范自动生成 Mock 服务器
- **API Test**：自动化接口测试，支持断言和测试报告
- **API Diff**：版本差异对比，识别破坏性变更
- **API Lens**：API 监控和分析，性能指标追踪
- **API Sentinel**：本地 API 监控和测试平台
- **Webhook 测试**：模拟和测试 Webhook 接收端点

## 技术栈

- **TypeScript**
- **Node.js**
- **Commander.js**
- **Zod**

## 项目状态

- **状态**: 稳定维护中
- **分类**: 工具包


## 快速开始

### 安装

```bash
npm install -g @toolkits/apikit
```

### 运行

```bash
cd packages/apikit && pnpm build && pnpm test
```

## 使用示例

```bash
# 从 OpenAPI 规范生成 Mock 服务器
apikit forge openapi.yaml --port 3001

# 自动化接口测试
apikit test openapi.yaml --assert status=200

# 对比两个版本的 API 差异
apikit diff v1.yaml v2.yaml --check-breaking
```

## 适用场景

- **前后端分离**：前端使用 Mock 服务器并行开发
- **API 维护**：对比新旧版本 API，识别不兼容变更
- **Webhook 调试**：本地测试第三方服务的 Webhook 推送

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
