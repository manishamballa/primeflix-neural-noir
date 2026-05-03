import DomainPage from "@/primeflix/components/DomainPage";
import ObsidianArena from "@/primeflix/components/ObsidianArena";

export default function ArenaPage() {
  return (
    <DomainPage
      domain="sport"
      eyebrow="DOMAIN · SPORTS"
      title="The Obsidian Arena."
      description="Choose the teams and storylines you care about — the arena lens will spotlight the matches that matter."
      visualization={<ObsidianArena />}
    />
  );
}