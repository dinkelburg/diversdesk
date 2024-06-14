// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  //{ name: "About", url: "/products" },
  { name: "Pricing", url: "/pricing" },
 // { name: "Blog", url: "/blog" },
  { name: "Contact", url: "/contact" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "Support",
    links: [
      { name: "Documentation", url: "/welcome-to-docs/" },  
      { name: "FAQ", url: "/products" },
      // { name: "Contact", url: "/services" },
    ],
  },
  {
    section: "Company",
    links: [
      { name: "About us", url: "#" },
      // { name: "Blog", url: "/blog" },
      { name: "Careers", url: "#" },
      { name: "Contact", url: "#" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  // facebook: "https://www.facebook.com/",
  // x: "https://twitter.com/",
  // github: "https://github.com/mearashadowfax/Diversdesk",
  // google: "https://www.google.com/",
  // slack: "https://slack.com/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};