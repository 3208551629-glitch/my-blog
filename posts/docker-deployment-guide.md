---
title: Docker 容器化部署实践
date: 2026-04-23
tags:
  - Docker
  - DevOps
  - 部署
category: 技术
---

# Docker 容器化部署实践

Docker 让应用的打包、分发和部署变得简单一致，是现代 DevOps 的核心工具。

## Docker 基础概念

### 镜像（Image）

只读模板，包含运行应用所需的一切：代码、运行时、库、配置文件。

### 容器（Container）

镜像的运行实例，相互隔离，保证应用在任何环境中表现一致。

### 仓库（Registry）

存储和分发镜像的地方，如 Docker Hub、阿里云容器镜像服务。

## Dockerfile 编写

### Node.js 应用示例

```dockerfile
# 基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "src/index.js"]
```

### 多阶段构建

减小最终镜像体积：

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 生产阶段
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Vue 前端应用示例

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 生产阶段 - 使用 nginx 托管静态文件
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 常用命令

### 镜像操作

```bash
# 构建镜像
docker build -t my-app:latest .

# 查看镜像列表
docker images

# 推送镜像到仓库
docker push username/my-app:latest

# 删除镜像
docker rmi my-app:latest
```

### 容器操作

```bash
# 运行容器
docker run -d -p 3000:3000 --name my-container my-app:latest

# 查看运行中的容器
docker ps

# 查看容器日志
docker logs -f my-container

# 进入容器
docker exec -it my-container sh

# 停止容器
docker stop my-container

# 删除容器
docker rm my-container
```

## Docker Compose

用于定义和运行多容器应用：

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

常用命令：

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止并删除所有服务
docker-compose down

# 重新构建并启动
docker-compose up -d --build
```

## 最佳实践

### 1. 使用 .dockerignore

```
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
.env
*.md
```

### 2. 最小化镜像层数

```dockerfile
# 不好的做法 - 多个 RUN
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# 好的做法 - 合并为一个 RUN
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### 3. 使用特定版本标签

```dockerfile
# 不好的做法 - 使用 latest
FROM node:latest

# 好的做法 - 指定版本
FROM node:20.10-alpine
```

### 4. 非 root 用户运行

```dockerfile
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup
USER appuser
```

## 健康检查

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

## 总结

Docker 容器化的核心要点：

- 理解镜像和容器的关系
- 编写高效的 Dockerfile
- 使用多阶段构建减小镜像体积
- 使用 Docker Compose 管理多容器应用
- 遵循安全最佳实践
