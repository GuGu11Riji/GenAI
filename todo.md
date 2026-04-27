# GenAI World Model — TODO

## 收藏功能
- [x] 在 drizzle/schema.ts 添加 user_favorites 表
- [x] 运行 pnpm db:push 推送迁移
- [x] 在 server/routers.ts 添加 favorites tRPC 路由（toggle/check/list/counts）
- [x] 创建 FavoriteButton 组件（心形按鈕，带乐观更新和爆炸粒子）
- [x] 在 ProjectsPage 每个项目卡片添加收藏按鈕
- [x] 在 ResearchersPage 每个研究者卡片添加收藏按鈕
- [x] 创建 ProfilePage（/profile）展示用户收藏列表
- [x] 在 SideNav 添加 ♡ 收藏入口
- [x] 在 App.tsx 注册 /profile 路由

## 定时任务
- [x] 在 server/routers.ts 添加 scheduled.refresh tRPC 路由
- [x] 在 server/_core/index.ts 注册 POST /api/scheduled/refresh HTTP 接口
- [x] 接口支持 GitHub Trending 多主题抓取 + Semantic Scholar 论文更新
- [x] 在 Manus 平台创建每日凌晨 2 点计划任务（cron: 0 0 2 * * *）
- [x] 测试定时任务 API 返回 {ok:true, success:true}

## 完成后
- [ ] 保存检查点
- [ ] 推送到 GitHub
