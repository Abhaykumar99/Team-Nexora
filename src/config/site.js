/**
 * Site-wide configuration.
 * Only fill in values you actually have — empty strings will be hidden in the UI.
 */
const siteConfig = {
  name: 'Team Nexora',
  tagline: 'Digital Studio',
  description:
    'We build digital experiences that move businesses forward. From websites and web applications to creative digital solutions.',

  // Contact — leave empty to hide in UI
  email: '',
  whatsapp: '', // international format, e.g. '+919876543210'
  phone: '',

  // Social links — only rendered when non-empty
  social: {
    github: '',
    linkedin: '',
    twitter: '',
    instagram: '',
  },

  // Form endpoint (Formspree, Web3Forms, EmailJS, etc.)
  // Prefer VITE_FORM_ENDPOINT env variable; fallback here
  formEndpoint: '',

  // Navigation
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Our Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Our Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ],
};

export default siteConfig;
