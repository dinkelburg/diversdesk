import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import mdx from '@astrojs/mdx'; // Import MDX integration
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.diversdesk.com',
  image: {
    domains: ['images.unsplash.com'], 
  },  
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap({
      // Enhanced filter to exclude unwanted pages
      filter: (page) => !(
        page.includes('/signup/form/error') ||
        page.includes('/signup/form/success') ||
        page.includes('/signup/trial/error') ||
        page.includes('/signup/trial/success') ||
        page.includes('/welcome-to-docs') ||
        page.includes('/user_manual') ||
        page.includes('/quickstart_guide') ||
        page.includes('/articles') ||
        page.includes('/video_training') ||
        page.includes('/support') ||
        page.includes('/updates') ||
        page.includes('/work_in_progress') ||
        page.includes('/terms-conditions') ||
        page.includes('/privacy-policy')
      ),
    }),
    starlight({
    plugins: [starlightImageZoom()],
    title: 'Diversdesk Docs',
    defaultLocale: "root",
    sidebar: [{
      label: 'Quick Start Guide',
      link: '/quickstart_guide'
    }, {
      label: 'User Manual',
      autogenerate: {
        directory: "user_manual"
      }
    }, {
      label: 'Articles',
      autogenerate: {
        directory: "articles"
      }
    }, {
      label: 'Video Training',
      link: '/video_training'
    }],
    disable404Route: true,
    customCss: ['./src/styles/starlight.css'],
    favicon: '/favicon.ico',
    components: {
      SiteTitle: './src/components/ui/starlight/SiteTitle.astro',
      Head: './src/components/ui/starlight/Head.astro'
    },
    head: [{
      tag: 'meta',
      attrs: {
        property: 'og:image',
        content: 'https://diversdesk.com/Laptop-and-phone-diversdesk.webp'
      }
    }, {
      tag: 'meta',
      attrs: {
        property: 'twitter:image',
        content: 'https://diversdesk.com/Laptop-and-phone-diversdesk.webp'
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
  output: 'hybrid',
  experimental: {
    clientPrerender: true,
    directRenderScript: true
  },
  adapter: vercel()
});