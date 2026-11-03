import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const CamHubPage = lazy(() => import("./pages/CamHubPage"));
const CamArticlePage = lazy(() => import("./pages/CamArticlePage"));
const CamTalkPage = lazy(() => import("./pages/CamTalkPage"));
const CamAtlasPage = lazy(() => import("./pages/CamAtlasPage"));
const CamPlayPage = lazy(() => import("./pages/CamPlayPage"));
const CamFitPage = lazy(() => import("./pages/CamFitPage"));
const CamChallengePage = lazy(() => import("./pages/CamChallengePage"));
const CamAboutPage = lazy(() => import("./pages/CamAboutPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Fallback() {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: "#FFF6E9", color: "#0F3D3E" }}>
      <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800 }}>Loading CAM…</p>
    </div>
  );
}

/** Map old VOYCE /cam/... URLs onto this standalone site. */
function LegacyCamRedirect() {
  const { pathname, search, hash } = useLocation();
  const rest = pathname.replace(/^\/cam/, "") || "/";
  return <Navigate to={`${rest}${search}${hash}`} replace />;
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<CamHubPage />} />
        <Route path="/articles/:slug" element={<CamArticlePage />} />
        <Route path="/talk" element={<CamTalkPage />} />
        <Route path="/atlas" element={<CamAtlasPage />} />
        <Route path="/careers" element={<CamAtlasPage />} />
        <Route path="/play" element={<CamPlayPage />} />
        <Route path="/fit" element={<CamFitPage />} />
        <Route path="/challenge" element={<CamChallengePage />} />
        <Route path="/about" element={<CamAboutPage />} />
        <Route path="/cam/*" element={<LegacyCamRedirect />} />
        <Route path="/cam" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
