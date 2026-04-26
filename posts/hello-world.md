---
title: 欢迎来到我的博客
date: 2026-04-18
tags:
  - 博客
  - VitePress
  - Vue3
category: 随笔
pinned: true
---

# 欢迎来到我的博客

这是我的第一篇博客文章。这个博客使用 **VitePress** 构建，基于 **Vue 3** 框架。

## 为什么选择 VitePress？

VitePress 是一个基于 Vite 的静态站点生成器，非常适合用来搭建技术博客：

- **极快的构建速度** - 基于 Vite，开发体验极佳
- **Vue 3 支持** - 可以在 Markdown 中使用 Vue 组件
- **开箱即用** - 内置搜索、主题切换等功能
- **纯静态部署** - 无需服务器，可部署到 GitHub Pages

## 代码高亮示例

```javascript
// Vue 3 Composition API 示例
import { ref, computed } from 'vue'

export function useCounter() {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubled, increment }
}
```

```typescript
// TypeScript 接口定义
interface Post {
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}
```

## 数学公式支持

VitePress 支持 LaTeX 数学公式：

行内公式：$E = mc^2$

块级公式：

$$
\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

## 接下来

我会在这里分享：

- 📝 技术学习笔记
- 💡 项目实战经验
- 🎯 个人成长思考

敬请期待！
