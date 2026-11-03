import { FormEvent, ReactNode, useEffect, useState } from "react";
import { sha256Hex } from "@/admin/hashPasscode";
import { CAM_ADMIN_PASSCODE_SHA256 } from "@/admin/passcodeHash";

const SESSION_KEY = "cam-admin-authed";

export default function AdminPassGate({ children }: { children: ReactNode }) {
  const [ok, setOk] = useState(false);
  const [checking, setChecking] = useState(true);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      setOk(sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {
      setOk(false);
    }
    setChecking(false);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const hex = await sha256Hex(value);
      if (hex === CAM_ADMIN_PASSCODE_SHA256) {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* private mode — still allow this tab */
        }
        setOk(true);
        setValue("");
      } else {
        setError("That passcode doesn’t match. Try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "#FFF6E9", color: "#0F3D3E" }}>
        <p className="font-bold">…</p>
      </div>
    );
  }

  if (!ok) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5" style={{ background: "#FFF6E9", color: "#0F3D3E" }}>
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm rounded-2xl border-2 p-6"
          style={{ borderColor: "#0F3D3E", boxShadow: "6px 6px 0 #0F3D3E", background: "#FFFFFF" }}
        >
          <p className="text-xs font-extrabold uppercase tracking-wide" style={{ color: "#14615D" }}>
            CAM · private deck
          </p>
          <h1
            className="mt-3 text-3xl leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800 }}
          >
            Enter passcode
          </h1>
          <p className="mt-2 text-sm font-semibold" style={{ color: "#2A524F" }}>
            School-pitch slides for founders and principals. Not linked from the public site.
          </p>
          <label className="mt-6 block text-xs font-extrabold uppercase" htmlFor="cam-admin-pass">
            Passcode
          </label>
          <input
            id="cam-admin-pass"
            type="password"
            autoComplete="current-password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 px-4 py-3 text-base outline-none"
            style={{ borderColor: "#0F3D3E", minHeight: 48 }}
            required
          />
          {error && (
            <p className="mt-2 text-sm font-semibold" style={{ color: "#FF6B5B" }} role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || !value}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 text-sm font-extrabold"
            style={{ background: "#FFC94A", borderColor: "#0F3D3E", boxShadow: "4px 4px 0 #0F3D3E" }}
          >
            {busy ? "Checking…" : "Open deck"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
