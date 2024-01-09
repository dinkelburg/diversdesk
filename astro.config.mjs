import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    logo: {
      src: './src/assets/app icon.svg'
    },
    title: 'DD Knowledge Base',
    social: {
      github: 'https://github.com/withastro/starlight'
    },
    sidebar: [
    {
      label: 'Introduction',
      link: '/introduction'
    }, 
    {
      label: 'Quick Start Guide',
      link: '/quick_start_guide'
    }, 
    {
      label: 'User Manual',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Login, Users and Rights',
        link: '/user_manual/login/'
      },
      {
        label: 'Customer Onboarding Methods',
        link: '/user_manual/customer_onboarding/'
      }]
    }, {
      label: 'Articles',
      autogenerate: 
      {
        directory: 'articles'
      }
    }]
  }), tailwind()]
});