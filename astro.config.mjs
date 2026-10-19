// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Self-hosted, latin-subset woff2 files live in src/assets/fonts (all SIL OFL 1.1).
// Astro's Fonts API emits the @font-face rules, preload links and metric-matched
// fallbacks (which keeps font swaps from shifting layout).
const font = (/** @type {string} */ file) => `./src/assets/fonts/${file}`;

// The production origin. Canonical URLs, Open Graph URLs, JSON-LD, the sitemap and
// robots.txt all derive from this one value (via `Astro.site`).
// TODO(T6): the custom domain is undecided; this is the expected Cloudflare
// default hostname. Change it here once the domain is chosen.
const SITE_URL = 'https://kushal-portfolio.pages.dev';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  // The whole stylesheet is a few KB; inlining it removes the only render-blocking request.
  build: { inlineStylesheets: 'always' },
  integrations: [mdx(), sitemap()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Archivo Black',
      cssVariable: '--font-display',
      fallbacks: ['Arial Black', 'sans-serif'],
      options: {
        variants: [{ src: [font('archivo-black-latin.woff2')], weight: 400, style: 'normal' }],
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
