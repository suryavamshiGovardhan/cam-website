import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Download, Keyboard, Maximize2 } from "lucide-react";
import CamShell from "@/components/cam/CamShell";

const katas = [
  { title: "Scale with zero funding", thesis: "Distribution before expansion", idea: "Build trusted access before adding expensive infrastructure. Run small experiments, keep costs low, and let real demand decide what grows.", move: "Start with one school pilot. Earn trust through a visible student outcome, then use that proof to open the next school." },
  { title: "Why teams break after 50 people", thesis: "Coordination is the hidden cost", idea: "As teams grow, unclear ownership and poor communication slow everything down. Written standards and clear decision rights protect quality.", move: "Keep the founding team lean. Give each school one point of contact, one delivery owner and one shared implementation document." },
  { title: "How I use AI", thesis: "AI is leverage, not judgement", idea: "AI can accelerate research, planning and drafting. Better results come from clear context, precise instructions and human verification.", move: "Use AI to prepare lesson variants, translate parent communication and audit plans. A human educator checks every student-facing output." },
  { title: "Why people don't attempt", thesis: "Action creates information", idea: "People often wait for confidence before trying. Small, visible attempts produce feedback, capability and better next decisions.", move: "Ask students to build a first prototype quickly. Celebrate thoughtful attempts and document what each test teaches." },
  { title: "Secret Kata: social pressure & wellbeing", thesis: "Psychological safety enables learning", idea: "People learn and take healthy risks when mistakes are treated as information rather than humiliation. Critique the work, protect the person.", move: "Never shame a student for a wrong answer or failed project. Make assessment criteria clear and feedback constructive." },
  { title: "Why startups are unprofitable", thesis: "Measure what actually creates value", idea: "Weak attribution can make teams optimise vanity metrics. Sustainable growth depends on understanding trust, referrals, retention and real outcomes.", move: "Track attendance, skill gains, completed projects, student confidence and school renewals—not just enquiries or social reach." },
  { title: "Career advice for the lost", thesis: "Clarity follows exploration", idea: "Too many options can create paralysis. Structured experiments and reflection help people discover what deserves deeper commitment.", move: "CAM should help students explore pathways, reflect on what interests them and choose a next experiment—not force an early career label." },
  { title: "How to get hired faster", thesis: "Proof beats unsupported claims", idea: "A portfolio makes capability visible. Specific evidence, attitude and a distinctive contribution are stronger than generic claims.", move: "Help students create project portfolios, reflection notes and demonstrations they can show to teachers, parents and future mentors." },
  { title: "How to take risk", thesis: "Small bets, protected downside", idea: "Good risk-taking is not reckless. Run affordable experiments, preserve essential resources and learn before making irreversible commitments.", move: "Pilot one grade or one cohort first. Set a budget, safeguarding plan and success criteria before expanding." },
  { title: "How distribution multiplies luck", thesis: "Trust travels through people", idea: "Useful ideas spread when people can discover, understand and recommend them. Distribution is a repeatable system, not merely posting content.", move: "Build school relationships, teacher champions, parent showcases and student demonstrations that make the programme easy to understand and recommend." },
  { title: "How simplifying makes you rich", thesis: "Remove friction before adding features", idea: "Complexity increases cost and makes delivery harder to repeat. Start manually, learn the workflow, then standardise what works.", move: "Use one school onboarding pack, one timetable template, one assessment format and a clear escalation contact." },
  { title: "Manage projects end to end", thesis: "Move from rough clarity to tested delivery", idea: "Uncertain projects become manageable through small milestones, early feedback and progressive refinement.", move: "Plan in stages: pilot design, first delivery, feedback, revised curriculum and expansion decision. Don't wait for a perfect programme." },
  { title: "How to think like rich people", thesis: "Use second-order thinking", idea: "Look beyond the immediate result. Consider incentives, opportunity cost, probabilities, resilience and what happens next.", move: "Ask what happens after a student finishes a session. Design follow-through, access to mentors and practical next steps." },
  { title: "The most valuable skill after AI", thesis: "Build a world people believe in", idea: "When tools become widely available, identity, culture, trust and a consistent experience become harder to copy.", move: "Create a recognisable CAM experience: shared language, student rituals, showcases and a clear promise—exposure that leads to informed choices." },
  { title: "Why belief matters more than power and money", thesis: "Belief aligns effort", idea: "A credible shared purpose helps a small team persist and coordinate. Belief must be supported by action, evidence and honest communication.", move: "Make CAM's promise concrete: every student deserves exposure to more possibilities. Prove it through real sessions, student work and transparent outcomes." },
];

export default function CamKatasPage() {
  const [index, setIndex] = useState(-1);
  const [overview, setOverview] = useState(true);
  const active = index >= 0 ? katas[index] : null;
  const move = useCallback((step: number) => setIndex((n) => Math.max(-1, Math.min(katas.length - 1, n + step))), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); setIndex(n => Math.min(katas.length - 1, n + 1)); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); setIndex(n => Math.max(-1, n - 1)); }
      if (e.key === "Escape") setIndex(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const printDeck = () => window.print();

  return (
    <CamShell title="15 Katas — Founder Field Notes | CAM" description="Fifteen founder and operating ideas translated into practical lessons for the Career Advisory Movement." canonical="/katas">
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="cam-kicker">CAM / FOUNDER FIELD NOTES</p>
          <span className="cam-mono text-xs cam-dim">15 KATAS · 15 CAM APPLICATIONS</span>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <h1 className="cam-serif text-[clamp(42px,7vw,76px)] leading-[.98]">Think better.<br/><em>Build deliberately.</em></h1>
            <p className="cam-muted mt-6 max-w-2xl text-lg leading-relaxed">A founder's field guide: fifteen ideas about building, learning, taking risks and creating trust—translated into practical moves for CAM.</p>
          </div>
          <div className="cam-card p-6">
            <p className="cam-kicker">THE CAM LENS</p>
            <p className="cam-serif mt-3 text-2xl leading-snug">Exposure is not the finish line. It is the beginning of an informed next step.</p>
            <p className="cam-muted mt-3 text-sm">An original interpretation based on the KATA summaries shared with us—not an official Varun Mayya presentation.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => { setIndex(0); setOverview(false); }} className="cam-btn cam-lift"><Maximize2 className="h-4 w-4"/> Start presentation</button>
          <button onClick={printDeck} className="cam-btn-ghost cam-btn"><Download className="h-4 w-4"/> Print / save slides</button>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {katas.map((k, i) => (
            <button key={k.title} onClick={() => { setIndex(i); setOverview(false); }} className="cam-card cam-lift group p-5 text-left">
              <div className="flex items-center justify-between"><span className="cam-kicker">KATA {String(i+1).padStart(2,"0")}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></div>
              <h2 className="cam-serif mt-5 text-2xl leading-tight">{k.title}</h2>
              <p className="mt-3 text-sm font-extrabold" style={{color:"var(--cam-coral)"}}>{k.thesis}</p>
              <p className="cam-muted mt-3 text-sm leading-relaxed">{k.move}</p>
            </button>
          ))}
        </div>
      </section>
      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" style={{background:"#0F3D3E"}} role="dialog" aria-modal="true" aria-label={`Kata ${index+1} presentation slide`}>
          <div className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl" style={{background:"#FFF6E9",minHeight:"min(78vh,720px)"}}>
            <div className="flex items-center justify-between border-b px-5 py-4 sm:px-8" style={{borderColor:"#E7DECF"}}>
              <span className="cam-kicker">KATA {String(index+1).padStart(2,"0")} / 15</span>
              <button onClick={() => setIndex(-1)} className="cam-btn-ghost cam-btn">Close ×</button>
            </div>
            <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-14">
              <p className="cam-kicker">THE FOUNDER IDEA</p>
              <h2 className="cam-serif mt-5 max-w-4xl text-[clamp(34px,5.4vw,64px)] leading-[1.03]">{active.title}</h2>
              <p className="mt-6 text-xl font-extrabold sm:text-2xl" style={{color:"#FF6B5B"}}>{active.thesis}</p>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <div className="rounded-xl border p-5 sm:p-7" style={{borderColor:"#E7DECF",background:"#FFFFFF"}}>
                  <p className="cam-kicker">THE IDEA</p><p className="mt-4 text-base leading-relaxed sm:text-lg">{active.idea}</p>
                </div>
                <div className="rounded-xl p-5 sm:p-7" style={{background:"#BFE8DC"}}>
                  <p className="cam-kicker">THE CAM MOVE</p><p className="mt-4 text-base leading-relaxed sm:text-lg">{active.move}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t px-5 py-4 sm:px-8" style={{borderColor:"#E7DECF"}}>
              <button onClick={() => move(-1)} disabled={index===0} className="cam-btn-ghost cam-btn disabled:opacity-40"><ArrowLeft className="h-4 w-4"/> Previous</button>
              <span className="cam-mono hidden text-xs cam-dim sm:block"><Keyboard className="mr-1 inline h-3.5 w-3.5"/> ← → to navigate · ESC to close</span>
              {index < 14 ? <button onClick={() => move(1)} className="cam-btn cam-lift">Next <ArrowRight className="h-4 w-4"/></button> : <button onClick={() => setIndex(-1)} className="cam-btn cam-lift">Finish <ArrowRight className="h-4 w-4"/></button>}
            </div>
          </div>
        </div>
      )}
    </CamShell>
  );
}
