import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    favicon: './favicon.svg',
    head: [{
      tag: 'link',
      attrs: {
        rel: 'apple-touch-icon',
        href: './favicon.ico',
        sizes: '32x32'
      }
    }],
    logo: {
      light: './src/assets/DiversDesk_Logo_Day.svg',
      dark: './src/assets/DiversDesk_Logo_Night.svg'
    },
    title: '',
    // social: {
    //   github: 'https://github.com/withastro/starlight'
    // },
    sidebar: [{
      label: 'Introduction',
      link: '/introduction'
    }, {
      label: 'Quickstart Guide',
      link: '/quickstart_guide'
    }, 
    {
      label: 'User Manual',
      items: 
      [
        // Each item here is one entry in the navigation menu.
        {
          label: 'Login to your account',
          link: '/user_manual/login/'
        }, 
        {
          label: 'Menu and navigation',
          link: '/user_manual/menu_and_navigation/'
        }, 
        {
          label: 'Users and rights',
          link: '/user_manual/users_and_rights/'
        }, 
        {
          label: 'Booking and scheduling',
          link: '/user_manual/booking_and_scheduling/'
        }, 
        {
          label: 'Customer onboarding methods',
          link: '/user_manual/customer_onboarding/'
        }, 
        {
          label: 'Customer base',
          link: '/user_manual/customer_base/'
        }
      ]
    }, 
    {
      label: 'Articles',
      // autogenerate: 
      // {
      //  directory: 'articles'
      // }, 
      items:
      [
        {
          label: 'Add an icon to your mobile homescreen',
          link: '/articles/add_to_homescreen'
        },
        {
          label: 'Create a custom registration form',
          link: '/articles/custom_registration_form'
        },
        {
          label: 'Adding dives to an ongoing activity',
          link: 'articles/adding_dives_to_an_ongoing_activity',
          badge: 'new'
        }
      ]
    },
    {
      label: 'Updates',
      items: 
      [
      {
        label: 'Update report 26 Feb 2024',
        link: '/updates/240226_update_report',
        badge: 'new'
      }
    ]
    }]
  }), tailwind(), markdoc()]
});