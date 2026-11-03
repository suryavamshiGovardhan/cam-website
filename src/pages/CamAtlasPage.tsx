import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import CamShell from "@/components/cam/CamShell";
import { cam } from "@/data/cam";

const atlas = cam.source.atlasIndex as unknown as Record<string, string[]>;
const industries = Object.keys(atlas);
const allJobs = industries.flatMap((ind) => atlas[ind].map((job) => ({ ind, job })));

export default function CamAtlasPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [query, setQuery] = useState(q);
  const [industry, setIndustry] = useState<string>("All");

  const list = useMemo(() => {
    const needle = (q || query).trim().toLowerCase();
    return allJobs.filter(
      (j) =>
        (industry === "All" || j.ind === industry) &&
        (!needle || j.job.toLowerCase().includes(needle) || j.ind.toLowerCase().includes(needle))
    );
  }, [q, query, industry]);

  const submit = (value: string) => {
    setQuery(value);
    const next: Record<string, string> = {};
    if (value.trim()) next.q = value.trim();
    if (industry !== "All") next.industry = industry;
    setParams(next);
  };

  return (
    <CamShell
      title={`The CAM Atlas — ${allJobs.length.toLocaleString("en-IN")} careers across ${industries.length} industries`}
      description="Strange, real, paid work: search the CAM atlas of unconventional and specialised jobs school never put on the board."
      canonical="/atlas"
    >
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:pt-16">
        <p className="cam-kicker">The Atlas</p>
        <h1 className="cam-serif mt-4 max-w-3xl text-[38px] leading-[1.05] sm:text-5xl">Strange, real, paid work.</h1>
        <p className="cam-muted mt-4 max-w-2xl text-lg leading-relaxed">
          {allJobs.length.toLocaleString("en-IN")} jobs across {industries.length} industries — the work school forgot to mention.
          Try <em>tea</em>. Try <em>ocean</em>. Try <em>cricket</em>.
        </p>

        <form
          className="mt-8 flex items-center gap-3 rounded-full px-5 py-3"
          style={{ background: "var(--cam-surface)", boxShadow: "var(--cam-shadow-border)" }}
          onSubmit={(e) => { e.preventDefault(); submit(query); }}
          role="search"
        >
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: "var(--cam-dim)" }} />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); submit(e.target.value); }}
            placeholder="Search careers — tea, ocean, type, cricket…"
            aria-label="Search careers"
            className="cam-mono w-full bg-transparent text-sm outline-none placeholder:opacity-50"
            style={{ color: "var(--cam-fg)" }}
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); submit(""); }} className="shrink-0 rounded-full p-1 hover:text-[color:var(--cam-fg)]" style={{ color: "var(--cam-dim)" }}>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </form>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by industry">
          {["All", ...industries].map((ind) => (
            <button
              key={ind}
              type="button"
              className="cam-chip"
              aria-pressed={industry === ind}
              onClick={() => { setIndustry(ind); setParams({ ...(q ? { q } : {}), ...(ind === "All" ? {} : { industry: ind }) }); }}
            >
              {ind}
            </button>
          ))}
        </div>

        <p className="cam-mono mt-6 text-[11px] uppercase tracking-[0.2em] cam-dim">
          {list.length.toLocaleString("en-IN")} {list.length === 1 ? "job" : "jobs"}
          {industry !== "All" ? ` in ${industry}` : ""}
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-5 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(({ ind, job }) => (
          <div key={`${ind}-${job}`} className="cam-tile px-4 py-3.5">
            <p className="cam-kicker">{ind}</p>
            <p className="cam-serif mt-1 text-lg leading-tight">{job}</p>
          </div>
        ))}
        {list.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <p className="cam-serif text-2xl">Nothing by that name — yet.</p>
            <p className="cam-muted mt-2 text-sm">Try a smaller word: <em>tea</em>, <em>reef</em>, <em>type</em>.</p>
          </div>
        )}
      </section>
    </CamShell>
  );
}
