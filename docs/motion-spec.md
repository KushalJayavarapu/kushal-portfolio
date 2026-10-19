# Motion spec

Animation is a first-class part of this site. The goal is a site that *feels* like the neo-brutalist reference: physical, snappy, slightly playful, never slow. Motion must never hide content, block interaction, or hurt Core Web Vitals.

## Principles

1. **Physical, not floaty.** Elements behave like stickers/cards on a table: they lift, press and snap. Short durations, sharp easing, no long fades.
2. **Transform and opacity only.** Never animate width/height/top/left/margin/box-shadow blur. (Hard shadows are animated by moving the element with `transform`, plus swapping between two pre-defined shadow tokens; no blur interpolation.)
3. **Content first.** The LCP element (hero headline + subheading) is visible at first paint without waiting for JS. Entrance effects must be CSS-driven with a no-JS fallback that shows everything.
4. **Zero layout shift.** CLS < 0.05 on every page. Reserve space for anything that types in or reveals.
5. **One easing language.** Use the tokens below everywhere; no ad-hoc cubic-beziers.

## Tokens (define as CSS variables in the foundation thread)

| Token | Value | Use |
| :- | :- | :- |
| `--dur-press` | 90ms | button/card press |
| `--dur-hover` | 160ms | hover lift, link underline |
| `--dur-reveal` | 520ms | scroll reveals |
| `--dur-hero` | 700ms | hero entrance |
| `--ease-snap` | `cubic-bezier(.2,.9,.25,1)` | default, quick settle |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | reveals |
| `--stagger` | 60ms | per-item delay in groups |

## Animation catalogue

| # | Name | Behaviour | Tech |
| :- | :- | :- | :- |
| 1 | **Press physics** (signature) | Resting shadow `6px 6px 0 #000`. Hover: element moves `translate(-2px,-2px)` and shadow becomes `8px 8px 0`. Active: `translate(6px,6px)` and shadow `0 0 0`: the card "presses into" the page. Applies to buttons, cards, tags. | CSS only |
| 2 | **Highlight swipe** | The coral `<Highlight>` block wipes in left-to-right behind the word (`scaleX 0→1`, origin left, `--dur-hero`), text stays readable throughout. | CSS only |
| 3 | **Hero entrance** | Headline lines rise 16px + fade in with `--stagger`; CTAs follow. | CSS only |
| 4 | **Typing line** | A short role/positioning line types out with a blinking blue cursor, cycles through 3-4 phrases from the content brief. Full text present in the DOM for SEO/screen readers; width reserved to avoid shift. | CSS `steps()` or ~1KB JS |
| 5 | **Scroll reveal** | Cards/sections slide up 24px + fade in once when 15% visible, staggered in groups. | `IntersectionObserver`, ~1KB |
| 6 | **Stack marquee** | A continuous ticker of tech/tool tags under the hero. Pauses on hover. | CSS only |
| 7 | **Sticker tilt** | Project cards rotate +/-1deg on hover, opposite directions alternating. | CSS only |
| 8 | **Page transitions** | Astro View Transitions between pages; a project card's title morphs into the case-study heading (`transition:name`). | Astro built-in |
| 9 | **Nav + links** | Underline slides in from the left; active page has a solid highlight block. | CSS only |
| 10 | **Reading progress** | Thin blue bar at top of blog posts fills with scroll. | CSS scroll-timeline with JS fallback, ~0.5KB |
| 11 | **Signature demo (optional, last)** | A "build replay" panel on one featured project: scrubber-driven timeline (milestones, commits, screenshots) adapted from the reference's replay panel. Only built if the content brief has real milestones. | small vanilla JS, lazy-loaded |

## Budget

- Total animation-related JS <= 20KB gzipped (excluding Astro's own runtime). Default to CSS + Web Animations API + IntersectionObserver. Any animation library (e.g. Motion One) must be justified in the PR and stay <= 5KB gzipped.
- Mobile Lighthouse Performance >= 90 (other categories >= 95), CLS < 0.05, TBT < 150ms.
- Animations pause when the tab is hidden; offscreen infinite animations (marquee) are paused.

## Accessibility

- `prefers-reduced-motion: reduce`: disable catalogue items 2-7, 9-11 transitions; items 1 and 8 reduce to instant state changes; typing line shows the first phrase as static text; marquee becomes a static wrapped tag list.
- No-JS: all content visible and usable; only enhancements missing.
- Never convey information by motion alone. Focus styles remain visible and are not animated away.
- No flashing > 3 times per second.

## Verification checklist (every PR that touches motion)

- [ ] Screen recording or frame screenshots of the interaction (desktop + mobile)
- [ ] Reduced-motion emulation checked (DevTools > Rendering), result noted
- [ ] JS disabled: page still fully readable
- [ ] Lighthouse mobile numbers pasted; CLS reported
- [ ] Bundle size delta reported
