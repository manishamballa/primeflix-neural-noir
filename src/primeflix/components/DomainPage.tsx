import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SynapticBackground from "./SynapticBackground";
import HudHeader from "./HudHeader";
import ExpansionHUD from "./ExpansionHUD";
import TastePrompt, { CalibrateButton } from "./TastePrompt";
import { ContentItem, Domain } from "../data/content";
import { Pulse, topThemes } from "../data/recommender";
import { usePrimeflix } from "../state/PrimeflixContext";

export default function DomainPage({
  domain,
  eyebrow,
  title,
  description,
  visualization,
  autoOpenPrompt = true,
}: {
  domain: Domain;
  eyebrow: string;
  title: string;
  description: string;
  visualization: React.ReactNode;
  autoOpenPrompt?: boolean;
}) {
  const {
    pulse,
    setPulse,
    active,
    setActive,
    pickItem,
    picksByDomain,
    setPicksForDomain,
    pulseStrength,
    related,
  } = usePrimeflix();

  const [promptOpen, setPromptOpen] = useState(autoOpenPrompt);

  useEffect(() => {
    if (autoOpenPrompt) setPromptOpen(true);
  }, [autoOpenPrompt, domain]);

  const themes = topThemes(pulse, 4);
  const picks = picksByDomain[domain] ?? [];

  const handlePromptSubmit = (result: { pulseSeed: Pulse; picks: ContentItem[] }) => {
    setPicksForDomain(domain, result.picks);
    setPulse((p) => {
      const next = { ...p };
      for (const [t, w] of Object.entries(result.pulseSeed)) {
        next[t] = (next[t] ?? 0) + w;
      }
      return next;
    });
    setPromptOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <SynapticBackground pulse={pulseStrength} />
      <HudHeader topThemesList={themes} pulseStrength={pulseStrength} />

      <section className="relative pt-32 pb-12 md:pt-40 neural-grid">
        <div className="container">
          <Link
            to="/"
            className="font-mono-hud text-[10px] tracking-[0.4em] text-muted-foreground hover:text-gold"
          >
            ◂ BACK TO HUB
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 flex items-end justify-between gap-6 flex-wrap"
          >
            <div className="max-w-3xl">
              <div className="font-mono-hud text-[11px] tracking-[0.5em] text-gold mb-3">
                ▸ {eyebrow}
              </div>
              <h1 className="font-display text-4xl md:text-6xl text-crystal text-glow-gold leading-[1.05]">
                {title}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-2xl">
                {description}
              </p>
            </div>
            <CalibrateButton onClick={() => setPromptOpen(true)} />
          </motion.div>
        </div>
      </section>

      {picks.length > 0 && (
        <section className="container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-xl p-6 mb-12 border border-primary/40"
          >
            <div className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
              ▸ Top neural matches · {picks.length}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {picks.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => pickItem(p)}
                  className="text-left glass-panel rounded-lg p-3 hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-mono-hud text-[9px] uppercase text-gold/80">
                      #{i + 1} · {p.domain}
                    </div>
                    {p.rating != null && (
                      <div className="font-mono-hud text-[10px] text-gold">
                        {p.rating}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-crystal mt-1 line-clamp-1">{p.title}</div>
                  <div className="text-[11px] text-muted-foreground line-clamp-1">
                    {p.genre}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      <section className="container pb-24">{visualization}</section>

      <ExpansionHUD
        item={active}
        related={related}
        onClose={() => setActive(null)}
        onPick={pickItem}
      />

      <TastePrompt
        domain={promptOpen ? domain : null}
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        onSubmit={handlePromptSubmit}
      />
    </main>
  );
}