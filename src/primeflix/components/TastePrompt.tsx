import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ContentItem,
  Domain,
  allContent,
  iplPointsTable,
  upcomingMatches,
} from "../data/content";
import { Pulse } from "../data/recommender";

// ── Domain-aware question packs ──────────────────────────────────────────
// Each pack defines: a label, the theme/genre options the user can pick,
// and (optionally) a numeric "intensity" slider that scales the pulse boost.

type QuestionPack = {
  title: string;
  eyebrow: string;
  intro: string;
  // multi-select chips that map directly to theme-vector axes
  themeChoices: { label: string; themes: string[] }[];
  // single-select genre (used as a soft filter on the candidate pool)
  genreChoices: string[];
  // labels for the rating scale
  ratingLabel: string;
};

const PACKS: Record<Domain, QuestionPack> = {
  movie: {
    title: "Calibrate the cinema engine",
    eyebrow: "MOVIE NEURAL CALIBRATION",
    intro:
      "Tell the engine what you want to feel tonight. The matrix will reweight every poster in the void.",
    themeChoices: [
      { label: "Cyberpunk · Neon", themes: ["cyberpunk", "noir", "dystopia"] },
      { label: "Dark Thriller", themes: ["noir", "thriller", "twist"] },
      { label: "Epic Action", themes: ["action", "epic", "rebellion"] },
      { label: "Whimsy · Romance", themes: ["whimsy", "romance", "warmth"] },
      { label: "Philosophical", themes: ["philosophy", "identity", "minimalism"] },
      { label: "Class · Satire", themes: ["class", "satire", "twist"] },
    ],
    genreChoices: ["Any", "Sci-Fi", "Thriller", "Action", "Romance", "Drama"],
    ratingLabel: "How intense should it hit?",
  },
  book: {
    title: "Calibrate the text core",
    eyebrow: "BOOK NEURAL CALIBRATION",
    intro:
      "Pick the shape of the next idea you want in your head. The helix will twist around your answer.",
    themeChoices: [
      { label: "Productivity · Focus", themes: ["productivity", "focus", "systems"] },
      { label: "Philosophy · Stoicism", themes: ["philosophy", "stoicism", "minimalism"] },
      { label: "Dystopia · Rebellion", themes: ["dystopia", "rebellion", "noir"] },
      { label: "Cyberpunk Fiction", themes: ["cyberpunk", "noir", "identity"] },
      { label: "Craft · Systems", themes: ["craft", "systems", "focus"] },
      { label: "Loneliness · Absurd", themes: ["loneliness", "philosophy", "minimalism"] },
    ],
    genreChoices: ["Any", "Productivity", "Novel", "Philosophy"],
    ratingLabel: "How dense do you want it?",
  },
  game: {
    title: "Calibrate the world engine",
    eyebrow: "GAME NEURAL CALIBRATION",
    intro:
      "Choose the worlds you want to fall into. The polyhedrons will morph to match your appetite.",
    themeChoices: [
      { label: "Cyberpunk Worlds", themes: ["cyberpunk", "noir", "dystopia"] },
      { label: "Open-World RPG", themes: ["rpg", "epic", "exploration"] },
      { label: "Grand Strategy", themes: ["strategy", "epic", "systems"] },
      { label: "Roguelike Combat", themes: ["rpg", "rebellion", "craft"] },
      { label: "Story · Walking", themes: ["loneliness", "philosophy", "exploration"] },
      { label: "Fast Action", themes: ["action", "violence", "noir"] },
    ],
    genreChoices: ["Any", "RPG", "Strategy", "Action", "Cyberpunk"],
    ratingLabel: "How long are you willing to play?",
  },
  sport: {
    title: "Calibrate the arena lens",
    eyebrow: "ARENA NEURAL CALIBRATION",
    intro:
      "Pick the teams and storylines you care about. The Obsidian Arena will spotlight the matches that matter.",
    themeChoices: [
      { label: "Title Contenders", themes: ["epic", "rebellion"] },
      { label: "Underdog Story", themes: ["rebellion", "loneliness"] },
      { label: "High-Scoring Chaos", themes: ["action", "violence"] },
      { label: "Tactical Chess", themes: ["strategy", "systems", "focus"] },
    ],
    genreChoices: [
      "Any team",
      ...iplPointsTable.map((t) => t.short),
    ],
    ratingLabel: "How invested are you this season?",
  },
};

// Build a derived pulse from the user's answers. Arithmetic + relational
// operators here scale each chosen theme by the intensity slider (Module 1).
function buildPulseSeed(
  picked: Set<string>,
  intensity: number,
): Pulse {
  const seed: Pulse = {};
  // intensity ∈ [1..10]; weight per theme grows linearly with intensity
  const w = 0.4 + (intensity / 10) * 1.6;
  picked.forEach((t) => {
    seed[t] = (seed[t] ?? 0) + w;
  });
  return seed;
}

// Pure: pick the top items in a domain given a pulse seed.
function recommendForDomain(
  domain: Domain,
  pulse: Pulse,
  genre: string,
  limit = 6,
): ContentItem[] {
  if (domain === "sport") {
    // Build synthetic ContentItems from IPL data so the result strip works.
    const wantsTeam = !genre.toLowerCase().startsWith("any");
    const teams = wantsTeam
      ? iplPointsTable.filter((t) => t.short === genre)
      : iplPointsTable;
    const teamShorts = new Set(teams.map((t) => t.short));
    const matches = upcomingMatches.filter(
      (m) => !wantsTeam || teamShorts.has(m.home) || teamShorts.has(m.away),
    );
    const intensity =
      Object.values(pulse).reduce((a, b) => a + b, 0) || 1;
    const items: ContentItem[] = [
      ...teams.slice(0, 3).map((t, i) => ({
        id: `s-team-${t.short}`,
        domain: "sport" as Domain,
        title: t.team,
        subtitle: `${t.short} · ${t.points} pts · NRR ${t.nrr.toFixed(2)}`,
        genre: "IPL · Standings",
        themes: ["epic", "rebellion", "strategy"],
        rating: Math.min(10, t.points / 2 + intensity * 0.1 + i * 0.1),
        accent: "#E8B73A",
        description: `${t.team} sit on ${t.points} points after ${t.played} matches with ${t.won} wins and a net run-rate of ${t.nrr.toFixed(2)}. The Obsidian Arena projects them as a live signal in the playoff race — momentum, form and fixture difficulty all weigh into where they finish on the table.`,
      })),
      ...matches.slice(0, 3).map((m) => ({
        id: `s-match-${m.id}`,
        domain: "sport" as Domain,
        title: `${m.home} vs ${m.away}`,
        subtitle: `${m.date} · ${m.time}`,
        genre: `Fixture · ${m.venue}`,
        themes: ["action", "epic"],
        accent: "#F2C744",
        description: `${m.home} face ${m.away} on ${m.date} at ${m.venue}. Tip-off ${m.time}. The arena lens predicts a high-stakes encounter with playoff implications for both line-ups.`,
      })),
    ];
    return items.slice(0, limit);
  }

  const pool = allContent.filter((c) => c.domain === domain);
  const filtered =
    genre && !genre.toLowerCase().startsWith("any")
      ? pool.filter(
          (c) =>
            c.genre.toLowerCase().includes(genre.toLowerCase()) ||
            c.themes.some((t) => t.toLowerCase().includes(genre.toLowerCase())),
        )
      : pool;
  const candidates = filtered.length > 0 ? filtered : pool;

  return [...candidates]
    .map((c) => {
      // score = sum of pulse weights for shared themes
      const score = c.themes.reduce((s, t) => s + (pulse[t] ?? 0), 0);
      return { c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.c);
}

export default function TastePrompt({
  domain,
  open,
  onClose,
  onSubmit,
}: {
  domain: Domain | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (result: { pulseSeed: Pulse; picks: ContentItem[] }) => void;
}) {
  const pack = domain ? PACKS[domain] : null;

  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [genre, setGenre] = useState<string>("Any");
  const [intensity, setIntensity] = useState<number>(7);

  const togglePick = (themes: string[]) => {
    setPicked((prev) => {
      const next = new Set(prev);
      const allIn = themes.every((t) => next.has(t));
      themes.forEach((t) => (allIn ? next.delete(t) : next.add(t)));
      return next;
    });
  };

  const reset = () => {
    setPicked(new Set());
    setGenre("Any");
    setIntensity(7);
  };

  const canSubmit = picked.size > 0;

  const previewCount = useMemo(() => {
    if (!domain) return 0;
    const seed = buildPulseSeed(picked, intensity);
    return recommendForDomain(domain, seed, genre).length;
  }, [domain, picked, intensity, genre]);

  const handleSubmit = () => {
    if (!domain || !canSubmit) return;
    const pulseSeed = buildPulseSeed(picked, intensity);
    const picks = recommendForDomain(domain, pulseSeed, genre, 6);
    onSubmit({ pulseSeed, picks });
    reset();
  };

  return (
    <AnimatePresence>
      {open && pack && domain && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => {
              reset();
              onClose();
            }}
          />
          <motion.div
            className="relative glass-panel rounded-2xl max-w-2xl w-full p-8 md:p-10"
            initial={{ scale: 0.7, rotateX: 20, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.7, rotateX: -10, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            style={{ transformPerspective: 1200 }}
          >
            {[
              "top-2 left-2 border-l-2 border-t-2",
              "top-2 right-2 border-r-2 border-t-2",
              "bottom-2 left-2 border-l-2 border-b-2",
              "bottom-2 right-2 border-r-2 border-b-2",
            ].map((c) => (
              <span
                key={c}
                className={`absolute h-5 w-5 border-primary ${c}`}
              />
            ))}

            <button
              onClick={() => {
                reset();
                onClose();
              }}
              className="absolute top-4 right-6 font-mono-hud text-xs text-muted-foreground hover:text-gold"
            >
              CLOSE × ESC
            </button>

            <div className="font-mono-hud text-[10px] tracking-[0.4em] text-gold mb-2">
              ▸ {pack.eyebrow}
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-crystal text-glow-gold mb-2">
              {pack.title}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">{pack.intro}</p>

            {/* Theme chips */}
            <div className="mb-6">
              <div className="font-mono-hud text-[10px] uppercase text-muted-foreground mb-2">
                Pick the moods you want (one or more)
              </div>
              <div className="flex flex-wrap gap-2">
                {pack.themeChoices.map((c) => {
                  const active = c.themes.every((t) => picked.has(t));
                  return (
                    <button
                      key={c.label}
                      onClick={() => togglePick(c.themes)}
                      className={`px-3 py-1.5 rounded-md text-xs uppercase tracking-wider border transition-colors ${
                        active
                          ? "border-primary bg-primary/15 text-gold"
                          : "border-primary/30 text-crystal/80 hover:border-primary/70"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Genre select */}
            <div className="mb-6">
              <div className="font-mono-hud text-[10px] uppercase text-muted-foreground mb-2">
                {domain === "sport" ? "Favourite team" : "Preferred genre"}
              </div>
              <div className="flex flex-wrap gap-2">
                {pack.genreChoices.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    className={`px-3 py-1.5 rounded-md text-xs uppercase tracking-wider border transition-colors ${
                      genre === g
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-border text-crystal/70 hover:border-gold/50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono-hud text-[10px] uppercase text-muted-foreground">
                  {pack.ratingLabel}
                </div>
                <div className="font-mono-hud text-xs text-gold">
                  {intensity}/10
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full accent-[hsl(var(--primary))]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="font-mono-hud text-[10px] uppercase text-muted-foreground">
                Engine ready · {previewCount} match{previewCount === 1 ? "" : "es"} queued
              </div>
              <button
                disabled={!canSubmit}
                onClick={handleSubmit}
                className={`px-5 py-2 rounded-md font-mono-hud text-xs tracking-[0.3em] uppercase border transition-all ${
                  canSubmit
                    ? "border-primary bg-primary/20 text-gold hover:bg-primary/30"
                    : "border-border text-muted-foreground cursor-not-allowed"
                }`}
              >
                ▸ Recommend
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Reusable trigger button for each section header.
export function CalibrateButton({
  onClick,
  label = "Tune recommendations",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary/40 bg-primary/5 hover:bg-primary/15 transition-colors"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
      <span className="font-mono-hud text-[11px] tracking-[0.3em] uppercase text-gold">
        {label}
      </span>
    </button>
  );
}