# Fonts

Latin-subset woff2 files, self-hosted and wired up through Astro's Fonts API (`astro.config.mjs`).
All three are licensed under the SIL Open Font License 1.1.

| File | Family | Role | Token |
| :- | :- | :- | :- |
| `archivo-black-latin.woff2` | Archivo Black 400 | Display / headlines | `--font-display` |
| `inter-latin-var.woff2` | Inter, variable 400-700 | Body copy | `--font-body` |
| `jetbrains-mono-latin-var.woff2` | JetBrains Mono, variable 400-700 | UI chrome only | `--font-mono` |

Source: Google Fonts (latin subset). To add a weight or subset, replace the file and update the variant in `astro.config.mjs`.
