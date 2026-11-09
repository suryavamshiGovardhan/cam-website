import CamShell from "@/components/cam/CamShell";
import { PiecesRow, ContactCard } from "@/components/cam/CamVisual";
import ParentTrust from "@/components/ParentTrust";
import { cam } from "@/data/cam";

export default function CamAboutPage() {
  return (
    <CamShell
      title="About CAM — Career Advisory Movement | VOYCE"
      description="CAM is VOYCE's career-exposure reading series for Classes 8–12: the talk, the atlas, the game, the six lenses and thirty days of looking. Built by Suryavamshi and Ariba."
      canonical="/about"
    >
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-12 sm:pt-16">
        <p className="cam-kicker">{cam.meta.brand}</p>
        <h1 className="cam-serif mt-4 max-w-3xl text-[38px] leading-[1.05] sm:text-5xl">{cam.meta.tagline}</h1>
        <p className="cam-muted mt-5 max-w-2xl text-lg leading-relaxed">
          CAM stands for Career Advisory Movement. It began as a keynote for Classes 8 to 12 and grew into a reading series,
          an atlas, a game, six lenses and a month of looking. Advisory means we widen options — we don't tell you what to choose. The promise is the same in every part: <strong>not a career — a wider map.</strong>
        </p>

        <div className="mt-12"><ParentTrust /></div>

        <div className="mt-12">
          <p className="cam-kicker">The five parts</p>
          <div className="mt-4"><PiecesRow /></div>
        </div>

        <div className="mt-14">
          <p className="cam-kicker">Proof, not posters</p>
          <h2 className="cam-serif mt-3 text-3xl">Composite paths.</h2>
          <p className="cam-muted mt-2 max-w-xl text-sm leading-relaxed">
            The pattern is real even when a name is not famous. These stories are composites from the talk.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cam.source.stories.map((s) => (
              <div key={s.name} className="cam-tile p-5">
                <p className="cam-serif text-xl">{s.name}</p>
                <p className="cam-muted mt-2 text-sm leading-relaxed">{s.path}</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--cam-teal-dark)", fontWeight: 700 }}>{s.now}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <p className="cam-kicker">Meanwhile, the future is already hiring</p>
          <h2 className="cam-serif mt-3 text-3xl">Jobs your parents cannot Google yet.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {cam.source.future.map((f) => (
              <div key={f.title} className="cam-tile p-4">
                <p className="cam-kicker">{f.field}</p>
                <p className="cam-serif mt-2 text-lg leading-tight">{f.title}</p>
                <p className="cam-muted mt-2 text-xs leading-relaxed">{f.blurb}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <p className="cam-kicker">Who is behind CAM</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {cam.meta.founders.map((f) => (
              <div key={f.name} className="cam-tile flex items-center gap-4 p-5">
                <span className="cam-serif flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl" style={{ background: "var(--cam-paper)", color: "var(--cam-ink)" }}>
                  {f.initial}
                </span>
                <div>
                  <p className="cam-serif text-xl">{f.name}</p>
                  <p className="cam-kicker">{f.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="cam-muted mt-4 max-w-xl text-sm leading-relaxed">
            Built by two people who wanted a wider map — an initiative of VOYCE.
          </p>
        </div>

        <div className="mt-14">
          <p className="cam-kicker">Write to us</p>
          <div className="mt-4"><ContactCard /></div>
          <p className="cam-dim mt-6 text-sm leading-relaxed">
            CAM is a reading and exposure project. It does not give career, admissions or psychological advice, and the atlas is a door
            into the world of work — not the whole building. For school programmes, see{" "}
            <a href="https://voyce-x.lovable.app/ai4schools" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--cam-kraft)" }}>AI4Schools</a> and{" "}
            <a href="https://voyce-x.lovable.app/schools" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--cam-kraft)" }}>VOYCE for Schools</a>.
          </p>
        </div>
      </section>
    </CamShell>
  );
}
