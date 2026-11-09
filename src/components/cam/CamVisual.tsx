import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, AtSign, DoorOpen, Instagram, Mail, Search } from "lucide-react";
import { cam } from "@/data/cam";

type Visual = { id: string; kind: string; alt: string };

/* ------------------------------------------------------------------ */
/* Shared building blocks                                              */
/* ------------------------------------------------------------------ */

export function MenuSlips({ items = ["Doctor", "Engineer", "Teacher", "CA", "IAS", "Maybe… YouTuber"] }: { items?: string[] }) {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-2.5 py-2">
      {items.map((it, i) => (
        <div
          key={it}
          className="cam-lift w-[72%] rounded-xl px-5 py-3 text-center cam-serif text-xl"
          style={{
            background: "var(--cam-paper)",
            color: "var(--cam-ink)",
            boxShadow: "var(--cam-shadow-paper)",
            ["--cam-rot" as string]: `${i % 2 ? 2 : -2}deg`,
            transform: `rotate(${i % 2 ? 2 : -2}deg)`,
          }}
        >
          {it}
        </div>
      ))}
    </div>
  );
}

export function PullQuote({ text, windowGrid = false }: { text: string; windowGrid?: boolean }) {
  return (
    <figure className="relative overflow-hidden rounded-3xl px-6 py-10 text-center" style={{ background: "var(--cam-ink2)", boxShadow: "var(--cam-shadow-border)" }}>
      {windowGrid && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-2 gap-3 p-5 opacity-[0.08]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-md" style={{ boxShadow: "inset 0 0 0 1px var(--cam-paper)" }} />
          ))}
        </div>
      )}
      <blockquote className="cam-serif relative text-[clamp(22px,3.4vw,30px)] italic leading-snug">{text}</blockquote>
    </figure>
  );
}

export function StepPath({ steps, door = false }: { steps: { title: string; body?: string }[]; door?: boolean }) {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      {steps.map((s, i) => (
        <div key={s.title} className="flex flex-1 items-center gap-3">
          <div className="cam-stone flex-1 px-4 py-4">
            <span className="cam-mono text-[11px] tracking-[0.2em]" style={{ color: "var(--cam-kraft)" }}>{String(i + 1).padStart(2, "0")}</span>
            <p className="cam-serif mt-1 text-lg leading-tight">{s.title}</p>
            {s.body && <p className="cam-muted mt-1 text-xs leading-relaxed">{s.body}</p>}
          </div>
          <ArrowRight aria-hidden="true" className="hidden h-4 w-4 shrink-0 sm:block" style={{ color: "var(--cam-dim)" }} />
        </div>
      ))}
      {door && (
        <div className="cam-stone flex items-center justify-center gap-2 px-4 py-4 sm:flex-1">
          <DoorOpen aria-hidden="true" className="h-5 w-5" style={{ color: "var(--cam-kraft)" }} />
          <span className="cam-serif text-lg">A door</span>
        </div>
      )}
    </div>
  );
}

export function GapDiagram() {
  return (
    <svg viewBox="0 0 660 320" className="w-full" role="img" aria-label="The Knowing Gap: the distance between careers that exist and careers you have been shown">
      <rect x="40" y="110" width="210" height="170" rx="20" fill="var(--cam-teal)" />
      <rect x="40" y="110" width="210" height="170" rx="20" fill="none" stroke="var(--cam-ink)" strokeWidth="3" />
      <rect x="410" y="180" width="210" height="100" rx="20" fill="var(--cam-mint)" />
      <rect x="410" y="180" width="210" height="100" rx="20" fill="none" stroke="var(--cam-ink)" strokeWidth="3" />
      <circle cx="515" cy="150" r="10" fill="var(--cam-ink)" />
      <rect x="508" y="162" width="14" height="18" rx="6" fill="var(--cam-ink)" />
      <path d="M 250 130 Q 330 40 410 195" fill="none" stroke="var(--cam-ink)" strokeWidth="2.5" strokeDasharray="7 9" />
      <text x="330" y="80" textAnchor="middle" fill="var(--cam-coral)" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800 }}>The Knowing Gap</text>
      <text x="145" y="300" textAnchor="middle" fill="var(--cam-muted)" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700 }}>CAREERS THAT EXIST</text>
      <text x="515" y="300" textAnchor="middle" fill="var(--cam-muted)" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700 }}>CAREERS YOU'VE BEEN SHOWN</text>
    </svg>
  );
}

export function CityTown() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "A city student", count: 24 },
          { label: "A town student", count: 8 },
        ].map((p) => (
          <div key={p.label} className="cam-tile p-5">
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: p.count }).map((_, i) => (
                <div key={i} className="cam-window" />
              ))}
            </div>
            <p className="cam-kicker mt-4">{p.label}</p>
          </div>
        ))}
      </div>
      <p className="cam-muted mt-3 text-center text-sm">Same sky. Different number of windows.</p>
    </div>
  );
}

export function ReasonCards() {
  const scene = cam.source.talkScenes.find((s) => s.id === "physics");
  const items = (scene && "items" in scene && scene.items) || [];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((it: { title: string; body: string }, i: number) => (
        <div
          key={it.title}
          className="cam-lift rounded-2xl p-5"
          style={{ background: "var(--cam-paper)", color: "var(--cam-ink)", boxShadow: "var(--cam-shadow-paper)", ["--cam-rot" as string]: `${i === 1 ? 0 : i === 0 ? -1.5 : 1.5}deg`, transform: `rotate(${i === 1 ? 0 : i === 0 ? -1.5 : 1.5}deg)` }}
        >
          <p className="cam-serif text-xl leading-tight">{it.title}</p>
          <p className="mt-2 text-sm leading-relaxed opacity-80">{it.body}</p>
        </div>
      ))}
    </div>
  );
}

export function CareerCards({ limit = 3, linkToAtlas = true }: { limit?: number; linkToAtlas?: boolean }) {
  const cards = cam.source.showcase.slice(0, limit);
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="cam-tile p-5">
            <p className="cam-kicker">{c.industry}</p>
            <p className="cam-serif mt-2 text-xl leading-tight">{c.title}</p>
            <p className="cam-muted mt-2 text-sm leading-relaxed">{c.blurb}</p>
          </div>
        ))}
      </div>
      {linkToAtlas && (
        <p className="mt-4 text-center">
          <Link to="/atlas" className="cam-kicker cam-ring inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ boxShadow: "var(--cam-shadow-border)" }}>
            Browse the atlas <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </p>
      )}
    </div>
  );
}

export function IndustryChips({ industries, limit }: { industries: string[]; limit?: number }) {
  const list = limit ? industries.slice(0, limit) : industries;
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {list.map((c) => (
        <Link key={c} to="/atlas" className="cam-chip cam-lift">{c}</Link>
      ))}
    </div>
  );
}

export function FieldCards() {
  const seen = new Set<string>();
  const items = cam.source.future.filter((f) => (seen.has(f.field) ? false : (seen.add(f.field), true))).slice(0, 5);
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {items.map((f) => (
        <div key={f.title} className="cam-tile p-4">
          <p className="cam-kicker">{f.field}</p>
          <p className="cam-serif mt-2 text-lg leading-tight">{f.title}</p>
          <p className="cam-muted mt-2 text-xs leading-relaxed">{f.blurb}</p>
        </div>
      ))}
    </div>
  );
}

export function LensGrid() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cam.source.sixLenses.map((l) => (
        <button
          key={l.id}
          type="button"
          onClick={() => setOpen(open === l.id ? null : l.id)}
          aria-expanded={open === l.id}
          className="cam-tile p-5 text-left"
        >
          <div className="flex items-center justify-between">
            <p className="cam-serif text-xl">{l.title}</p>
            <ArrowRight aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 ${open === l.id ? "rotate-90" : ""}`} style={{ color: "var(--cam-kraft)" }} />
          </div>
          <div className={`grid transition-[grid-template-rows] duration-300 ${open === l.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <p className="cam-muted overflow-hidden text-sm leading-relaxed transition-opacity duration-300" style={{ opacity: open === l.id ? 1 : 0 }}>
              <span className="block pt-2">{l.body}</span>
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

export function WeekPath() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-7">
        {cam.source.days.slice(0, 7).map((d) => (
          <div key={d.day} className="cam-stone px-3 py-4 text-center">
            <span className="cam-mono text-[11px] tracking-[0.2em]" style={{ color: "var(--cam-kraft)" }}>{String(d.day).padStart(2, "0")}</span>
            <p className="cam-serif mt-1 text-sm leading-tight">{d.title}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center">
        <Link to="/challenge" className="cam-kicker cam-ring inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ boxShadow: "var(--cam-shadow-border)" }}>
          Start the thirty days <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </p>
    </div>
  );
}

export function DropKeep() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="cam-tile p-5">
        <p className="cam-kicker">Keep two</p>
        <div className="mt-4 space-y-2">
          <div className="rounded-lg px-4 py-2.5" style={{ background: "var(--cam-paper)", color: "var(--cam-ink)" }}>The one you can't stop reading about</div>
          <div className="rounded-lg px-4 py-2.5" style={{ background: "var(--cam-paper)", color: "var(--cam-ink)" }}>The one you'd try on a free Saturday</div>
        </div>
      </div>
      <div className="cam-tile p-5">
        <p className="cam-kicker">Drop the rest</p>
        <div className="mt-4 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg px-4 py-2.5 opacity-40" style={{ boxShadow: "inset 0 0 0 1px var(--cam-line)" }}>Not this month. No guilt.</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SearchMock() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(q.trim() ? `/atlas?q=${encodeURIComponent(q.trim())}` : "/atlas");
  };
  return (
    <div>
      <form onSubmit={submit} className="flex items-center gap-3 rounded-full px-5 py-3.5" style={{ background: "var(--cam-card)", border: "2px solid var(--cam-ink)", boxShadow: "4px 4px 0 var(--cam-ink)" }}>
        <Search className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: "var(--cam-dim)" }} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search careers — tea, ocean, type, cricket…"
          aria-label="Search the CAM atlas"
          className="w-full bg-transparent text-sm outline-none placeholder:opacity-50"
          style={{ color: "var(--cam-fg)" }}
        />
        <button type="submit" className="cam-kicker cam-ring shrink-0 rounded-full px-4 py-1.5" style={{ background: "var(--cam-paper)", color: "var(--cam-ink)" }}>
          Search
        </button>
      </form>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {["Film", "Aviation", "Letters", "Food", "Ocean", "Space"].map((c) => (
          <Link key={c} to={`/atlas?q=${encodeURIComponent(c.toLowerCase())}`} className="cam-chip cam-lift">{c}</Link>
        ))}
      </div>
    </div>
  );
}

export function ThreeLines() {
  const lines = ["Don't choose the most popular career.", "Choose the career that fits you.", "Stay curious. Keep exposing yourself."];
  return (
    <div className="space-y-3">
      {lines.map((l, i) => (
        <div key={l} className="cam-tile px-5 py-4">
          <span className="cam-mono text-[11px] tracking-[0.2em]" style={{ color: "var(--cam-kraft)" }}>{String(i + 1).padStart(2, "0")}</span>
          <p className="cam-serif mt-1 text-xl leading-tight">{l}</p>
        </div>
      ))}
    </div>
  );
}

export function PiecesRow() {
  const pieces = [
    { title: "The Talk", to: "/articles/the-question-you-were-asked-at-ten", body: "Why the usual menu is a cage with six windows." },
    { title: "The Atlas", to: "/articles/inside-the-atlas-87-industries", body: "1,058 jobs across 87 industries — searchable." },
    { title: "The Game", to: "/play", body: "Ten clues from real Tuesdays. Guess the job." },
    { title: "Six lenses", to: "/fit", body: "Passion, skill, market, lifestyle, purpose, growth." },
    { title: "Thirty days of looking", to: "/challenge", body: "A month of small exposures, one page a day." },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {pieces.map((p) => (
        <Link key={p.title} to={p.to} className="cam-tile group p-5">
          <p className="cam-serif text-xl leading-tight">{p.title}</p>
          <p className="cam-muted mt-2 text-sm leading-relaxed">{p.body}</p>
          <span className="cam-kicker mt-3 inline-flex items-center gap-2">
            Open <ArrowRight aria-hidden="true" className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function ContactCard() {
  return (
    <div className="cam-tile p-6">
      <p className="cam-kicker">Write to us</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={`mailto:${cam.meta.email}`} className="cam-muted inline-flex items-center gap-2 hover:text-[color:var(--cam-fg)]"><Mail className="h-4 w-4" aria-hidden="true" /> {cam.meta.email}</a>
        <a href={cam.meta.instagram.url} target="_blank" rel="noopener noreferrer" className="cam-muted inline-flex items-center gap-2 hover:text-[color:var(--cam-fg)]"><Instagram className="h-4 w-4" aria-hidden="true" /> {cam.meta.instagram.handle}</a>
        <a href={cam.meta.x.url} target="_blank" rel="noopener noreferrer" className="cam-muted inline-flex items-center gap-2 hover:text-[color:var(--cam-fg)]"><AtSign className="h-4 w-4" aria-hidden="true" /> {cam.meta.x.handle}</a>
      </div>
    </div>
  );
}

export function ClueTeaser() {
  const round = cam.source.guessGame[0];
  return (
    <div className="cam-tile p-6">
      <p className="cam-kicker">Clue 1 / 10</p>
      <p className="cam-serif mt-3 text-xl leading-snug">“{round.clue}”</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {round.options.map((o) => (
          <div key={o} className="cam-option">{o}</div>
        ))}
      </div>
      <p className="mt-4 text-center">
        <Link to="/play" className="cam-kicker cam-ring inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "var(--cam-paper)", color: "var(--cam-ink)" }}>
          Play all ten rounds <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pull-quote text by visual id (from the CAM source)                  */
/* ------------------------------------------------------------------ */

const PULLQUOTES: Record<string, string> = {
  "cage-window": "That is not a choice. That is a cage with six windows.",
  "cannot-want": "You cannot want a life you have never met.",
  physics: "That's not failure. That's physics.",
  "saw-first": "The career you 'always wanted' is often just the career you saw first.",
  instincts: "You already have instincts. You needed names.",
  "hobby-quote": "None of these are hobbies with a costume. People file taxes doing them.",
  "late-curiosity": "Be early to the curiosity, not late to the job.",
  "overlap-quote": "Where they overlap — that's fit. Not fame.",
  "half-time": "Count the gap. That gap is the point.",
  "wider-map": "I don't need a final career today. I need a wider map.",
  "exposure-quote": "Exposure is all you need.",
};

/* ------------------------------------------------------------------ */
/* Renderer                                                             */
/* ------------------------------------------------------------------ */

export default function CamVisual({ visual }: { visual: Visual }) {
  const { id, kind } = visual;

  const inner = (() => {
    switch (id) {
      case "menu-slips":
        return <MenuSlips />;
      case "cage-window":
        return <PullQuote text={PULLQUOTES[id]} windowGrid />;
      case "gap-diagram":
        return <GapDiagram />;
      case "city-town":
        return <CityTown />;
      case "three-cards":
        return <ReasonCards />;
      case "chain":
        return <StepPath steps={(cam.source.talkScenes.find((s) => s.id === "chain")?.items ?? []) as unknown as { title: string; body?: string }[]} />;
      case "clue-card":
        return <ClueTeaser />;
      case "tour-strip":
        return <CareerCards />;
      case "industry-chips":
        return <IndustryChips industries={["Film", "Aviation", "Letters", "Food", "Wildlife", "Cyber", "Sport", "Cities", "Ocean", "Play", "Scent", "Health", "Climate", "Games", "Words", "Land", "Space", "Access", "Past", "AI", "Voice"]} />;
      case "field-cards":
        return <FieldCards />;
      case "lens-grid":
        return <LensGrid />;
      case "week-path":
        return <WeekPath />;
      case "micro-shift":
        return <StepPath steps={[{ title: "Club" }, { title: "Short course" }, { title: "Person" }, { title: "Volunteer day" }]} door />;
      case "drop-keep":
        return <DropKeep />;
      case "search-mock":
        return <SearchMock />;
      case "chips-cloud":
        return <IndustryChips industries={Object.keys(cam.source.atlasIndex)} limit={54} />;
      case "three-lines":
        return <ThreeLines />;
      case "pieces":
        return <PiecesRow />;
      case "contact-card":
        return <ContactCard />;
      default:
        if (kind === "pullquote" && PULLQUOTES[id]) return <PullQuote text={PULLQUOTES[id]} />;
        return <PullQuote text={visual.alt.replace(/^Pull quote: /, "")} />;
    }
  })();

  return (
    <figure className="my-10" aria-label={visual.alt}>
      {inner}
    </figure>
  );
}
