import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, Lightbulb, Repeat, Shuffle } from "lucide-react";
import { cam } from "@/data/cam";
import type { InteractiveBlock, MythFact, ThisOrThat } from "@/data/camInteractive";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

function FlipCard({ item, index }: { item: MythFact; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      key={flipped ? "f" : "m"}
      custom={index}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className="cam-flip h-60 sm:h-56" data-flipped={flipped ? "true" : "false"}>
        <div className="cam-flip-inner">
          <button
            type="button"
            onClick={() => setFlipped(true)}
            aria-label={`Myth: ${item.myth}. Activate to reveal the fact.`}
            className="cam-flip-face h-full w-full flex-col items-start rounded-2xl p-6 text-left"
            style={{ background: "var(--cam-coral-soft)", border: "2px solid var(--cam-ink)", boxShadow: "4px 4px 0 var(--cam-ink)" }}
          >
            <span className="cam-pill" style={{ background: "var(--cam-coral)" }}>Myth</span>
            <p className="cam-serif mt-4 text-xl leading-snug sm:text-2xl">{item.myth}</p>
            <span className="cam-mono mt-auto inline-flex items-center gap-2 pt-3" style={{ color: "var(--cam-teal-dark)" }}>
              <Repeat className="h-3.5 w-3.5" aria-hidden="true" /> Tap to flip
            </span>
          </button>
          <button
            type="button"
            onClick={() => setFlipped(false)}
            aria-label={`Fact: ${item.fact}. Activate to flip back.`}
            className="cam-flip-face cam-flip-back h-full w-full flex-col items-start rounded-2xl p-6 text-left"
            style={{ background: "var(--cam-teal)", color: "#FFFFFF", border: "2px solid var(--cam-ink)", boxShadow: "4px 4px 0 var(--cam-ink)" }}
          >
            <span className="cam-pill" style={{ background: "var(--cam-sun)", color: "var(--cam-ink)" }}>Fact</span>
            <p className="cam-serif mt-4 text-xl leading-snug sm:text-2xl" style={{ color: "#FFFFFF" }}>{item.fact}</p>
            <span className="cam-mono mt-auto inline-flex items-center gap-2 pt-3" style={{ color: "var(--cam-mint)" }}>
              <Repeat className="h-3.5 w-3.5" aria-hidden="true" /> Flip back
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ThisOrThatToggle({ item, index }: { item: ThisOrThat; index: number }) {
  const [picked, setPicked] = useState<"a" | "b" | null>(null);
  return (
    <motion.div custom={index} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
      <div
        className="rounded-2xl p-6"
        style={{ background: "var(--cam-card)", border: "2px solid var(--cam-ink)", boxShadow: "4px 4px 0 var(--cam-ink)" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="cam-kicker inline-flex items-center gap-2"><Shuffle className="h-3.5 w-3.5" aria-hidden="true" /> This or that</span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:flex-1">
            {(["a", "b"] as const).map((side) => (
              <button
                key={side}
                type="button"
                aria-pressed={picked === side}
                onClick={() => setPicked(side)}
                className="cam-chip justify-center text-center"
                style={picked === side ? { background: "var(--cam-sun)", color: "var(--cam-ink)" } : picked ? { opacity: 0.55 } : undefined}
              >
                {side === "a" ? item.a : item.b}
              </button>
            ))}
          </div>
        </div>
        {picked && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-4 rounded-xl px-4 py-3 text-sm leading-relaxed"
            style={{ background: "var(--cam-mint)", border: "2px solid var(--cam-ink)", color: "var(--cam-ink)", fontWeight: 600 }}
            role="status"
          >
            {item.note}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

function GuessReveal({ round, note, index }: { round: number; note: string; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const g = cam.source.guessGame[round];
  return (
    <motion.div custom={index} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
      <div
        className="rounded-2xl p-6"
        style={{ background: "var(--cam-card)", border: "2px solid var(--cam-ink)", boxShadow: "4px 4px 0 var(--cam-ink)" }}
      >
        <span className="cam-kicker inline-flex items-center gap-2"><HelpCircle className="h-3.5 w-3.5" aria-hidden="true" /> Guess the job</span>
        <p className="cam-serif mt-3 text-xl leading-snug sm:text-2xl">“{g.clue}”</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {g.options.map((o) => (
            <span key={o} className="cam-chip" data-active={revealed && o === g.answer ? "true" : "false"}>{o}</span>
          ))}
        </div>
        {!revealed ? (
          <button type="button" onClick={() => setRevealed(true)} className="cam-btn mt-5">
            <Lightbulb className="h-4 w-4" aria-hidden="true" /> Reveal the job
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-5">
            <span className="cam-pill">{g.answer}</span>
            <p className="cam-muted mt-3 text-sm leading-relaxed">{g.why}</p>
            <p className="cam-dim mt-1 text-sm">{note}</p>
            <Link to="/play" className="cam-btn cam-btn-ghost mt-4 inline-flex">
              Play all ten rounds <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function CamInteractiveBlocks({ blocks }: { blocks: InteractiveBlock[] }) {
  if (!blocks?.length) return null;
  return (
    <div className="my-10 space-y-6">
      {blocks.map((b, i) => {
        if (b.type === "mythfact") {
          return (
            <div key={i}>
              <p className="cam-kicker mb-3">{b.heading}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {b.items.map((item, k) => <FlipCard key={k} item={item} index={k} />)}
              </div>
            </div>
          );
        }
        if (b.type === "thisorthat") {
          return (
            <div key={i}>
              <p className="cam-kicker mb-3">{b.heading}</p>
              <div className="space-y-4">
                {b.items.map((item, k) => <ThisOrThatToggle key={k} item={item} index={k} />)}
              </div>
            </div>
          );
        }
        return (
          <div key={i}>
            <p className="cam-kicker mb-3">{b.heading}</p>
            <GuessReveal round={b.round} note={b.note} index={i} />
          </div>
        );
      })}
    </div>
  );
}
