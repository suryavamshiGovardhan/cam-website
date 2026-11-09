import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Keyboard } from "lucide-react";
import CamShell, { CamCover } from "@/components/cam/CamShell";
import { MenuSlips, StepPath, ReasonCards, CityTown } from "@/components/cam/CamVisual";
import { cam } from "@/data/cam";

interface TalkScene {
  id: string;
  section: string;
  layout: string;
  text?: string;
  sub?: string;
  kicker?: string;
  visual?: string;
  italic?: boolean;
  quote?: string;
  scene?: string;
  value?: string;
  caption?: string;
  activity?: string;
  items?: { title: string; body?: string }[];
}

const scenes = cam.source.talkScenes as unknown as TalkScene[];

const INTERACTIVE_LINKS: Record<string, { to: string; label: string }> = {
  dump: { to: "/challenge", label: "Do the sixty-second dump on the thirty-days page" },
  game: { to: "/play", label: "Play Guess the Job" },
  showcase: { to: "/atlas", label: "Browse the flagship careers" },
  atlas: { to: "/atlas", label: "Search the full atlas" },
  six: { to: "/fit", label: "Run the six tests" },
  stories: { to: "/about", label: "Read the paths" },
  future: { to: "/about", label: "See what is already hiring" },
  challenge: { to: "/challenge", label: "Start the thirty days" },
};

function SceneBody({ scene }: { scene: TalkScene }) {
  switch (scene.layout) {
    case "black":
      return (
        <p className={`cam-serif mx-auto max-w-3xl text-center text-[clamp(30px,5.5vw,52px)] leading-[1.15] ${scene.italic ? "italic" : ""}`}>
          {scene.text}
        </p>
      );
    case "statement":
      return (
        <div className="mx-auto max-w-3xl text-center">
          {scene.kicker && <p className="cam-kicker">{scene.kicker}</p>}
          <p className="cam-serif mt-5 text-[clamp(28px,4.6vw,46px)] leading-[1.12]">{scene.text}</p>
          {scene.sub && <p className="cam-muted mx-auto mt-5 max-w-xl text-lg leading-relaxed">{scene.sub}</p>}
        </div>
      );
    case "quote":
      return (
        <div className="mx-auto max-w-3xl text-center">
          {scene.kicker && <p className="cam-kicker">{scene.kicker}</p>}
          <p className="cam-serif mt-5 text-[clamp(30px,5vw,50px)] italic leading-[1.15]">{scene.text}</p>
          {scene.sub && <p className="cam-muted mt-5 text-lg italic">{scene.sub}</p>}
          {scene.quote && <p className="cam-muted mt-5 text-sm italic">“{scene.quote}”</p>}
        </div>
      );
    case "title":
      return (
        <div className="mx-auto max-w-3xl text-center">
          <p className="cam-kicker">{scene.kicker}</p>
          <p className="cam-serif mt-6 text-[clamp(36px,6.5vw,64px)] leading-[1.05]">{scene.text}</p>
          {scene.sub && <p className="cam-muted mt-6 text-lg">{scene.sub}</p>}
        </div>
      );
    case "split":
      return (
        <div className="grid items-center gap-8 sm:grid-cols-2">
          <div>
            {scene.kicker && <p className="cam-kicker">{scene.kicker}</p>}
            <p className="cam-serif mt-4 text-[clamp(26px,4vw,40px)] leading-[1.12]">{scene.text}</p>
            {scene.sub && <p className="cam-muted mt-4 text-lg leading-relaxed">{scene.sub}</p>}
          </div>
          <CamCover slug={scene.scene ?? scene.id} />
        </div>
      );
    case "menu":
      return (
        <div>
          {scene.kicker && <p className="cam-kicker text-center">{scene.kicker}</p>}
          <div className="mt-6"><MenuSlips items={scene.items?.map((i) => i.title) ?? []} /></div>
        </div>
      );
    case "number":
      return (
        <div className="mx-auto max-w-3xl text-center">
          <p className="cam-serif text-[clamp(72px,14vw,150px)] leading-none" style={{ color: "var(--cam-coral)" }}>{scene.value}</p>
          {scene.caption && <p className="cam-kicker mt-4">{scene.caption}</p>}
          {scene.sub && <p className="cam-muted mt-4 text-lg">{scene.sub}</p>}
        </div>
      );
    case "compare":
      return (
        <div>
          {scene.kicker && <p className="cam-kicker mb-6 text-center">{scene.kicker}</p>}
          <CityTown />
        </div>
      );
    case "cards":
      return (
        <div>
          {scene.kicker && <p className="cam-kicker mb-6 text-center">{scene.kicker}</p>}
          <ReasonCards />
        </div>
      );
    case "steps":
      return (
        <div>
          {scene.kicker && <p className="cam-kicker mb-6 text-center">{scene.kicker}</p>}
          <StepPath steps={scene.items ?? []} />
        </div>
      );
    case "interactive": {
      const link = INTERACTIVE_LINKS[scene.id];
      return (
        <div className="mx-auto max-w-xl text-center">
          <p className="cam-kicker">{scene.section}</p>
          <p className="cam-serif mt-4 text-3xl leading-tight">{scene.activity ?? scene.text}</p>
          {link && (
            <Link to={link.to} className="cam-btn cam-lift mt-8 inline-flex">
              {link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      );
    }
    case "credits":
      return (
        <div className="mx-auto max-w-xl text-center">
          <p className="cam-kicker">{scene.kicker}</p>
          <p className="cam-serif mt-5 text-3xl">{scene.text}</p>
          {scene.sub && <p className="cam-muted mt-4 text-lg">{scene.sub}</p>}
          <div className="mt-8 flex justify-center gap-4">
            {cam.meta.founders.map((f) => (
              <div key={f.name} className="cam-tile px-6 py-4 text-center">
                <span className="cam-serif mx-auto flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ background: "var(--cam-paper)", color: "var(--cam-ink)" }}>{f.initial}</span>
                <p className="cam-serif mt-2">{f.name}</p>
                <p className="cam-kicker">{f.role}</p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return <p className="cam-serif text-center text-3xl">{scene.text}</p>;
  }
}

export default function CamTalkPage() {
  const [i, setI] = useState(0);
  const scene = scenes[i];

  const go = useCallback((dir: number) => {
    setI((cur) => Math.min(scenes.length - 1, Math.max(0, cur + dir)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(-1); }
      // Space intentionally not bound — it scrolls the page and must stay available.
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [i]);

  const progress = ((i + 1) / scenes.length) * 100;

  return (
    <CamShell
      title="The Talk — Exposure Is All You Need | CAM"
      description="The CAM keynote as slides: quiet scenes on the Knowing Gap, the atlas, the game, the six lenses and thirty days of looking."
      canonical="/talk"
    >
      <section className="mx-auto max-w-4xl px-5 pb-20 pt-10 sm:pt-14">
        <h1 className="cam-serif text-[clamp(28px,5vw,44px)] leading-tight">The Talk — Exposure Is All You Need</h1>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="cam-kicker">Keynote, slide by slide</p>
          <p className="cam-mono text-[11px] tracking-[0.2em] cam-dim">
            {scene.section} · {String(i + 1).padStart(2, "0")} / {scenes.length}
          </p>
        </div>

        <div key={scene.id} className="cam-card cam-slide-in mt-6 flex min-h-[420px] items-center px-6 py-14 sm:px-12">
          <div className="w-full"><SceneBody scene={scene} /></div>
        </div>

        <div className="mt-6">
          <div className="h-px w-full" style={{ background: "var(--cam-line)" }}>
            <div className="h-px transition-all duration-300" style={{ width: `${progress}%`, background: "var(--cam-kraft)" }} />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <button type="button" onClick={() => go(-1)} disabled={i === 0} className="cam-btn-ghost cam-btn cam-lift disabled:cursor-not-allowed disabled:opacity-40">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous
            </button>
            <span className="cam-mono hidden items-center gap-2 text-[11px] tracking-[0.2em] cam-dim sm:inline-flex">
              <Keyboard className="h-3.5 w-3.5" aria-hidden="true" /> ← → keys work · Space scrolls
            </span>
            {i < scenes.length - 1 ? (
              <button type="button" onClick={() => go(1)} className="cam-btn cam-lift">
                Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <Link to="/" className="cam-btn cam-lift">All articles <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            )}
          </div>
        </div>
      </section>
    </CamShell>
  );
}
