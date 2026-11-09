import type { ArtName } from "./artworks";
export { default as TopicArt } from "./TopicArt";
export type { ArtName } from "./artworks";

/** One config file mapping every CAM article slug (and section page) to its illustration. */
export const ARTICLE_ART: Record<string, ArtName> = {
  "the-question-you-were-asked-at-ten": "speech-bubbles",
  "the-knowing-gap": "gap-canyon",
  "there-are-not-twelve-careers": "ripple-grid",
  "how-interest-actually-starts": "speech-bubbles",
  "guess-the-job": "question-bounce",
  "strange-real-paid-work": "equalizer-bars",
  "the-future-is-already-hiring": "rocket-orbit",
  "six-lenses-for-choosing": "fingerprint-scan",
  "thirty-days-of-looking-part-1": "calendar-tick",
  "thirty-days-of-looking-part-2": "calendar-tick",
  "inside-the-atlas-87-industries": "ripple-grid",
  "choose-the-career-that-fits-you": "dna-helix",
  "about-cam": "turbine-leaf",
};

export const SECTION_ART: Record<string, ArtName> = {
  "/talk": "speech-bubbles",
  "/atlas": "circuit-nodes",
  "/play": "pixel-jump",
  "/fit": "fingerprint-scan",
  "/challenge": "calendar-tick",
  "/about": "turbine-leaf",
};

export const artForSlug = (slug: string): ArtName => ARTICLE_ART[slug] ?? "speech-bubbles";
