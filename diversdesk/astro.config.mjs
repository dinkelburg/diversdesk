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
    "/articles/add_to_homescreen": "/faq/mobile-homescreen-icon",
    "/faq/add_to_homescreen": "/faq/mobile-homescreen-icon",
    "/faq/mobile_homescreen_icon": "/faq/mobile-homescreen-icon",
    "/quickstart_guide": "/getting-started/quickstart-guide",
    "/user_manual/brief_introduction": "/getting-started/brief-introduction",
    "/user_manual/login": "/getting-started/sign-up-or-login",
    "/getting-started/login": "/getting-started/sign-up-or-login",
    "/user_manual/setup_your_environment": "/getting-started/setup-your-environment",
    "/user_manual/menu_and_navigation": "/getting-started/menu-and-navigation",
    "/user_manual/discount-calculator": "/features-resources/discount-calculator",
    "/articles/direct_bookings": "/features-resources/direct-bookings",
    "/articles/website_iframe_integration": "/features-resources/website-iframe-integration",
    "/articles/custom_registration_form": "/features-resources/custom-registration-form",
    "/articles/custom_waiver": "/features-resources/custom-waiver",
    "/articles/waiver_terms": "/features-resources/waiver-terms",
    "/articles/waiver_cheatsheet": "/features-resources/waiver-cheatsheet",
    "/articles/tags": "/features-resources/tags",
    "/articles/connecting-quickbooks": "/features-resources/connecting-quickbooks",
    "/user_manual/add-ons": "/features-resources/add-ons",
    "/user_manual/tanks_and_blends": "/features-resources/tanks-and-blends",
    "/user_manual/registration_methods": "/workflows/registration-methods",
    "/user_manual/creating_onboarding_journeys": "/workflows/creating-onboarding-journeys",
    "/articles/adding_dives_to_an_ongoing_activity": "/workflows/adding-dives-to-an-ongoing-activity",
    "/video_training": "/video-training/video-training",
    "/user_manual/retail": "/user_manual/retail-pos/retail-stock",
    "/user_manual/customer_base": "/user_manual/customers",
    "/user_manual/users_and_rights": "/user_manual/staff/permissions",
    "/new_booking_page": "/user_manual/bookings",
    "/user_manual/booking_and_scheduling": "/user_manual/activities/planner",
    "/user_manual/day_manifest": "/user_manual/activities/day-manifest",
    "/user_manual/pricing": "/user_manual/activities/pricing",
    "/user_manual/activities_webshop": "/user_manual/activities/webshop",
    "/user_manual/accommodation_calendar": "/user_manual/accommodation/calendar",
    "/user_manual/accommodation_webshop": "/user_manual/accommodation/webshop",
    "/user_manual/rental_items": "/user_manual/rentals/rental-items",
    "/user_manual/rental_overview": "/user_manual/rentals/rental-overview",
    "/user_manual/retail_stock": "/user_manual/retail-pos/retail-stock",
    "/user_manual/retail_pos_webshop": "/user_manual/retail-pos/webshop",
    "/user_manual/metrics": "/user_manual/reporting/metrics",
    "/user_manual/sales": "/user_manual/reporting/sales",
    "/user_manual/payments": "/user_manual/reporting/payments",
    "/user_manual/workload": "/user_manual/staff/workload",
    "/user_manual/permissions": "/user_manual/staff/permissions",
    "/updates/2026-06-29-booking-workflow-improvements": "/updates/2026-06-29-refunds-handling"
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
        page.includes('/getting-started') ||
        page.includes('/features-resources') ||
        page.includes('/workflows') ||
        page.includes('/video-training') ||
        page.includes('/faq') ||
        page.includes('/support') ||
        page.includes('/updates') ||
        page.includes('/new') ||
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
          'getting-started/quickstart-guide',
          'getting-started/brief-introduction',
          'getting-started/sign-up-or-login',
          'getting-started/setup-your-environment',
          'getting-started/menu-and-navigation',
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
                slug: 'user_manual/activities/planner'
              },
              {
                label: 'Planner Beta',
                slug: 'user_manual/activities/beta-planner',
                badge: 'New'
              },
              {
                label: 'Day Manifest',
                slug: 'user_manual/activities/day-manifest'
              },
              {
                label: 'Pricing',
                slug: 'user_manual/activities/pricing'
              },
              {
                label: 'Webshop',
                slug: 'user_manual/activities/webshop'
              },
            ]
          },
          {
            label: 'Accommodation',
            collapsed: false,
            items: [
              {
                label: 'Calendar',
                slug: 'user_manual/accommodation/calendar'
              },
              {
                label: 'Webshop',
                slug: 'user_manual/accommodation/webshop'
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
                slug: 'user_manual/rentals/rental-items'
              },
              {
                label: 'Rental Overview',
                slug: 'user_manual/rentals/rental-overview'
              },
            ]
          },
          {
            label: 'Retail POS',
            collapsed: false,
            items: [
              {
                label: 'Retail Stock',
                slug: 'user_manual/retail-pos/retail-stock'
              },
              {
                label: 'Webshop',
                slug: 'user_manual/retail-pos/webshop'
              },
            ]
          },
          {
            label: 'Reporting',
            collapsed: false,
            items: [
              {
                label: 'Metrics',
                slug: 'user_manual/reporting/metrics'
              },
              {
                label: 'Sales',
                slug: 'user_manual/reporting/sales'
              },
              {
                label: 'Payments',
                slug: 'user_manual/reporting/payments'
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
                slug: 'user_manual/staff/workload'
              },
              {
                label: 'Permissions',
                slug: 'user_manual/staff/permissions'
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
          'features-resources/discount-calculator',
          'features-resources/direct-bookings',
          'features-resources/website-iframe-integration',
          'features-resources/custom-registration-form',
          'features-resources/custom-waiver',
          'features-resources/waiver-terms',
          'features-resources/waiver-cheatsheet',
          'features-resources/tags',
          'features-resources/connecting-quickbooks',
          'features-resources/add-ons',
          'features-resources/tanks-and-blends',
          'features-resources/registration-page',
        ]
      },
      {
        label: 'Workflows',
        collapsed: true,
        items: [
          {
            label: 'Create and Configure Activities',
            slug: 'user_manual/activities/activity-setup'
          },
          'workflows/registration-methods',
          'workflows/creating-onboarding-journeys',
          'workflows/adding-dives-to-an-ongoing-activity',
        ]
      },
      {
        label: 'Video Training',
        collapsed: true,
        items: [
          'video-training/video-training',
        ]
      },
      {
        label: 'FAQ & Troubleshooting',
        collapsed: true,
        items: [
          'faq/mobile-homescreen-icon',
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
      Search: './src/components/ui/starlight/AiSearch.astro',
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
