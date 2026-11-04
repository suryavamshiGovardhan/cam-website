import { useCallback, useEffect, useRef, useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import AdminPassGate from "./AdminPassGate";
import { SLIDES, type Slide } from "./slides";
import "@/components/cam/cam.css";

function useSwipe(onLeft: () => void, onRight: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      const t = e.changedTouches[0];
      start.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (!start.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.current.x;
      const dy = t.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) onLeft();
      else onRight();
    },
  };
}

export function Deck({ slides = SLIDES, label = "CAM · school pitch", sub = "Hyderabad · Classes 8–12 · founders & principals", extra }: { slides?: Slide[]; label?: string; sub?: string; extra?: React.ReactNode }) {
  const SL = slides;
  const [notesOpen, setNotesOpen] = useState(false);
  const [i, setI] = useState(0);
  const [present, setPresent] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const n = SL.length;
  const slide = SL[i];

  const go = useCallback(
    (next: number) => {
      setI(Math.max(0, Math.min(n - 1, next)));
    },
    [n],
  );
  const next = useCallback(() => go(i + 1), [go, i]);
  const prev = useCallback(() => go(i - 1), [go, i]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(n - 1);
      } else if (e.key === "n" || e.key === "N") {
        setNotesOpen((v) => !v);
      } else if (e.key === "f" || e.key === "F") {
        togglePresent();
      } else if (e.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen().catch(() => undefined);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go, n]);

  useEffect(() => {
    const onFs = () => setPresent(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const togglePresent = () => {
    const el = rootRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => undefined);
    } else {
      document.exitFullscreen?.().catch(() => undefined);
    }
  };

  const swipe = useSwipe(next, prev);

  return (
    <div
      ref={rootRef}
      className="cam flex min-h-screen flex-col"
      style={{ background: "var(--cam-bg)", color: "var(--cam-ink)" }}
      {...swipe}
    >
      <SEOHead
        title="CAM school pitch (private)"
        description="Private school-pitch deck"
        noindex
        canonicalUrl="https://suryavamshigovardhan.github.io/cam-website/admin"
      />

      {/* top bar */}
      <header
        className="flex flex-wrap items-center justify-between gap-3 border-b-2 px-4 py-3 sm:px-6"
        style={{ borderColor: "var(--cam-ink)", background: "#FFF6E9" }}
      >
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide" style={{ color: "var(--cam-coral)" }}>
            {label}
          </p>
          <p className="text-sm font-bold" style={{ color: "var(--cam-dim)" }}>
            {sub}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="cam-mono text-[11px] uppercase tracking-widest" aria-live="polite">
            {i + 1} / {n}
          </span>
          <button type="button" className="cam-btn cam-btn-ghost" style={{ minHeight: 40, padding: "8px 14px" }} onClick={togglePresent}>
            {present ? "Exit present" : "Present"}
          </button>
          {slide.notes && (
            <button type="button" className="cam-btn cam-btn-ghost" style={{ minHeight: 40, padding: "8px 14px" }} onClick={() => setNotesOpen((v) => !v)} aria-pressed={notesOpen}>
              Notes (N)
            </button>
          )}
          {extra}
        </div>
      </header>

      {/* slide stage — click advances */}
      <div
        role="region"
        aria-label={`Slide ${i + 1} of ${n}: ${slide.title}`}
        className="relative flex flex-1 cursor-pointer flex-col px-5 py-8 sm:px-10 sm:py-12"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("a,button,input,textarea,label")) return;
          const mid = window.innerWidth / 2;
          if (e.clientX < mid) prev();
          else next();
        }}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">{slide.body}</div>
      </div>

      {notesOpen && slide.notes && (
        <aside aria-label="Speaker notes" className="max-h-[40vh] overflow-y-auto border-t-2 px-5 py-4 sm:px-10" style={{ borderColor: "var(--cam-ink)", background: "#0F3D3E", color: "#FFF6E9" }}>
          <p className="text-xs font-extrabold uppercase tracking-wide" style={{ color: "#FFC94A" }}>Speaker script</p>
          <p className="mt-2 whitespace-pre-line text-base leading-relaxed">{slide.notes}</p>
        </aside>
      )}

      {/* controls */}
      <footer
        className="flex items-center justify-between gap-3 border-t-2 px-4 py-3 sm:px-6"
        style={{ borderColor: "var(--cam-ink)", background: "#FFFFFF" }}
      >
        <button type="button" className="cam-btn cam-btn-ghost" disabled={i === 0} onClick={prev} aria-label="Previous slide">
          ← Prev
        </button>
        <div className="flex max-w-[50%] flex-1 justify-center gap-1 overflow-x-auto" aria-hidden="true">
          {SL.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(idx)}
              className="h-2.5 w-2.5 shrink-0 rounded-full border-2"
              style={{
                borderColor: "var(--cam-ink)",
                background: idx === i ? "var(--cam-coral)" : "transparent",
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button type="button" className="cam-btn cam-btn-sun" disabled={i === n - 1} onClick={next} aria-label="Next slide">
          Next →
        </button>
      </footer>
      <p className="px-4 pb-3 text-center text-[10px] font-semibold" style={{ color: "var(--cam-dim)" }}>
        ← → keys · swipe · click left/right · F present · N notes
      </p>
    </div>
  );
}

export default function AdminDeckPage() {
  return (
    <AdminPassGate>
      <Deck extra={<a href="/cam-website/admin/session" className="cam-btn cam-btn-sun" style={{ minHeight: 40, padding: "8px 14px" }}>Student session →</a>} />
    </AdminPassGate>
  );
}
