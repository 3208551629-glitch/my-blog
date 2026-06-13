---
title: devkit
description: 开发工具包 — 变更日志、README 生成、徽章生成、代码质量分析、CI/CD 流水线、Schema 管理
projectName: devkit
---

<script setup>
import ProjectDetail from '../.vitepress/theme/components/ProjectDetail.vue'
</script>

<ProjectDetail />

## 项目简介

devkit 是一个全面的开发工具集，自动化处理开发过程中的重复性文档工作。

从变更日志生成到 README 自动编写，从徽章生成到代码质量分析，devkit 让开发者专注于编码。

## 功能特性

- **自动生成变更日志**：从 Git 提交历史生成结构化 CHANGELOG
- **README 自动生成**：根据项目结构生成专业的 README
- **GitHub 徽章生成**：自动配置 CI 状态、版本、许可证等徽章
- **代码质量分析**：统计代码行数、复杂度等指标
- **CI/CD 流水线配置**：生成常用 CI/CD 配置模板
- **Schema 管理**：JSON Schema 验证和 TypeScript 类型生成

## 技术栈

- **TypeScript**
- **Node.js**
- **Commander.js**

## 项目状态

- **状态**: 稳定维护中
- **分类**: 工具包


## 快速开始

### 安装

```bash
npm install -g @toolkits/devkit
```

### 运行

```bash
cd packages/devkit && pnpm build && pnpm test
```

## 使用示例

```bash
# 自动生成 CHANGELOG
devkit changelog --since v1.0.0 --output CHANGELOG.md

# 生成 README
devkit readme --template standard --output README.md

# 代码质量分析
devkit quality --complexity --lines --output stats.json
```

## 适用场景

- **开源项目**：自动生成专业的项目文档
- **团队协作**：统一代码质量标准和文档规范
- **项目初始化**：快速搭建项目基础设施

## 相关链接

- [GitHub 仓库](${GH}/toolkits)


<div class="back-to-projects">
  <a href="/my-blog/projects/">← 返回项目集</a>
</div>
