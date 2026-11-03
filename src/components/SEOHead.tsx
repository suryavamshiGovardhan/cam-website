import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

const DEFAULT_TITLE = "CAM — Exposure Is All You Need";
const DEFAULT_DESCRIPTION =
  "CAM, the Career Advisory Movement — an initiative of VOYCE. Career-exposure for Classes 8–12.";
const DEFAULT_KEYWORDS =
  "CAM, Career Advisory Movement, career exposure, careers for students, VOYCE, @cam.voyce";
const SITE = "https://suryavamshigovardhan.github.io/cam-website";

export function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage,
  ogType = "website",
  canonicalUrl,
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title ? (title.includes("CAM") ? title : `${title} | CAM`) : DEFAULT_TITLE;
  const currentUrl = canonicalUrl || (typeof window !== "undefined" ? window.location.href : SITE);

  useEffect(() => {
    document.title = fullTitle;

    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", description, true);
    if (ogImage) updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:site_name", "CAM", true);
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);
  }, [fullTitle, description, keywords, ogImage, ogType, currentUrl, noindex]);

  return null;
}
