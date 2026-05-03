import { useEffect, useRef } from "react";

// Hypnotic neural background drawn on canvas.
// Nodes drift slowly; lines connect nearby nodes and pulse along their length.
// The "pulse" prop subtly accelerates motion when the user is interacting.
export default function SynapticBackground({ pulse = 0 }: { pulse?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 70;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3 * dpr,
      vy: (Math.random() - 0.5) * 0.3 * dpr,
      r: (Math.random() * 1.6 + 0.6) * dpr,
    }));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const speed = 1 + pulse * 0.4;
      // Update + draw nodes
      for (const n of nodes) {
        n.x += n.vx * speed;
        n.y += n.vy * speed;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232,183,58,0.6)";
        ctx.fill();
      }
      // Draw synaptic links
      const max = 160 * dpr;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < max) {
            const alpha = (1 - d / max) * 0.35;
            ctx.strokeStyle = `rgba(232,183,58,${alpha})`;
            ctx.lineWidth = 0.6 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Pulse traveling along the synapse
            const phase = ((t / 1500) + (i + j) * 0.13) % 1;
            const px = a.x + dx * -1 * phase + dx; // moves from a -> b
            const py = a.y + dy * -1 * phase + dy;
            ctx.beginPath();
            ctx.arc(px, py, 1.4 * dpr, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,220,120,${alpha * 1.6})`;
            ctx.fill();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [pulse]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 opacity-70"
      aria-hidden
    />
  );
}