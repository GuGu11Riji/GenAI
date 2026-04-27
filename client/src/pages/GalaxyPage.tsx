// GalaxyPage.tsx
// Design: Deep Space Quantum Aesthetics — Full-screen interactive knowledge galaxy

import { useState } from "react";
import GaussianSplatBackground from "@/components/GaussianSplatBackground";
import GalaxyGraph from "@/components/GalaxyGraph";
import { type KnowledgeNode } from "@/lib/data";
import { papers, projects } from "@/lib/data";

export default function GalaxyPage() {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);

  const relatedPapers = selectedNode
    ? papers.filter(p => p.tags.some(t =>
        selectedNode.label.toLowerCase().includes(t.toLowerCase()) ||
        t.toLowerCase().includes(selectedNode.label.toLowerCase())
      )).slice(0, 3)
    : [];

  const relatedProjects = selectedNode
    ? projects.filter(p => p.topics.some(t =>
        selectedNode.label.toLowerCase().includes(t.toLowerCase()) ||
        t.toLowerCase().includes(selectedNode.label.toLowerCase())
      )).slice(0, 2)
    : [];

  return (
    <div className="fixed inset-0" style={{ background: "#050810", paddingLeft: "64px" }}>
      <GaussianSplatBackground />

      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4"
        style={{
          background: "linear-gradient(to bottom, rgba(5,8,16,0.9), transparent)",
          paddingLeft: "80px"
        }}
      >
        <div>
          <h1
            className="text-xl font-bold text-glow-cyan"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ 星系知识图谱
          </h1>
          <p className="text-xs text-slate-500 mono-data">
            GENERATIVE AI KNOWLEDGE GALAXY · 拖拽旋转 · 点击节点查看详情
          </p>
        </div>
        <div className="flex gap-2">
          {[
            { label: "核心架构", color: "#00F5FF" },
            { label: "关键概念", color: "#B44FFF" },
            { label: "应用领域", color: "#FF6B35" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5 glass-card px-3 py-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
              <span className="text-xs text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main graph area */}
      <div className="absolute inset-0 z-10" style={{ paddingLeft: "64px" }}>
        <GalaxyGraph onNodeClick={setSelectedNode} />
      </div>

      {/* Detail panel */}
      {selectedNode && (
        <div
          className="absolute right-4 top-20 bottom-4 w-80 z-30 flex flex-col gap-3 overflow-y-auto"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Node info */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: selectedNode.color,
                    boxShadow: `0 0 8px ${selectedNode.color}`
                  }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-wider mono-data"
                  style={{ color: selectedNode.color }}
                >
                  {selectedNode.type}
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-500 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <h2
              className="text-lg font-bold text-white mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {selectedNode.label}
            </h2>
            {selectedNode.description && (
              <p className="text-sm text-slate-400 mb-3">{selectedNode.description}</p>
            )}
            <div className="text-xs text-slate-500 mono-data">
              连接节点: {selectedNode.connections.length} 个
            </div>
          </div>

          {/* Related papers */}
          {relatedPapers.length > 0 && (
            <div className="glass-card p-4">
              <h3
                className="text-sm font-bold text-slate-300 mb-3 section-header-line"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                相关论文
              </h3>
              <div className="flex flex-col gap-2">
                {relatedPapers.map(paper => (
                  <div
                    key={paper.id}
                    className="p-3 rounded-lg"
                    style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)" }}
                  >
                    <div className="text-xs font-semibold text-white leading-tight mb-1">
                      {paper.title}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="tag-badge tag-cyan">{paper.venue} {paper.year}</span>
                      <span className="mono-data text-xs text-slate-500">
                        {(paper.citations / 1000).toFixed(1)}k 引用
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related projects */}
          {relatedProjects.length > 0 && (
            <div className="glass-card p-4">
              <h3
                className="text-sm font-bold text-slate-300 mb-3 section-header-line"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                相关项目
              </h3>
              <div className="flex flex-col gap-2">
                {relatedProjects.map(proj => (
                  <div
                    key={proj.id}
                    className="p-3 rounded-lg"
                    style={{ background: "rgba(180,79,255,0.05)", border: "1px solid rgba(180,79,255,0.1)" }}
                  >
                    <div className="text-xs font-semibold text-white mb-1">{proj.name}</div>
                    <div className="flex items-center justify-between">
                      <span className="tag-badge tag-purple">{proj.category}</span>
                      <span className="mono-data text-xs" style={{ color: "#00FF88" }}>
                        ⭐ {(proj.stars / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connections list */}
          <div className="glass-card p-4">
            <h3
              className="text-sm font-bold text-slate-300 mb-3 section-header-line"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              关联节点
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedNode.connections.map(connId => (
                <span key={connId} className="tag-badge tag-cyan text-xs">
                  {connId}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
