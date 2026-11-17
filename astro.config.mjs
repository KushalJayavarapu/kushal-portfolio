// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync } from 'node:fs';

// Self-hosted, latin-subset woff2 files live in src/assets/fonts (all SIL OFL 1.1).
// Astro's Fonts API emits the @font-face rules, preload links and metric-matched
// fallbacks (which keeps font swaps from shifting layout).
const font = (/** @type {string} */ file) => `./src/assets/fonts/${file}`;

// The production origin. Canonical URLs, Open Graph URLs, JSON-LD, the sitemap and
// robots.txt all derive from this one value (via `Astro.site`).
// Hosted on Cloudflare Pages (see README "Deploy"). This must match the Pages
// project's production hostname (Cloudflare added the -a3p suffix because the
// bare name was taken); change it here if a custom domain is added.
const SITE_URL = 'https://kushal-portfolio-a3p.pages.dev';

// The site is a single page now. Addresses from the old multi-page layout
// forward to the matching section (or project sheet) so shared links keep working.
const projectRedirects = Object.fromEntries(
  readdirSync('./src/content/projects')
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ''))
    .map((slug) => [`/projects/${slug}`, `/#${slug}`]),
);

export default defineConfig({
  site: SITE_URL,
  redirects: {
    '/projects': '/#projects',
    '/about': '/#about',
    '/contact': '/#contact',
    ...projectRedirects,
  },
  output: 'static',
  // The whole stylesheet is a few KB; inlining it removes the only render-blocking request.
  build: { inlineStylesheets: 'always' },
  integrations: [mdx(), sitemap()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [{ src: [font('fraunces-latin-var.woff2')], weight: '100 900', style: 'normal' }],
      },
    },
    {
      // Stand-in handwriting for margin notes until Kushal's own is traced to SVG.
      provider: fontProviders.local(),
      name: 'Caveat',
      cssVariable: '--font-hand',
      fallbacks: ['cursive'],
      options: {
        variants: [{ src: [font('caveat-latin-600.woff2')], weight: 600, style: 'normal' }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-body',
      fallbacks: ['sans-serif'],
      options: {
        variants: [{ src: [font('inter-latin-var.woff2')], weight: '400 700', style: 'normal' }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      fallbacks: ['monospace'],
      options: {
        variants: [
          { src: [font('jetbrains-mono-latin-var.woff2')], weight: '400 700', style: 'normal' },
        ],
      },
    },
  ],
});
