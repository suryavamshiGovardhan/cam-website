import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cam } from "@/data/cam";

const NAV = [
  { label: "Home", to: "/" },
  { label: "The Talk", to: "/talk" },
  { label: "Atlas", to: "/atlas" },
  { label: "Play", to: "/play" },
  { label: "Six lenses", to: "/fit" },
  { label: "30 days", to: "/challenge" },
  { label: "About", to: "/about" },
];

export default function CamHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b-2"
      style={{ background: "#FFF6E9", borderColor: "#0F3D3E" }}
    >
      <nav aria-label="CAM" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex flex-col leading-none" aria-label="CAM home">
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

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-bold transition-colors ${
                    isActive ? "bg-[#0F3D3E] text-[#FFF6E9]" : "text-[#0F3D3E] hover:bg-[#BFE8DC]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 lg:hidden"
          style={{ color: "#0F3D3E", border: "2px solid #0F3D3E" }}
          aria-expanded={open}
          aria-controls="cam-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div id="cam-mobile-nav" className="border-t-2 lg:hidden" style={{ borderColor: "#0F3D3E", background: "#FFF6E9" }}>
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-bold ${
                      isActive ? "bg-[#0F3D3E] text-[#FFF6E9]" : "text-[#0F3D3E]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
