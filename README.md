<div align="center">

# 🌌 GenAI World Model

### 生成式AI世界模型生态圈

*让工程与顶尖研究结合 · Vibe Coding × Research*

[![Version](https://img.shields.io/badge/version-0.2.0-B44FFF?style=flat-square)](https://github.com/GuGu11Riji/GenAI)
[![License](https://img.shields.io/badge/license-MIT-00FF88?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19-00F5FF?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![tRPC](https://img.shields.io/badge/tRPC-11-398CCB?style=flat-square)](https://trpc.io)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

**[🌐 在线演示](https://genaiworld-4rxppdlr.manus.space)** · **[📖 文档](#-快速开始)** · **[🐛 Issues](https://github.com/GuGu11Riji/GenAI/issues)**

</div>

---

## 📖 项目简介

**GenAI World Model** 是一个关于生成式AI领域的**世界模型生态圈**动态网站，采用「深空量子美学」设计语言，以高斯泼溅（Gaussian Splatting）粒子宇宙为核心视觉，将顶尖学术研究与工程实践融为一体。

> **设计理念**：我们专注于生成式AI领域，对该领域内的知识进行信息整合——从最早的深度信念网络，演进到 VAE、GAN、Diffusion Model；考虑到生成式模型相关的应用研究，比如物理、化学、生物。让工程与顶尖研究结合，构建一个生成式领域的世界模型生态圈。

---

## ✨ 核心功能

| 模块 | 功能描述 | 技术实现 |
|------|---------|---------|
| 🌌 **星系知识图谱** | 可交互3D知识宇宙，20+节点6色聚类，点击查看关联论文 | Canvas 2D + 自定义物理引擎 |
| 📊 **开源项目展示** | GitHub Trending实时数据，每个项目关联5-10篇顶会论文 | GitHub API + Semantic Scholar API |
| ⏱️ **技术演进时间轴** | 2006→2024年13个里程碑，从RBM到Sora，可筛选展开 | Framer Motion + 静态知识库 |
| 🏆 **领域大佬排行榜** | 8位顶尖研究者详细档案，H-Index、引用数、核心贡献 | 精心整理的研究者数据库 |
| 🤖 **AI智能体问答** | 真实LLM驱动，多轮对话，Markdown渲染，历史持久化 | tRPC + invokeLLM + MySQL |
| 🎆 **高斯泼溅背景** | 数百个彩色粒子聚类，鼠标排斥交互，实时60fps动画 | Canvas 2D 粒子系统 |

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    GenAI World Model                        │
├─────────────────┬───────────────────┬───────────────────────┤
│   Frontend      │    Backend        │    Data Sources       │
│   (React 19)    │   (Express+tRPC)  │                       │
├─────────────────┼───────────────────┼───────────────────────┤
│ • GaussianSplat │ • /api/trpc       │ • GitHub API          │
│   Background    │   ├ projects.*    │   (Trending repos)    │
│ • GalaxyGraph   │   ├ papers.*      │ • Semantic Scholar    │
│ • ProjectsPage  │   ├ agent.chat    │   (Academic papers)   │
│ • TimelinePage  │   ├ auth.*        │ • Built-in LLM        │
│ • ResearchersPage│  └ stats.*       │   (AI responses)      │
│ • AgentPage     │ • MySQL/TiDB      │ • Static knowledge    │
│                 │   (Drizzle ORM)   │   base (fallback)     │
└─────────────────┴───────────────────┴───────────────────────┘
```

---

## 🚀 快速开始

### 环境要求

- Node.js ≥ 18
- pnpm ≥ 9
- MySQL 8.0+（可选，有静态数据兜底）

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/GuGu11Riji/GenAI.git
cd GenAI

# 安装依赖
pnpm install

# 配置环境变量（复制示例文件）
cp .env.example .env
# 编辑 .env 填入数据库连接等配置

# 推送数据库 Schema（需要 DATABASE_URL）
pnpm db:push

# 启动开发服务器
pnpm dev
```

开发服务器启动后访问 http://localhost:3000

### 生产构建

```bash
pnpm build
pnpm start
```

---

## ⚙️ 环境变量

在项目根目录创建 `.env` 文件：

```env
# 数据库（MySQL/TiDB）
DATABASE_URL=mysql://user:password@host:3306/genai_world_model

# JWT 会话密钥
JWT_SECRET=your-super-secret-jwt-key

# Manus 内置 LLM API（部署在 Manus 平台时自动注入）
BUILT_IN_FORGE_API_URL=https://api.manus.im/forge
BUILT_IN_FORGE_API_KEY=your-forge-api-key

# OAuth（可选，用于用户登录）
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OAUTH_SERVER_URL=https://api.manus.im/oauth
VITE_APP_ID=your-app-id
```

> **注意**：在 Manus 平台部署时，`BUILT_IN_FORGE_API_KEY`、`DATABASE_URL` 等系统变量会自动注入，无需手动配置。

---

## 📁 项目结构

```
GenAI/
├── client/                    # 前端 React 应用
│   └── src/
│       ├── components/
│       │   ├── GaussianSplatBackground.tsx  # 高斯泼溅粒子背景
│       │   ├── GalaxyGraph.tsx              # 星系知识图谱
│       │   └── SideNav.tsx                  # 侧边导航栏
│       ├── pages/
│       │   ├── Home.tsx                     # 主页
│       │   ├── GalaxyPage.tsx               # 星系图谱页
│       │   ├── ProjectsPage.tsx             # 开源项目页
│       │   ├── TimelinePage.tsx             # 时间轴页
│       │   ├── ResearchersPage.tsx          # 大佬排行榜页
│       │   └── AgentPage.tsx                # AI问答页（LLM接入）
│       └── lib/
│           ├── data.ts                      # 静态知识库（兜底数据）
│           └── trpc.ts                      # tRPC 客户端
├── server/
│   ├── routers.ts                           # tRPC 路由（核心API）
│   ├── db.ts                                # 数据库查询助手
│   └── _core/                               # 框架核心（OAuth、LLM等）
├── drizzle/
│   └── schema.ts                            # 数据库 Schema
│       # 包含: users, trending_projects,
│       #       academic_papers, chat_messages, fetch_logs
├── .github/
│   └── workflows/
│       └── ci.yml                           # GitHub Actions CI/CD
└── README.md
```

---

## 🗄️ 数据库 Schema

```
users               — 用户账号（Manus OAuth）
trending_projects   — GitHub热门项目缓存
academic_papers     — 学术论文缓存（Semantic Scholar）
chat_messages       — AI对话历史
fetch_logs          — 数据抓取日志
```

---

## 🔌 API 接口

所有接口通过 tRPC 暴露，端点为 `/api/trpc`：

| 接口 | 类型 | 说明 |
|------|------|------|
| `projects.list` | Query | 获取热门项目列表（支持分类筛选） |
| `projects.refresh` | Mutation | 从 GitHub API 刷新项目数据 |
| `papers.search` | Query | 搜索学术论文（DB缓存+Semantic Scholar） |
| `agent.chat` | Mutation | 与AI智能体对话（LLM驱动） |
| `agent.history` | Query | 获取对话历史 |
| `stats.overview` | Query | 获取数据统计概览 |
| `auth.me` | Query | 获取当前用户信息 |
| `auth.logout` | Mutation | 退出登录 |

---

## 🎨 设计系统

**深空量子美学（Deep Space Quantum Aesthetics）**

```css
/* 核心色彩 */
--deep-space:    #050810   /* 背景基底 */
--cyan-glow:     #00F5FF   /* 主交互色 */
--purple-glow:   #B44FFF   /* 次要强调 */
--magenta-glow:  #FF00FF   /* 第三强调 */
--orange-accent: #FF6B35   /* 应用领域 */
--green-live:    #00FF88   /* 在线状态 */

/* 字体系统 */
--font-display:  'Space Grotesk'  /* 英文标题 */
--font-mono:     'IBM Plex Mono'  /* 数据/代码 */
--font-chinese:  'Noto Sans SC'   /* 中文内容 */
```

---

## 🗺️ 路线图

### v0.1.0 ✅ 已完成
- [x] 高斯泼溅粒子背景（Canvas 2D）
- [x] 星系知识图谱（20+节点，可交互）
- [x] 开源项目展示 + 论文关联（静态数据）
- [x] 技术演进时间轴（2006-2024）
- [x] 领域大佬排行榜
- [x] AI智能体问答（预置知识库）

### v0.2.0 ✅ 当前版本
- [x] 全栈升级（tRPC + MySQL + Drizzle ORM）
- [x] GitHub Trending API 实时数据接入
- [x] Semantic Scholar 论文 API 集成
- [x] 真实 LLM API 接入（多轮对话 + 历史持久化）
- [x] 数据库缓存层（5张表）
- [x] GitHub Actions CI/CD 配置

### v0.3.0 🔜 规划中
- [ ] 用户账号系统（Manus OAuth）
- [ ] 每日自动数据更新（定时任务）
- [ ] 用户自定义领域订阅
- [ ] 论文全文摘要生成
- [ ] 知识图谱节点编辑功能

### v1.0.0 🎯 长期目标
- [ ] 多语言支持（英文/中文/日文）
- [ ] 社区贡献功能（提交项目/论文）
- [ ] 移动端 App（React Native）
- [ ] 开放 API（供第三方集成）

---

## 🤝 贡献指南

欢迎任何形式的贡献！

```bash
# Fork 仓库后
git checkout -b feature/your-feature-name
git commit -m "feat: add amazing feature"
git push origin feature/your-feature-name
# 开启 Pull Request
```

**贡献方向**：
- 扩充知识库数据（`client/src/lib/data.ts`）
- 添加新的研究者档案
- 完善论文关联数据
- 改进可视化效果
- 修复 Bug

---

## 📄 许可证

[MIT License](LICENSE) © 2024-2025 GenAI World Model Team

---

## 🙏 致谢

- 视觉灵感：[Real Deep Research](https://realdeepresearch.github.io/) · [3D Gaussian Splatting](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)
- 数据来源：[GitHub API](https://docs.github.com/en/rest) · [Semantic Scholar](https://api.semanticscholar.org/) · [arXiv](https://arxiv.org/)
- 技术栈：[React](https://react.dev) · [tRPC](https://trpc.io) · [Drizzle ORM](https://orm.drizzle.team) · [Framer Motion](https://www.framer.com/motion/)

---

<div align="center">
  <sub>Made with ❤️ by the GenAI World Model Team · Vibe Coding × Research</sub>
</div>
