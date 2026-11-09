import { cam } from "@/data/cam";

const atlas = cam.source.atlasIndex as unknown as Record<string, string[]>;

/** Live counts from the atlas — keep marketing copy aligned with these. */
export const CAM_INDUSTRY_COUNT = Object.keys(atlas).length;
export const CAM_JOB_COUNT = Object.values(atlas).flat().length;

/** Exact phrase for titles and hero. */
export const CAM_JOBS_EXACT = `${CAM_JOB_COUNT.toLocaleString("en-IN")} jobs across ${CAM_INDUSTRY_COUNT} industries`;

/** Softer marketing phrase when a round number reads better. */
export const CAM_JOBS_SHORT = `1,000+ jobs across ${CAM_INDUSTRY_COUNT} industries`;

export function jobBlurb(job: string, industry: string): string {
  return `${job} — specialised work in ${industry}. Look the name up to learn how people get in.`;
}
