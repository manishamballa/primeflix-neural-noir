import DomainPage from "@/primeflix/components/DomainPage";
import GamesNodes from "@/primeflix/three/GamesNodes";
import { games } from "@/primeflix/data/content";
import { usePrimeflix } from "@/primeflix/state/PrimeflixContext";

export default function GamesPage() {
  const { pickItem } = usePrimeflix();
  return (
    <DomainPage
      domain="game"
      eyebrow="DOMAIN · GAMES"
      title="Geometric worlds, morphing."
      description="Pick the worlds and session length you want — the polyhedrons morph and the engine surfaces the strongest matches."
      visualization={<GamesNodes items={games} onPick={pickItem} />}
    />
  );
}