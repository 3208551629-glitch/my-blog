---
title: VitePress 博客自定义 Layout 实战
date: 2026-06-13
tags:
  - VitePress
  - Vue
  - 博客
  - 前端
category: 项目实战
---

# VitePress 博客自定义 Layout 实战

VitePress 默认主题功能完善，但个性化需求往往需要深入到 Layout 定制层面。本文记录为本博客添加首页「最近更新时间」和「返回顶部」功能时遇到的坑与解决方案。

## 需求分析

想在首页底部添加两个功能：

1. **最近更新时间** — 显示站点最后更新时间，自动更新
2. **返回顶部按钮** — 长页面快速回到顶部

看起来很简单，但涉及 VitePress 的自定义 Layout 机制。

## 第一步：创建 Layout.vue

VitePress 允许在 `.vitepress/theme/` 下放置 `Layout.vue` 来覆盖默认布局。通过包裹默认主题的 Layout 组件，可以注入自定义插槽内容：

```vue
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import BackToTop from './components/BackToTop.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-features-after>
      <HomeUpdateInfo />
    </template>

    <template #layout-bottom>
      <BackToTop />
    </template>
  </Layout>
</template>
```

这种方式的好处：不改动 VitePress 核心组件，通过插槽扩展功能。

## 第二步：坑 — Layout.vue 没生效

文件建好了，`dev` 和 `build` 都没有报错，但页面上什么都没有。

排查发现：**`Layout.vue` 文件存在不代表 VitePress 会用它**。关键在 `.vitepress/theme/index.ts`：

```ts
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,  // 这行把 Layout 一起覆盖了！
  enhanceApp({ app }) {
    // ...
  }
}
```

`...DefaultTheme` 展开后包含 `Layout` 属性指向默认布局，你的自定义 `Layout.vue` 根本不会被加载。解决方案：显式覆盖 `Layout`：

```ts
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'  // 导入自定义 Layout

export default {
  ...DefaultTheme,
  Layout,  // 覆盖默认 Layout
  enhanceApp({ app }) {
    // ...
  }
}
```

JavaScript 对象展开时，相同 key 的后面覆盖前面。`Layout` 放在 `...DefaultTheme` 之后，就能正确覆盖。

## 第三步：插槽选择

VitePress 首页（`layout: home`）提供多个插槽：

| 插槽名 | 位置 |
|-------|------|
| `#home-hero-before` | Hero 区之前 |
| `#home-hero-after` | Hero 区之后 |
| `#home-features-before` | Features 之前 |
| `#home-features-after` | Features 之后 |

「最近更新时间」放在 Features 之后是最自然的位置。

## 第四步：组件的 SSR 兼容

VitePress 在构建时执行服务端渲染（SSR），组件需要兼容 SSR 环境。简单组件直接使用 `new Date()` 获取构建时间，在 SSR 阶段会被序列化到 HTML 中：

```vue
<script setup lang="ts">
const d = new Date()
const displayTime = `${d.getFullYear()}-${...}`
</script>
```

> 注意：开发模式下 `new Date()` 是每次请求的时间，生产构建后则是构建时的时间戳。

## 总结

自定义 VitePress Layout 的核心要点：

1. 创建 `Layout.vue` 并确保 `index.ts` 导出了你的 Layout
2. 使用插槽（而非组件覆盖）来扩展功能
3. 注意 SSR 兼容性，避免使用 `window`、`document` 等浏览器 API
4. 复杂需求可以考虑通过 Vite 插件注入常量
