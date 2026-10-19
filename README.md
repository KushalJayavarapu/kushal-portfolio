# kushal-portfolio

Personal portfolio, projects and writing site. Built and maintained with Claude Code Projects.

**Stack:** Astro (static), TypeScript, MDX content collections.
**Design:** neo-brutalist (see `docs/design-reference.md`), animated per `docs/motion-spec.md`.

## Status
Home, About, Projects, Writing (with RSS) and Contact pages are built, with SEO metadata and a sitemap. Deployed on Cloudflare Pages (see Deploy).

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
Hosted on **Cloudflare Pages** with its GitHub integration, at https://kushal-portfolio.pages.dev.

- Production: every push to `main` builds and deploys.
- Previews: every PR gets its own `*.kushal-portfolio.pages.dev` URL, posted on the PR (preview URLs are served with `X-Robots-Tag: noindex`).
- Build settings (set once in the Cloudflare dashboard): framework preset Astro, build command `npm run build`, output directory `dist`. Node comes from `.nvmrc`.
- Response headers (security headers, long-lived caching for hashed `/_astro/*` files) live in `public/_headers`.
- Analytics: Cloudflare Web Analytics, enabled on the Pages project (Metrics tab). It is cookieless and injected by Cloudflare, so there is no tracking code in this repo.
- If the project ever gets a different hostname (for example a custom domain), update `SITE_URL` in `astro.config.mjs`: canonical URLs, Open Graph, JSON-LD, the sitemap, RSS and robots.txt all derive from it.

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
