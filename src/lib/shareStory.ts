/** Build a branded 1080×1920 CAM Instagram-story canvas. */
export async function makeCamStoryImage(opts: {
  kicker: string;
  headline: string;
  subline: string;
  url: string;
}): Promise<Blob> {
  const W = 1080;
  const H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Cream ground
  ctx.fillStyle = "#FFF6E9";
  ctx.fillRect(0, 0, W, H);

  // Teal hero block
  ctx.fillStyle = "#1F8A84";
  roundRect(ctx, 64, 160, W - 128, 980, 48);
  ctx.fill();

  // Coral accent bar
  ctx.fillStyle = "#FF6B5B";
  ctx.fillRect(64, 160, W - 128, 18);

  // Ink border
  ctx.strokeStyle = "#0F3D3E";
  ctx.lineWidth = 8;
  roundRect(ctx, 64, 160, W - 128, 980, 48);
  ctx.stroke();

  ctx.fillStyle = "#BFE8DC";
  ctx.font = "700 36px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(opts.kicker.toUpperCase(), W / 2, 280);

  wrapText(ctx, opts.headline, W / 2, 420, W - 220, 92, "800 84px 'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif", "#FFF6E9");

  ctx.fillStyle = "#FFC94A";
  ctx.font = "700 40px 'Plus Jakarta Sans', system-ui, sans-serif";
  wrapText(ctx, opts.subline, W / 2, 780, W - 240, 52, "700 40px 'Plus Jakarta Sans', system-ui, sans-serif", "#FFC94A");

  // Bottom brand card
  ctx.fillStyle = "#FFFFFF";
  roundRect(ctx, 64, 1280, W - 128, 420, 40);
  ctx.fill();
  ctx.strokeStyle = "#0F3D3E";
  ctx.lineWidth = 8;
  roundRect(ctx, 64, 1280, W - 128, 420, 40);
  ctx.stroke();

  ctx.fillStyle = "#0F3D3E";
  ctx.font = "800 72px 'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("CAM", W / 2, 1400);

  ctx.fillStyle = "#FF6B5B";
  ctx.font = "800 28px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("EXPOSURE IS ALL YOU NEED", W / 2, 1460);

  ctx.fillStyle = "#2A524F";
  ctx.font = "600 28px 'Plus Jakarta Sans', system-ui, sans-serif";
  wrapText(ctx, opts.url.replace(/^https?:\/\//, ""), W / 2, 1540, W - 240, 36, "600 28px 'Plus Jakarta Sans', system-ui, sans-serif", "#2A524F");

  ctx.fillStyle = "#14615D";
  ctx.font = "700 26px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.fillText("An initiative of VOYCE", W / 2, 1640);

  return await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("canvas toBlob failed"))), "image/png");
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  font: string,
  color: string,
) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = "center";
  const words = text.split(/\s+/);
  let line = "";
  let yy = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, yy);
      line = word;
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, yy);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function canShareFiles(): boolean {
  try {
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") return false;
    if (typeof navigator.canShare !== "function") return false;
    const file = new File([new Blob(["x"], { type: "image/png" })], "t.png", { type: "image/png" });
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}
