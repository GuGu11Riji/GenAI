// SideNav.tsx
// Design: Deep Space Quantum Aesthetics — Glass morphism sidebar navigation
// Fixed left sidebar with icon + label navigation items, hover to expand

import { useState } from "react";
import { Link, useLocation } from "wouter";

interface NavItem {
  id: string;
  icon: string;
  label: string;
  labelEn: string;
  path: string;
  color: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: "⬡", label: "世界模型", labelEn: "World Model", path: "/", color: "#00F5FF" },
  { id: "galaxy", icon: "✦", label: "星系图谱", labelEn: "Galaxy Graph", path: "/galaxy", color: "#B44FFF" },
  { id: "projects", icon: "◈", label: "开源项目", labelEn: "Projects", path: "/projects", color: "#FF6B35" },
  { id: "timeline", icon: "◎", label: "演进时间轴", labelEn: "Timeline", path: "/timeline", color: "#00FF88" },
  { id: "researchers", icon: "◉", label: "大佬排行榜", labelEn: "Rankings", path: "/researchers", color: "#FFD700" },
  { id: "agent", icon: "◆", label: "AI 问答", labelEn: "AI Agent", path: "/agent", color: "#FF00FF" },
  { id: "profile", icon: "♡", label: "我的收藏", labelEn: "My Favorites", path: "/profile", color: "#FF6B35" },
];

export default function SideNav() {
  const [location] = useLocation();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className="fixed left-0 top-0 h-full z-50 flex flex-col transition-all duration-300 ease-in-out"
        style={{
          width: expanded ? "220px" : "64px",
          background: "rgba(4, 7, 18, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(0, 245, 255, 0.08)",
          boxShadow: expanded ? "4px 0 40px rgba(0, 0, 0, 0.6)" : "2px 0 16px rgba(0, 0, 0, 0.4)",
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Logo */}
        <div
          className="flex items-center h-16 px-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(0, 245, 255, 0.08)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(180,79,255,0.15))",
              border: "1px solid rgba(0, 245, 255, 0.35)",
              boxShadow: expanded ? "0 0 16px rgba(0, 245, 255, 0.25)" : "0 0 8px rgba(0, 245, 255, 0.15)",
              fontSize: "18px",
            }}
          >
            ⬡
          </div>
          <div
            className="ml-3 overflow-hidden transition-all duration-300"
            style={{ width: expanded ? "140px" : "0", opacity: expanded ? 1 : 0 }}
          >
            <div
              className="text-sm font-black whitespace-nowrap text-glow-cyan"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              GenAI
            </div>
            <div className="text-xs text-slate-600 whitespace-nowrap mono-data">
              World Model
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 py-3 flex flex-col gap-0.5 px-2 overflow-hidden">
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
            return (
              <Link key={item.id} href={item.path}>
                <div
                  className="flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden"
                  style={{
                    background: isActive ? `${item.color}12` : "transparent",
                    borderLeft: isActive ? `2px solid ${item.color}` : "2px solid transparent",
                    color: isActive ? item.color : "rgba(148, 163, 184, 0.65)",
                  }}
                >
                  {/* Hover background */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: `${item.color}08` }}
                  />

                  {/* Icon */}
                  <span
                    className="text-base flex-shrink-0 relative z-10 w-6 text-center leading-none"
                    style={{
                      filter: isActive ? `drop-shadow(0 0 6px ${item.color})` : "none",
                      color: isActive ? item.color : "inherit",
                      transition: "filter 0.2s, color 0.2s",
                    }}
                  >
                    {item.icon}
                  </span>

                  {/* Label */}
                  <div
                    className="overflow-hidden transition-all duration-300 relative z-10"
                    style={{ width: expanded ? "160px" : "0", opacity: expanded ? 1 : 0 }}
                  >
                    <div
                      className="text-sm font-medium whitespace-nowrap"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.label}
                    </div>
                    <div className="text-xs whitespace-nowrap opacity-50 mono-data">
                      {item.labelEn}
                    </div>
                  </div>

                  {/* Active dot */}
                  {isActive && (
                    <div
                      className="absolute right-2 w-1.5 h-1.5 rounded-full flex-shrink-0 z-10"
                      style={{
                        background: item.color,
                        boxShadow: `0 0 6px ${item.color}`,
                        animation: "pulse-dot 2s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(0,245,255,0.06)", margin: "0 12px" }} />

        {/* Bottom: GitHub link */}
        <div className="p-3 flex-shrink-0">
          <a
            href="https://github.com/BiaohangYuan/RCO"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-200 group"
              style={{ color: "rgba(148, 163, 184, 0.5)" }}
            >
              <span className="text-base flex-shrink-0 w-6 text-center group-hover:text-white transition-colors">
                ⊕
              </span>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ width: expanded ? "160px" : "0", opacity: expanded ? 1 : 0 }}
              >
                <div className="text-xs font-medium whitespace-nowrap mono-data group-hover:text-white transition-colors">
                  GitHub →
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Status */}
        <div
          className="px-4 py-3 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(0, 245, 255, 0.06)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: "#00FF88",
                boxShadow: "0 0 6px rgba(0,255,136,0.6)",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ width: expanded ? "160px" : "0", opacity: expanded ? 1 : 0 }}
            >
              <span className="text-xs text-slate-600 mono-data whitespace-nowrap">
                v0.1.0 · LIVE
              </span>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
