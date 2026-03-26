declare module "*.mdx" {
  import { ComponentType } from "react";
  const attributes: Record<string, any>;
  const defaultExport: ComponentType<any>;
  export { attributes };
  export default defaultExport;
}

declare module "astro-seo";
declare module "astro-seo-schema";
declare module "swiper";
declare module "swiper/modules";

// Starlight component declarations
declare module "@astrojs/starlight/components/Head.astro" {
  const component: any;
  export default component;
}
  