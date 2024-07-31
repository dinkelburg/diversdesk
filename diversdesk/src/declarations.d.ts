declare module "*.mdx" {
  import { ComponentType } from "react";
  const attributes: Record<string, any>;
  const defaultExport: ComponentType<any>;
  export { attributes };
  export default defaultExport;
}
  