# eMenu v3 — Phone Journey Polish + Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the 3D phone (menu truly in-screen, parks per section, 360° spin between sections with screen swap mid-spin, no hero jump), add GSAP ScrollSmoother, redesign all sections in a refined "awwwards" style, and switch the font to Poppins.

**Architecture:** The Three.js engine (`composables/useHeroPhone3D.ts`) maps the menu onto the iPhone's actual screen mesh and exposes `setPose`/`setScreen`. `pages/index.vue` parks the phone at fixed per-section poses and drives one scrubbed ScrollTrigger per inter-section gap (slide + 360° spin + screen swap at half-spin), all under ScrollSmoother. Sections are rebuilt with a refined grid + Poppins + tasteful GSAP reveals.

**Tech Stack:** Nuxt 3, Vue 3 Composition API, raw Three.js, GSAP (ScrollTrigger + ScrollSmoother + SplitText + CustomEase, local `gsap-public` bundle), raw scoped CSS, Poppins (Google Fonts).

## Global Constraints

- No Tailwind / utility framework. Raw scoped CSS only.
- Vue 3 Composition API only (`ref`, `computed`, `watch`, `onMounted`, `onUnmounted`).
- All GSAP + Three.js client-only: guard `import.meta.client`, create in `onMounted`. No Three/WebGL/ScrollSmoother on the server.
- GSAP registered ONCE in `plugins/gsap.client.ts` (add ScrollSmoother there). The page must NOT call `gsap.registerPlugin`.
- Warm theme tokens only: `--bg-warm:#fdf6ec` `--bg-vanilla:#fbedd6` `--bg-cream:#fff9f0` `--accent-orange:#ff7a18` `--terracotta:#c75b39` `--brown-deep:#3a2a1e` `--text-main:#3a2a1e` `--text-soft:#6b5444` `--shadow-warm:0 20px 60px rgba(199,91,57,.18)` `--ease-organic:cubic-bezier(.22,1,.36,1)`. No pure dark/black/tech-blue.
- Font: Poppins (weights 400/500/600/700).
- Cleanup on `onUnmounted`: kill ALL ScrollTriggers, `smoother.kill()`, dispose ALL Three.js resources, cancel RAF, remove listeners.
- Reduced-motion / no-WebGL: no journey, no ScrollSmoother (native scroll), static phone image, content fully usable.
- Section order (DOM + journey): `#hero`, `.features`, `.how`, `.roi`, `.social`, then `.foot` (render paused).
- Fixed poses (targets; tune live): hero RIGHT `x:1.7`, features LEFT `x:-1.7`, how RIGHT `x:1.7`, roi LEFT `x:-1.7`, testimonials CENTER `x:0,scale:1.15`; all `y:0,rotX:0,rotY:0` neutral facing.
- ScreenKey union unchanged: `'menu'|'priceSync'|'allergen'|'multilang'|'qrSteps'|'review'`.

---

### Task 1: Poppins font + refined type/layout tokens

**Files:**
- Modify: `nuxt.config.ts` (app.head Google Fonts links)
- Modify: `assets/css/tokens.css` (font-family, type scale, layout tokens)

**Interfaces:**
- Produces: global Poppins font; tokens `--font`, `--maxw`, `--gutter` available.

- [ ] **Step 1: Add Poppins to `nuxt.config.ts`** under `app.head.link`:

```ts
export default defineNuxtConfig({
  // …existing config…
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' },
      ],
    },
  },
})
```
(Keep all existing keys — `compatibilityDate`, `css`, `build.transpile`, `vite.resolve.alias`.)

- [ ] **Step 2: Update `assets/css/tokens.css`** — add to `:root`:

```css
  --font: 'Poppins', system-ui, -apple-system, sans-serif;
  --maxw: 1240px;
  --gutter: clamp(1.25rem, 4vw, 3rem);
```
and change the `body` font-family to `font-family: var(--font);`.

- [ ] **Step 3: Verify**

Run: `npm run build` — Expected: passes.
Run: `npm run dev`, open `/` — Expected: text renders in Poppins (inspect computed font-family on `body` → Poppins), no console errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: switch font to Poppins + add layout tokens (--font/--maxw/--gutter)"
```

---

### Task 2: GSAP ScrollSmoother (alias + register + wrapper + create/kill)

**Files:**
- Modify: `nuxt.config.ts` (alias `gsap/ScrollSmoother`)
- Modify: `plugins/gsap.client.ts` (register ScrollSmoother)
- Modify: `pages/index.vue` (wrap content; create/kill smoother)

**Interfaces:**
- Consumes: existing ScrollTrigger setup.
- Produces: `#smooth-wrapper` > `#smooth-content` DOM structure; a `smoother` instance created only in the journey path; `smoother.kill()` in cleanup.

- [ ] **Step 1: Alias in `nuxt.config.ts`** — add to `vite.resolve.alias` BEFORE the bare `gsap` entry:

```ts
'gsap/ScrollSmoother': `${gsapEsm}/ScrollSmoother.js`,
```
(Keep the existing `gsap/ScrollTrigger`, `gsap/SplitText`, `gsap` entries; bare `gsap` stays last.)

- [ ] **Step 2: Register in `plugins/gsap.client.ts`**

```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)
})
```

- [ ] **Step 3: Wrap page content in `pages/index.vue` template**

Structure (the fixed canvas and fixed header stay OUTSIDE `#smooth-content`):
```vue
<template>
  <div class="page-root">
    <canvas ref="stageCanvas" class="phone-stage" aria-hidden="true"></canvas>
    <header class="nav"> … existing header … </header>
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main> … all sections: #hero .features .how .roi .social .foot … </main>
      </div>
    </div>
  </div>
</template>
```
CSS: `#smooth-wrapper { overflow: hidden; }` (ScrollSmoother requirement). No other layout change here.

- [ ] **Step 4: Create ScrollSmoother in `onMounted`** (only when journey runs — WebGL on AND not reduced-motion). Inside the existing client guard, after gsap import:

```ts
const { ScrollSmoother } = await import('gsap/ScrollSmoother')
let smoother: import('gsap/ScrollSmoother').ScrollSmoother | null = null
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (engine && !prefersReduced) {
  smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.2,
    effects: true,
  })
  cleanup.push(() => { smoother?.kill(); smoother = null })
}
```
(When skipped, the wrapper divs behave as normal block elements → native scroll.)

- [ ] **Step 5: Verify**

Run: `npm run build` — Expected: passes (ScrollSmoother resolves via alias; client-only).
Run: `npm run dev` — Expected: page scrolls with smoothing (momentum/ease), existing ScrollTriggers still fire, no console errors, header + canvas stay fixed (not scrolled by the smoother). Navigate away → no leaked smoother (scroll returns to normal).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add GSAP ScrollSmoother (alias, register, wrapper, journey-only create/kill)"
```

---

### Task 3: Menu in-device (screen-mesh texture) + immediate hero pose

**Files:**
- Modify: `composables/useHeroPhone3D.ts`

**Interfaces:**
- Consumes: `phoneScreens.ts` `buildAllScreens()` + `ScreenKey`.
- Produces (HeroPhone3D): replace `crossfadeScreen` with `setScreen(key: ScreenKey): void`; keep `setPose`, `setIdle`, `setPose`, `setRenderActive`, `dispose`. Remove `screenA`/`screenB` overlay planes.

- [ ] **Step 1: Replace the overlay-plane screen with a screen-mesh texture swap.**

Delete `attachScreenPlanes` (the screenA/screenB plane logic) and the `crossfadeScreen` function. Add:

```ts
let screenMat: THREE.MeshStandardMaterial | null = null
let screens: ReturnType<typeof buildAllScreens> | null = null
let currentKey: ScreenKey = 'menu'

function bindScreen(phoneGroup: THREE.Group): void {
  screens = buildAllScreens()
  disposables.push(() => {
    if (screens) { for (const k of Object.keys(screens) as ScreenKey[]) screens[k].dispose(); screens = null }
  })
  const mesh = (phoneGroup.getObjectByName('screen') as THREE.Mesh | undefined) ?? findScreenMesh(phoneGroup)
  if (!mesh) return
  const mat = mesh.material as THREE.MeshStandardMaterial
  screenMat = mat
  mat.map = screens.menu
  mat.emissive = new THREE.Color(0xffffff)
  mat.emissiveMap = screens.menu
  mat.emissiveIntensity = 1.0
  mat.needsUpdate = true
}

function setScreen(key: ScreenKey): void {
  if (!screenMat || !screens || key === currentKey) return
  screenMat.map = screens[key]
  screenMat.emissiveMap = screens[key]
  screenMat.needsUpdate = true
  currentKey = key
}
```
(`findScreenMesh` from v2 stays — largest emissive-mapped mesh.) Call `bindScreen(phone)` where `attachScreenPlanes` was called in `init`. Keep the 180° model flip (`modelGroup.rotation.y = Math.PI`) — the menu now lives on the real screen mesh so the texture follows the device's own UVs; if it appears mirrored, set `screens[k].wrapS = THREE.RepeatWrapping; repeat.x = -1; offset.x = 1` for all six textures in `buildAllScreens` consumption (apply in `bindScreen` once per texture). Verify visually and keep whichever orientation reads correctly.

- [ ] **Step 2: Update the interface + return object.**

In `HeroPhone3D` replace `crossfadeScreen(key: ScreenKey): void` with `setScreen(key: ScreenKey): void`. Update the returned object `{ init, resize, dispose, setScreen, setIdle, setPose, setRenderActive }`.

- [ ] **Step 3: Set the initial hero pose immediately in `init`** (after `bindScreen`), so the phone never renders at the default center before scroll:

```ts
setPose({ x: 1.7, y: 0, rotX: 0, rotY: 0, scale: 1.0 })
```

- [ ] **Step 4: Verify**

Run: `npm run build` — Expected: passes.
Run: `npm run dev` (WebGL on) — Expected: the menu appears ON THE DEVICE SCREEN (part of the phone, not a floating panel) at the hero, phone parked on the right; rotating the phone (next task) will occlude the screen when backward. No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: render menu on the iPhone screen mesh (in-device) + set initial hero pose"
```

---

### Task 4: Park + 360° spin transitions (replace master timeline)

**Files:**
- Modify: `pages/index.vue` (remove the v2 continuous master timeline; add park-and-spin transitions)

**Interfaces:**
- Consumes: `engine.setPose(pose)`, `engine.setScreen(key)`.

- [ ] **Step 1: Remove the v2 continuous master timeline** (the `gsap.timeline({ scrollTrigger: { trigger:'#hero', endTrigger:'.social', scrub } })` with the 7 `.to(pose, …)` segments) and the footer-pause trigger stays. Keep the v2 per-feature crossfade sub-triggers inside features (priceSync/allergen/multilang) — those swap while the phone is parked (no spin).

- [ ] **Step 2: Define poses + per-section screen, inside the mmPhone motion branch (engine present, not reduced-motion):**

```ts
type Pose = { x: number; y: number; rotX: number; rotY: number; scale: number }
const NEUTRAL = { y: 0, rotX: 0, rotY: 0 }
const POSES: Pose[] = [
  { x: 1.7,  ...NEUTRAL, scale: 1.0 },   // 0 hero    RIGHT
  { x: -1.7, ...NEUTRAL, scale: 1.0 },   // 1 features LEFT
  { x: 1.7,  ...NEUTRAL, scale: 1.0 },   // 2 how     RIGHT
  { x: -1.7, ...NEUTRAL, scale: 1.0 },   // 3 roi     LEFT
  { x: 0,    ...NEUTRAL, scale: 1.15 },  // 4 social  CENTER
]
const SECT = ['#hero', '.features', '.how', '.roi', '.social']
const SCREEN: ScreenKey[] = ['menu', 'priceSync', 'qrSteps', 'allergen', 'review']
engine.setPose(POSES[0])
engine.setScreen('menu')
```

- [ ] **Step 3: One scrubbed transition per gap (slide + 360° spin + screen swap at half).**

```ts
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const transitions = SECT.slice(1).map((sel, i) => {
  const from = POSES[i], to = POSES[i + 1]
  let swapped = false
  return ScrollTrigger.create({
    trigger: sel,
    start: 'top bottom',
    end: 'top center',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress
      engine?.setPose({
        x: lerp(from.x, to.x, p),
        y: lerp(from.y, to.y, p),
        rotX: lerp(from.rotX, to.rotX, p),
        rotY: lerp(from.rotY, to.rotY, p) + Math.PI * 2 * p,  // full barrel roll
        scale: lerp(from.scale, to.scale, p),
      })
      // swap the screen while the back faces the camera (~half spin)
      if (p >= 0.5 && !swapped) { engine?.setScreen(SCREEN[i + 1]); swapped = true }
      if (p < 0.5 && swapped)  { engine?.setScreen(SCREEN[i]);     swapped = false }
    },
  })
})
cleanup.push(() => transitions.forEach((t) => t.kill()))
```
While no transition is active (a section centered), the last `setPose` value holds → the phone parks at `POSES[k]`.

- [ ] **Step 4: Verify** (WebGL on, real browser)

Run: `npm run build` — Expected: passes.
Run: `npm run dev` — Expected: hero phone is parked RIGHT with no jump; scrolling to features slides it LEFT with a full 360° spin and the screen changes to price-sync mid-spin; it then HOLDS at LEFT while features is read; how→RIGHT, roi→LEFT, testimonials→CENTER each with a spin + screen swap; scrolling back reverses cleanly; phone never overlaps text. No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: park-per-section phone with 360 spin transitions + screen swap at half-spin"
```

---

### Task 5: Section redesign — hero + features (awwwards refined)

**Files:**
- Modify: `pages/index.vue` (hero + features markup/CSS + reveals)

**Interfaces:** consumes Poppins/tokens (T1), the LEFT/RIGHT phone slots (the phone occupies the empty column; content goes opposite).

- [ ] **Step 1: Invoke design skills.** Use `frontend-design:frontend-design`, `ui-ux-pro-max`, `emil-design-eng`, `motion-design`, `gsap-core`, `gsap-scrolltrigger`, `gsap-plugins` (SplitText). Target an "awwwards" agency feel: refined grid, considered whitespace, medium confident type (heading clamp ~2–3.4rem, NOT oversized), strong hierarchy, restrained motion.

- [ ] **Step 2: Rebuild HERO** — content LEFT, phone slot RIGHT. A tidy editorial column: small eyebrow, a SplitText headline (line-by-line reveal with a CustomEase), one-line subhead, dual CTA, and a thin metadata row (e.g. "No app • Instant QR • 12 languages"). Generous but balanced spacing using `--maxw`/`--gutter`. Keep the right column empty (phone slot). No content under the phone.

- [ ] **Step 3: Rebuild FEATURES** — phone slot LEFT, content RIGHT. Three `.feature-step` blocks (Instant Price Sync / Allergen Tags / Multi-language) in a clean vertical rhythm with an index number, title, and a short line; the active step brightens (keep the existing `.feature-step` class + the v2 sub-step crossfade triggers that swap priceSync/allergen/multilang while parked). Refined dividers, not boxes.

- [ ] **Step 4: Reveals** — add tasteful entrance reveals (SplitText words/lines + stagger, small `y`, `CustomEase`) via ScrollTrigger for hero + features content. Respect reduced-motion (near-instant, content visible). Use the existing `mm`/`mmPhone` reduceMotion patterns; new reveals go in a motion branch.

- [ ] **Step 5: Verify**

Run: `npm run build` — Expected: passes.
Run: `npm run dev` — Expected: hero + features read as refined/balanced (Poppins, medium type, good whitespace), content on the opposite side from the phone with no overlap, reveals fire smoothly; reduced-motion shows content immediately. No console errors.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: redesign hero + features sections (awwwards refined) with tasteful reveals"
```

---

### Task 6: Section redesign — how + roi + testimonials + footer

**Files:**
- Modify: `pages/index.vue` (how/roi/social/foot markup/CSS + reveals)

**Interfaces:** consumes Poppins/tokens; ROI reactive logic (`covers`/`avgBill`/`extraRevenue`/`displayRevenue`/watch) must be PRESERVED unchanged.

- [ ] **Step 1: Invoke the same design skills** (as Task 5) and keep one cohesive system across all sections.

- [ ] **Step 2: HOW** — content LEFT, phone slot RIGHT. Numbered steps (Scan → Browse → Order) in clean rows with refined typographic hierarchy; subtle line reveals. Keep `.how`, `.how__step*` class names (animation targets).

- [ ] **Step 3: ROI** — phone slot LEFT, calculator RIGHT. Restyle the calculator (two custom range sliders + result board) to the refined system; KEEP all script/refs/computed/watch and the `@input` bindings exactly. Animated counter unchanged.

- [ ] **Step 4: TESTIMONIALS** — phone CENTER; arrange testimonial cards in a refined asymmetric composition around the center gap (keep `.testimonial` class so the existing batch reveal applies; do not add a second entrance reveal). 

- [ ] **Step 5: FOOTER** — keep the organic warm footer; align type/spacing to the Poppins system; AA contrast retained.

- [ ] **Step 6: Verify**

Run: `npm run build` — Expected: passes.
Run: `npm run dev` — Expected: how/roi/testimonials/footer match the refined system; ROI sliders still update the revenue board; testimonials wrap around the centered phone; no overlap; reduced-motion content visible. No console errors.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: redesign how/roi/testimonials/footer to the refined system (ROI logic preserved)"
```

---

### Task 7: Full verification + cleanup

**Files:** `composables/useHeroPhone3D.ts` (dispose audit), verification only otherwise.

- [ ] **Step 1: Dispose audit.** Confirm `dispose()` releases: renderer (+forceContextLoss), DRACOLoader, all geometries/materials, the six screen CanvasTextures, the PMREM env texture, the window resize listener, RAF. Confirm `index.vue` onUnmounted: kills all ScrollTriggers, `smoother?.kill()`, `mm*/mmPhone.revert()`, `engine.dispose()`. No leftover `crossfadeScreen`/overlay-plane references.

- [ ] **Step 2: Production build**

Run: `npm run build` — Expected: completes, no errors.

- [ ] **Step 3: Full dev smoke** (WebGL on)

Run: `npm run dev`. Verify end to end: Poppins everywhere; smooth scroll; hero phone parked right (no jump); phone parks per section and does a 360° spin + screen swap at half-spin between sections; menu is in-device (occluded when backward); ROI interactive; sections refined and no text overlap; reduced-motion + no-WebGL fallbacks work (static phone, native scroll, content usable); console clean; navigate-away disposes (no context-loss spam, `ScrollTrigger.getAll().length` → 0, no smoother left).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: v3 dispose audit + full verification"
```

---

## Self-Review

- **Spec coverage:** Poppins + tokens (T1) ✓; ScrollSmoother alias+register+wrapper+create/kill, journey-only (T2) ✓; menu in-device via screen mesh + initial hero pose (T3) ✓; park-per-section + 360 spin + screen swap at half-spin (T4) ✓; awwwards redesign hero/features (T5) + how/roi/testimonials/footer (T6) ✓; ROI logic preserved (T6) ✓; reduced-motion/no-WebGL skips ScrollSmoother + journey, content usable (T2/T4/T5/T6) ✓; disposal incl smoother.kill (T7) ✓; warm tokens / no utility framework (all) ✓; GSAP single registration in plugin (T2, Global Constraints) ✓.
- **Placeholder scan:** the section-redesign tasks (T5/T6) specify structure, type scale, reveal pattern, preserved class names, and constraints, with design-skill latitude for exact CSS — concrete direction, not vague "make it nice". No TBD/TODO. Code-bearing steps (T1–T4) contain complete code.
- **Type consistency:** `setScreen(key: ScreenKey)` replaces `crossfadeScreen` consistently across T3/T4/T7; `Pose`/`POSES`/`SECT`/`SCREEN` defined in T4 and used there; ScreenKey union unchanged; `setPose`/`setRenderActive`/`setIdle`/`dispose` names stable; engine `setScreen` called only via `engine?.` guards.
- **Note:** No unit tests (visual/3D/scroll feature) — each task ends with build + dev/browser smoke per the spec decision. Final pose/spacing values are tuned live (WebGL on) by the user, as agreed.
