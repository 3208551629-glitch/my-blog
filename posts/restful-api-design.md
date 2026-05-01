---
title: RESTful API 设计最佳实践
date: 2026-04-22
tags:
  - API
  - 后端
  - 架构
category: 技术
---

# RESTful API 设计最佳实践

RESTful API 是现代 Web 服务的主流接口设计风格，良好的设计能提升开发效率和用户体验。

## REST 基本原则

REST（Representational State Transfer）是一种架构风格，核心原则：

1. **资源导向** - URL 表示资源
2. **统一接口** - 使用标准 HTTP 方法
3. **无状态** - 每个请求包含所有必要信息
4. **分层系统** - 客户端无需知道连接的是哪一层

## URL 设计

### 使用名词表示资源

```
# 好的设计
GET    /users          # 获取用户列表
GET    /users/123      # 获取单个用户
POST   /users          # 创建用户
PUT    /users/123      # 更新用户
DELETE /users/123      # 删除用户

# 不好的设计
GET    /getUsers
POST   /createUser
POST   /deleteUser/123
```

### 资源层级关系

```
# 获取用户的所有文章
GET /users/123/posts

# 获取用户的某篇文章
GET /users/123/posts/456

# 为用户创建文章
POST /users/123/posts
```

### 使用复数形式

```
# 好的设计
/users
/posts
/comments

# 不好的设计
/user
/post
/comment
```

### 避免动词

```
# 好的设计
POST /articles/123/publish

# 不好的设计
POST /publishArticle/123
```

## HTTP 方法

| 方法 | 用途 | 是否幂等 |
|------|------|----------|
| GET | 获取资源 | 是 |
| POST | 创建资源 | 否 |
| PUT | 完整更新资源 | 是 |
| PATCH | 部分更新资源 | 是 |
| DELETE | 删除资源 | 是 |

## 状态码

### 成功响应

| 状态码 | 含义 | 使用场景 |
|--------|------|----------|
| 200 | OK | 成功处理请求 |
| 201 | Created | 成功创建资源 |
| 204 | No Content | 成功但无返回内容（如删除） |

### 客户端错误

| 状态码 | 含义 | 使用场景 |
|--------|------|----------|
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未认证 |
| 403 | Forbidden | 无权限 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突 |
| 422 | Unprocessable Entity | 语义错误 |
| 429 | Too Many Requests | 请求过于频繁 |

### 服务端错误

| 状态码 | 含义 | 使用场景 |
|--------|------|----------|
| 500 | Internal Server Error | 服务器内部错误 |
| 502 | Bad Gateway | 网关错误 |
| 503 | Service Unavailable | 服务不可用 |

## 响应格式

### 统一响应结构

```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数验证失败",
    "details": [
      {
        "field": "email",
        "message": "邮箱格式不正确"
      }
    ]
  }
}
```

### 分页响应

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "totalPages": 5
  },
  "links": {
    "first": "/posts?page=1",
    "prev": null,
    "next": "/posts?page=2",
    "last": "/posts?page=5"
  }
}
```

## 查询参数

### 过滤

```
GET /posts?status=published&author=123
```

### 排序

```
GET /posts?sort=-createdAt,title
# - 表示降序，多个字段用逗号分隔
```

### 分页

```
GET /posts?page=1&perPage=20
# 或使用 cursor 方式
GET /posts?cursor=abc123&limit=20
```

### 字段选择

```
GET /users?fields=id,name,email
```

## 版本控制

### URL 路径方式（推荐）

```
/api/v1/users
/api/v2/users
```

### Header 方式

```
GET /api/users
Accept: application/vnd.myapi.v1+json
```

## 认证

### Bearer Token

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### API Key

```
X-API-Key: your-api-key
```

## 示例：完整的用户 API

```
GET    /api/v1/users           # 获取用户列表
GET    /api/v1/users/:id       # 获取单个用户
POST   /api/v1/users           # 创建用户
PUT    /api/v1/users/:id       # 完整更新用户
PATCH  /api/v1/users/:id       # 部分更新用户
DELETE /api/v1/users/:id       # 删除用户
GET    /api/v1/users/:id/posts # 获取用户的文章
```

## 总结

RESTful API 设计的核心要点：

- URL 使用名词，表示资源
- 正确使用 HTTP 方法和状态码
- 统一的响应格式
- 支持过滤、排序、分页
- 合理的版本控制策略
- 清晰的错误信息
