# eMenu v2 — Persistent 3D Phone Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the v1 hero with a real WebGL 3D phone that persists across the whole page and is scroll-choreographed between sections, crossfading its on-screen content per section, with all section layouts restructured around it.

**Architecture:** ONE fixed full-viewport `<canvas>` hosts a single Three.js renderer. A framework-agnostic engine (`composables/useHeroPhone3D.ts`) owns the scene/model/screens and exposes `setPose`/`crossfadeScreen`/`setRenderActive`/`dispose`. `pages/index.vue` orchestrates a master scrubbed ScrollTrigger timeline (phone transform) plus per-section triggers (screen crossfade), all inside one `gsap.matchMedia()` with a reduced-motion/no-WebGL fallback.

**Tech Stack:** Nuxt 3, Vue 3 Composition API, raw Three.js (`three`), GSAP + ScrollTrigger + SplitText (local `gsap-public` bundle), raw scoped CSS.

## Global Constraints

- No Tailwind / utility framework. Raw scoped CSS only.
- Vue 3 Composition API only (`ref`, `computed`, `watch`, `onMounted`, `onUnmounted`).
- All GSAP + Three.js is client-only: guard with `import.meta.client`, create in `onMounted`. No Three/WebGL on the server.
- GSAP comes from the local bundle and is registered ONCE in `plugins/gsap.client.ts`. Do NOT call `gsap.registerPlugin` in the page.
- Warm theme; design tokens only: `--bg-warm:#fdf6ec` `--bg-vanilla:#fbedd6` `--bg-cream:#fff9f0` `--accent-orange:#ff7a18` `--terracotta:#c75b39` `--brown-deep:#3a2a1e` `--text-main:#3a2a1e` `--text-soft:#6b5444` `--shadow-warm:0 20px 60px rgba(199,91,57,.18)` `--ease-organic:cubic-bezier(.22,1,.36,1)`. No pure dark/black/tech-blue.
- Cleanup on `onUnmounted`: kill ALL ScrollTriggers, dispose ALL Three.js resources, cancel RAF, remove listeners. No WebGL context leak.
- Placeholder assets (Unsplash URLs, GLB) comment-marked `/* swap */`.
- ScreenKey type is exactly: `'menu' | 'priceSync' | 'allergen' | 'multilang' | 'qrSteps' | 'review'`.
- Pose object shape is exactly: `{ x: number; y: number; rotX: number; rotY: number; scale: number }` (x/y in world units, rot in radians).

---

### Task 1: Dependency + WebGL capability check + fixed canvas + remove v1 phone visuals

**Files:**
- Modify: `package.json` (add `three`, `@types/three`)
- Modify: `nuxt.config.ts` (transpile `three` if needed)
- Create: `composables/useWebGLSupport.ts`
- Modify: `pages/index.vue` (add canvas; remove v1 hero `.hero__visual` cards + `.hero__phone*` markup/CSS + v1 mm4 phone tween)

**Interfaces:**
- Produces: `useWebGLSupport(): boolean` (client-safe WebGL2/WebGL detection, returns false on server); a `<canvas ref="stageCanvas" class="phone-stage">` element + `stageCanvas` ref in `index.vue`.

- [ ] **Step 1: Add three to `package.json`**

Add to `dependencies`: `"three": "^0.169.0"`. Add to `devDependencies`: `"@types/three": "^0.169.0"`.

- [ ] **Step 2: Transpile in `nuxt.config.ts`**

Ensure `build.transpile` includes both: `build: { transpile: ['gsap', 'three'] }`.

- [ ] **Step 3: Create `composables/useWebGLSupport.ts`**

```ts
export function useWebGLSupport(): boolean {
  if (!import.meta.client) return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    )
  } catch {
    return false
  }
}
```

- [ ] **Step 4: Add the fixed canvas to `index.vue` template**

Add as the FIRST child of the root element (so it sits behind content via CSS):

```vue
<canvas ref="stageCanvas" class="phone-stage" aria-hidden="true"></canvas>
```

Add to `<script setup>`: `const stageCanvas = ref<HTMLCanvasElement | null>(null)`.

- [ ] **Step 5: Canvas CSS (scoped)**

```css
.phone-stage {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 2;            /* above section backgrounds, below text content (text uses z-index: 3) */
}
```
Ensure section text wrappers establish stacking with `position: relative; z-index: 3;`.

- [ ] **Step 6: Remove v1 hero phone visuals**

In `index.vue` delete: the entire `.hero__visual` block (both `.hero__card--back` and `.hero__card--front`) and the `.hero__phone-wrap`/`.hero__phone` markup with its inner screen/menu rows; their scoped CSS rules; and the v1 hero phone GSAP tween (the `gsap.fromTo('.hero__phone', ...)` + its pin) inside `mm4`. KEEP the hero headline (`.hero__headline` SplitText), eyebrow, body, and dual CTA. Leave a hero right-column empty grid slot (the phone will occupy it visually via the fixed canvas).

- [ ] **Step 7: Verify**

Run: `npm install` (fetches three) — Expected: succeeds.
Run: `npm run build` — Expected: passes, no errors.
Run: `npm run dev`, open `/` — Expected: hero shows headline+CTA on the left, an empty right slot, a transparent fixed canvas present (inspect DOM: `canvas.phone-stage`), no floating cards, no console errors.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: add three dep, WebGL check, fixed phone canvas; remove v1 hero phone visuals"
```

---

### Task 2: Phone GLB asset + engine init/render/resize/dispose

**Files:**
- Create: `public/models/phone.glb` (CC0 model)
- Create: `composables/useHeroPhone3D.ts` (engine: init/render/resize/dispose; procedural fallback)
- Modify: `pages/index.vue` (init engine in onMounted when client+WebGL; dispose in onUnmounted)

**Interfaces:**
- Produces: `createHeroPhone3D(): HeroPhone3D` where
  ```ts
  interface HeroPhone3D {
    init(canvas: HTMLCanvasElement): Promise<void>
    resize(): void
    dispose(): void
  }
  ```
  (Later tasks extend the SAME interface with `setPose`, `crossfadeScreen`, `setIdle`, `setRenderActive`.)

- [ ] **Step 1: Source the GLB**

Download a CC0-licensed realistic phone model to `public/models/phone.glb`. Candidate sources (pick one that is reachable and CC0): poly.pizza (search "phone", filter CC0 — provides direct `.glb` download), or Khronos/glTF community CC0 phone. Add a sibling `public/models/LICENSE.txt` recording the model name, author, source URL, and CC0. Mark the path in code with `/* swap: replace public/models/phone.glb with your model */`.
If NO clean asset is reachable in the environment, leave `phone.glb` absent — the engine's procedural fallback (Step 3) renders a clean phone so the build is never blocked. Note which path you took in the report.

- [ ] **Step 2: Engine skeleton — `composables/useHeroPhone3D.ts` (init/render/resize/dispose)**

```ts
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export interface PhonePose { x: number; y: number; rotX: number; rotY: number; scale: number }

export interface HeroPhone3D {
  init(canvas: HTMLCanvasElement): Promise<void>
  resize(): void
  dispose(): void
}

export function createHeroPhone3D(): HeroPhone3D {
  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let phone: THREE.Group | null = null
  let raf = 0
  let canvasEl: HTMLCanvasElement | null = null
  const disposables: Array<() => void> = []

  function buildProceduralPhone(): THREE.Group {
    const g = new THREE.Group()
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2.05, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x2b1f18, roughness: 0.35, metalness: 0.6 })
    )
    // rounded look via a slightly larger soft-edged screen plane on +z face
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 1.92),
      new THREE.MeshBasicMaterial({ color: 0xfff9f0 })
    )
    screen.position.z = 0.061
    screen.name = 'screen'
    g.add(body, screen)
    return g
  }

  async function loadPhone(): Promise<THREE.Group> {
    try {
      const loader = new GLTFLoader()
      const gltf = await loader.loadAsync('/models/phone.glb') /* swap */
      const root = gltf.scene
      // normalize: center + scale to ~2 units tall
      const box = new THREE.Box3().setFromObject(root)
      const size = new THREE.Vector3(); box.getSize(size)
      const center = new THREE.Vector3(); box.getCenter(center)
      root.position.sub(center)
      const s = 2 / (size.y || 1)
      const wrap = new THREE.Group(); wrap.add(root); wrap.scale.setScalar(s)
      return wrap
    } catch {
      return buildProceduralPhone()
    }
  }

  async function init(canvas: HTMLCanvasElement): Promise<void> {
    canvasEl = canvas
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    // warm 3-point lighting
    const key = new THREE.DirectionalLight(0xfff0d8, 2.2); key.position.set(3, 4, 5)
    const fill = new THREE.DirectionalLight(0xffd9a8, 0.8); fill.position.set(-4, 0, 2)
    const rim = new THREE.DirectionalLight(0xffffff, 1.0); rim.position.set(0, 2, -5)
    const amb = new THREE.AmbientLight(0xfff3e2, 0.6)
    scene.add(key, fill, rim, amb)

    phone = await loadPhone()
    scene.add(phone)

    const loop = () => { raf = requestAnimationFrame(loop); if (renderer && scene && camera) renderer.render(scene, camera) }
    loop()
  }

  function resize(): void {
    if (!renderer || !camera || !canvasEl) return
    const w = canvasEl.clientWidth, h = canvasEl.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function dispose(): void {
    cancelAnimationFrame(raf)
    disposables.forEach(fn => fn())
    scene?.traverse(obj => {
      const m = obj as THREE.Mesh
      if (m.geometry) m.geometry.dispose()
      const mat = m.material as THREE.Material | THREE.Material[] | undefined
      if (Array.isArray(mat)) mat.forEach(x => x.dispose()); else mat?.dispose()
    })
    renderer?.dispose()
    renderer?.forceContextLoss?.()
    renderer = null; scene = null; camera = null; phone = null; canvasEl = null
  }

  return { init, resize, dispose }
}
```
(The `phone`, `scene`, etc. closures are reused by later tasks — keep them at this scope.)

- [ ] **Step 3: Wire into `index.vue`**

In `<script setup>` add module-scope (inside setup) `let engine: ReturnType<typeof createHeroPhone3D> | null = null`. In `onMounted`, after the existing client guard:
```ts
const webgl = useWebGLSupport()
if (webgl && stageCanvas.value) {
  const { createHeroPhone3D } = await import('~/composables/useHeroPhone3D')
  engine = createHeroPhone3D()
  await engine.init(stageCanvas.value)
  const ro = new ResizeObserver(() => engine?.resize())
  ro.observe(stageCanvas.value)
  cleanup.push(() => ro.disconnect())
  cleanup.push(() => { engine?.dispose(); engine = null })
}
```
(`cleanup` is the existing module-scope teardown array run in `onUnmounted`.)

- [ ] **Step 4: Verify**

Run: `npm run build` — Expected: passes, no SSR/Three reference errors (engine import is dynamic + client-guarded).
Run: `npm run dev`, open `/` — Expected: a 3D phone renders in the canvas (GLB if asset present, else procedural), lit warmly; resizing the window keeps it crisp; no console errors. Navigate to another route and back (or HMR) — Expected: no "WebGL context lost" warning accumulation.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Three.js phone engine (GLB load + procedural fallback, init/resize/dispose)"
```

---

### Task 3: Screen textures + two crossfade planes + crossfadeScreen/setIdle API

**Files:**
- Create: `composables/phoneScreens.ts` (draw functions → CanvasTexture)
- Modify: `composables/useHeroPhone3D.ts` (screen planes, `crossfadeScreen`, `setIdle`)

**Interfaces:**
- Consumes: `phone`/`scene` from Task 2; GSAP for the fade tween (import dynamically inside the engine OR accept a passed `gsap`). Use `import { gsap } from 'gsap'` at top of the engine module (alias resolves to the local bundle; tree-shaken on client).
- Produces (extends `HeroPhone3D`): `crossfadeScreen(key: ScreenKey): void`, `setIdle(enabled: boolean): void`. `type ScreenKey = 'menu'|'priceSync'|'allergen'|'multilang'|'qrSteps'|'review'`.

- [ ] **Step 1: Screen draw functions — `composables/phoneScreens.ts`**

Each returns a `CanvasTexture` drawn on a 512×1024 canvas in warm tokens. Provide a shared helper and ONE full implementation; the others follow the same template with the content specified.

```ts
import * as THREE from 'three'

export type ScreenKey = 'menu' | 'priceSync' | 'allergen' | 'multilang' | 'qrSteps' | 'review'

const W = 512, H = 1024
const CREAM = '#fff9f0', WARM = '#fdf6ec', ORANGE = '#ff7a18', TERRA = '#c75b39', BROWN = '#3a2a1e', SOFT = '#6b5444'

function base(): { c: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const ctx = c.getContext('2d')!
  ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H)
  return { c, ctx }
}
function toTexture(c: HTMLCanvasElement): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t
}
function row(ctx: CanvasRenderingContext2D, y: number, dish: string, price: string, accent = false) {
  ctx.fillStyle = BROWN; ctx.font = '32px system-ui'; ctx.textAlign = 'left'; ctx.fillText(dish, 40, y)
  ctx.fillStyle = accent ? ORANGE : SOFT; ctx.textAlign = 'right'; ctx.fillText(price, W - 40, y)
}

export function drawMenu(): THREE.CanvasTexture {
  const { c, ctx } = base()
  ctx.fillStyle = ORANGE; ctx.fillRect(0, 0, W, 220)            // header band
  ctx.fillStyle = CREAM; ctx.font = 'bold 44px system-ui'; ctx.textAlign = 'left'; ctx.fillText("Today's Menu", 40, 130)
  ctx.fillStyle = BROWN; row(ctx, 320, 'Saffron Risotto', '€18')
  row(ctx, 400, 'Slow Lamb Shoulder', '€24', true)
  row(ctx, 480, 'Burrata & Tomato', '€14')
  row(ctx, 560, 'Chocolate Fondant', '€9')
  return toTexture(c)
}
// drawPriceSync, drawAllergen, drawMultilang, drawQrSteps, drawReview:
//   same base()+toTexture(); content per spec:
//   - drawPriceSync: header "Instant Price Sync"; two columns showing an old price
//     struck through and a new price in ORANGE; a small "synced ✓" pill.
//   - drawAllergen: header "Allergen Tags"; dish rows each followed by small
//     rounded chips ("gluten-free", "nuts", "vegan") in TERRA/ORANGE.
//   - drawMultilang: header "Multi-language"; the same dish name shown in 3
//     languages stacked (EN/FR/中文) with a globe glyph.
//   - drawQrSteps: header "Scan to view"; a QR-like grid (draw a 8×8 block matrix)
//     centered, with "1 Scan  2 Browse  3 Order" steps beneath.
//   - drawReview: 5 ORANGE stars row; a short quote in BROWN; reviewer name +
//     "★ 4.9 / 320 reviews" in SOFT.
// Implement all five fully following drawMenu's structure.

export function buildAllScreens(): Record<ScreenKey, THREE.CanvasTexture> {
  return { menu: drawMenu(), priceSync: drawPriceSync(), allergen: drawAllergen(),
           multilang: drawMultilang(), qrSteps: drawQrSteps(), review: drawReview() }
}
```

- [ ] **Step 2: Two stacked screen planes + crossfade in the engine**

In `init`, after the phone is added, locate the screen mesh (`phone.getObjectByName('screen')`; if not found, create a plane sized to the model's front face). Build two coplanar planes `screenA`, `screenB` (B slightly in front, `transparent: true`, `opacity: 0`) as children of the phone screen, materials `MeshBasicMaterial`. Cache `const screens = buildAllScreens()`. Set `screenA.material.map = screens.menu`. Track `currentKey: ScreenKey = 'menu'`.

```ts
function crossfadeScreen(key: ScreenKey): void {
  if (!phone || key === currentKey) return
  const matB = screenB.material as THREE.MeshBasicMaterial
  matB.map = screens[key]; matB.needsUpdate = true
  gsap.to(matB, { opacity: 1, duration: 0.5, ease: 'power2.out', onComplete: () => {
    const matA = screenA.material as THREE.MeshBasicMaterial
    matA.map = screens[key]; matA.needsUpdate = true; matB.opacity = 0
  }})
  currentKey = key
}
```

- [ ] **Step 3: setIdle (subtle float)**

Add an `idle` flag; in the RAF loop, when `idle`, offset phone `position.y += Math.sin(t)*0.03` and `rotation.y += small`. `function setIdle(enabled: boolean){ idle = enabled }`. Add `crossfadeScreen` and `setIdle` to the returned object. Dispose the cached screen textures in `dispose()` (add to `disposables`).

- [ ] **Step 4: Temporary wire to verify**

Temporarily in `index.vue` after init: `engine.setIdle(true)` and call `engine.crossfadeScreen('review')` behind a 1.5s `setTimeout` (REMOVE this temp call before commit; it's just to eyeball the crossfade). 

- [ ] **Step 5: Verify**

Run: `npm run build` — Expected: passes.
Run: `npm run dev` — Expected: the phone shows the menu screen, idles with a subtle float, and (with temp call) visibly crossfades to the review screen. Remove temp call. No console errors.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: phone screen textures + two-plane crossfade + idle float"
```

---

### Task 4: setPose + master scrub timeline (phone travels across sections)

**Files:**
- Modify: `composables/useHeroPhone3D.ts` (`setPose`, `setRenderActive`)
- Modify: `pages/index.vue` (master timeline + ScrollTrigger; own matchMedia; cleanup)

**Interfaces:**
- Consumes: `phone` group; engine from Task 2/3.
- Produces (extends `HeroPhone3D`): `setPose(p: PhonePose): void`, `setRenderActive(active: boolean): void`.

- [ ] **Step 1: setPose + setRenderActive in engine**

```ts
function setPose(p: PhonePose): void {
  if (!phone) return
  phone.position.x = p.x; phone.position.y = p.y
  phone.rotation.x = p.rotX; phone.rotation.y = p.rotY
  phone.scale.setScalar(p.scale)
}
let renderActive = true
function setRenderActive(active: boolean): void { renderActive = active }
```
In the RAF loop, early-return the render call (but keep the RAF scheduled) when `!renderActive`. Add both to the returned object.

- [ ] **Step 2: Master timeline in `index.vue`**

Inside the existing `onMounted` (after engine init), within a NEW `gsap.matchMedia()` instance `mmPhone`, motion branch only:

```ts
const pose = { x: 2.2, y: 0, rotX: 0, rotY: -0.5, scale: 0.7 }   // hero start (right)
const apply = () => engine?.setPose(pose)
const tl = gsap.timeline({
  scrollTrigger: { trigger: '#hero', start: 'top top', endTrigger: '.social',
    end: 'bottom bottom', scrub: 1 },
  onUpdate: apply, defaults: { ease: 'none', onUpdate: apply }
})
// hero -> features (slide left), features sub-rotations, how (right), roi (left), testimonials (center), exit
tl.to(pose, { x: 2.2, y: 0, rotY: 0, scale: 1 })                 // hero settle
  .to(pose, { x: -2.2, rotY: 0.5, scale: 0.95 })                 // -> features (left)
  .to(pose, { rotY: 0.5 + Math.PI * 0.5 })                       // features sub-step rotate
  .to(pose, { x: 2.2, rotY: 0, scale: 1 })                       // -> how (right)
  .to(pose, { x: -2.2, rotY: 0.4 })                              // -> roi (left)
  .to(pose, { x: 0, y: 0, rotY: 0, scale: 1.05 })                // -> testimonials (center)
  .to(pose, { y: 1.5, scale: 0.6, rotX: 0.3 })                   // exit up
engine?.setIdle(true)
cleanup.push(() => mmPhone.revert())
```
Wrap the above in `mmPhone.add({ motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => { if (ctx.conditions!.reduce) return; /* build tl */ return () => tl.scrollTrigger?.kill() })`.

- [ ] **Step 3: Render pause at footer**

Add a ScrollTrigger: `ScrollTrigger.create({ trigger: '.foot', start: 'top center', onEnter: () => engine?.setRenderActive(false), onLeaveBack: () => engine?.setRenderActive(true) })`. Push its `.kill()` to cleanup (or rely on the global kill in onUnmounted).

- [ ] **Step 4: Verify**

Run: `npm run build` — Expected: passes.
Run: `npm run dev` — Expected: scrolling moves the phone hero(right)→features(left)→how(right)→roi(left)→testimonials(center)→exits upward; rendering pauses at the footer (verify via a `console.log` in the loop temporarily, then remove). No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: master scroll timeline moving phone between section slots + offscreen render pause"
```

---

### Task 5: Per-section screen crossfades + features waypoint (remove v1 carousel)

**Files:**
- Modify: `pages/index.vue` (remove v1 features carousel; rebuild features waypoint; add crossfade triggers)

**Interfaces:**
- Consumes: `engine.crossfadeScreen(key)`; the master timeline from Task 4.

- [ ] **Step 1: Remove v1 feature carousel**

Delete the v1 `.features__track` horizontal-pin tween, the blob parallax tween, and the `.features__viewport`/track markup + their CSS that exist solely for the horizontal carousel. Keep the three feature concepts (Instant Price Sync, Allergen Tags, Multi-language).

- [ ] **Step 2: Rebuild features as a waypoint**

Markup: a `.features` grid with an empty LEFT phone slot and a RIGHT content column holding three stacked `.feature-step` blocks (one per feature: heading + copy). CSS: each `.feature-step` starts `opacity:.25` and lifts to full when active.

- [ ] **Step 3: Crossfade triggers**

Add these inside `mmPhone`'s motion branch (so they don't run in reduced-motion):
```ts
const fade = (key) => () => engine?.crossfadeScreen(key)
ScrollTrigger.create({ trigger: '#hero', start: 'top center', onEnter: fade('menu'), onEnterBack: fade('menu') })
// features: three sub-steps
ScrollTrigger.create({ trigger: '.feature-step:nth-child(1)', start: 'top 60%', onEnter: fade('priceSync'), onEnterBack: fade('priceSync') })
ScrollTrigger.create({ trigger: '.feature-step:nth-child(2)', start: 'top 60%', onEnter: fade('allergen'), onEnterBack: fade('allergen') })
ScrollTrigger.create({ trigger: '.feature-step:nth-child(3)', start: 'top 60%', onEnter: fade('multilang'), onEnterBack: fade('multilang') })
ScrollTrigger.create({ trigger: '.how', start: 'top center', onEnter: fade('qrSteps'), onEnterBack: fade('qrSteps') })
ScrollTrigger.create({ trigger: '.social', start: 'top center', onEnter: fade('review'), onEnterBack: fade('review') })
```
Also add active-state highlighting of the matching `.feature-step` (toggle a class via the same triggers, or a separate `gsap.to` opacity). (ROI uses the `qrSteps`→stays or a dedicated screen is out of scope; reuse `qrSteps` through the how+roi range, switching to `review` at `.social`.)

- [ ] **Step 4: Verify**

Run: `npm run build` — Expected: passes.
Run: `npm run dev` — Expected: phone screen crossfades menu→priceSync→allergen→multilang (as the three feature steps scroll by)→qrSteps→review; the active feature step brightens; the v1 horizontal carousel is gone. No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: per-section screen crossfades; rebuild features as phone waypoint (drop v1 carousel)"
```

---

### Task 6: Section layout restructure (alternating phone slots)

**Files:**
- Modify: `pages/index.vue` (grid slots + content side per section; keep ROI interactive)

**Interfaces:** consumes the slot positions implied by Task 4 poses (hero right, features left, how right, roi left, testimonials center).

- [ ] **Step 1: Reserve phone slots per section**

For each section, use a CSS grid (`grid-template-columns: 1fr 1fr`) and place content in the column OPPOSITE the phone slot for that section:
- `#hero`: content left, slot right.
- `.features`: slot left, steps right.
- `.how`: content (steps) left, slot right.
- ROI block: slot left, calculator right (ROI stays fully interactive — sliders, computed, animated counter unchanged).
- `.social`: phone center; testimonial cards arranged around it (top row / bottom row leaving a center gap), via grid areas.

Ensure content columns are `position: relative; z-index: 3;` so they sit above the canvas; the empty slot column has nothing (the fixed canvas shows through).

- [ ] **Step 2: Mobile (≤820px)**

Stack everything single-column; the phone slot becomes a fixed-height band (e.g. `min-height: 70vh`) so the phone has vertical room; content stacks above/below. Reduce horizontal pose travel implicitly (the canvas is full-width; the phone x still animates but reads as centered on narrow screens — acceptable).

- [ ] **Step 3: Verify**

Run: `npm run build` — Expected: passes.
Run: `npm run dev` — Expected: at each section the text content sits on the opposite side from the phone with no overlap; ROI sliders still update the revenue board; testimonials wrap around the centered phone; mobile stacks cleanly. No console errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: restructure section layouts into alternating phone slots"
```

---

### Task 7: Reduced-motion / no-WebGL fallback

**Files:**
- Modify: `pages/index.vue` (fallback branch + static phone image; hide canvas)

**Interfaces:** consumes `useWebGLSupport()` and the `mmPhone` reduceMotion branch.

- [ ] **Step 1: Static phone image markup**

Add to the hero right slot a `<img class="hero__phone-fallback" ... >` (Unsplash angled phone photo, `/* swap */`, `alt="eMenu app on a phone"`), default `display: none`.

- [ ] **Step 2: Activate fallback**

When `!useWebGLSupport()` OR the engine init throws OR `prefers-reduced-motion: reduce`: do NOT init/animate the phone; set `document` state so CSS shows `.hero__phone-fallback` (e.g. add a `no-journey` class on the root) and hides `.phone-stage`. In the `mmPhone` `reduce` branch, also reveal each section's content with a simple fade/slide-in ScrollTrigger (`gsap.from(section content, { opacity:0, y:30 })`) so the page reads well without the journey.

- [ ] **Step 3: CSS**

```css
.no-journey .phone-stage { display: none; }
.no-journey .hero__phone-fallback { display: block; }
.hero__phone-fallback { width: 100%; max-width: 320px; border-radius: 2rem; box-shadow: var(--shadow-warm); }
```

- [ ] **Step 4: Verify**

Run: `npm run dev`. Test reduced-motion: in DevTools Rendering → "Emulate prefers-reduced-motion: reduce" → Expected: no journey, static phone image in hero, sections fade in, fully usable, no canvas.
Test no-WebGL: temporarily force `useWebGLSupport` to return false → Expected: same fallback. Revert the force.
Run: `npm run build` — Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: reduced-motion / no-WebGL fallback (static phone + simple reveals)"
```

---

### Task 8: Performance + cleanup hardening + full verification

**Files:**
- Modify: `composables/useHeroPhone3D.ts` (dispose completeness, DRACO only if needed)
- Verification only otherwise

- [ ] **Step 1: Dispose completeness**

Confirm `dispose()` disposes: all geometries, all materials, ALL screen CanvasTextures (the cached `screens` map + any map on screenA/B), the renderer (`renderer.dispose()` + `forceContextLoss()`), cancels RAF, disconnects the ResizeObserver (from index.vue cleanup), and removes any pointer listeners. Add any missing disposal to the `disposables` array.

- [ ] **Step 2: DRACO (only if the chosen GLB is Draco-compressed)**

If `loadAsync` warns/needs Draco: copy the three `draco/` decoder into `public/draco/` and set `loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'))`. If the model isn't compressed, skip this step entirely (YAGNI).

- [ ] **Step 3: Full production build**

Run: `npm run build` — Expected: completes, no errors/warnings about three/SSR/WebGL.

- [ ] **Step 4: Full dev smoke**

Run: `npm run dev`. Verify end-to-end: phone loads; scroll hero→testimonials moves the phone between alternating slots; screens crossfade menu→priceSync→allergen→multilang→qrSteps→review; ROI interactive; render pauses at footer; reduced-motion + no-WebGL fallbacks work; console clean; navigate away → no WebGL "context lost" spam and `ScrollTrigger.getAll().length` returns to 0.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: harden Three.js disposal + full v2 phone-journey verification"
```

---

## Self-Review

- **Spec coverage:** raw Three.js (T2) ✓; CC0 GLB + swap + license (T2) ✓; phone-right hero, cards removed (T1) ✓; fixed persistent canvas + single renderer (T1/T2) ✓; master scrub timeline transform (T4) ✓; per-section screen crossfade with exact ScreenKey set (T3/T5) ✓; features→waypoint, v1 carousel removed (T5) ✓; alternating section layouts + ROI stays interactive (T6) ✓; reduced-motion/no-WebGL fallback, hero never empty (T7) ✓; perf (pixelRatio cap T2, RAF pause T4, ResizeObserver T2, dispose T8) ✓; warm tokens / no utility framework (all CSS steps) ✓; GSAP single registration (Global Constraints; page never re-registers) ✓.
- **Placeholder scan:** GLB swap + Unsplash marked; the only "implement the other five following drawMenu" is accompanied by exact per-screen content specs (content differs, structure identical) — acceptable, not a vague placeholder. No TBD/TODO.
- **Type consistency:** `HeroPhone3D` interface extended additively across T2→T4 with consistent names (`init`/`resize`/`dispose`/`setPose`/`crossfadeScreen`/`setIdle`/`setRenderActive`); `PhonePose` shape fixed in Global Constraints + T2; `ScreenKey` union identical in Global Constraints, T3, T5; `cleanup` array reused; `engine` variable consistent.
- **Note:** No unit tests (visual/3D component) — every task ends with a concrete build + dev-smoke verification + commit, per spec decision.
