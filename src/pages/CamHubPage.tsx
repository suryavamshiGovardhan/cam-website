import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Film, Fingerprint, Gamepad2, GraduationCap, Headphones,
  Leaf, Microscope, Rocket, Sparkles, Stethoscope, CalendarDays,
} from "lucide-react";
import CamShell, { coverBgForSlug } from "@/components/cam/CamShell";
import { TopicArt, artForSlug } from "@/components/cam/illustrations";
import ParentTrust from "@/components/ParentTrust";
import ShareButtons from "@/components/ShareButtons";
import { cam } from "@/data/cam";

const articles = [...cam.articles].sort((a, b) => a.order - b.order);

/* ---------- motion presets ---------- */
const EASE = [0.2, 0.8, 0.2, 1] as const;
const wordContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const wordVariant = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: (i % 3) * 0.08, ease: EASE } }),
};

/** Big headline that animates in word by word; one word can be highlighted. */
function WordReveal({
  text, highlightIndex = 0, animateOnMount = false, className = "",
}: { text: string; highlightIndex?: number; animateOnMount?: boolean; className?: string }) {
  const words = text.split(" ");
  const inner = (
    <motion.span
      className={`inline-block ${className}`}
      variants={wordContainer}
      initial="hidden"
      {...(animateOnMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-60px" } })}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={wordVariant} className="inline-block whitespace-nowrap">
          {i === highlightIndex
            ? <span className="rounded-xl px-3" style={{ background: "var(--cam-sun)", color: "var(--cam-ink)" }}>{w}</span>
            : w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
  return inner;
}

const HERO_ICONS = [
  { Icon: Stethoscope, top: "12%", left: "4%", dur: "7s", del: "0s", rot: "-8deg", size: 34, hide: false, color: "var(--cam-mint)" },
  { Icon: Microscope, top: "58%", left: "8%", dur: "8s", del: ".6s", rot: "6deg", size: 30, hide: true, color: "var(--cam-sun)" },
  { Icon: Gamepad2, top: "16%", right: "5%", dur: "6.5s", del: ".3s", rot: "8deg", size: 34, hide: false, color: "var(--cam-sun)" },
  { Icon: Film, top: "62%", right: "9%", dur: "7.5s", del: "1s", rot: "-6deg", size: 28, hide: true, color: "#FFFFFF" },
  { Icon: Rocket, top: "34%", left: "13%", dur: "8.5s", del: ".9s", rot: "-10deg", size: 26, hide: true, color: "var(--cam-coral-soft)" },
  { Icon: Headphones, top: "40%", right: "14%", dur: "7s", del: ".5s", rot: "6deg", size: 26, hide: true, color: "var(--cam-mint)" },
  { Icon: Fingerprint, top: "80%", left: "22%", dur: "9s", del: "1.4s", rot: "4deg", size: 26, hide: false, color: "var(--cam-coral-soft)" },
  { Icon: Leaf, top: "78%", right: "24%", dur: "8s", del: ".2s", rot: "-5deg", size: 26, hide: false, color: "var(--cam-mint)" },
];

/* ---------- RETHINK 1: the ten-second challenge ---------- */
const SKIPPED_JOBS: { name: string; blurb: string; to: string }[] = [
  ...cam.source.guessGame.map((g) => ({ name: g.answer, blurb: g.why, to: "/articles/guess-the-job" })),
  ...cam.source.showcase
    .filter((c) => c.title === "Perfumer" || c.title === "Tea Blender")
    .map((c) => ({ name: c.title, blurb: c.blurb, to: "/articles/strange-real-paid-work" })),
];

function TenSecondChallenge() {
  const [phase, setPhase] = useState<"idle" | "run" | "done">("idle");
  const [left, setLeft] = useState(10);

  useEffect(() => {
    if (phase !== "run") return;
    const start = Date.now();
    const id = window.setInterval(() => {
      const remaining = Math.max(0, 10 - (Date.now() - start) / 1000);
      setLeft(remaining);
      if (remaining <= 0) { window.clearInterval(id); setPhase("done"); }
    }, 60);
    return () => window.clearInterval(id);
  }, [phase]);

  const C = 2 * Math.PI * 30;
  const ringOffset = C * (1 - left / 10);

  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{ background: "var(--cam-card)", border: "2px solid var(--cam-ink)", boxShadow: "6px 6px 0 var(--cam-ink)" }}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative mx-auto shrink-0" aria-hidden="true">
          <svg viewBox="0 0 80 80" className="h-20 w-20">
            <circle cx="40" cy="40" r="30" fill="none" stroke="var(--cam-line-soft)" strokeWidth="8" />
            {phase === "run" && (
              <circle
                cx="40" cy="40" r="30" fill="none" stroke="var(--cam-coral)" strokeWidth="8"
                strokeLinecap="round" strokeDasharray={C} strokeDashoffset={ringOffset}
                transform="rotate(-90 40 40)"
              />
            )}
            {phase === "done" && <circle cx="40" cy="40" r="30" fill="var(--cam-sun)" stroke="var(--cam-ink)" strokeWidth="4" />}
          </svg>
          <span className="cam-serif absolute inset-0 flex items-center justify-center text-2xl">
            {phase === "done" ? "✓" : Math.ceil(left)}
          </span>
        </div>
        <div className="flex-1">
          <p className="cam-kicker">Rethink · 60-second dump, ten-second version</p>
          <h3 className="cam-serif mt-2 text-2xl leading-tight sm:text-3xl">Name 5 careers in 10 seconds.</h3>
          <p className="cam-muted mt-2 text-sm leading-relaxed">
            No phone. Be honest — write only what you actually know.
          </p>
          {phase !== "done" && (
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="cam-btn"
                onClick={() => { setLeft(10); setPhase("run"); }}
              >
                {phase === "run" ? "Go!" : <><Sparkles className="h-4 w-4" aria-hidden="true" /> Start</>}
              </button>
              {phase === "run" && (
                <button type="button" className="cam-btn cam-btn-ghost" onClick={() => setPhase("done")}>
                  Skip ahead
                </button>
              )}
            </div>
          )}
        </div>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <input
              key={i}
              disabled={phase !== "run"}
              aria-label={`Career ${i + 1}`}
              inputMode="text"
              className="cam-mono w-full rounded-xl px-2 text-center outline-none"
              style={{
                minWidth: 44, minHeight: 44,
                border: "2px solid var(--cam-ink)", background: phase === "run" ? "#FFFFFF" : "var(--cam-bg)",
                color: "var(--cam-ink)",
              }}
            />
          ))}
        </div>
      </div>

      {phase === "done" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 border-t-2 pt-6" style={{ borderColor: "var(--cam-line-soft)" }}>
          <p className="cam-muted text-base leading-relaxed">
            Most people name <strong className="text-[color:var(--cam-ink)]">doctor, engineer, teacher, lawyer, CA</strong>. Here are 12 you skipped:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SKIPPED_JOBS.map((job, i) => (
              <motion.div key={job.name} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}>
                <Link to={job.to} className="cam-tile cam-elev block h-full p-4">
                  <p className="cam-serif text-lg leading-tight">{job.name}</p>
                  <p className="cam-muted mt-1.5 text-xs leading-relaxed">{job.blurb}</p>
                  <span className="cam-kicker mt-2 inline-flex items-center gap-1.5" style={{ color: "var(--cam-coral)" }}>
                    Read <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <button type="button" className="cam-btn cam-btn-ghost mt-6" onClick={() => { setPhase("idle"); setLeft(10); }}>
            Try again
          </button>
        </motion.div>
      )}
    </div>
  );
}

/* ---------- RETHINK 2: told vs exists ---------- */
const TOLD = ["Doctor", "Engineer", "Teacher", "Lawyer", "CA"];
const EXISTS_CHIPS = [
  "Foley Artist", "Drone Cinematographer", "Type Designer", "Tea Blender", "Camera-trap Technician",
  "Ethical Hacker", "Sports Data Analyst", "Wayfinding Designer", "Coral Restoration Diver", "Playground Designer",
  "Perfumer", "Medical Illustrator", "Carbon Accountant", "Esports Coach", "Plain-language Editor",
  "Urban Farmer", "Satellite Imagery Analyst", "Audio Describer", "Heritage Conservator", "Conversation Designer",
  "Pitch Curator", "Puzzle Constructor", "Heat-action Planner", "Voice Actor", "Genetic Counsellor",
  "Board Game Designer", "Colour Scientist", "Coffee Cartographer", "Acoustic Consultant", "Botanic Garden Curator",
  "Biobank Curator", "Clock Restorer", "Blue-carbon Scientist", "Canopy Researcher", "Audio Forensics Analyst",
  "Concept Artist", "Cleanup Artist", "AI Policy Analyst", "AI Product Designer", "Accessibility Auditor",
  "Adaptive Sports Coach", "Algorithmic Auditor", "Bioacoustics Analyst", "Bioinformatics Analyst",
  "CRISPR Research Technician", "Bicycle Network Planner", "Circadian Lighting Designer", "Community Librarian",
];

function ToldVsExists() {
  return (
    <div>
      <h3 className="cam-serif text-3xl leading-tight sm:text-4xl">You were shown 5 doors. There are hundreds.</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl p-6" style={{ background: "#ECE7DB", border: "2px solid var(--cam-ink)", boxShadow: "4px 4px 0 var(--cam-ink)" }}>
          <p className="cam-kicker" style={{ color: "var(--cam-dim)" }}>What we're told</p>
          <ul className="mt-4 space-y-3">
            {TOLD.map((t) => (
              <li key={t} className="cam-serif text-xl" style={{ color: "var(--cam-dim)" }}>{t}</li>
            ))}
          </ul>
          <p className="cam-dim mt-4 text-xs">Five answers, heard at every wedding since forever.</p>
        </div>
        <div className="rounded-2xl p-6" style={{ background: "var(--cam-mint)", border: "2px solid var(--cam-ink)", boxShadow: "4px 4px 0 var(--cam-ink)" }}>
          <p className="cam-kicker">What exists</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {EXISTS_CHIPS.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: i * 0.03, ease: EASE }}
                className="cam-chip"
                style={{ minHeight: 0, padding: "5px 12px", fontSize: 12 }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- hub page ---------- */
export default function CamHubPage() {
  const [params, setParams] = useSearchParams();
  const active = params.get("category") ?? "All";
  const list = active === "All" ? articles : articles.filter((a) => a.category === active);
  const [featured, ...rest] = list;

  const jobCount = useMemo(
    () => Object.values(cam.source.atlasIndex).flat().length,
    []
  );

  return (
    <CamShell
      title="CAM | Exposure Is All You Need"
      description="CAM is VOYCE's career-exposure movement for Classes 8–12: the talk, an atlas of 2,000+ real jobs, a guessing game, six lenses for choosing and thirty days of looking."
      canonical="/"
    >
      {/* ——— HERO ——— */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-5 sm:pt-12">
        <div className="cam-hero px-6 py-12 sm:px-12 sm:py-16">
          {HERO_ICONS.map(({ Icon, top, left, right, dur, del, rot, size, hide, color }, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`cam-float absolute ${hide ? "hidden sm:block" : ""}`}
              style={{ top, left, right, ["--dur" as string]: dur, ["--del" as string]: del, ["--rot" as string]: rot, color }}
            >
              <Icon size={size} strokeWidth={2.2} />
            </span>
          ))}
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="cam-kicker" style={{ color: "var(--cam-mint)" }}>{cam.meta.fullName}</p>
            <h1 className="mt-4 text-[clamp(38px,8vw,84px)]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.02, color: "#FFF6E9" }}>
              <WordReveal text="EXPOSURE IS ALL YOU NEED" highlightIndex={0} animateOnMount />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
              className="mt-5 text-lg font-semibold sm:text-2xl"
              style={{ color: "var(--cam-sun)", fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              2,000+ real jobs. Which one have you never heard of?
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.45, ease: EASE }}
              className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-relaxed sm:text-base"
              style={{ color: "var(--cam-mint)" }}
            >
              Free career-exposure for Classes 8–12. No login. Pick a way in — start with the game if you want something fun first.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
              className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <Link to="/play" className="cam-btn cam-btn-sun w-full sm:w-auto">
                Play Guess the Job <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/articles/the-question-you-were-asked-at-ten" className="cam-btn cam-btn-ghost w-full sm:w-auto" style={{ background: "#FFFFFF" }}>
                Or start reading
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.4 }}
              className="mt-4 text-xs font-semibold"
              style={{ color: "var(--cam-mint)" }}
            >
              Follow along on Instagram{" "}
              <a href={cam.meta.instagram.url} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#FFFFFF" }}>
                {cam.meta.instagram.handle}
              </a>
            </motion.p>
          </div>
        </div>
      </section>

      {/* ——— WAYS IN ——— */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-5" aria-labelledby="ways-in-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="cam-kicker">Ways in</p>
            <h2 id="ways-in-title" className="cam-serif mt-2 text-2xl sm:text-3xl">Four doors. Same map.</h2>
          </div>
          <Link to="/about#for-parents" className="cam-chip">Parents: what is CAM?</Link>
        </div>
        <div className="cam-ways mt-5">
          <Link to="/play" className="cam-way">
            <span className="cam-pill cam-pill-sun" style={{ width: "fit-content" }}>Play</span>
            <span className="cam-way-title">Guess the job</span>
            <span className="cam-way-hint">Ten clues from real Tuesdays. Fast and fun.</span>
          </Link>
          <Link to="/atlas" className="cam-way">
            <span className="cam-pill" style={{ width: "fit-content" }}>Jobs</span>
            <span className="cam-way-title">Search the atlas</span>
            <span className="cam-way-hint">{jobCount.toLocaleString("en-IN")}+ careers school rarely names.</span>
          </Link>
          <Link to="/talk" className="cam-way">
            <span className="cam-pill cam-pill-mint" style={{ width: "fit-content" }}>Talk</span>
            <span className="cam-way-title">Walk the keynote</span>
            <span className="cam-way-hint">The talk, as slides you can click through.</span>
          </Link>
          <Link to="/challenge" className="cam-way">
            <span className="cam-pill" style={{ width: "fit-content", background: "var(--cam-teal)" }}>30 days</span>
            <span className="cam-way-title">Look a little each day</span>
            <span className="cam-way-hint">Tiny tasks. Tick them off on this device.</span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-5" aria-label="Share CAM">
        <div className="cam-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="cam-kicker">Pass it on</p>
            <p className="cam-serif mt-2 text-2xl leading-tight">Share CAM with a friend or parent.</p>
            <p className="cam-muted mt-1 text-sm">A free career-exposure map for Classes 8–12 — no login.</p>
          </div>
          <ShareButtons
            path="/"
            text="Check out CAM — free career-exposure for Classes 8–12 (talk, job atlas, game, 30 days). An initiative of VOYCE:"
            whatsappLabel="Share on WhatsApp"
            story={{
              kicker: "Career Advisory Movement",
              headline: "Exposure is all you need",
              subline: "2,000+ real jobs. Free for Classes 8–12.",
            }}
          />
        </div>
      </section>

      {/* ——— RETHINK ——— */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:pt-20">
        <p className="cam-kicker">Rethink</p>

        <div className="mt-5"><TenSecondChallenge /></div>

        <div className="mt-16"><ToldVsExists /></div>

        <div className="mt-16"><ParentTrust /></div>

        {/* principals band */}
        <div className="cam-band mt-16 px-6 py-10 sm:px-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <p className="cam-kicker" style={{ color: "var(--cam-mint)" }}>For principals</p>
              <h3 className="cam-serif mt-3 text-3xl leading-tight sm:text-4xl" style={{ color: "#FFFFFF" }}>
                Your students can't choose a career they've never heard of.
              </h3>
            </div>
            <div>
              <ul className="space-y-3 text-[15px] font-semibold" style={{ color: "var(--cam-mint)" }}>
                <li className="flex items-center gap-3"><CalendarDays className="h-5 w-5 shrink-0" aria-hidden="true" /> One 30-day exposure series</li>
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 shrink-0" aria-hidden="true" /> Free to start</li>
                <li className="flex items-center gap-3"><GraduationCap className="h-5 w-5 shrink-0" aria-hidden="true" /> Built for Classes 8–12</li>
              </ul>
              <a
                href={`mailto:${cam.meta.email}?subject=${encodeURIComponent("Bring CAM to our school")}`}
                className="cam-btn cam-btn-sun mt-6 inline-flex"
              >
                Bring CAM to your school <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* end line */}
        <div className="mt-20 text-center">
          <p className="cam-serif text-[clamp(34px,7vw,72px)]">
            <WordReveal text="EXPOSURE IS ALL YOU NEED." highlightIndex={0} />
          </p>
        </div>
      </section>

      {/* ——— ARTICLES ——— */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="flex items-end justify-between gap-4">
          <p className="cam-kicker">The reading series</p>
          <p className="cam-mono cam-dim">{articles.length} articles</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...cam.categories].map((c) => (
            <button
              key={c}
              type="button"
              className="cam-chip"
              aria-pressed={active === c}
              onClick={() => (c === "All" ? setParams({}) : setParams({ category: c }))}
            >
              {c}
            </button>
          ))}
        </div>

        {featured && (
          <motion.div custom={0} variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} className="mt-8">
            <Link to={`/articles/${featured.slug}`} className="cam-card cam-elev grid overflow-hidden md:grid-cols-2">
              <div className="cam-art-block" data-bg={coverBgForSlug(featured.slug)} style={{ aspectRatio: "16 / 10", borderBottom: "2px solid var(--cam-ink)" }}>
                <TopicArt name={artForSlug(featured.slug)} label={featured.cover.alt} />
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="cam-pill">Start here</span>
                  <span className="cam-mono cam-dim">{String(featured.order).padStart(2, "0")} · {featured.category} · {featured.readingMinutes} min</span>
                </div>
                <h2 className="cam-serif mt-4 text-3xl leading-tight sm:text-4xl">{featured.title}</h2>
                <p className="cam-muted mt-3 text-base leading-relaxed">{featured.dek}</p>
                <span className="cam-kicker mt-auto inline-flex items-center gap-2 pt-6" style={{ color: "var(--cam-coral)" }}>
                  Read the first piece <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <motion.div key={a.slug} custom={i} variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} className="h-full">
              <Link to={`/articles/${a.slug}`} className="cam-card cam-elev group flex h-full flex-col overflow-hidden">
                <div className="cam-art-block" data-bg={coverBgForSlug(a.slug)} style={{ aspectRatio: "16 / 10", borderBottom: "2px solid var(--cam-ink)" }}>
                  <TopicArt name={artForSlug(a.slug)} label={a.cover.alt} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="cam-pill">{a.category}</span>
                    <span className="cam-mono cam-dim">{String(a.order).padStart(2, "0")} · {a.readingMinutes} min</span>
                  </div>
                  <h2 className="cam-serif mt-3 text-2xl leading-tight">{a.title}</h2>
                  <p className="cam-muted mt-2 flex-1 text-sm leading-relaxed">{a.dek}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ——— mid-page teal band ——— */}
      <section
        className="border-y-2 px-5 py-12 text-center"
        style={{ borderColor: "var(--cam-ink)", background: "var(--cam-teal)", color: "#FFFFFF" }}
      >
        <p className="cam-serif text-[clamp(26px,5vw,48px)]" style={{ color: "#FFFFFF" }}>
          EXPOSURE IS ALL YOU NEED.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/play" className="cam-btn cam-btn-sun">
            Play Guess the Job <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={cam.meta.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cam-btn cam-btn-ghost"
            style={{ background: "#FFFFFF" }}
          >
            Follow {cam.meta.instagram.handle}
          </a>
        </div>
      </section>
    </CamShell>
  );
}
