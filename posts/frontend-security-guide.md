---
title: 前端安全防护指南
date: 2026-04-21
tags:
  - 安全
  - 前端
  - Web
category: 技术
---

# 前端安全防护指南

前端安全是 Web 开发中不可忽视的重要环节，了解常见攻击方式和防护措施能有效保护用户数据。

## 常见安全威胁

### 1. XSS（跨站脚本攻击）

攻击者注入恶意脚本到网页中执行。

**攻击类型：**

- **存储型 XSS** - 恶意脚本存储在服务器，如评论、文章内容
- **反射型 XSS** - 恶意脚本在 URL 参数中，服务器反射回来
- **DOM 型 XSS** - 前端 JavaScript 直接操作 DOM 时注入

**防护措施：**

```javascript
// 1. 对用户输入进行转义
function escapeHtml(str) {
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  }
  return str.replace(/[&<>"']/g, char => escapeMap[char])
}

// 2. 使用 Content Security Policy (CSP)
// HTTP Header:
// Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-xxx'

// 3. 避免使用 innerHTML，使用 textContent
element.textContent = userInput  // 安全
element.innerHTML = userInput    // 危险！

// 4. 使用框架自带的转义（Vue、React 自动转义）
// Vue
<div>{{ userInput }}</div>  // 自动转义
<div v-html="userInput"></div>  // 危险！需要信任内容

// React
<div>{userInput}</div>  // 自动转义
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // 危险！
```

### 2. CSRF（跨站请求伪造）

攻击者诱导用户在已登录的网站上执行非预期操作。

**防护措施：**

```javascript
// 1. 使用 CSRF Token
// 服务器生成 token，前端提交时携带
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="{{ csrfToken }}">
  ...
</form>

// 2. 验证 Referer/Origin Header
// 服务器检查请求来源

// 3. SameSite Cookie
// Set-Cookie: sessionId=xxx; SameSite=Strict

// 4. 双重 Cookie 验证
// 将 token 同时放在 Cookie 和请求参数中
fetch('/api/action', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': getCsrfTokenFromCookie()
  }
})
```

### 3. 点击劫持（Clickjacking）

攻击者将目标网站嵌入 iframe，诱导用户点击。

**防护措施：**

```javascript
// 1. X-Frame-Options Header
// X-Frame-Options: DENY
// X-Frame-Options: SAMEORIGIN

// 2. Content Security Policy
// Content-Security-Policy: frame-ancestors 'self'

// 3. JavaScript 检测（不推荐作为主要防护）
if (window.top !== window.self) {
  window.top.location = window.self.location
}
```

### 4. 敏感数据泄露

**防护措施：**

```javascript
// 1. 不要在前端存储敏感信息
// 不好的做法
localStorage.setItem('token', 'sensitive-token')
sessionStorage.setItem('password', 'user-password')

// 好的做法 - 使用 HttpOnly Cookie
// Set-Cookie: token=xxx; HttpOnly; Secure; SameSite=Strict

// 2. 不要在 URL 中传递敏感信息
// 不好的做法
window.location.href = '/reset-password?token=secret-token'

// 3. 清除敏感数据
// 用户登出时清除所有认证信息
function logout() {
  localStorage.removeItem('token')
  sessionStorage.clear()
  // 调用服务器端清除 session
}

// 4. 避免在注释、错误信息中泄露信息
// 不好的做法
// TODO: 使用 admin/password123 测试
console.log('Database connection string:', dbString)
```

### 5. 第三方脚本风险

**防护措施：**

```javascript
// 1. 使用 Subresource Integrity (SRI)
<script
  src="https://cdn.example.com/library.js"
  integrity="sha384-abc123..."
  crossorigin="anonymous"
></script>

// 2. 限制第三方脚本权限
// 使用 CSP 限制脚本来源

// 3. 定期审计第三方依赖
npm audit
```

## 安全 Headers 配置

```javascript
// Express.js 示例
const helmet = require('helmet')

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'nonce-xxx'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}))
```

## 安全检查清单

- [ ] 所有用户输入都经过验证和转义
- [ ] 使用 HTTPS
- [ ] 配置 CSP Header
- [ ] 配置 HttpOnly、Secure、SameSite Cookie
- [ ] 不在前端存储敏感信息
- [ ] 使用 SRI 加载第三方脚本
- [ ] 定期更新依赖，修复漏洞
- [ ] 实施适当的认证和授权
- [ ] 错误信息不泄露敏感信息

## 总结

前端安全的核心要点：

- 理解常见攻击方式（XSS、CSRF、点击劫持等）
- 对所有用户输入保持警惕
- 正确配置安全 Headers
- 不在前端存储敏感信息
- 定期审计和更新依赖
