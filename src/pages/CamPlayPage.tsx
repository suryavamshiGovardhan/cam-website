import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, RotateCcw, Sparkles } from "lucide-react";
import CamShell from "@/components/cam/CamShell";
import ShareButtons from "@/components/ShareButtons";
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
    if (i + 1 < rounds.length) {
      setI(i + 1);
      setPicked(null);
    } else setDone(true);
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const verdict =
    score >= 8
      ? "The world was already interesting. You just had names for it."
      : score >= 5
        ? "Half the room had no idea either. That gap is the point."
        : "Wrong answers are useful — they prove the gap. That's what CAM is for.";

  const cheer =
    score === 0 && i === 0
      ? "No pressure — wrong answers still teach you something."
      : score > i
        ? "Nice streak of noticing."
        : "Keep going — every miss widens the map.";

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
          Clues from real Tuesdays. Four names. Tap one. Learn something either way.
        </p>

        {!done ? (
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="cam-mono text-[11px] uppercase tracking-[0.2em] cam-dim">
                Round {i + 1} / {rounds.length}
              </p>
              <p
                className="cam-mono inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-[11px] uppercase tracking-[0.16em]"
                style={{ background: "var(--cam-sun)", color: "var(--cam-ink)", border: "2px solid var(--cam-ink)" }}
                aria-live="polite"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Score {score}
              </p>
            </div>
            <div className="cam-track mt-3" role="progressbar" aria-valuemin={0} aria-valuemax={rounds.length} aria-valuenow={i + (revealed ? 1 : 0)} aria-label="Game progress">
              {rounds.map((_, k) => (
                <span key={k} data-on={k <= i ? "true" : "false"} data-done={k < i || (k === i && revealed) ? "true" : undefined} />
              ))}
            </div>
            <p className="cam-dim mt-3 text-sm font-semibold" aria-live="polite">
              {cheer}
            </p>

            <div key={round.answer} className="cam-card cam-slide-in mt-6 p-6 sm:p-8">
              <p className="cam-kicker">Clue {i + 1} / {rounds.length}</p>
              <p className="cam-serif mt-4 text-[clamp(20px,3vw,26px)] leading-snug">“{round.clue}”</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2" role="group" aria-label="Choose an answer">
                {round.options.map((o) => {
                  let state: string | undefined;
                  if (revealed) {
                    if (o === round.answer) state = "right";
                    else if (o === picked) state = "wrong";
                  } else if (o === picked) state = "picked";
                  return (
                    <button key={o} type="button" onClick={() => pick(o)} className="cam-option" data-state={state} disabled={revealed} aria-pressed={o === picked}>
                      {o}
                    </button>
                  );
                })}
              </div>

              {revealed && (
                <div className="cam-slide-in mt-6 rounded-2xl p-5" style={{ background: "var(--cam-ink2)", boxShadow: "var(--cam-shadow-border)" }} aria-live="polite">
                  <p className="cam-kicker inline-flex items-center gap-2">
                    <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />{" "}
                    {picked === round.answer ? "Yes — " : "Close — "}
                    {round.answer}
                  </p>
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
            <p className="cam-serif mt-4 text-7xl leading-none" style={{ color: "var(--cam-coral)" }} aria-live="polite">
              {score} / {rounds.length}
            </p>
            <p className="cam-muted mx-auto mt-6 max-w-md text-lg leading-relaxed">{verdict}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={restart} className="cam-btn cam-lift">
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Play again
              </button>
              <Link to="/atlas" className="cam-btn cam-btn-ghost cam-lift">
                Browse the atlas <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 flex justify-center">
              <ShareButtons
                path="/play"
                text={`I scored ${score}/${rounds.length} on CAM Guess the Job — careers school never named. Try it:`}
                whatsappLabel="Share score on WhatsApp"
                story={{
                  kicker: "Guess the Job",
                  headline: `${score} / ${rounds.length}`,
                  subline: "I just played CAM. Beat my score?",
                }}
              />
            </div>
          </div>
        )}
      </section>
    </CamShell>
  );
}
