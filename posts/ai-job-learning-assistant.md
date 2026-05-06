---
title: AI 驱动的求职学习助手 - 全栈项目实战
date: 2026-05-06
tags:
  - 项目实战
  - Electron
  - 微信小程序
  - Android
  - Kotlin
  - AI
  - Claude
category: 项目实战
---

# AI 驱动的求职学习助手 - 全栈项目实战

这是一个 AI 驱动的求职学习助手项目，包含 Electron 桌面应用、微信小程序和 Android 原生应用三个版本。帮助用户分析岗位需求、生成学习路线、追踪学习进度、准备面试。

## 项目背景

在求职过程中，我们经常面临以下痛点：

- 面对海量岗位描述，难以快速提取关键技能要求
- 不知道如何系统性地准备面试
- 学习路线缺乏个性化指导
- 学习进度难以追踪和复盘

这个项目旨在通过 AI 技术解决这些问题，为求职者提供一站式的学习辅助工具。

## 技术架构

项目采用三端架构设计：

```
xuexi/
├── job-learning-assistant/   # Electron 桌面应用
├── miniprogram/              # 微信小程序
├── android-app/              # Android 原生应用
├── cloudfunctions/           # 云函数
│   ├── ai-proxy/             # AI API 代理
│   └── login/                # 登录云函数
└── CLAUDE.md                 # 项目说明文档
```

### 桌面版技术栈

| 技术 | 用途 |
|------|------|
| Electron | 跨平台桌面应用框架 |
| React 18 | UI 框架 |
| TypeScript 5.6 | 类型安全 |
| Vite 5 | 构建工具 |
| Tailwind CSS | 样式方案 |
| shadcn/ui | 组件库 |
| sql.js | 本地 SQLite 数据库 |
| Zustand 5 | 状态管理 |
| Anthropic SDK | AI 能力 |
| Recharts | 图表可视化 |

### 小程序版技术栈

| 技术 | 用途 |
|------|------|
| 微信小程序原生 | 小程序框架 |
| 微信云开发 | 后端服务 |
| 云函数 | AI API 代理 |

### Android 版技术栈

| 技术 | 用途 |
|------|------|
| Kotlin 1.9.x | 开发语言 |
| Jetpack Compose | UI 框架 |
| Material Design 3 | 设计系统 |
| MVVM + Clean Architecture | 架构模式 |
| Hilt | 依赖注入 |
| Room 2.6.x | 本地数据库 |
| Retrofit 2.9.x | 网络请求 |
| Kotlin Coroutines + Flow | 异步处理 |
| Android Keystore | 安全存储 |

## 核心功能模块

### 1. JD 分析

用户粘贴岗位描述，AI 自动提取：

- 岗位名称、公司信息
- 必备技能和加分技能
- 经验和学历要求
- 职责和福利
- 薪资范围

```javascript
// AI 分析 JD 的核心 Prompt
const prompt = `你是一个专业的招聘分析师。请分析以下岗位描述，提取关键信息。

岗位描述：
${jdContent}

请以 JSON 格式返回分析结果，包含以下字段：
{
  "jobTitle": "岗位名称",
  "company": "公司名称",
  "requiredSkills": [
    {
      "name": "技能名称",
      "category": "技能分类",
      "importance": "重要程度",
      "level": "要求水平"
    }
  ],
  ...
}`;
```

### 2. 技能档案

管理用户的技能清单：

- 添加/编辑/删除技能
- 标记技能熟练度
- 关联学习资源
- 技能分类管理

### 3. 学习路线

基于岗位要求和用户现有技能，AI 生成个性化学习路线：

- 分阶段学习计划
- 每个阶段的学习目标
- 推荐学习资源
- 学习里程碑

### 4. 进度追踪

可视化学习进度：

- 学习时长统计
- 技能掌握进度
- 学习曲线图表
- 日报/周报生成

### 5. 面试准备

AI 生成面试题库：

- 技术面试题
- 行为面试题
- 场景模拟题
- 参考答案和要点

### 6. 复习提醒

基于遗忘曲线的复习机制：

- 智能复习提醒
- 知识点强化
- 学习效果评估

## 技术亮点

### AI 集成方案

项目使用 Anthropic Claude API 作为 AI 引擎，有两种调用方式：

**桌面版 - 主进程直接调用**

```typescript
// electron/ai.ts
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY,
  baseURL: process.env.VITE_ANTHROPIC_URL
})

const message = await anthropic.messages.create({
  model: 'claude-sonnet-4-6-20250514',
  max_tokens: 4096,
  messages: [{ role: 'user', content: prompt }]
})
```

**小程序版 - 云函数代理**

```javascript
// cloudfunctions/ai-proxy/index.js
exports.main = async (event, context) => {
  const { action, ...data } = event

  switch (action) {
    case 'analyzeJD':
      result = await analyzeJDHandler(data.jdContent)
      break
    case 'generateLearningPath':
      result = await generateLearningPathHandler(data)
      break
    // ...
  }

  return { success: true, data: result }
}
```

### 数据存储方案

**桌面版 - 本地 SQLite**

使用 sql.js 在浏览器端运行 SQLite，数据完全本地化，保护用户隐私。

```typescript
// 数据库初始化
const db = new SQL.Database()

db.run(`
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    level TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)
```

**小程序版 - 云开发数据库**

利用微信云开发的数据库能力，支持多端同步。

```javascript
// 数据库操作
const db = wx.cloud.database()
const skills = db.collection('skills')

await skills.add({
  data: {
    name: skillName,
    category: category,
    level: level,
    userId: openid
  }
})
```

### 状态管理

**桌面版 - Zustand**

```typescript
// stores/appStore.ts
import { create } from 'zustand'

interface AppState {
  currentJob: Job | null
  skills: Skill[]
  error: string | null
  setCurrentJob: (job: Job | null) => void
  addSkill: (skill: Skill) => void
  setError: (error: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentJob: null,
  skills: [],
  error: null,
  setCurrentJob: (job) => set({ currentJob: job }),
  addSkill: (skill) => set((state) => ({
    skills: [...state.skills, skill]
  })),
  setError: (error) => set({ error })
}))
```

**小程序版 - globalData**

```javascript
// app.js
App({
  globalData: {
    userInfo: null,
    currentJob: null,
    skills: []
  }
})
```

**Android 版 - ViewModel + StateFlow**

```kotlin
// presentation/skillprofile/SkillProfileViewModel.kt
@HiltViewModel
class SkillProfileViewModel @Inject constructor(
    private val skillRepository: SkillRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<SkillProfileUiState>(SkillProfileUiState.Loading)
    val uiState: StateFlow<SkillProfileUiState> = _uiState.asStateFlow()

    fun loadSkills() {
        viewModelScope.launch {
            skillRepository.getAllSkills()
                .catch { e -> _uiState.value = SkillProfileUiState.Error(e.message ?: "未知错误") }
                .collect { skills ->
                    _uiState.value = SkillProfileUiState.Success(skills)
                }
        }
    }
}
```

## Android 版本特色实现

### Clean Architecture 分层

Android 版本采用 Clean Architecture 架构，分为三层：

```
android-app/app/src/main/java/com/joblearningassistant/
├── domain/           # 领域层（纯 Kotlin，不依赖 Android）
│   ├── model/        # 业务实体
│   ├── repository/   # 仓库接口
│   └── usecase/      # 用例类
├── data/             # 数据层
│   ├── local/        # Room 数据库
│   ├── remote/       # 网络请求
│   └── repository/   # 仓库实现
└── presentation/     # UI 层
    ├── theme/        # Material Design 3 主题
    ├── navigation/   # 导航
    └── */            # 各功能页面
```

### 安全存储 API Key

Android 版本使用 Android Keystore 加密存储 API 密钥：

```kotlin
// util/SecureStorage.kt
class SecureStorage @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val masterKey = MasterKey.Builder(context)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .build()

    private val encryptedPrefs = EncryptedSharedPreferences.create(
        context,
        "secure_prefs",
        masterKey,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )

    fun saveApiKey(apiKey: String) {
        encryptedPrefs.edit().putString("api_key", apiKey).apply()
    }

    fun getApiKey(): String? {
        return encryptedPrefs.getString("api_key", null)
    }
}
```

### Jetpack Compose UI

使用 Jetpack Compose 和 Material Design 3 构建现代化 UI：

```kotlin
// presentation/jdinput/JdInputScreen.kt
@Composable
fun JdInputScreen(
    viewModel: JdInputViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("JD 分析") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                )
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp)
        ) {
            OutlinedTextField(
                value = uiState.jdContent,
                onValueChange = { viewModel.updateJdContent(it) },
                label = { Text("粘贴岗位描述") },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
            )

            Spacer(modifier = Modifier.height(16.dp))

            Button(
                onClick = { viewModel.analyzeJD() },
                enabled = uiState.jdContent.isNotBlank() && !uiState.isLoading,
                modifier = Modifier.fillMaxWidth()
            ) {
                if (uiState.isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(24.dp),
                        color = MaterialTheme.colorScheme.onPrimary
                    )
                } else {
                    Text("分析岗位")
                }
            }
        }
    }
}
```

## 开发经验总结

### 1. AI Prompt 设计

- 要求返回纯 JSON 格式，便于程序解析
- 使用正则表达式提取花括号/方括号内容
- 错误消息使用中文，面向终端用户

```javascript
const extractJson = (text) => {
  // 尝试匹配 JSON 对象
  const objectMatch = text.match(/\{[\s\S]*\}/)
  if (objectMatch) {
    return JSON.parse(objectMatch[0])
  }

  // 尝试匹配 JSON 数组
  const arrayMatch = text.match(/\[[\s\S]*\]/)
  if (arrayMatch) {
    return JSON.parse(arrayMatch[0])
  }

  throw new Error('Failed to parse JSON from response')
}
```

### 2. 跨平台架构

通过合理的架构设计，三个版本共享：

- AI Prompt 设计
- 业务逻辑
- 数据结构定义

差异化的部分：

| 功能 | 桌面版 | 小程序版 | Android 版 |
|------|--------|----------|------------|
| UI 框架 | React + shadcn/ui | 原生组件 | Jetpack Compose + MD3 |
| 数据存储 | 本地 SQLite | 云开发数据库 | Room (SQLite) |
| AI 调用 | 主进程直接调用 | 云函数代理 | Retrofit 直接调用 |
| 状态管理 | Zustand | App globalData | ViewModel + StateFlow |
| 图表 | Recharts | echarts-for-weixin | Compose Canvas |
| 用户系统 | 无 | 微信登录 | 无 |
| 安全存储 | 无 | 云函数环境变量 | Android Keystore |

### 3. 类型安全

桌面版使用 TypeScript 严格模式：

```typescript
// 类型定义
interface Skill {
  id: number
  name: string
  category: SkillCategory
  level: SkillLevel
  createdAt: Date
}

type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'other'
type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'
```

### 4. 错误处理

在系统边界进行验证：

```typescript
// 用户输入验证
function validateJDContent(content: unknown): string {
  if (typeof content !== 'string') {
    throw new Error('岗位描述必须是文本')
  }
  if (content.trim().length < 50) {
    throw new Error('岗位描述内容过短')
  }
  return content.trim()
}

// AI 响应验证
function validateAIResponse(response: unknown): AnalysisResult {
  if (!response || typeof response !== 'object') {
    throw new Error('AI 响应格式错误')
  }
  // 更多验证...
  return response as AnalysisResult
}
```

## 项目收获

通过这个项目，我学到了：

1. **AI 应用开发** - 如何将 AI 能力集成到应用中，设计有效的 Prompt
2. **跨平台开发** - Electron、微信小程序和 Android 原生的开发经验
3. **状态管理** - Zustand、globalData 和 ViewModel + StateFlow 的最佳实践
4. **数据库设计** - SQLite、云开发数据库和 Room 的使用场景
5. **类型安全** - TypeScript 和 Kotlin 在大型项目中的应用
6. **现代 Android 开发** - Jetpack Compose、Clean Architecture、Hilt 依赖注入
7. **安全存储** - Android Keystore 加密存储敏感信息

## 未来规划

- [ ] 添加简历生成功能
- [ ] 集成更多 AI 模型
- [ ] 支持团队协作学习
- [ ] 添加学习社区功能
- [ ] 优化 AI 响应速度
- [ ] iOS 版本开发（SwiftUI）

## 总结

这个项目是一个完整的全栈 AI 应用，涵盖了前端、后端、移动端、AI 集成、数据库等多个技术领域。通过实际开发，我深刻体会到了 AI 技术在实际应用中的强大能力，也积累了宝贵的项目经验。

三个版本各有特色：
- **桌面版**：适合深度学习、本地数据隐私保护
- **小程序版**：随时随地使用、微信生态便捷分享
- **Android 版**：原生性能优秀、Material Design 3 现代化 UI

如果你也对 AI 应用开发感兴趣，欢迎交流讨论！
