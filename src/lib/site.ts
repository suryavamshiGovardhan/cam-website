/** Live GitHub Pages URL (no trailing slash). */
export const CAM_SITE = "https://suryavamshigovardhan.github.io/cam-website";

export function camUrl(path = "/"): string {
  if (!path || path === "/") return `${CAM_SITE}/`;
  return `${CAM_SITE}${path.startsWith("/") ? path : `/${path}`}`;
}
