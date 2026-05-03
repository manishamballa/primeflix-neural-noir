// Hybrid recommendation engine.
// Bridges Movies <-> Books <-> Games using a multi-dimensional theme matrix.
// Each item is encoded as a sparse vector across the union of all theme axes;
// the "neural connection strength" between two items is their cosine similarity,
// boosted by an interest-pulse weight learned from user clicks.

import { allContent, ContentItem, Domain } from "./content";

// ── 1. Build the theme axis (the columns of our content matrix) ──
const allThemes = Array.from(
  new Set(allContent.flatMap((c) => c.themes)),
).sort();

const themeIndex: Record<string, number> = Object.fromEntries(
  allThemes.map((t, i) => [t, i]),
);

// ── 2. Encode each item as a numeric row vector (the content matrix) ──
function encode(item: ContentItem, pulse: Record<string, number> = {}): number[] {
  const v = new Array(allThemes.length).fill(0);
  for (const t of item.themes) {
    const idx = themeIndex[t];
    // Arithmetic + relational operators: amplify themes the user has pulsed on.
    const boost = 1 + (pulse[t] ?? 0) * 0.6;
    v[idx] = boost;
  }
  return v;
}

function cosine(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na  += a[i] * a[i];
    nb  += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-9);
}

// ── 3. Public API ──
export type Pulse = Record<string, number>; // theme -> interest weight

export function relatedTo(
  item: ContentItem,
  pulse: Pulse = {},
  opts: { crossDomain?: boolean; limit?: number } = {},
): ContentItem[] {
  const { crossDomain = true, limit = 6 } = opts;
  const base = encode(item, pulse);
  return allContent
    .filter((c) => c.id !== item.id && (crossDomain || c.domain === item.domain))
    .map((c) => ({ c, score: cosine(base, encode(c, pulse)) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.c);
}

export function recommendedFeed(pulse: Pulse, limit = 8): ContentItem[] {
  // Score every item against the aggregated user pulse vector.
  const pulseVec = new Array(allThemes.length).fill(0);
  for (const [t, w] of Object.entries(pulse)) {
    if (themeIndex[t] != null) pulseVec[themeIndex[t]] = w;
  }
  const hasSignal = pulseVec.some((x) => x > 0);
  return [...allContent]
    .map((c) => ({
      c,
      score: hasSignal ? cosine(pulseVec, encode(c)) : Math.random() * 0.3 + 0.5,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.c);
}

export function pulseFromClick(prev: Pulse, item: ContentItem): Pulse {
  const next = { ...prev };
  for (const t of item.themes) next[t] = (next[t] ?? 0) + 1;
  // Soft decay so older interests fade.
  for (const k of Object.keys(next)) next[k] *= 0.92;
  return next;
}

export function topThemes(pulse: Pulse, n = 4): string[] {
  return Object.entries(pulse)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([t]) => t);
}

export function bridge(domainA: Domain, domainB: Domain, pulse: Pulse, limit = 3) {
  // For each item in A, find its strongest cross-domain twin in B.
  const A = allContent.filter((c) => c.domain === domainA);
  const B = allContent.filter((c) => c.domain === domainB);
  const links = A.flatMap((a) => {
    const va = encode(a, pulse);
    return B.map((b) => ({ a, b, score: cosine(va, encode(b, pulse)) }));
  })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit);
  return links;
}

export { allThemes };