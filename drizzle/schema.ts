import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Trending Projects (cached from GitHub API) ───────────────────────────────
export const trendingProjects = mysqlTable("trending_projects", {
  id: int("id").autoincrement().primaryKey(),
  githubId: varchar("githubId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  description: text("description"),
  descriptionZh: text("descriptionZh"),
  stars: int("stars").default(0).notNull(),
  forks: int("forks").default(0).notNull(),
  language: varchar("language", { length: 64 }),
  topics: json("topics").$type<string[]>().default([]),
  githubUrl: varchar("githubUrl", { length: 512 }).notNull(),
  category: varchar("category", { length: 128 }),
  trend: mysqlEnum("trend", ["hot", "rising", "stable"]).default("stable").notNull(),
  weeklyGrowth: int("weeklyGrowth").default(0),
  paperIds: json("paperIds").$type<string[]>().default([]),
  isActive: boolean("isActive").default(true).notNull(),
  lastFetched: timestamp("lastFetched").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TrendingProject = typeof trendingProjects.$inferSelect;
export type InsertTrendingProject = typeof trendingProjects.$inferInsert;

// ─── Papers (cached from Semantic Scholar) ────────────────────────────────────
export const academicPapers = mysqlTable("academic_papers", {
  id: int("id").autoincrement().primaryKey(),
  paperId: varchar("paperId", { length: 128 }).notNull().unique(),
  title: text("title").notNull(),
  authors: json("authors").$type<string[]>().default([]),
  venue: varchar("venue", { length: 128 }),
  year: int("year"),
  citations: int("citations").default(0),
  abstract: text("abstract"),
  arxivId: varchar("arxivId", { length: 64 }),
  tags: json("tags").$type<string[]>().default([]),
  externalUrl: varchar("externalUrl", { length: 512 }),
  lastFetched: timestamp("lastFetched").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AcademicPaper = typeof academicPapers.$inferSelect;
export type InsertAcademicPaper = typeof academicPapers.$inferInsert;

// ─── Agent Chat History ────────────────────────────────────────────────────────
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  userId: int("userId"),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// ─── Data Fetch Logs ──────────────────────────────────────────────────────────
export const fetchLogs = mysqlTable("fetch_logs", {
  id: int("id").autoincrement().primaryKey(),
  source: varchar("source", { length: 64 }).notNull(),
  status: mysqlEnum("status", ["success", "error", "partial"]).notNull(),
  itemsCount: int("itemsCount").default(0),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FetchLog = typeof fetchLogs.$inferSelect;