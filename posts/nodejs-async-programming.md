---
title: Node.js 异步编程详解
date: 2026-04-24
tags:
  - Node.js
  - JavaScript
  - 后端
category: 技术
---

# Node.js 异步编程详解

Node.js 的核心特性是异步非阻塞 I/O，理解异步编程模式对于 Node.js 开发至关重要。

## 异步编程的演进

### 1. 回调函数（Callback）

最原始的异步处理方式，容易造成"回调地狱"：

```javascript
// 回调地狱示例
getUser(userId, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0].id, (details) => {
      processPayment(details, (result) => {
        console.log('Payment processed:', result)
      })
    })
  })
})
```

### 2. Promise

ES6 引入的异步解决方案，支持链式调用：

```javascript
// Promise 链式调用
getUser(userId)
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => processPayment(details))
  .then(result => console.log('Payment processed:', result))
  .catch(error => console.error('Error:', error))
```

创建 Promise：

```javascript
function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
```

### 3. async/await

ES2017 引入的语法糖，让异步代码看起来像同步代码：

```javascript
async function processOrder(userId) {
  try {
    const user = await getUser(userId)
    const orders = await getOrders(user.id)
    const details = await getOrderDetails(orders[0].id)
    const result = await processPayment(details)
    console.log('Payment processed:', result)
    return result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
```

## 并行执行

### Promise.all

并行执行多个 Promise，全部成功才返回：

```javascript
async function fetchAllData() {
  const [users, products, orders] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/products').then(r => r.json()),
    fetch('/api/orders').then(r => r.json())
  ])

  return { users, products, orders }
}
```

### Promise.allSettled

并行执行，无论成功失败都返回结果：

```javascript
const results = await Promise.allSettled([
  fetch('/api/endpoint1'),
  fetch('/api/endpoint2'),
  fetch('/api/endpoint3')
])

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`Request ${index} succeeded:`, result.value)
  } else {
    console.log(`Request ${index} failed:`, result.reason)
  }
})
```

### Promise.race

返回最先完成的结果：

```javascript
// 超时控制
async function fetchWithTimeout(url, timeout = 5000) {
  const response = await Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ])
  return response
}
```

## 错误处理

### try/catch

```javascript
async function handleRequest(req, res) {
  try {
    const data = await processData(req.body)
    res.json({ success: true, data })
  } catch (error) {
    console.error('Request failed:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}
```

### 错误优先回调

Node.js 传统风格的错误处理：

```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Read error:', err)
    return
  }
  console.log('File content:', data)
})
```

## 事件循环

理解 Node.js 事件循环对于编写高效异步代码很重要：

```
   ┌───────────────────────────┐
   │        timers             │  setTimeout, setInterval
   └─────────────┬─────────────┘
   ┌─────────────┴─────────────┐
   │     pending callbacks     │  I/O 回调
   └─────────────┬─────────────┘
   ┌─────────────┴─────────────┐
   │       idle, prepare       │  内部使用
   └─────────────┬─────────────┘
   ┌─────────────┴─────────────┐
   │           poll            │  轮询阶段
   └─────────────┬─────────────┘
   ┌─────────────┴─────────────┐
   │           check           │  setImmediate
   └─────────────┬─────────────┘
   ┌─────────────┴─────────────┐
   │       close callbacks     │  close 事件
   └───────────────────────────┘
```

## 最佳实践

1. **优先使用 async/await** - 代码更易读
2. **正确处理错误** - 不要忽略 catch
3. **合理使用并行** - 无依赖的操作并行执行
4. **避免阻塞事件循环** - CPU 密集任务使用 worker_threads

## 总结

Node.js 异步编程的核心要点：

- 回调 → Promise → async/await 的演进
- 理解事件循环机制
- 正确处理异步错误
- 合理使用并行执行
