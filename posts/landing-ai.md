---
title: Landing AI — 用对话生成落地页的 AI Builder
date: 2026-05-24
tags:
  - Vue
  - FastAPI
  - AI
  - 低代码
  - 项目实战
category: 项目实战
---

# Landing AI — 用对话生成落地页的 AI Builder

做一个落地页，通常要经历这些步骤：选模板 → 改文案 → 调配色 → 排版 → 反复修改。就算用模板，一套下来也要几个小时。Landing AI 的想法很简单：**直接告诉 AI 你要什么样的页面，它帮你生成**。

你可以说"帮我做一个咖啡馆的落地页，暖色调，要有菜单展示和在线预订"，AI 就会生成一个完整可编辑的落地页，你可以在可视化编辑器里继续微调。

## 核心思路

整个产品的核心流程就三步：

1. **对话描述** — 告诉 AI 你的需求
2. **AI 生成** — 生成 HTML/CSS 代码
3. **可视化编辑** — 所见即所得地微调

```
用户输入 → AI 理解需求 → 生成 HTML/CSS → 渲染预览 → 用户编辑 → 导出部署
```

这不是一个通用页面生成器，而是专注于落地页（Landing Page）这一个场景。场景收窄后，AI 生成的质量会高很多——落地页的结构是有限的：Hero、Features、Pricing、CTA、Footer，组合方式有规律可循。

## 技术架构

| 层 | 技术 |
|----|------|
| 后端 | FastAPI + SQLAlchemy + Alembic |
| 前端 | Vue 3 + Vite + Element Plus + Pinia |
| AI | DeepSeek API（兼容 OpenAI） |
| 可视化编辑 | ContentEditable + 自定义编辑器 |
| 数据库 | SQLite |

```
landing-ai/
├── backend/
│   ├── app/
│   │   ├── api/endpoints/
│   │   ├── services/
│   │   │   ├── page_generator.py    # AI 页面生成
│   │   │   └── page_builder.py      # 页面构建逻辑
│   │   ├── models/
│   │   └── schemas/
│   └── migrations/
└── frontend/
    └── src/
        ├── views/
        │   ├── ChatView.vue         # 对话界面
        │   ├── EditorView.vue       # 可视化编辑器
        │   └── PreviewView.vue      # 页面预览
        ├── stores/
        │   ├── chat.ts              # 对话状态
        │   └── editor.ts            # 编辑器状态
        └── components/
            ├── chat/                # 对话组件
            └── editor/              # 编辑器组件
```

## 核心实现

### 1. AI 页面生成

关键在于 Prompt Engineering。不是让 AI 随意生成 HTML，而是给它一个结构化的模板框架：

```python
PAGE_TEMPLATE = """
基于以下需求生成一个落地页：

业务类型: {business_type}
页面风格: {style}
主色调: {color_scheme}
必需板块: {required_sections}

请生成符合以下结构的 HTML：
1. Hero Section - 包含主标题、副标题、CTA 按钮
2. Features Section - 3-4 个核心功能卡片
3. {custom_sections} - 根据需求添加
4. CTA Section - 行动号召
5. Footer - 联系信息

要求：
- 使用 Tailwind CSS 样式
- 响应式设计
- 现代简洁风格
- 所有文案使用中文
"""
```

生成结果不只是 HTML 字符串，而是结构化的 JSON，包含每个 Section 的类型、内容和样式，方便编辑器解析和编辑。

### 2. 可视化编辑器

编辑器的核心是 `ContentEditable`，让用户直接在预览中点击修改文字：

```vue
<template>
  <div class="page-preview" v-html="renderedHTML"></div>
</template>

<script setup>
const handleContentEdit = (sectionId: string, field: string, value: string) => {
  editorStore.updateSection(sectionId, { [field]: value })
}
</script>
```

编辑器维护一个 Section 列表的状态，每个 Section 有自己的 `type`、`content`、`style`。用户编辑时修改状态，然后重新渲染。这样 HTML 只是渲染结果，真正的数据源是 JSON 状态。

### 3. 对话式交互

对话界面不只是输入框——AI 会根据上下文理解你的需求变化：

- "把主色调改成蓝色" → AI 修改配色方案
- "加一个客户评价板块" → AI 插入新的 Testimonial Section
- "价格太长了，精简一下" → AI 修改 Pricing Section

```python
# AI 理解修改指令
modification_prompt = f"""
当前页面结构: {current_sections}
用户修改请求: {user_message}

请返回需要修改的 Section 和修改内容。
只返回变更部分，不要重新生成整个页面。
"""
```

增量修改而非全量重新生成，这让迭代过程更快、更稳定。

### 4. 页面导出

支持导出为独立 HTML 文件，包含所有 CSS 和 JS，可以直接部署到任何静态托管服务：

```python
def export_page(page_data: dict) -> str:
    html = render_template("export_template.html", page=page_data)
    # 内联 CSS 和 JS
    html = inline_styles(html)
    html = inline_scripts(html)
    return html
```

## 其他功能

- **项目管理** — 创建、保存、加载多个落地页项目
- **模板市场** — 预设行业模板（咖啡馆、SaaS、电商等），一键开始
- **主题切换** — 浅色/深色模式
- **响应式预览** — 桌面/平板/手机三种视口预览
- **历史版本** — 每次修改自动保存快照，可回滚

## 开发经验

### 生成 vs 编辑的平衡

一开始我尝试让 AI 全量重新生成页面，但发现两个问题：一是生成慢，二是每次生成结果不一致，用户好不容易调好的样式可能被覆盖。最终改为**增量修改**模式：初始生成是全量的，后续修改只改受影响的 Section。

### ContentEditable 的坑

`contenteditable` 看起来简单，但坑不少：光标跳动、格式丢失、中文输入法兼容……最终方案是用 `contenteditable` 做展示，但把真正的编辑逻辑放在侧边栏的表单里，`contenteditable` 只作为快速修改入口。

### AI 输出的稳定性

让 AI 输出结构化 JSON 而不是纯 HTML，大幅提升了编辑器的可靠性。JSON schema 可以验证，字段可以映射到编辑器控件，比解析 HTML 字符串靠谱得多。

## 总结

Landing AI 的核心洞察是：**场景收窄是 AI 应用落地的关键**。不做通用页面生成器，只做落地页；不做代码编辑器，只做可视化编辑。范围越小，AI 输出质量越高，用户体验也越好。

对话式生成 + 可视化编辑的组合，让非技术用户也能快速制作专业落地页。不需要懂 HTML/CSS，只要能描述自己的需求就行。