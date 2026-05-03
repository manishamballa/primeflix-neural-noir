import { motion } from "framer-motion";
import { iplPointsTable, upcomingMatches } from "../data/content";

export default function ObsidianArena() {
  return (
    <div className="grid lg:grid-cols-[1.4fr,1fr] gap-6">
      {/* IPL Points Table */}
      <motion.div
        className="glass-panel rounded-2xl p-6 md:p-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-baseline justify-between mb-5">
          <h3 className="font-display text-2xl text-gold text-glow-gold">IPL · Points Table</h3>
          <span className="font-mono-hud text-[10px] text-muted-foreground">
            LIVE STANDINGS
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="font-mono-hud text-[10px] uppercase text-muted-foreground border-b border-border">
                <th className="text-left py-2">#</th>
                <th className="text-left">Team</th>
                <th>P</th>
                <th>W</th>
                <th>L</th>
                <th>NRR</th>
                <th className="text-right pr-2">Pts</th>
              </tr>
            </thead>
            <tbody>
              {iplPointsTable.map((t, i) => (
                <tr
                  key={t.short}
                  className={`border-b border-border/40 hover:bg-primary/5 ${
                    i < 4 ? "text-crystal" : "text-crystal/70"
                  }`}
                >
                  <td className={`py-2 font-mono-hud ${i < 4 ? "text-gold" : "text-muted-foreground"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-7 text-center font-mono-hud text-[10px] text-gold border border-primary/40 rounded">
                        {t.short}
                      </span>
                      <span>{t.team}</span>
                    </div>
                  </td>
                  <td className="text-center">{t.played}</td>
                  <td className="text-center">{t.won}</td>
                  <td className="text-center">{t.lost}</td>
                  <td className={`text-center font-mono-hud text-xs ${t.nrr >= 0 ? "text-gold" : "text-muted-foreground"}`}>
                    {t.nrr >= 0 ? "+" : ""}
                    {t.nrr.toFixed(2)}
                  </td>
                  <td className="text-right pr-2 font-display text-lg text-gold">
                    {t.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Upcoming matches */}
      <motion.div
        className="glass-panel rounded-2xl p-6 md:p-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-baseline justify-between mb-5">
          <h3 className="font-display text-2xl text-gold text-glow-gold">Upcoming Matches</h3>
          <span className="font-mono-hud text-[10px] text-muted-foreground">FIXTURES</span>
        </div>
        <ul className="space-y-3">
          {upcomingMatches.map((m) => (
            <li
              key={m.id}
              className="rounded-xl border border-primary/20 bg-background/40 p-4 flex items-center gap-4 hover:border-primary/60 transition-colors"
            >
              <div className="flex flex-col items-center font-mono-hud text-[10px] text-gold">
                <span className="text-base font-display">{m.date.split(" ")[1]}</span>
                <span className="opacity-70">{m.date.split(" ")[0].toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <div className="font-display text-lg text-crystal tracking-wider">
                  {m.home}
                  <span className="mx-2 text-gold">vs</span>
                  {m.away}
                </div>
                <div className="text-xs text-muted-foreground">{m.venue}</div>
              </div>
              <div className="font-mono-hud text-[10px] text-gold">{m.time}</div>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}