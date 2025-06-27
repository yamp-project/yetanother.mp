import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// ScrollSmoother is a Club GreenSock plugin. If it's not present in your node_modules,
// comment out the import below or ensure you have access.
// eslint-disable-next-line import/no-unresolved
import ScrollSmoother from "gsap/ScrollSmoother";

// Register GSAP plugins once. Calling registerPlugin repeatedly is safe – GSAP ignores duplicates.
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * Composable helper so components can access the same gsap instance & plugins
 */
export function useGsap() {
  return {
    gsap,
    ScrollTrigger,
    ScrollSmoother,
  } as const;
} 