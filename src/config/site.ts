// Site-wide constants. Every value here traces to docs/content-brief.md.

export const SITE = {
  name: 'Kushal Jayavarapu',
  wordmark: 'KJ',
  description:
    'Computer science student building AI and data systems, from LLM-agent robustness research to hackathon prototypes.',
  locale: 'en',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

// Routes are built by the page threads (T2 Home/About, T3 Projects, T4 Writing).
export const NAV: NavItem[] = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Writing', href: '/writing/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

// Email is intentionally absent: the brief forbids a plain-text mailto in the
// HTML source. The Contact thread adds an obfuscated reveal.
export const SOCIAL = {
  github: 'https://github.com/KushalJayavarapu',
  linkedin: 'https://www.linkedin.com/in/kushaljayavarapu/',
} as const;
