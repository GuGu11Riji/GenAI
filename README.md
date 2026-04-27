# GenAI World Model — 生成式AI世界模型生态圈

<div align="center">

![GenAI World Model](https://img.shields.io/badge/GenAI-World%20Model-00F5FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJMMiA3bDEwIDUgMTAtNS0xMC01ek0yIDE3bDEwIDUgMTAtNS0xMC01LTEwIDV6TTIgMTJsMTAgNSAxMC01LTEwLTUtMTAgNXoiLz48L3N2Zz4=)
![Version](https://img.shields.io/badge/version-0.1.0-B44FFF?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-00FF88?style=for-the-badge)
![Vibe Coding](https://img.shields.io/badge/vibe-coding-FF6B35?style=for-the-badge)

**让工程与顶尖研究结合 · Gaussian Splatting · Knowledge Galaxy · Paper Agent**

[🌐 在线演示](https://genai-world-model.manus.space) · [📖 文档](#) · [🐛 Issues](https://github.com/BiaohangYuan/RCO/issues)

</div>

---

## ✨ 项目简介

**GenAI World Model** 是一个关于生成式AI领域的**世界模型生态圈**动态网站，旨在将顶尖学术研究与工程实践结合，为开发者和研究者提供一个全面的知识探索平台。

### 核心理念

> 我们专注于生成式AI领域，对该领域内的知识进行信息整合：从最早的深度信念网络，演进到VAE、GAN、Diffusion Model；考虑到生成式模型相关的应用研究，比如物理、化学、生物。让工程与顶尖研究结合，构建一个生成式领域的世界模型生态圈。

---

## 🚀 核心功能

### 🌌 星系知识图谱 (Galaxy Knowledge Graph)
- 可交互的3D知识宇宙，模拟高斯泼溅（Gaussian Splatting）视觉效果
- 节点代表核心架构、关键概念、应用领域
- 点击节点查看关联论文和项目
- 实时高亮连接关系

### 📊 每日热门项目 (Trending Projects)
- 追踪GitHub最热开源项目（Stable Diffusion、LLaMA、Mamba等）
- 每个项目关联 **5-10篇顶会论文**（NeurIPS、CVPR、ICLR、Nature等）
- 按类别、热度、增长率筛选
- 展开查看论文详情、引用数、作者信息

### ⏱️ 技术演进时间轴 (Evolution Timeline)
- 从2006年深度信念网络到2024年Sora
- 涵盖架构创新、应用突破、重要里程碑
- 交互式节点，点击展开论文详情
- 按类型和影响力筛选

### 🏆 领域大佬排行榜 (Researcher Rankings)
- 收录生成式AI领域顶尖研究者（Ian Goodfellow、Diederik Kingma等）
- 详细介绍研究价值、核心贡献、代表论文
- H-Index、引用数、影响力评级
- 展开查看完整研究背景

### 🤖 AI 智能体问答 (Agent Q&A)
- 与AI智能体对话，获取领域背景知识
- 支持技术深度解析（扩散模型、GAN、VAE、3DGS等）
- 快速提问按钮，一键获取常见问题答案
- 实时打字动画，沉浸式交互体验

---

## 🎨 设计理念

**深空量子美学（Deep Space Quantum Aesthetics）**

- **背景**：高斯泼溅粒子系统，模拟3D点云分布
- **色彩**：深空黑 + 青色/紫色/洋红渐变光谱
- **字体**：Space Grotesk（英文标题）+ IBM Plex Mono（数据）+ Noto Sans SC（中文）
- **交互**：玻璃态卡片 + 鼠标粒子排斥 + 节点脉冲动画

---

## 🛠️ 技术栈

### 前端
- **React 19** + **TypeScript** — 核心框架
- **Tailwind CSS 4** — 样式系统
- **Framer Motion** — 动画库
- **Canvas 2D API** — 粒子系统与知识图谱渲染
- **Wouter** — 客户端路由
- **shadcn/ui** — UI组件库

### 后端（规划中）
- **FastAPI** / **Express** — API服务
- **GitHub API** — 实时项目数据爬取
- **Semantic Scholar API** — 论文数据
- **OpenAI API** — 智能体问答
- **PostgreSQL** — 数据持久化

---

## 📦 快速开始

```bash
# 克隆仓库
git clone https://github.com/BiaohangYuan/RCO.git
cd RCO

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

---

## 🗺️ 路线图

### v0.1.0 (当前)
- [x] 高斯泼溅粒子背景
- [x] 星系知识图谱（静态数据）
- [x] 开源项目展示 + 论文关联
- [x] 技术演进时间轴
- [x] 领域大佬排行榜
- [x] AI智能体问答（预置知识库）

### v0.2.0 (规划中)
- [ ] GitHub API实时数据爬取
- [ ] Semantic Scholar论文API集成
- [ ] 真实LLM API接入（OpenAI/Claude）
- [ ] 用户自定义领域筛选
- [ ] 论文全文摘要生成

### v1.0.0 (长期目标)
- [ ] 后端微服务架构
- [ ] 实时数据更新（每日/每周）
- [ ] 用户账号系统
- [ ] 社区贡献功能
- [ ] 多语言支持

---

## 🤝 贡献指南

欢迎贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

---

## 📄 许可证

MIT License — 详见 [LICENSE](LICENSE)

---

## 🙏 致谢

- 参考设计：[Real Deep Research](https://realdeepresearch.github.io/)
- 视觉灵感：3D Gaussian Splatting (Kerbl et al., SIGGRAPH 2023)
- 数据来源：GitHub、Semantic Scholar、arXiv

---

<div align="center">
Made with ❤️ by the GenAI World Model Team · Vibe Coding × Research
</div>
