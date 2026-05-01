---
title: React Hooks 入门指南
date: 2026-04-25
tags:
  - React
  - JavaScript
  - 前端
category: 技术
---

# React Hooks 入门指南

React 16.8 引入了 Hooks，让你在不编写 class 的情况下使用 state 和其他 React 特性。

## 为什么需要 Hooks？

在 Hooks 出现之前，React 组件有两种形式：

- **函数组件** - 简单但功能受限，无法使用 state
- **类组件** - 功能完整但代码冗长，this 指向容易出错

Hooks 让函数组件拥有了类组件的能力，同时保持简洁。

## 常用 Hooks

### useState

用于在函数组件中添加状态：

```javascript
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

### useEffect

用于处理副作用，如数据获取、订阅、DOM 操作：

```javascript
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 数据获取
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))

    // 清理函数（可选）
    return () => {
      console.log('组件卸载或 userId 变化')
    }
  }, [userId]) // 依赖数组

  if (!user) return <div>Loading...</div>

  return <div>{user.name}</div>
}
```

### useContext

用于跨组件共享数据，避免 prop drilling：

```javascript
import { createContext, useContext } from 'react'

const ThemeContext = createContext('light')

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar() {
  const theme = useContext(ThemeContext)
  return <div>Current theme: {theme}</div>
}
```

### useRef

用于获取 DOM 引用或保存可变值：

```javascript
import { useRef, useEffect } from 'react'

function TextInput() {
  const inputRef = useRef(null)

  useEffect(() => {
    // 自动聚焦
    inputRef.current.focus()
  }, [])

  return <input ref={inputRef} type="text" />
}
```

### useMemo 和 useCallback

用于性能优化，避免不必要的重新计算或函数重建：

```javascript
import { useState, useMemo, useCallback } from 'react'

function ExpensiveComponent({ items, onItemClick }) {
  // 缓存计算结果
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name))
  }, [items])

  // 缓存回调函数
  const handleClick = useCallback((id) => {
    onItemClick(id)
  }, [onItemClick])

  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  )
}
```

## 自定义 Hook

将可复用逻辑提取为自定义 Hook：

```javascript
// useLocalStorage.js
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// 使用示例
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  )
}
```

## Hooks 规则

1. **只在最顶层调用 Hooks** - 不要在循环、条件或嵌套函数中调用
2. **只在 React 函数中调用 Hooks** - 不要在普通 JavaScript 函数中调用

## 总结

React Hooks 的优势：

- 代码更简洁，无需 class
- 逻辑复用更方便
- 相关代码可以放在一起
- 更容易进行单元测试
