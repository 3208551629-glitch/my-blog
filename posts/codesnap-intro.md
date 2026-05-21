---
title: CodeSnap — 代码片段美化分享工具
date: 2026-05-21
tags:
  - React
  - 工具
  - 项目实战
  - 开源
category: 项目实战
---

# CodeSnap — 代码片段美化分享工具

你有没有遇到过这样的场景：在 Twitter、掘金或即刻上分享一段代码，截图灰蒙蒙的，毫无美感？或者写技术博客时，代码截图看起来像 1990 年代的终端？

**CodeSnap** 就是为了解决这个问题而生的 —— 一个将代码片段转化为精美可分享图片的在线工具。

> 试试看：[CodeSnap 在线工具](/codesnap/)

## 为什么做这个项目？

作为开发者，我经常在社交媒体上分享代码片段。但每次截图都面临两个痛点：

1. **代码截图太丑** — 默认的终端或编辑器截图，配色单调，没有视觉吸引力
2. **分享体验差** — 需要先截图、再裁剪、再发帖，步骤繁琐

市面上已有 [Carbon](https://carbon.now.sh/) 这样的工具，但使用下来有几个问题：

- 中文体验差，界面全英文
- 主题选择有限，更新缓慢
- 无法调整编辑器和预览的比例
- 导出时偶尔出现样式错乱

于是决定自己做一个，专注中文开发者体验。

## 核心功能

### 1. 代码编辑与语法高亮

基于 [Shiki](https://shiki.style/) 实现语法高亮，支持 20+ 主流编程语言：

- JavaScript / TypeScript / Python / Rust / Go / Java / C++ / HTML / CSS / JSON / Markdown / Bash / SQL / Swift / Kotlin / Ruby / PHP / YAML / TSX / JSX

Shiki 使用 VS Code 的 TextMate 语法引擎，高亮效果与 VS Code 完全一致。

### 2. 10 个精美代码主题

内置 10 个开发者最爱的代码主题：

| 主题 | 风格 |
|------|------|
| Dracula | 经典暗色，高对比度 |
| One Dark Pro | VS Code 最受欢迎主题 |
| GitHub Dark | GitHub 官方暗色 |
| Solarized Dark | 护眼经典 |
| Nord | 北极冷色调 |
| Monokai | Sublime Text 经典 |
| Night Owl | Sarah Drasner 设计 |
| Ayu Dark | 简约日式 |
| Tokyo Night | 东京夜景风 |
| Catppuccin Mocha | 柔和暖色调 |

### 3. 8 种渐变背景

从深海到极光，从赛博朋克到冰川，8 种精心调配的渐变背景让你的代码图片脱颖而出：

- 深海 / 极光 / 落日 / 赛博朋克 / 森林 / 星空 / 余烬 / 冰川

### 4. 窗口装饰

三种窗口风格可选：

- **macOS** — 经典红黄绿按钮
- **Windows** — 方形按钮
- **简约** — 无装饰

### 5. 灵活的排版控制

- 字号调节（12px - 24px）
- 内边距调节（16px - 64px）
- 行号显示开关
- 水印开关
- 窗口标题自定义

### 6. 一键导出

- **复制到剪贴板** — 直接粘贴到聊天或文档
- **PNG 导出** — 支持 2x 高清分辨率
- **SVG 导出** — 矢量格式，无限放大不失真

### 7. 可拖拽面板

编辑器和预览区域之间的分隔条可以自由拖拽，调整左右面板宽度比例。左侧最小 280px，右侧最小 400px，确保两个区域都有足够的可视空间。

## 技术架构

```
CodeSnap
├── React + TypeScript     # 核心框架
├── Vite                   # 构建工具
├── TailwindCSS v4         # 样式方案
├── Shiki                  # 语法高亮引擎
├── html-to-image          # 图片导出
├── Zustand                # 状态管理
├── Lucide React           # 图标库
└── React Hot Toast        # 通知提示
```

### 为什么选这些技术？

- **Shiki 而非 Prism/Highlight.js** — Shiki 使用 VS Code 的 TextMate 语法，主题还原度最高，且支持 WASM 加速
- **Zustand 而非 Redux** — 这个应用状态简单，Zustand 轻够了，不需要 Redux 的 boilerplate
- **html-to-image** — 纯前端图片生成，无需服务端渲染
- **Vite** — 开发体验极好，HMR 秒级响应

### 关键设计决策

**纯前端架构**：整个应用不需要后端服务器。代码高亮、图片生成、状态管理全部在浏览器端完成。这意味着：

- 部署简单 — 任何静态托管都能用
- 零运维成本 — 没有服务器需要维护
- 隐私安全 — 代码不会发送到任何服务器

## 与 Carbon 的对比

| 特性 | CodeSnap | Carbon |
|------|----------|--------|
| 中文界面 | ✅ | ❌ |
| 代码主题数量 | 10 | 30+ |
| 渐变背景 | 8 种精选 | 自定义 |
| 拖拽面板 | ✅ | ❌ |
| 窗口样式 | 3 种 | 2 种 |
| 行号显示 | ✅ | ✅ |
| SVG 导出 | ✅ | ✅ |
| 复制到剪贴板 | ✅ | ✅ |
| 离线使用 | ✅ | ✅ |
| 开源 | ✅ | ✅ |

Carbon 在主题数量和自定义程度上更有优势，CodeSnap 则专注中文体验和核心功能的打磨。

## 实现过程中的技术要点

### 1. Shiki 懒加载

Shiki 需要加载 WASM 和语言语法文件，首次加载约 1-2 秒。使用自定义 Hook `useHighlighter` 处理加载状态：

```typescript
export function useHighlighter() {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getHighlighter()
      .then(setHighlighter)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { highlighter, loading, error }
}
```

加载完成前显示原始代码，加载失败时优雅降级。

### 2. 拖拽面板实现

使用自定义 Hook `useResizable` 实现左右面板宽度调整：

- 监听 `mousedown → mousemove → mouseup` 事件链
- 拖拽时设置 `user-select: none` 防止文字选中
- 设置 `cursor: col-resize` 提供视觉反馈
- 同时支持触摸设备（`touchstart/touchmove/touchend`）
- 最小宽度约束防止面板被拖到不可见

### 3. 编辑器自适应高度

代码编辑器根据内容自动调整高度，不再用 `flex-1` 撑满空间。这样编辑器和主题控制之间不会出现大段空白，左侧面板整体可滚动。

## 未来规划

### 短期（1-2 周）

- **VS Code 扩展** — 右键选中代码直接生成 CodeSnap 图片
- **更多主题** — 新增 20+ 预设模板
- **多语言界面** — 支持英文切换，面向全球开发者

### 中期（1-2 月）

- **用户系统** — Supabase Auth，GitHub/Google 登录
- **代码片段保存** — 保存历史记录，方便回看
- **分享链接** — 生成短链，他人可在线查看代码原文
- **Freemium** — 免费基础功能 + 付费解锁高级主题/无水印/API

### 长期

- **API 服务** — 传入代码和配置，返回图片 URL
- **代码片段社区** — 公开分享优秀代码片段
- **视频导出** — 代码输入动画视频，适合教程制作
- **主题市场** — 设计师上传主题，用户付费使用

## 总结

CodeSnap 是一个专注中文开发者的代码美化工具，核心价值是**让代码分享变得简单且美观**。纯前端架构意味着零运维成本，天然病毒传播（每张分享图片都是广告）让增长飞轮自然转动。

如果你也经常分享代码，不妨试试：[CodeSnap 在线工具](/codesnap/)

---

> 好的工具不是功能最多的，而是用起来最顺手的。
