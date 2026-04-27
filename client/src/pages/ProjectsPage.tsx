// ProjectsPage.tsx
// Design: Deep Space Quantum Aesthetics — Open source projects with paper associations

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GaussianSplatBackground from "@/components/GaussianSplatBackground";
import { projects, papers, categories, type OpenSourceProject, type Paper } from "@/lib/data";

function PaperCard({ paper }: { paper: Paper }) {
  return (
    <div
      className="p-3 rounded-lg"
      style={{ background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.12)" }}
    >
      <div className="text-xs font-semibold text-white leading-tight mb-1.5">
        {paper.title}
      </div>
      <div className="text-xs text-slate-500 mb-2 line-clamp-2">{paper.abstract}</div>
      <div className="flex items-center justify-between flex-wrap gap-1">
        <div className="flex items-center gap-1.5">
          <span className="tag-badge tag-cyan">{paper.venue}</span>
          <span className="tag-badge" style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)", color: "#FF6B35" }}>{paper.year}</span>
        </div>
        <span className="mono-data text-xs text-slate-500">
          {paper.citations >= 1000 ? `${(paper.citations / 1000).toFixed(1)}k` : paper.citations} 引用
        </span>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {paper.tags.slice(0, 3).map(t => (
          <span key={t} className="tag-badge tag-purple">{t}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, isSelected, onClick }: {
  project: OpenSourceProject;
  isSelected: boolean;
  onClick: () => void;
}) {
  const relatedPapers = papers.filter(p => project.papers.includes(p.id));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`glass-card overflow-hidden cursor-pointer transition-all duration-300 ${isSelected ? "col-span-2" : ""}`}
      style={{
        border: isSelected ? "1px solid rgba(0,245,255,0.4)" : undefined,
        boxShadow: isSelected ? "0 0 30px rgba(0,245,255,0.1)" : undefined,
      }}
      onClick={onClick}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="tag-badge text-xs"
              style={{
                background: project.trend === "hot" ? "rgba(255,107,53,0.15)" : project.trend === "rising" ? "rgba(0,255,136,0.1)" : "rgba(168,184,216,0.1)",
                border: `1px solid ${project.trend === "hot" ? "rgba(255,107,53,0.4)" : project.trend === "rising" ? "rgba(0,255,136,0.3)" : "rgba(168,184,216,0.2)"}`,
                color: project.trend === "hot" ? "#FF6B35" : project.trend === "rising" ? "#00FF88" : "#A8B8D8"
              }}
            >
              {project.trend === "hot" ? "🔥 HOT" : project.trend === "rising" ? "↑ RISING" : "● STABLE"}
            </span>
            <span className="tag-badge tag-cyan">{project.language}</span>
            <span className="tag-badge tag-purple">{project.category}</span>
          </div>
          <div className="text-right">
            <div className="mono-data text-sm text-white font-bold">
              ⭐ {project.stars >= 1000 ? `${(project.stars / 1000).toFixed(1)}k` : project.stars}
            </div>
            <div className="mono-data text-xs" style={{ color: "#00FF88" }}>
              +{project.weeklyGrowth}/wk
            </div>
          </div>
        </div>

        {/* Project name */}
        <h3
          className="font-bold text-white text-base mb-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {project.name}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          {project.descriptionZh}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.topics.slice(0, 4).map(t => (
            <span key={t} className="tag-badge" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(168,184,216,0.6)", fontSize: "0.65rem" }}>
              {t}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 mono-data text-slate-500">
            <span>⑂ {project.forks >= 1000 ? `${(project.forks / 1000).toFixed(1)}k` : project.forks}</span>
            <span>📄 {relatedPapers.length} 篇论文</span>
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-xs px-3 py-1 rounded-md transition-all hover:scale-105"
            style={{
              background: "rgba(0,245,255,0.08)",
              border: "1px solid rgba(0,245,255,0.25)",
              color: "#00F5FF",
              fontFamily: "'IBM Plex Mono', monospace"
            }}
          >
            GitHub →
          </a>
        </div>
      </div>

      {/* Expanded: papers section */}
      <AnimatePresence>
        {isSelected && relatedPapers.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-2 border-t"
              style={{ borderColor: "rgba(0,245,255,0.1)" }}
            >
              <h4
                className="text-sm font-bold text-slate-300 mb-3 section-header-line"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                关联顶会论文 ({relatedPapers.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {relatedPapers.map(paper => (
                  <PaperCard key={paper.id} paper={paper} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"stars" | "growth" | "trend">("stars");

  const filtered = projects
    .filter(p => selectedCategory === "all" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "stars") return b.stars - a.stars;
      if (sortBy === "growth") return b.weeklyGrowth - a.weeklyGrowth;
      const trendOrder = { hot: 0, rising: 1, stable: 2 };
      return trendOrder[a.trend] - trendOrder[b.trend];
    });

  return (
    <div className="min-h-screen" style={{ background: "#050810", paddingLeft: "64px" }}>
      <GaussianSplatBackground />

      <div className="relative z-10 px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="tag-badge tag-orange">◈ OPEN SOURCE</span>
            <span className="tag-badge tag-cyan">DAILY TRENDING</span>
          </div>
          <h1
            className="text-3xl font-black text-white mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            开源项目 <span className="text-glow-cyan">生态圈</span>
          </h1>
          <p className="text-sm text-slate-500 mono-data">
            每个项目关联 5-10 篇顶会论文 · 点击项目卡片展开论文详情
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: selectedCategory === cat.id ? `${cat.color}22` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${selectedCategory === cat.id ? cat.color + "66" : "rgba(255,255,255,0.1)"}`,
                  color: selectedCategory === cat.id ? cat.color : "rgba(168,184,216,0.6)",
                  fontFamily: "'IBM Plex Mono', monospace"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex gap-2 ml-auto">
            {[
              { key: "stars", label: "⭐ Stars" },
              { key: "growth", label: "↑ 增长" },
              { key: "trend", label: "🔥 热度" },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setSortBy(s.key as typeof sortBy)}
                className="text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: sortBy === s.key ? "rgba(0,245,255,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${sortBy === s.key ? "rgba(0,245,255,0.4)" : "rgba(255,255,255,0.1)"}`,
                  color: sortBy === s.key ? "#00F5FF" : "rgba(168,184,216,0.6)",
                  fontFamily: "'IBM Plex Mono', monospace"
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <AnimatePresence>
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedProject === project.id}
                onClick={() => setSelectedProject(
                  selectedProject === project.id ? null : project.id
                )}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-600 mono-data">
            暂无该分类的项目
          </div>
        )}
      </div>
    </div>
  );
}
