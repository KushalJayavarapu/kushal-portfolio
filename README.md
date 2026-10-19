# kushal-portfolio

Personal portfolio, projects and writing site. Built and maintained with Claude Code Projects.

**Stack:** Astro (static), TypeScript, MDX content collections.
**Design:** neo-brutalist (see `docs/design-reference.md`), animated per `docs/motion-spec.md`.

## Status
Foundation (T1) is in: Astro scaffold, design tokens, self-hosted fonts, base components and a placeholder home page. Pages are built by later threads.

## Develop
Requires Node >= 22.22.0 (`.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
npm run check    # astro check + TypeScript
```

## Deploy
Output is a plain static site in `dist/` (build command `npm run build`, output directory `dist`), so any static host works. Hosting is not decided yet (T6); set `site` in `astro.config.mjs` once the domain is known.

## Docs
| File | Purpose |
| :- | :- |
| `docs/design-reference.md` | Design system reference (tokens, components) |
| `docs/motion-spec.md` | Animation tokens, catalogue, budget, accessibility rules |
| `docs/content-brief.md` | All site facts and copy inputs (fill in before building) |
| `docs/project-kickoff.md` | Claude Projects setup: project instructions + master prompt |
| `CLAUDE.md` | Rules every Claude Code session/thread reads |

## Getting started
1. Fill in `docs/content-brief.md`.
2. Install the Claude GitHub App on this repo.
3. Create a Claude Code Project, paste the project instructions and kickoff prompt from `docs/project-kickoff.md`.
