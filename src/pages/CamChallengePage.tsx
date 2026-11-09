import { useEffect, useMemo, useState } from "react";
import { Check, RotateCcw, Sparkles } from "lucide-react";
import CamShell from "@/components/cam/CamShell";
import ShareButtons from "@/components/ShareButtons";
import { cam } from "@/data/cam";

interface Day { day: number; title: string; task: string; minutes: number }

const days = cam.source.days as unknown as Day[];
const STORAGE_KEY = "cam-challenge-done";
const MILESTONES = [7, 15, 30];

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

  useEffect(() => {
    setDone(loadDone());
  }, []);

  const persist = (next: number[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* private mode */
    }
    setDone(next);
  };

  const toggle = (day: number) => {
    const isDone = done.includes(day);
    if (isDone) {
      const ok = window.confirm(`Untick Day ${String(day).padStart(2, "0")}? You can tick it again later.`);
      if (!ok) return;
      persist(done.filter((d) => d !== day));
      return;
    }
    persist([...done, day]);
  };

  const reset = () => {
    if (!window.confirm("Reset all thirty days on this device?")) return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setDone([]);
  };

  const pct = Math.round((done.length / days.length) * 100);
  const minutes = days.filter((d) => done.includes(d.day)).reduce((a, d) => a + d.minutes, 0);
  const nextDay = useMemo(() => days.find((d) => !done.includes(d.day))?.day ?? null, [done]);
  const completedCount = done.length;

  return (
    <CamShell
      title="Thirty Days of Looking — CAM"
      description="One small exposure a day for thirty days: five to twenty minutes, kept on this page, no account needed."
      canonical="/challenge"
    >
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-12 sm:pt-16">
        <p className="cam-kicker">Thirty days of looking</p>
        <h1 className="cam-serif mt-4 max-w-3xl text-[38px] leading-[1.05] sm:text-5xl">
          I don't need a final career today. I need a wider map.
        </h1>
        <p className="cam-muted mt-4 max-w-2xl text-lg leading-relaxed">
          One page a day for a month. Tick them off as you go — your progress stays on this device. No account needed.
        </p>

        <div className="cam-card mt-8 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="cam-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--cam-kraft)" }} aria-live="polite">
              {completedCount} / {days.length} days · {minutes} minutes of looking
            </p>
            {completedCount > 0 && (
              <button type="button" onClick={reset} className="cam-chip cam-lift inline-flex items-center gap-2" aria-label="Reset all progress">
                <RotateCcw className="h-3 w-3" aria-hidden="true" /> Reset
              </button>
            )}
          </div>
          <div
            className="mt-4 h-2.5 w-full rounded-full"
            style={{ background: "rgba(15,61,62,0.15)" }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Challenge progress"
          >
            <div className="h-2.5 rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: "var(--cam-coral)" }} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Milestones">
            {MILESTONES.map((m) => {
              const unlocked = completedCount >= m;
              return (
                <span key={m} className="cam-milestone" data-locked={unlocked ? "false" : "true"}>
                  {unlocked ? <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                  {unlocked ? `${m}-day mark ✓` : `${m}-day mark`}
                </span>
              );
            })}
          </div>
          {nextDay != null && (
            <p className="cam-muted mt-4 text-sm font-semibold">
              <a href={`#day-${nextDay}`} className="underline" style={{ color: "var(--cam-coral)" }}>
                Up next: Day {String(nextDay).padStart(2, "0")}
              </a>
              {" — jump to the highlighted card."}
            </p>
          )}
          <div className="mt-5">
            <ShareButtons
              compact
              path="/challenge"
              text={
                completedCount > 0
                  ? `I've completed ${completedCount} of CAM's 30 days of looking — one small career-exposure task at a time. Join me:`
                  : `Starting CAM's 30 days of looking — one small career-exposure task a day. Join me:`
              }
              whatsappLabel="Share progress on WhatsApp"
              story={{
                kicker: "30 days of looking",
                headline: completedCount > 0 ? `${completedCount} / 30 days` : "Day 01",
                subline: "One small look. A wider map.",
              }}
            />
          </div>
        </div>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2">
          {days.map((d) => {
            const isDone = done.includes(d.day);
            const isNext = d.day === nextDay;
            return (
              <li key={d.day} id={`day-${d.day}`} className="flex flex-col gap-2 scroll-mt-24">
                <button
                  type="button"
                  onClick={() => toggle(d.day)}
                  aria-pressed={isDone}
                  className="cam-tile flex w-full items-start gap-4 p-4 text-left"
                  style={
                    isDone
                      ? { boxShadow: "0 0 0 3px var(--cam-sun)" }
                      : isNext
                        ? { boxShadow: "0 0 0 3px var(--cam-coral)" }
                        : undefined
                  }
                >
                  <span
                    className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors"
                    style={
                      isDone
                        ? { background: "var(--cam-teal)", color: "#FFFFFF", border: "2px solid var(--cam-ink)" }
                        : { boxShadow: "inset 0 0 0 2px var(--cam-ink)", color: "var(--cam-ink)", background: "#FFFFFF" }
                    }
                    aria-hidden="true"
                  >
                    {isDone ? <Check className="h-4 w-4" /> : <span className="cam-mono text-[11px] font-extrabold">{String(d.day).padStart(2, "0")}</span>}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="cam-serif text-lg leading-tight">
                        {d.title}
                        {isNext && !isDone ? (
                          <span className="cam-pill ml-2 align-middle" style={{ fontSize: 10, padding: "2px 8px" }}>
                            Next
                          </span>
                        ) : null}
                      </span>
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
