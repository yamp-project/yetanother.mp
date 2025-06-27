declare module "gsap/ScrollSmoother" {
  import { Plugin } from "gsap";
  const ScrollSmoother: Plugin & {
    create(options?: Record<string, unknown>): any;
    get(): any | undefined;
  };
  export default ScrollSmoother;
} 