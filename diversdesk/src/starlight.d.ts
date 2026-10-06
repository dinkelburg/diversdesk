/// <reference types="@astrojs/starlight" />

declare namespace App {
  interface Locals {
    starlightRoute: import("@astrojs/starlight/route-data").StarlightRouteData;
    docsAudience?: import("./lib/docs/audiences").DocAudience;
  }
}
