---
title: 前端性能优化实战
date: 2026-04-01
tags:
  - 性能优化
  - 前端
category: 技术
---

# 前端性能优化实战

性能优化是前端开发的重要课题，本文从多个维度介绍优化策略。

## 加载性能

### 资源压缩

```javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}
```

### 代码分割

```javascript
// 动态导入
const Dashboard = () => import('./Dashboard.vue')

// 路由懒加载
const routes = [
  {
    path: '/admin',
    component: () => import('./Admin.vue')
  }
]
```

### 图片优化

```html
<!-- 使用 WebP 格式 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="描述">
</picture>

<!-- 懒加载 -->
<img src="image.jpg" loading="lazy" alt="描述">
```

## 渲染性能

### 虚拟列表

```vue
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: Array,
  itemHeight: Number,
  visibleCount: Number
})

const scrollTop = ref(0)
const startIndex = computed(() => 
  Math.floor(scrollTop.value / props.itemHeight)
)
const visibleItems = computed(() => 
  props.items.slice(startIndex.value, startIndex.value + props.visibleCount)
)
</script>
```

### 防抖节流

```javascript
// 防抖
function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// 节流
function throttle(fn, delay) {
  let last = 0
  return function(...args) {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn.apply(this, args)
    }
  }
}
```

## 缓存策略

### HTTP 缓存

```
# 静态资源
Cache-Control: max-age=31536000, immutable

# HTML
Cache-Control: no-cache
ETag: "abc123"
```

### Service Worker

```javascript
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

// sw.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  )
})
```

## 监控指标

### Core Web Vitals

| 指标 | 含义 | 目标值 |
|------|------|--------|
| LCP | 最大内容绘制 | < 2.5s |
| INP | 交互延迟 | < 200ms |
| CLS | 布局偏移 | < 0.1 |

### 性能 API

```javascript
// 测量页面加载性能
const timing = performance.timing
const loadTime = timing.loadEventEnd - timing.navigationStart

// 测量特定操作
performance.mark('start')
// ... 操作
performance.mark('end')
performance.measure('操作耗时', 'start', 'end')
```

## 总结

性能优化是一个持续的过程，需要从加载、渲染、缓存等多个方面综合考虑。
