# Fonts

Latin-subset woff2 files, self-hosted and wired up through Astro's Fonts API (`astro.config.mjs`).
All three are licensed under the SIL Open Font License 1.1.

| File | Family | Role | Token |
| :- | :- | :- | :- |
| `archivo-black-latin.woff2` | Archivo Black 400 | Display / headlines | `--font-display` |
| `inter-latin-var.woff2` | Inter, variable 400-700 | Body copy | `--font-body` |
| `jetbrains-mono-latin-var.woff2` | JetBrains Mono, variable 400-700 | UI chrome only | `--font-mono` |

Source: Google Fonts (latin subset). To add a weight or subset, replace the file and update the variant in `astro.config.mjs`.

## `og/`: static TTFs for social preview images

`src/lib/og.ts` renders preview cards with satori, which can't read woff2 or variable fonts. These are
static TTF copies of the files above (same latin subset, same OFL licence), made with fontTools:
Archivo Black as-is, Inter pinned to weight 400, JetBrains Mono pinned to 700. They are only read at
build time and never shipped to visitors.
