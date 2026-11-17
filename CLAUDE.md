# CLAUDE.md

Personal portfolio site for Kushal Jayavarapu. Astro, static output, TypeScript.

## Read first
- `docs/design-reference.md`: the "field notebook" design system (paper surfaces, tape, scribbles, serif headlines). Its first section is current; the older neo-brutalist reference below it is history only.
- `docs/motion-spec.md`: animation system, budget and accessibility rules
- `docs/content-brief.md`: the only source of facts for site copy. Never invent projects, metrics, awards or quotes; leave a `TODO` and flag it.

## Commands
Node >= 22.22.0 (see `.nvmrc`).
- `npm install`: install dependencies
- `npm run dev`: dev server at http://localhost:4321
- `npm run build`: static build to `dist/`
- `npm run preview`: serve the built `dist/` locally
- `npm run check`: `astro check` (Astro diagnostics + TypeScript typecheck, including `src/content.config.ts`)
- CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run check` and `npm run build` on every PR and on pushes to main.

## Where things live
- Tokens: `src/styles/tokens.css` (colour, type, spacing, shadows, motion). Global base + press physics: `src/styles/global.css`.
- Fonts: `src/assets/fonts/` via Astro's Fonts API in `astro.config.mjs`.
- Single-page site: `src/pages/index.astro` holds every section (hero, `#projects`, `#about`, `#writing`, `#contact`); the sticky header jumps between them. Only blog posts and the post archive (`/writing/`) are separate pages. Old `/projects/*`, `/about`, `/contact` addresses redirect to the matching anchor (`redirects` in `astro.config.mjs`).
- Components: `src/components/` (`Highlight`, `Scribble`, `Button`, `Card`, `Tag`, `IndexCard`, `ProjectEntry`, `Header`, `Footer`, `TypingLine`, `StackMarquee`); page sections in `src/components/sections/`. Layout: `src/layouts/BaseLayout.astro`.
- Site constants (nav, social links): `src/config/site.ts`. Collections: `src/content.config.ts`.

## Conventions
- Content lives in Astro content collections (MDX): `src/content/projects`, `src/content/blog`.
- Design tokens are CSS variables in one file; components consume tokens, never hard-coded hex values.
- Zero-blur offset shadows only (soft colour on paper notes, solid pen colour on buttons). Square corners everywhere.
- Photos and project covers are optional content: render nothing when a file is missing, never a placeholder. Hero portrait: `src/assets/photos/kushal.*`; project cover: `cover` in the entry's frontmatter.
- Never label a link "RSS" (it misreads for an Indian audience); say "Blog feed".
- Monospace is for UI chrome only (tags, buttons, timestamps), not body or headlines. The handwriting face (`.hand`) is for short decorative margin notes only.
- Keep the page scannable: long detail (project write-ups, role bullets, full skills list) goes in a native `<details class="more">` fold.
- Animations: CSS first, transform/opacity only, per `docs/motion-spec.md`; every animation has a reduced-motion and no-JS fallback.
- Small focused PRs, one per thread. Don't add dependencies beyond Astro integrations without asking.

## Definition of done
`npm run build` and `npm run check` pass; desktop (1280px) and mobile (390px) screenshots of changed pages; mobile Lighthouse Performance >= 90 and Accessibility/Best Practices/SEO >= 95.
