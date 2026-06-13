---
title: Invoice Chaser — AI 驱动的发票催收自动化
date: 2026-05-24
tags:
  - Python
  - FastAPI
  - Vue
  - AI
  - 项目实战
category: 项目实战
---

# Invoice Chaser — AI 驱动的发票催收自动化

做过自由职业或经营小公司的朋友都知道：**催款是最让人头疼的事**。每次都得斟酌措辞——第一封要客气，第二封得强硬一点，第三封就该下最后通牒了。更要命的是，发票一多，谁催过谁没催过根本记不清。

Invoice Chaser 就是来解决这个问题的：自动检测逾期发票，用 AI 生成措辞得当的催收邮件，按计划自动发送，语气还会随逾期天数逐级升级。

## 核心亮点：语气升级机制

这是项目最有意思的设计。催收邮件不是千篇一律的模板，而是根据逾期天数和已催收次数自动调整语气：

- **友好提醒** — 首次催收，温和礼貌
- **正式催收** — 第二次，语气明确坚定
- **紧急通知** — 第三次及以后，措辞严肃，暗示后续措施

```python
def _determine_tone(self, overdue_days: int, followup_count: int) -> str:
    if followup_count == 0:
        return "friendly"
    elif followup_count == 1:
        return "firm"
    else:
        return "urgent"
```

每次催收，AI 都会根据发票详情、联系人信息和当前语气参数重新生成邮件，确保每封邮件都是独特的、贴合上下文的——而不是那种让收件人一眼就忽略的群发模板。

## 技术架构

前后端分离，技术栈简洁：

| 层 | 技术 |
|----|------|
| 后端 | FastAPI + SQLAlchemy + Alembic |
| 前端 | Vue 3 + Vite + Element Plus + Pinia |
| AI | DeepSeek API（兼容 OpenAI） |
| 数据库 | SQLite（开发）/ PostgreSQL（生产） |
| 邮件 | aiosmtplib 异步发送 |
| 定时任务 | APScheduler |

```
invoice-chaser/
├── backend/
│   ├── app/
│   │   ├── api/endpoints/     # REST 接口
│   │   ├── services/          # 业务逻辑
│   │   │   ├── email_generator.py   # AI 邮件生成
│   │   │   ├── email_sender.py      # SMTP 发送
│   │   │   └── followup_engine.py    # 催收引擎
│   │   ├── models/            # SQLAlchemy 模型
│   │   └── schemas/           # Pydantic 验证
│   └── migrations/            # Alembic 迁移
└── frontend/
    └── src/
        ├── views/             # 页面组件
        ├── stores/            # Pinia 状态
        └── api/               # 请求封装
```

## 核心实现

### 1. 催收引擎

引擎每 30 分钟扫描一次逾期发票，判断是否需要发送催收邮件：

```python
async def _process_overdue_invoices(self):
    overdue_invoices = await self._get_overdue_invoices()
    for invoice in overdue_invoices:
        contact = await self._get_contact(invoice.contact_id)
        last_followup = await self._get_last_followup(invoice.id)

        if self._should_send_followup(invoice, last_followup):
            tone = self.email_generator._determine_tone(
                invoice.overdue_days, invoice.followup_count
            )
            email_content = await self.email_generator.generate_followup_email(
                invoice, contact, tone
            )
            await self.email_sender.send_email(contact.email, email_content)
            await self._record_followup(invoice.id, tone, email_content)
```

关键判断逻辑包括：是否超过最大催收次数、距上次催收是否超过间隔天数、发票是否仍在逾期状态。

### 2. AI 邮件生成

AI Prompt 中注入了完整的上下文信息，包括发票金额、逾期天数、联系人姓名和当前语气：

```python
prompt = f"""你是一位专业的财务催收人员。请根据以下信息生成一封催收邮件：

发票编号: {invoice.invoice_number}
金额: {invoice.amount} 元
逾期天数: {invoice.overdue_days} 天
联系人: {contact.name}
语气: {tone}

要求：
1. 语气为"{tone}"，{tone_descriptions[tone]}
2. 包含发票编号和金额
3. 提供付款方式和截止日期
4. 专业得体，避免过激言辞
"""
```

### 3. 账龄分析仪表盘

后端提供账龄分析 API，将逾期发票按时间段分组：

```python
aging_buckets = {
    "1-30天": 0,
    "31-60天": 0,
    "61-90天": 0,
    "90天以上": 0
}
for invoice in overdue_invoices:
    days = invoice.overdue_days
    if days <= 30: aging_buckets["1-30天"] += invoice.amount
    elif days <= 60: aging_buckets["31-60天"] += invoice.amount
    elif days <= 90: aging_buckets["61-90天"] += invoice.amount
    else: aging_buckets["90天以上"] += invoice.amount
```

前端用 Element Plus 的图表组件渲染，一目了然看到哪些发票需要优先处理。

## 其他功能

- **联系人管理** — CRUD + 搜索分页
- **发票管理** — 创建、编辑、标记已付、删除
- **催收历史** — 每次催收的邮件内容、语气、时间完整记录
- **系统设置** — SMTP 配置、AI 模型选择、催收规则（最大次数、间隔天数）
- **JWT 认证** — bcrypt 密码哈希 + token 鉴权

## 开发经验

### 服务层分离是关键

项目把邮件生成、邮件发送、催收调度拆成三个独立 Service。好处是：换 AI 提供商只改 `email_generator`，换邮件渠道只改 `email_sender`，催收策略调整只改 `followup_engine`。互不干扰。

### APScheduler 嵌入 FastAPI

利用 FastAPI 的 `lifespan` 事件启动和关闭调度器，不需要额外的 Celery 或 Redis，对这种轻量级定时任务完全够用：

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler = AsyncIOScheduler()
    scheduler.add_job(followup_engine.run, 'interval', minutes=30)
    scheduler.start()
    yield
    scheduler.shutdown()
```

### SQLite 开发、PostgreSQL 生产

用 SQLAlchemy ORM 抽象数据库层，开发时用零配置的 SQLite，部署时切换连接字符串即可上 PostgreSQL，不需要改业务代码。

## 总结

Invoice Chaser 证明了一个道理：**AI 最适合做那些"需要判断力但重复性极高"的工作**。催收邮件就是这样——每封都需要斟酌语气和措辞，但本质上都是同一件事。让 AI 来生成内容，让定时任务来把握节奏，人只需要检查和确认。

核心设计哲学是**语气升级**：不是简单粗暴地发模板邮件，而是根据逾期情况智能调整措辞，既维护了商业关系，又确保催收效果。

如果你也经常被催款困扰，不妨试试这个思路。