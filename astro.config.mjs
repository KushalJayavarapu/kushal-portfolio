// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';

// Self-hosted, latin-subset woff2 files live in src/assets/fonts (all SIL OFL 1.1).
// Astro's Fonts API emits the @font-face rules, preload links and metric-matched
// fallbacks (which keeps font swaps from shifting layout).
const font = (/** @type {string} */ file) => `./src/assets/fonts/${file}`;

export default defineConfig({
  // TODO(T5/T6): set `site` once the domain/host is decided; canonical URLs,
  // sitemap and RSS depend on it.
  output: 'static',
  // The whole stylesheet is a few KB; inlining it removes the only render-blocking request.
  build: { inlineStylesheets: 'always' },
  integrations: [mdx()],
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
