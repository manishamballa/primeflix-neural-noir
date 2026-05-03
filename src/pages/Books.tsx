import DomainPage from "@/primeflix/components/DomainPage";
import BooksHelix from "@/primeflix/three/BooksHelix";
import { books } from "@/primeflix/data/content";
import { usePrimeflix } from "@/primeflix/state/PrimeflixContext";

export default function BooksPage() {
  const { pickItem } = usePrimeflix();
  return (
    <DomainPage
      domain="book"
      eyebrow="DOMAIN · BOOKS"
      title="A DNA helix of ideas."
      description="Tell the engine the density and themes you want — the helix will twist around your answer and recommend the volumes."
      visualization={<BooksHelix items={books} onPick={pickItem} />}
    />
  );
}