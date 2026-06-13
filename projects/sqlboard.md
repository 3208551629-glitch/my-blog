---
title: sqlboard
description: SQL 工作台 — 数据库管理 Web 界面
projectName: sqlboard
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

SQLBoard 是一个 SQL 工作台，提供数据库管理的 Web 界面，支持 SQLite、PostgreSQL、MySQL 等多种数据库。

无需安装复杂的数据库客户端，通过浏览器即可完成数据库管理和查询操作。

## 功能特性

- **多数据库支持**：SQLite、PostgreSQL、MySQL
- **Web 界面查询执行**：浏览器中执行 SQL 查询
- **数据导入导出**：支持 CSV、JSON 等格式
- **连接管理**：保存和管理多个数据库连接
- **REST API 接口**：程序化访问数据库

## 技术栈

- **TypeScript**
- **Express**
- **better-sqlite3**
- **MySQL2**
- **PostgreSQL**

## 项目状态

- **状态**: 稳定维护中
- **分类**: 开发工具


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

```bash
# 启动 SQL 工作台
npm run dev

# 连接 SQLite 数据库
# 在 Web 界面中添加连接：sqlite:///path/to/database.db

# 连接 PostgreSQL 数据库
# 在 Web 界面中添加连接：postgresql://user:pass@localhost:5432/mydb
```

## 适用场景

- **开发调试**：快速查询和修改开发数据库
- **数据分析**：执行复杂 SQL 查询并导出结果
- **数据库管理**：轻量级数据库管理工具

## 相关链接

- [GitHub 仓库](${GH}/sqlboard)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
