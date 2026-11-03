import { Children, isValidElement, ReactNode, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CamShell, { CamCover } from "@/components/cam/CamShell";
import CamProgress from "@/components/cam/CamProgress";
import CamVisual from "@/components/cam/CamVisual";
import CamInteractiveBlocks from "@/components/cam/CamInteractive";
import { CAM_INTERACTIVE } from "@/data/camInteractive";
import { cam } from "@/data/cam";

const articles = [...cam.articles].sort((a, b) => a.order - b.order);

function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : isValidElement(c) ? textOf((c.props as { children?: ReactNode }).children) : ""))
    .join("");
}
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const mdComponents = {
  h2: ({ children }: { children?: ReactNode }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  h3: ({ children }: { children?: ReactNode }) => <h3 id={slugify(textOf(children))}>{children}</h3>,
  a: ({ href = "", children }: { href?: string; children?: ReactNode }) =>
    href.startsWith("/") ? <Link to={href}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
};

export default function CamArticlePage() {
  const { slug } = useParams();
  const idx = articles.findIndex((a) => a.slug === slug);
  const article = articles[idx];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!article) {
    return (
      <CamShell title="Article not found | CAM" description="This CAM article does not exist." canonical="/">
        <section className="mx-auto max-w-2xl px-5 py-24 text-center">
          <p className="cam-kicker">404</p>
          <h1 className="cam-serif mt-4 text-4xl">This page isn't on the map yet.</h1>
          <Link to="/" className="cam-btn mt-8">Back to all CAM articles</Link>
        </section>
      </CamShell>
    );
  }

  const prev = articles[idx - 1];
  const next = articles[idx + 1];
  const interactive = CAM_INTERACTIVE[article.slug] ?? [];

  return (
    <CamShell title={`${article.title} | CAM`} description={article.dek} canonical={`/articles/${article.slug}`}>
      <CamProgress />
      <article className="mx-auto max-w-3xl px-5 pb-16 pt-12 sm:pt-16">
        <Link to={`/?category=${encodeURIComponent(article.category)}`} className="cam-pill">{article.category}</Link>
        <h1 className="cam-serif mt-5 text-[clamp(34px,7vw,60px)]">{article.title}</h1>
        <p className="cam-muted mt-5 text-lg leading-relaxed">{article.dek}</p>
        <p className="cam-mono mt-4 cam-dim">
          {article.readingMinutes} min read · {article.wordCount.toLocaleString("en-IN")} words
        </p>
        <figure className="mt-10">
          <div style={{ border: "2px solid var(--cam-ink)", borderRadius: "1.25rem", boxShadow: "6px 6px 0 var(--cam-ink)", overflow: "hidden" }}>
            <CamCover slug={article.slug} />
          </div>
          <figcaption className="sr-only">{article.cover.alt}</figcaption>
        </figure>

        <div className="cam-prose mt-12">
          {(() => {
            const parts = article.body.split(/\n(?=## )/);
            const visuals: { id: string; kind: string; alt: string }[] = [...(article.inlineVisuals ?? [])];
            const slots = new Map<number, { id: string; kind: string; alt: string }[]>();
            visuals.forEach((v, k) => {
              const at = Math.min(parts.length - 1, Math.max(1, Math.round(((k + 1) * (parts.length - 1)) / (visuals.length + 1))));
              slots.set(at, [...(slots.get(at) ?? []), v]);
            });
            const interactiveAt = new Map<number, typeof interactive>();
            interactive.forEach((b, k) => {
              const at = Math.min(parts.length - 1, 1 + k * 2);
              interactiveAt.set(at, [...(interactiveAt.get(at) ?? []), b]);
            });
            return parts.map((part, i) => (
              <div key={i}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>{part}</ReactMarkdown>
                {(slots.get(i) ?? []).map((v) => <CamVisual key={v.id} visual={v} />)}
                {(interactiveAt.get(i) ?? []).map((b, k) => <CamInteractiveBlocks key={k} blocks={[b]} />)}
              </div>
            ));
          })()}
        </div>

        {/* closing card */}
        <section className="cam-band mt-16 px-6 py-10 text-center sm:px-10">
          <p className="cam-serif text-3xl leading-tight sm:text-4xl" style={{ color: "#FFFFFF" }}>
            <span style={{ color: "var(--cam-sun)" }}>EXPOSURE</span> IS ALL YOU NEED.
          </p>
          <Link to="/atlas" className="cam-btn cam-btn-sun mt-6 inline-flex">
            Read another career <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </article>

      <nav aria-label="More CAM articles" className="mx-auto grid max-w-3xl gap-4 px-5 pb-20 sm:grid-cols-2">
        {prev ? (
          <Link to={`/articles/${prev.slug}`} className="cam-card cam-elev p-5">
            <span className="cam-kicker inline-flex items-center gap-2"><ArrowLeft className="h-3 w-3" aria-hidden="true" /> Previous</span>
            <p className="cam-serif mt-2 text-xl leading-tight">{prev.title}</p>
          </Link>
        ) : <Link to="/" className="cam-card cam-elev p-5"><span className="cam-kicker">All articles</span><p className="cam-serif mt-2 text-xl">Back to CAM</p></Link>}
        {next ? (
          <Link to={`/articles/${next.slug}`} className="cam-card cam-elev p-5 sm:text-right">
            <span className="cam-kicker inline-flex items-center gap-2">Next <ArrowRight className="h-3 w-3" aria-hidden="true" /></span>
            <p className="cam-serif mt-2 text-xl leading-tight">{next.title}</p>
          </Link>
        ) : <Link to="/" className="cam-card cam-elev p-5 sm:text-right"><span className="cam-kicker">All articles</span><p className="cam-serif mt-2 text-xl">Back to CAM</p></Link>}
      </nav>
    </CamShell>
  );
}
