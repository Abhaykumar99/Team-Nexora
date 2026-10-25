/**
 * Services offered by Team Nexora.
 * Each service maps to a lucide-react icon name.
 */
const services = [
  {
    id: 'web-dev',
    icon: 'Globe',
    title: 'Website Development',
    description:
      'Custom, responsive websites built with modern technologies. From landing pages to complex multi-page sites — fast, accessible, and optimized for every device.',
    bestFor: 'Startups & local businesses that need a site that sells, not just exists.',
    includes: ['Mobile-first, fast on every phone', 'Built to rank on Google (SEO basics in)', 'Easy for you to update'],
  },
  {
    id: 'web-apps',
    icon: 'AppWindow',
    title: 'Full-Stack Web Applications',
    description:
      'Scalable web applications with robust backends and intuitive frontends. We handle the full stack so your product works seamlessly end to end.',
    bestFor: 'Teams replacing spreadsheets & manual work with one smooth tool.',
    includes: ['Login, roles & dashboards included', 'Scales as your users grow', 'Clean APIs your future devs will thank you for'],
  },
  {
    id: 'ecommerce',
    icon: 'ShoppingCart',
    title: 'E-commerce Development',
    description:
      'Online stores designed to convert. Secure payment integration, inventory management, and a smooth checkout experience for your customers.',
    bestFor: 'Shops that want more checkouts, fewer abandoned carts.',
    includes: ['Secure payments (cards, UPI & more)', 'Simple product & order management', 'Checkout designed to convert'],
  },
  {
    id: 'uiux',
    icon: 'Palette',
    title: 'UI/UX Design',
    description:
      'User-centered design that looks great and works even better. We craft interfaces that are intuitive, engaging, and grounded in real user needs.',
    bestFor: 'Products that feel confusing today and need to feel effortless.',
    includes: ['Research-backed, not guesswork', 'Clickable prototype before we build', 'Design system your team can reuse'],
  },
  {
    id: 'branding',
    icon: 'PenTool',
    title: 'Logo & Brand Identity',
    description:
      'Distinctive logos and cohesive brand systems that communicate who you are. Visual identity that leaves a lasting impression.',
    bestFor: 'New businesses — or old ones that no longer look like themselves.',
    includes: ['Logo suite for print, web & social', 'Colours & fonts that stay consistent', 'A mini brand guide you\'ll actually use'],
  },
  {
    id: 'maintenance',
    icon: 'Wrench',
    title: 'Website Maintenance & Optimization',
    description:
      'Keep your site running at peak performance. Regular updates, security patches, speed optimization, and ongoing technical support.',
    bestFor: 'Busy owners who want the site handled, quietly and reliably.',
    includes: ['Updates & security patches done for you', 'Speed checks and fixes', 'Friendly support when something breaks'],
  },
];

export default services;
