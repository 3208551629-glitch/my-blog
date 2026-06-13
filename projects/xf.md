---
title: xf
description: 数据与文件工具箱 — 27 个子命令：文件操作、哈希计算、JSON/YAML/XML/TOML/CSV 格式处理、Base64/颜色/正则/URL 等工具
projectName: xf
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

xf 是一个功能强大的数据与文件处理工具箱，采用 TypeScript 开发，基于 Node.js 运行时。作为 toolkits monorepo 的核心包之一，它提供了 27+ 个子命令，覆盖文件操作、数据格式转换、编码解码、颜色处理等常见开发场景。

无论是日常开发中的 JSON 格式化、YAML 转换，还是文件哈希计算、Base64 编码，xf 都能一站式解决。每个子命令都经过精心设计，遵循 Unix 哲学，可以与其他工具链无缝协作。

## 功能特性

- **文件操作**：比较、差异、树形展示、统计、搜索、压缩、加密、去重、重命名、同步、监控
- **数据格式处理**：JSON、YAML、XML、TOML、CSV 格式转换与验证，支持美化输出和差异对比
- **编码工具**：Base64、URL、颜色格式转换，支持多种颜色空间（RGB、HSL、HEX）
- **哈希计算**：支持 MD5、SHA1、SHA256、SHA512 等多种算法，支持文件和文本哈希
- **正则测试**：内置正则表达式测试工具，支持多种模式和标志
- **Shell 工具**：命令行增强工具，提升终端工作效率
- **时间转换**：时间戳、日期格式转换，支持多种时区

## 技术栈

- **TypeScript**
- **Node.js**
- **Commander.js**
- **tsup**
- **Vitest**
- **pnpm workspaces**

## 项目状态

- **状态**: 活跃开发中 ⭐
- **分类**: 工具包
- **精选项目**: ⭐

## 快速开始

### 安装

```bash
npm install -g @toolkits/xf
```

### 运行

```bash
cd packages/xf && pnpm build && pnpm test
```

## 使用示例

xf `<command>` [options]

# 示例
xf jsonformat data.json --pretty
xf hashtool file.txt --algorithm sha256
xf colorconvert #FF5733 --to hsl

## 适用场景

- **数据迁移**：将遗留系统的 JSON 数据转换为 YAML 格式，或反之
- **文件校验**：在 CI/CD 流程中计算构建产物的哈希值，确保文件完整性
- **开发调试**：快速格式化混乱的 JSON 响应，对比两个配置文件差异

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
