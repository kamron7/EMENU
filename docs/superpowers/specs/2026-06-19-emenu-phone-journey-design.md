# eMenu v2 — Persistent 3D Phone Journey Design Spec

**Date:** 2026-06-19
**Status:** Approved (design), pending implementation plan
**Supersedes:** hero (v1 Task 4) and feature carousel (v1 Task 5); restructures all section layouts.

## Goal

Replace the v1 hero (floating dish cards + flat CSS phone) with a real WebGL
3D phone that persists across the whole page and is choreographed by scroll: it
travels between sections, its on-screen content crossfades per section, and
every section's layout is restructured around the phone's current position
(Apple-product-scroll style).

## Decisions (from brainstorming)

- **3D stack:** raw Three.js (not TresJS / not `<model-viewer>`).
- **Phone model:** a free CC0 realistic phone `.glb`, committed to
  `public/models/phone.glb`, license recorded, marked for swap.
- **Hero layout:** phone is the right-side centerpiece; headline + dual CTA left
  (v1 floating cards removed).
- **Persistence:** ONE fixed full-viewport `<canvas>`; the phone lives there for
  the whole page and moves between sections via a master scrubbed ScrollTrigger
  timeline.
- **Feature carousel:** the v1 pinned horizontal carousel is REMOVED; features
  becomes a phone waypoint (phone parks left, 3 feature texts reveal while the
  phone screen crossfades 3 feature UIs).
- **Screen sequence:** Menu → Feature UIs (price-sync / allergen / multilang) →
  QR + steps → 5-star review.

## Constraints (carried from v1, still binding)

- No Tailwind / utility framework. Raw scoped CSS only.
- Vue 3 Composition API (`ref`, `computed`, `watch`, `onMounted`, `onUnmounted`).
- All GSAP + Three.js code client-only (guard `import.meta.client`; create in
  `onMounted`). No WebGL/Three on the server.
- Warm "eatable" theme; design tokens only (`--bg-warm` `--bg-vanilla`
  `--bg-cream` `--accent-orange` `--terracotta` `--brown-deep` `--text-main`
  `--text-soft` `--shadow-warm` `--ease-organic`). No pure dark/black/tech-blue.
- GSAP from local `gsap-public` bundle (existing alias). GSAP registered in the
  existing client plugin (single registration point — do not re-register in the
  page).
- Cleanup on `onUnmounted`: kill all ScrollTriggers, dispose all Three.js
  resources, cancel RAF, remove listeners.
- Unsplash / placeholder assets comment-marked `/* swap */`.

## The Journey (waypoints)

Phone position is described as the on-screen "slot" it parks in. Content is
laid out on the opposite side, never overlapping the slot.

| # | Section | Phone slot | Phone pose (approx) | Screen content | Content side |
|---|---------|-----------|---------------------|----------------|--------------|
| 1 | Hero | right | enters scaling 0.7→1, slight rotateY | Digital menu | text left |
| 2 | Features | left | rotateY sweep across 3 sub-steps | price-sync → allergen → multilang | feature texts right (reveal per sub-step) |
| 3 | How it Works | right | upright, gentle tilt | QR scan + numbered steps | steps left |
| 4 | ROI | left | tilt | "revenue ↑" dashboard | interactive ROI calculator right |
| 5 | Testimonials | center → exit | center, then scale↓ + fade out | 5-star review card | review cards around |
| 6 | Footer | absent | (render paused) | — | normal footer |

## Architecture

### File layout (new / changed)
```
public/models/phone.glb            # CC0 phone model (swap-marked, license noted)
composables/useHeroPhone3D.ts      # client-only Three.js scene module (the engine)
pages/index.vue                    # orchestration: canvas ref, ScrollTriggers, layout
assets/css/tokens.css              # unchanged (tokens reused)
package.json                       # + "three" dependency (+ @types/three dev)
nuxt.config.ts                     # add 'three' to build.transpile if needed
```

### `composables/useHeroPhone3D.ts` (the engine)
Pure Three.js, no scroll knowledge. Exposes a small interface:

- `init(canvas: HTMLCanvasElement): Promise<void>` — create renderer
  (`antialias:true`, `alpha:true`, `setPixelRatio(min(devicePixelRatio,2))`),
  scene, perspective camera, warm 3-point lighting + soft environment for
  glossy reflections, load `phone.glb` via `GLTFLoader`, locate the screen mesh
  (by name/material; fallback: add a thin plane at the screen face), attach two
  stacked screen planes (`screenA`, `screenB`) for crossfade, start the RAF loop.
- `setPose(p: { x:number; y:number; rotY:number; rotX:number; scale:number }): void`
  — set the phone group transform (called every scrub tick).
- `crossfadeScreen(key: ScreenKey): void` — fade `screenB` to the new texture
  then commit (GSAP opacity tween on the plane materials). `ScreenKey =
  'menu'|'priceSync'|'allergen'|'multilang'|'qrSteps'|'review'`.
- `setIdle(enabled: boolean): void` — toggle subtle idle float (sin-based offset
  in the RAF loop).
- `setRenderActive(active: boolean): void` — pause/resume the RAF loop (paused
  when the phone is fully offscreen, e.g. footer) for performance.
- `resize(): void` — driven by a `ResizeObserver` on the canvas.
- `dispose(): void` — cancel RAF, dispose geometries/materials/textures/renderer,
  remove listeners, lose WebGL context cleanly.

Screen textures are produced by pure draw functions returning a `CanvasTexture`
(`drawMenu`, `drawPriceSync`, `drawAllergen`, `drawMultilang`, `drawQrSteps`,
`drawReview`) — each renders dish rows / UI chrome / food image in warm tokens.
Food images use Unsplash URLs drawn into the canvas (swap-marked).

### Orchestration in `pages/index.vue`
- A `<canvas class="phone-stage">` fixed full-viewport, `pointer-events:none`,
  z-index between section backgrounds and text content.
- In `onMounted` (client, after WebGL capability check): `await engine.init(canvas)`.
- **Phone transform** — ONE master GSAP timeline with a ScrollTrigger scrubbed
  across the whole journey (start hero top, end testimonials bottom). The
  timeline has section-aligned segments, each tweening a plain `pose` object
  whose `onUpdate` calls `engine.setPose(pose)`. Segment poses place the phone in
  the correct slot (x), rotation, and scale per the waypoint table.
- **Screen crossfade** — one ScrollTrigger per section (`onEnter` /
  `onEnterBack`) calls `engine.crossfadeScreen(key)`. Features has 3 nested
  triggers (one per feature sub-step) crossfading price-sync/allergen/multilang
  AND revealing the matching feature text.
- **Exit** — at testimonials end, the timeline scales the phone down + the engine
  fades it; a final ScrollTrigger calls `engine.setRenderActive(false)` when the
  footer is reached, and re-activates on `onLeaveBack`.
- All of the above inside one `gsap.matchMedia()` instance with a `reduceMotion`
  branch; push `() => mm.revert()` and `() => engine.dispose()` to a module-scope
  `cleanup` array run in `onUnmounted` (which also kills all ScrollTriggers).

### Section layout restructure
Each section becomes a CSS grid that reserves an empty "phone slot" column on
the side the phone occupies for that section (alternating right/left/right/left/
center). Content fills the opposite column(s). On mobile (≤ ~820px) sections
stack vertically and the phone slot becomes a fixed-height band; the journey
simplifies (less horizontal travel) but the phone still crossfades screens.

## Reduced-motion / no-WebGL fallback (mandatory)
If `prefers-reduced-motion: reduce` OR WebGL is unavailable OR the GLB fails to
load: do NOT run the journey. Instead:
- Render a static angled phone IMAGE (one Unsplash poster, swap-marked) in the
  hero slot only.
- Each section falls back to a simple, already-proven per-section reveal (fade/
  slide in) so all content remains fully usable and the page never looks broken.
- The fixed canvas is removed/hidden in this branch.

## Performance
- Single renderer; pixelRatio capped at 2; RAF paused when phone offscreen.
- Scrub-driven transform (no per-frame layout thrash; transforms only).
- Textures created once and cached; crossfade reuses two planes.
- `ResizeObserver` (not resize-event spam) for canvas sizing.
- DRACO loader only if the chosen GLB is Draco-compressed (decoder from three
  examples, hosted locally under `public/`).

## What is removed / rewritten
- v1 hero `.hero__visual` (both `.hero__card`) and all `.hero__phone*` markup +
  CSS + the v1 mm4 phone tween → removed.
- v1 Task 5 pinned horizontal carousel (`.features__track` pin, blob parallax
  pin) → removed; features rebuilt as a waypoint section.
- v1 per-section phone-related `matchMedia` tweens for hero/features → folded
  into the master journey timeline.
- Kept: SplitText headline reveal, ROI calculator logic + reactive state,
  testimonials content, footer, design tokens, header/nav, GSAP client plugin.

## Testing / verification
- `npm install` (adds `three`) succeeds; `npm run build` passes, no SSR/WebGL
  reference errors.
- `npm run dev`: canvas mounts; GLB loads (or fallback image shows); scrolling
  hero→testimonials moves the phone between slots; screen crossfades per section
  (menu→features→qr→review); section layouts alternate; ROI still interactive.
- Reduced-motion: static phone image + simple section reveals, no journey,
  fully usable.
- No-WebGL (simulate by forcing the capability check false): same fallback.
- Console clean; navigating away disposes Three.js (no "context lost" warnings,
  no leaked ScrollTriggers).
- No automated unit tests (visual/3D component) — verification is build + dev
  smoke per above.

## Out of scope (YAGNI)
- Photoreal PBR environment maps beyond a simple warm studio look.
- Physics, post-processing, multiple models.
- Backend, real menu data, i18n runtime.
- Full mobile parity of the desktop journey (mobile gets the simplified version).
