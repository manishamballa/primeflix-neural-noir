import { motion } from "framer-motion";
import { ContentItem } from "../data/content";

export default function PosterGrid({
  items,
  onPick,
  highlightIds = new Set<string>(),
}: {
  items: ContentItem[];
  onPick: (item: ContentItem) => void;
  highlightIds?: Set<string>;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
      {items.map((item, i) => {
        const isPick = highlightIds.has(item.id);
        return (
          <motion.button
            key={item.id}
            onClick={() => onPick(item)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className={`group relative aspect-[2/3] rounded-xl overflow-hidden text-left
              border ${isPick ? "border-primary gold-glow" : "border-border/60 hover:border-primary/70"}
              bg-card transition-shadow duration-300`}
          >
            {item.poster ? (
              <img
                src={item.poster}
                alt={`${item.title} poster`}
                loading="lazy"
                width={704}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${item.accent}55, transparent)` }}
              />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/0 via-transparent to-primary/0 group-hover:from-primary/30 transition-all duration-500" />

            {/* Top badges */}
            <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
              {isPick && (
                <span className="font-mono-hud text-[9px] tracking-[0.2em] uppercase px-1.5 py-0.5 rounded bg-primary/90 text-primary-foreground">
                  ★ Match
                </span>
              )}
              {item.rating != null && (
                <span className="ml-auto font-mono-hud text-[10px] px-1.5 py-0.5 rounded bg-black/70 text-gold border border-gold/30">
                  ★ {item.rating}
                </span>
              )}
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="font-mono-hud text-[9px] tracking-[0.25em] uppercase text-gold/80 mb-1 line-clamp-1">
                {item.genre}
              </div>
              <div className="font-display text-base md:text-lg leading-tight text-crystal line-clamp-2 group-hover:text-glow-gold">
                {item.title}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                {item.subtitle}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}