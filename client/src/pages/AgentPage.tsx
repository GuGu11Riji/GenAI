// AgentPage.tsx
// Design: Deep Space Quantum Aesthetics — AI Agent Q&A Interface

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GaussianSplatBackground from "@/components/GaussianSplatBackground";
import { agentResponses } from "@/lib/data";

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
  "什么是变分自编码器？",
  "生成式AI的最新前沿方向是什么？",
  "Transformer架构有哪些创新？",
  "AlphaFold2是如何解决蛋白质折叠问题的？",
];

function getAgentResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("扩散") || q.includes("diffusion") || q.includes("ddpm")) {
    return agentResponses.diffusion;
  }
  if (q.includes("gan") || q.includes("对抗") || q.includes("生成对抗")) {
    return agentResponses.gan;
  }
  if (q.includes("vae") || q.includes("变分") || q.includes("自编码")) {
    return agentResponses.vae;
  }
  if (q.includes("高斯") || q.includes("3dgs") || q.includes("gaussian") || q.includes("泼溅")) {
    return agentResponses["3dgs"];
  }
  if (q.includes("transformer") || q.includes("注意力") || q.includes("attention")) {
    return `## Transformer 架构详解

**发表时间**：2017年，Google Brain团队

### 核心创新：自注意力机制

\`\`\`
Attention(Q, K, V) = softmax(QK^T / √d_k) · V
\`\`\`

### 为什么Transformer革命性？

1. **并行化训练**：摒弃RNN的顺序依赖，大幅提升训练效率
2. **长程依赖**：直接建模任意距离的词间关系
3. **可扩展性**：参数量可从百万扩展到万亿

### 生成式AI中的Transformer变体

| 模型 | 类型 | 应用 |
|------|------|------|
| GPT系列 | 解码器 | 文本生成 |
| BERT | 编码器 | 理解任务 |
| T5 | 编解码器 | 翻译/摘要 |
| ViT | 编码器 | 图像理解 |
| DiT | 解码器 | 图像生成 |

### 最新进展
- **Flash Attention**：内存高效注意力计算
- **Mamba/SSM**：线性时间序列建模的挑战者
- **Mixture of Experts (MoE)**：稀疏激活提升效率`;
  }
  if (q.includes("alphafold") || q.includes("蛋白质")) {
    return `## AlphaFold2 — 解决50年生物学难题

**发布**：2021年，DeepMind
**荣誉**：2024年诺贝尔化学奖

### 蛋白质折叠问题

蛋白质由氨基酸序列折叠成三维结构，结构决定功能。
预测这一过程是生物学50年来最重要的开放问题。

### AlphaFold2的关键创新

1. **多序列比对（MSA）**：利用进化信息
2. **Evoformer模块**：专为蛋白质设计的Transformer
3. **结构模块**：直接预测原子坐标
4. **迭代精化**：多轮优化提升精度

### 影响

- 预测精度：中位骨架RMSD **0.96Å**（接近实验精度）
- 已预测 **2亿+** 蛋白质结构并公开
- 加速药物研发、疾病机制研究

### 生成式扩展

- **RFdiffusion**：蛋白质从头设计
- **ESMFold**：Meta的快速蛋白质预测
- **ProteinMPNN**：蛋白质序列设计`;
  }
  if (q.includes("前沿") || q.includes("最新") || q.includes("趋势") || q.includes("方向")) {
    return `## 生成式AI 2024-2025 前沿方向

### 🔥 最热门方向

**1. 视频与世界模型**
- Sora展示了视频作为世界模拟器的潜力
- 物理一致性、长时序建模是核心挑战
- 代表工作：Sora、Kling、Wan等

**2. 多模态大模型**
- 统一理解与生成：图像、视频、音频、文本
- GPT-4o、Gemini Ultra、Claude 3.5 Sonnet
- 开源：LLaVA、InternVL、Qwen-VL

**3. 3D生成与具身AI**
- 3D Gaussian Splatting的快速迭代
- 从静态场景到动态4D重建
- 机器人操作的视觉感知

**4. 科学AI（AI for Science）**
- 蛋白质设计（RFdiffusion）
- 分子生成（药物发现）
- 材料科学、气候模型

**5. 高效架构**
- Mamba/SSM挑战Transformer
- MoE稀疏激活
- 量化与蒸馏

### 📊 关键趋势
- **规模化**：从十亿到万亿参数
- **多模态统一**：单一模型处理所有模态
- **推理能力**：o1、DeepSeek-R1等推理增强
- **开源生态**：Llama、Mistral、Qwen等开源追赶`;
  }
  return agentResponses.default;
}

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
      {/* Avatar */}
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

      {/* Bubble */}
      <div
        className="max-w-2xl rounded-xl px-4 py-3"
        style={{
          background: isAgent
            ? "rgba(10, 22, 40, 0.8)"
            : "rgba(255, 107, 53, 0.1)",
          border: `1px solid ${isAgent ? "rgba(0,245,255,0.15)" : "rgba(255,107,53,0.25)"}`,
          backdropFilter: "blur(12px)",
        }}
      >
        {isAgent ? (
          <div
            className="text-sm text-slate-300 leading-relaxed prose-invert"
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            dangerouslySetInnerHTML={{
              __html: message.content
                .replace(/^## (.*)/gm, '<h2 class="text-base font-bold text-white mt-3 mb-2" style="font-family: Space Grotesk, sans-serif">$1</h2>')
                .replace(/^### (.*)/gm, '<h3 class="text-sm font-bold text-cyan-300 mt-2 mb-1">$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded text-xs" style="background: rgba(0,245,255,0.1); color: #00F5FF; font-family: IBM Plex Mono, monospace">$1</code>')
                .replace(/```[\s\S]*?```/g, (match) => {
                  const code = match.replace(/```\w*\n?/, '').replace(/```$/, '');
                  return `<pre class="text-xs p-3 rounded-lg my-2 overflow-x-auto" style="background: rgba(0,0,0,0.4); border: 1px solid rgba(0,245,255,0.15); color: #00F5FF; font-family: IBM Plex Mono, monospace">${code}</pre>`;
                })
                .replace(/\| (.*) \|/g, (match) => {
                  const cells = match.split('|').filter(c => c.trim());
                  return '<div class="flex gap-2 text-xs">' + cells.map(c => `<span class="px-2 py-0.5 rounded" style="background: rgba(255,255,255,0.05); color: rgba(168,184,216,0.8)">${c.trim()}</span>`).join('') + '</div>';
                })
                .replace(/\n- (.*)/g, '<div class="flex items-start gap-2 text-xs mt-1"><span style="color: #00F5FF; flex-shrink: 0">▸</span><span>$1</span></div>')
                .replace(/\n\n/g, '<br/>')
                .replace(/\n/g, '<br/>')
            }}
          />
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      content: agentResponses.default,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate agent thinking
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));

    const response = getAgentResponse(text);
    const agentMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "agent",
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, agentMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: "#050810", paddingLeft: "64px" }}
    >
      <GaussianSplatBackground />

      {/* Header */}
      <div
        className="relative z-20 flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{
          background: "rgba(5,8,16,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,245,255,0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{
              backgroundImage: `url(${AGENT_BG})`,
              backgroundSize: "cover",
              border: "1px solid rgba(0,245,255,0.4)",
              boxShadow: "0 0 16px rgba(0,245,255,0.2)"
            }}
          >
            ◆
          </div>
          <div>
            <h1
              className="text-base font-bold text-glow-cyan"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              GenAI World Model Agent
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full pulse-cyan" style={{ background: "#00FF88" }} />
              <span className="text-xs text-slate-500 mono-data">在线 · 生成式AI领域专家</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="tag-badge tag-cyan">GPT-4 Powered</span>
          <span className="tag-badge tag-purple">Knowledge Base v1.0</span>
        </div>
      </div>

      {/* Quick questions */}
      <div
        className="relative z-20 px-6 py-3 flex-shrink-0 overflow-x-auto"
        style={{
          background: "rgba(5,8,16,0.7)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex gap-2 min-w-max">
          <span className="text-xs text-slate-600 mono-data self-center flex-shrink-0">快速提问:</span>
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="text-xs px-3 py-1.5 rounded-full flex-shrink-0 transition-all hover:scale-105"
              style={{
                background: "rgba(0,245,255,0.06)",
                border: "1px solid rgba(0,245,255,0.2)",
                color: "rgba(0,245,255,0.8)",
                fontFamily: "'Noto Sans SC', sans-serif",
                whiteSpace: "nowrap"
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <AnimatePresence>
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(180,79,255,0.2))",
                border: "1px solid rgba(0,245,255,0.4)",
              }}
            >
              ◆
            </div>
            <div
              className="rounded-xl"
              style={{
                background: "rgba(10, 22, 40, 0.8)",
                border: "1px solid rgba(0,245,255,0.15)",
              }}
            >
              <TypingIndicator />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className="relative z-20 px-6 py-4 flex-shrink-0"
        style={{
          background: "rgba(5,8,16,0.9)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,245,255,0.1)",
        }}
      >
        <div
          className="flex gap-3 items-end rounded-xl p-3"
          style={{
            background: "rgba(10,22,40,0.8)",
            border: "1px solid rgba(0,245,255,0.2)",
            boxShadow: "0 0 20px rgba(0,245,255,0.05)",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="询问关于生成式AI的任何问题... (Enter发送, Shift+Enter换行)"
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-sm text-white placeholder-slate-600"
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              maxHeight: "120px",
              lineHeight: "1.6",
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            style={{
              background: input.trim() && !isTyping
                ? "linear-gradient(135deg, rgba(0,245,255,0.3), rgba(180,79,255,0.3))"
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${input.trim() && !isTyping ? "rgba(0,245,255,0.5)" : "rgba(255,255,255,0.1)"}`,
              color: input.trim() && !isTyping ? "#00F5FF" : "rgba(168,184,216,0.4)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            发送 →
          </button>
        </div>
        <div className="text-xs text-slate-700 mt-2 text-center mono-data">
          本Agent基于预置知识库，仅供学习参考 · 实际部署需接入LLM API
        </div>
      </div>
    </div>
  );
}
