import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SynapticBackground from "@/primeflix/components/SynapticBackground";
import HudHeader from "@/primeflix/components/HudHeader";
import Section from "@/primeflix/components/Section";
import ExpansionHUD from "@/primeflix/components/ExpansionHUD";
import ObsidianArena from "@/primeflix/components/ObsidianArena";
import GravityWell from "@/primeflix/three/GravityWell";
import MoviesParallax from "@/primeflix/three/MoviesParallax";
import BooksHelix from "@/primeflix/three/BooksHelix";
import GamesNodes from "@/primeflix/three/GamesNodes";
import { books, ContentItem, Domain, games, movies } from "@/primeflix/data/content";
import {
  pulseFromClick,
  recommendedFeed,
  relatedTo,
  topThemes,
  Pulse,
} from "@/primeflix/data/recommender";
import TastePrompt, { CalibrateButton } from "@/primeflix/components/TastePrompt";

const Index = () => {
  const [pulse, setPulse] = useState<Pulse>({});
  const [active, setActive] = useState<ContentItem | null>(null);
  const [promptDomain, setPromptDomain] = useState<Domain | null>(null);
  const [picksByDomain, setPicksByDomain] = useState<
    Partial<Record<Domain, ContentItem[]>>
  >({});

  const heroFeed = useMemo(() => recommendedFeed(pulse, 9), [pulse]);
  const related = useMemo(
    () => (active ? relatedTo(active, pulse, { crossDomain: true, limit: 6 }) : []),
    [active, pulse],
  );

  const handlePick = (item: ContentItem) => {
    setActive(item);
    setPulse((p) => pulseFromClick(p, item));
  };

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const themes = topThemes(pulse, 4);
  const pulseStrength = Math.min(
    1,
    Object.values(pulse).reduce((a, b) => a + b, 0) / 8,
  );

  const openPrompt = (d: Domain) => setPromptDomain(d);

  const handlePromptSubmit = (
    d: Domain,
    result: { pulseSeed: Pulse; picks: ContentItem[] },
  ) => {
    setPicksByDomain((prev) => ({ ...prev, [d]: result.picks }));
    setPulse((p) => {
      const next = { ...p };
      for (const [t, w] of Object.entries(result.pulseSeed)) {
        next[t] = (next[t] ?? 0) + w;
      }
      return next;
    });
    setPromptDomain(null);
    // Auto-open the strongest match for instant gratification
    if (result.picks[0]) setActive(result.picks[0]);
  };

  const ResultStrip = ({ domain }: { domain: Domain }) => {
    const picks = picksByDomain[domain];
    if (!picks || picks.length === 0) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 glass-panel rounded-xl p-5"
      >
        <div className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-gold mb-3">
          ▸ Tuned recommendations · {picks.length}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {picks.map((p, i) => (
            <button
              key={p.id}
              onClick={() => handlePick(p)}
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
              <div className="text-sm text-crystal mt-1 line-clamp-1">
                {p.title}
              </div>
              <div className="text-[11px] text-muted-foreground line-clamp-1">
                {p.genre}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    );
  };

  const SectionAction = ({ domain }: { domain: Domain }) => (
    <div className="mb-6 -mt-4 flex justify-end">
      <CalibrateButton onClick={() => openPrompt(domain)} />
    </div>
  );

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <SynapticBackground pulse={pulseStrength} />
      <HudHeader topThemesList={themes} pulseStrength={pulseStrength} />

      {/* HERO */}
      <section
        id="start"
        className="relative pt-40 pb-16 md:pt-48 md:pb-24 neural-grid"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl"
          >
            <div className="font-mono-hud text-[11px] tracking-[0.5em] text-gold mb-5">
              ▸ NEURAL ENGINE · v2.0 ONLINE
            </div>
            <h1 className="font-display text-5xl md:text-8xl leading-[0.95] text-crystal text-glow-gold mb-6">
              A digital brain<br />for what you{" "}
              <span className="text-gold italic">love next.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              PRIMEFLIX is a smart recommendation system that links movies,
              books, games and sport through one living neural fabric. Click
              anything; the matrix rearranges around you.
            </p>
          </motion.div>
        </div>

        <Section
          id="recommended"
          eyebrow="RECOMMENDED FOR YOU"
          title="Gravity well of intent."
          description="Items the engine believes will pull you in next, orbiting a synaptic core. The closer the orb, the higher its predicted resonance."
        >
          <GravityWell items={heroFeed} onPick={handlePick} />
        </Section>
      </section>

      {/* MOVIES */}
      <Section
        id="movies"
        eyebrow="DOMAIN · MOVIES"
        title="The 3D parallax void."
        description="High-resolution stories suspended at varying depths — Korean noir, French whimsy, Telugu epic, English cyberpunk. All connected to your reading and play."
      >
        <SectionAction domain="movie" />
        <MoviesParallax items={movies} onPick={handlePick} />
        <ResultStrip domain="movie" />
      </Section>

      {/* BOOKS */}
      <Section
        id="books"
        eyebrow="DOMAIN · BOOKS"
        title="A DNA helix of ideas."
        description="Two strands twist around a single spine: productivity, novels and philosophy weave together. The helix turns slowly — pick the volume that catches the gold."
      >
        <SectionAction domain="book" />
        <BooksHelix items={books} onPick={handlePick} />
        <ResultStrip domain="book" />
      </Section>

      {/* GAMES */}
      <Section
        id="games"
        eyebrow="DOMAIN · GAMES"
        title="Geometric worlds, morphing."
        description="Each game is a polyhedron whose silhouette mirrors its themes — octahedrons for cyberpunk, dodecahedrons for RPG, cubes for strategy. Touch one to enter the world."
      >
        <SectionAction domain="game" />
        <GamesNodes items={games} onPick={handlePick} />
        <ResultStrip domain="game" />
      </Section>

      {/* ARENA */}
      <Section
        id="arena"
        eyebrow="DOMAIN · SPORTS"
        title="The Obsidian Arena."
        description="Live IPL standings and upcoming fixtures, projected on floating glass panels. Gold typography on black, the way trophies should feel."
      >
        <SectionAction domain="sport" />
        <ObsidianArena />
        <ResultStrip domain="sport" />
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 py-10 mt-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-display text-sm tracking-[0.4em] text-gold">
            PRIMEFLIX
          </div>
          <div className="font-mono-hud text-[10px] uppercase text-muted-foreground">
            Neural recommendation system · Hackathon edition · {new Date().getFullYear()}
          </div>
        </div>
      </footer>

      <ExpansionHUD
        item={active}
        related={related}
        onClose={() => setActive(null)}
        onPick={handlePick}
      />

      <TastePrompt
        domain={promptDomain}
        open={promptDomain !== null}
        onClose={() => setPromptDomain(null)}
        onSubmit={(result) =>
          promptDomain && handlePromptSubmit(promptDomain, result)
        }
      />
    </main>
  );
};

export default Index;
