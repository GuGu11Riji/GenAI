# GenAI World Model — 设计理念文档

<response>
<idea>
**Design Movement**: 深空量子美学（Deep Space Quantum Aesthetics）

**Core Principles**:
1. 黑暗宇宙背景 + 高斯泼溅粒子效果：模拟3D点云/高斯分布的发光粒子群，代表知识节点在空间中的分布
2. 非对称信息架构：左侧固定导航栏（深色玻璃态），右侧主内容区域采用不规则网格布局
3. 数据可视化优先：所有信息以图谱、时间轴、粒子云等可视化形式呈现，而非纯文本列表
4. 层次感与深度：多层次玻璃态卡片（glassmorphism），背景粒子、中层内容、前层交互三层分离

**Color Philosophy**:
- 主色：深空黑 `#050810` 作为背景基底，象征无限知识空间
- 粒子色谱：从深蓝 `#0066FF` → 青色 `#00FFFF` → 紫色 `#8B00FF` → 洋红 `#FF00FF` 的渐变光谱，模拟高斯泼溅的彩色点云
- 强调色：荧光青 `#00F5FF`（主交互色）、荧光紫 `#B44FFF`（次要强调）
- 文字：纯白 `#FFFFFF`（标题）、浅蓝灰 `#A8B8D8`（正文）
- 情感意图：科技感、神秘感、探索欲，让用户感受到进入一个知识宇宙

**Layout Paradigm**:
- 左侧固定导航栏（64px宽，图标+文字，深色玻璃态）
- 主内容区采用不规则Masonry网格，卡片大小不一，形成视觉节奏
- 全屏Canvas背景层（WebGL粒子系统）
- 悬浮式信息面板（点击节点后从右侧滑入）

**Signature Elements**:
1. 高斯泼溅粒子背景：数千个彩色发光粒子以高斯分布聚类，可交互旋转（Three.js/Canvas 2D模拟）
2. 脉冲连接线：知识节点之间的动态连接线，带有数据流动的光点动画
3. 玻璃态卡片：`backdrop-filter: blur(16px)` + 半透明边框，悬停时发光描边

**Interaction Philosophy**:
- 悬停：卡片上浮 + 发光描边 + 粒子向鼠标聚集
- 点击：节点展开详情面板，背景粒子重新聚焦
- 滚动：视差效果，粒子层缓慢移动
- 搜索：实时过滤，未匹配节点淡出，匹配节点高亮

**Animation**:
- 粒子背景：持续缓慢旋转，每个粒子有独立的漂浮轨迹（sin/cos波动）
- 页面进入：内容从下方淡入上升（stagger动画）
- 卡片悬停：scale(1.02) + box-shadow扩散 + 边框发光（0.3s ease）
- 数据加载：骨架屏 → 内容淡入，带有扫光效果
- 时间轴：节点从左到右依次出现，连接线绘制动画

**Typography System**:
- 标题字体：Space Grotesk（科技感几何无衬线体）+ 字重 700/800
- 正文字体：IBM Plex Mono（等宽字体，强化代码/数据感）
- 辅助字体：Noto Sans SC（中文内容）
- 层级：Hero标题 4rem/800，区块标题 1.75rem/700，卡片标题 1.1rem/600，正文 0.875rem/400
- 特效：标题文字渐变色（从青色到紫色的线性渐变）
</idea>
<text>深空量子美学 — 以高斯泼溅粒子宇宙为核心视觉语言</text>
<probability>0.08</probability>
</response>

<response>
<idea>
**Design Movement**: 赛博朋克学术界（Cyberpunk Academia）
- 霓虹色彩 + 学术排版 + 数据终端美学
</idea>
<text>赛博朋克学术界风格</text>
<probability>0.06</probability>
</response>

<response>
<idea>
**Design Movement**: 极简数字禅意（Minimal Digital Zen）
- 大量留白 + 单色系 + 微妙动效
</idea>
<text>极简数字禅意风格</text>
<probability>0.05</probability>
</response>

---

## 选定方案：深空量子美学

**核心设计决策**：
- 背景：深空黑 Canvas 粒子系统（模拟高斯泼溅点云）
- 导航：左侧固定图标导航栏（玻璃态）
- 内容：不规则网格 + 玻璃态卡片
- 字体：Space Grotesk（英文标题）+ IBM Plex Mono（数据）+ Noto Sans SC（中文）
- 主色调：深空黑背景 + 青紫渐变强调色
