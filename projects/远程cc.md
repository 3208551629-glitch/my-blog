---
title: 远程cc
description: 远程 Claude Code 工具
projectName: 远程cc
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

远程 CC 是一个通过浏览器远程控制本地 Claude Code CLI 的工具。

利用 SSE（Server-Sent Events）实现实时流式响应，让你可以在任何设备上通过浏览器使用 Claude Code。

## 功能特性

- **浏览器远程控制**：通过浏览器访问本地 Claude Code
- **SSE 实时流式响应**：实时显示 AI 响应
- **Markdown 渲染**：美观的响应展示
- **工具调用可视化**：显示 Bash、文件操作等工具执行
- **移动端适配**：支持手机浏览器访问

## 技术栈

- **Node.js**
- **Express 5**
- **SSE**
- **dotenv**

## 项目状态

- **状态**: 活跃开发中 ⭐
- **分类**: SaaS/Web


## 快速开始

### 安装

```bash
npm install
```

### 运行

```bash
npm install && npm start
```

## 使用示例

npm start

## 适用场景

- **远程开发**：在平板或手机上继续编码
- **团队协作**：共享 Claude Code 会话
- **多设备切换**：无缝切换不同设备工作

## 相关链接

- [GitHub 仓库](${GH}/remote-cc)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
