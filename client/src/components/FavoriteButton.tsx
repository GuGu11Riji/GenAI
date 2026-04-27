// FavoriteButton.tsx — Heart button with optimistic update via tRPC
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

interface FavoriteButtonProps {
  itemType: "project" | "paper" | "researcher";
  itemId: string;
  itemName: string;
  itemMeta?: Record<string, unknown>;
  initialFavorited?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export default function FavoriteButton({
  itemType,
  itemId,
  itemName,
  itemMeta = {},
  initialFavorited = false,
  size = "sm",
  className = "",
}: FavoriteButtonProps) {
  const { isAuthenticated } = useAuth();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [particles, setParticles] = useState(false);

  const toggleMutation = trpc.favorites.toggle.useMutation({
    onMutate: () => {
      // Optimistic update
      setFavorited(prev => !prev);
    },
    onSuccess: (data) => {
      setFavorited(data.favorited);
      if (data.favorited) {
        setParticles(true);
        setTimeout(() => setParticles(false), 800);
        toast.success(`已收藏「${itemName}」`, {
          style: { background: "#0A1628", border: "1px solid rgba(0,245,255,0.3)", color: "#00F5FF" },
          duration: 2000,
        });
      } else {
        toast.info(`已取消收藏「${itemName}」`, {
          style: { background: "#0A1628", border: "1px solid rgba(255,255,255,0.1)", color: "#A8B8D8" },
          duration: 2000,
        });
      }
    },
    onError: () => {
      // Rollback optimistic update
      setFavorited(prev => !prev);
      toast.error("操作失败，请重试", {
        style: { background: "#0A1628", border: "1px solid rgba(255,107,53,0.3)", color: "#FF6B35" },
      });
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) {
      toast.info("请先登录后再收藏", {
        style: { background: "#0A1628", border: "1px solid rgba(180,79,255,0.3)", color: "#B44FFF" },
        action: { label: "登录", onClick: () => window.location.href = "/api/oauth/login" },
      });
      return;
    }
    toggleMutation.mutate({ itemType, itemId, itemName, itemMeta });
  };

  const iconSize = size === "sm" ? "14px" : "18px";
  const btnSize = size === "sm" ? "w-7 h-7" : "w-9 h-9";

  return (
    <div className={`relative inline-flex ${className}`}>
      <motion.button
        onClick={handleClick}
        disabled={toggleMutation.isPending}
        whileTap={{ scale: 0.85 }}
        className={`${btnSize} rounded-lg flex items-center justify-center transition-all duration-200 relative overflow-hidden`}
        style={{
          background: favorited ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${favorited ? "rgba(255,107,53,0.5)" : "rgba(255,255,255,0.12)"}`,
          cursor: toggleMutation.isPending ? "wait" : "pointer",
        }}
        title={favorited ? "取消收藏" : "收藏"}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg"
          style={{ background: "rgba(255,107,53,0.08)" }}
        />

        {/* Heart icon */}
        <motion.svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill={favorited ? "#FF6B35" : "none"}
          stroke={favorited ? "#FF6B35" : "rgba(168,184,216,0.6)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={favorited ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
          style={{ filter: favorited ? "drop-shadow(0 0 4px rgba(255,107,53,0.6))" : "none" }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </motion.svg>
      </motion.button>

      {/* Burst particles on favorite */}
      <AnimatePresence>
        {particles && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                style={{
                  background: i % 2 === 0 ? "#FF6B35" : "#FFD700",
                  top: "50%",
                  left: "50%",
                  zIndex: 20,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((i / 6) * Math.PI * 2) * 20,
                  y: Math.sin((i / 6) * Math.PI * 2) * 20,
                  opacity: 0,
                  scale: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
