import { useEffect, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import CamShell from "@/components/cam/CamShell";
import { cam } from "@/data/cam";

interface Day { day: number; title: string; task: string; minutes: number }

const days = cam.source.days as unknown as Day[];
const STORAGE_KEY = "cam-challenge-done";

function loadDone(): number[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export default function CamChallengePage() {
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => { setDone(loadDone()); }, []);

  const toggle = (day: number) => {
    setDone((prev) => {
      const next = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* private mode */ }
      return next;
    });
  };

  const reset = () => {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setDone([]);
  };

  const pct = Math.round((done.length / days.length) * 100);
  const minutes = days.filter((d) => done.includes(d.day)).reduce((a, d) => a + d.minutes, 0);

  return (
    <CamShell
      title="Thirty Days of Looking — CAM"
      description="One small exposure a day for thirty days: five to twenty minutes, kept on this page, no account needed."
      canonical="/challenge"
    >
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-12 sm:pt-16">
        <p className="cam-kicker">Thirty days of looking</p>
        <h1 className="cam-serif mt-4 max-w-3xl text-[38px] leading-[1.05] sm:text-5xl">I don't need a final career today. I need a wider map.</h1>
        <p className="cam-muted mt-4 max-w-2xl text-lg leading-relaxed">
          One page a day for a month. Tick them off as you go — your progress is kept on this device, no account needed.
        </p>

        <div className="cam-card mt-8 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="cam-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--cam-kraft)" }}>
              {done.length} / {days.length} days · {minutes} minutes of looking
            </p>
            {done.length > 0 && (
              <button type="button" onClick={reset} className="cam-chip cam-lift inline-flex items-center gap-2" aria-label="Reset all progress">
                <RotateCcw className="h-3 w-3" aria-hidden="true" /> Reset
              </button>
            )}
          </div>
          <div className="mt-3 h-1 w-full rounded-full" style={{ background: "var(--cam-line)" }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Challenge progress">
            <div className="h-1 rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: "var(--cam-kraft)" }} />
          </div>
        </div>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2">
          {days.map((d) => {
            const isDone = done.includes(d.day);
            return (
              <li key={d.day}>
                <button
                  type="button"
                  onClick={() => toggle(d.day)}
                  aria-pressed={isDone}
                  className="cam-tile flex w-full items-start gap-4 p-4 text-left"
                  style={isDone ? { boxShadow: "0 0 0 3px var(--cam-sun)" } : undefined}
                >
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors"
                    style={isDone ? { background: "var(--cam-paper)", color: "var(--cam-ink)" } : { boxShadow: "inset 0 0 0 1px var(--cam-line)", color: "var(--cam-dim)" }}
                    aria-hidden="true"
                  >
                    {isDone ? <Check className="h-4 w-4" /> : <span className="cam-mono text-[11px]">{String(d.day).padStart(2, "0")}</span>}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="cam-serif text-lg leading-tight">{d.title}</span>
                      <span className="cam-mono shrink-0 text-[11px] cam-dim">{d.minutes} min</span>
                    </span>
                    <span className={`cam-muted mt-1 block text-sm leading-relaxed ${isDone ? "opacity-50" : ""}`}>{d.task}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <p className="cam-dim mt-10 text-center text-sm">
          On Day 30, the last page asks you to write a one-page letter to future-you. That part is between you and the page.
        </p>
      </section>
    </CamShell>
  );
}
