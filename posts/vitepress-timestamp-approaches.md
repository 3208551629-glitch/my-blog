---
title: VitePress 首页时间戳显示方案对比
date: 2026-06-13
tags:
  - VitePress
  - Vue
  - 前端
  - SSR
category: 技术
---

# VitePress 首页时间戳显示方案对比

想在 VitePress 首页显示「最近更新时间」，看起来是个小功能，实现方案却有好几种。每种方案在开发体验、可靠性、准确性上各有取舍。

## 方案一：Git lastUpdated（默认方案）

VitePress 内置了 `lastUpdated` 配置，可以显示每个页面的最后 Git 提交时间：

```ts
// .vitepress/config.ts
export default defineConfig({
  lastUpdated: true,
  themeConfig: {
    lastUpdated: { text: '最后更新于' }
  }
})
```

通过 `useData()` 在组件中获取：

```ts
const { page } = useData()
const timestamp = page.value.lastUpdated // Unix 毫秒时间戳
```

**优点**：
- 零配置，VitePress 原生支持
- 精确到文件级别的修改时间

**缺点**：
- 依赖 Git 历史
- 部署环境无 Git 时无法获取（如 Vercel 浅克隆）
- 首页 `index.md` 不常提交时时间可能滞后

## 方案二：Vite define 注入构建时间

利用 Vite 的 `define` 功能，在构建时注入时间戳：

```ts
// .vitepress/config.ts
export default defineConfig({
  vite: {
    define: {
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    }
  }
})
```

在组件中直接使用：

```ts
declare const __BUILD_TIME__: string
const buildTime = __BUILD_TIME__
```

**优点**：
- 构建即确定，不受部署环境影响
- 无需额外脚本

**缺点**：
- 需要处理 TypeScript 类型声明
- Vue SFC 中 `declare const` 可能与 Vite 的 define 替换时序冲突
- 每次构建都会更新，无法反映真实内容更新时间

## 方案三：构建脚本生成时间文件

通过独立的 Node.js 脚本在构建前生成时间戳文件：

```js
// scripts/generate-timestamp.mjs
import { writeFileSync } from 'fs'
const now = new Date().toISOString()
writeFileSync('public/timestamp.json', JSON.stringify({ buildTime: now }))
```

```json
// package.json
{
  "scripts": {
    "build": "node scripts/generate-timestamp.mjs && vitepress build"
  }
}
```

**优点**：
- 类型安全，没有 TypeScript hack
- 文件可被静态引用

**缺点**：
- 需要额外维护生成脚本
- dev 模式下需要额外处理

## 方案四：new Date() 直接渲染（最终选择）

最简单的方案，在组件中直接使用 `new Date()`：

```vue
<script setup lang="ts">
const d = new Date()
const displayTime = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-...`
</script>

<template>
  <time>{{ displayTime }}</time>
</template>
```

**原理**：VitePress 构建时执行 SSR，`new Date()` 在服务端执行，结果序列化到 HTML 中。因此生产环境是构建时间，开发环境是请求时间。

**优点**：
- 代码最短，零依赖
- SSR 兼容，无 TypeScript 问题
- 开发模式实时更新

**缺点**：
- 精度受限于构建时间（对静态博客来说可以接受）
- 无法感知未触发构建的内容更新

## 方案对比总结

| 方案 | 代码量 | 可靠性 | 类型安全 | 实时性 |
|------|--------|-------|---------|-------|
| Git lastUpdated | 少 | 中 | 高 | 依赖提交 |
| Vite define | 中 | 高 | 中 | 构建时 |
| 构建脚本 | 多 | 高 | 高 | 构建时 |
| new Date() | 极少 | 高 | 高 | 构建时 |

## 最终选择

本博客最终采用了方案四（`new Date()`）。原因：

1. 个人博客对时间精度要求不高，构建时间足够
2. 无需额外配置和脚本，维护成本零
3. SSR 天然兼容，没有坑

如果你的项目对时间精度要求高（如文档站需要显示最后编辑时间），推荐方案一（Git lastUpdated）+ 方案二（Vite define）的组合：优先使用 Git 时间，Git 不可用时回退到构建时间。
