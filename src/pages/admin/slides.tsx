import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type Slide = {
  id: string;
  title: string; // for counter aria
  body: ReactNode;
};

const foot = (text: string) => (
  <p className="mt-auto pt-6 text-[11px] font-semibold leading-relaxed opacity-80" style={{ color: "#3F6B68" }}>
    {text}
  </p>
);

export const SLIDES: Slide[] = [
  {
    id: "hook",
    title: "Hook — name 20 careers",
    body: (
      <>
        <p className="cam-kicker">Open with a challenge</p>
        <h1 className="cam-serif mt-4 text-[clamp(36px,7vw,72px)] leading-[1.02]">
          Name <span className="rounded-xl px-2" style={{ background: "var(--cam-sun)" }}>20 careers</span> in sixty seconds.
        </h1>
        <p className="cam-muted mt-6 max-w-2xl text-lg font-semibold leading-relaxed">
          Most rooms stall after five or six familiar names — doctor, engineer, teacher, lawyer, CA, maybe IAS.
          That stall is the Knowing Gap. CAM exists to widen the map before subject choices lock in.
        </p>
        <p className="mt-8 text-sm font-bold" style={{ color: "var(--cam-teal-dark)" }}>
          Demo tip: run this live. Don’t solve it for them.
        </p>
      </>
    ),
  },
  {
    id: "knowing-gap",
    title: "The Knowing Gap",
    body: (
      <>
        <p className="cam-kicker">The problem</p>
        <h1 className="cam-serif mt-4 text-[clamp(32px,6vw,56px)] leading-[1.05]">
          Students can’t choose a career they’ve never heard of.
        </h1>
        <ul className="mt-8 space-y-4 text-base font-semibold leading-relaxed sm:text-lg" style={{ color: "var(--cam-muted)" }}>
          <li>
            ASER 2023 (rural youth 14–18): about <strong style={{ color: "var(--cam-ink)" }}>1 in 5</strong> could not name any job they aspire to; aspirations cluster on a few familiar roles (army, police, teacher, doctor).
          </li>
          <li>
            Many schools still deliver career guidance as occasional talks — not sustained exposure.
          </li>
          <li>
            CAM’s promise: <strong style={{ color: "var(--cam-ink)" }}>not a career — a wider map</strong> for Classes 8–12.
          </li>
        </ul>
        {foot("Sources: ASER 2023 Beyond Basics (asercentre.org); JIVA note on EVGC often = talks/events (jivacareer.org, 2024).")}
      </>
    ),
  },
  {
    id: "why-now",
    title: "Why now — NEP & policy",
    body: (
      <>
        <p className="cam-kicker">Why principals care now</p>
        <h1 className="cam-serif mt-4 text-[clamp(32px,5.5vw,52px)] leading-[1.05]">
          Policy is pushing exposure and counselling into the timetable.
        </h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="cam-tile p-5">
            <p className="cam-kicker">NEP 2020</p>
            <p className="cam-muted mt-2 text-sm leading-relaxed">
              Alumni/community <strong>career guidance & mentoring</strong> (§3.7); Grades 6–8 vocational survey + bagless internship (§4.26); tools to help <strong>optimal career choices</strong> (§4.35). HE chapter: professional academic & career counselling (§12.4).
            </p>
          </div>
          <div className="cam-tile p-5">
            <p className="cam-kicker">SARTHAQ tasks</p>
            <p className="cam-muted mt-2 text-sm leading-relaxed">
              Counsellor coverage targets (50% by 2025 / 100% by 2030); career counselling for <strong>Classes IX–XII</strong> (Task 238); Skill-Based Aptitude Tests after VIII & X (Task 239).
            </p>
          </div>
          <div className="cam-tile p-5">
            <p className="cam-kicker">CBSE affiliation</p>
            <p className="cam-muted mt-2 text-sm leading-relaxed">
              Bye-Law <strong>2.4.12</strong>: every secondary/senior secondary school must appoint a Counselor & Wellness Teacher (part-time allowed if &lt;300 students in IX–XII).
            </p>
          </div>
          <div className="cam-tile p-5">
            <p className="cam-kicker">National materials</p>
            <p className="cam-muted mt-2 text-sm leading-relaxed">
              MoE / NCERT–PSSCIVE / UNICEF <strong>Career Cards</strong> (500+ pathways) for schools to circulate; CBSE career guidance portal for IX–XII.
            </p>
          </div>
        </div>
        {foot("Sources: NEP 2020 PDF (education.gov.in); CBSE ECWS 26.06.2024; CBSE circular 25.09.2024; JIVA CG note summarising SARTHAQ; CBSE Career Guidance portal press note.")}
      </>
    ),
  },
  {
    id: "what-cam-is",
    title: "What CAM is",
    body: (
      <>
        <p className="cam-kicker">Career Advisory Movement</p>
        <h1 className="cam-serif mt-4 text-[clamp(32px,5.5vw,52px)] leading-[1.05]">
          An initiative of VOYCE — exposure for Classes 8–12.
        </h1>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            ["The Talk", "Exposure Is All You Need — keynote as slides & articles."],
            ["The Atlas", "2,000+ real jobs across dozens of industries — searchable."],
            ["The Game", "Guess the Job — ten clues from real Tuesdays."],
            ["30 days", "One small looking task a day. No login required."],
          ].map(([t, d]) => (
            <div key={t} className="cam-tile p-5">
              <p className="cam-serif text-xl">{t}</p>
              <p className="cam-muted mt-2 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <p className="cam-muted mt-6 max-w-2xl text-sm font-semibold leading-relaxed">
          Complementary to Career Cards / CBSE portals — CAM is a <em>live</em> exposure session students feel, not another PDF dump.
        </p>
      </>
    ),
  },
  {
    id: "demo",
    title: "Live demo",
    body: (
      <>
        <p className="cam-kicker">Show, don’t tell</p>
        <h1 className="cam-serif mt-4 text-[clamp(32px,6vw,56px)] leading-[1.05]">
          Open Guess the Job in the room.
        </h1>
        <p className="cam-muted mt-5 max-w-xl text-lg font-semibold leading-relaxed">
          Two minutes: one clue, four options, reveal why the job exists. Principals see engagement before the ask.
        </p>
        <Link
          to="/play"
          target="_blank"
          rel="noopener noreferrer"
          className="cam-btn cam-btn-sun mt-8 inline-flex"
        >
          Open /play (new tab)
        </Link>
        <p className="cam-dim mt-4 text-sm font-semibold">
          Live site: https://suryavamshigovardhan.github.io/cam-website/play
        </p>
      </>
    ),
  },
  {
    id: "traction",
    title: "Honest traction",
    body: (
      <>
        <p className="cam-kicker">Where we are — no theatre</p>
        <h1 className="cam-serif mt-4 text-[clamp(32px,5.5vw,48px)] leading-[1.05]">
          Early stage. Real posts. No school sessions yet.
        </h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="cam-tile p-5">
            <p className="cam-mono text-xs uppercase tracking-widest" style={{ color: "var(--cam-kraft)" }}>
              Instagram @cam.voyce
            </p>
            <p className="cam-serif mt-2 text-4xl">~66</p>
            <p className="cam-muted mt-1 text-sm">daily posts so far</p>
          </div>
          <div className="cam-tile p-5">
            <p className="cam-mono text-xs uppercase tracking-widest" style={{ color: "var(--cam-kraft)" }}>
              Week 26 Oct – 2 Nov
            </p>
            <p className="cam-serif mt-2 text-4xl">1,436</p>
            <p className="cam-muted mt-1 text-sm">views · 62% from non-followers · 481 interactions</p>
          </div>
          <div className="cam-tile p-5 sm:col-span-2">
            <p className="cam-mono text-xs uppercase tracking-widest" style={{ color: "var(--cam-kraft)" }}>
              “Knowing Gap” post
            </p>
            <p className="cam-serif mt-2 text-4xl">~203</p>
            <p className="cam-muted mt-1 text-sm">interactions — the message that resonates</p>
          </div>
        </div>
        <p className="cam-dim mt-6 text-sm font-semibold">Owner-reported Instagram metrics · not third-party audited.</p>
      </>
    ),
  },
  {
    id: "pilot",
    title: "The pilot offer",
    body: (
      <>
        <p className="cam-kicker">What we’re asking for</p>
        <h1 className="cam-serif mt-4 text-[clamp(32px,5.5vw,48px)] leading-[1.05]">
          One class. One afternoon. A measurable exposure report.
        </h1>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border-2 p-5" style={{ borderColor: "var(--cam-ink)", background: "var(--cam-mint)" }}>
            <p className="cam-kicker">CAM brings</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold leading-relaxed" style={{ color: "var(--cam-ink)" }}>
              <li>Free or reduced-fee pilot</li>
              <li>~30 students, Classes 8–12</li>
              <li>One 2–3 hour session on a date the school chooses</li>
              <li>Talk + interactive exposure (game / atlas)</li>
              <li>Deliverable: before/after awareness quiz + anonymous feedback report</li>
            </ul>
          </div>
          <div className="cam-tile p-5">
            <p className="cam-kicker">School brings</p>
            <ul className="cam-muted mt-3 space-y-2 text-sm font-semibold leading-relaxed">
              <li>A room</li>
              <li>One teacher in charge</li>
              <li>Help with parent/student consent</li>
            </ul>
            <p className="cam-dim mt-4 text-xs font-semibold">
              Pattern matches how schools usually pilot outside programmes: small cohort first, then decide. (See ed-tech pilot practice, e.g. Mindspark HBS case.)
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "objections",
    title: "Objections & answers",
    body: (
      <>
        <p className="cam-kicker">Anticipate the room</p>
        <h1 className="cam-serif mt-3 text-[clamp(28px,5vw,44px)] leading-[1.05]">Cost · time · workload · safety · proof</h1>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            ["Cost?", "Pilot is free or reduced-fee. One class only — no whole-school invoice."],
            ["Time?", "Single 2–3 h block on your date. Not a weekly add-on."],
            ["Teacher load?", "You provide a room + one teacher-in-charge. We run the session."],
            ["Safety / consent?", "School helps with consent. Feedback is anonymous. Pilot data deleted after the report."],
            ["Does it work?", "We measure exposure change (before/after awareness quiz), not “career decided”."],
            ["Replace counsellor?", "No. CBSE still needs Counselor & Wellness Teacher (2.4.12). CAM is exposure support."],
          ].map(([q, a]) => (
            <div key={q} className="cam-tile p-4">
              <p className="cam-serif text-lg">{q}</p>
              <p className="cam-muted mt-1 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
        {foot("Context: counselling often under-resourced / token (JIVA / Bhogle; HT Ludhiana 2024). CBSE 2.4.12 — ECWS 26.06.2024.")}
      </>
    ),
  },
  {
    id: "next",
    title: "Next steps & the ask",
    body: (
      <>
        <p className="cam-kicker">Close</p>
        <h1 className="cam-serif mt-4 text-[clamp(32px,6vw,52px)] leading-[1.05]">
          Pick a class. Pick a date. We’ll bring the map.
        </h1>
        <ol className="mt-8 list-decimal space-y-3 pl-5 text-base font-semibold leading-relaxed sm:text-lg" style={{ color: "var(--cam-muted)" }}>
          <li>Agree pilot class (≈30 students, Classes 8–12) and a 2–3 hour slot.</li>
          <li>Name the teacher-in-charge; share consent wording.</li>
          <li>We run the session; you receive the awareness quiz + anonymous feedback report.</li>
          <li>Decide together whether to expand — no pressure baked into the pilot.</li>
        </ol>
        <p className="cam-serif mt-10 text-2xl" style={{ color: "var(--cam-coral)" }}>
          The ask: one room, one afternoon, one honest report.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <p className="cam-kicker">CAM · an initiative of VOYCE</p>
        <h1 className="cam-serif mt-4 text-[clamp(36px,7vw,64px)] leading-[1.02]">Let’s widen one classroom.</h1>
        <div className="mt-10 space-y-4 text-lg font-extrabold">
          <p>
            Email:{" "}
            <a href="mailto:voycexx@gmail.com" className="underline" style={{ color: "var(--cam-coral)" }}>
              voycexx@gmail.com
            </a>
          </p>
          <p>
            Instagram:{" "}
            <a href="https://instagram.com/cam.voyce" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--cam-coral)" }}>
              @cam.voyce
            </a>
          </p>
          <p className="text-base font-semibold" style={{ color: "var(--cam-muted)" }}>
            Site: https://suryavamshigovardhan.github.io/cam-website/
          </p>
        </div>
      </>
    ),
  },
];
