---
title: VitePress 项目集页面搭建指南
date: 2026-06-13
tags:
  - VitePress
  - Vue
  - 博客
  - 开源
category: 项目实战
---

# VitePress 项目集页面搭建指南

个人博客展示开源项目是一个常见需求。本文记录如何为本博客搭建一个带搜索、精选标记、卡片展示的项目集页面。

## 整体架构

项目集页面由三部分组成：

1. **数据层** (`projects.ts`) — 定义项目类型、维护项目列表
2. **展示层** (`ProjectCard.vue`) — 单个项目卡片
3. **过滤层** (`ProjectFilter.vue`) — 搜索与筛选

## 数据类型设计

```ts
interface Project {
  name: string        // 项目名
  description: string // 简短描述
  url: string         // 项目链接
  repo: string        // 仓库地址
  tags: string[]      // 标签
  featured: boolean   // 是否精选
}
```

`featured` 字段是关键——只有真正有价值的核心项目才标记为精选，在页面中通过 ⭐ 徽标突出显示。

## 卡片组件实现

项目卡片使用 Vue 单文件组件，支持图片展示、标签列表、Repo 和链接跳转：

```vue
<template>
  <article class="project-card">
    <div class="card-header">
      <h3>{{ project.name }}</h3>
      <span v-if="project.featured" class="featured-badge">⭐ 精选</span>
    </div>
    <p class="card-desc">{{ project.description }}</p>
    <div class="card-tags">
      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    <div class="card-links">
      <a :href="project.url" target="_blank">🔗 链接</a>
      <a v-if="project.repo" :href="project.repo" target="_blank">📦 源码</a>
    </div>
  </article>
</template>
```

## 搜索功能

通过在页面中维护一个响应式的搜索关键字，使用 `computed` 过滤项目列表：

```ts
const searchQuery = ref('')

const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects
  const q = searchQuery.value.toLowerCase()
  return projects.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  )
})
```

搜索同时匹配名称、描述和标签，覆盖大多数查找需求。

## VitePress 中渲染 Markdown 的坑

项目集页面是 `posts/index.md` 类型的 Markdown 文件，但内容是通过 Vue 组件动态渲染的。遇到一个经典问题：

**问题**：Markdown 中 4 空格缩进会被解析为代码块。

**表现**：页面上出现一个带代码样式的白块，打断布局。

**原因**：VitePress 的 markdown 解析器将 4 空格缩进视为代码块。如果 Vue 组件的嵌套层级导致模板缩进超过 4 空格，解析就会出错。

**解决**：将组件和样式逻辑分离到 `.vitepress/theme/` 下的 Vue 文件和 `index.css` 中，Markdown 文件只保留最外层的布局骨架。

## 项目数据维护

实际项目中遇到另一个问题：初期列出了 83 个假项目，链接都指向不存在的 GitHub 仓库。最终决定只保留真实存在的项目：

```
- everything-claude-code  ✓
- landing-ai              (无远程仓库)
- mcp-hub                 (无远程仓库)
- saas-boilerplate        (无远程仓库)
- api-sentinel            ✓
- codesnap                ✓
- PromptForge             ✓
- claude-code-dashboard   ✓
- daka                    ✓
```

无远程仓库的 GitHub 链接显示为不可点，提示用户后续补充。

## 总结

VitePress 搭建项目集页面并不复杂，关键是理清数据、组件、样式三层关系，并注意 Markdown 渲染的特殊规则。完整代码可在本博客仓库中查看。
