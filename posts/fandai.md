---
title: 泛代 — 用 AI 生成前端代码的智能助手
date: 2026-05-24
tags:
  - Python
  - FastAPI
  - AI
  - 前端
  - 代码生成
  - 项目实战
category: 项目实战
---

# 泛代 — 用 AI 生成前端代码的智能助手

起名"泛代"，取"泛化的代码代工"之意。这是一个 AI 驱动的前端代码生成工具：你描述需求，它生成可运行的前端代码。不是生成代码片段，而是生成完整的、可以直接运行的组件或页面。

## 它解决什么问题？

前端开发中有一类工作特别耗时但创造性不高：表单、数据表格、CRUD 管理界面、图表仪表盘。这些页面结构相似，但每次都得从头写。泛代的目标是：**把这类重复性工作交给 AI，让人专注于有创造性的部分**。

## 技术架构

| 层 | 技术 |
|----|------|
| 后端 | FastAPI + SQLAlchemy + Alembic |
| 前端 | Vue 3 + Vite + Element Plus + Pinia |
| AI | DeepSeek API（兼容 OpenAI） |
| 数据库 | SQLite |
| 代码渲染 | Monaco Editor + iframe 沙箱预览 |

```
fandai/
├── backend/
│   ├── app/
│   │   ├── api/endpoints/
│   │   ├── services/
│   │   │   ├── code_generator.py     # AI 代码生成
│   │   │   ├── template_engine.py    # 模板引擎
│   │   │   └── preview_service.py    # 代码预览
│   │   ├── models/
│   │   └── schemas/
│   └── migrations/
└── frontend/
    └── src/
        ├── views/
        │   ├── GeneratorView.vue     # 代码生成界面
        │   ├── PreviewView.vue       # 实时预览
        │   └── HistoryView.vue       # 历史记录
        └── components/
            ├── CodeEditor.vue        # Monaco 编辑器
            └── PreviewPane.vue       # 预览面板
```

## 核心实现

### 1. AI 代码生成引擎

代码生成的核心是精心设计的 Prompt 体系。不是简单地说"帮我写一个表格"，而是把需求结构化：

```python
class GenerationRequest(BaseModel):
    description: str           # 用户描述
    component_type: str        # 组件类型：form / table / dashboard / chart
    framework: str             # 框架：vue / react / html
    ui_library: str           # UI 库：element-plus / ant-design / tailwind
    data_schema: dict | None  # 数据结构（可选）
    style_preference: str      # 风格偏好
```

根据这些参数，Prompt Engine 组装出精确的指令：

```python
def build_generation_prompt(request: GenerationRequest) -> str:
    framework_guide = FRAMEWORK_GUIDES[request.framework]
    ui_guide = UI_LIBRARY_GUIDES[request.ui_library]
    component_template = COMPONENT_TEMPLATES[request.component_type]

    return f"""你是一位资深前端工程师。请根据以下需求生成完整可运行的前端代码。

## 需求描述
{request.description}

## 技术要求
- 框架: {request.framework}
- UI 库: {request.ui_library}
- 组件类型: {request.component_type}
{f"- 数据结构: {json.dumps(request.data_schema)}" if request.data_schema else ""}

## 代码规范
{framework_guide}

## UI 组件用法
{ui_guide}

## 参考结构
{component_template}

## 输出要求
1. 生成完整的单文件组件
2. 包含所有必要的 import
3. 包含示例数据
4. 响应式布局
5. 中文注释
"""
```

结构化 Prompt 的好处是：AI 不需要猜测你要什么框架、什么 UI 库，输出更稳定、更符合预期。

### 2. 组件模板系统

不同类型的组件有不同的生成模板。以数据表格为例：

```python
COMPONENT_TEMPLATES = {
    "table": """
    ## 数据表格结构
    - 顶部: 搜索栏 + 筛选器 + 操作按钮
    - 中部: 数据表格（分页、排序、筛选）
    - 底部: 分页器 + 批量操作
    - 每行: 操作列（查看、编辑、删除）
    """,
    "form": """
    ## 表单结构
    - 表单布局: 响应式栅格
    - 表单验证: 必填、格式、长度
    - 操作区: 提交、重置、取消
    - 高级: 联动字段、条件显示
    """,
    "dashboard": """
    ## 仪表盘结构
    - 顶部: 统计卡片（4列）
    - 中部: 图表区域（折线图 + 柱状图）
    - 底部: 数据表格 + 操作
    """,
    "chart": """
    ## 图表组件
    - 图表类型: 根据数据特征自动选择
    - 交互: hover 提示、点击下钻
    - 配置: 颜色、图例、坐标轴
    """
}
```

模板不是死板的代码模板，而是**结构指引**——告诉 AI 这个类型的组件应该包含哪些部分，让它在此基础上发挥。

### 3. 实时预览

生成代码后，用户可以在浏览器里实时预览效果：

```vue
<template>
  <div class="preview-container">
    <div class="editor-panel">
      <CodeEditor v-model="code" language="html" @change="debouncedPreview" />
    </div>
    <div class="preview-panel">
      <iframe ref="previewFrame" sandbox="allow-scripts" :srcdoc="renderedCode" />
    </div>
  </div>
</template>
```

iframe 的 `sandbox="allow-scripts"` 属性确保预览代码在隔离环境中运行，不会影响主应用。代码变化时通过防抖更新预览。

### 4. 代码编辑器

集成 Monaco Editor（VS Code 的编辑器内核），支持语法高亮、自动补全和错误提示：

```vue
<script setup>
import * as monaco from 'monaco-editor'

const editor = monaco.create(editorContainer, {
  value: props.modelValue,
  language: props.language,
  theme: 'vs-dark',
  automaticLayout: true,
  minimap: { enabled: false },
  fontSize: 14,
})
</script>
```

用户可以在 AI 生成的基础上直接修改代码，实现"AI 起草 + 人工精修"的工作流。

### 5. 历史记录与迭代

每次生成都保存到数据库，方便回溯和对比：

```python
class GenerationRecord(Base):
    __tablename__ = "generation_records"

    id: Mapped[int]
    description: Mapped[str]         # 原始需求
    generated_code: Mapped[str]      # 生成的代码
    framework: Mapped[str]
    component_type: Mapped[str]
    modified_code: Mapped[str | None] # 用户修改后的代码
    rating: Mapped[int | None]       # 用户评分（1-5）
    created_at: Mapped[datetime]
```

评分数据可以用来优化 Prompt——高分的生成模式会被强化，低分的会被调整。

## 其他功能

- **多框架支持** — Vue 3、React、纯 HTML/CSS/JS
- **多 UI 库** — Element Plus、Ant Design、Tailwind CSS、Vuetify
- **代码导出** — 一键复制、下载为文件
- **需求模板** — 预设常见需求描述，一键开始
- **批量生成** — 一次描述生成多个相关组件
- **暗色主题** — 编辑器和预览都支持暗色模式

## 开发经验

### Prompt 结构化是关键

一开始的 Prompt 很简单："帮我写一个 Vue 表单"。结果 AI 生成的代码质量参差不齐——有时候用 Options API，有时候用 Composition API；有时候用 Element Plus，有时候用原生 HTML。结构化 Prompt 后，输出稳定性大幅提升。

### iframe 沙箱的限制

iframe `sandbox` 模式下无法加载外部 CDN 资源，所以 Element Plus 等库需要通过 `srcdoc` 内联。最终方案是：HTML 类型的预览内联所有样式和脚本，Vue/React 类型的预览只显示代码不运行。

### 代码长度控制

AI 有时候会生成过于冗长的代码，特别是当需求描述模糊时。解决方案是在 Prompt 中加入长度约束，并在后处理中检测代码行数——超过阈值时提醒用户细化需求或拆分组件。

### Monaco Editor 的集成

Monaco Editor 在 Vite 中的打包配置比较麻烦，需要用 `monaco-editor-webpack-plugin` 或者手动配置 worker。最终用了 `@monaco-editor/loader` 的动态加载方案，按需加载避免包体积过大。

## 总结

泛代的核心思路是：**把重复性的前端工作结构化，然后让 AI 来做**。不是替代前端工程师，而是把"从零到可运行原型"的时间从小时级缩短到分钟级。

项目名字"泛代"也体现了这个理念——AI 是泛化的代码代工，但最终的精修和决策还是由人来完成。AI 起草，人工定稿，这才是代码生成的正确用法。