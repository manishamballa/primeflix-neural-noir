import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SynapticBackground from "@/primeflix/components/SynapticBackground";
import HudHeader from "@/primeflix/components/HudHeader";
import ExpansionHUD from "@/primeflix/components/ExpansionHUD";
import GravityWell from "@/primeflix/three/GravityWell";
import { recommendedFeed, topThemes } from "@/primeflix/data/recommender";
import { usePrimeflix } from "@/primeflix/state/PrimeflixContext";

const DOMAINS = [
  {
    to: "/movies",
    eyebrow: "DOMAIN · 01",
    title: "Movies",
    blurb: "Korean noir to Telugu epics — rate genres, get the void.",
    accent: "from-primary/30 to-transparent",
  },
  {
    to: "/books",
    eyebrow: "DOMAIN · 02",
    title: "Books",
    blurb: "A helix of philosophy, productivity & fiction.",
    accent: "from-primary/25 to-transparent",
  },
  {
    to: "/games",
    eyebrow: "DOMAIN · 03",
    title: "Games",
    blurb: "Polyhedron worlds that morph to your appetite.",
    accent: "from-primary/25 to-transparent",
  },
  {
    to: "/arena",
    eyebrow: "DOMAIN · 04",
    title: "Arena",
    blurb: "Live IPL signals on floating obsidian glass.",
    accent: "from-primary/25 to-transparent",
  },
];

const Index = () => {
  const { pulse, pulseStrength, active, setActive, pickItem, related } = usePrimeflix();
  const heroFeed = useMemo(() => recommendedFeed(pulse, 9), [pulse]);
  const themes = topThemes(pulse, 4);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <SynapticBackground pulse={pulseStrength} />
      <HudHeader topThemesList={themes} pulseStrength={pulseStrength} />

      {/* HERO */}
      <section className="relative pt-32 pb-10 md:pt-40 neural-grid">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl"
          >
            <div className="font-mono-hud text-[11px] tracking-[0.5em] text-gold mb-4">
              ▸ NEURAL ENGINE · v2.0 ONLINE
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-crystal text-glow-gold mb-4">
              A digital brain<br />for what you{" "}
              <span className="text-gold italic">love next.</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              PRIMEFLIX is a smart recommendation system. Pick a domain — each opens
              its own calibration tab where you rate genres and preferences, then
              the matrix reorders itself for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HUB GRID — Recommendations is the dominant centerpiece */}
      <section className="container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[280px]">
          {/* Left column — first two domains */}
          <div className="grid grid-rows-2 gap-6">
            {DOMAINS.slice(0, 2).map((d) => (
              <DomainCard key={d.to} {...d} />
            ))}
          </div>

          {/* CENTER — Recommendations (highlighted, spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="row-span-2 relative glass-panel rounded-2xl border-2 border-primary/60 p-6 md:p-8 overflow-hidden gold-glow"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/15 via-transparent to-primary/10" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono-hud text-[10px] tracking-[0.5em] text-gold">
                  ▸ RECOMMENDED FOR YOU
                </div>
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-crystal text-glow-gold mb-2">
                Gravity well of intent.
              </h2>
              <p className="text-muted-foreground text-sm mb-4 max-w-md">
                The engine&apos;s strongest cross-domain matches, orbiting a
                synaptic core. Closer orbs = higher predicted resonance.
              </p>
              <div className="flex-1 min-h-[260px]">
                <GravityWell items={heroFeed} onPick={pickItem} />
              </div>
            </div>
            {[
              "top-2 left-2 border-l-2 border-t-2",
              "top-2 right-2 border-r-2 border-t-2",
              "bottom-2 left-2 border-l-2 border-b-2",
              "bottom-2 right-2 border-r-2 border-b-2",
            ].map((c) => (
              <span key={c} className={`absolute h-6 w-6 border-primary ${c}`} />
            ))}
          </motion.div>

          {/* Right column — last two domains */}
          <div className="grid grid-rows-2 gap-6">
            {DOMAINS.slice(2).map((d) => (
              <DomainCard key={d.to} {...d} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-display text-sm tracking-[0.4em] text-gold">PRIMEFLIX</div>
          <div className="font-mono-hud text-[10px] uppercase text-muted-foreground">
            Neural recommendation system · {new Date().getFullYear()}
          </div>
        </div>
      </footer>

      <ExpansionHUD
        item={active}
        related={related}
        onClose={() => setActive(null)}
        onPick={pickItem}
      />
    </main>
  );
};

function DomainCard({
  to,
  eyebrow,
  title,
  blurb,
}: {
  to: string;
  eyebrow: string;
  title: string;
  blurb: string;
  accent?: string;
}) {
  return (
    <Link
      to={to}
      className="group relative glass-panel rounded-xl p-5 overflow-hidden hover:border-primary/60 border border-border transition-colors flex flex-col justify-between"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="font-mono-hud text-[9px] tracking-[0.4em] text-gold/80 mb-2">
          ▸ {eyebrow}
        </div>
        <div className="font-display text-2xl md:text-3xl text-crystal group-hover:text-glow-gold transition-all">
          {title}
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{blurb}</p>
      </div>
      <div className="relative font-mono-hud text-[10px] tracking-[0.3em] text-gold/70 group-hover:text-gold">
        OPEN · CALIBRATE →
      </div>
    </Link>
  );
}

export default Index;