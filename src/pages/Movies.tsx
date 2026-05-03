import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SynapticBackground from "@/primeflix/components/SynapticBackground";
import HudHeader from "@/primeflix/components/HudHeader";
import ExpansionHUD from "@/primeflix/components/ExpansionHUD";
import TastePrompt, { CalibrateButton } from "@/primeflix/components/TastePrompt";
import PosterGrid from "@/primeflix/components/PosterGrid";
import { movies } from "@/primeflix/data/content";
import { topThemes, Pulse } from "@/primeflix/data/recommender";
import { usePrimeflix } from "@/primeflix/state/PrimeflixContext";

const ALL_GENRES = [
  "All",
  "Sci-Fi",
  "Noir",
  "Thriller",
  "Action",
  "Romance",
  "Drama",
  "Horror",
  "Animation",
  "Crime",
  "Mystery",
  "Fantasy",
  "Documentary",
  "Musical",
  "Comedy",
];

export default function MoviesPage() {
  const {
    pickItem,
    pulse,
    pulseStrength,
    active,
    setActive,
    related,
    picksByDomain,
    setPicksForDomain,
    setPulse,
  } = usePrimeflix();

  const [promptOpen, setPromptOpen] = useState(true);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => setPromptOpen(true), []);

  const themes = topThemes(pulse, 4);
  const picks = picksByDomain.movie ?? [];
  const pickIds = useMemo(() => new Set(picks.map((p) => p.id)), [picks]);
  const featured = picks[0] ?? movies[0];

  const filtered = useMemo(() => {
    if (filter === "All") return movies;
    const q = filter.toLowerCase();
    return movies.filter(
      (m) =>
        m.genre.toLowerCase().includes(q) ||
        m.themes.some((t) => t.toLowerCase().includes(q)),
    );
  }, [filter]);

  const handlePromptSubmit = (result: { pulseSeed: Pulse; picks: typeof movies }) => {
    setPicksForDomain("movie", result.picks);
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

      {/* CINEMATIC HERO with featured poster as backdrop */}
      <section className="relative pt-28 md:pt-32 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={featured.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0 -z-0"
          >
            {featured.poster && (
              <img
                src={featured.poster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="container relative z-10">
          <Link
            to="/"
            className="font-mono-hud text-[10px] tracking-[0.4em] text-muted-foreground hover:text-gold"
          >
            ◂ BACK TO HUB
          </Link>

          <div className="mt-6 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="font-mono-hud text-[11px] tracking-[0.5em] text-gold mb-3">
                ▸ DOMAIN · MOVIES
              </div>
              <h1 className="font-display text-4xl md:text-6xl text-crystal text-glow-gold leading-[1.05] mb-4">
                {picks.length ? "Your top neural pick." : "Calibrate the cinema engine."}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-6">
                {picks.length
                  ? `${featured.title} — ${featured.subtitle}. ${featured.description.slice(0, 160)}…`
                  : "Pick the moods you want tonight and the matrix reweights every poster in the void to surface what fits you best."}
              </p>
              <div className="flex flex-wrap gap-3">
                <CalibrateButton onClick={() => setPromptOpen(true)} />
                {picks.length > 0 && (
                  <button
                    onClick={() => pickItem(featured)}
                    className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-mono-hud text-[11px] tracking-[0.3em] uppercase hover:bg-primary/90 transition-colors"
                  >
                    ▸ View pick
                  </button>
                )}
              </div>
            </motion.div>

            {/* Featured poster card */}
            <motion.button
              key={`card-${featured.id}`}
              initial={{ opacity: 0, scale: 0.95, rotateY: 8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              onClick={() => pickItem(featured)}
              className="relative aspect-[2/3] max-w-sm mx-auto rounded-2xl overflow-hidden gold-glow border border-primary/40 group"
              style={{ transformPerspective: 1200 }}
            >
              {featured.poster && (
                <img
                  src={featured.poster}
                  alt={`${featured.title} poster`}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="font-mono-hud text-[9px] tracking-[0.3em] text-gold mb-1">
                  ▸ FEATURED · NEURAL PICK
                </div>
                <div className="font-display text-2xl text-crystal text-glow-gold">
                  {featured.title}
                </div>
                <div className="text-xs text-muted-foreground">{featured.subtitle}</div>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Top recommendations strip */}
      {picks.length > 0 && (
        <section className="container pb-10">
          <div className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
            ▸ Top neural matches · {picks.length}
          </div>
          <PosterGrid items={picks} onPick={pickItem} highlightIds={pickIds} />
        </section>
      )}

      {/* Genre filters + full library */}
      <section className="container pb-24">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-muted-foreground mr-2">
            ▸ Browse by genre
          </span>
          {ALL_GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-colors ${
                filter === g
                  ? "border-primary bg-primary/20 text-gold"
                  : "border-border text-crystal/70 hover:border-primary/60"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <PosterGrid items={filtered} onPick={pickItem} highlightIds={pickIds} />
      </section>

      <ExpansionHUD
        item={active}
        related={related}
        onClose={() => setActive(null)}
        onPick={pickItem}
      />

      <TastePrompt
        domain={promptOpen ? "movie" : null}
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        onSubmit={handlePromptSubmit}
      />
    </main>
  );
}
