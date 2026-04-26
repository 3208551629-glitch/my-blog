# 我的博客

一个基于 VitePress + Vue 3 构建的个人博客。

## 特性

- 🚀 极速构建 - 基于 Vite，开发体验极佳
- 🎨 优雅设计 - 响应式布局，支持暗色主题
- 📝 Markdown 增强 - 代码高亮、数学公式
- 🔍 本地搜索 - 内置全文搜索
- 📱 移动友好 - 完美适配各种设备

## 快速开始

### 安装依赖

```bash
pnpm install
# 或
npm install
```

### 开发模式

```bash
pnpm dev
# 或
npm run dev
```

访问 http://localhost:5173 查看博客。

### 构建生产版本

```bash
pnpm build
# 或
npm run build
```

构建产物在 `.vitepress/dist` 目录。

### 预览构建结果

```bash
pnpm preview
# 或
npm run preview
```

## 项目结构

```
gl/
├── .vitepress/
│   ├── config.ts           # VitePress 配置
│   └── theme/              # 自定义主题
│       ├── index.ts        # 主题入口
│       ├── Layout.vue      # 布局组件
│       ├── components/     # Vue 组件
│       ├── composables/    # 组合式函数
│       └── styles/         # 样式文件
├── posts/                  # 博客文章
├── archives/               # 归档页
├── tags/                   # 标签页
├── about/                  # 关于页
├── public/                 # 静态资源
└── index.md               # 首页
```

## 写文章

在 `posts/` 目录下创建 Markdown 文件：

```markdown
---
title: 文章标题
date: 2024-01-20
tags:
  - 标签1
  - 标签2
category: 分类
pinned: false
---

# 文章标题

内容...
```

## 部署

### GitHub Pages

1. 修改 `.vitepress/config.ts` 中的 `base` 为你的仓库名
2. 推送代码到 GitHub
3. 在仓库设置中启用 GitHub Pages

### Vercel

1. 导入 GitHub 仓库
2. 自动检测 VitePress 项目
3. 一键部署

### Netlify

1. 导入 GitHub 仓库
2. 构建命令: `npm run build`
3. 输出目录: `.vitepress/dist`

## 自定义

### 修改主题色

编辑 `.vitepress/theme/styles/variables.css`：

```css
:root {
  --vp-c-brand: #your-color;
}
```

### 添加评论系统

推荐使用 [Giscus](https://giscus.app/)，基于 GitHub Discussions。

## License

MIT
