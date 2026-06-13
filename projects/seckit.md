---
title: seckit
description: 安全与配置工具包 — 依赖审计、配置检查、环境变量管理、许可证合规、端口扫描
projectName: seckit
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

seckit 是一个全面的安全与配置审计工具集，帮助开发者在项目早期发现和修复安全隐患。

从依赖包漏洞扫描到配置文件安全检查，从环境变量管理到许可证合规，seckit 提供了全方位的安全保障。

## 功能特性

- **依赖安全审计**：扫描依赖包已知漏洞，集成 OSV 数据库
- **配置检查**：验证配置文件安全性，检测潜在风险
- **环境变量管理**：安全管理和检测 .env 文件，防止敏感信息泄露
- **许可证合规检查**：自动识别依赖包的许可证，确保合规性
- **端口扫描**：快速检测开放端口，发现潜在安全风险

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

## 使用示例

```bash
# 扫描依赖包漏洞
seckit audit --osv --output report.json

# 检查 .env 文件安全性
seckit envcheck .env --warn-leaked

# 许可证合规检查
seckit license --allow MIT,Apache-2.0
```

## 适用场景

- **安全审计**：定期扫描项目依赖，及时修复漏洞
- **合规检查**：确保开源依赖许可证符合公司政策
- **部署前检查**：验证生产环境配置安全性

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
