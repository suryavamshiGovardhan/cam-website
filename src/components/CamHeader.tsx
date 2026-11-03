import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cam } from "@/data/cam";

const NAV = [
  { label: "Home", to: "/", hint: "Start here" },
  { label: "Talk", to: "/talk", hint: "The keynote, slide by slide" },
  { label: "Jobs", to: "/atlas", hint: "Search 2,000+ real careers" },
  { label: "Play", to: "/play", hint: "Guess the job — 10 clues" },
  { label: "Lenses", to: "/fit", hint: "Six ways to choose" },
  { label: "30 days", to: "/challenge", hint: "One small task a day" },
  { label: "About", to: "/about", hint: "Who built CAM · for parents" },
];

export default function CamHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const panelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b-2"
      style={{ background: "#FFF6E9", borderColor: "#0F3D3E" }}
    >
      <nav aria-label="CAM main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
        <Link to="/" className="flex min-h-11 min-w-11 flex-col justify-center leading-none" aria-label="CAM home">
          <span
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#0F3D3E",
              letterSpacing: "-0.02em",
            }}
          >
            CAM
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#FF6B5B" }}>
            {cam.meta.tagline}
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `inline-flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B5B] ${
                    isActive ? "bg-[#0F3D3E] text-[#FFF6E9]" : "text-[#0F3D3E] hover:bg-[#BFE8DC]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/play"
            className="hidden min-h-11 items-center rounded-full px-4 text-sm font-extrabold sm:inline-flex"
            style={{
              background: "#FFC94A",
              color: "#0F3D3E",
              border: "2px solid #0F3D3E",
              boxShadow: "3px 3px 0 #0F3D3E",
            }}
          >
            Play
          </Link>
          <button
            ref={closeBtnRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md xl:hidden"
            style={{ color: "#0F3D3E", border: "2px solid #0F3D3E", background: "#FFF6E9" }}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id={panelId}
          className="border-t-2 xl:hidden"
          style={{ borderColor: "#0F3D3E", background: "#FFF6E9" }}
          role="dialog"
          aria-modal="true"
          aria-label="CAM menu"
        >
          <ul className="mx-auto flex max-h-[calc(100dvh-4rem)] max-w-6xl flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-5">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex min-h-14 flex-col justify-center rounded-xl px-4 py-3 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B5B] ${
                      isActive ? "bg-[#0F3D3E] text-[#FFF6E9]" : "text-[#0F3D3E] hover:bg-[#BFE8DC]"
                    }`
                  }
                >
                  <span className="text-base font-extrabold">{item.label}</span>
                  <span className="text-xs font-semibold opacity-80">{item.hint}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
