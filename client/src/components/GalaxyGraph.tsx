// GalaxyGraph.tsx
// Design: Deep Space Quantum Aesthetics — Interactive 3D-like knowledge galaxy
// Renders knowledge nodes as glowing spheres with animated connection lines

import { useEffect, useRef, useState, useCallback } from "react";
import { knowledgeNodes, type KnowledgeNode } from "@/lib/data";

interface GraphNode extends KnowledgeNode {
  px: number;
  py: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  phase: number;
}

const TYPE_COLORS: Record<string, string> = {
  model: "#00F5FF",
  concept: "#B44FFF",
  application: "#FF6B35",
  paper: "#FF00FF",
  researcher: "#FFD700",
};

const TYPE_LABELS: Record<string, string> = {
  model: "核心架构",
  concept: "关键概念",
  application: "应用领域",
  paper: "重要论文",
  researcher: "研究者",
};

export default function GalaxyGraph({ onNodeClick }: { onNodeClick?: (node: KnowledgeNode) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<GraphNode[]>([]);
  const timeRef = useRef<number>(0);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initNodes = useCallback((w: number, h: number) => {
    nodesRef.current = knowledgeNodes.map(n => ({
      ...n,
      px: (n.x / 100) * w,
      py: (n.y / 100) * h,
      vx: 0,
      vy: 0,
      targetX: (n.x / 100) * w,
      targetY: (n.y / 100) * h,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initNodes(canvas.width, canvas.height);
    };
    resize();

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (const node of nodesRef.current) {
        const dx = node.px - mx;
        const dy = node.py - my;
        if (Math.sqrt(dx * dx + dy * dy) < node.size + 4) {
          setSelectedNode(node);
          onNodeClick?.(node);
          return;
        }
      }
      setSelectedNode(null);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found: string | null = null;
      for (const node of nodesRef.current) {
        const dx = node.px - mx;
        const dy = node.py - my;
        if (Math.sqrt(dx * dx + dy * dy) < node.size + 6) {
          found = node.id;
          canvas.style.cursor = "pointer";
          break;
        }
      }
      if (!found) canvas.style.cursor = "default";
      setHoveredNode(found);
    };

    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      timeRef.current += 0.012;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;

      // Gentle floating motion
      for (const node of nodes) {
        node.px += Math.sin(t * 0.5 + node.phase * 2) * 0.3;
        node.py += Math.cos(t * 0.4 + node.phase * 2) * 0.3;
      }

      // Draw connections
      for (const node of nodes) {
        for (const connId of node.connections) {
          const target = nodes.find(n => n.id === connId);
          if (!target) continue;

          const isHighlighted = hoveredNode === node.id || hoveredNode === connId;
          const isSelected = selectedNode?.id === node.id || selectedNode?.id === connId;

          const alpha = isHighlighted || isSelected ? 0.6 : 0.15;
          const lineWidth = isHighlighted || isSelected ? 1.5 : 0.5;

          // Animated flow dots along connection
          const gradient = ctx.createLinearGradient(node.px, node.py, target.px, target.py);
          gradient.addColorStop(0, node.color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
          gradient.addColorStop(1, target.color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));

          ctx.beginPath();
          ctx.moveTo(node.px, node.py);
          ctx.lineTo(target.px, target.py);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = lineWidth;
          ctx.stroke();

          // Flow dot
          if (isHighlighted || isSelected) {
            const progress = (Math.sin(t * 2) + 1) / 2;
            const dotX = node.px + (target.px - node.px) * progress;
            const dotY = node.py + (target.py - node.py) * progress;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#00F5FF";
            ctx.fill();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const isHovered = hoveredNode === node.id;
        const isSelected = selectedNode?.id === node.id;
        const pulse = isSelected ? 1 + 0.15 * Math.sin(t * 4) : 1;
        const r = node.size * pulse * (isHovered ? 1.2 : 1);

        // Outer glow
        const glowRadius = r * (isHovered || isSelected ? 4 : 2.5);
        const glow = ctx.createRadialGradient(node.px, node.py, 0, node.px, node.py, glowRadius);
        const glowAlpha = isHovered || isSelected ? 0.5 : 0.2;
        glow.addColorStop(0, node.color + Math.floor(glowAlpha * 255).toString(16).padStart(2, "0"));
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(node.px, node.py, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node body
        const bodyGrad = ctx.createRadialGradient(
          node.px - r * 0.3, node.py - r * 0.3, 0,
          node.px, node.py, r
        );
        bodyGrad.addColorStop(0, "#ffffff");
        bodyGrad.addColorStop(0.3, node.color);
        bodyGrad.addColorStop(1, node.color + "88");
        ctx.beginPath();
        ctx.arc(node.px, node.py, r, 0, Math.PI * 2);
        ctx.fillStyle = bodyGrad;
        ctx.fill();

        // Selection ring
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(node.px, node.py, r + 5, 0, Math.PI * 2);
          ctx.strokeStyle = "#00F5FF";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Label
        if (isHovered || isSelected || node.size > 18) {
          ctx.font = `${isHovered || isSelected ? "600" : "500"} ${node.size > 18 ? "11" : "10"}px 'Space Grotesk', sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";

          // Label background
          const labelW = ctx.measureText(node.label).width + 12;
          const labelH = 16;
          const lx = node.px - labelW / 2;
          const ly = node.py + r + 4;
          ctx.fillStyle = "rgba(5, 8, 16, 0.8)";
          ctx.beginPath();
          ctx.roundRect(lx, ly, labelW, labelH, 4);
          ctx.fill();

          ctx.fillStyle = isHovered || isSelected ? "#ffffff" : node.color;
          ctx.fillText(node.label, node.px, ly + 3);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [initNodes, onNodeClick, hoveredNode, selectedNode]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            />
            <span className="text-xs font-mono" style={{ color: "rgba(168, 184, 216, 0.8)" }}>
              {TYPE_LABELS[type]}
            </span>
          </div>
        ))}
      </div>

      {/* Selected node info */}
      {selectedNode && (
        <div
          className="absolute top-4 right-4 glass-card p-4 max-w-xs"
          style={{ zIndex: 10 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: TYPE_COLORS[selectedNode.type],
                boxShadow: `0 0 8px ${TYPE_COLORS[selectedNode.type]}`
              }}
            />
            <span className="text-xs tag-badge tag-cyan">{TYPE_LABELS[selectedNode.type]}</span>
          </div>
          <h3 className="font-bold text-white text-sm mb-1">{selectedNode.label}</h3>
          {selectedNode.description && (
            <p className="text-xs text-slate-400">{selectedNode.description}</p>
          )}
          <div className="mt-2 text-xs text-slate-500">
            连接节点: {selectedNode.connections.length} 个
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-2 right-2 text-slate-500 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Interaction hint */}
      <div className="absolute bottom-4 right-4 text-xs text-slate-600 font-mono">
        点击节点查看详情 · 悬停高亮连接
      </div>
    </div>
  );
}
