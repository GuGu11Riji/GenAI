// AgentPage.tsx — AI Agent Q&A with real LLM backend via tRPC
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GaussianSplatBackground from "@/components/GaussianSplatBackground";
import { trpc } from "@/lib/trpc";
import { nanoid } from "nanoid";
import { Streamdown } from "streamdown";

const AGENT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663401955343/4rXpPdLRF3WHsVMU8dtgx6/agent-chat-bg-YN2fovLtdkdG9ztST7tFcJ.webp";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "扩散模型和GAN有什么区别？",
  "介绍一下3D高斯泼溅技术",
  "什么是变分自编码器VAE？",
  "生成式AI的最新前沿方向是什么？",
  "Mamba架构相比Transformer有哪些优势？",
  "AlphaFold2是如何解决蛋白质折叠问题的？",
  "Stable Diffusion的核心原理是什么？",
  "Flow Matching和扩散模型有什么关系？",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: "#00F5FF" }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isAgent = message.role === "agent";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAgent ? "flex-row" : "flex-row-reverse"}`}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-1"
        style={{
          background: isAgent
            ? "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(180,79,255,0.2))"
            : "rgba(255,107,53,0.15)",
          border: `1px solid ${isAgent ? "rgba(0,245,255,0.4)" : "rgba(255,107,53,0.3)"}`,
        }}
      >
        {isAgent ? "◆" : "◎"}
      </div>
      <div
        className="max-w-2xl rounded-xl px-4 py-3"
        style={{
          background: isAgent ? "rgba(10, 22, 40, 0.85)" : "rgba(255, 107, 53, 0.1)",
          border: `1px solid ${isAgent ? "rgba(0,245,255,0.15)" : "rgba(255,107,53,0.25)"}`,
          backdropFilter: "blur(12px)",
        }}
      >
        {isAgent ? (
          <div className="text-sm text-slate-300 leading-relaxed genai-markdown">
            <Streamdown>{message.content}</Streamdown>
          </div>
        ) : (
          <p className="text-sm text-white" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            {message.content}
          </p>
        )}
        <div className="text-xs text-slate-600 mt-2 mono-data">
          {message.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentPage() {
  const [sessionId] = useState(() => nanoid(16));
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      content: `## 欢迎使用 GenAI World Model Agent 🌌

我是专注于**生成式AI领域**的智能研究助手，由真实 LLM 驱动。

**我可以帮你：**
- 📊 深度解析生成式AI核心架构（VAE、GAN、Diffusion、Mamba等）
- 📄 解读顶会论文（NeurIPS、CVPR、ICLR、Nature等）
- 👨‍🔬 介绍领域大佬的研究贡献与影响力
- 🚀 追踪最新前沿方向（World Models、3DGS、Scientific AI等）
- 💻 提供代码示例与实现思路

请输入你的问题，或点击下方快速提问按钮开始探索！`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const chatMutation = trpc.agent.chat.useMutation({
    onSuccess: (data) => {
      const agentMsg: Message = {
        id: nanoid(),
        role: "agent",
        content: data.content,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMsg]);
      setHistory(prev => [...prev, { role: "assistant", content: data.content }]);
    },
    onError: () => {
      const errMsg: Message = {
        id: nanoid(),
        role: "agent",
        content: "⚠️ 连接AI服务时出现问题，请稍后重试。",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errMsg]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatMutation.isPending]);

  const sendMessage = (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;
    const userMsg: Message = { id: nanoid(), role: "user", content: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setHistory(prev => [...prev, { role: "user", content: text.trim() }]);
    setInput("");
    chatMutation.mutate({ message: text.trim(), sessionId, history: history.slice(-8) });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: "#050810", paddingLeft: "64px" }}>
      <GaussianSplatBackground />

      {/* Header */}
      <div
        className="relative z-20 flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ background: "rgba(5,8,16,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,245,255,0.1)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundImage: `url(${AGENT_BG})`, backgroundSize: "cover", border: "1px solid rgba(0,245,255,0.4)", boxShadow: "0 0 16px rgba(0,245,255,0.2)" }}
          >◆</div>
          <div>
            <h1 className="text-base font-bold text-glow-cyan" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              GenAI World Model Agent
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full pulse-cyan" style={{ background: "#00FF88" }} />
              <span className="text-xs text-slate-500 mono-data">在线 · LLM Powered · 生成式AI专家</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="tag-badge tag-cyan">Real LLM</span>
          <span className="tag-badge tag-purple">Session: {sessionId.slice(0, 8)}</span>
        </div>
      </div>

      {/* Quick questions */}
      <div
        className="relative z-20 px-6 py-3 flex-shrink-0 overflow-x-auto"
        style={{ background: "rgba(5,8,16,0.7)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex gap-2 min-w-max">
          <span className="text-xs text-slate-600 mono-data self-center flex-shrink-0">快速提问:</span>
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={chatMutation.isPending}
              className="text-xs px-3 py-1.5 rounded-full flex-shrink-0 transition-all hover:scale-105 disabled:opacity-40"
              style={{
                background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.2)",
                color: "rgba(0,245,255,0.8)", fontFamily: "'Noto Sans SC', sans-serif", whiteSpace: "nowrap"
              }}
            >{q}</button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <AnimatePresence>
          {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
        </AnimatePresence>
        {chatMutation.isPending && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(180,79,255,0.2))", border: "1px solid rgba(0,245,255,0.4)" }}>◆</div>
            <div className="rounded-xl" style={{ background: "rgba(10, 22, 40, 0.8)", border: "1px solid rgba(0,245,255,0.15)" }}>
              <TypingIndicator />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="relative z-20 px-6 py-4 flex-shrink-0"
        style={{ background: "rgba(5,8,16,0.9)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(0,245,255,0.1)" }}
      >
        <div
          className="flex gap-3 items-end rounded-xl p-3"
          style={{ background: "rgba(10,22,40,0.8)", border: "1px solid rgba(0,245,255,0.2)", boxShadow: "0 0 20px rgba(0,245,255,0.05)" }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="询问关于生成式AI的任何问题... (Enter发送, Shift+Enter换行)"
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-sm text-white placeholder-slate-600"
            style={{ fontFamily: "'Noto Sans SC', sans-serif", maxHeight: "120px", lineHeight: "1.6" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || chatMutation.isPending}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            style={{
              background: input.trim() && !chatMutation.isPending ? "linear-gradient(135deg, rgba(0,245,255,0.3), rgba(180,79,255,0.3))" : "rgba(255,255,255,0.05)",
              border: `1px solid ${input.trim() && !chatMutation.isPending ? "rgba(0,245,255,0.5)" : "rgba(255,255,255,0.1)"}`,
              color: input.trim() && !chatMutation.isPending ? "#00F5FF" : "rgba(168,184,216,0.4)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {chatMutation.isPending ? "思考中..." : "发送 →"}
          </button>
        </div>
        <div className="text-xs text-slate-700 mt-2 text-center mono-data">
          由内置 LLM 驱动 · 对话历史保存在本地会话 · 刷新页面将重置对话
        </div>
      </div>

      <style>{`
        .genai-markdown h1, .genai-markdown h2 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: white; margin: 0.75rem 0 0.5rem; }
        .genai-markdown h2 { font-size: 1rem; }
        .genai-markdown h3 { font-size: 0.875rem; font-weight: 600; color: #00F5FF; margin: 0.5rem 0 0.25rem; }
        .genai-markdown strong { color: white; }
        .genai-markdown code { background: rgba(0,245,255,0.1); color: #00F5FF; font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; padding: 1px 5px; border-radius: 3px; }
        .genai-markdown pre { background: rgba(0,0,0,0.5); border: 1px solid rgba(0,245,255,0.15); border-radius: 8px; padding: 12px; margin: 8px 0; overflow-x: auto; }
        .genai-markdown pre code { background: none; padding: 0; color: #00F5FF; }
        .genai-markdown ul, .genai-markdown ol { padding-left: 1.25rem; margin: 0.5rem 0; }
        .genai-markdown li { margin: 0.2rem 0; }
        .genai-markdown table { width: 100%; border-collapse: collapse; margin: 0.5rem 0; font-size: 0.75rem; }
        .genai-markdown th { background: rgba(0,245,255,0.1); color: #00F5FF; padding: 6px 10px; text-align: left; border: 1px solid rgba(0,245,255,0.2); }
        .genai-markdown td { padding: 5px 10px; border: 1px solid rgba(255,255,255,0.08); color: rgba(168,184,216,0.9); }
        .genai-markdown blockquote { border-left: 3px solid #B44FFF; padding-left: 12px; color: rgba(168,184,216,0.7); margin: 8px 0; }
      `}</style>
    </div>
  );
}
