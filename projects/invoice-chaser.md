---
title: invoice-chaser
description: 发票追踪工具
projectName: invoice-chaser
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

Invoice Chaser 是一个发票追踪工具，利用 AI 自动生成催款邮件并定时发送。

基于 FastAPI 后端和 Vue3 前端构建，帮助企业自动化应收账款管理。

## 功能特性

- **AI 自动生成催款邮件**：根据发票信息生成专业催款邮件
- **定时发送任务**：支持自定义发送时间和频率
- **发票状态追踪**：实时追踪发票付款状态
- **邮件模板管理**：自定义和管理催款邮件模板
- **FastAPI + Vue3 全栈**：高性能和现代化技术栈

## 技术栈

- **FastAPI**
- **Vue 3**
- **DeepSeek API**
- **Celery**

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
npm install && npm run dev
```

## 使用示例

启动应用后，在 Web 界面中添加发票信息，AI 会自动生成催款邮件：

```bash
# 启动后端（含 Celery 定时任务）
uvicorn app.main:app --reload & celery -A app.celery worker

# 启动前端
npm run dev
```

## 适用场景

- **应收账款管理**：自动化催款流程
- **财务团队**：减轻财务人员催款工作量
- **小型企业**：低成本自动化财务管理

## 相关链接

- [GitHub 仓库](${GH}/invoice-chaser)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
