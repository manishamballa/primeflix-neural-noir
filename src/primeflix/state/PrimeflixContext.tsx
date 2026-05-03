import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { ContentItem, Domain } from "../data/content";
import { Pulse, pulseFromClick, relatedTo } from "../data/recommender";

type Ctx = {
  pulse: Pulse;
  setPulse: React.Dispatch<React.SetStateAction<Pulse>>;
  active: ContentItem | null;
  setActive: (i: ContentItem | null) => void;
  pickItem: (i: ContentItem) => void;
  picksByDomain: Partial<Record<Domain, ContentItem[]>>;
  setPicksForDomain: (d: Domain, picks: ContentItem[]) => void;
  pulseStrength: number;
  related: ContentItem[];
};

const PrimeflixCtx = createContext<Ctx | null>(null);

export function PrimeflixProvider({ children }: { children: ReactNode }) {
  const [pulse, setPulse] = useState<Pulse>({});
  const [active, setActive] = useState<ContentItem | null>(null);
  const [picksByDomain, setPicksByDomain] = useState<Partial<Record<Domain, ContentItem[]>>>({});

  const pickItem = (item: ContentItem) => {
    setActive(item);
    setPulse((p) => pulseFromClick(p, item));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pulseStrength = Math.min(
    1,
    Object.values(pulse).reduce((a, b) => a + b, 0) / 8,
  );

  const related = useMemo(
    () => (active ? relatedTo(active, pulse, { crossDomain: true, limit: 6 }) : []),
    [active, pulse],
  );

  const setPicksForDomain = (d: Domain, picks: ContentItem[]) =>
    setPicksByDomain((prev) => ({ ...prev, [d]: picks }));

  const value: Ctx = {
    pulse,
    setPulse,
    active,
    setActive,
    pickItem,
    picksByDomain,
    setPicksForDomain,
    pulseStrength,
    related,
  };

  return <PrimeflixCtx.Provider value={value}>{children}</PrimeflixCtx.Provider>;
}

export function usePrimeflix() {
  const ctx = useContext(PrimeflixCtx);
  if (!ctx) throw new Error("usePrimeflix must be used inside PrimeflixProvider");
  return ctx;
}