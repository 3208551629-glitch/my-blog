export interface Project {
  name: string
  description: string
  category: string
  tags: string[]
  repo?: string
  url?: string
  status: 'active' | 'stable' | 'archived'
  featured?: boolean
}

const GH = 'https://github.com/3208551629-glitch'

export const categories = [
  '全部',
  '工具包',
  'AI/Agent',
  '开发工具',
  'SaaS/Web',
]

export const projects: Project[] = [
  // ── 工具包 (Toolkits Monorepo) ──────────────────────
  { name: 'xf', description: '数据与文件工具箱 — 27 个子命令：文件操作、哈希计算、JSON/YAML/XML/TOML/CSV 格式处理、Base64/颜色/正则/URL 等工具', category: '工具包', tags: ['CLI', '文件', '数据', '格式'], repo: `${GH}/toolkits`, status: 'active', featured: true },
  { name: 'gitkit', description: 'Git 工具包 — 仓库清理、日志分析、统计、Hooks 管理、活动脉搏、智能差异对比', category: '工具包', tags: ['Git', 'CLI', '差异'], repo: `${GH}/toolkits`, status: 'stable' },
  { name: 'apikit', description: 'API 工具包 — 接口测试、快速构建、可视化、差异对比、哨兵监控、Webhook 测试', category: '工具包', tags: ['API', 'CLI', '测试'], repo: `${GH}/toolkits`, status: 'stable' },
  { name: 'seckit', description: '安全与配置工具包 — 依赖审计、配置检查、环境变量管理、许可证合规、端口扫描', category: '工具包', tags: ['安全', '配置', '审计'], repo: `${GH}/toolkits`, status: 'stable' },
  { name: 'opskit', description: '运维工具包 — Docker 管理、监控、定时任务、缓存清理、包体积分析、数据库模式管理', category: '工具包', tags: ['运维', 'Docker', '监控'], repo: `${GH}/toolkits`, status: 'stable' },
  { name: 'flowkit', description: '工作流引擎 — 工作流编排、Agent 代理执行、项目规划、自动化构建、AI 内容生成', category: '工具包', tags: ['工作流', 'Agent', 'AI'], repo: `${GH}/toolkits`, status: 'active' },
  { name: 'promptkit', description: 'Prompt 工程工具包 — 提示词测试、优化锻造、对比评估、模板管理', category: '工具包', tags: ['Prompt', 'AI', '测试'], repo: `${GH}/toolkits`, status: 'active' },
  { name: 'devkit', description: '开发工具包 — 变更日志、README 生成、徽章生成、代码质量分析、CI/CD 流水线、Schema 管理', category: '工具包', tags: ['开发', 'CLI', '文档'], repo: `${GH}/toolkits`, status: 'stable' },

  // ── AI/Agent ─────────────────────────────────────────
  { name: 'everything-claude-code', description: 'Claude Code 全能工具集 — 47 个 Agent、181 个 Skill、自动 Hook 工作流', category: 'AI/Agent', tags: ['AI', 'Claude', '工具集'], repo: `${GH}/everything-claude-code`, status: 'active', featured: true },
  { name: 'landing-ai', description: 'AI 落地页生成器 — 输入业务描述，AI 自动生成落地页', category: 'AI/Agent', tags: ['AI', '生成', 'Next.js'], repo: `${GH}/landing-ai`, status: 'active', featured: true },
  { name: 'localize-ai', description: 'AI 本地化翻译工具', category: 'AI/Agent', tags: ['AI', '本地化', '翻译'], repo: `${GH}/localize-ai`, status: 'active' },
  { name: 'agent-insight', description: 'Agent 洞察分析工具', category: 'AI/Agent', tags: ['AI', '分析'], repo: `${GH}/agent-insight`, status: 'active' },

  // ── 开发工具 ─────────────────────────────────────────
  { name: 'mcp-hub', description: 'MCP 服务器集线器 — 统一管理 MCP 服务器配置与发现', category: '开发工具', tags: ['MCP', '集线器', 'AI'], repo: `${GH}/mcp-hub`, status: 'active', featured: true },
  { name: 'codesnap', description: '代码截图工具 — 生成美观的代码分享图片', category: '开发工具', tags: ['代码', '截图', '分享'], repo: `${GH}/codesnap`, status: 'active' },
  { name: 'sqlboard', description: 'SQL 工作台 — 数据库管理 Web 界面', category: '开发工具', tags: ['SQL', '数据库'], repo: `${GH}/sqlboard`, status: 'stable' },
  { name: 'reposcope', description: '仓库范围分析工具', category: '开发工具', tags: ['仓库', '分析'], repo: `${GH}/reposcope`, status: 'stable' },

  // ── SaaS/Web ─────────────────────────────────────────
  { name: 'saas-boilerplate', description: 'SaaS 项目脚手架 — Next.js + Stripe + Prisma 全栈模板', category: 'SaaS/Web', tags: ['SaaS', '脚手架', 'Next.js', 'Stripe'], repo: `${GH}/saas-boilerplate`, status: 'active', featured: true },
  { name: 'chazhao', description: '查找工具 — RAG 知识助手', category: 'SaaS/Web', tags: ['RAG', '搜索', 'FastAPI'], repo: `${GH}/chazhao`, status: 'stable' },
  { name: 'invoice-chaser', description: '发票追踪工具', category: 'SaaS/Web', tags: ['发票', '财务'], repo: `${GH}/invoice-chaser`, status: 'stable' },
  { name: '远程cc', description: '远程 Claude Code 工具', category: 'SaaS/Web', tags: ['Claude', '远程'], repo: `${GH}/remote-cc`, status: 'active' },
]
