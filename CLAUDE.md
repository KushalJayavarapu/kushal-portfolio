# CLAUDE.md

Personal portfolio site for Kushal Jayavarapu. Astro, static output, TypeScript.

## Read first
- `docs/design-reference.md`: neo-brutalist design system (adapt tokens/components; do NOT copy ATTEST's sections or copy)
- `docs/motion-spec.md`: animation system, budget and accessibility rules
- `docs/content-brief.md`: the only source of facts for site copy. Never invent projects, metrics, awards or quotes; leave a `TODO` and flag it.

## Commands
Node >= 22.22.0 (see `.nvmrc`).
- `npm install`: install dependencies
- `npm run dev`: dev server at http://localhost:4321
- `npm run build`: static build to `dist/`
- `npm run preview`: serve the built `dist/` locally
- `npm run check`: `astro check` (Astro diagnostics + TypeScript typecheck, including `src/content.config.ts`)

## Where things live
- Tokens: `src/styles/tokens.css` (colour, type, spacing, shadows, motion). Global base + press physics: `src/styles/global.css`.
- Fonts: `src/assets/fonts/` via Astro's Fonts API in `astro.config.mjs`.
- Components: `src/components/` (`Highlight`, `Button`, `Card`, `Tag`, `Header`, `Footer`). Layout: `src/layouts/BaseLayout.astro`.
- Site constants (nav, social links): `src/config/site.ts`. Collections: `src/content.config.ts`.

## Conventions
- Content lives in Astro content collections (MDX): `src/content/projects`, `src/content/blog`.
- Design tokens are CSS variables in one file; components consume tokens, never hard-coded hex values.
- Hard offset shadows only (zero blur). Sharp corners on cards, pill buttons.
- Monospace is for UI chrome only (tags, buttons, timestamps), not body or headlines.
- Animations: CSS first, transform/opacity only, per `docs/motion-spec.md`; every animation has a reduced-motion and no-JS fallback.
- Small focused PRs, one per thread. Don't add dependencies beyond Astro integrations without asking.

## Definition of done
`npm run build` and `npm run check` pass; desktop (1280px) and mobile (390px) screenshots of changed pages; mobile Lighthouse Performance >= 90 and Accessibility/Best Practices/SEO >= 95.
