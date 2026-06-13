---
title: Localize AI — AI 驱动的多语言翻译工作台
date: 2026-05-24
tags:
  - Python
  - FastAPI
  - Vue
  - AI
  - i18n
  - 项目实战
category: 项目实战
---

# Localize AI — AI 驱动的多语言翻译工作台

做国际化（i18n）是每个多语言产品都要面对的苦差事。传统的翻译流程是：导出 JSON → 发给翻译公司 → 等几天 → 导入 → 发现翻译质量不行 → 反复沟通修改。Localize AI 把这个流程搬到浏览器里：**AI 翻译 + 人工校对 + 一键导出**，从几天缩短到几分钟。

## 核心思路

Localize AI 不是简单的"调用 AI 翻译 API"——那跟直接用 ChatGPT 没区别。它的核心价值在于**翻译工作流**：

1. **批量翻译** — 上传源语言文件，一键翻译成多语言
2. **术语一致性** — 维护术语表，AI 翻译时遵循统一的术语
3. **人工校对** — 翻译结果逐条确认或修改
4. **上下文感知** — AI 翻译时带入项目上下文，不是孤立翻译单句
5. **格式保留** — 支持 JSON、YAML、PO、XLIFF 等多种格式，翻译后格式不变

## 技术架构

| 层 | 技术 |
|----|------|
| 后端 | FastAPI + SQLAlchemy + Alembic |
| 前端 | Vue 3 + Vite + Element Plus + Pinia |
| AI | DeepSeek API（兼容 OpenAI） |
| 数据库 | SQLite |
| 文件解析 | python-i18n, pyyaml, polib |

```
localize-ai/
├── backend/
│   ├── app/
│   │   ├── api/endpoints/
│   │   ├── services/
│   │   │   ├── translator.py        # AI 翻译引擎
│   │   │   ├── file_parser.py       # 多格式解析
│   │   │   ├── glossary_service.py  # 术语表管理
│   │   │   └── export_service.py    # 多格式导出
│   │   ├── models/
│   │   └── schemas/
│   └── migrations/
└── frontend/
    └── src/
        ├── views/
        │   ├── ProjectView.vue      # 项目管理
        │   ├── TranslateView.vue    # 翻译工作台
        │   └── GlossaryView.vue     # 术语表
        └── stores/
```

## 核心实现

### 1. 上下文感知翻译

这是和简单翻译 API 最大的区别。翻译不是逐句进行的，而是把整个文件（或文件分组）作为上下文喂给 AI：

```python
async def translate_batch(
    self,
    source_texts: list[str],
    source_lang: str,
    target_lang: str,
    glossary: dict | None = None,
    context: str | None = None
) -> list[TranslationResult]:
    prompt = f"""你是一位专业的{i18n}翻译人员。

源语言: {source_lang}
目标语言: {target_lang}
项目上下文: {context}

{f"术语表: {json.dumps(glossary, ensure_ascii=False)}" if glossary else ""}

请翻译以下内容，保持 JSON 结构不变：
{json.dumps(source_texts, ensure_ascii=False, indent=2)}

要求：
1. 保持占位符 {{variable}} 不变
2. 遵循术语表中的翻译
3. 考虑上下文语境，不要逐字翻译
4. 保持相同的语气和风格
"""
```

批量翻译而不是逐条调用 API，既省 token 又保证上下文连贯。

### 2. 术语表管理

术语一致性是翻译质量的核心。项目支持术语表的增删改查，翻译时自动注入：

```python
class GlossaryEntry(Base):
    __tablename__ = "glossary_entries"

    id: Mapped[int]
    project_id: Mapped[int]
    source_term: Mapped[str]       # 源语言术语
    target_lang: Mapped[str]       # 目标语言
    target_term: Mapped[str]       # 翻译术语
    note: Mapped[str | None]       # 备注（为什么这样翻）
    is_case_sensitive: Mapped[bool] = True
```

比如 "Dashboard" 在你的产品里统一翻成"控制台"而不是"仪表盘"，术语表确保 AI 每次都遵循这个约定。

### 3. 多格式解析与导出

支持多种 i18n 文件格式，核心是统一的中间表示：

```python
# 统一翻译条目
@dataclass
class TranslationEntry:
    key: str              # "home.welcome.title"
    source_text: str      # "Welcome back"
    translated_text: str  # "欢迎回来"
    status: str           # "untranslated" | "translated" | "reviewed"
    context: str | None   # 使用场景说明

# 格式解析器注册
PARSERS = {
    ".json": JsonParser,
    ".yaml": YamlParser,
    ".yml": YamlParser,
    ".po": PoParser,
    ".xliff": XliffParser,
}
```

每种格式只需要实现 `parse()` 和 `export()` 两个方法，翻译逻辑完全复用。

### 4. 翻译工作台

前端的核心界面是翻译工作台——左右对照，左边原文右边译文，逐条翻译和校对：

```vue
<template>
  <div class="translate-workbench">
    <div class="source-panel">
      <div v-for="entry in entries" class="entry-row">
        <span class="key">{{ entry.key }}</span>
        <span class="source">{{ entry.source_text }}</span>
      </div>
    </div>
    <div class="target-panel">
      <div v-for="entry in entries" class="entry-row">
        <el-input v-model="entry.translated_text" type="textarea" />
        <el-tag :type="statusTag(entry.status)">{{ entry.status }}</el-tag>
      </div>
    </div>
  </div>
</template>
```

每条翻译有三种状态：未翻译、已翻译（AI 翻译）、已校对（人工确认）。支持按状态筛选，快速定位需要校对的条目。

### 5. 翻译记忆

系统会记住之前的翻译决策，当相同的 key 或相似的文本再次出现时，优先使用历史翻译：

```python
async def find_similar_translation(
    self, source_text: str, target_lang: str
) -> TranslationEntry | None:
    # 简单的相似度匹配
    existing = await self.db.query(TranslationEntry).filter(
        TranslationEntry.target_lang == target_lang,
        TranslationEntry.status == "reviewed"
    ).all()

    for entry in existing:
        if similarity(source_text, entry.source_text) > 0.85:
            return entry
    return None
```

## 其他功能

- **项目管理** — 多项目隔离，每个项目独立的术语表和翻译记忆
- **语言对管理** — 自定义源语言和目标语言
- **进度追踪** — 翻译完成率、校对完成率可视化
- **批量操作** — 批量确认、批量重新翻译、批量导出
- **版本对比** — 源文件更新后，高亮变更条目

## 开发经验

### 占位符是最大的坑

i18n 文件里有各种占位符：`{name}`、`%s`、`{{variable}}`、`$1`……AI 翻译时经常搞乱这些。解决方案是在 Prompt 中明确列出占位符规则，并在后处理中用正则校验——如果翻译结果丢失了占位符，自动回退到原文。

### 批量 vs 单条翻译的权衡

批量翻译省 API 调用，但单条太多容易超 token 限制或降低翻译质量。最终方案是按 Section 分组批量翻译，每组 20-30 条，兼顾效率和质量。

### 术语表的冷启动问题

新项目没有术语表，AI 翻译的一致性会比较差。解决方案是：第一次全量翻译后，自动提取高频术语让用户确认，快速建立术语表基础。

## 总结

Localize AI 解决的不是"能不能翻译"的问题（AI 翻译质量已经很好了），而是**翻译工作流**的问题。术语一致性、上下文感知、格式兼容、人工校对——这些才是 i18n 工作中真正花时间的地方。

把 AI 翻译和人工校对放在同一个工作台里，让 AI 干苦活（批量翻译），让人做决策（术语制定、质量确认），这才是 AI 辅助工具的正确姿势。