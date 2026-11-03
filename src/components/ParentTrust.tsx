import { Link } from "react-router-dom";
import { ShieldCheck, Gift, BookOpen, HeartHandshake } from "lucide-react";
import { cam } from "@/data/cam";

/** Parent reassurance using only claims already present in CAM copy. */
export default function ParentTrust({ id = "for-parents" }: { id?: string }) {
  const items = [
    {
      Icon: BookOpen,
      title: "What it is",
      body: "CAM is a career-exposure reading series for Classes 8–12: a talk, an atlas of real jobs, a guessing game, six lenses for choosing, and thirty days of looking. It widens the map — it does not pick a career for your child.",
    },
    {
      Icon: ShieldCheck,
      title: "Safe by design",
      body: "CAM does not give career, admissions or psychological advice. The atlas is a door into the world of work — not the whole building. No login is required to read, play or tick off days.",
    },
    {
      Icon: Gift,
      title: "Free to start",
      body: "Built for Classes 8–12 and free to start. Progress on the thirty-day challenge stays on this device.",
    },
    {
      Icon: HeartHandshake,
      title: "From VOYCE",
      body: `${cam.meta.brand}. Built by ${cam.meta.founders.map((f) => f.name).join(" and ")}.`,
    },
  ];

  return (
    <section
      id={id}
      className="rounded-2xl p-6 sm:p-8"
      style={{ background: "var(--cam-card)", border: "2px solid var(--cam-ink)", boxShadow: "6px 6px 0 var(--cam-ink)" }}
      aria-labelledby={`${id}-title`}
    >
      <p className="cam-kicker">For parents</p>
      <h2 id={`${id}-title`} className="cam-serif mt-3 text-3xl leading-tight sm:text-4xl">
        A wider map — not pressure to decide today.
      </h2>
      <p className="cam-muted mt-3 max-w-2xl text-base leading-relaxed">
        Short version: CAM helps students notice more real jobs before subject choices get locked in. Here is what parents usually want to know.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map(({ Icon, title, body }) => (
          <li key={title} className="cam-tile flex gap-3 p-4">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ background: "var(--cam-mint)", border: "2px solid var(--cam-ink)" }}
              aria-hidden="true"
            >
              <Icon className="h-5 w-5" style={{ color: "var(--cam-teal-dark)" }} />
            </span>
            <div>
              <p className="cam-serif text-lg leading-tight">{title}</p>
              <p className="cam-muted mt-1.5 text-sm leading-relaxed">{body}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/about" className="cam-btn cam-btn-ghost">
          Read About CAM
        </Link>
        <a href={`mailto:${cam.meta.email}?subject=${encodeURIComponent("Question about CAM")}`} className="cam-btn cam-btn-sun">
          Ask us a question
        </a>
      </div>
    </section>
  );
}
