import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

export default function NotFound() {
  return (
    <>
      <SEOHead title="Page not found" description="This CAM page does not exist." noindex />
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center"
        style={{ background: "#FFF6E9", color: "#0F3D3E" }}
      >
        <p className="text-sm font-extrabold uppercase tracking-wide" style={{ color: "#14615D" }}>
          CAM
        </p>
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 48 }}>
          Page not found
        </h1>
        <p style={{ color: "#35615E" }}>That URL is not part of the Career Advisory Movement site.</p>
        <Link
          to="/"
          className="rounded-full px-6 py-3 text-sm font-bold"
          style={{ background: "#FFC94A", color: "#0F3D3E", border: "2px solid #0F3D3E", boxShadow: "4px 4px 0 #0F3D3E" }}
        >
          Back to CAM home
        </Link>
      </div>
    </>
  );
}
