import DomainPage from "@/primeflix/components/DomainPage";
import MoviesParallax from "@/primeflix/three/MoviesParallax";
import { movies } from "@/primeflix/data/content";
import { usePrimeflix } from "@/primeflix/state/PrimeflixContext";

export default function MoviesPage() {
  const { pickItem } = usePrimeflix();
  return (
    <DomainPage
      domain="movie"
      eyebrow="DOMAIN · MOVIES"
      title="The 3D parallax void."
      description="Rate genres and pick the moods you crave — the matrix will reweight every poster in the void and surface what fits."
      visualization={<MoviesParallax items={movies} onPick={pickItem} />}
    />
  );
}