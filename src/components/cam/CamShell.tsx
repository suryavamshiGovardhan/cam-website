import { ReactNode } from "react";
import CamHeader from "@/components/CamHeader";
import CamFooter from "@/components/CamFooter";
import { SEOHead } from "@/components/SEOHead";
import { cam } from "@/data/cam";
import { TopicArt, artForSlug } from "@/components/cam/illustrations";
import "./cam.css";

interface Props {
  title: string;
  description: string;
  canonical: string;
  children: ReactNode;
}

const CATEGORY_BG: Record<string, string> = {
  "The Talk": "teal",
  Atlas: "coral",
  Play: "sun",
  "Six lenses": "mint",
  "30 days": "teal",
  About: "coral",
};

const MARQUEE = "1,058 JOBS · 87 INDUSTRIES · @CAM.VOYCE · CLASSES 8–12 · ";
const SITE = "https://suryavamshigovardhan.github.io/cam-website";

export default function CamShell({ title, description, canonical, children }: Props) {
  const path = canonical === "/" ? "" : canonical;
  return (
    <>
      <SEOHead title={title} description={description} canonicalUrl={`${SITE}${path}`} />
      <a href="#main-content" className="cam-skip">
        Skip to content
      </a>
      <CamHeader />
      <div aria-hidden="true" className="cam" style={{ height: 4, background: "var(--cam-coral)" }} />
      <div className="cam">
        <div className="cam-marquee" aria-hidden="true">
          <div className="cam-marquee-track">
            <span>{MARQUEE.repeat(8)}</span>
            <span>{MARQUEE.repeat(8)}</span>
          </div>
        </div>
        <main id="main-content" className="min-h-screen" tabIndex={-1}>
          {children}
          <section className="border-t-2" style={{ borderColor: "var(--cam-line-soft)" }} aria-label="CAM contact strip">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="cam-serif text-lg">{cam.meta.brand}</p>
                <p className="cam-mono mt-1 text-xs" style={{ color: "var(--cam-coral)" }}>
                  Advisory = widen options, don't pick for you
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href={`mailto:${cam.meta.email}`} className="cam-muted inline-flex min-h-11 items-center font-semibold hover:text-[color:var(--cam-ink)]">
                  {cam.meta.email}
                </a>
                <a
                  href={cam.meta.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cam-muted inline-flex min-h-11 items-center font-semibold hover:text-[color:var(--cam-ink)]"
                >
                  Instagram {cam.meta.instagram.handle}
                </a>
                <a
                  href={cam.meta.x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cam-muted inline-flex min-h-11 items-center font-semibold hover:text-[color:var(--cam-ink)]"
                >
                  X {cam.meta.x.handle}
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
      <CamFooter />
    </>
  );
}

export function CamCover({ slug, className = "" }: { slug: string; className?: string }) {
  const article = cam.articles.find((a) => a.slug === slug);
  const bg = CATEGORY_BG[article?.category ?? "The Talk"] ?? "teal";
  return (
    <div className={`cam-art-block ${className}`} data-bg={bg} style={{ aspectRatio: "16 / 9" }}>
      <TopicArt name={artForSlug(slug)} label={article?.cover?.alt ?? "CAM illustration"} />
    </div>
  );
}

export const coverBgForSlug = (slug: string): string => {
  const article = cam.articles.find((a) => a.slug === slug);
  return CATEGORY_BG[article?.category ?? "The Talk"] ?? "teal";
};
