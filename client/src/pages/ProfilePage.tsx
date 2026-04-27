// ProfilePage.tsx — User profile with favorites collection
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import GaussianSplatBackground from "@/components/GaussianSplatBackground";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import FavoriteButton from "@/components/FavoriteButton";

const TYPE_CONFIG = {
  project: { label: "开源项目", icon: "◈", color: "#B44FFF", emptyText: "还没有收藏任何项目" },
  paper: { label: "学术论文", icon: "📄", color: "#00F5FF", emptyText: "还没有收藏任何论文" },
  researcher: { label: "领域大佬", icon: "◉", color: "#FFD700", emptyText: "还没有收藏任何研究者" },
};

function FavoriteCard({ item, onRemove }: { item: any; onRemove: () => void }) {
  const cfg = TYPE_CONFIG[item.itemType as keyof typeof TYPE_CONFIG];
  const meta = item.itemMeta || {};

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card p-4 group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
            style={{ background: `${cfg.color}18`, border: `1px solid ${cfg.color}33`, color: cfg.color }}
          >
            {cfg.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4
              className="font-semibold text-white text-sm truncate"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {item.itemName}
            </h4>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="tag-badge" style={{ background: `${cfg.color}12`, border: `1px solid ${cfg.color}33`, color: cfg.color, fontSize: "0.65rem" }}>
                {cfg.label}
              </span>
              {meta.venue && <span className="tag-badge tag-cyan" style={{ fontSize: "0.65rem" }}>{String(meta.venue)}</span>}
              {meta.year && <span className="mono-data text-xs text-slate-600">{String(meta.year)}</span>}
              {meta.stars && (
                <span className="mono-data text-xs text-slate-500">⭐ {Number(meta.stars) >= 1000 ? `${(Number(meta.stars) / 1000).toFixed(1)}k` : meta.stars}</span>
              )}
            </div>
            {meta.description && (
              <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                {String(meta.description)}
              </p>
            )}
            <div className="text-xs text-slate-700 mt-1.5 mono-data">
              收藏于 {new Date(item.createdAt).toLocaleDateString("zh-CN")}
            </div>
          </div>
        </div>

        {/* Remove button */}
        <FavoriteButton
          itemType={item.itemType}
          itemId={item.itemId}
          itemName={item.itemName}
          itemMeta={item.itemMeta}
          initialFavorited={true}
          size="sm"
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </motion.div>
  );
}

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"project" | "paper" | "researcher" | "all">("all");

  const favoritesQuery = trpc.favorites.list.useQuery(
    { itemType: activeTab === "all" ? undefined : activeTab },
    { enabled: isAuthenticated }
  );
  const countsQuery = trpc.favorites.counts.useQuery(undefined, { enabled: isAuthenticated });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050810", paddingLeft: "64px" }}>
        <GaussianSplatBackground />
        <div className="relative z-10 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3" style={{ borderColor: "#00F5FF", borderTopColor: "transparent" }} />
          <p className="text-sm text-slate-500 mono-data">加载中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050810", paddingLeft: "64px" }}>
        <GaussianSplatBackground />
        <div className="relative z-10 text-center max-w-sm">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            登录后查看收藏
          </h2>
          <p className="text-sm text-slate-500 mb-6">登录后可以收藏感兴趣的项目、论文和研究者</p>
          <a href={getLoginUrl()}>
            <button
              className="px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(180,79,255,0.2))", border: "1px solid rgba(0,245,255,0.4)", color: "#00F5FF", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ⬡ 登录 Manus
            </button>
          </a>
        </div>
      </div>
    );
  }

  const counts = countsQuery.data || { project: 0, paper: 0, researcher: 0 };
  const totalFavorites = counts.project + counts.paper + counts.researcher;
  const favorites = favoritesQuery.data || [];

  return (
    <div className="min-h-screen" style={{ background: "#050810", paddingLeft: "64px" }}>
      <GaussianSplatBackground />

      <div className="relative z-10 px-8 py-8 max-w-5xl">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-8 flex items-center gap-6"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(180,79,255,0.2))", border: "1px solid rgba(0,245,255,0.35)", color: "#00F5FF", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {user?.name || "用户"}
            </h1>
            {user?.email && <p className="text-sm text-slate-500 mono-data">{user.email}</p>}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full pulse-cyan" style={{ background: "#00FF88" }} />
                <span className="text-xs text-slate-500 mono-data">已登录</span>
              </div>
              <span className="text-xs text-slate-600">·</span>
              <span className="text-xs text-slate-500 mono-data">
                共收藏 <span style={{ color: "#00F5FF" }}>{totalFavorites}</span> 项
              </span>
            </div>
          </div>
          {/* Stats */}
          <div className="flex gap-4 flex-shrink-0">
            {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
              <div key={type} className="text-center">
                <div className="text-xl font-black" style={{ color: cfg.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {counts[type as keyof typeof counts]}
                </div>
                <div className="text-xs text-slate-600 mono-data">{cfg.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Favorites section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white section-header-line" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              我的收藏
            </h2>
            <span className="text-xs text-slate-600 mono-data">点击各页面的 ♡ 按钮添加收藏</span>
          </div>

          {/* Tab filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { key: "all", label: `全部 (${totalFavorites})`, color: "#A8B8D8" },
              { key: "project", label: `◈ 项目 (${counts.project})`, color: "#B44FFF" },
              { key: "paper", label: `📄 论文 (${counts.paper})`, color: "#00F5FF" },
              { key: "researcher", label: `◉ 研究者 (${counts.researcher})`, color: "#FFD700" },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className="text-xs px-4 py-2 rounded-lg transition-all"
                style={{
                  background: activeTab === tab.key ? `${tab.color}18` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeTab === tab.key ? `${tab.color}55` : "rgba(255,255,255,0.1)"}`,
                  color: activeTab === tab.key ? tab.color : "rgba(168,184,216,0.6)",
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Favorites list */}
          {favoritesQuery.isLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card p-4 animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800" />
                    <div className="flex-1">
                      <div className="h-4 bg-slate-800 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-slate-800 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-4xl mb-3 opacity-30">♡</div>
              <p className="text-slate-600 mono-data text-sm">
                {activeTab === "all" ? "还没有任何收藏" : TYPE_CONFIG[activeTab as keyof typeof TYPE_CONFIG]?.emptyText}
              </p>
              <p className="text-slate-700 text-xs mt-2">
                浏览
                <Link href="/projects"><span className="text-cyan-400 hover:underline mx-1">开源项目</span></Link>
                或
                <Link href="/researchers"><span className="text-yellow-400 hover:underline mx-1">大佬排行榜</span></Link>
                添加收藏
              </p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <AnimatePresence>
                {favorites.map(item => (
                  <FavoriteCard
                    key={item.id}
                    item={item}
                    onRemove={() => favoritesQuery.refetch()}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
