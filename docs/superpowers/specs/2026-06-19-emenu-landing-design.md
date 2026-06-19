# eMenu Premium Landing Page — Design Spec

**Date:** 2026-06-19
**Status:** Approved (design), pending implementation plan

## Goal

Build a runnable Nuxt 3 project containing a premium, warm "eatable" landing
page for the eMenu digital-menu platform. Advanced GSAP scroll animations, no
utility CSS frameworks, raw scoped CSS. Drop-in ready: `npm install && npm run dev`.

## Constraints (from plan.txt, non-negotiable)

- No Tailwind / UnoCSS / Bootstrap / utility frameworks. Raw scoped CSS only.
- Nuxt 3 + Vue 3 Composition API (`ref`, `computed`, `onMounted`, `onUnmounted`).
- GSAP + ScrollTrigger + SplitText. Unique advanced scroll behavior per section.
- Light, warm, appetizing theme. No pure dark mode, no black bg, no tech-blue.
  - Backgrounds: warm creams, vanilla, buttery ivory.
  - Accents: vibrant orange, terracotta, deep warm brown text.
- CSS-built smartphone mockups containing vibrant menu UI.
- Unsplash placeholder URLs for food / UI / device imagery (swappable later).
- GSAP cleanup on `onUnmounted` to prevent memory leaks.

## Decisions

- **Deliverable:** full runnable Nuxt 3 project (scaffold everything).
- **GSAP source:** local `gsap-public/esm` bundle (premium plugins included,
  no npm auth / license needed). Wired via Nuxt build alias.
- **Component structure:** one structural landing component in `pages/index.vue`
  (honors plan's "single-file component" intent). GSAP registered once in a
  client-only plugin.

## Architecture

### File layout
```
nuxt.config.ts                 # app config, GSAP alias, transpile, ssr handling
package.json                   # nuxt 3 + scripts; gsap resolved to local bundle
plugins/gsap.client.ts         # register ScrollTrigger, SplitText (+ ScrollSmoother opt)
app.vue                        # <NuxtPage/> wrapper + global token import
pages/index.vue                # landing: <template> + <script setup> + <style scoped>
assets/css/tokens.css          # CSS custom properties (design system)
public/                        # (empty; imagery is remote Unsplash URLs)
docs/superpowers/specs/        # this spec
```

### GSAP wiring
- `nuxt.config.ts` aliases bare `gsap` import → `gsap-public/esm/index.js`,
  and subpath plugin imports (`gsap/ScrollTrigger`, `gsap/SplitText`) →
  matching files in `gsap-public/esm/`. Add `gsap` to `build.transpile`.
- `plugins/gsap.client.ts`: import core + plugins, `gsap.registerPlugin(...)`,
  expose via `nuxtApp.provide('gsap', gsap)` so pages reuse one instance.
- All ScrollTrigger creation happens inside `onMounted` (client only, guarded by
  `import.meta.client`). `onUnmounted` calls `ScrollTrigger.getAll().forEach(t => t.kill())`
  and reverts any SplitText instances + kills timelines stored in refs.

## Sections — animation spec

### Header nav
Fixed, warm-toned, minimal. Links with animated underline (scaleX cubic-bezier).
Subtle background-blur/opacity shift after hero scroll.

### Section 1 — Hero
- Layout: bold fluid SplitText title, dual CTA buttons, CSS phone mockup at right.
- Animation: phone starts `scale(.6)` with 3D perspective (`rotateX`, `translateZ`),
  on scroll scrubs to `scale(1)` and slides forward/centers. Short pin.
  Title chars stagger-reveal on load (SplitText). Background warm gradient parallax.

### Section 2 — Pinned feature carousel
- Pinned section; vertical scroll drives horizontal `x` translate of a track.
- 3 feature cards: Instant Price Sync, Allergen Tags, Multi-language Support.
- Each card slides in sideways; decorative fluid blob shapes parallax behind at a
  different scrub rate.

### Section 3 — How it Works + ROI calculator
- Timeline track: numbered steps; SplitText text morph/reveal sequenced as an
  image container changes mask/clip-path shape on scroll.
- Reactive ROI widget: two custom-styled `<input type="range">` (restaurant
  capacity / covers, average bill size). `computed` derives projected extra
  monthly revenue. Result board shows an animated counting number (GSAP tween on
  value change). Formula (default, stated): `extra = covers * avgBill * upliftPct
  * daysPerMonth`, `upliftPct = 0.15`, `daysPerMonth = 30`. Tunable consts.

### Section 4 — Testimonials + footer
- Asymmetric grid of layered feedback cards; ScrollTrigger stagger reveal.
- Footer: organic warm block with clip-path wave top edge, CTA, links.

## Design system (tokens)
```
--bg-warm:      #fdf6ec   /* buttery ivory page bg */
--bg-vanilla:   #fbedd6   /* soft vanilla section bg */
--bg-cream:     #fff9f0
--accent-orange:#ff7a18   /* vibrant premium orange */
--terracotta:   #c75b39
--brown-deep:   #3a2a1e   /* readable warm text */
--text-main:    #3a2a1e
--text-soft:    #6b5444
--shadow-warm:  0 20px 60px rgba(199,91,57,.18)
--ease-organic: cubic-bezier(.22,1,.36,1)
```
- CSS phone shell: rounded frame, notch, glistening gradient border, layered
  depth shadow, inner screen wraps Unsplash menu imagery + CSS menu UI rows.
- All hover transitions use `--ease-organic`.

## Imagery (Unsplash placeholders)
Remote `https://images.unsplash.com/...` URLs for food shots, dish thumbnails,
device/hero. Marked with comments for easy swap.

## Testing / verification
- `npm install` succeeds (gsap resolved locally).
- `npm run build` completes with no errors.
- `npm run dev` boots; landing renders SSR without GSAP reference errors
  (GSAP client-only).
- Manual: scroll through — each section's ScrollTrigger fires; no console errors;
  navigating away does not leak triggers (cleanup verified).
- No automated unit tests (visual/animation component; not unit-testable value).

## Out of scope (YAGNI)
- Backend, auth, real data, i18n runtime, form submission, analytics.
- Mobile-perfect responsive polish beyond fluid layout (basic responsiveness only).
- ScrollSmoother is optional; include only if it does not complicate cleanup.
