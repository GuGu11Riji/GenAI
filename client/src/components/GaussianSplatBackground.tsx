// GaussianSplatBackground.tsx
// Design: Deep Space Quantum Aesthetics — Gaussian Splatting particle simulation
// Simulates 3D Gaussian point cloud with colorful clustered particles on deep black background

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  alpha: number;
  cluster: number;
  phase: number;
  speed: number;
}

const CLUSTER_COLORS = [
  ["#00F5FF", "#00AAFF", "#0066FF"],   // Cyan cluster - Diffusion Models
  ["#B44FFF", "#8B00FF", "#6600CC"],   // Purple cluster - Language Models
  ["#FF00FF", "#CC00CC", "#990099"],   // Magenta cluster - Multimodal
  ["#00FF88", "#00CC66", "#009944"],   // Green cluster - Scientific AI
  ["#FF6B35", "#FF4500", "#CC3300"],   // Orange cluster - Applications
  ["#FFD700", "#FFA500", "#FF8C00"],   // Gold cluster - Researchers
];

const CLUSTER_CENTERS = [
  { x: 0.3, y: 0.4 },
  { x: 0.6, y: 0.35 },
  { x: 0.45, y: 0.6 },
  { x: 0.7, y: 0.65 },
  { x: 0.25, y: 0.65 },
  { x: 0.55, y: 0.25 },
];

function createParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  const totalParticles = Math.min(800, Math.floor((width * height) / 2000));

  for (let i = 0; i < totalParticles; i++) {
    const cluster = Math.floor(Math.random() * CLUSTER_COLORS.length);
    const center = CLUSTER_CENTERS[cluster];
    const spread = 0.12 + Math.random() * 0.08;
    const colorSet = CLUSTER_COLORS[cluster];
    const color = colorSet[Math.floor(Math.random() * colorSet.length)];

    // Gaussian distribution around cluster center
    const angle = Math.random() * Math.PI * 2;
    const r = Math.abs(gaussianRandom(0, spread));

    particles.push({
      x: (center.x + Math.cos(angle) * r) * width,
      y: (center.y + Math.sin(angle) * r) * height,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.01,
      radius: 0.5 + Math.random() * 2.5,
      color,
      alpha: 0.3 + Math.random() * 0.7,
      cluster,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.7,
    });
  }

  // Add sparse background particles
  for (let i = 0; i < totalParticles * 0.3; i++) {
    const colorSet = CLUSTER_COLORS[Math.floor(Math.random() * CLUSTER_COLORS.length)];
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.5,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      vz: 0,
      radius: 0.3 + Math.random() * 1,
      color: colorSet[0],
      alpha: 0.1 + Math.random() * 0.25,
      cluster: -1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.3,
    });
  }

  return particles;
}

function gaussianRandom(mean: number, std: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export default function GaussianSplatBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      timeRef.current += 0.008;
      const t = timeRef.current;

      // Clear with fade effect
      ctx.fillStyle = "rgba(5, 8, 16, 0.15)";
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        // Floating motion
        p.x += p.vx * p.speed + Math.sin(t + p.phase) * 0.15;
        p.y += p.vy * p.speed + Math.cos(t * 0.7 + p.phase) * 0.15;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Pulsing alpha
        const pulseAlpha = p.alpha * (0.7 + 0.3 * Math.sin(t * 2 + p.phase));
        const depth = 0.4 + p.z * 0.6;
        const r = p.radius * depth;

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        gradient.addColorStop(0, p.color + Math.floor(pulseAlpha * 255).toString(16).padStart(2, "0"));
        gradient.addColorStop(0.4, p.color + Math.floor(pulseAlpha * 0.4 * 255).toString(16).padStart(2, "0"));
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(pulseAlpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }

      // Draw connection lines between nearby particles in same cluster
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i += 3) {
        const pi = particles[i];
        if (pi.cluster < 0) continue;
        for (let j = i + 1; j < Math.min(i + 20, particles.length); j++) {
          const pj = particles[j];
          if (pj.cluster !== pi.cluster) continue;
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            const alpha = (1 - d / 80) * 0.15;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = pi.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, background: "#050810" }}
    />
  );
}
