import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import starlightImageZoom from 'starlight-image-zoom';
import mdx from '@astrojs/mdx'; // Import MDX integration
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: "https://diversdesk.com",
  image: {
    domains: ["images.unsplash.com"], 
  },  
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap({
      customPages: [
        "https://diversdesk.com/features", // Add missing pages
      ],
      filter: (page) => !page.includes("/user_manual") &&
                        !page.includes("/quickstart_guide") &&
                        !page.includes("/articles") &&
                        !page.includes("/video_training")&&
                        !page.includes("/support")&&
                        !page.includes("/updates")&&
                        !page.includes("/work_in_progress")&&
                        !page.includes("/welcome_to_docs"),
    }),
    starlight({
    plugins: [starlightImageZoom()],
    title: "Diversdesk Docs",
    defaultLocale: "root",
    // locales: {
    //   root: {
    //     label: "English",  
    //     lang: "en",
    //   },
    //   de: { label: "Deutsch", lang: "de" },
    //   es: { label: "Español", lang: "es" },
    //   fa: { label: "Persian", lang: "fa", dir: "rtl" },
    //   fr: { label: "Français", lang: "fr" },
    //   ja: { label: "日本語", lang: "ja" },
    //   "zh-cn": { label: "简体中文", lang: "zh-CN" },
    // },
    // https://starlight.astro.build/guides/sidebar/
    sidebar: [{
      label: "Quick Start Guide",
      link: '/quickstart_guide'
      // translations: {
      //   de: "Schnellstartanleitungen",
      //   es: "Guías de Inicio Rápido",
      //   fa: "راهنمای شروع سریع",
      //   fr: "Guides de Démarrage Rapide",
      //   ja: "クイックスタートガイド",
      //   "zh-cn": "快速入门指南",
      // },
      // autogenerate: { directory: "guides" },
    }, {
      label: "User Manual",
      autogenerate: {
        directory: "user_manual"
      }
    }, {
      label: "Articles",
      autogenerate: {
        directory: "articles"
      }
    }, {
      label: "Video Training",
      link: '/video_training'
    }],
    disable404Route: true,
    customCss: ["./src/styles/starlight.css"],
    favicon: "/favicon.ico",
    components: {
      SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
      Head: "./src/components/ui/starlight/Head.astro"
    },
    head: [{
      tag: "meta",
      attrs: {
        property: "og:image",
        content: "https://diversdesk.com/social.webp"
      }
    }, {
      tag: "meta",
      attrs: {
        property: "twitter:image",
        content: "https://diversdesk.com/social.webp"
      }
    }]
  }), compressor({
    gzip: false,
    brotli: true
  }), mdx(), // Add MDX integration
  partytown({
    config: {
      forward: ['dataLayer.push'], // Forward Google Analytics events
    },
  }),
  ],
  output: "hybrid",
  experimental: {
    clientPrerender: true,
    directRenderScript: true
  },
  adapter: vercel()
});