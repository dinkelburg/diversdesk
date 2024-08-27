// tailwind.config.js
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/preline/preline.js", // Include any other paths where Tailwind should look for classes
  ],
  darkMode: "class", // Enable dark mode if needed
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000000",
        white: "#ffffff",
        gray: colors.gray,
        indigo: colors.indigo,
        neutral: colors.neutral,
        yellow: {
          50: "#fefce8",
          100: "#fef9c3",
          400: "#facc15",
          500: "#eab308",
        },
        orange: {
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#FF7557",
          400: "#F86545",
          500: "#e14d0b",
          600: "#FF3D00",
        },
        red: colors.red,
        zinc: colors.zinc,
      },
      
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.orange.500'),
              '&:hover': {
                color: theme('colors.orange.600'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.orange.400'),
              '&:hover': {
                color: theme('colors.orange.500'),
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            blockquote: {
              color: theme('colors.gray.400'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss/nesting"),
    require("preline/plugin"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"), // Ensuring the Typography plugin is included
    // Add any other plugins you're using
  ],
};

