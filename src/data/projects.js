/**
 * Projects data for the portfolio.
 *
 * Schema:
 * {
 *   id: string               — unique slug
 *   name: string             — project title
 *   description: string      — short one-liner (card)
 *   category: string         — must match one of CATEGORIES below
 *   thumbnail: string        — path to thumbnail image (relative to /public)
 *   techStack: string[]      — technologies used
 *   liveUrl: string          — live demo URL (optional, empty hides button)
 *   sourceUrl: string        — source code URL (optional, empty hides button)
 *   details: {
 *     overview: string       — longer description
 *     problem: string        — problem statement
 *     solution: string       — solution description
 *     features: string[]     — key features
 *     screenshots: string[]  — paths to screenshot images
 *     teamContributions: string[] — team member contributions
 *   }
 * }
 */

export const CATEGORIES = [
  'All',
  'Websites & Web Apps',
  'E-commerce',
  'Logo & Branding',
  'UI/UX Design',
  'Open Source & Experimental',
];

const projects = [
  {
    id: 'placeholder-project-1',
    name: 'Placeholder Project (Web Analytics)',
    description: 'Real-time telemetry and user metrics platform concept with high-frequency charting.',
    category: 'Websites & Web Apps',
    thumbnail: '/images/projects/project-web-thumb.svg',
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'Vite'],
    liveUrl: '',
    sourceUrl: '',
    details: {
      overview:
        'This is a placeholder project entry demonstrating full-stack web application development. Replace this with a real project to showcase your work.',
      problem:
        'Organizations dealing with high-throughput event data often struggle with laggy visualizations and confusing navigation hierarchies.',
      solution:
        'Architected a low-latency dashboard using modern React state management, optimized SVG rendering, and a dark-first UI reducing cognitive load.',
      features: [
        'Real-time traffic throughput and latency graphs',
        'Multi-tenant permissions and role-based access',
        'Customizable metric widget arrangement',
        'Automated scheduled report generation in PDF/CSV',
      ],
      screenshots: [
        '/images/projects/project-web-thumb.svg',
        '/images/projects/project-web-preview.svg',
      ],
      teamContributions: [
        'Lead Developer — React architecture & state pipeline',
        'UI/UX Designer — Information architecture & wireframing',
      ],
    },
  },
  {
    id: 'placeholder-project-2',
    name: 'Placeholder Project (Mobile Banking UI)',
    description: 'Intuitive mobile wallet and card management interface with biometric authentication.',
    category: 'UI/UX Design',
    thumbnail: '/images/projects/project-uiux-thumb.svg',
    techStack: ['Figma', 'Prototyping', 'Design Systems', 'Micro-interactions'],
    liveUrl: '',
    sourceUrl: '',
    details: {
      overview:
        'This is a placeholder project entry demonstrating digital product and interaction design. Replace this with your team’s custom work.',
      problem:
        'Traditional banking mobile apps feel cluttered, visually intimidating, and confusing for everyday transactions.',
      solution:
        'Created a clean, card-centric interaction model with clear visual hierarchy, accessible touch targets, and frictionless instant transfers.',
      features: [
        'Single-swipe instant money transfer between accounts',
        'Virtual card locking and spend-limit controls',
        'Automated categorization of recurring subscription charges',
        'High contrast WCAG AAA accessibility mode',
      ],
      screenshots: [
        '/images/projects/project-uiux-thumb.svg',
        '/images/projects/project-uiux-preview.svg',
      ],
      teamContributions: [
        'Lead Designer — Visual identity & mobile component system',
        'User Researcher — Persona development & usability testing',
      ],
    },
  },
  {
    id: 'placeholder-project-3',
    name: 'Placeholder Project (Brand Identity)',
    description: 'Geometric brand identity, typography hierarchy, and corporate design system.',
    category: 'Logo & Branding',
    thumbnail: '/images/projects/project-branding-thumb.svg',
    techStack: ['Illustrator', 'Typography', 'Brand Guidelines', 'Collateral'],
    liveUrl: '',
    sourceUrl: '',
    details: {
      overview:
        'This is a placeholder project entry demonstrating logo design and comprehensive brand identity systems.',
      problem:
        'Technology studios frequently suffer from fragmented visual assets and lack of recognizable brand consistency across touchpoints.',
      solution:
        'Developed a distinctive mark anchored by clean mathematical grid rules, paired with modern type specimens and versatile lockups.',
      features: [
        'Scalable SVG logo mark with responsive lockup configurations',
        'Strict typography scale based on Space Grotesk and Inter',
        'Comprehensive color token guidelines for digital & physical media',
        'Print-ready stationery, packaging, and digital swag mockups',
      ],
      screenshots: [
        '/images/projects/project-branding-thumb.svg',
        '/images/projects/project-branding-preview.svg',
      ],
      teamContributions: [
        'Brand Strategist — Brand positioning & core narrative',
        'Creative Director — Logo mark construction & vector iconography',
      ],
    },
  },
  {
    id: 'placeholder-project-4',
    name: 'Placeholder Project (Boutique Store)',
    description: 'Minimalist headless e-commerce experience with sub-second page transitions.',
    category: 'E-commerce',
    thumbnail: '/images/projects/project-ecommerce-thumb.svg',
    techStack: ['React', 'Tailwind CSS', 'Stripe', 'Headless CMS'],
    liveUrl: '',
    sourceUrl: '',
    details: {
      overview:
        'This is a placeholder project entry demonstrating bespoke e-commerce store development and checkout optimization.',
      problem:
        'Standard e-commerce platforms suffer from bloated scripts, slow load times, and abandoned shopping carts.',
      solution:
        'Engineered a lightweight, static-first storefront connected to a unified checkout engine with zero layout shift.',
      features: [
        'Slide-over cart with live inventory calculation',
        'Instant search with predictive product suggestions',
        'Multi-currency automated localization',
        'One-click guest checkout integration',
      ],
      screenshots: [
        '/images/projects/project-ecommerce-thumb.svg',
      ],
      teamContributions: [
        'Full-Stack Developer — Storefront & Stripe checkout integration',
        'Designer — Product catalog layout & checkout UX',
      ],
    },
  },
];

export default projects;
