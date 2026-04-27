// Home.tsx
// Design: Deep Space Quantum Aesthetics
// Hero section with Gaussian Splat background, stats overview, quick access cards

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import GaussianSplatBackground from "@/components/GaussianSplatBackground";
import { projects, researchers, papers, timelineEvents } from "@/lib/data";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663401955343/4rXpPdLRF3WHsVMU8dtgx6/hero-galaxy-bg-a5AJjazHSenHmzhuce6VN7.webp";

const stats = [
  { label: "开源项目", value: projects.length + "+" , suffix: "个", color: "#00F5FF" },
  { label: "顶会论文", value: papers.length + "+", suffix: "篇", color: "#B44FFF" },
  { label: "领域大佬", value: researchers.length + "+", suffix: "位", color: "#FF6B35" },
  { label: "技术里程碑", value: timelineEvents.length + "+", suffix: "个", color: "#00FF88" },
];

const quickCards = [
  {
    id: "galaxy",
    path: "/galaxy",
    icon: "✦",
    title: "星系知识图谱",
    titleEn: "Galaxy Knowledge Graph",
    desc: "可交互的3D知识宇宙，探索生成式AI各技术节点的关联关系",
    color: "#00F5FF",
    bg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663401955343/4rXpPdLRF3WHsVMU8dtgx6/knowledge-graph-preview-TnoJYBYUvwXh9RAopMuxjj.webp",
  },
  {
    id: "projects",
    path: "/projects",
    icon: "◈",
    title: "每日热门项目",
    titleEn: "Trending Projects",
    desc: "追踪GitHub最热开源项目，每个项目关联5-10篇顶会论文",
    color: "#B44FFF",
    bg: null,
  },
  {
    id: "timeline",
    path: "/timeline",
    icon: "◎",
    title: "技术演进时间轴",
    titleEn: "Evolution Timeline",
    desc: "从RBM到Sora，梳理生成式AI完整发展脉络",
    color: "#FF6B35",
    bg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663401955343/4rXpPdLRF3WHsVMU8dtgx6/timeline-bg-kXL9TuNuoKhvZspG5WSnP8.webp",
  },
  {
    id: "researchers",
    path: "/researchers",
    icon: "◉",
    title: "领域大佬排行榜",
    titleEn: "Researcher Rankings",
    desc: "生成式AI领域顶尖研究者详细介绍，研究价值与影响力分析",
    color: "#FFD700",
    bg: null,
  },
  {
    id: "agent",
    path: "/agent",
    icon: "◆",
    title: "AI 智能体问答",
    titleEn: "AI Agent Q&A",
    desc: "与AI智能体对话，获取领域最新进展与技术背景知识",
    color: "#FF00FF",
    bg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663401955343/4rXpPdLRF3WHsVMU8dtgx6/agent-chat-bg-YN2fovLtdkdG9ztST7tFcJ.webp",
  },
];

const recentProjects = projects.slice(0, 4);

export default function Home() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: "#050810" }}>
      <GaussianSplatBackground />

      {/* Content layer */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section
          className="relative min-h-screen flex flex-col justify-center overflow-hidden"
          style={{
            paddingLeft: "80px",
          }}
        >
          {/* Background image overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(${HERO_BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(5,8,16,0.95) 0%, rgba(5,8,16,0.6) 50%, rgba(5,8,16,0.3) 100%)"
            }}
          />

          <div className="relative z-10 max-w-3xl px-8 py-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="tag-badge tag-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 pulse-cyan inline-block" />
                OPEN SOURCE · VIBE CODING
              </div>
              <div className="tag-badge tag-purple">WORLD MODEL v0.1</div>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black leading-tight mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 1.1,
              }}
            >
              <span className="text-white">生成式 AI</span>
              <br />
              <span className="text-glow-multi">世界模型生态圈</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-2"
              style={{ color: "rgba(168, 184, 216, 0.9)", fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              GenAI World Model — 让工程与顶尖研究结合
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm mb-8"
              style={{ color: "rgba(168, 184, 216, 0.6)", fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Gaussian Splatting · Knowledge Galaxy · Paper Agent · Researcher Rankings
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/galaxy">
                <button
                  className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(180,79,255,0.2))",
                    border: "1px solid rgba(0, 245, 255, 0.5)",
                    color: "#00F5FF",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: "0 0 20px rgba(0, 245, 255, 0.15)",
                  }}
                >
                  ✦ 探索星系图谱
                </button>
              </Link>
              <Link href="/agent">
                <button
                  className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(180, 79, 255, 0.15)",
                    border: "1px solid rgba(180, 79, 255, 0.4)",
                    color: "#B44FFF",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  ◆ 与AI对话
                </button>
              </Link>
              <a
                href="https://github.com/BiaohangYuan/RCO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(168, 184, 216, 0.8)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  ⬡ GitHub 开源
                </button>
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <div className="text-xs mono-data">SCROLL</div>
            <div
              className="w-px h-8"
              style={{ background: "linear-gradient(to bottom, rgba(0,245,255,0.6), transparent)" }}
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-8" style={{ paddingLeft: "96px" }}>
          <div className="max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-card p-6 text-center"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className="text-3xl font-black mb-1"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: stat.color,
                      textShadow: `0 0 20px ${stat.color}66`
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 mono-data">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Section title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2
                className="text-2xl font-bold text-white section-header-line"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                探索模块
              </h2>
              <p className="text-sm text-slate-500 mt-2 mono-data">
                EXPLORE MODULES · GENERATIVE AI ECOSYSTEM
              </p>
            </motion.div>

            {/* Quick access cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickCards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={card.path}>
                    <div
                      className="glass-card overflow-hidden cursor-pointer group h-full"
                      style={{ minHeight: "160px" }}
                    >
                      {/* Card background image */}
                      {card.bg && (
                        <div
                          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                          style={{
                            backgroundImage: `url(${card.bg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      )}
                      <div className="relative p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                            style={{
                              background: `${card.color}18`,
                              border: `1px solid ${card.color}44`,
                              color: card.color,
                              boxShadow: `0 0 12px ${card.color}22`
                            }}
                          >
                            {card.icon}
                          </div>
                          <span
                            className="text-xs mono-data opacity-50 group-hover:opacity-80 transition-opacity"
                            style={{ color: card.color }}
                          >
                            →
                          </span>
                        </div>
                        <h3
                          className="font-bold text-white mb-1 text-base"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Trending Projects */}
        <section className="py-12 px-8" style={{ paddingLeft: "96px" }}>
          <div className="max-w-6xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-6"
            >
              <div>
                <h2
                  className="text-2xl font-bold text-white section-header-line"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  近期热门项目
                </h2>
                <p className="text-xs text-slate-500 mt-1 mono-data">TRENDING OPEN SOURCE PROJECTS</p>
              </div>
              <Link href="/projects">
                <button
                  className="text-xs px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{
                    border: "1px solid rgba(0, 245, 255, 0.3)",
                    color: "#00F5FF",
                    background: "rgba(0, 245, 255, 0.05)",
                    fontFamily: "'IBM Plex Mono', monospace"
                  }}
                >
                  查看全部 →
                </button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="glass-card p-5 h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs tag-badge"
                          style={{
                            background: project.trend === "hot" ? "rgba(255,107,53,0.15)" : "rgba(0,255,136,0.1)",
                            border: `1px solid ${project.trend === "hot" ? "rgba(255,107,53,0.4)" : "rgba(0,255,136,0.3)"}`,
                            color: project.trend === "hot" ? "#FF6B35" : "#00FF88"
                          }}
                        >
                          {project.trend === "hot" ? "🔥 HOT" : project.trend === "rising" ? "↑ RISING" : "● STABLE"}
                        </span>
                        <span className="tag-badge tag-cyan">{project.language}</span>
                      </div>
                      <span className="mono-data text-xs text-slate-500">
                        ⭐ {(project.stars / 1000).toFixed(1)}k
                      </span>
                    </div>

                    <h3
                      className="font-bold text-white text-sm mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                      {project.descriptionZh}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {project.topics.slice(0, 2).map(t => (
                          <span key={t} className="tag-badge tag-purple text-xs">{t}</span>
                        ))}
                      </div>
                      <span className="mono-data text-xs" style={{ color: "#00FF88" }}>
                        +{project.weeklyGrowth}/wk
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-8 px-8 mt-8 border-t"
          style={{
            paddingLeft: "96px",
            borderColor: "rgba(0, 245, 255, 0.08)",
          }}
        >
          <div className="max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div
                className="font-bold text-glow-cyan text-sm mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                GenAI World Model
              </div>
              <div className="text-xs text-slate-600 mono-data">
                生成式AI世界模型生态圈 · Open Source · Vibe Coding
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-600">
              <a
                href="https://github.com/BiaohangYuan/RCO"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-400 transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <span>MIT License</span>
              <span>·</span>
              <span>2024-2025</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
