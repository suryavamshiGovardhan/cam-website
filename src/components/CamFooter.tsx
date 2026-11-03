import { Link } from "react-router-dom";
import { cam } from "@/data/cam";

const LINKS = [
  { label: "The Talk", to: "/talk" },
  { label: "Atlas", to: "/atlas" },
  { label: "Play", to: "/play" },
  { label: "Six lenses", to: "/fit" },
  { label: "30 days", to: "/challenge" },
  { label: "About", to: "/about" },
];

export default function CamFooter() {
  return (
    <footer className="border-t-2" style={{ background: "#0F3D3E", borderColor: "#0F3D3E", color: "#FFF6E9" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 28 }}>CAM</p>
          <p className="mt-2 text-sm font-semibold" style={{ color: "#FFC94A" }}>
            {cam.meta.tagline}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: "#BFE8DC" }}>
            {cam.meta.brand}. Career-exposure for Classes 8–12 — the talk, the atlas, the game, six lenses and thirty days of looking.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
            <a href={`mailto:${cam.meta.email}`} className="hover:underline">
              {cam.meta.email}
            </a>
            <a href={cam.meta.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Instagram {cam.meta.instagram.handle}
            </a>
            <a href={cam.meta.x.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              X {cam.meta.x.handle}
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide" style={{ color: "#FF6B5B" }}>
            Explore
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm font-semibold">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs" style={{ color: "#5E8582" }}>
            An initiative of{" "}
            <a href="https://voyce-x.lovable.app/" target="_blank" rel="noopener noreferrer" className="underline">
              VOYCE
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
