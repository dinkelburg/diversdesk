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
    domains: ["images.unsplash.com"]
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    fallback: {
      fr: "en"
    },
    routing: {
      prefixDefaultLocale: false
    }
  },
  prefetch: true,
  integrations: [tailwind(), sitemap({
    i18n: {
      defaultLocale: "en",
      // All URLs that don't contain `fr` after `https://diversdesk.com/` will be treated as default locale, i.e. `en`
      locales: {
        en: "en",
        // The `defaultLocale` value must present in `locales` keys
        fr: "fr"
      }
    }
  }), starlight({
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
    // social: {
    //   github: "https://github.com/mearashadowfax/ScrewFast",
    // },
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
  adapter: vercel({
    edgeMiddleware: true
  })
});