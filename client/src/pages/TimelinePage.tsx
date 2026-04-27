// TimelinePage.tsx
// Design: Deep Space Quantum Aesthetics — Generative AI evolution timeline

import { useState } from "react";
import { motion } from "framer-motion";
import GaussianSplatBackground from "@/components/GaussianSplatBackground";
import { timelineEvents, papers, type TimelineEvent } from "@/lib/data";

const TIMELINE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663401955343/4rXpPdLRF3WHsVMU8dtgx6/timeline-bg-kXL9TuNuoKhvZspG5WSnP8.webp";

const IMPACT_STYLES = {
  revolutionary: {
    color: "#FF6B35",
    label: "革命性突破",
    size: "large",
    glow: "rgba(255,107,53,0.4)",
  },
  significant: {
    color: "#00F5FF",
    label: "重要进展",
    size: "medium",
    glow: "rgba(0,245,255,0.3)",
  },
  notable: {
    color: "#B44FFF",
    label: "值得关注",
    size: "small",
    glow: "rgba(180,79,255,0.2)",
  },
};

const TYPE_ICONS: Record<string, string> = {
  architecture: "⬡",
  application: "◈",
  milestone: "✦",
  dataset: "◎",
};

const TYPE_LABELS: Record<string, string> = {
  architecture: "架构创新",
  application: "应用突破",
  milestone: "重要里程碑",
  dataset: "数据集",
};

function TimelineNode({ event, index, isSelected, onClick }: {
  event: TimelineEvent;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const impact = IMPACT_STYLES[event.impact];
  const isLeft = index % 2 === 0;
  const relatedPapers = papers.filter(p => event.papers.includes(p.id));

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`flex items-start gap-4 ${isLeft ? "flex-row" : "flex-row-reverse"} mb-8`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <div
          className="glass-card p-5 cursor-pointer inline-block w-full max-w-md"
          style={{
            border: isSelected ? `1px solid ${impact.color}66` : undefined,
            boxShadow: isSelected ? `0 0 20px ${impact.glow}` : undefined,
          }}
          onClick={onClick}
        >
          {/* Year badge */}
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? "justify-end" : "justify-start"}`}>
            <span
              className="tag-badge"
              style={{
                background: `${impact.color}18`,
                border: `1px solid ${impact.color}44`,
                color: impact.color,
                fontFamily: "'IBM Plex Mono', monospace"
              }}
            >
              {event.year}
            </span>
            <span className="tag-badge" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(168,184,216,0.6)" }}>
              {TYPE_ICONS[event.type]} {TYPE_LABELS[event.type]}
            </span>
          </div>

          <h3
            className="font-bold text-white text-base mb-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {event.titleZh}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            {event.descriptionZh}
          </p>

          {/* Tags */}
          <div className={`flex flex-wrap gap-1 ${isLeft ? "justify-end" : "justify-start"}`}>
            {event.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag-badge tag-purple">{tag}</span>
            ))}
          </div>

          {/* Expanded papers */}
          {isSelected && relatedPapers.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-4 pt-4 border-t overflow-hidden"
              style={{ borderColor: "rgba(0,245,255,0.1)" }}
            >
              <div className="text-xs font-bold text-slate-300 mb-2 section-header-line">
                核心论文
              </div>
              {relatedPapers.map(paper => (
                <div
                  key={paper.id}
                  className="p-2 rounded mb-2"
                  style={{ background: "rgba(0,245,255,0.05)" }}
                >
                  <div className="text-xs font-semibold text-white">{paper.title}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="mono-data text-xs text-slate-500">
                      {paper.authors.slice(0, 2).join(", ")}{paper.authors.length > 2 ? " et al." : ""}
                    </span>
                    <span className="tag-badge tag-cyan">{paper.venue} {paper.year}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Center node */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: "48px" }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold z-10 relative"
          style={{
            background: `radial-gradient(circle, ${impact.color}44, ${impact.color}11)`,
            border: `2px solid ${impact.color}`,
            boxShadow: `0 0 ${isSelected ? "20px" : "8px"} ${impact.glow}`,
            color: impact.color,
            transition: "box-shadow 0.3s ease"
          }}
        >
          {TYPE_ICONS[event.type]}
        </div>
        {/* Connector line */}
        <div
          className="w-px flex-1 mt-2"
          style={{
            background: `linear-gradient(to bottom, ${impact.color}44, transparent)`,
            minHeight: "20px"
          }}
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1" />
    </motion.div>
  );
}

export default function TimelinePage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterImpact, setFilterImpact] = useState<string>("all");

  const filtered = timelineEvents.filter(e => {
    if (filterType !== "all" && e.type !== filterType) return false;
    if (filterImpact !== "all" && e.impact !== filterImpact) return false;
    return true;
  });

  return (
    <div className="min-h-screen" style={{ background: "#050810", paddingLeft: "64px" }}>
      <GaussianSplatBackground />

      {/* Hero banner */}
      <div
        className="relative h-48 flex items-end overflow-hidden"
        style={{ paddingLeft: "32px" }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${TIMELINE_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(5,8,16,1) 0%, rgba(5,8,16,0.4) 100%)" }}
        />
        <div className="relative z-10 pb-6 px-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="tag-badge tag-orange">◎ TIMELINE</span>
            <span className="tag-badge tag-cyan">2006 → 2024</span>
          </div>
          <h1
            className="text-3xl font-black text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            生成式 AI <span className="text-glow-multi">演进时间轴</span>
          </h1>
        </div>
      </div>

      <div className="relative z-10 px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <div className="flex gap-2">
            <span className="text-xs text-slate-500 mono-data self-center">类型:</span>
            {[
              { key: "all", label: "全部" },
              { key: "architecture", label: "⬡ 架构" },
              { key: "application", label: "◈ 应用" },
              { key: "milestone", label: "✦ 里程碑" },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilterType(f.key)}
                className="text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: filterType === f.key ? "rgba(0,245,255,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${filterType === f.key ? "rgba(0,245,255,0.4)" : "rgba(255,255,255,0.1)"}`,
                  color: filterType === f.key ? "#00F5FF" : "rgba(168,184,216,0.6)",
                  fontFamily: "'IBM Plex Mono', monospace"
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <span className="text-xs text-slate-500 mono-data self-center">影响:</span>
            {[
              { key: "all", label: "全部", color: "#A8B8D8" },
              { key: "revolutionary", label: "革命性", color: "#FF6B35" },
              { key: "significant", label: "重要", color: "#00F5FF" },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilterImpact(f.key)}
                className="text-xs px-3 py-1.5 rounded-lg transition-all"
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
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-10 flex-wrap">
          {Object.entries(IMPACT_STYLES).map(([key, style]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: style.color, boxShadow: `0 0 6px ${style.glow}` }}
              />
              <span className="text-xs text-slate-500">{style.label}</span>
            </div>
          ))}
          <span className="text-xs text-slate-600 mono-data ml-auto">点击节点展开论文详情</span>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Central line */}
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: "linear-gradient(to bottom, rgba(0,245,255,0.3), rgba(180,79,255,0.3), rgba(255,107,53,0.1))" }}
            />

            {filtered.map((event, i) => (
              <TimelineNode
                key={event.id}
                event={event}
                index={i}
                isSelected={selectedEvent === event.id}
                onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
              />
            ))}
          </div>

          {/* Future section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-8"
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: "rgba(0,245,255,0.05)",
                border: "1px dashed rgba(0,245,255,0.3)",
              }}
            >
              <div className="w-2 h-2 rounded-full pulse-cyan" style={{ background: "#00F5FF" }} />
              <span className="text-sm text-glow-cyan font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                前沿探索持续进行中...
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-3 mono-data">
              World Models · Embodied AI · Scientific Discovery · AGI
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
