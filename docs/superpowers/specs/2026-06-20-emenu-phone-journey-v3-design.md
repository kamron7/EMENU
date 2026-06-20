# eMenu v3 — Phone Journey Polish + Section Redesign

**Date:** 2026-06-20
**Status:** Approved (design), pending implementation plan
**Builds on:** v2 persistent 3D phone journey. This revision fixes the phone's
motion/screen and redesigns the page; it does NOT re-introduce v1/v2 removed work.

## Why (user feedback)

The v2 journey had real problems:
- The menu floated **on** the phone (an overlay plane), not **in** its screen.
- The phone didn't visibly spin.
- The hero phone jumped (sat near the text, then snapped right on first scroll).
- The phone glided continuously and drifted over text / wasn't centered per section.
- Sections looked unrefined; font was generic; scrolling wasn't smooth.

## Decisions (from brainstorming)

- **Motion:** phone PARKS at a fixed pose per section and holds while the section
  is read; between sections it slides to the next slot with a **full 360° spin**.
- **Screen swap timing:** the on-screen content changes at the **half-spin** (back
  to camera), so the new screen is revealed as the phone rotates front again.
- **Screen = in-device:** replace the iPhone screen **mesh's own texture** with our
  menu texture (rotates with the device, occluded when backward). No overlay planes.
- **Smooth scroll:** GSAP **ScrollSmoother** (local bundle, no new dependency).
- **Sections:** "awwwards" refined — balanced layout, considered whitespace, medium
  confident type (not oversized/bulky), strong hierarchy, subtle staggered reveals.
- **Font:** **Poppins** (Google Fonts), weights 400/500/600/700.
- **GSAP toolkit:** SplitText, stagger, ScrollTrigger batch, CustomEase,
  ScrollSmoother, light parallax — all from the local bundle.

## Fixed poses (the parking spots)

Camera at (0,0,6), fov 35. Poses are reused per side so the phone "stands in the
same place" on each side. Final values tuned during implementation against the
running canvas; these are the targets:

| Section | Slot | Pose (approx) |
|---------|------|---------------|
| Hero | RIGHT | `x:+1.7, y:0, rotX:0, rotY:0, scale:1.0` |
| Features | LEFT | `x:-1.7, y:0, rotX:0, rotY:0, scale:1.0` |
| How it Works | RIGHT | `x:+1.7, y:0, rotX:0, rotY:0, scale:1.0` |
| ROI | LEFT | `x:-1.7, y:0, rotX:0, rotY:0, scale:1.0` |
| Testimonials | CENTER | `x:0, y:0, rotX:0, rotY:0, scale:1.15` |
| Footer | (render paused) | — |

"Screen faces camera" (rotY such that the device front faces the viewer) is the
neutral rotation; the 360° spin is applied additively during travel and returns
to the neutral facing at each parking spot.

## Architecture

### Smooth scroll (ScrollSmoother)
- `pages/index.vue` template wraps page content in
  `<div id="smooth-wrapper"><div id="smooth-content"> … </div></div>`.
- The fixed `<canvas class="phone-stage">` and the fixed header stay **outside**
  `#smooth-content` (ScrollSmoother transforms `#smooth-content`; fixed elements
  must not be inside it or they'd be double-transformed).
- In `onMounted` (client), register + create:
  `ScrollSmoother.create({ wrapper:'#smooth-wrapper', content:'#smooth-content', smooth:1.2, effects:true })`.
  Killed in cleanup (`smoother.kill()` pushed to `cleanup`).
- All ScrollTriggers (phone transitions, crossfades, ROI, reveals) work unchanged
  under ScrollSmoother. Reduced-motion / no-WebGL: skip ScrollSmoother (native
  scroll) so the fallback stays simple and accessible.

### Phone motion (park + spin) — `pages/index.vue` + engine
- Define a `POSES` array in section order (values above) and a neutral facing.
- Set the engine to the hero pose **immediately** after init (before first paint)
  so there is no center→right jump.
- Build **one scrubbed transition per gap** (N-1 transitions) with ScrollTrigger,
  each tied to the scroll between section K (parked) and section K+1 (parked):
  - `start`: when section K begins to leave (e.g. `top top` of K+1's predecessor
    boundary) — concretely trigger on section K+1 with `start:'top bottom'`,
    `end:'top top'`, `scrub:true`.
  - Tween a `pose` object from `POSES[K]` to `POSES[K+1]`, AND add a full `+360°`
    (`2π`) to `rotY` across the transition (the barrel roll), applied via
    `engine.setPose` on update.
  - Screen swap at half progress: in the transition's `onUpdate`, when progress
    crosses 0.5 (back to camera), call `engine.crossfadeScreen(nextKey)` once.
- While a section is centered (no transition active), the pose holds at `POSES[K]`
  → the phone **parks**. No continuous master timeline.
- Idle: a subtle constant float/rotation is OPTIONAL and must not fight parking;
  if kept, it is a tiny additive wobble only (≤0.02 rad). Default: off while
  parked to keep the "stands still" feel; the 360 spin is the motion.

### Screen in-device — `composables/useHeroPhone3D.ts`
- Remove the overlay-plane approach (screenA/screenB, depthTest:false).
- On load, detect the screen mesh (largest emissive-mapped mesh, as today). Set its
  material `map` and `emissiveMap` to our current screen CanvasTexture, with
  `emissiveIntensity` high enough to read as a lit screen; `material.needsUpdate`.
- `crossfadeScreen(key)` becomes `setScreen(key)` (instant swap is fine because it
  happens while the back faces the camera). Keep a short emissive dip for safety if
  needed, but a hard swap timed to the half-spin is acceptable and simpler.
- Screen textures (the six `phoneScreens.ts` draws) are unchanged. UVs of the iPhone
  screen mesh map a 0–1 quad, so the 512×1024 textures display cleanly; if a future
  swapped model's UVs differ, that's an acceptable swap caveat.
- Keep full disposal (textures, DRACO, renderer, env map, listeners, RAF).

### Sections redesign (awwwards) — `pages/index.vue`
- Rebuild each section's layout: a clean 12-col-ish grid, the phone slot on the
  correct side, content on the other with strong type hierarchy and generous (not
  excessive) spacing. Medium heading sizes (clamp ~2–3.5rem), not oversized.
- Subtle entrance reveals (SplitText lines/words + stagger, small y-translate,
  CustomEase) per section — refined, not flashy. Light parallax on accents.
- Keep the warm token palette; refine spacing scale and add a couple of layout
  tokens if helpful (`--maxw`, `--gutter`).
- ROI calculator: keep all reactive logic; restyle to match the refined look.
- Testimonials: refined asymmetric arrangement around the centered phone.
- Footer: keep the organic warm footer; align type to the new system.

### Font — Poppins
- Add Poppins via Nuxt `app.head` `<link>` to Google Fonts (preconnect + the
  weights 400/500/600/700), OR self-host. Default: Google Fonts link (simplest,
  reliable). Update `assets/css/tokens.css` `font-family` to
  `'Poppins', system-ui, sans-serif`. Headings may use a slightly heavier weight.

## Reduced-motion / no-WebGL fallback
- Unchanged intent: no journey, static phone image, content fully usable.
- Additionally: skip ScrollSmoother (use native scroll) and run the simple section
  reveals near-instant under reduced-motion (content never stuck hidden).

## Performance
- ScrollSmoother + transforms only; pixelRatio capped at 2; RAF paused at footer.
- Screen swap on half-spin avoids per-frame texture churn.
- One render loop; dispose everything on unmount.

## What changes vs v2 (summary)
- Overlay screen planes → screen-mesh texture (in-device).
- Continuous master scrub timeline → per-gap park-and-spin transitions + initial
  pose set.
- Add ScrollSmoother (+ kill in cleanup).
- Redesign all section layouts (awwwards) + Poppins font + richer-but-tasteful GSAP.
- Keep: engine/DRACO/GLB, fallback, ROI logic, disposal discipline, warm tokens.

## Testing / verification
- `npm run build` passes; dev boots; no SSR/WebGL errors.
- With WebGL on (real browser): phone parks at fixed slots, holds while reading,
  spins 360° between sections, screen content changes at the half-spin and reads as
  the device's actual screen (occluded when backward); hero has no jump; phone never
  overlaps text; scrolling is smooth (ScrollSmoother).
- Reduced-motion / no-WebGL: static phone, native scroll, content usable.
- Poppins applied; sections read as refined/balanced.
- Console clean; navigate-away disposes (no WebGL context-loss spam, no leaked
  ScrollTriggers/ScrollSmoother).
- No automated unit tests (visual/3D); verification is build + dev/browser smoke.

## Out of scope (YAGNI)
- Real backend/menu data, i18n, auth.
- Photoreal PBR beyond the warm studio env already in place.
- Mobile parity of the full desktop spin journey (mobile gets a simplified version:
  phone parks vertically per section, lighter motion).
