---
layout: page
title: seckit
description: 安全与配置工具包 — 依赖审计、配置检查、环境变量管理、许可证合规、端口扫描
projectName: seckit
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

安全与配置工具包 — 依赖审计、配置检查、环境变量管理、许可证合规、端口扫描。保障项目安全。

## 功能特性

- 依赖安全审计：扫描依赖包漏洞
- 配置检查：验证配置文件安全性
- 环境变量管理：安全管理和检测 .env 文件
- 许可证合规检查
- 端口扫描：快速检测开放端口

## 技术栈

- **TypeScript**
- **Node.js**
- **OSV API**
- **Commander.js**

## 项目状态

- **状态**: 稳定维护中
- **分类**: 工具包


## 快速开始

### 安装

```bash
npm install -g @toolkits/seckit
```

### 运行

```bash
cd packages/seckit && pnpm build && pnpm test
```

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
