// Build-time social preview images (1200x630 PNG) for project and post pages.
// satori lays out the card and turns text into SVG paths; resvg rasterises it.
// Other pages use the static public/og/default.png (source: scripts/og/default.html),
// which this card's frame matches.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../config/site';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Path of a generated card, e.g. ogImagePath('projects', 'attest') -> /og/projects/attest.png */
export const ogImagePath = (section: 'projects' | 'writing', id: string) =>
  `/og/${section}/${id}.png`;

export interface OgCard {
  /** Mono eyebrow on the top-right tag, e.g. "Project". */
  eyebrow: string;
  title: string;
  description: string;
}

// satori needs TTF/OTF/WOFF (not woff2) and static instances, so these are
// static TTF copies of the site's fonts (see src/assets/fonts/README.md).
// Paths are relative to the project root, where `astro build` runs.
const fontFile = (file: string) => readFile(join(process.cwd(), 'src/assets/fonts/og', file));
let fonts: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all([
    fontFile('archivo-black-latin.ttf'),
    fontFile('inter-latin-400.ttf'),
    fontFile('jetbrains-mono-latin-700.ttf'),
  ]).then(([display, body, mono]) => [
    { name: 'Archivo Black', data: display, weight: 400, style: 'normal' },
    { name: 'Inter', data: body, weight: 400, style: 'normal' },
    { name: 'JetBrains Mono', data: mono, weight: 700, style: 'normal' },
  ]));

// Satori renders outside the page, so CSS variables are unavailable. These
// mirror src/styles/tokens.css; keep them in sync.
const C = {
  bg: '#f5efe0',
  surface: '#fffaf0',
  ink: '#1a1a1a',
  muted: '#4a4a4a',
  coral: '#ff5a3c',
  yellow: '#f0c040',
};

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

const titleSize = (title: string) => (title.length <= 18 ? 92 : title.length <= 34 ? 72 : 56);

function card({ eyebrow, title, description }: OgCard): Node {
  const tag = (text: string, bg: string) =>
    h(
      'div',
      {
        display: 'flex',
        fontFamily: 'JetBrains Mono',
        fontSize: 18,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        background: bg,
        border: `3px solid ${C.ink}`,
        padding: '8px 14px',
      },
      text,
    );

  return h(
    'div',
    { display: 'flex', width: OG_WIDTH, height: OG_HEIGHT, background: C.bg, padding: '56px 64px' },
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // Same frame as the default image: page padding, with the shadow in the right/bottom gutter.
        width: OG_WIDTH - 128,
        height: OG_HEIGHT - 112,
        boxSizing: 'border-box',
        background: C.surface,
        border: `4px solid ${C.ink}`,
        boxShadow: `14px 14px 0 ${C.ink}`,
        padding: '48px 56px',
        color: C.ink,
      },
      [
        h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, [
          h(
            'div',
            {
              display: 'flex',
              fontFamily: 'Archivo Black',
              fontSize: 34,
              background: C.coral,
              border: `4px solid ${C.ink}`,
              boxShadow: `5px 5px 0 ${C.ink}`,
              padding: '4px 12px',
            },
            SITE.wordmark,
          ),
          tag(eyebrow, C.yellow),
        ]),
        h('div', { display: 'flex', flexDirection: 'column', gap: 20 }, [
          h(
            'div',
            {
              fontFamily: 'Archivo Black',
              fontSize: titleSize(title),
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              lineClamp: 2,
            },
            title,
          ),
          h(
            'div',
            { fontFamily: 'Inter', fontSize: 28, lineHeight: 1.4, color: C.muted, lineClamp: 2 },
            description,
          ),
        ]),
        h(
          'div',
          {
            display: 'flex',
            fontFamily: 'JetBrains Mono',
            fontSize: 20,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          },
          SITE.name,
        ),
      ],
    ),
  );
}

export async function renderOgImage(input: OgCard): Promise<Uint8Array> {
  const svg = await satori(card(input) as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: await loadFonts(),
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
}
