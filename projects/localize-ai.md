---
title: localize-ai
description: AI 本地化翻译工具
projectName: localize-ai
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

Localize AI 是一个 AI 驱动的本地化翻译工具，能够自动翻译各种格式的翻译文件。

支持 JSON、YAML、PO 等多种格式，利用 AI 的上下文理解能力，提供比传统机器翻译更准确的翻译结果。

## 功能特性

- **多格式支持**：JSON、YAML、PO、XML 等翻译文件格式
- **AI 上下文感知翻译**：利用 AI 理解上下文，提供更准确的翻译
- **批量翻译处理**：支持大规模文件批量翻译
- **翻译质量评估**：自动评估翻译质量并标记可疑项
- **支持多种目标语言**：覆盖主流编程语言支持的语言

## 技术栈

- **Next.js**
- **React 19**
- **TypeScript**
- **OpenAI API**

## 项目状态

- **状态**: 活跃开发中 ⭐
- **分类**: AI/Agent


## 快速开始

### 安装

```bash
npm install
```

### 运行

```bash
npm install && npm run dev
```

## 使用示例

上传翻译文件，AI 自动翻译为目标语言：

```bash
# 启动服务
npm run dev

# 在界面中操作：
# 1. 上传源语言翻译文件（JSON/YAML/PO）
# 2. 选择目标语言
# 3. AI 生成翻译结果
# 4. 评估翻译质量并导出
```

## 适用场景

- **国际化项目**：快速翻译应用界面文本
- **文档翻译**：翻译技术文档和 API 文档
- **多语言产品**：为产品添加多语言支持

## 相关链接

- [GitHub 仓库](${GH}/localize-ai)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
