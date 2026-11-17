# Fonts

Latin-subset woff2 files, self-hosted and wired up through Astro's Fonts API (`astro.config.mjs`).
All are licensed under the SIL Open Font License 1.1.

| File | Family | Role | Token |
| :- | :- | :- | :- |
| `fraunces-latin-var.woff2` | Fraunces, variable weight 100-900 | Display / headlines | `--font-display` |
| `caveat-latin-600.woff2` | Caveat 600 | Handwritten margin notes (stand-in until Kushal's own handwriting is traced) | `--font-hand` |
| `inter-latin-var.woff2` | Inter, variable 400-700 | Body copy | `--font-body` |
| `jetbrains-mono-latin-var.woff2` | JetBrains Mono, variable 400-700 | UI chrome only | `--font-mono` |

Source: Google Fonts (latin subset; Fraunces and Caveat via the Fontsource npm tarballs). To add a weight or subset, replace the file and update the variant in `astro.config.mjs`.

## `og/`: static TTFs for social preview images

`src/lib/og.ts` renders preview cards with satori, which can't read woff2 or variable fonts. These are
static TTFs (latin subset, OFL licence), made with fontTools. The preview cards still use the
previous display face until the social images are redrawn for the notebook design:
Archivo Black as-is, Inter pinned to weight 400, JetBrains Mono pinned to 700. They are only read at
build time and never shipped to visitors.
