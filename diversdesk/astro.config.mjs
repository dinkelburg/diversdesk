import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.diversdesk.com',

  redirects: {
    "/blog/en": "/blog/",
    "/blog/{post.slug}": "/blog/",
    "/blog/%7Bpost.slug%7D": "/blog/",
    "/blog/en/how-to-digitally-onboard-fun-divers": "/blog/en/blog1-how-to-digitally-onboard-fun-divers",
    "/blog/en/post-2": "/blog/en/blog2-digital-whiteboard-for-dive-centers",
    "/blog/en/post-3": "/blog/en/blog3-what-makes-the-most-flexible-planner-and-scheduler",
    "/blog/en/dive-center-bookkeeping": "/blog/en/blog4-dive-center-bookkeeping",
    "/blog/en/post-5": "/blog/en/blog5-best-software-digital-waivers",
    "/blog/en/post-6": "/blog/en/blog6-time-saving-tips-for-dive-centers",
    "/blog/en/post-7": "/blog/en/blog7-overcoming-change-fear-in-dive-centers",
    "/insights/insight-1": "/insights/insight1-environmental-impact-printed-paperwork-diving",
    "/insights/insight-2": "/insights/insight2-measures-to-protect-coral-reef",
    "/insights/insight-3": "/insights/insight3-2024-trends-diving-industry",
    "/insights/insight-4": "/insights/insight4-combating-plastic-polution",
    "/blog/en/top-features-in-dive-center-management-softward": "/blog/en/top-features-in-dive-center-management-software",
    "/insights/diversdesk-liveboard-subscription": "/insights/diversdesk-liveaboard-subscription",
    "/articles/add_to_homescreen": "/faq/mobile_homescreen_icon",
    "/faq/add_to_homescreen": "/faq/mobile_homescreen_icon",
    "/user_manual/retail": "/user_manual/retail_stock",
    "/user_manual/customer_base": "/user_manual/customers",
    "/user_manual/users_and_rights": "/user_manual/permissions"
  },
  
  image: {
    domains: ['images.unsplash.com'], 
  },  
  prefetch: false,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
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
    sidebar: [
      {
        label: 'Getting Started',
        collapsed: true,
        items: [
          'quickstart_guide',
          'user_manual/brief_introduction',
          'user_manual/login',
          'user_manual/setup_your_environment',
          'user_manual/menu_and_navigation',
        ]
      },
      {
        label: 'User Manual',
        collapsed: true,
        items: [
          {
            label: 'Activities',
            collapsed: false,
            items: [
              {
                label: 'Planner',
                slug: 'user_manual/booking_and_scheduling'
              },
              {
                label: 'Day Manifest',
                slug: 'user_manual/day_manifest'
              },
              {
                label: 'Pricing',
                slug: 'user_manual/pricing'
              },
              {
                label: 'Webshop',
                slug: 'user_manual/activities_webshop'
              },
            ]
          },
          {
            label: 'Accommodation',
            collapsed: false,
            items: [
              {
                label: 'Calendar',
                slug: 'user_manual/accommodation_calendar'
              },
              {
                label: 'Webshop',
                slug: 'user_manual/accommodation_webshop'
              },
            ]
          },
          {
            label: 'Bookings',
            slug: 'user_manual/bookings'
          },
          {
            label: 'Customers',
            slug: 'user_manual/customers'
          },
          {
            label: 'Rentals',
            collapsed: false,
            items: [
              {
                label: 'Rental Items',
                slug: 'user_manual/rental_items'
              },
              {
                label: 'Rental Overview',
                slug: 'user_manual/rental_overview'
              },
            ]
          },
          {
            label: 'Retail POS',
            collapsed: false,
            items: [
              {
                label: 'Retail Stock',
                slug: 'user_manual/retail_stock'
              },
              {
                label: 'Webshop',
                slug: 'user_manual/retail_pos_webshop'
              },
            ]
          },
          {
            label: 'Reporting',
            collapsed: false,
            items: [
              {
                label: 'Metrics',
                slug: 'user_manual/metrics'
              },
              {
                label: 'Sales',
                slug: 'user_manual/sales'
              },
              {
                label: 'Payments',
                slug: 'user_manual/payments'
              },
            ]
          },
          {
            label: 'Webshop',
            slug: 'user_manual/webshop'
          },
          {
            label: 'Staff',
            collapsed: false,
            items: [
              {
                label: 'Workload',
                slug: 'user_manual/workload'
              },
              {
                label: 'Permissions',
                slug: 'user_manual/permissions'
              },
            ]
          },
          {
            label: 'Settings',
            slug: 'user_manual/settings'
          },
        ]
      },
      {
        label: 'Features & Resources',
        collapsed: true,
        items: [
          'user_manual/discount-calculator',
          'articles/direct_bookings',
          'articles/website_iframe_integration',
          'articles/custom_registration_form',
          'articles/custom_waiver',
          'articles/waiver_terms',
          'articles/waiver_cheatsheet',
          'articles/tags',
          'articles/connecting-quickbooks',
          'user_manual/add-ons',
          'user_manual/tanks_and_blends',
          'new_booking_page',
        ]
      },
      {
        label: 'Workflows',
        collapsed: true,
        items: [
          'user_manual/registration_methods',
          'user_manual/creating_onboarding_journeys',
          'articles/adding_dives_to_an_ongoing_activity',
        ]
      },
      {
        label: 'Video Training',
        collapsed: true,
        items: [
          'video_training',
        ]
      },
      {
        label: 'FAQ & Troubleshooting',
        collapsed: true,
        items: [
          'faq/mobile_homescreen_icon',
        ]
      },
      {
        label: 'Updates',
        collapsed: true,
        autogenerate: {
          directory: 'updates'
        }
      },
    ],
    disable404Route: true,
    customCss: ['./src/styles/starlight.css'],
    favicon: '/favicon.ico',
    components: {
      Head: './src/components/ui/starlight/Head.astro',
      SiteTitle: './src/components/ui/starlight/SiteTitle.astro'
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
  }), mdx(),
  ],
  adapter: vercel(),
  security: {
    checkOrigin: false,
  },
});