---
title: chazhao
description: 查找工具 — RAG 知识助手
projectName: chazhao
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

Chazhao（查找）是一个 RAG（检索增强生成）知识助手，支持上传文档后用 AI 回答问题。

基于 FastAPI 后端和 Vue3 前端构建，利用 LlamaIndex 和 ChromaDB 实现高效的文档检索和问答。

## 功能特性

- **文档上传和解析**：支持 PDF、Word、TXT 等多种格式
- **向量数据库存储**：ChromaDB 存储文档向量
- **语义搜索**：基于向量相似度的智能搜索
- **AI 问答**：结合检索结果生成准确回答
- **FastAPI + Vue3 全栈**：高性能后端和现代化前端

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

## 使用示例

启动后端服务：

```bash
uvicorn app.main:app --reload
```

启动前端界面：

```bash
npm run dev
```

## 适用场景

- **企业知识库**：构建公司内部知识问答系统
- **文档助手**：快速查询技术文档和产品手册
- **客服系统**：自动化回答常见问题

## 相关链接

- [GitHub 仓库](${GH}/chazhao)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
