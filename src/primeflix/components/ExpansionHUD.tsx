import { AnimatePresence, motion } from "framer-motion";
import { ContentItem } from "../data/content";

const labelByDomain: Record<ContentItem["domain"], string> = {
  movie: "FILM TRANSMISSION",
  book: "TEXT MEMORY CORE",
  game: "WORLD INSTANCE",
  sport: "ARENA SIGNAL",
};

export default function ExpansionHUD({
  item,
  related,
  onClose,
  onPick,
}: {
  item: ContentItem | null;
  related: ContentItem[];
  onClose: () => void;
  onPick: (i: ContentItem) => void;
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            key={item.id}
            className="relative glass-panel rounded-2xl max-w-4xl w-full p-8 md:p-12"
            initial={{ scale: 0.6, rotateX: 25, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.7, rotateX: -15, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            style={{ transformPerspective: 1200 }}
          >
            {/* HUD corners */}
            {[
              "top-2 left-2 border-l-2 border-t-2",
              "top-2 right-2 border-r-2 border-t-2",
              "bottom-2 left-2 border-l-2 border-b-2",
              "bottom-2 right-2 border-r-2 border-b-2",
            ].map((c) => (
              <span key={c} className={`absolute h-5 w-5 border-primary ${c}`} />
            ))}

            <button
              onClick={onClose}
              className="absolute top-4 right-6 font-mono-hud text-xs text-muted-foreground hover:text-gold"
            >
              CLOSE × ESC
            </button>

            <div className="font-mono-hud text-[10px] tracking-[0.3em] text-gold mb-2">
              {labelByDomain[item.domain]} · {item.id.toUpperCase()}
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-crystal text-glow-gold mb-1">
              {item.title}
            </h2>
            <p className="text-muted-foreground mb-6">
              {item.subtitle} · <span className="text-gold">{item.genre}</span>
              {item.language ? ` · ${item.language}` : ""}
              {item.year ? ` · ${item.year}` : ""}
            </p>

            <div className="grid md:grid-cols-[1fr,260px] gap-8">
              <p className="text-crystal/90 leading-relaxed text-[15px]">
                {item.description}
              </p>
              <div>
                <div className="font-mono-hud text-[10px] uppercase text-muted-foreground mb-2">
                  Theme Vector
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.themes.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded-md text-[10px] uppercase tracking-wider border border-primary/40 text-gold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {item.rating != null && (
                  <>
                    <div className="font-mono-hud text-[10px] uppercase text-muted-foreground mb-1">
                      Signal Strength
                    </div>
                    <div className="flex items-end gap-1 h-8 mb-4">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <span
                          key={i}
                          className={`w-2 ${
                            i < Math.round(item.rating! * (item.domain === "book" ? 2 : 1))
                              ? "bg-primary"
                              : "bg-muted"
                          }`}
                          style={{ height: `${(i + 1) * 9}%` }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/60">
              <div className="font-mono-hud text-[10px] uppercase text-muted-foreground mb-3">
                ⟶ Neural Bridges (cross-domain)
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {related.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onPick(r)}
                    className="text-left glass-panel rounded-lg p-3 hover:scale-[1.02] transition-transform"
                  >
                    <div className="font-mono-hud text-[9px] uppercase text-gold/80">
                      {r.domain}
                    </div>
                    <div className="text-sm text-crystal mt-1 line-clamp-1">{r.title}</div>
                    <div className="text-[11px] text-muted-foreground line-clamp-1">
                      {r.genre}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}