import { useState } from "react";
import { camUrl } from "@/lib/site";
import { canShareFiles, copyText, downloadBlob, makeCamStoryImage } from "@/lib/shareStory";

type Props = {
  /** Short message body (no URL — URL is appended). */
  text: string;
  /** Path on the CAM site, e.g. /play */
  path?: string;
  /** Story canvas fields */
  story: { kicker: string; headline: string; subline: string };
  /** Visible WhatsApp label */
  whatsappLabel?: string;
  className?: string;
  compact?: boolean;
};

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-1.24.341.332-1.21-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8A3.6 3.6 0 007.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6A3.6 3.6 0 0016.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
  );
}

export default function ShareButtons({
  text,
  path = "/",
  story,
  whatsappLabel = "Share on WhatsApp",
  className = "",
  compact = false,
}: Props) {
  const [igBusy, setIgBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const url = camUrl(path);
  const fullText = `${text}\n${url}`;

  const shareWhatsApp = async () => {
    setNote(null);
    // Prefer native share sheet on mobile (user can pick WhatsApp)
    if (typeof navigator !== "undefined" && typeof navigator.share === "function" && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({ title: "CAM", text: fullText, url });
        return;
      } catch (err) {
        // User cancel → stop; other errors fall through to wa.me
        if ((err as Error)?.name === "AbortError") return;
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, "_blank", "noopener,noreferrer");
  };

  const shareInstagram = async () => {
    setNote(null);
    setIgBusy(true);
    try {
      const blob = await makeCamStoryImage({
        kicker: story.kicker,
        headline: story.headline,
        subline: story.subline,
        url,
      });
      const file = new File([blob], "cam-story.png", { type: "image/png" });
      const caption = fullText;

      if (canShareFiles()) {
        try {
          await navigator.share({
            files: [file],
            title: "CAM",
            text: caption,
          });
          setNote("Share sheet open — pick Instagram. Caption includes the link.");
          return;
        } catch (err) {
          if ((err as Error)?.name === "AbortError") return;
          // fall through to download
        }
      }

      downloadBlob(blob, "cam-instagram-story.png");
      const copied = await copyText(caption);
      setNote(
        copied
          ? "Downloaded story image · caption copied — open Instagram and paste."
          : "Downloaded story image · copy this link into Instagram: " + url,
      );
    } catch {
      setNote("Could not build the story image. Try again, or copy the link from the address bar.");
    } finally {
      setIgBusy(false);
    }
  };

  const pad = compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm";

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={shareWhatsApp}
          className={`cam-share-wa inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-extrabold ${pad}`}
          aria-label={whatsappLabel}
        >
          <WhatsAppIcon />
          {whatsappLabel}
        </button>
        <button
          type="button"
          onClick={shareInstagram}
          disabled={igBusy}
          className={`cam-share-ig inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-extrabold ${pad}`}
          aria-label="Download Instagram story image and copy caption"
        >
          <InstagramIcon />
          {igBusy ? "Preparing image…" : "Download image + copy caption"}
        </button>
      </div>
      {note && (
        <p className="cam-dim text-xs font-semibold leading-relaxed" role="status" aria-live="polite">
          {note}
        </p>
      )}
    </div>
  );
}
