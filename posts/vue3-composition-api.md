---
title: Vue 3 组合式 API 入门
date: 2026-04-15
tags:
  - Vue3
  - JavaScript
  - 前端
category: 技术
---

# Vue 3 组合式 API 入门

Vue 3 引入了组合式 API（Composition API），提供了一种更灵活的方式来组织组件逻辑。

## 基本概念

组合式 API 的核心思想是将相关的逻辑放在一起，而不是分散在不同的选项中。

### ref 和 reactive

```javascript
import { ref, reactive } from 'vue'

// ref 用于基本类型
const count = ref(0)
console.log(count.value) // 0

// reactive 用于对象
const state = reactive({
  name: 'Vue',
  version: 3
})
```

### computed 和 watch

```javascript
import { ref, computed, watch } from 'vue'

const count = ref(0)

// 计算属性
const doubled = computed(() => count.value * 2)

// 监听器
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`)
})
```

## 组合式函数

将可复用的逻辑提取为组合式函数：

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubled = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  return {
    count,
    doubled,
    increment,
    decrement,
    reset
  }
}
```

## 使用示例

```vue
<script setup>
import { useCounter } from './useCounter'

const { count, doubled, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

## 总结

组合式 API 的优势：

1. **更好的逻辑复用** - 组合式函数可以在多个组件中复用
2. **更灵活的代码组织** - 相关逻辑可以放在一起
3. **更好的 TypeScript 支持** - 类型推断更准确
4. **更小的打包体积** - Tree-shaking 更有效
