import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import CamShell from "@/components/cam/CamShell";
import { cam } from "@/data/cam";
import { CAM_JOB_COUNT, CAM_INDUSTRY_COUNT, jobBlurb } from "@/lib/stats";

const atlas = cam.source.atlasIndex as unknown as Record<string, string[]>;
const industries = Object.keys(atlas);
const allJobs = industries.flatMap((ind) => atlas[ind].map((job) => ({ ind, job })));

export default function CamAtlasPage() {
  const [params, setParams] = useSearchParams();
  const qParam = params.get("q") ?? "";
  const industryParam = params.get("industry") ?? "All";
  const [query, setQuery] = useState(qParam);
  const [industry, setIndustry] = useState<string>(
    industryParam !== "All" && industries.includes(industryParam) ? industryParam : "All",
  );
  const [openJob, setOpenJob] = useState<string | null>(null);

  // Honour ?industry= on first load / when URL changes externally
  useEffect(() => {
    const ind = params.get("industry");
    if (ind && industries.includes(ind)) setIndustry(ind);
    else if (!ind) setIndustry("All");
    const q = params.get("q") ?? "";
    setQuery(q);
  }, [params]);

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allJobs.filter(
      (j) =>
        (industry === "All" || j.ind === industry) &&
        (!needle || j.job.toLowerCase().includes(needle) || j.ind.toLowerCase().includes(needle)),
    );
  }, [query, industry]);

  const writeParams = (nextQ: string, nextInd: string, replace = true) => {
    const next: Record<string, string> = {};
    if (nextQ.trim()) next.q = nextQ.trim();
    if (nextInd !== "All") next.industry = nextInd;
    setParams(next, { replace });
  };

  const onQueryChange = (value: string) => {
    setQuery(value);
    writeParams(value, industry, true);
  };

  const onIndustry = (ind: string) => {
    setIndustry(ind);
    writeParams(query, ind, true);
  };

  return (
    <CamShell
      title={`The CAM Atlas — ${CAM_JOB_COUNT.toLocaleString("en-IN")} careers across ${CAM_INDUSTRY_COUNT} industries`}
      description={`Strange, real, paid work: search ${CAM_JOB_COUNT.toLocaleString("en-IN")} jobs across ${CAM_INDUSTRY_COUNT} industries school never put on the board.`}
      canonical="/atlas"
    >
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:pt-16">
        <p className="cam-kicker">The Atlas</p>
        <h1 className="cam-serif mt-4 max-w-3xl text-[38px] leading-[1.05] sm:text-5xl">Strange, real, paid work.</h1>
        <p className="cam-muted mt-4 max-w-2xl text-lg leading-relaxed">
          {CAM_JOB_COUNT.toLocaleString("en-IN")} jobs across {CAM_INDUSTRY_COUNT} industries — the work school forgot to mention.
          Try <em>tea</em>. Try <em>ocean</em>. Try <em>cricket</em>.
        </p>

        <form
          className="mt-8 flex items-center gap-3 rounded-full px-5 py-3"
          style={{ background: "var(--cam-surface)", boxShadow: "var(--cam-shadow-border)" }}
          onSubmit={(e) => {
            e.preventDefault();
            writeParams(query, industry, true);
          }}
          role="search"
        >
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: "var(--cam-dim)" }} />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search careers — tea, ocean, type, cricket…"
            aria-label="Search careers"
            className="cam-mono w-full bg-transparent text-base outline-none sm:text-sm"
            style={{ color: "var(--cam-fg)", minHeight: 48, opacity: 1 }}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => onQueryChange("")}
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full hover:text-[color:var(--cam-fg)]"
              style={{ color: "var(--cam-dim)" }}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </form>
        {/* Mobile: industry dropdown. Desktop: chips */}
        <div className="mt-5 md:hidden">
          <label htmlFor="cam-industry" className="cam-kicker">
            Industry
          </label>
          <select
            id="cam-industry"
            className="cam-mono mt-2 w-full rounded-xl px-4 text-base"
            style={{
              minHeight: 52,
              border: "2px solid var(--cam-ink)",
              background: "#FFFFFF",
              color: "var(--cam-ink)",
            }}
            value={industry}
            onChange={(e) => onIndustry(e.target.value)}
          >
            <option value="All">All industries ({CAM_INDUSTRY_COUNT})</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 hidden flex-wrap gap-2 md:flex" role="group" aria-label="Filter by industry">
          {["All", ...industries].map((ind) => (
            <button
              key={ind}
              type="button"
              className="cam-chip"
              style={{ minHeight: 44, padding: "10px 16px" }}
              aria-pressed={industry === ind}
              onClick={() => onIndustry(ind)}
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
        {list.map(({ ind, job }) => {
          const key = `${ind}-${job}`;
          const open = openJob === key;
          return (
            <button
              key={key}
              type="button"
              className="cam-tile px-4 py-4 text-left"
              style={{ minHeight: 88 }}
              aria-expanded={open}
              onClick={() => setOpenJob(open ? null : key)}
            >
              <p className="cam-kicker">{ind}</p>
              <p className="cam-serif mt-1 text-lg leading-tight">{job}</p>
              {open && <p className="cam-muted mt-2 text-sm leading-relaxed">{jobBlurb(job, ind)}</p>}
              {!open && <p className="cam-dim mt-2 text-xs font-semibold">Tap for a one-line blurb</p>}
            </button>
          );
        })}
        {list.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <p className="cam-serif text-2xl">Nothing by that name — yet.</p>
            <p className="cam-muted mt-2 text-sm">
              Try a smaller word: <em>tea</em>, <em>reef</em>, <em>type</em>.
            </p>
          </div>
        )}
      </section>
    </CamShell>
  );
}
