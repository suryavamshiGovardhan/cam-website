import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, RotateCcw } from "lucide-react";
import CamShell from "@/components/cam/CamShell";
import { cam } from "@/data/cam";

interface Round {
  clue: string;
  hint: string;
  answer: string;
  why: string;
  options: string[];
}

const rounds = cam.source.guessGame as unknown as Round[];

export default function CamPlayPage() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const round = rounds[i];
  const revealed = picked !== null;

  const pick = (o: string) => {
    if (revealed) return;
    setPicked(o);
    if (o === round.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 < rounds.length) { setI(i + 1); setPicked(null); }
    else setDone(true);
  };

  const restart = () => { setI(0); setPicked(null); setScore(0); setDone(false); };

  const verdict =
    score >= 8 ? "The world was already interesting. You just had names for it."
    : score >= 5 ? "Half the room had no idea either. That gap is the point."
    : "Wrong answers are useful — they prove the gap. That's what CAM is for.";

  return (
    <CamShell
      title="Guess the Job — CAM Play"
      description="Ten clues from real working Tuesdays. Read the clue, guess the job, meet the work school never named."
      canonical="/play"
    >
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-12 sm:pt-16">
        <p className="cam-kicker">Play</p>
        <h1 className="cam-serif mt-4 text-[38px] leading-[1.05] sm:text-5xl">Guess the job.</h1>
        <p className="cam-muted mt-4 text-lg leading-relaxed">
          Clues from real Tuesdays. Four names. One of them is hiding in the world already.
        </p>

        {!done ? (
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <p className="cam-mono text-[11px] uppercase tracking-[0.2em] cam-dim">Round {i + 1} / {rounds.length}</p>
              <p className="cam-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--cam-kraft)" }}>Score {score}</p>
            </div>
            <div className="mt-3 flex gap-1.5" aria-hidden="true">
              {rounds.map((_, k) => (
                <span key={k} className="h-1 flex-1 rounded-full" style={{ background: k <= i ? "var(--cam-kraft)" : "var(--cam-line)" }} />
              ))}
            </div>

            <div key={round.answer} className="cam-card cam-slide-in mt-6 p-6 sm:p-8">
              <p className="cam-kicker">Clue {i + 1} / {rounds.length}</p>
              <p className="cam-serif mt-4 text-[clamp(20px,3vw,26px)] leading-snug">“{round.clue}”</p>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {round.options.map((o) => {
                  let state: string | undefined;
                  if (revealed) {
                    if (o === round.answer) state = "right";
                    else if (o === picked) state = "wrong";
                  } else if (o === picked) state = "picked";
                  return (
                    <button key={o} type="button" onClick={() => pick(o)} className="cam-option" data-state={state} disabled={revealed}>
                      {o}
                    </button>
                  );
                })}
              </div>

              {revealed && (
                <div className="cam-slide-in mt-6 rounded-2xl p-5" style={{ background: "var(--cam-ink2)", boxShadow: "var(--cam-shadow-border)" }}>
                  <p className="cam-kicker inline-flex items-center gap-2"><Lightbulb className="h-3.5 w-3.5" aria-hidden="true" /> The answer: {round.answer}</p>
                  <p className="cam-muted mt-3 text-sm leading-relaxed">{round.why}</p>
                  <p className="cam-dim mt-2 text-sm italic">Hint for next time: {round.hint}</p>
                  <button type="button" onClick={next} className="cam-btn cam-lift mt-5">
                    {i + 1 < rounds.length ? "Next clue" : "See your score"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="cam-card cam-slide-in mt-10 p-8 text-center sm:p-12">
            <p className="cam-kicker">Final score</p>
            <p className="cam-serif mt-4 text-7xl leading-none" style={{ color: "var(--cam-coral)" }}>{score} / {rounds.length}</p>
            <p className="cam-muted mx-auto mt-6 max-w-md text-lg leading-relaxed">{verdict}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={restart} className="cam-btn cam-lift">
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Play again
              </button>
              <Link to="/atlas" className="cam-btn cam-btn-ghost cam-lift">
                Browse all {Object.values(cam.source.atlasIndex).flat().length.toLocaleString("en-IN")} jobs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </section>
    </CamShell>
  );
}
