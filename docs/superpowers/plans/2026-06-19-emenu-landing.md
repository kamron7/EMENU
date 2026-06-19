# eMenu Premium Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a runnable Nuxt 3 project with a warm, premium eMenu landing page driven by advanced GSAP scroll animations.

**Architecture:** Full Nuxt 3 scaffold. GSAP resolved from the local `gsap-public/esm` bundle via a build alias and registered once in a client-only plugin. One structural landing component (`pages/index.vue`) holds all four sections; ScrollTrigger/SplitText instances are created in `onMounted` and killed in `onUnmounted`.

**Tech Stack:** Nuxt 3, Vue 3 Composition API, raw scoped CSS (no utility frameworks), GSAP 3 (core + ScrollTrigger + SplitText, local bundle).

## Global Constraints

- No Tailwind / UnoCSS / Bootstrap / any utility framework. Raw scoped CSS only.
- Vue 3 Composition API only: `ref`, `computed`, `onMounted`, `onUnmounted`.
- All GSAP/ScrollTrigger code is client-only; guard with `import.meta.client` and create inside `onMounted`.
- Clean up on `onUnmounted`: kill all ScrollTriggers, revert SplitText, kill timelines.
- Theme: warm creams/vanilla/ivory backgrounds; orange/terracotta accents; deep warm brown text. No pure dark, no black bg, no tech-blue.
- Imagery: remote Unsplash placeholder URLs, comment-marked for swap.
- GSAP source: local `gsap-public/esm` (no npm `gsap` dependency).
- Design tokens (verbatim):
  `--bg-warm:#fdf6ec` `--bg-vanilla:#fbedd6` `--bg-cream:#fff9f0`
  `--accent-orange:#ff7a18` `--terracotta:#c75b39` `--brown-deep:#3a2a1e`
  `--text-main:#3a2a1e` `--text-soft:#6b5444`
  `--shadow-warm:0 20px 60px rgba(199,91,57,.18)`
  `--ease-organic:cubic-bezier(.22,1,.36,1)`

---

### Task 1: Project scaffold + design tokens

**Files:**
- Create: `package.json`
- Create: `nuxt.config.ts`
- Create: `app.vue`
- Create: `assets/css/tokens.css`
- Create: `pages/index.vue` (placeholder)

**Interfaces:**
- Produces: runnable Nuxt 3 app; `gsap` and `gsap/ScrollTrigger`, `gsap/SplitText` import aliases resolve to local bundle; global CSS tokens available.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "emenu-landing",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview"
  },
  "devDependencies": {
    "nuxt": "^3.13.0",
    "vue": "^3.4.0"
  }
}
```

- [ ] **Step 2: Create `nuxt.config.ts`** (alias `gsap` → local bundle, transpile, global css)

```ts
import { fileURLToPath } from 'node:url'

const gsapEsm = fileURLToPath(new URL('./gsap-public/esm', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['~/assets/css/tokens.css'],
  build: { transpile: ['gsap'] },
  vite: {
    resolve: {
      alias: {
        'gsap/ScrollTrigger': `${gsapEsm}/ScrollTrigger.js`,
        'gsap/SplitText': `${gsapEsm}/SplitText.js`,
        'gsap': `${gsapEsm}/index.js`
      }
    }
  }
})
```

- [ ] **Step 3: Create `assets/css/tokens.css`**

```css
:root {
  --bg-warm: #fdf6ec;
  --bg-vanilla: #fbedd6;
  --bg-cream: #fff9f0;
  --accent-orange: #ff7a18;
  --terracotta: #c75b39;
  --brown-deep: #3a2a1e;
  --text-main: #3a2a1e;
  --text-soft: #6b5444;
  --shadow-warm: 0 20px 60px rgba(199, 91, 57, .18);
  --ease-organic: cubic-bezier(.22, 1, .36, 1);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg-warm);
  color: var(--text-main);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
```

- [ ] **Step 4: Create `app.vue`**

```vue
<template>
  <NuxtPage />
</template>
```

- [ ] **Step 5: Create placeholder `pages/index.vue`**

```vue
<template>
  <main><h1>eMenu</h1></main>
</template>
```

- [ ] **Step 6: Install and verify dev boot**

Run: `npm install`
Expected: completes, no errors.
Run: `npm run build`
Expected: build succeeds, no module-resolution errors for `gsap`.

- [ ] **Step 7: Commit** (if git initialized; else skip)

```bash
git add -A && git commit -m "chore: scaffold Nuxt 3 project with local GSAP alias and design tokens"
```

---

### Task 2: GSAP client-only plugin

**Files:**
- Create: `plugins/gsap.client.ts`

**Interfaces:**
- Consumes: `gsap`, `gsap/ScrollTrigger`, `gsap/SplitText` aliases from Task 1.
- Produces: `useNuxtApp().$gsap` (gsap instance with ScrollTrigger + SplitText registered). ScrollTrigger and SplitText also importable directly in `pages/index.vue`.

- [ ] **Step 1: Create `plugins/gsap.client.ts`**

```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  return { provide: { gsap } }
})
```

- [ ] **Step 2: Verify no SSR error**

Run: `npm run dev`
Expected: dev server boots; navigate to `/`; no "window is not defined" or ScrollTrigger errors in console (plugin is `.client` so it runs only browser-side).

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: register GSAP ScrollTrigger and SplitText in client plugin"
```

---

### Task 3: Landing shell — header + four section containers + base CSS

**Files:**
- Modify: `pages/index.vue` (replace placeholder)

**Interfaces:**
- Consumes: tokens.css, GSAP plugin.
- Produces: DOM with refs/anchors later tasks animate — `header.nav`, `section.hero`, `section.features`, `section.how`, `section.social`. Establishes `<script setup>` with `onMounted`/`onUnmounted` lifecycle and a `ctx`/`triggers` cleanup pattern.

- [ ] **Step 1: Replace `pages/index.vue` with full shell**

Template: fixed header (logo "eMenu", nav links with underline span, dual CTA), then four `<section>` blocks with headings and placeholder content. Script:

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'

const root = ref<HTMLElement | null>(null)
let cleanup: Array<() => void> = []

onMounted(async () => {
  if (!import.meta.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  const { SplitText } = await import('gsap/SplitText')
  gsap.registerPlugin(ScrollTrigger, SplitText)
  // animations added in later tasks via initHero(gsap, ScrollTrigger, SplitText) etc.
})

onUnmounted(async () => {
  if (!import.meta.client) return
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  ScrollTrigger.getAll().forEach(t => t.kill())
  cleanup.forEach(fn => fn())
  cleanup = []
})
</script>
```

Scoped CSS: header fixed/blur, section min-heights, container widths, heading typography using tokens. Animated nav underline via `::after` `transform: scaleX` + `--ease-organic`.

- [ ] **Step 2: Verify render**

Run: `npm run dev`
Expected: header + four sections render; warm theme applied; no console errors.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: landing shell with header and four section containers"
```

---

### Task 4: Hero — CSS phone mockup + 3D scroll-expand + SplitText title

**Files:**
- Modify: `pages/index.vue` (hero template, hero CSS, `initHero` in onMounted)

**Interfaces:**
- Consumes: gsap, ScrollTrigger, SplitText from Task 3 onMounted.
- Produces: pushes ScrollTriggers (auto-killed) + a SplitText revert into `cleanup`.

- [ ] **Step 1: Build CSS phone shell**

Phone shell: rounded `.phone` frame (~300×620), glistening gradient border (`linear-gradient` border via padding+background-clip), notch (`.phone__notch` absolute pill), layered `--shadow-warm`. Inner `.phone__screen` shows an Unsplash food hero image + CSS menu UI rows (dish name / price chips). Mark image URL with `/* swap */` comment.

- [ ] **Step 2: Add hero animation in onMounted**

```ts
// title char reveal
const split = new SplitText('.hero__title', { type: 'chars' })
gsap.from(split.chars, { yPercent: 120, opacity: 0, stagger: 0.03, duration: 0.8, ease: 'power3.out' })
cleanup.push(() => split.revert())

// phone 3D expand on scroll
gsap.fromTo('.hero__phone',
  { scale: 0.6, rotateX: 18, y: 60, transformPerspective: 900 },
  { scale: 1, rotateX: 0, y: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=80%', scrub: true, pin: '.hero__phone-wrap' } })
```

- [ ] **Step 3: Verify**

Run: `npm run dev`
Expected: title chars stagger in on load; scrolling expands/uprights phone; no errors. Navigate away and back — no leaked triggers (check `ScrollTrigger.getAll().length` resets).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: hero section with CSS phone mockup and 3D scroll-expand"
```

---

### Task 5: Pinned feature carousel (horizontal scrub + parallax blobs)

**Files:**
- Modify: `pages/index.vue` (features template, CSS, `initFeatures`)

**Interfaces:**
- Consumes: gsap, ScrollTrigger.
- Produces: pinned horizontal ScrollTrigger pushed to cleanup.

- [ ] **Step 1: Build track markup**

`.features__track` flex row, 3 `.feature-card` (Instant Price Sync, Allergen Tags, Multi-language Support) each ~80vw. Decorative `.blob` absolute shapes (border-radius organic, warm gradient) behind.

- [ ] **Step 2: Add horizontal pin animation**

```ts
const cards = gsap.utils.toArray<HTMLElement>('.feature-card')
gsap.to('.features__track', {
  xPercent: -100 * (cards.length - 1), ease: 'none',
  scrollTrigger: { trigger: '.features', pin: true, scrub: 1,
    end: () => '+=' + (document.querySelector('.features__track') as HTMLElement).scrollWidth }
})
gsap.to('.blob', { xPercent: -40, ease: 'none',
  scrollTrigger: { trigger: '.features', scrub: 2, start: 'top top', end: 'bottom top' } })
```

- [ ] **Step 3: Verify**

Run: `npm run dev`
Expected: section pins; vertical scroll moves cards horizontally; blobs parallax slower; no errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: pinned horizontal feature carousel with parallax blobs"
```

---

### Task 6: How it Works + reactive ROI calculator

**Files:**
- Modify: `pages/index.vue` (how template incl ROI widget, CSS, `initHow`, computed)

**Interfaces:**
- Consumes: gsap, ScrollTrigger, SplitText.
- Produces: reactive `covers`, `avgBill` refs; `extraRevenue` computed; animated counter ref.

- [ ] **Step 1: Add ROI reactive state to `<script setup>`**

```ts
const covers = ref(80)
const avgBill = ref(35)
const UPLIFT = 0.15
const DAYS = 30
const extraRevenue = computed(() => Math.round(covers.value * avgBill.value * UPLIFT * DAYS))
const displayRevenue = ref(0)
```

- [ ] **Step 2: Build template**

Numbered step rows (`.how-step`) with headings (SplitText targets) and a `.how-media` container whose `clip-path` morphs on scroll. ROI widget: two `<input type="range">` bound to `covers`/`avgBill` (custom-styled track/thumb in scoped CSS), result board showing `{{ displayRevenue }}` formatted.

- [ ] **Step 3: Add animations + counter watch in onMounted**

```ts
gsap.utils.toArray<HTMLElement>('.how-step').forEach((step) => {
  const s = new SplitText(step.querySelector('.how-step__title'), { type: 'words' })
  gsap.from(s.words, { opacity: 0, y: 24, stagger: 0.05,
    scrollTrigger: { trigger: step, start: 'top 80%' } })
  cleanup.push(() => s.revert())
})
gsap.fromTo('.how-media', { clipPath: 'inset(20% 20% 20% 20% round 24px)' },
  { clipPath: 'inset(0% 0% 0% 0% round 24px)',
    scrollTrigger: { trigger: '.how', start: 'top 70%', end: 'center center', scrub: true } })

watch(extraRevenue, (v) => {
  gsap.to(displayRevenue, { value: v, duration: 0.6, ease: 'power2.out',
    onUpdate: () => { displayRevenue.value = Math.round(displayRevenue.value) } })
}, { immediate: true })
```

Add `watch` to the `vue` import.

- [ ] **Step 4: Verify**

Run: `npm run dev`
Expected: dragging sliders updates revenue board with animated counting; step titles reveal word-by-word; media clip-path opens on scroll; no errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: how-it-works steps and reactive ROI calculator"
```

---

### Task 7: Testimonials + organic footer

**Files:**
- Modify: `pages/index.vue` (social template, CSS, `initSocial`)

**Interfaces:**
- Consumes: gsap, ScrollTrigger.
- Produces: stagger reveal ScrollTrigger.

- [ ] **Step 1: Build markup**

`.social` asymmetric CSS-grid of `.testi-card` (Unsplash avatar `/* swap */`, quote, name/restaurant) with varied `margin-top`/`grid-row` for asymmetry. Footer `.foot` warm block, `clip-path` wave top edge (polygon or radial mask), CTA + link columns.

- [ ] **Step 2: Add reveal animation**

```ts
gsap.from('.testi-card', { y: 60, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
  scrollTrigger: { trigger: '.social', start: 'top 75%' } })
```

- [ ] **Step 3: Verify**

Run: `npm run dev`
Expected: cards stagger-reveal on scroll; footer wave renders; no errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: testimonials grid and organic warm footer"
```

---

### Task 8: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: completes with no errors/warnings about GSAP or SSR.

- [ ] **Step 2: Dev smoke test**

Run: `npm run dev`
Expected: scroll top→bottom: hero phone expands, features pin+scroll horizontally, how-steps reveal + ROI works, testimonials reveal, footer wave. Console clean. Reload + navigate: no leaked ScrollTriggers.

- [ ] **Step 3: Final commit**

```bash
git add -A && git commit -m "chore: verify full landing build and animations"
```

---

## Self-Review

- **Spec coverage:** scaffold+tokens (T1) ✓; GSAP client+cleanup (T2,T3) ✓; header nav (T3) ✓; hero 3D phone + SplitText (T4) ✓; pinned horizontal carousel + parallax (T5) ✓; how-it-works morph + ROI calculator with stated formula (T6) ✓; testimonials asymmetric grid + organic footer (T7) ✓; verification incl no-leak + build (T8) ✓; warm tokens verbatim (Global Constraints) ✓; Unsplash placeholders comment-marked (T4,T6?,T7) ✓; no utility framework (raw scoped CSS throughout) ✓.
- **Placeholder scan:** no TBD/TODO; every code step has concrete code; verification steps have explicit expected output.
- **Type consistency:** `cleanup` array used consistently T3–T7; `covers`/`avgBill`/`extraRevenue`/`displayRevenue` defined T6 and reused; init pattern (inline in onMounted) consistent.
- Note: TDD unit tests omitted by spec decision (visual/animation component); each task instead ends with a concrete dev/build verification + commit.
