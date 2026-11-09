import { useEffect } from "react";
import { camUrl } from "@/lib/site";

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
  "CAM, the Career Advisory Movement — an initiative of VOYCE. Career-exposure for Classes 8–12: 1,058 jobs across 87 industries.";
const DEFAULT_KEYWORDS =
  "CAM, Career Advisory Movement, career exposure, careers for students, VOYCE, @cam.voyce, Knowing Gap";
const DEFAULT_OG = camUrl("/og-image.jpg");

export function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_OG,
  ogType = "website",
  canonicalUrl,
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title ? (title.includes("CAM") ? title : `${title} | CAM`) : DEFAULT_TITLE;
  const currentUrl = canonicalUrl || (typeof window !== "undefined" ? window.location.href : camUrl("/"));
  const image = ogImage || DEFAULT_OG;

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
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:image:width", "1200", true);
    updateMetaTag("og:image:height", "630", true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:site_name", "CAM", true);
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);
  }, [fullTitle, description, keywords, image, ogType, currentUrl, noindex]);

  return null;
}
