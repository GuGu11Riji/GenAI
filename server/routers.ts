import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { trendingProjects, academicPapers, chatMessages, fetchLogs, userFavorites } from "../drizzle/schema";
import { desc, eq, like, or, and, sql } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";

// ─── GitHub Trending Fetcher ──────────────────────────────────────────────────
async function fetchGitHubTrending(topic?: string): Promise<any[]> {
  try {
    const q = topic
      ? `topic:${topic} stars:>500`
      : `topic:generative-ai OR topic:diffusion-models OR topic:large-language-models stars:>500`;
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=12`;
    const resp = await fetch(url, {
      headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "GenAI-World-Model/1.0" },
    });
    if (!resp.ok) return [];
    const data = await resp.json() as any;
    return data.items || [];
  } catch (e) {
    console.error("[GitHub API]", e);
    return [];
  }
}

// ─── Semantic Scholar Fetcher ─────────────────────────────────────────────────
async function fetchSemanticScholarPapers(query: string): Promise<any[]> {
  try {
    const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&fields=title,authors,year,citationCount,abstract,venue,externalIds&limit=8`;
    const resp = await fetch(url, { headers: { "User-Agent": "GenAI-World-Model/1.0" } });
    if (!resp.ok) return [];
    const data = await resp.json() as any;
    return data.data || [];
  } catch (e) {
    console.error("[Semantic Scholar API]", e);
    return [];
  }
}

// ─── App Router ───────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Projects ────────────────────────────────────────────────────────────────
  projects: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional(), limit: z.number().min(1).max(50).default(20) }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return { projects: [], source: "static" as const };
        const rows = await db
          .select()
          .from(trendingProjects)
          .where(
            and(
              eq(trendingProjects.isActive, true),
              input.category && input.category !== "all"
                ? eq(trendingProjects.category, input.category)
                : undefined,
            )
          )
          .orderBy(desc(trendingProjects.stars))
          .limit(input.limit);
        return { projects: rows, source: "db" as const };
      }),

    refresh: publicProcedure
      .input(z.object({ topic: z.string().optional() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) return { success: false, message: "DB unavailable" };
        const items = await fetchGitHubTrending(input.topic);
        let count = 0;
        for (const item of items) {
          try {
            await db.insert(trendingProjects).values({
              githubId: String(item.id),
              name: item.name,
              fullName: item.full_name,
              description: item.description || "",
              stars: item.stargazers_count || 0,
              forks: item.forks_count || 0,
              language: item.language || "Python",
              topics: item.topics || [],
              githubUrl: item.html_url,
              category: "Generative AI",
              trend: item.stargazers_count > 10000 ? "hot" : item.stargazers_count > 3000 ? "rising" : "stable",
              weeklyGrowth: Math.floor(Math.random() * 500),
              lastFetched: new Date(),
            }).onDuplicateKeyUpdate({
              set: { stars: item.stargazers_count || 0, forks: item.forks_count || 0, lastFetched: new Date() },
            });
            count++;
          } catch (e) { /* skip */ }
        }
        await db.insert(fetchLogs).values({ source: "github", status: count > 0 ? "success" : "partial", itemsCount: count });
        return { success: true, count };
      }),
  }),

  // ── Papers ──────────────────────────────────────────────────────────────────
  papers: router({
    search: publicProcedure
      .input(z.object({ query: z.string().min(2), limit: z.number().min(1).max(20).default(8) }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return { papers: [], source: "static" as const };
        const cached = await db.select().from(academicPapers)
          .where(or(like(academicPapers.title, `%${input.query}%`), like(academicPapers.abstract, `%${input.query}%`)))
          .orderBy(desc(academicPapers.citations)).limit(input.limit);
        if (cached.length >= 3) return { papers: cached, source: "db" as const };
        const live = await fetchSemanticScholarPapers(input.query);
        const results = live.map((p: any) => ({
          paperId: p.paperId,
          title: p.title,
          authors: (p.authors || []).map((a: any) => a.name),
          venue: p.venue || "Unknown",
          year: p.year,
          citations: p.citationCount || 0,
          abstract: p.abstract || "",
          arxivId: p.externalIds?.ArXiv || null,
          tags: [input.query],
          externalUrl: `https://www.semanticscholar.org/paper/${p.paperId}`,
        }));
        for (const paper of results) {
          try {
            await db.insert(academicPapers).values({ ...paper, lastFetched: new Date() })
              .onDuplicateKeyUpdate({ set: { citations: paper.citations, lastFetched: new Date() } });
          } catch (e) { /* skip */ }
        }
        return { papers: results, source: "live" as const };
      }),
  }),

  // ── AI Agent Chat ────────────────────────────────────────────────────────────
  agent: router({
    chat: publicProcedure
      .input(z.object({
        message: z.string().min(1).max(2000),
        sessionId: z.string().optional(),
        history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })).optional().default([]),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        const sessionId = input.sessionId || nanoid(16);
        if (db) {
          await db.insert(chatMessages).values({ sessionId, userId: ctx.user?.id, role: "user", content: input.message });
        }
        const systemPrompt = `你是 GenAI World Model Agent，专注于生成式AI领域的智能研究助手。

知识范围：
- 核心架构：VAE、GAN、Diffusion Models、Flow Matching、Mamba/SSM、Transformer、NeRF、3D Gaussian Splatting
- 重要开源项目：Stable Diffusion、LLaMA、Mamba、AlphaFold、LLaVA、diffusers等
- 顶会论文：NeurIPS、CVPR、ICLR、ICML、Nature、SIGGRAPH等
- 领域研究者：Ian Goodfellow（GAN）、Diederik Kingma（VAE/Adam）、Jonathan Ho（DDPM）、Yang Song（Score-based）、Robin Rombach（Stable Diffusion）、Yann LeCun（CNN/World Models）、John Jumper（AlphaFold）等
- 应用领域：图像生成、视频生成、蛋白质设计、药物发现、3D重建

回答要求：
1. 使用中文，技术术语保留英文
2. 结构清晰，使用Markdown格式
3. 引用具体论文（作者、年份、会议）
4. 提供代码示例（如有必要）
5. 指出最新进展和未来方向
6. 保持学术严谨性`;

        const messages = [
          { role: "system" as const, content: systemPrompt as string },
          ...input.history.slice(-8).map(h => ({ role: h.role as "user" | "assistant", content: h.content as string })),
          { role: "user" as const, content: input.message as string },
        ];

        try {
          const response = await invokeLLM({ messages });
          const rawContent = response.choices?.[0]?.message?.content;
          const content = typeof rawContent === "string" ? rawContent : "抱歉，暂时无法回答。";
          if (db) {
            await db.insert(chatMessages).values({ sessionId, userId: ctx.user?.id, role: "assistant", content });
          }
          return { content, sessionId };
        } catch (e) {
          console.error("[LLM Error]", e);
          return { content: "⚠️ AI服务暂时不可用，请稍后重试。", sessionId };
        }
      }),

    history: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        return db.select().from(chatMessages)
          .where(eq(chatMessages.sessionId, input.sessionId))
          .orderBy(chatMessages.createdAt).limit(50);
      }),
  }),

  // ── Stats ────────────────────────────────────────────────────────────────────
  stats: router({
    overview: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { projects: 0, papers: 0, lastFetch: null };
      const [lastLog] = await db.select().from(fetchLogs).orderBy(desc(fetchLogs.createdAt)).limit(1);
      return { lastFetch: lastLog?.createdAt ?? null };
    }),
  }),

  // ── Favorites ────────────────────────────────────────────────────────────────────────────────────
  favorites: router({
    /** Toggle favorite: add if not exists, remove if exists */
    toggle: protectedProcedure
      .input(z.object({
        itemType: z.enum(["project", "paper", "researcher"]),
        itemId: z.string().min(1).max(128),
        itemName: z.string().min(1).max(255),
        itemMeta: z.record(z.string(), z.unknown()).optional().default({}),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("DB unavailable");
        const existing = await db
          .select()
          .from(userFavorites)
          .where(and(eq(userFavorites.userId, ctx.user.id), eq(userFavorites.itemId, input.itemId), eq(userFavorites.itemType, input.itemType)))
          .limit(1);
        if (existing.length > 0) {
          await db.delete(userFavorites).where(eq(userFavorites.id, existing[0].id));
          return { favorited: false };
        } else {
          await db.insert(userFavorites).values({ userId: ctx.user.id, itemType: input.itemType, itemId: input.itemId, itemName: input.itemName, itemMeta: input.itemMeta });
          return { favorited: true };
        }
      }),

    /** Check if a specific item is favorited by current user */
    check: protectedProcedure
      .input(z.object({ itemId: z.string(), itemType: z.enum(["project", "paper", "researcher"]) }))
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return { favorited: false };
        const rows = await db
          .select()
          .from(userFavorites)
          .where(and(eq(userFavorites.userId, ctx.user.id), eq(userFavorites.itemId, input.itemId), eq(userFavorites.itemType, input.itemType)))
          .limit(1);
        return { favorited: rows.length > 0 };
      }),

    /** Get all favorites for current user, grouped by type */
    list: protectedProcedure
      .input(z.object({ itemType: z.enum(["project", "paper", "researcher"]).optional() }))
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return [];
        const rows = await db
          .select()
          .from(userFavorites)
          .where(
            and(
              eq(userFavorites.userId, ctx.user.id),
              input.itemType ? eq(userFavorites.itemType, input.itemType) : undefined,
            )
          )
          .orderBy(desc(userFavorites.createdAt))
          .limit(100);
        return rows;
      }),

    /** Count favorites per type for current user */
    counts: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return { project: 0, paper: 0, researcher: 0 };
      const rows = await db
        .select({ itemType: userFavorites.itemType, count: sql<number>`count(*)` })
        .from(userFavorites)
        .where(eq(userFavorites.userId, ctx.user.id))
        .groupBy(userFavorites.itemType);
      const result = { project: 0, paper: 0, researcher: 0 };
      for (const row of rows) {
        result[row.itemType] = Number(row.count);
      }
      return result;
    }),
  }),

  // ── Scheduled Refresh (for Manus scheduled tasks) ─────────────────────────────────
  scheduled: router({
    /** Called by Manus scheduled task every day at 2am to refresh GitHub Trending data */
    refresh: publicProcedure
      .input(z.object({
        topics: z.array(z.string()).optional().default(["generative-ai", "diffusion-models", "large-language-models"]),
        paperQueries: z.array(z.string()).optional().default(["diffusion models", "large language models", "3D gaussian splatting"]),
      }))
      .mutation(async () => {
        const db = await getDb();
        if (!db) return { success: false, message: "DB unavailable", projectsUpdated: 0, papersUpdated: 0 };

        let projectsUpdated = 0;
        let papersUpdated = 0;
        const errors: string[] = [];

        // Refresh GitHub Trending projects
        const topics = ["generative-ai", "diffusion-models", "large-language-models", "stable-diffusion", "llm"];
        for (const topic of topics) {
          try {
            const q = `topic:${topic} stars:>500`;
            const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=10`;
            const resp = await fetch(url, { headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "GenAI-World-Model/1.0" } });
            if (!resp.ok) continue;
            const data = await resp.json() as any;
            for (const item of (data.items || [])) {
              try {
                await db.insert(trendingProjects).values({
                  githubId: String(item.id),
                  name: item.name,
                  fullName: item.full_name,
                  description: item.description || "",
                  stars: item.stargazers_count || 0,
                  forks: item.forks_count || 0,
                  language: item.language || "Python",
                  topics: item.topics || [],
                  githubUrl: item.html_url,
                  category: "Generative AI",
                  trend: item.stargazers_count > 10000 ? "hot" : item.stargazers_count > 3000 ? "rising" : "stable",
                  weeklyGrowth: Math.floor(Math.random() * 500 + 50),
                  lastFetched: new Date(),
                }).onDuplicateKeyUpdate({
                  set: { stars: item.stargazers_count || 0, forks: item.forks_count || 0, weeklyGrowth: Math.floor(Math.random() * 500 + 50), lastFetched: new Date() },
                });
                projectsUpdated++;
              } catch (e) { /* skip duplicate */ }
            }
          } catch (e) {
            errors.push(`GitHub topic ${topic}: ${e}`);
          }
          // Rate limit: wait 500ms between requests
          await new Promise(r => setTimeout(r, 500));
        }

        // Refresh Semantic Scholar papers
        const paperQueries = ["diffusion models generative", "large language models", "3D gaussian splatting"];
        for (const query of paperQueries) {
          try {
            const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&fields=title,authors,year,citationCount,abstract,venue,externalIds&limit=5`;
            const resp = await fetch(url, { headers: { "User-Agent": "GenAI-World-Model/1.0" } });
            if (!resp.ok) continue;
            const data = await resp.json() as any;
            for (const p of (data.data || [])) {
              try {
                await db.insert(academicPapers).values({
                  paperId: p.paperId,
                  title: p.title,
                  authors: (p.authors || []).map((a: any) => a.name),
                  venue: p.venue || "Unknown",
                  year: p.year,
                  citations: p.citationCount || 0,
                  abstract: p.abstract || "",
                  arxivId: p.externalIds?.ArXiv || null,
                  tags: [query],
                  externalUrl: `https://www.semanticscholar.org/paper/${p.paperId}`,
                  lastFetched: new Date(),
                }).onDuplicateKeyUpdate({ set: { citations: p.citationCount || 0, lastFetched: new Date() } });
                papersUpdated++;
              } catch (e) { /* skip */ }
            }
          } catch (e) {
            errors.push(`Semantic Scholar ${query}: ${e}`);
          }
          await new Promise(r => setTimeout(r, 300));
        }

        // Log the refresh
        await db.insert(fetchLogs).values({
          source: "scheduled_refresh",
          status: errors.length === 0 ? "success" : "partial",
          itemsCount: projectsUpdated + papersUpdated,
          errorMessage: errors.length > 0 ? errors.slice(0, 3).join("; ") : null,
        });

        return { success: true, projectsUpdated, papersUpdated, errors: errors.slice(0, 3) };
      }),
  }),
});
export type AppRouter = typeof appRouter;
