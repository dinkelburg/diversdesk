import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "Diversdesk",
  tagline: "Intutitive Dive Center Management Software",
  description: "Diversdesk offers state of the art Dive Center Management Software. Contact our sales team for fitting solution for your business.",
  description_short: "Intuitive Dive Center Management Software by Diversdesk.",
  url: "https://www.diversdesk.com",
  author: "Bart Klein Goldewijk",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: : Intuitive Dive Center Management Software`,
  description: "Streamline your Dive Center with Diversdesk's intuitive and feature rich software. Diversdesk offers solutions for planning and scheduling, paperless customer onboarding including official waivers and diver medical, custom waiver creation, Staff calendars and workload and more..",
  image: ogImageSrc,
};
