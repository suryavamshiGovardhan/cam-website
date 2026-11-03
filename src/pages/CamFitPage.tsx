import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw } from "lucide-react";
import CamShell from "@/components/cam/CamShell";
import { LensGrid } from "@/components/cam/CamVisual";
import { cam } from "@/data/cam";

interface FitOption { id: string; label: string }
interface FitQuestion { id: string; title: string; prompt: string; options: FitOption[] }

const questions = cam.source.fitQuestions as unknown as FitQuestion[];

export default function CamFitPage() {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const q = questions[step];
  const finished = step >= questions.length;

  const choose = (label: string) => {
    setPicks((p) => ({ ...p, [q.id]: label }));
    setStep(step + 1);
  };

  const restart = () => {
    setPicks({});
    setStep(0);
  };

  return (
    <CamShell
      title="The Six Lenses — CAM Fit"
      description="Six tests for choosing a career without ruining your life this week: Passion, Skill, Market, Lifestyle, Purpose, Growth. Plus a short mirror quiz."
      canonical="/fit"
    >
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-12 sm:pt-16">
        <p className="cam-kicker">Six lenses</p>
        <h1 className="cam-serif mt-4 max-w-3xl text-[38px] leading-[1.05] sm:text-5xl">Don't pick the loudest career. Run six tests.</h1>
        <p className="cam-muted mt-4 max-w-2xl text-lg leading-relaxed">
          Tap each lens to open its question. Where they overlap — that's fit. Not fame.
        </p>

        <div className="mt-10">
          <LensGrid />
        </div>

        <div className="mt-16 border-t pt-12" style={{ borderColor: "var(--cam-line)" }}>
          <p className="cam-kicker">The mirror</p>
          <h2 className="cam-serif mt-3 text-3xl sm:text-4xl">Four questions. No score. No verdict.</h2>
          <p className="cam-muted mt-3 max-w-xl leading-relaxed">
            This is a mirror, not a test. It just shows you what you leaned toward today.
          </p>

          {!finished ? (
            <div key={q.id} className="cam-card cam-slide-in mt-8 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="cam-kicker">{q.title}</p>
                <p className="cam-mono text-[11px] tracking-[0.2em] cam-dim">
                  {step + 1} / {questions.length}
                </p>
              </div>
              <div
                className="cam-track mt-4"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={questions.length}
                aria-valuenow={step}
                aria-label="Mirror quiz progress"
              >
                {questions.map((_, k) => (
                  <span key={k} data-on={k < step ? "true" : "false"} data-done={k < step ? "true" : undefined} />
                ))}
              </div>
              <p className="cam-serif mt-5 text-2xl leading-snug sm:text-3xl">{q.prompt}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2" role="group" aria-label={q.title}>
                {q.options.map((o) => (
                  <button key={o.id} type="button" onClick={() => choose(o.label)} className="cam-option">
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="cam-card cam-slide-in mt-8 p-6 sm:p-8">
              <p className="cam-kicker">You leaned toward</p>
              <p className="cam-dim mt-2 text-sm font-semibold">Saved on this screen only — nothing is uploaded.</p>
              <ul className="mt-4 space-y-3">
                {questions.map((qq) => (
                  <li key={qq.id} className="flex flex-wrap items-baseline gap-2">
                    <span className="cam-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--cam-kraft)" }}>
                      {qq.title}
                    </span>
                    <span className="cam-serif text-xl">{picks[qq.id]}</span>
                  </li>
                ))}
              </ul>
              <p className="cam-muted mt-6 max-w-xl text-sm leading-relaxed">
                Keep this list. Take the atlas and search for work that touches at least two of these. That's a door, not a destiny.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/atlas" className="cam-btn cam-lift">
                  Search the atlas <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <button type="button" onClick={restart} className="cam-btn cam-btn-ghost cam-lift">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </CamShell>
  );
}
