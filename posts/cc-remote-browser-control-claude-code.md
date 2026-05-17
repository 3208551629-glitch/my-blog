---
title: CC Remote — 用浏览器远程控制 Claude Code
date: 2026-05-17
tags:
  - Claude Code
  - AI
  - 项目实战
  - Node.js
category: 项目实战
---

# CC Remote — 用浏览器远程控制 Claude Code

你有没有想过，躺在沙发上用手机就能让电脑上的 Claude Code 帮你写代码？CC Remote 就是这样一个项目——一个轻量级 Web UI，让你通过浏览器远程控制本地的 Claude Code CLI。

## 为什么做这个项目？

Claude Code 是一个强大的命令行 AI 编程助手，但它只能在终端里使用。当你离开电脑时，就无法继续和 Claude 对话了。CC Remote 解决了这个痛点：把 Claude Code 的能力搬到浏览器里，手机、平板、任何设备都能访问。

核心思路很简单：**Web 服务端调用本地 `claude` CLI，把输出通过 SSE 流式推送到浏览器**。

## 技术架构

整个项目只有两个核心文件：

- `server.cjs` — Express 5 后端，负责调用 Claude CLI 并转发流式输出
- `public/index.html` — 单文件前端，所有 CSS 和 JS 内联，零构建依赖

```
cc-yuancheng/
├── server.cjs          # 后端（~380 行）
├── public/
│   └── index.html      # 前端（~1300 行）
├── .env.example        # 环境变量模板
├── package.json        # 仅 express + dotenv 两个依赖
└── README.md
```

没有 Webpack，没有 Vite，没有 React。编辑文件，刷新浏览器，完事。

## 核心实现

### 1. SSE 流式通信

后端通过 `child_process.spawn` 调用 `claude -p`，把 CLI 的 `stream-json` 输出逐行解析，然后通过 SSE 推送给前端：

```javascript
// server.cjs 核心逻辑
const child = spawn('claude', [
  '-p', message,
  '--output-format', 'stream-json',
  '--verbose',
  '--dangerously-skip-permissions',
  '--thinking', 'enabled',
  '--resume', sessionId
]);

child.stdout.on('data', (chunk) => {
  const lines = chunk.toString().split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const event = JSON.parse(line);
    // 解析 thinking / text / tool_use / tool_result 等事件
    res.write(`data: ${JSON.stringify({ type: event.type, ...event })}\n\n`);
  }
});
```

选择 SSE 而不是 WebSocket，是因为 SSE 更简单、能穿透更多代理和 CDN，而且对于这种单向推送场景完全够用。

### 2. 思考过程可视化

Claude 的 `--thinking enabled` 参数会输出推理过程。前端把这些内容渲染成可折叠的思考块：

- **流式传输时**自动展开，让你实时看到 Claude 在想什么
- **完成后**自动折叠，保持界面整洁
- 点击可以随时切换展开/折叠

这个功能让 AI 的"黑盒"变得透明，你能清楚地看到 Claude 是如何一步步推理出答案的。

### 3. 工具调用卡片

当 Claude 执行 Bash 命令、读写文件时，前端会渲染成工具卡片，展示：

- 工具类型（Bash、Read、Write 等）
- 执行的命令或文件路径
- 执行结果和状态（成功/失败）

每张卡片都可以展开查看详细输出，让 AI 的操作过程一目了然。

### 4. 会话持久化

通过 Claude CLI 的 `--resume` 参数实现多轮对话。服务端维护一个 `sessionId` 映射表，每次发消息时带上上次的 session ID，Claude 就能记住之前的对话上下文。

### 5. 自定义 Markdown 渲染器

前端实现了一个轻量级 Markdown 解析器，支持：

- 标题、列表、引用、表格
- 代码块（带语言标签和一键复制）
- 行内格式（粗体、斜体、行内代码）
- 自动链接 URL
- XSS 防护（通过 DOM textContent 转义）

没有引入任何 Markdown 库，纯手写解析，保持零依赖。

## 前端设计亮点

### 毛玻璃效果

头部、输入栏、面板都使用了 `backdrop-filter: blur()` 实现毛玻璃效果，配合半透明背景，视觉层次分明。

### 动画细节

- Logo 脉冲发光动画
- 消息气泡滑入动画
- 打字指示器波浪动画
- 思考块和工具卡片平滑展开/折叠
- 历史侧边栏和设置面板滑入/滑出

### 移动端适配

- 安全区域适配（iPhone 刘海屏）
- 触摸友好的按钮尺寸
- 响应式布局
- 底部输入栏固定定位

### 深色模式

通过 CSS 变量 + `prefers-color-scheme: dark` 实现，所有颜色都定义在 `:root` 中，深色模式只需覆盖变量值。

## 其他功能

- **双历史记录**：浏览器本地对话历史 + Claude CLI 原生会话历史，支持恢复过去的 CLI 会话
- **文件树浏览**：服务端 API 返回工作目录的文件树，点击文件可让 Claude 查看内容
- **快捷指令**：预设常用操作（系统信息、文件列表、资源监控、网络状态、进程列表）
- **费用追踪**：每条消息和累计 API 费用显示
- **停止生成**：客户端 AbortController + 服务端 kill 子进程，双重保障

## 安全考量

项目使用 `--dangerously-skip-permissions` 调用 Claude Code，意味着 AI 拥有完整的本地命令执行权限。因此：

- 仅在可信网络环境中使用
- 不要暴露到公网
- 可通过 `AUTH_TOKEN` 环境变量启用 Bearer Token 认证
- 文件树 API 有路径遍历防护
- 响应头设置了安全 Headers（`X-Content-Type-Options`、`X-Frame-Options` 等）

## 快速开始

```bash
# 克隆项目
git clone <repo-url>
cd cc-yuancheng

# 安装依赖（只有 express 和 dotenv）
npm install

# 配置环境变量
cp .env.example .env

# 启动
npm start

# 访问 http://localhost:3080
```

前提条件：Node.js >= 18，且已安装 Claude Code CLI。

## 总结

CC Remote 的核心设计哲学是**极简**：

- 零构建工具，两个文件搞定一切
- 零前端框架，原生 JS 足以胜任
- 零 SDK 依赖，CLI 就是唯一的集成点
- SSE 代替 WebSocket，简单可靠

它证明了有时候最简单的方案就是最好的方案。不需要复杂的架构，不需要层层抽象，一个 Express 服务 + 一个 HTML 文件，就能把强大的 Claude Code 搬到浏览器里。

如果你也想在手机上远程操控 Claude Code，欢迎试试这个项目。
