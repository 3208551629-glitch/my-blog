---
title: TypeScript 类型体操入门
date: 2026-04-12
tags:
  - TypeScript
  - 前端
category: 技术
---

# TypeScript 类型体操入门

TypeScript 的类型系统非常强大，可以进行复杂的类型推导和转换。本文介绍一些常见的类型体操技巧。

## 基础工具类型

### Partial

将所有属性变为可选：

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}

interface User {
  id: number
  name: string
  email: string
}

type PartialUser = Partial<User>
// { id?: number; name?: string; email?: string }
```

### Pick

选取指定属性：

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type UserPreview = Pick<User, 'id' | 'name'>
// { id: number; name: string }
```

### Omit

排除指定属性：

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type UserWithoutEmail = Omit<User, 'email'>
// { id: number; name: string }
```

## 进阶技巧

### 条件类型

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
```

### 模板字面量类型

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<'click'>   // 'onClick'
type FocusEvent = EventName<'focus'>   // 'onFocus'
```

### 递归类型

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object 
    ? DeepPartial<T[P]> 
    : T[P]
}

interface Config {
  database: {
    host: string
    port: number
  }
  cache: {
    enabled: boolean
  }
}

type PartialConfig = DeepPartial<Config>
```

## 实战案例

### 实现 ReturnType

```typescript
type MyReturnType<T extends (...args: any) => any> = 
  T extends (...args: any) => infer R ? R : never

function getUser() {
  return { id: 1, name: 'Alice' }
}

type User = MyReturnType<typeof getUser>
// { id: number; name: string }
```

### 实现 Parameters

```typescript
type MyParameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never

function greet(name: string, age: number) {
  return `Hello, ${name}!`
}

type GreetParams = MyParameters<typeof greet>
// [string, number]
```

## 总结

类型体操虽然有一定学习曲线，但掌握后能大大提升代码的类型安全性。建议从简单的工具类型开始，逐步挑战更复杂的场景。
