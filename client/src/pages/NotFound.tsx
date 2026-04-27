import { Link } from "wouter";
import GaussianSplatBackground from "@/components/GaussianSplatBackground";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#050810", paddingLeft: "64px" }}
    >
      <GaussianSplatBackground />
      <div className="relative z-10 text-center">
        <div
          className="text-8xl font-black mb-4 text-glow-multi"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          404
        </div>
        <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          页面在宇宙中迷失了
        </h2>
        <p className="text-sm text-slate-500 mb-8 mono-data">
          The page drifted into the knowledge void...
        </p>
        <Link href="/">
          <button
            className="px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(180,79,255,0.2))",
              border: "1px solid rgba(0,245,255,0.4)",
              color: "#00F5FF",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            ⬡ 返回世界模型
          </button>
        </Link>
      </div>
    </div>
  );
}
