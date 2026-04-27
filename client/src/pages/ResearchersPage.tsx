// ResearchersPage.tsx
// Design: Deep Space Quantum Aesthetics — Researcher rankings with detailed profiles

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GaussianSplatBackground from "@/components/GaussianSplatBackground";
import { researchers, papers, type Researcher } from "@/lib/data";

const RESEARCHER_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663401955343/4rXpPdLRF3WHsVMU8dtgx6/researcher-profile-bg-GJQrRxftExccTFXVSTENmF.webp";

const IMPACT_CONFIG = {
  legendary: { label: "传奇", color: "#FFD700", icon: "✦", glow: "rgba(255,215,0,0.4)" },
  pioneer: { label: "先驱", color: "#00F5FF", icon: "◉", glow: "rgba(0,245,255,0.3)" },
  rising: { label: "新星", color: "#00FF88", icon: "↑", glow: "rgba(0,255,136,0.3)" },
};

function ResearcherCard({ researcher, rank, isSelected, onClick }: {
  researcher: Researcher;
  rank: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const impact = IMPACT_CONFIG[researcher.impact];
  const relatedPapers = papers.filter(p => researcher.papers.includes(p.id));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.05 }}
      className="glass-card overflow-hidden cursor-pointer"
      style={{
        border: isSelected ? `1px solid ${impact.color}55` : undefined,
        boxShadow: isSelected ? `0 0 30px ${impact.glow}` : undefined,
      }}
      onClick={onClick}
    >
      <div className="p-5">
        {/* Rank + impact badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Rank number */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg flex-shrink-0"
              style={{
                background: rank <= 3
                  ? `linear-gradient(135deg, ${impact.color}33, ${impact.color}11)`
                  : "rgba(255,255,255,0.05)",
                border: `1px solid ${rank <= 3 ? impact.color + "55" : "rgba(255,255,255,0.1)"}`,
                color: rank <= 3 ? impact.color : "rgba(168,184,216,0.5)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : `#${rank}`}
            </div>

            <div>
              <h3
                className="font-bold text-white text-base leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {researcher.name}
              </h3>
              {researcher.nameZh && (
                <div className="text-xs text-slate-500">{researcher.nameZh}</div>
              )}
            </div>
          </div>

          <span
            className="tag-badge flex-shrink-0"
            style={{
              background: `${impact.color}18`,
              border: `1px solid ${impact.color}44`,
              color: impact.color,
            }}
          >
            {impact.icon} {impact.label}
          </span>
        </div>

        {/* Affiliation */}
        <div
          className="text-xs mb-3 px-3 py-1.5 rounded-lg inline-block"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(168,184,216,0.7)",
            fontFamily: "'IBM Plex Mono', monospace"
          }}
        >
          🏛 {researcher.affiliation}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "H-Index", value: researcher.hIndex, color: "#00F5FF" },
            { label: "引用数", value: researcher.citations >= 1000 ? `${(researcher.citations / 1000).toFixed(0)}k` : researcher.citations, color: "#B44FFF" },
            { label: "论文数", value: relatedPapers.length + "+", color: "#FF6B35" },
          ].map(stat => (
            <div
              key={stat.label}
              className="text-center p-2 rounded-lg"
              style={{ background: `${stat.color}0a`, border: `1px solid ${stat.color}22` }}
            >
              <div
                className="font-bold text-base"
                style={{ color: stat.color, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 mono-data">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {researcher.expertise.slice(0, 4).map(exp => (
            <span key={exp} className="tag-badge tag-cyan">{exp}</span>
          ))}
        </div>

        {/* Bio preview */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
          {researcher.bioZh}
        </p>

        {/* Expand indicator */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-600 mono-data">
            {isSelected ? "▲ 收起详情" : "▼ 展开详情"}
          </div>
          {researcher.googleScholar && (
            <a
              href={researcher.googleScholar}
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
              Scholar →
            </a>
          )}
        </div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 border-t"
              style={{
                borderColor: `${impact.color}22`,
                background: `linear-gradient(to bottom, ${impact.color}08, transparent)`
              }}
            >
              {/* Research value */}
              <div className="pt-4 mb-4">
                <h4
                  className="text-sm font-bold text-slate-300 mb-2 section-header-line"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  研究价值
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {researcher.researchValue}
                </p>
              </div>

              {/* Key contributions */}
              <div className="mb-4">
                <h4
                  className="text-sm font-bold text-slate-300 mb-2 section-header-line"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  核心贡献
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {researcher.keyContributions.map((contrib, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-400"
                    >
                      <span style={{ color: impact.color, flexShrink: 0 }}>▸</span>
                      {contrib}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related papers */}
              {relatedPapers.length > 0 && (
                <div>
                  <h4
                    className="text-sm font-bold text-slate-300 mb-2 section-header-line"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    代表性论文
                  </h4>
                  <div className="flex flex-col gap-2">
                    {relatedPapers.map(paper => (
                      <div
                        key={paper.id}
                        className="p-3 rounded-lg"
                        style={{ background: `${impact.color}08`, border: `1px solid ${impact.color}22` }}
                      >
                        <div className="text-xs font-semibold text-white mb-1">{paper.title}</div>
                        <div className="flex items-center justify-between">
                          <span className="mono-data text-xs text-slate-500">
                            {paper.venue} {paper.year}
                          </span>
                          <span className="mono-data text-xs" style={{ color: impact.color }}>
                            {paper.citations >= 1000 ? `${(paper.citations / 1000).toFixed(1)}k` : paper.citations} 引用
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ResearchersPage() {
  const [selectedResearcher, setSelectedResearcher] = useState<string | null>(null);
  const [filterImpact, setFilterImpact] = useState<string>("all");

  const filtered = researchers.filter(r =>
    filterImpact === "all" || r.impact === filterImpact
  );

  const totalCitations = researchers.reduce((sum, r) => sum + r.citations, 0);

  return (
    <div className="min-h-screen" style={{ background: "#050810", paddingLeft: "64px" }}>
      <GaussianSplatBackground />

      {/* Hero */}
      <div
        className="relative h-52 flex items-end overflow-hidden"
        style={{ paddingLeft: "32px" }}
      >
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `url(${RESEARCHER_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(5,8,16,1) 0%, rgba(5,8,16,0.3) 100%)" }}
        />
        <div className="relative z-10 pb-6 px-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="tag-badge tag-orange">◉ RESEARCHERS</span>
            <span className="tag-badge tag-cyan">GENERATIVE AI HALL OF FAME</span>
          </div>
          <h1
            className="text-3xl font-black text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            领域大佬 <span className="text-glow-multi">排行榜</span>
          </h1>
        </div>
      </div>

      <div className="relative z-10 px-8 py-6">
        {/* Overview stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl">
          {[
            { label: "收录研究者", value: researchers.length, color: "#FFD700", suffix: "位" },
            { label: "总引用量", value: `${(totalCitations / 1000).toFixed(0)}k+`, color: "#00F5FF", suffix: "" },
            { label: "覆盖机构", value: "8+", color: "#B44FFF", suffix: "所" },
          ].map(stat => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div
                className="text-2xl font-black mb-1"
                style={{ color: stat.color, fontFamily: "'Space Grotesk', sans-serif", textShadow: `0 0 15px ${stat.color}55` }}
              >
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs text-slate-500 mono-data">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {[
            { key: "all", label: "全部", color: "#A8B8D8" },
            { key: "legendary", label: "✦ 传奇", color: "#FFD700" },
            { key: "pioneer", label: "◉ 先驱", color: "#00F5FF" },
            { key: "rising", label: "↑ 新星", color: "#00FF88" },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilterImpact(f.key)}
              className="text-xs px-4 py-2 rounded-lg transition-all"
              style={{
                background: filterImpact === f.key ? `${f.color}18` : "rgba(255,255,255,0.04)",
                border: `1px solid ${filterImpact === f.key ? `${f.color}55` : "rgba(255,255,255,0.1)"}`,
                color: filterImpact === f.key ? f.color : "rgba(168,184,216,0.6)",
                fontFamily: "'IBM Plex Mono', monospace"
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Researchers grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl">
          {filtered.map((researcher) => (
            <ResearcherCard
              key={researcher.id}
              researcher={researcher}
              rank={researcher.rank}
              isSelected={selectedResearcher === researcher.id}
              onClick={() => setSelectedResearcher(
                selectedResearcher === researcher.id ? null : researcher.id
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
