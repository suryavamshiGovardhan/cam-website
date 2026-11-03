import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ARTWORKS, type ArtName } from "./artworks";
import "./art.css";

/**
 * Brand-coloured animated SVG illustration.
 * - plays only while in view (pauses offscreen)
 * - renders a static frame when the visitor prefers reduced motion
 * - all motion is transform/opacity only
 */
export default function TopicArt({
  name,
  className = "",
  label = "Decorative CAM illustration",
}: {
  name: ArtName;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "140px 0px 140px 0px" });
  const reduced = useReducedMotion();
  const Art = ARTWORKS[name];

  return (
    <div
      ref={ref}
      className={`cam-art ${className}`}
      data-active={inView && !reduced ? "true" : "false"}
      data-reduced={reduced ? "true" : "false"}
      role="img"
      aria-label={label}
    >
      <Art />
    </div>
  );
}
