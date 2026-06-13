---
title: SaaS Boilerplate — 中国市场专属的全栈脚手架
date: 2026-05-24
tags:
  - Next.js
  - Prisma
  - AI
  - SaaS
  - 项目实战
category: 项目实战
---

# SaaS Boilerplate — 中国市场专属的全栈脚手架

市面上的 SaaS 脚手架不少——ShipFast、NextBase、Supastarter——但它们全是面向海外市场的：Stripe 收款、Google 登录、Twilio 短信。在中国做 SaaS 产品，这些东西根本用不上。你需要的是微信支付、支付宝、微信 OAuth、阿里云短信。

这个 SaaS Boilerplate 就是为中国市场量身打造的：**海外支付和认证作为可选集成，国内支付和认证作为默认配置**。同时内置了 AI 电商内容优化模块，让 SaaS 产品从第一天就具备智能化能力。

## 为什么需要中国市场专属的脚手架？

在中国做 SaaS，和海外有几大差异：

| 需求 | 海外方案 | 中国方案 |
|------|---------|---------|
| 支付 | Stripe | 微信支付 + 支付宝 |
| 登录 | Google/GitHub OAuth | 微信 OAuth + 手机号 |
| 短信 | Twilio | 阿里云短信 |
| 合规 | GDPR | 数据安全法 + 个人信息保护法 |
| SEO | Google | 百度 + 微信搜索 |

如果一个脚手架只集成 Stripe，你拿到手还得自己对接微信支付——那脚手架的意义就大打折扣了。

## 技术架构

| 层 | 技术 |
|----|------|
| 框架 | Next.js 14 (App Router) |
| UI | React 18 + shadcn/ui + Tailwind CSS |
| 认证 | NextAuth.js（微信 + Google + GitHub + 邮箱密码） |
| 数据库 | Prisma ORM + PostgreSQL |
| 支付 | Stripe + 微信支付 + 支付宝 |
| AI | DeepSeek API |
| 短信 | 阿里云 SMS |
| 部署 | Vercel-ready |

```
saas-boilerplate/
├── src/
│   ├── app/
│   │   ├── (auth)/          # 登录注册页面
│   │   ├── (dashboard)/     # 受保护的业务页面
│   │   ├── api/
│   │   │   ├── auth/        # NextAuth 路由
│   │   │   ├── stripe/      # Stripe webhook
│   │   │   ├── wechat/      # 微信支付回调
│   │   │   ├── alipay/      # 支付宝回调
│   │   │   └── ai/          # AI 内容优化
│   │   │   └── register/    # 注册接口
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/              # shadcn/ui 组件
│   │   └── pricing/         # 定价表
│   │   └── auth/            # 认证组件
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── providers.ts       # AI 提供商抽象
│   │   │   ├── prompts/           # Prompt 模板
│   │   │   └── templates/         # 平台规则
│   │   └── stripe.ts              # Stripe 配置
│   │   └── wechat-pay.ts          # 微信支付配置
│   │   └── alipay.ts              # 支付宝配置
│   ├── middleware.ts              # 认证+订阅中间件
│   └── prisma/schema.prisma       # 数据模型
└── prisma/
    └── migrations/
```

## 核心实现

### 1. 双支付系统集成

一个代码库同时支持 Stripe（海外）和微信支付+支付宝（国内）：

```typescript
// 支付路由根据用户地区自动切换
export function getPaymentProvider(userRegion: string): PaymentProvider {
  if (userRegion === 'CN') {
    return new ChinesePaymentProvider({
      wechat: wechatPayConfig,
      alipay: alipayConfig
    })
  }
  return new StripePaymentProvider(stripeConfig)
}
```

微信支付使用 JSAPI（公众号/小程序）和 H5（浏览器）两种模式，支付宝使用手机网站支付。Webhook 回调处理支付成功、订阅更新和取消事件。

### 2. 多认证提供商

NextAuth.js 配置四种认证方式：

```typescript
// auth.ts
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({ clientId, clientSecret }),
    GitHubProvider({ clientId, clientSecret }),
    WechatProvider({
      clientId: WECHAT_APP_ID,
      clientSecret: WECHAT_APP_SECRET,
      // 微信开放平台 OAuth 流程
    }),
    CredentialsProvider({
      // 邮箱 + 密码（bcrypt 加密）
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        if (user && await compare(credentials.password, user.passwordHash)) {
          return user
        }
        return null
      }
    })
  ],
  // 手机号登录通过阿里云短信验证码单独处理
}
```

### 3. AI 电商内容优化

这是脚手架里最有意思的功能——AI 模块专门优化电商平台的商品内容：

**平台规则引擎**

不同电商平台的标题风格、字数限制、关键词策略完全不同：

```typescript
export const platformRules: Record<Platform, PlatformRule> = {
  taobao: {
    name: '淘宝/天猫',
    maxTitleLength: 60,
    titleStyle: '关键词堆叠式，强调促销和价格优势',
    descriptionStyle: '图文结合，强调用户评价和销量数据',
    keywordStrategy: '长尾关键词优先，关注热搜词',
  },
  jd: {
    name: '京东',
    maxTitleLength: 45,
    titleStyle: '简洁专业，突出品牌和品质',
    descriptionStyle: '参数详细，突出正品保障',
    keywordStrategy: '品牌词+品类词组合',
  },
  pinduoduo: {
    name: '拼多多',
    maxTitleLength: 30,
    titleStyle: '极限简洁，突出低价和优惠',
    descriptionStyle: '强调团购价和已拼数量',
    keywordStrategy: '价格敏感关键词',
  },
  amazon: {
    name: 'Amazon',
    maxTitleLength: 200,
    titleStyle: 'Keyword-rich, brand first, key features listed',
    descriptionStyle: 'Bullet points with features, HTML formatting',
    keywordStrategy: 'Backend keywords, long-tail focus',
  },
  shopify: {
    name: 'Shopify',
    maxTitleLength: 70,
    titleStyle: 'Clean and descriptive, brand + product name',
    descriptionStyle: 'Story-driven, lifestyle focus',
    keywordStrategy: 'SEO-optimized, product + category',
  }
}
```

**三步 AI 优化流程**

1. **标题优化** — 根据平台规则重写商品标题，最大化搜索曝光
2. **描述生成** — 生成平台专属的商品描述，包含卖点、参数、使用场景
3. **关键词推荐** — 基于产品类别和现有内容推荐搜索关键词

```typescript
// AI 提供商抽象层，方便切换
export interface AIProvider {
  generateTitle(product: ProductInput, platform: Platform): Promise<string>
  generateDescription(product: ProductInput, platform: Platform): Promise<string>
  recommendKeywords(product: ProductInput, platform: Platform): Promise<string[]>
}

export class DeepSeekProvider implements AIProvider {
  // DeepSeek 实现...
}

export class OpenAIProvider implements AIProvider {
  // OpenAI 实现...
}
```

Prompt 模板和提供商逻辑分离，换 AI 模型只需要改一行配置。

### 4. 路由保护中间件

Next.js 中间件同时检查认证和订阅状态：

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const session = getToken(request)

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 检查订阅状态
  const subscriptionStatus = session.subscriptionStatus
  if (subscriptionStatus !== 'active') {
    return NextResponse.redirect(new URL('/pricing', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/ai/:path*']
}
```

### 5. 定价表组件

内置的定价表组件，月付/年付切换、功能对比、Checkout 集成：

```tsx
export function PricingTable({ plans, yearly }: PricingProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <PricingCard
          key={plan.id}
          plan={plan}
          yearly={yearly}
          onCheckout={() => initiateCheckout(plan.id, yearly)}
        />
      ))}
    </div>
  )
}
```

Checkout 流程根据用户地区自动选择支付渠道。

## 其他功能

- **用户仪表盘** — 订阅状态、API 使用量、账户设置
- **API 使用量追踪** — 限制和计量用户调用次数
- **邮件通知** — Nodemailer 发送注册确认、订阅提醒
- **Prisma 数据模型** — User、Account、Session、Subscription、ApiUsage 完整模型
- **Docker 部署** — Dockerfile + docker-compose 配置
- **Vercel 部署** — vercel.json 配置一键部署

## 开发经验

### 中国支付对接的复杂性

微信支付和支付宝的回调机制和 Stripe 完全不同。微信用 XML 格式通知（是的，XML），支付宝用 RSA 签名验证。回调处理需要分别实现签名验证和异步通知解析，比 Stripe Webhook 复杂得多。

### 微信 OAuth 的坑

微信 OAuth 不像 Google/GitHub 那样简单的 redirect_uri 流程。公众号网页授权需要两步：先获取 code，再用 code 换 access_token 和 openid。而且只有认证的服务号才能用网页授权，个人号不行。

### NextAuth.js 的 Provider 扩展

NextAuth.js 没有内置微信 Provider，需要自己实现。好在它的 Provider 接口很清晰，只需要实现 `authorize` 和 `profile` 方法。

### 双市场架构的取舍

一开始纠结是否要"默认海外、可选国内"，最终决定"默认国内、可选海外"。理由：海外脚手架已经够多了，这个项目的差异化价值就是中国市场适配。

## 总结

这个 SaaS Boilerplate 的核心理念是：**在中国做 SaaS，需要中国的基础设施**。不是"海外脚手架 + 自己加微信支付"那种拼凑方案，而是从架构层面就把中国市场的需求作为一等公民。

AI 电商内容优化模块是意外收获——原本只是想做个卖点，但做完后发现平台规则引擎这个思路很通用，未来可以扩展到 SEO 优化、广告文案生成等更多场景。

如果你在中国做 SaaS，不想从零搭建支付和认证体系，这个脚手架可以帮你省掉至少两周的开发时间。