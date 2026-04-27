// GenAI World Model — 全站数据库
// 设计理念：深空量子美学，高斯泼溅粒子宇宙

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  citations: number;
  abstract: string;
  arxivId?: string;
  tags: string[];
}

export interface OpenSourceProject {
  id: string;
  name: string;
  description: string;
  descriptionZh: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  githubUrl: string;
  lastUpdate: string;
  trend: 'hot' | 'rising' | 'stable';
  papers: string[]; // paper ids
  category: string;
  weeklyGrowth: number;
}

export interface Researcher {
  id: string;
  name: string;
  nameZh?: string;
  affiliation: string;
  avatar?: string;
  hIndex: number;
  citations: number;
  rank: number;
  expertise: string[];
  bio: string;
  bioZh: string;
  keyContributions: string[];
  papers: string[];
  homepage?: string;
  googleScholar?: string;
  impact: 'legendary' | 'pioneer' | 'rising';
  researchValue: string;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'model' | 'application' | 'paper' | 'researcher' | 'concept';
  x: number;
  y: number;
  size: number;
  color: string;
  connections: string[];
  year?: number;
  description?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  month?: number;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  type: 'architecture' | 'application' | 'milestone' | 'dataset';
  impact: 'revolutionary' | 'significant' | 'notable';
  papers: string[];
  tags: string[];
}

// ============================================================
// PAPERS DATABASE
// ============================================================
export const papers: Paper[] = [
  {
    id: "vae-2013",
    title: "Auto-Encoding Variational Bayes",
    authors: ["Diederik P. Kingma", "Max Welling"],
    venue: "ICLR",
    year: 2014,
    citations: 42000,
    abstract: "We introduce a stochastic variational inference and learning algorithm that scales to large datasets and, under some mild differentiability conditions, even works in the intractable case.",
    arxivId: "1312.6114",
    tags: ["VAE", "Generative Models", "Variational Inference", "Latent Space"]
  },
  {
    id: "gan-2014",
    title: "Generative Adversarial Networks",
    authors: ["Ian Goodfellow", "Jean Pouget-Abadie", "Mehdi Mirza", "Bing Xu", "David Warde-Farley", "Sherjil Ozair", "Aaron Courville", "Yoshua Bengio"],
    venue: "NeurIPS",
    year: 2014,
    citations: 65000,
    abstract: "We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D.",
    arxivId: "1406.2661",
    tags: ["GAN", "Generative Models", "Adversarial Training"]
  },
  {
    id: "ddpm-2020",
    title: "Denoising Diffusion Probabilistic Models",
    authors: ["Jonathan Ho", "Ajay Jain", "Pieter Abbeel"],
    venue: "NeurIPS",
    year: 2020,
    citations: 18000,
    abstract: "We present high quality image synthesis results using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",
    arxivId: "2006.11239",
    tags: ["Diffusion Models", "DDPM", "Image Generation", "Score Matching"]
  },
  {
    id: "ldm-2022",
    title: "High-Resolution Image Synthesis with Latent Diffusion Models",
    authors: ["Robin Rombach", "Andreas Blattmann", "Dominik Lorenz", "Patrick Esser", "Björn Ommer"],
    venue: "CVPR",
    year: 2022,
    citations: 12000,
    abstract: "By decomposing the image formation process into a sequential application of denoising autoencoders, diffusion models (DMs) achieve state-of-the-art synthesis results on image data and beyond.",
    arxivId: "2112.10752",
    tags: ["Latent Diffusion", "Stable Diffusion", "Image Synthesis", "CVPR 2022"]
  },
  {
    id: "transformer-2017",
    title: "Attention Is All You Need",
    authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Llion Jones", "Aidan N. Gomez", "Łukasz Kaiser", "Illia Polosukhin"],
    venue: "NeurIPS",
    year: 2017,
    citations: 110000,
    abstract: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    arxivId: "1706.03762",
    tags: ["Transformer", "Attention Mechanism", "NLP", "Foundation"]
  },
  {
    id: "gpt3-2020",
    title: "Language Models are Few-Shot Learners",
    authors: ["Tom Brown", "Benjamin Mann", "Nick Ryder", "Melanie Subbiah", "Jared Kaplan"],
    venue: "NeurIPS",
    year: 2020,
    citations: 35000,
    abstract: "We demonstrate that scaling language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art fine-tuning approaches.",
    arxivId: "2005.14165",
    tags: ["GPT-3", "Large Language Models", "Few-Shot Learning", "Scaling"]
  },
  {
    id: "clip-2021",
    title: "Learning Transferable Visual Models From Natural Language Supervision",
    authors: ["Alec Radford", "Jong Wook Kim", "Chris Hallacy", "Aditya Ramesh"],
    venue: "ICML",
    year: 2021,
    citations: 22000,
    abstract: "We demonstrate that the simple pre-training task of predicting which caption goes with which image is an efficient and scalable way to learn SOTA image representations from scratch.",
    arxivId: "2103.00020",
    tags: ["CLIP", "Vision-Language", "Contrastive Learning", "Zero-Shot"]
  },
  {
    id: "dit-2023",
    title: "Scalable Diffusion Models with Transformers",
    authors: ["William Peebles", "Saining Xie"],
    venue: "ICCV",
    year: 2023,
    citations: 3500,
    abstract: "We explore a new class of diffusion models based on the transformer architecture. We train latent diffusion models of images, replacing the commonly-used U-Net backbone with a transformer.",
    arxivId: "2212.09748",
    tags: ["DiT", "Diffusion Transformer", "Scalable Generation", "ICCV 2023"]
  },
  {
    id: "sora-2024",
    title: "Video Generation Models as World Simulators",
    authors: ["OpenAI Team"],
    venue: "Technical Report",
    year: 2024,
    citations: 2800,
    abstract: "We explore large-scale training of generative models on video data. Specifically, we train text-conditional diffusion models jointly on videos and images of variable durations, resolutions, and aspect ratios.",
    tags: ["Sora", "Video Generation", "World Models", "Diffusion"]
  },
  {
    id: "alphafold2-2021",
    title: "Highly accurate protein structure prediction with AlphaFold",
    authors: ["John Jumper", "Richard Evans", "Alexander Pritzel"],
    venue: "Nature",
    year: 2021,
    citations: 28000,
    abstract: "We developed AlphaFold, a protein structure prediction method that achieved median backbone accuracy of 0.96 Å RMSD95 on the CASP14 dataset.",
    tags: ["AlphaFold", "Protein Structure", "Biology", "Deep Learning"]
  },
  {
    id: "flow-matching-2022",
    title: "Flow Matching for Generative Modeling",
    authors: ["Yaron Lipman", "Ricky T. Q. Chen", "Heli Ben-Hamu", "Maximilian Nickel", "Matt Le"],
    venue: "ICLR",
    year: 2023,
    citations: 1800,
    abstract: "We introduce a new paradigm for generative modeling built on Continuous Normalizing Flows (CNFs) which we train using a simple and general method we term Flow Matching.",
    arxivId: "2210.02747",
    tags: ["Flow Matching", "Normalizing Flows", "Generative Models", "ODE"]
  },
  {
    id: "mamba-2023",
    title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
    authors: ["Albert Gu", "Tri Dao"],
    venue: "ICLR",
    year: 2024,
    citations: 4200,
    abstract: "We propose a new architecture, Mamba, based on selective state space models. Mamba enjoys fast inference and linear scaling in sequence length.",
    arxivId: "2312.00752",
    tags: ["Mamba", "State Space Models", "Sequence Modeling", "Efficient"]
  },
  {
    id: "nerf-2020",
    title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis",
    authors: ["Ben Mildenhall", "Pratul P. Srinivasan", "Matthew Tancik"],
    venue: "ECCV",
    year: 2020,
    citations: 14000,
    abstract: "We present a method that achieves state-of-the-art results for synthesizing novel views of complex scenes by optimizing an underlying continuous volumetric scene function.",
    arxivId: "2003.08934",
    tags: ["NeRF", "Neural Rendering", "3D Generation", "View Synthesis"]
  },
  {
    id: "3dgs-2023",
    title: "3D Gaussian Splatting for Real-Time Radiance Field Rendering",
    authors: ["Bernhard Kerbl", "Georgios Kopanas", "Thomas Leimkühler", "George Drettakis"],
    venue: "SIGGRAPH",
    year: 2023,
    citations: 5600,
    abstract: "We introduce three key elements that allow us to achieve state-of-the-art visual quality while maintaining competitive training times and importantly allow high-quality real-time novel-view synthesis.",
    arxivId: "2308.04079",
    tags: ["3D Gaussian Splatting", "Real-Time Rendering", "NeRF", "SIGGRAPH 2023"]
  },
  {
    id: "llava-2023",
    title: "Visual Instruction Tuning",
    authors: ["Haotian Liu", "Chunyuan Li", "Qingyang Wu", "Yong Jae Lee"],
    venue: "NeurIPS",
    year: 2023,
    citations: 3800,
    abstract: "We present the first attempt to use language-only GPT-4 to generate multimodal language-image instruction-following data.",
    arxivId: "2304.08485",
    tags: ["LLaVA", "Multimodal LLM", "Visual Instruction", "NeurIPS 2023"]
  }
];

// ============================================================
// OPEN SOURCE PROJECTS
// ============================================================
export const projects: OpenSourceProject[] = [
  {
    id: "stable-diffusion",
    name: "stable-diffusion",
    description: "A latent text-to-image diffusion model",
    descriptionZh: "基于潜在扩散模型的文本到图像生成系统，Stable Diffusion的官方实现，支持文生图、图生图、图像修复等多种任务",
    stars: 68400,
    forks: 10200,
    language: "Python",
    topics: ["diffusion", "text-to-image", "generative-ai", "deep-learning"],
    githubUrl: "https://github.com/CompVis/stable-diffusion",
    lastUpdate: "2024-01-15",
    trend: "hot",
    papers: ["ldm-2022", "ddpm-2020"],
    category: "Image Generation",
    weeklyGrowth: 1240
  },
  {
    id: "diffusers",
    name: "diffusers",
    description: "🤗 Diffusers: State-of-the-art diffusion models",
    descriptionZh: "HuggingFace出品的扩散模型工具库，集成了DDPM、DDIM、Stable Diffusion等主流扩散模型，提供统一的API接口",
    stars: 26800,
    forks: 5500,
    language: "Python",
    topics: ["diffusion-models", "huggingface", "pytorch", "stable-diffusion"],
    githubUrl: "https://github.com/huggingface/diffusers",
    lastUpdate: "2024-04-20",
    trend: "hot",
    papers: ["ddpm-2020", "ldm-2022", "dit-2023"],
    category: "Framework",
    weeklyGrowth: 890
  },
  {
    id: "llama",
    name: "llama",
    description: "Inference code for Llama models",
    descriptionZh: "Meta开源的大型语言模型LLaMA的推理代码，支持7B到65B参数规模，是开源LLM生态的重要基础",
    stars: 55200,
    forks: 9100,
    language: "Python",
    topics: ["llm", "language-model", "meta-ai", "inference"],
    githubUrl: "https://github.com/meta-llama/llama",
    lastUpdate: "2024-03-10",
    trend: "hot",
    papers: ["gpt3-2020", "transformer-2017"],
    category: "Language Models",
    weeklyGrowth: 2100
  },
  {
    id: "mamba",
    name: "mamba",
    description: "Mamba SSM: Linear-Time Sequence Modeling",
    descriptionZh: "基于选择性状态空间模型的序列建模架构，在长序列任务上实现线性时间复杂度，挑战Transformer的主导地位",
    stars: 12400,
    forks: 1100,
    language: "Python",
    topics: ["state-space-models", "sequence-modeling", "efficient-ai"],
    githubUrl: "https://github.com/state-spaces/mamba",
    lastUpdate: "2024-04-15",
    trend: "rising",
    papers: ["mamba-2023"],
    category: "Architecture",
    weeklyGrowth: 560
  },
  {
    id: "gaussian-splatting",
    name: "gaussian-splatting",
    description: "3D Gaussian Splatting for Real-Time Radiance Field Rendering",
    descriptionZh: "SIGGRAPH 2023最佳论文实现，使用3D高斯泼溅技术实现实时辐射场渲染，速度比NeRF快100倍以上",
    stars: 14200,
    forks: 1800,
    language: "Python",
    topics: ["3d-gaussian-splatting", "nerf", "real-time-rendering", "siggraph"],
    githubUrl: "https://github.com/graphdeco-inria/gaussian-splatting",
    lastUpdate: "2024-02-28",
    trend: "hot",
    papers: ["3dgs-2023", "nerf-2020"],
    category: "3D Generation",
    weeklyGrowth: 780
  },
  {
    id: "alphaFold2",
    name: "alphafold",
    description: "AlphaFold protein structure prediction",
    descriptionZh: "DeepMind开源的蛋白质结构预测系统，在CASP14竞赛中以压倒性优势获胜，被誉为生物学领域的里程碑",
    stars: 12800,
    forks: 2300,
    language: "Python",
    topics: ["protein-structure", "biology", "deep-learning", "alphafold"],
    githubUrl: "https://github.com/google-deepmind/alphafold",
    lastUpdate: "2024-01-20",
    trend: "stable",
    papers: ["alphafold2-2021"],
    category: "Scientific AI",
    weeklyGrowth: 120
  },
  {
    id: "llava",
    name: "LLaVA",
    description: "Large Language and Vision Assistant",
    descriptionZh: "多模态大语言模型，将视觉编码器与大语言模型结合，实现图文理解与对话，是开源多模态LLM的代表作",
    stars: 20100,
    forks: 2400,
    language: "Python",
    topics: ["multimodal", "llm", "vision-language", "instruction-tuning"],
    githubUrl: "https://github.com/haotian-liu/LLaVA",
    lastUpdate: "2024-04-10",
    trend: "hot",
    papers: ["llava-2023", "clip-2021"],
    category: "Multimodal",
    weeklyGrowth: 1050
  },
  {
    id: "flow-matching",
    name: "flow_matching",
    description: "Flow Matching for Generative Modeling",
    descriptionZh: "基于连续归一化流的生成模型训练范式，比扩散模型更简洁高效，已被Meta用于音频和图像生成",
    stars: 3800,
    forks: 420,
    language: "Python",
    topics: ["flow-matching", "generative-models", "normalizing-flows"],
    githubUrl: "https://github.com/facebookresearch/flow_matching",
    lastUpdate: "2024-03-25",
    trend: "rising",
    papers: ["flow-matching-2022"],
    category: "Generative Framework",
    weeklyGrowth: 340
  }
];

// ============================================================
// RESEARCHERS DATABASE
// ============================================================
export const researchers: Researcher[] = [
  {
    id: "ian-goodfellow",
    name: "Ian Goodfellow",
    nameZh: "伊恩·古德费洛",
    affiliation: "Apple / Google Brain (former)",
    hIndex: 58,
    citations: 185000,
    rank: 1,
    expertise: ["GANs", "Adversarial Examples", "Deep Learning", "Generative Models"],
    bio: "Creator of Generative Adversarial Networks (GANs), one of the most influential ideas in machine learning. Former Research Scientist at Google Brain and OpenAI.",
    bioZh: "生成对抗网络（GAN）的发明者，深度学习领域最具影响力的研究者之一。曾任职于Google Brain和OpenAI，现在Apple担任研究职务。其GAN论文被引用超过65,000次，彻底改变了生成式AI的研究方向。",
    keyContributions: [
      "发明生成对抗网络（GAN）",
      "对抗样本的系统性研究",
      "深度学习教科书合著者",
      "条件GAN、InfoGAN等变体"
    ],
    papers: ["gan-2014"],
    impact: "legendary",
    researchValue: "GAN的发明开创了生成式AI的新纪元，直接催生了图像生成、视频合成、数据增强等数十个研究方向，影响力难以估量。"
  },
  {
    id: "diederik-kingma",
    name: "Diederik P. Kingma",
    nameZh: "迪德里克·金马",
    affiliation: "Google DeepMind",
    hIndex: 45,
    citations: 120000,
    rank: 2,
    expertise: ["VAE", "Normalizing Flows", "Diffusion Models", "Variational Inference"],
    bio: "Creator of Variational Autoencoders (VAE) and Adam optimizer. Pioneer in probabilistic generative modeling and variational inference.",
    bioZh: "变分自编码器（VAE）和Adam优化器的发明者。在概率生成模型和变分推断领域做出了奠基性贡献，VAE论文引用超过42,000次，Adam优化器更是成为深度学习训练的标准工具。",
    keyContributions: [
      "发明变分自编码器（VAE）",
      "发明Adam优化器",
      "归一化流研究",
      "扩散模型理论贡献"
    ],
    papers: ["vae-2013"],
    impact: "legendary",
    researchValue: "VAE建立了深度生成模型的概率框架，Adam优化器成为深度学习训练的事实标准，两项贡献均具有里程碑意义。"
  },
  {
    id: "jonathan-ho",
    name: "Jonathan Ho",
    nameZh: "何乔纳森",
    affiliation: "Google DeepMind",
    hIndex: 28,
    citations: 45000,
    rank: 3,
    expertise: ["Diffusion Models", "DDPM", "Video Generation", "Score Matching"],
    bio: "Lead author of DDPM (Denoising Diffusion Probabilistic Models), which sparked the diffusion model revolution in generative AI.",
    bioZh: "DDPM（去噪扩散概率模型）的主要作者，该论文引发了生成式AI领域的扩散模型革命。其工作直接催生了Stable Diffusion、DALL-E 2、Imagen等一系列重要应用，是当前生成式AI浪潮的核心推动者。",
    keyContributions: [
      "DDPM去噪扩散概率模型",
      "Classifier-Free Guidance",
      "视频扩散模型",
      "Imagen文本到图像生成"
    ],
    papers: ["ddpm-2020"],
    impact: "pioneer",
    researchValue: "DDPM论文是扩散模型领域的奠基之作，直接推动了Stable Diffusion等商业产品的诞生，引用量持续快速增长。"
  },
  {
    id: "yang-song",
    name: "Yang Song",
    nameZh: "宋阳",
    affiliation: "OpenAI",
    hIndex: 32,
    citations: 38000,
    rank: 4,
    expertise: ["Score-Based Models", "Diffusion Models", "Stochastic Differential Equations"],
    bio: "Pioneer in score-based generative models and stochastic differential equations for generation. His work unified diffusion models and score matching.",
    bioZh: "基于分数的生成模型和随机微分方程生成框架的先驱。其工作将扩散模型和分数匹配统一在同一框架下，为理解和改进扩散模型提供了深刻的数学基础。",
    keyContributions: [
      "基于分数的生成模型",
      "SDE框架统一扩散模型",
      "NCSN噪声条件分数网络",
      "一致性模型加速采样"
    ],
    papers: ["ddpm-2020", "flow-matching-2022"],
    impact: "pioneer",
    researchValue: "从数学角度深刻揭示了扩散模型的本质，SDE框架成为理论研究的标准工具，对扩散模型的理论发展贡献巨大。"
  },
  {
    id: "robin-rombach",
    name: "Robin Rombach",
    nameZh: "罗宾·罗姆巴赫",
    affiliation: "Stability AI / LMU Munich",
    hIndex: 22,
    citations: 28000,
    rank: 5,
    expertise: ["Latent Diffusion Models", "Stable Diffusion", "Image Synthesis"],
    bio: "Lead author of Latent Diffusion Models (LDM) and Stable Diffusion, democratizing high-quality image generation.",
    bioZh: "潜在扩散模型（LDM）和Stable Diffusion的主要作者。通过在潜在空间而非像素空间进行扩散，大幅降低了计算成本，使高质量图像生成得以民主化，直接推动了AI图像生成工具的普及。",
    keyContributions: [
      "潜在扩散模型（LDM）",
      "Stable Diffusion开源发布",
      "VQ-VAE图像压缩",
      "文本条件图像生成"
    ],
    papers: ["ldm-2022"],
    impact: "pioneer",
    researchValue: "Stable Diffusion的开源发布是AI民主化的重要里程碑，催生了数以千计的应用和创业公司，社会影响力极大。"
  },
  {
    id: "yann-lecun",
    name: "Yann LeCun",
    nameZh: "杨立昆",
    affiliation: "Meta AI / NYU",
    hIndex: 95,
    citations: 320000,
    rank: 6,
    expertise: ["Convolutional Neural Networks", "Self-Supervised Learning", "World Models"],
    bio: "Turing Award winner, Chief AI Scientist at Meta. Pioneer of convolutional neural networks and advocate for self-supervised learning as the path to AGI.",
    bioZh: "图灵奖得主，Meta首席AI科学家，纽约大学教授。卷积神经网络的发明者，深度学习三巨头之一。近年来积极推动自监督学习和世界模型研究，认为这是通向AGI的关键路径。",
    keyContributions: [
      "卷积神经网络（CNN）发明",
      "LeNet手写数字识别",
      "自监督学习理论",
      "世界模型研究框架"
    ],
    papers: ["transformer-2017"],
    impact: "legendary",
    researchValue: "CNN是现代计算机视觉的基础，深度学习三巨头之一，其对自监督学习和世界模型的推动对未来AI发展方向具有深远影响。"
  },
  {
    id: "john-jumper",
    name: "John Jumper",
    nameZh: "约翰·朱珀",
    affiliation: "Google DeepMind",
    hIndex: 18,
    citations: 35000,
    rank: 7,
    expertise: ["Protein Structure Prediction", "AlphaFold", "Computational Biology"],
    bio: "Lead researcher of AlphaFold2, solving the 50-year-old protein folding problem. Nobel Prize in Chemistry 2024 co-recipient.",
    bioZh: "AlphaFold2的主要研究者，解决了困扰生物学界50年的蛋白质折叠问题。2024年诺贝尔化学奖得主。AlphaFold2在CASP14竞赛中以压倒性优势获胜，被认为是AI应用于科学发现的最重要里程碑之一。",
    keyContributions: [
      "AlphaFold2蛋白质结构预测",
      "2亿蛋白质结构数据库",
      "注意力机制在生物序列的应用",
      "2024年诺贝尔化学奖"
    ],
    papers: ["alphafold2-2021"],
    impact: "legendary",
    researchValue: "解决了生物学最重要的开放问题之一，开创了AI驱动科学发现的新范式，对药物研发、生物医学等领域影响深远。"
  },
  {
    id: "bernhard-kerbl",
    name: "Bernhard Kerbl",
    nameZh: "伯恩哈德·科布尔",
    affiliation: "Inria / TU Wien",
    hIndex: 12,
    citations: 8500,
    rank: 8,
    expertise: ["3D Gaussian Splatting", "Real-Time Rendering", "Neural Rendering"],
    bio: "Lead author of 3D Gaussian Splatting (SIGGRAPH 2023 Best Paper), revolutionizing real-time 3D scene rendering.",
    bioZh: "3D高斯泼溅（SIGGRAPH 2023最佳论文）的主要作者。该技术实现了比NeRF快100倍的实时3D场景渲染，迅速成为3D生成领域最热门的研究方向，被广泛应用于AR/VR、机器人导航等领域。",
    keyContributions: [
      "3D高斯泼溅算法",
      "实时辐射场渲染",
      "SIGGRAPH 2023最佳论文",
      "开源实现与工具链"
    ],
    papers: ["3dgs-2023"],
    impact: "rising",
    researchValue: "3DGS彻底改变了3D场景重建和渲染的范式，实时性能的突破使其在工业应用中具有巨大潜力，引用量增长极快。"
  }
];

// ============================================================
// TIMELINE EVENTS
// ============================================================
export const timelineEvents: TimelineEvent[] = [
  {
    id: "rbm-2006",
    year: 2006,
    title: "Deep Belief Networks",
    titleZh: "深度信念网络",
    description: "Hinton et al. proposed Deep Belief Networks using Restricted Boltzmann Machines, reigniting interest in deep learning.",
    descriptionZh: "Hinton等人提出深度信念网络，使用受限玻尔兹曼机进行逐层预训练，重新点燃了深度学习的研究热情，开启了深度生成模型的先河。",
    type: "architecture",
    impact: "revolutionary",
    papers: [],
    tags: ["RBM", "DBN", "Hinton", "Pretraining"]
  },
  {
    id: "vae-event",
    year: 2013,
    title: "Variational Autoencoder (VAE)",
    titleZh: "变分自编码器",
    description: "Kingma & Welling introduced VAE, providing a principled probabilistic framework for generative modeling.",
    descriptionZh: "Kingma和Welling提出VAE，将变分推断与深度学习结合，建立了生成模型的概率框架，引入了潜在空间的概念，为后续研究奠定基础。",
    type: "architecture",
    impact: "revolutionary",
    papers: ["vae-2013"],
    tags: ["VAE", "Latent Space", "Variational Inference"]
  },
  {
    id: "gan-event",
    year: 2014,
    title: "Generative Adversarial Networks (GAN)",
    titleZh: "生成对抗网络",
    description: "Goodfellow et al. proposed GANs, introducing the adversarial training paradigm that dominated generative AI for years.",
    descriptionZh: "Goodfellow等人提出GAN，通过生成器和判别器的对抗博弈实现高质量图像生成，开创了生成式AI的新纪元，引发了数千篇后续研究。",
    type: "architecture",
    impact: "revolutionary",
    papers: ["gan-2014"],
    tags: ["GAN", "Adversarial Training", "Image Generation"]
  },
  {
    id: "transformer-event",
    year: 2017,
    title: "Transformer Architecture",
    titleZh: "Transformer架构",
    description: "Vaswani et al. proposed the Transformer, replacing RNNs with self-attention and becoming the backbone of modern AI.",
    descriptionZh: "Google提出Transformer架构，完全基于注意力机制，摒弃了循环结构，成为现代AI最重要的基础架构，催生了BERT、GPT等一系列革命性模型。",
    type: "architecture",
    impact: "revolutionary",
    papers: ["transformer-2017"],
    tags: ["Transformer", "Self-Attention", "Foundation Architecture"]
  },
  {
    id: "stylegan-event",
    year: 2019,
    title: "StyleGAN — Photorealistic Face Generation",
    titleZh: "StyleGAN — 照片级人脸生成",
    description: "NVIDIA's StyleGAN achieved unprecedented photorealistic face synthesis, demonstrating GAN's maturity.",
    descriptionZh: "NVIDIA的StyleGAN实现了前所未有的照片级真实人脸合成，通过风格控制机制大幅提升了GAN的可控性，标志着GAN技术的成熟。",
    type: "milestone",
    impact: "significant",
    papers: ["gan-2014"],
    tags: ["StyleGAN", "Face Generation", "NVIDIA", "High-Resolution"]
  },
  {
    id: "gpt3-event",
    year: 2020,
    title: "GPT-3 — Large Language Model Scaling",
    titleZh: "GPT-3 — 大语言模型规模化",
    description: "OpenAI's GPT-3 with 175B parameters demonstrated emergent capabilities through scaling, changing AI's trajectory.",
    descriptionZh: "OpenAI发布1750亿参数的GPT-3，展示了规模化带来的涌现能力，证明了大模型的巨大潜力，直接推动了ChatGPT和大模型时代的到来。",
    type: "milestone",
    impact: "revolutionary",
    papers: ["gpt3-2020"],
    tags: ["GPT-3", "Scaling Law", "Emergent Abilities", "LLM"]
  },
  {
    id: "ddpm-event",
    year: 2020,
    title: "DDPM — Diffusion Model Revolution",
    titleZh: "DDPM — 扩散模型革命",
    description: "Ho et al.'s DDPM surpassed GANs in image quality, launching the diffusion model era.",
    descriptionZh: "Ho等人的DDPM在图像质量上超越了GAN，开启了扩散模型时代。通过逐步去噪的过程，实现了高质量、多样化的图像生成，成为生成式AI的新主流。",
    type: "architecture",
    impact: "revolutionary",
    papers: ["ddpm-2020"],
    tags: ["DDPM", "Diffusion Models", "Score Matching"]
  },
  {
    id: "alphafold-event",
    year: 2021,
    title: "AlphaFold2 — Solving Protein Folding",
    titleZh: "AlphaFold2 — 解决蛋白质折叠",
    description: "DeepMind's AlphaFold2 solved the 50-year protein folding problem, marking AI's entry into scientific discovery.",
    descriptionZh: "DeepMind的AlphaFold2解决了困扰生物学界50年的蛋白质折叠问题，预测精度接近实验水平，标志着AI进入科学发现新时代，2024年获诺贝尔化学奖。",
    type: "application",
    impact: "revolutionary",
    papers: ["alphafold2-2021"],
    tags: ["AlphaFold", "Protein Folding", "Scientific AI", "Nobel Prize"]
  },
  {
    id: "clip-event",
    year: 2021,
    title: "CLIP — Vision-Language Foundation",
    titleZh: "CLIP — 视觉语言基础模型",
    description: "OpenAI's CLIP learned visual concepts from natural language, enabling zero-shot transfer across tasks.",
    descriptionZh: "OpenAI的CLIP通过对比学习将视觉和语言对齐，实现了零样本迁移，成为多模态AI的基础组件，被DALL-E、Stable Diffusion等广泛采用。",
    type: "architecture",
    impact: "significant",
    papers: ["clip-2021"],
    tags: ["CLIP", "Contrastive Learning", "Vision-Language", "Zero-Shot"]
  },
  {
    id: "ldm-event",
    year: 2022,
    title: "Stable Diffusion — AI Art Democratization",
    titleZh: "Stable Diffusion — AI艺术民主化",
    description: "Rombach et al.'s LDM and Stable Diffusion's open-source release democratized AI image generation globally.",
    descriptionZh: "Rombach等人的潜在扩散模型和Stable Diffusion的开源发布，使高质量AI图像生成触手可及，催生了数千个创意应用，开启了AI艺术创作的新时代。",
    type: "milestone",
    impact: "revolutionary",
    papers: ["ldm-2022"],
    tags: ["Stable Diffusion", "Open Source", "Text-to-Image", "Democratization"]
  },
  {
    id: "3dgs-event",
    year: 2023,
    title: "3D Gaussian Splatting — Real-Time 3D",
    titleZh: "3D高斯泼溅 — 实时3D渲染",
    description: "Kerbl et al.'s 3DGS achieved real-time 3D scene rendering 100x faster than NeRF, winning SIGGRAPH Best Paper.",
    descriptionZh: "Kerbl等人的3D高斯泼溅实现了比NeRF快100倍的实时3D场景渲染，荣获SIGGRAPH 2023最佳论文，迅速成为3D生成领域最热门的研究方向。",
    type: "architecture",
    impact: "significant",
    papers: ["3dgs-2023"],
    tags: ["3DGS", "Real-Time Rendering", "SIGGRAPH", "3D Generation"]
  },
  {
    id: "sora-event",
    year: 2024,
    title: "Sora — Video World Simulator",
    titleZh: "Sora — 视频世界模拟器",
    description: "OpenAI's Sora demonstrated high-quality long video generation, positioning diffusion models as world simulators.",
    descriptionZh: "OpenAI的Sora展示了高质量长视频生成能力，将扩散模型定位为世界模拟器，引发了关于AI理解物理世界能力的广泛讨论，预示着下一代AI系统的方向。",
    type: "milestone",
    impact: "revolutionary",
    papers: ["sora-2024"],
    tags: ["Sora", "Video Generation", "World Models", "OpenAI"]
  },
  {
    id: "mamba-event",
    year: 2024,
    title: "Mamba — Beyond Transformer",
    titleZh: "Mamba — 超越Transformer",
    description: "Gu & Dao's Mamba introduced selective state spaces, offering linear-time sequence modeling as a Transformer alternative.",
    descriptionZh: "Gu和Dao的Mamba引入选择性状态空间模型，在长序列任务上实现线性时间复杂度，成为Transformer的有力竞争者，引发了关于下一代序列模型架构的热烈讨论。",
    type: "architecture",
    impact: "significant",
    papers: ["mamba-2023"],
    tags: ["Mamba", "SSM", "Efficient Sequence Modeling", "Post-Transformer"]
  }
];

// ============================================================
// KNOWLEDGE GRAPH NODES
// ============================================================
export const knowledgeNodes: KnowledgeNode[] = [
  // Core architectures
  { id: "vae", label: "VAE", type: "model", x: 30, y: 40, size: 18, color: "#00FFFF", connections: ["gan", "ldm", "flow"], description: "变分自编码器" },
  { id: "gan", label: "GAN", type: "model", x: 20, y: 55, size: 22, color: "#00FFFF", connections: ["vae", "stylegan", "cyclegan"], description: "生成对抗网络" },
  { id: "transformer", label: "Transformer", type: "model", x: 55, y: 25, size: 26, color: "#00FFFF", connections: ["gpt", "bert", "vit", "dit"], description: "注意力机制架构" },
  { id: "diffusion", label: "Diffusion", type: "model", x: 45, y: 50, size: 24, color: "#00FFFF", connections: ["ddpm", "ldm", "dit", "flow"], description: "扩散模型" },
  { id: "mamba-node", label: "Mamba/SSM", type: "model", x: 70, y: 35, size: 16, color: "#00FFFF", connections: ["transformer"], description: "状态空间模型" },
  { id: "nerf-node", label: "NeRF", type: "model", x: 80, y: 60, size: 16, color: "#00FFFF", connections: ["3dgs-node"], description: "神经辐射场" },

  // Specific models
  { id: "ddpm", label: "DDPM", type: "concept", x: 38, y: 62, size: 14, color: "#B44FFF", connections: ["diffusion", "ldm"], description: "去噪扩散概率模型" },
  { id: "ldm", label: "Stable Diffusion", type: "concept", x: 30, y: 72, size: 18, color: "#B44FFF", connections: ["ddpm", "clip-node", "vae"], description: "潜在扩散模型" },
  { id: "gpt", label: "GPT Series", type: "concept", x: 60, y: 18, size: 20, color: "#B44FFF", connections: ["transformer", "llama-node"], description: "GPT系列大模型" },
  { id: "clip-node", label: "CLIP", type: "concept", x: 42, y: 38, size: 14, color: "#B44FFF", connections: ["transformer", "ldm", "llava-node"], description: "视觉语言对比学习" },
  { id: "dit", label: "DiT", type: "concept", x: 52, y: 58, size: 14, color: "#B44FFF", connections: ["diffusion", "transformer"], description: "扩散Transformer" },
  { id: "stylegan", label: "StyleGAN", type: "concept", x: 12, y: 65, size: 14, color: "#B44FFF", connections: ["gan"], description: "风格生成对抗网络" },
  { id: "3dgs-node", label: "3D Gaussian", type: "concept", x: 85, y: 50, size: 16, color: "#B44FFF", connections: ["nerf-node"], description: "3D高斯泼溅" },
  { id: "flow", label: "Flow Matching", type: "concept", x: 35, y: 30, size: 13, color: "#B44FFF", connections: ["diffusion", "vae"], description: "流匹配生成模型" },

  // Applications
  { id: "text2img", label: "Text-to-Image", type: "application", x: 22, y: 82, size: 16, color: "#FF6B35", connections: ["ldm", "clip-node"], description: "文本到图像生成" },
  { id: "protein", label: "Protein Design", type: "application", x: 72, y: 75, size: 16, color: "#FF6B35", connections: ["transformer"], description: "蛋白质结构预测" },
  { id: "video-gen", label: "Video Generation", type: "application", x: 55, y: 78, size: 16, color: "#FF6B35", connections: ["diffusion", "dit"], description: "视频生成" },
  { id: "llava-node", label: "Multimodal LLM", type: "application", x: 68, y: 22, size: 16, color: "#FF6B35", connections: ["gpt", "clip-node"], description: "多模态大语言模型" },
  { id: "llama-node", label: "LLaMA/Open LLM", type: "application", x: 75, y: 12, size: 16, color: "#FF6B35", connections: ["gpt", "transformer"], description: "开源大语言模型" },
  { id: "drug-disc", label: "Drug Discovery", type: "application", x: 82, y: 80, size: 14, color: "#FF6B35", connections: ["protein"], description: "药物发现" },
  { id: "cyclegan", label: "Image Translation", type: "application", x: 8, y: 75, size: 13, color: "#FF6B35", connections: ["gan", "stylegan"], description: "图像风格迁移" },
  { id: "bert", label: "BERT/Encoder", type: "concept", x: 62, y: 32, size: 14, color: "#B44FFF", connections: ["transformer"], description: "双向编码器" },
  { id: "vit", label: "ViT", type: "concept", x: 48, y: 18, size: 13, color: "#B44FFF", connections: ["transformer", "clip-node"], description: "视觉Transformer" }
];

// ============================================================
// CATEGORIES
// ============================================================
export const categories = [
  { id: "all", label: "全部", color: "#A8B8D8" },
  { id: "Image Generation", label: "图像生成", color: "#00F5FF" },
  { id: "Language Models", label: "语言模型", color: "#B44FFF" },
  { id: "3D Generation", label: "3D生成", color: "#FF6B35" },
  { id: "Multimodal", label: "多模态", color: "#00FF88" },
  { id: "Scientific AI", label: "科学AI", color: "#FFD700" },
  { id: "Framework", label: "框架工具", color: "#FF69B4" },
  { id: "Architecture", label: "新架构", color: "#87CEEB" },
  { id: "Generative Framework", label: "生成框架", color: "#DDA0DD" }
];

// ============================================================
// AGENT CHAT RESPONSES
// ============================================================
export const agentResponses: Record<string, string> = {
  default: `我是 **GenAI World Model Agent**，专注于生成式AI领域的知识整合与分析。

我可以帮你：
- 📊 **项目分析**：解读最新开源项目的架构与价值
- 📄 **论文解读**：深入分析顶会论文的核心贡献
- 🔬 **技术演进**：梳理生成式AI从GAN到Diffusion的发展脉络
- 👨‍🔬 **研究者背景**：介绍领域大佬的研究方向与贡献
- 🚀 **前沿动态**：追踪最新技术突破与研究趋势

请输入你的问题，例如："扩散模型和GAN有什么区别？" 或 "介绍一下3D高斯泼溅技术"`,

  diffusion: `## 扩散模型 (Diffusion Models) 详解

**核心思想**：扩散模型通过模拟物理扩散过程来学习数据分布。

### 前向过程（加噪）
给定真实数据 $x_0$，逐步添加高斯噪声：
\`\`\`
x_t = √(ᾱ_t) · x_0 + √(1-ᾱ_t) · ε
\`\`\`

### 反向过程（去噪）
训练神经网络预测噪声，逐步恢复原始数据。

### 与GAN的对比

| 特性 | 扩散模型 | GAN |
|------|---------|-----|
| 训练稳定性 | ✅ 稳定 | ❌ 容易崩溃 |
| 生成多样性 | ✅ 高 | ❌ 模式崩溃 |
| 采样速度 | ❌ 慢 | ✅ 快 |
| 可控性 | ✅ 强 | 一般 |

### 关键里程碑
- **DDPM (2020)**：Ho等人奠定基础
- **DDIM (2021)**：加速采样
- **Stable Diffusion (2022)**：潜在空间扩散，民主化
- **DiT (2023)**：Transformer骨干网络
- **Sora (2024)**：视频世界模拟器`,

  gan: `## 生成对抗网络 (GAN) 全面解析

**发明者**：Ian Goodfellow，2014年NeurIPS

### 核心架构
\`\`\`
生成器 G: z → x̂  (噪声 → 假数据)
判别器 D: x → [0,1]  (真/假判断)

目标函数：
min_G max_D E[log D(x)] + E[log(1-D(G(z)))]
\`\`\`

### GAN发展谱系
- **DCGAN (2015)**：深度卷积GAN，稳定训练
- **WGAN (2017)**：Wasserstein距离，解决梯度消失
- **StyleGAN (2019)**：风格控制，照片级人脸
- **BigGAN (2019)**：大规模图像生成
- **StyleGAN2/3**：持续改进

### 主要挑战
1. **训练不稳定**：生成器和判别器的博弈难以平衡
2. **模式崩溃**：生成器只学会少数模式
3. **评估困难**：FID、IS等指标不完美

### 应用领域
图像生成、数据增强、图像翻译、超分辨率、医学图像合成`,

  vae: `## 变分自编码器 (VAE) 深度解析

**发明者**：Diederik P. Kingma & Max Welling，2013年

### 核心思想
VAE将编码器-解码器架构与变分推断结合：

\`\`\`
编码器：q_φ(z|x) → μ, σ²  (后验分布)
解码器：p_θ(x|z)  (似然)
先验：p(z) = N(0, I)

ELBO目标：
L = E[log p_θ(x|z)] - KL(q_φ(z|x) || p(z))
\`\`\`

### 重参数化技巧
\`\`\`
z = μ + σ · ε,  ε ~ N(0, I)
\`\`\`
使梯度可以反向传播通过采样过程。

### VAE vs GAN vs Diffusion

| 特性 | VAE | GAN | Diffusion |
|------|-----|-----|-----------|
| 理论基础 | 变分推断 | 博弈论 | 热力学 |
| 图像质量 | 一般（模糊） | 高 | 最高 |
| 潜在空间 | ✅ 连续可插值 | 不稳定 | 隐式 |
| 训练难度 | ✅ 简单 | 困难 | 中等 |

### 重要变体
- **β-VAE**：解耦表示学习
- **VQ-VAE**：向量量化，离散潜在空间
- **NVAE**：层次化VAE，高质量生成`,

  "3dgs": `## 3D高斯泼溅 (3D Gaussian Splatting) 技术详解

**论文**：SIGGRAPH 2023最佳论文
**作者**：Bernhard Kerbl等，Inria

### 核心创新
用**三维高斯函数**表示场景，每个高斯具有：
- 位置 (μ)、协方差矩阵 (Σ)
- 不透明度 (α)、球谐系数 (颜色)

### 渲染流程
\`\`\`
1. 将3D高斯投影到2D图像平面
2. 按深度排序（α-blending）
3. GPU并行光栅化渲染
\`\`\`

### 与NeRF对比

| 特性 | 3DGS | NeRF |
|------|------|------|
| 渲染速度 | ✅ 实时 (100+ FPS) | ❌ 慢 (秒级) |
| 训练时间 | ~30分钟 | ~数小时 |
| 编辑性 | ✅ 可直接操作高斯 | 困难 |
| 内存占用 | 较大 | 较小 |

### 应用前景
- AR/VR实时场景重建
- 机器人导航与感知
- 自动驾驶环境建模
- 数字孪生
- 影视特效制作

### 最新进展 (2024)
- **4D Gaussian**：动态场景建模
- **GaussianAvatars**：人体数字化
- **Gaussian Grouping**：场景理解与分割`,
};

export const getPaperById = (id: string) => papers.find(p => p.id === id);
export const getProjectById = (id: string) => projects.find(p => p.id === id);
export const getResearcherById = (id: string) => researchers.find(r => r.id === id);
