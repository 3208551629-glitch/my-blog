---
layout: page
title: chazhao
description: 查找工具 — RAG 知识助手
projectName: chazhao
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

查找工具 — RAG 知识助手，上传文档后用 AI 回答问题。

## 功能特性

- 文档上传和解析
- 向量数据库存储
- 语义搜索
- AI 问答
- FastAPI + Vue3 全栈

## 技术栈

- **FastAPI**
- **Vue 3**
- **ChromaDB**
- **LlamaIndex**
- **OpenAI**

## 项目状态

- **状态**: 稳定维护中
- **分类**: SaaS/Web


## 快速开始

### 安装

```bash
pip install -r requirements.txt && npm install
```

### 运行

```bash
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
```

## 相关链接

- [GitHub 仓库](${GH}/chazhao)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
