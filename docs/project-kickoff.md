# Personal Website — Claude Code Projects Master Prompt

Built from: the 3 transcripts, the official Projects docs, your saved website notes (Astro, minimal animation, analytics, SEO/OG, blog, hosting undecided) and `attest-frontend-reference.md`.

---

## 0. Read this first: where I'd push back

1. **Projects is arguably over-scoped for a personal site.** The docs say a project fits goals that outlast one session and keep producing tasks. A portfolio is ~5 pages. One cloud session could build it. Use Projects here as a *test of the feature* (which is your stated aim), not because the site needs it. The upside: the blog and "ongoing polish" give it a real long-running stream.
2. **The ATTEST reference is a design system for a different product.** Reuse the *tokens and components* (neo-brutalist, hard shadows, `<Highlight>`, mono chrome). Do NOT reuse its sections. The replay/diff demo is ATTEST-specific. Copying it makes your site look like an ATTEST clone.
3. **Animations are now IN (changed from "minimal").** The risk is not animation itself, it's animation that hurts Lighthouse, causes layout shift, or hides content until JS loads. So motion is governed by `docs/motion-spec.md`: transform/opacity only, CSS-first, the hero visible at first paint, a JS budget, and a full `prefers-reduced-motion` fallback. I'd keep Performance >= 90 on mobile (not 95) so motion has headroom; other Lighthouse categories stay >= 95.
4. **Cloud threads can't see your laptop.** The reference file and your project facts must be committed to the repo, or threads will guess. This is the #1 failure mode in the docs ("threads guessed or stalled").
5. **Parallel threads on a fresh repo cause merge conflicts.** So the plan is one foundation thread first, merge it, then fan out.
6. **Usage:** projects burn plan limits faster than a single session. For a static site, run threads on a smaller model.

---

## 1. Pre-flight checklist (do before pasting anything)

- [ ] **Projects** shows in the sidebar (Pro/Max only; otherwise join the waitlist).
- [ ] Create an empty GitHub repo, e.g. `kushal-portfolio`, with a README.
- [ ] Install the **Claude GitHub App** on that repo. The `/web-setup` token is not enough for project threads.
- [ ] Commit two files to the repo:
  - `docs/design-reference.md` = your `attest-frontend-reference.md`, unchanged
  - `docs/content-brief.md` = fill in the template in section 5
  - `docs/motion-spec.md` = the animation system (already written; ships in the scaffold)
  - The scaffold zip already contains all three plus README and CLAUDE.md, so you only fill in the content brief.
- [ ] New project: name `Personal Website`, goal (one line): *"Ship and keep improving Kushal's personal portfolio site (Astro): portfolio, projects, writing."*, add the repo as context.
- [ ] **Project settings > General:** Coordinator = default (low effort is fine, it only routes). Threads = Sonnet 5.5 at medium effort. Tell the coordinator to use a bigger model for the foundation thread only.
- [ ] **Project settings > Memory > Project instructions:** paste section 2.
- [ ] Default cloud environment is fine (npm is allowed). No secrets needed yet.
- [ ] When done for the day: **Pause** the project. Don't leave threads idle-watching PRs.

---

## 2. Project instructions (paste into Project settings > Memory)

```text
This project builds and maintains Kushal Jayavarapu's personal portfolio website in the kushal-portfolio repository.

Stack: Astro (static output), TypeScript, content collections (MDX) for projects and blog. No UI framework unless a thread justifies it in its first message. Minimal client JS.

Design: follow docs/design-reference.md (neo-brutalist: solid hard offset shadows with zero blur, sharp-cornered cards, pill buttons, cream background, mono for UI chrome only, reusable <Highlight> component). Adapt it for a personal site; do not copy ATTEST's sections or copy.

Content: use ONLY facts in docs/content-brief.md. Never invent projects, metrics, employers, awards or quotes. If a fact is missing, leave a clearly marked TODO placeholder and say so in your final message.

Motion: animation is welcome and expected. Follow docs/motion-spec.md exactly (tokens, catalogue, JS budget, reduced-motion and no-JS rules). Prefer CSS; transform/opacity only; hero content visible at first paint; CLS < 0.05.

Workflow:
- Branch from main, one draft PR per thread, small focused PRs.
- Before calling work done: run `npm run build` and `npm run check`, and paste the summary lines. Screenshot desktop (1280px) and mobile (390px) of every page you changed.
- If you can't reach something you need (secret, account, decision), say exactly what's missing in your first message and stop. Don't mock or guess.
- Don't merge, force-push, change CI, or add dependencies beyond Astro integrations without asking in the thread.
- Commit and push work in progress on long tasks.

Quality bar: mobile Lighthouse Performance >= 90; Accessibility, Best Practices, SEO >= 95. WCAG AA contrast. Semantic HTML.
```

---

## 3. THE MASTER PROMPT (paste into the project conversation)

```text
Goal: build and ship my personal portfolio website. Read docs/design-reference.md and docs/content-brief.md first; they are the source of truth for design and content. Project instructions apply to every thread.

WHAT THE SITE IS
A portfolio + projects + writing site for a CS student who builds AI/ML and data products. Audience: recruiters and hiring managers (especially for forward-deployed-engineer roles), hackathon organizers and collaborators. It must make my best 3-4 projects scannable in under 30 seconds and let people contact me fast.

PAGES / INFORMATION ARCHITECTURE
1. Home: hero (one-line positioning + two CTAs), featured projects (3-4 cards), short about, latest writing, contact CTA banner.
2. Projects: index plus one case-study page per project (problem, what I built, stack, result, links). Driven by an MDX content collection.
3. Writing: blog index + post pages (MDX content collection, tags, reading time, RSS feed).
4. About: short bio, skills grouped sensibly, timeline of notable results, resume link.
5. Contact: email, GitHub, LinkedIn. No backend form unless I approve one.
6. 404 page in the same design language.

DESIGN
Adapt the neo-brutalist system in docs/design-reference.md: tokens for color/typography/shadow, <Highlight> marker component, Card (sharp corners, hard offset shadow), pill Buttons, mono Tag. Use the cream background and the accent palette, but choose the hero's highlight word and section accents for MY content.

MOTION
Animation is a core part of the feel. Implement the catalogue in docs/motion-spec.md: press physics on all buttons/cards (the signature), highlight swipe, hero entrance, typing line, scroll reveals, stack marquee, sticker tilt, Astro View Transitions with the project-card-to-case-study title morph, sliding nav underline, blog reading-progress bar. The motion tokens and press physics ship in T1 so every later thread inherits them. Respect the budget and the reduced-motion / no-JS rules in that file.

THREAD PLAN (propose these as threads and wait for my go-ahead before starting; run at most 2-3 at once)
Phase 1, sequential, use the largest model:
  T1 Foundation: Astro scaffold, design tokens (CSS variables), fonts (self-hosted, subset), base layout, header/footer, <Highlight>, Card, Button, Tag, global a11y + reduced-motion handling, `npm run check` script, README with run/deploy notes. Placeholder home page proving the components. Must be merged before Phase 2 starts.
Phase 2, parallel after T1 merges:
  T2 Home + About pages.
  T3 Projects collection + index + case-study template + 3-4 seed case studies from the content brief.
  T4 Writing: blog collection, index, post template, RSS, tags, 1 sample post marked as a draft placeholder.
  T5 SEO and sharing: per-page meta, canonical URLs, Open Graph + Twitter cards with generated OG images, sitemap, robots, JSON-LD (Person + BlogPosting).
Phase 3:
  T5b Motion pass (after T2-T4 merge, to avoid conflicts): scroll reveals, marquee, sticker tilt, View Transitions (card-to-heading morph), reading-progress bar, typing line. Pages must already exist. Report JS bytes added and Lighthouse before/after.
  T5c (optional, last) Signature "build replay" panel for ONE featured project, only if docs/content-brief.md has real milestones. Lazy-loaded, reduced-motion-safe.
  T6 Analytics + deploy: wire up privacy-friendly analytics and a deploy config. HOSTING IS UNDECIDED. Do not pick silently: in your first message compare Cloudflare Pages, Vercel and Netlify for a static Astro site (cost, build limits, analytics options) in 6 lines max and ask me to choose.
  T7 QA pass: Lighthouse, axe, broken links, mobile layouts at 390/768/1280, reduced-motion check; file fixes as small PRs.

VERIFICATION (a thread isn't done until it shows this)
- `npm run build` and `npm run check` pass, output pasted.
- Screenshots at 390px and 1280px for each changed page.
- No invented facts: every claim on the site traces to docs/content-brief.md.
- Mobile Lighthouse: Performance >= 90, Accessibility/Best Practices/SEO >= 95 on the preview build (T7 verifies site-wide).
- For any motion work: the checklist at the bottom of docs/motion-spec.md (reduced-motion emulation, JS-off check, CLS, bundle delta).

HOW I WANT YOU TO RUN THIS
- Propose threads first; I approve. Then post short updates only when something finishes or is blocked.
- Open draft PRs; I review and tell you when to merge.
- Remember across threads: design decisions I confirm, and corrections I make.
- If you hit a decision that is genuinely mine (hosting, domain, which projects to feature, bio wording), batch the questions into ONE message instead of blocking threads one by one.

Start now: summarize in under 10 lines what you read in the two docs, list any facts missing from the content brief that would block a page, then propose the thread list.
```

---

## 4. Follow-up prompts to use later

**After T1 merges**
> T1 is merged. Start T2-T5 now, max 3 at a time, reusing T1's components. Don't touch the tokens file without asking.

**Status check (ask once, don't poll)**
> Give me one status update: per thread, state, what it assumed, what it's waiting on.

**If threads guessed or stalled (straight from the docs)**
> For every open thread, list what you asked it to do, what it assumed or couldn't reach, and what it's waiting on.

**Standing weekly routine (only once the site is live)**
> Create a weekly routine: run Lighthouse and a broken-link check against production; if any score drops below 95 or a link breaks, open a thread to investigate and fix. Don't open threads otherwise.

**Writing pipeline (the long-running part that justifies a Project)**
> Here's a rough idea for a post: <paste>. Draft it as MDX in the writing collection as a draft PR, matching the tone of my existing posts. Don't publish.

**Cost control**
> Run at most two threads at a time, use a smaller model for anything under ~1 hour of work, and don't leave threads watching PRs after I've merged.

---

## 5. `docs/content-brief.md` template (fill the blanks; leave nothing for threads to invent)

```markdown
# Content brief

## Identity
- Name: Kushal Jayavarapu
- Site name / wordmark: <TODO>
- One-line positioning: <TODO, e.g. what you build + for whom>
- Location: Bengaluru
- Contact: email <TODO> · GitHub <TODO> · LinkedIn <TODO>
- Resume PDF: <TODO: commit to /public/resume.pdf>

## Short bio (3-4 sentences, my words): <TODO>

## Target roles / what I want from visitors
- Forward deployed engineer; also finance x data analytics. <TODO: CTA wording>

## Projects (verify every line; add links, metrics, screenshots)
- ATTEST: turns written assignments into adaptive live oral defenses (voice AI + provenance replay) to verify AI-written work. <TODO: stack, status, links, result>
- InterviewForge (BTLC): AI coding-interview practice platform; diagnoses reasoning errors; adaptive problem selection via custom Elo-style rating. <TODO>
- EcoSphere: full-stack ESG platform (carbon tracking, gamification, cross-department reporting), built in an 8-hour hackathon. <TODO>
- AdaptBank: research benchmark for AI-agent robustness under semantic drift; 6 agents scored on custom resilience metrics. <TODO>

## Achievements (exact wording + year)
- Won IISc Bengaluru AI Hackathon (Techgyan, 2025), 4-person team, ML model detecting ambulance sirens for traffic management.
- CIE Spark 2025 (HustleHub): Top 13 of 77 teams; IoT accident-detection concept validated with 60+ customer interviews.
- <TODO: others>

## Skills (grouped): <TODO>

## Education: PES University, CS. <TODO: expected year, relevant courses>

## Writing: first 2-3 post topics: <TODO>

## Things NOT to include: <TODO>
```

---

## 6. Sources

- [Let Claude coordinate ongoing work with Projects (docs)](https://code.claude.com/docs/en/claude-projects)
- Your three attached video transcripts
- `attest-frontend-reference.md` (your file)
