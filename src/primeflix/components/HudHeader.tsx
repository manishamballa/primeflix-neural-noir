import { motion } from "framer-motion";

export default function HudHeader({
  topThemesList,
  pulseStrength,
}: {
  topThemesList: string[];
  pulseStrength: number;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-border/50 bg-background/40">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/40 gold-glow"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
          <div>
            <h1 className="font-display text-xl tracking-[0.3em] text-gold text-glow-gold">
              PRIMEFLIX
            </h1>
            <p className="font-mono-hud text-[10px] text-muted-foreground">
              A SMART RECOMMENDATION SYSTEM
            </p>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 font-mono-hud text-[11px] uppercase">
          {["Start", "Movies", "Books", "Games", "Arena"].map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} className="text-muted-foreground hover:text-gold transition-colors">
              {s}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 font-mono-hud text-[10px] uppercase">
          <span className="text-muted-foreground">Neural pulse</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className={`block h-3 w-1 rounded-sm ${
                  i < Math.min(8, Math.round(pulseStrength * 8))
                    ? "bg-primary animate-pulse-gold"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-gold">
            {topThemesList.length ? topThemesList.slice(0, 2).join(" · ") : "idle"}
          </span>
        </div>
      </div>
    </header>
  );
}