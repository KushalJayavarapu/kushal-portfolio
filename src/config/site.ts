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
  section: string;
}

// The site is one page: each item jumps to a section of the home page.
// `section` is that section's id (the header uses it to mark where you are).
export const NAV: NavItem[] = [
  { label: 'Projects', href: '/#projects', section: 'projects' },
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Writing', href: '/#writing', section: 'writing' },
  { label: 'Contact', href: '/#contact', section: 'contact' },
];

// Email is intentionally absent: the brief forbids a plain-text mailto in the
// HTML source. The Contact thread adds an obfuscated reveal.
export const SOCIAL = {
  github: 'https://github.com/KushalJayavarapu',
  linkedin: 'https://www.linkedin.com/in/kushaljayavarapu/',
} as const;
