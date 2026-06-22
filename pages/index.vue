<template>
  <div ref="root" class="page-root">
    <canvas ref="stageCanvas" class="phone-stage" aria-hidden="true"></canvas>

    <!-- ═══════════════════════════════════════════════
         HEADER — fixed, warm-glass, terracotta underline
         ════════════════════════════════════════════ -->
    <header class="nav" :class="{ 'nav--scrolled': isScrolled }">
      <div class="nav__inner">
        <a href="#" class="nav__logo" aria-label="eMenu home">
          <span class="nav__logo-mark">e</span>Menu
        </a>

        <nav class="nav__links" aria-label="Main navigation">
          <a href="#features" class="nav__link"><span class="nav__link-text">Features</span></a>
          <a href="#how" class="nav__link"><span class="nav__link-text">How it works</span></a>
          <a href="#social" class="nav__link"><span class="nav__link-text">Reviews</span></a>
        </nav>

        <div class="nav__cta-group">
          <a href="#" class="btn btn--ghost">Sign in</a>
          <a href="#" class="btn btn--primary">Get started</a>
        </div>

        <button
          ref="burgerBtn"
          class="nav__burger"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="nav__burger-bar" />
          <span class="nav__burger-bar" />
          <span class="nav__burger-bar" />
        </button>
      </div>

      <!-- Mobile drawer -->
      <div
        id="mobile-menu"
        class="nav__mobile"
        :class="{ 'nav__mobile--open': mobileOpen }"
        role="dialog"
        @keydown.esc="closeMobileMenu"
      >
        <a href="#features" class="nav__mobile-link" @click="mobileOpen = false">Features</a>
        <a href="#how" class="nav__mobile-link" @click="mobileOpen = false">How it works</a>
        <a href="#social" class="nav__mobile-link" @click="mobileOpen = false">Reviews</a>
        <div class="nav__mobile-cta">
          <a href="#" class="btn btn--ghost btn--full">Sign in</a>
          <a href="#" class="btn btn--primary btn--full">Get started</a>
        </div>
      </div>
    </header>

    <div id="smooth-wrapper">
      <div id="smooth-content">

    <!-- ═══════════════════════════════════════════════
         HERO — asymmetric, appetising, typographic-led
         ════════════════════════════════════════════ -->
    <section class="hero" id="hero" aria-label="Hero">
      <div class="container hero__layout">
        <div class="hero__text">
          <p class="hero__eyebrow">Digital menus that feel like hospitality</p>
          <h1 class="hero__headline">
            Your menu,<br />
            <em class="hero__accent">beautifully</em><br />
            delivered.
          </h1>
          <p class="hero__body">
            eMenu transforms paper menus into warm, scannable experiences — helping your guests decide, and helping you delight them every visit.
          </p>
          <div class="hero__actions">
            <a href="#" class="btn btn--primary btn--lg">Start free trial</a>
            <a href="#how" class="hero__learn-link">
              See how it works
              <svg class="hero__learn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- hero right column: 3D phone canvas occupies this visually via .phone-stage.
             In no-journey mode (no WebGL / reduced-motion / engine error), the fallback
             image is shown instead. Default display:none; activated by .no-journey on root. -->
        <div class="hero__visual-slot" aria-hidden="true">
          <!-- src: swap this Unsplash placeholder for your final product screenshot -->
          <img
            class="hero__phone-fallback"
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=640&q=80"
            alt="eMenu app shown on a phone"
            width="640"
            height="800"
            loading="eager"
          />
        </div>
      </div>

      <div class="hero__scroll-hint" aria-hidden="true">
        <span class="hero__scroll-line" />
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         FEATURES — phone waypoint with stacked feature steps (Task 5)
         ════════════════════════════════════════════ -->
    <section class="features" id="features" aria-labelledby="features-heading">
      <div class="container features__layout">
        <!-- Left column: empty phone slot (3D phone canvas sits here via .phone-stage) -->
        <div class="features__phone-slot" aria-hidden="true"></div>

        <!-- Right column: stacked feature steps -->
        <div class="features__steps-col">
          <header class="features__steps-header">
            <p class="section-eyebrow">What eMenu does</p>
            <h2 id="features-heading" class="section-heading">Everything your menu needs to perform</h2>
          </header>

          <div class="feature-step">
            <div class="feature-step__icon" aria-hidden="true">
              <!-- Lightning bolt: instant price sync -->
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M16 4L8 16h7l-3 8 11-13h-7l3-7z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="feature-step__title">Instant Price Sync</h3>
            <p class="feature-step__body">Change a price in your dashboard and it's live on every guest's phone within seconds — no reprinting, no confusion, no revenue left on the table.</p>
            <div class="feature-step__stat">
              <span class="feature-step__stat-num">2 s</span>
              <span class="feature-step__stat-label">average update time</span>
            </div>
          </div>

          <div class="feature-step">
            <div class="feature-step__icon" aria-hidden="true">
              <!-- Shield check: allergen safety -->
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4L5 9v7c0 5.5 4 10.5 9 12 5-1.5 9-6.5 9-12V9L14 4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                <path d="M10 14l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="feature-step__title">Allergen Tags</h3>
            <p class="feature-step__body">Mark every dish with the allergens it contains. Guests with dietary needs browse confidently, your staff answer fewer questions, and you meet compliance requirements effortlessly.</p>
            <div class="feature-step__stat">
              <span class="feature-step__stat-num">14</span>
              <span class="feature-step__stat-label">EU allergens supported</span>
            </div>
          </div>

          <div class="feature-step">
            <div class="feature-step__icon" aria-hidden="true">
              <!-- Globe: multi-language -->
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="9" stroke="currentColor" stroke-width="1.6"/>
                <path d="M14 5c-3 4-3 14 0 18M14 5c3 4 3 14 0 18" stroke="currentColor" stroke-width="1.6"/>
                <path d="M5 14h18" stroke="currentColor" stroke-width="1.6"/>
                <path d="M6.5 9.5h15M6.5 18.5h15" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/>
              </svg>
            </div>
            <h3 class="feature-step__title">Multi-language Support</h3>
            <p class="feature-step__body">One menu, every language. eMenu translates your dishes and descriptions automatically so international guests feel at home the moment they scan — no bilingual staff required.</p>
            <div class="feature-step__stat">
              <span class="feature-step__stat-num">40+</span>
              <span class="feature-step__stat-label">languages available</span>
            </div>
          </div>

        </div><!-- /.features__steps-col -->
      </div><!-- /.features__layout -->
    </section>

    <!-- ═══════════════════════════════════════════════
         HOW IT WORKS — numbered process + phone slot right
         ════════════════════════════════════════════ -->
    <section class="how" id="how" aria-labelledby="how-heading">
      <div class="container how__outer">
        <!-- Left column: section header + steps (content side) -->
        <div class="how__content-col">
          <header class="how__section-header">
            <p class="section-eyebrow">Simple from day one</p>
            <h2 id="how-heading" class="section-heading">Up and running in under ten minutes</h2>
          </header>

          <div class="how__layout">
            <ol class="how__steps" role="list">
              <li class="how__step">
                <div class="how__step-num" aria-hidden="true">01</div>
                <div class="how__step-content">
                  <h3 class="how__step-title">Create your menu</h3>
                  <p class="how__step-body">Add dishes, photos, descriptions, and prices using our visual editor. No design skills required — eMenu handles the typography.</p>
                </div>
              </li>
              <li class="how__step">
                <div class="how__step-num" aria-hidden="true">02</div>
                <div class="how__step-content">
                  <h3 class="how__step-title">Print your QR code</h3>
                  <p class="how__step-body">Download your QR table cards. They link directly to your live menu — always up to date, no reprinting.</p>
                </div>
              </li>
              <li class="how__step">
                <div class="how__step-num" aria-hidden="true">03</div>
                <div class="how__step-content">
                  <h3 class="how__step-title">Delight your guests</h3>
                  <p class="how__step-body">Guests scan, browse, and decide. You focus on what matters: great food and great service.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <!-- Right column: empty phone slot — 3D canvas shows through -->
        <div class="how__phone-slot" aria-hidden="true"></div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         ROI CALCULATOR — interactive revenue estimator
         ════════════════════════════════════════════ -->
    <section class="roi" id="roi" aria-labelledby="roi-heading">
      <div class="container roi__outer">
        <!-- Left column: empty phone slot — 3D canvas shows through -->
        <div class="roi__phone-slot" aria-hidden="true"></div>

        <!-- Right column: header + calculator (content side) -->
        <div class="roi__inner">
          <header class="roi__header">
            <p class="section-eyebrow">Your potential uplift</p>
            <h2 id="roi-heading" class="section-heading roi__heading">See what eMenu could add to your monthly revenue</h2>
            <p class="roi__sub">Guests who browse a beautiful digital menu spend 15% more on average. Slide the controls to see your restaurant's numbers.</p>
          </header>

          <div class="roi__widget">
            <!-- Sliders -->
            <div class="roi__controls">
              <div class="roi__slider-group">
                <div class="roi__slider-label-row">
                  <label class="roi__label" for="slider-covers">Covers per day</label>
                  <span class="roi__value" aria-live="polite">{{ covers }}</span>
                </div>
                <input
                  id="slider-covers"
                  class="roi__range"
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  :value="covers"
                  :style="{ '--range-pct': `${((covers - 10) / (300 - 10)) * 100}%` }"
                  @input="covers = Number(($event.target as any).value)"
                  aria-label="Covers per day"
                />
                <div class="roi__slider-ticks" aria-hidden="true">
                  <span>10</span><span>150</span><span>300</span>
                </div>
              </div>

              <div class="roi__slider-group">
                <div class="roi__slider-label-row">
                  <label class="roi__label" for="slider-bill">Average bill (€)</label>
                  <span class="roi__value" aria-live="polite">€ {{ avgBill }}</span>
                </div>
                <input
                  id="slider-bill"
                  class="roi__range"
                  type="range"
                  min="5"
                  max="120"
                  step="1"
                  :value="avgBill"
                  :style="{ '--range-pct': `${((avgBill - 5) / (120 - 5)) * 100}%` }"
                  @input="avgBill = Number(($event.target as any).value)"
                  aria-label="Average bill in euros"
                />
                <div class="roi__slider-ticks" aria-hidden="true">
                  <span>€ 5</span><span>€ 60</span><span>€ 120</span>
                </div>
              </div>
            </div>

            <!-- Result board -->
            <div class="roi__board" aria-live="polite" aria-atomic="true">
              <div class="roi__board-glow" aria-hidden="true"></div>
              <p class="roi__board-eyebrow">Extra monthly revenue</p>
              <div class="roi__board-amount">
                <span class="roi__board-currency">€</span>
                <span class="roi__board-num">{{ displayRevenue.toLocaleString('de-DE') }}</span>
              </div>
              <p class="roi__board-formula">
                {{ covers }} covers × €{{ avgBill }} avg bill × 15% uplift × 30 days
              </p>
              <a href="#" class="btn btn--primary roi__board-cta">Start your free trial</a>
            </div>
          </div>
        </div><!-- /.roi__inner -->
      </div><!-- /.roi__outer -->
    </section>

    <!-- ═══════════════════════════════════════════════
         SOCIAL PROOF — asymmetric testimonial grid
         ════════════════════════════════════════════ -->
    <section class="social" id="social" aria-labelledby="social-heading">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">From restaurants who've switched</p>
          <h2 id="social-heading" class="section-heading">Guests notice. Staff notice. Revenue follows.</h2>
        </header>

        <!--
          3-column surround grid: left cards | center phone slot | right cards.
          The center column is an empty slot; the fixed canvas shows through it.
          Cards are explicitly placed into grid areas so the phone reads as
          surrounded. All .testimonial selectors are PRESERVED for Task 3/5 GSAP.
        -->
        <div class="social__grid">

          <!-- TOP ROW: left card (col 1 row 1) -->
          <blockquote class="testimonial testimonial--tl">
            <img
              class="testimonial__avatar-img"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&q=80"
              alt="Maria Kowalczyk"
              width="48"
              height="48"
              loading="lazy"
            />
            <p class="testimonial__quote">"We saw a 22% increase in dessert orders the first week. Guests browse longer when the menu looks this good."</p>
            <footer class="testimonial__author">
              <div>
                <cite class="testimonial__name">Maria Kowalczyk</cite>
                <span class="testimonial__role">Owner, Bistro Soleil — Warsaw</span>
              </div>
            </footer>
          </blockquote>

          <!-- CENTER column: empty phone slot (spans both rows) -->
          <div class="social__phone-slot" aria-hidden="true"></div>

          <!-- TOP ROW: right card (col 3 row 1) -->
          <blockquote class="testimonial testimonial--tr">
            <img
              class="testimonial__avatar-img"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&q=80"
              alt="Reza Ahmadi"
              width="48"
              height="48"
              loading="lazy"
            />
            <p class="testimonial__quote">"Updating the menu used to take an hour and a trip to the printer. Now it's thirty seconds on my phone."</p>
            <footer class="testimonial__author">
              <div>
                <cite class="testimonial__name">Reza Ahmadi</cite>
                <span class="testimonial__role">Head Chef, Casa Terre — Amsterdam</span>
              </div>
            </footer>
          </blockquote>

          <!-- BOTTOM ROW: left card (col 1 row 2) -->
          <blockquote class="testimonial testimonial--bl">
            <img
              class="testimonial__avatar-img"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=96&q=80"
              alt="Tomasz Wiśniewski"
              width="48"
              height="48"
              loading="lazy"
            />
            <p class="testimonial__quote">"Our team spends zero time on menu maintenance. That's an hour a day back to the kitchen where it belongs."</p>
            <footer class="testimonial__author">
              <div>
                <cite class="testimonial__name">Tomasz Wiśniewski</cite>
                <span class="testimonial__role">Head Chef, Kuchnia Rzeki — Kraków</span>
              </div>
            </footer>
          </blockquote>

          <!-- BOTTOM ROW: right card (col 3 row 2) -->
          <blockquote class="testimonial testimonial--br">
            <img
              class="testimonial__avatar-img"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&q=80"
              alt="Lucia Ferraro"
              width="64"
              height="64"
              loading="lazy"
            />
            <p class="testimonial__quote testimonial__quote--lg">"Our international guests feel at home now. eMenu translated everything in minutes and the photos made the food irresistible."</p>
            <footer class="testimonial__author">
              <div>
                <cite class="testimonial__name">Lucia Ferraro</cite>
                <span class="testimonial__role">Manager, Trattoria del Porto — Naples</span>
              </div>
            </footer>
          </blockquote>

          <!-- BOTTOM ROW: additional right-side card (col 3 row 3 or reuse) -->
          <blockquote class="testimonial testimonial--extra">
            <img
              class="testimonial__avatar-img"
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=96&q=80"
              alt="Aiko Nakamura"
              width="48"
              height="48"
              loading="lazy"
            />
            <p class="testimonial__quote">"Scanning a QR code used to feel cold and impersonal. eMenu made it feel like hospitality. Repeat bookings went up."</p>
            <footer class="testimonial__author">
              <div>
                <cite class="testimonial__name">Aiko Nakamura</cite>
                <span class="testimonial__role">Owner, Umi Dining — Lisbon</span>
              </div>
            </footer>
          </blockquote>

        </div><!-- /.social__grid -->

        <div class="social__cta">
          <p class="social__cta-line">Join 2,400+ restaurants already using eMenu.</p>
          <a href="#" class="btn btn--primary btn--lg">Start free — no card needed</a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         FOOTER — organic warm, clip-path wave top edge
         ════════════════════════════════════════════ -->
    <footer class="foot" aria-label="Site footer">

      <!-- Wave top edge: clip-path polygon creates smooth organic curve -->
      <div class="foot__wave" aria-hidden="true"></div>

      <div class="foot__body">
        <div class="container foot__inner">

          <!-- Closing CTA block -->
          <div class="foot__cta-block foot__reveal-item">
            <p class="foot__tagline">Your menu is the first impression.<br/>Make it one they remember.</p>
            <a href="#" class="btn btn--primary btn--lg foot__cta-btn">Start your free trial</a>
            <p class="foot__cta-sub">No credit card required · Cancel any time</p>
          </div>

          <!-- Link columns -->
          <nav class="foot__links-grid" aria-label="Footer navigation">

            <div class="foot__col foot__reveal-item">
              <p class="foot__col-heading">Product</p>
              <ul class="foot__col-list" role="list">
                <li><a href="#features" class="foot__link">Features</a></li>
                <li><a href="#how" class="foot__link">How it works</a></li>
                <li><a href="#roi" class="foot__link">ROI calculator</a></li>
                <li><a href="#" class="foot__link">Pricing</a></li>
              </ul>
            </div>

            <div class="foot__col foot__reveal-item">
              <p class="foot__col-heading">Company</p>
              <ul class="foot__col-list" role="list">
                <li><a href="#" class="foot__link">About</a></li>
                <li><a href="#" class="foot__link">Blog</a></li>
                <li><a href="#" class="foot__link">Careers</a></li>
                <li><a href="#" class="foot__link">Contact</a></li>
              </ul>
            </div>

            <div class="foot__col foot__reveal-item">
              <p class="foot__col-heading">Legal</p>
              <ul class="foot__col-list" role="list">
                <li><a href="#" class="foot__link">Privacy</a></li>
                <li><a href="#" class="foot__link">Terms</a></li>
                <li><a href="#" class="foot__link">Cookies</a></li>
                <li><a href="#" class="foot__link">GDPR</a></li>
              </ul>
            </div>

          </nav>
        </div>

        <!-- Footer base bar -->
        <div class="container foot__base">
          <span class="foot__logo"><em class="foot__logo-mark">e</em>Menu</span>
          <p class="foot__copy">© 2026 eMenu. Crafted with care for restaurants everywhere.</p>
        </div>
      </div>

    </footer>

      </div><!-- /#smooth-content -->
    </div><!-- /#smooth-wrapper -->

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { ScreenKey } from '~/composables/phoneScreens'

const root = ref<HTMLElement | null>(null)
const stageCanvas = ref<HTMLCanvasElement | null>(null)
const isScrolled = ref(false)
const mobileOpen = ref(false)
const burgerBtn = ref<HTMLButtonElement | null>(null)

function closeMobileMenu() {
  mobileOpen.value = false
  burgerBtn.value?.focus()
}

// ── Task 6: ROI calculator reactive state ────────────────────────
const covers = ref(80)
const avgBill = ref(35)
const UPLIFT = 0.15
const DAYS = 30
const extraRevenue = computed(() => Math.round(covers.value * avgBill.value * UPLIFT * DAYS))
// displayRevenue is tweened client-side; server renders the computed value directly
const displayRevenue = ref(extraRevenue.value)

let cleanup: Array<() => void> = []
let engine: {
  init(c: HTMLCanvasElement): Promise<void>
  resize(): void
  dispose(): void
  setScreen(key: ScreenKey): void
  setIdle(enabled: boolean): void
  setPose(p: { x: number; y: number; rotX: number; rotY: number; scale: number }): void
  setRenderActive(active: boolean): void
} | null = null

onMounted(async () => {
  if (!import.meta.client) return

  // ── Task 7: no-journey fallback helpers ────────────────────────
  // Activates the static fallback: hides canvas, shows hero image,
  // returns true so the caller can skip the journey setup entirely.
  const activateFallback = () => {
    root.value?.classList.add('no-journey')
  }

  // Simple per-section fade/slide reveals used when the 3D journey
  // is absent (reduced-motion OR no-WebGL OR engine error).
  // Called from BOTH the no-WebGL path and the mmPhone reduceMotion
  // branch. Guard: runs exactly once (noJourneyRevealsDone flag).
  let noJourneyRevealsDone = false
  const runStaticReveals = (gsapInstance: typeof import('gsap').gsap, ST: typeof import('gsap/ScrollTrigger').ScrollTrigger) => {
    if (noJourneyRevealsDone) return
    noJourneyRevealsDone = true

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dur = prefersReduced ? 0.01 : 0.5
    const ease = prefersReduced ? 'none' : 'power2.out'

    // Reveal hero text immediately (it's above the fold)
    gsapInstance.from('.hero__text', { opacity: 0, y: prefersReduced ? 0 : 20, duration: dur, ease, delay: 0.05 })

    // Feature steps — all visible (not dimmed to 0.25) in fallback
    gsapInstance.set('.feature-step', { opacity: 1 })

    // Stagger-reveal each section's primary content block
    const revealTargets: string[] = [
      '.features__steps-col',
      '.how__content-col',
      '.roi__inner',
      '.social__grid',
    ]
    revealTargets.forEach((sel) => {
      gsapInstance.from(sel, {
        opacity: 0,
        y: prefersReduced ? 0 : 30,
        duration: dur,
        ease,
        scrollTrigger: {
          trigger: sel,
          start: 'top 85%',
          once: true,
        },
      })
    })

    // Testimonials stagger (mirrors the motion branch reveal)
    ST.batch('.testimonial', {
      onEnter: (batch) =>
        gsapInstance.from(batch, {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
          duration: dur,
          ease,
          stagger: prefersReduced ? 0 : 0.1,
          overwrite: true,
        }),
      start: 'top 88%',
      once: true,
    })
  }

  // ── Task 2 + 7: 3D phone engine (client-only, dynamic import) ─────
  const { useWebGLSupport } = await import('~/composables/useWebGLSupport')
  const webgl = useWebGLSupport()
  let engineReady = false
  if (webgl && stageCanvas.value) {
    try {
      const { createHeroPhone3D } = await import('~/composables/useHeroPhone3D')
      engine = createHeroPhone3D()
      await engine.init(stageCanvas.value)
      engineReady = true
      const ro = new ResizeObserver(() => engine?.resize())
      ro.observe(stageCanvas.value)
      cleanup.push(() => ro.disconnect())
      cleanup.push(() => { engine?.dispose(); engine = null })
    } catch (err) {
      console.warn('[eMenu] 3D phone engine failed to init — activating fallback.', err)
      engine?.dispose?.()
      engine = null
      engineReady = false
    }
  }

  // If WebGL is unavailable OR engine init threw, activate the no-journey fallback.
  // The mmPhone reduceMotion branch handles its own activation below.
  if (!webgl || !engineReady) {
    activateFallback()
    // runStaticReveals needs gsap + ScrollTrigger — import now (client-only)
    const { gsap: g } = await import('gsap')
    const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
    runStaticReveals(g, ST)
  }

  // ── Scroll-state for header glass effect ──────────────────────────
  const onScroll = () => {
    isScrolled.value = window.scrollY > 40
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  cleanup.push(() => window.removeEventListener('scroll', onScroll))

  // ── Close mobile menu on outside click ───────────────────────────
  const onOutside = (e: MouseEvent) => {
    const nav = document.querySelector('.nav') as HTMLElement | null
    if (nav && !nav.contains(e.target as Node)) {
      mobileOpen.value = false
    }
  }
  document.addEventListener('click', onOutside)
  cleanup.push(() => document.removeEventListener('click', onOutside))

  // ── GSAP + plugins (dynamic, client-only) ────────────────────────
  // Registration is handled once in plugins/gsap.client.ts (runs before mount).
  // These imports resolve the same singleton via the Vite alias, so plugins
  // registered there are already active here — no re-registration needed.
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  const { SplitText } = await import('gsap/SplitText')

  // ── Task 2: ScrollSmoother — journey path only ────────────────
  // Only created when the 3D engine is running AND the user has not
  // requested reduced motion. When skipped, the wrapper divs act as
  // normal block elements and native scroll is used.
  const { ScrollSmoother } = await import('gsap/ScrollSmoother')
  let smoother: InstanceType<typeof ScrollSmoother> | null = null
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

  // ── Task 4: master scrubbed phone-pose timeline + footer render pause ──
  // Own matchMedia instance (mmPhone) — does not disturb mm/mm6/mm7.
  const mmPhone = gsap.matchMedia()
  mmPhone.add(
    {
      motion:      '(prefers-reduced-motion: no-preference)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (ctx) => {
      const { reduceMotion } = ctx.conditions as { motion: boolean; reduceMotion: boolean }

      // Skip the journey when motion is reduced OR the 3D engine never came up
      // (no WebGL / init failed). Without this !engine guard the journey's
      // ScrollTriggers would still run and dim the feature copy to 25% opacity
      // over a hidden canvas — breaking the fallback's "content fully usable".
      if (reduceMotion || !engine) {
        // Activate no-journey fallback (hides canvas, shows static image) then run
        // simple scroll reveals so all content is accessible. Both are idempotent
        // / once-guarded, so it is safe if the no-WebGL path already called them.
        activateFallback()
        runStaticReveals(gsap, ScrollTrigger)
        return
      }

      // ── Task 4: Park-per-section poses + 360° spin transitions ──────
      type Pose = { x: number; y: number; rotX: number; rotY: number; scale: number }
      const NEUTRAL = { y: 0, rotX: 0, rotY: 0 }
      const POSES: Pose[] = [
        { x: 2.1,  ...NEUTRAL, scale: 1.5 },   // 0 hero    RIGHT
        { x: -2.1, ...NEUTRAL, scale: 1.5 },   // 1 features LEFT
        { x: 2.1,  ...NEUTRAL, scale: 1.5 },   // 2 how     RIGHT
        { x: -2.1, ...NEUTRAL, scale: 1.5 },   // 3 roi     LEFT
        { x: 0,    ...NEUTRAL, scale: 1.1 },   // 4 social  CENTER (smaller so it fits the last section)
      ]
      const SECT = ['#hero', '.features', '.how', '.roi', '.social']
      const SCREEN: ScreenKey[] = ['menu', 'priceSync', 'qrSteps', 'allergen', 'review']

      // Park at hero pose immediately; set initial screen
      engine.setPose(POSES[0])
      engine.setScreen('menu')
      // Idle off: the phone must stand level/straight while parked; the 360° spin
      // between sections is the only motion (idle added a slight rotY wobble).
      engine.setIdle(false)

      // Linear interpolation helper
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t

      // One scrubbed transition per gap (N-1 = 4 transitions)
      const transitions = SECT.slice(1).map((sel, i) => {
        const from = POSES[i], to = POSES[i + 1]
        let swapped = false
        return ScrollTrigger.create({
          trigger: sel,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
          onUpdate: (self: { progress: number }) => {
            const p = self.progress
            engine?.setPose({
              x: lerp(from.x, to.x, p),
              y: lerp(from.y, to.y, p),
              rotX: lerp(from.rotX, to.rotX, p),
              rotY: lerp(from.rotY, to.rotY, p) + Math.PI * 2 * p, // full barrel roll
              scale: lerp(from.scale, to.scale, p),
            })
            // swap screen while back faces camera (~half spin)
            if (p >= 0.5 && !swapped) { engine?.setScreen(SCREEN[i + 1]); swapped = true }
            if (p < 0.5 && swapped)   { engine?.setScreen(SCREEN[i]);     swapped = false }
          },
        })
      })
      cleanup.push(() => transitions.forEach((t) => t.kill()))

      // Footer render pause: skip rendering when phone is offscreen at footer
      const footerTrigger = ScrollTrigger.create({
        trigger: '.foot',
        start: 'top center',
        onEnter: () => engine?.setRenderActive(false),
        onLeaveBack: () => engine?.setRenderActive(true),
      })

      // ── Per-feature sub-step screen swaps (phone is parked in features) ──
      // Helper: activate a feature-step (full opacity + is-active) and dim all others
      const activateStep = (index: number) => () => {
        const steps = document.querySelectorAll<HTMLElement>('.feature-step')
        steps.forEach((el, i) => {
          gsap.to(el, { opacity: i === index ? 1 : 0.25, duration: 0.4, ease: 'power2.out', overwrite: true })
          el.classList.toggle('is-active', i === index)
        })
      }
      const deactivateSteps = () => {
        const steps = document.querySelectorAll<HTMLElement>('.feature-step')
        steps.forEach((el) => {
          gsap.to(el, { opacity: 0.25, duration: 0.4, ease: 'power2.out', overwrite: true })
        })
      }

      const st1 = ScrollTrigger.create({
        trigger: '#hero',
        start: 'top center',
        onEnter: () => engine?.setScreen('menu'),
        onEnterBack: () => { engine?.setScreen('menu'); deactivateSteps() },
      })

      // Iterate actual .feature-step elements so DOM position (sibling header) is irrelevant
      const stepKeys: ScreenKey[] = ['priceSync', 'allergen', 'multilang']
      const stepEls = gsap.utils.toArray('.feature-step') as HTMLElement[]
      const stepTriggers = stepEls.map((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          onEnter: () => { engine?.setScreen(stepKeys[i]); activateStep(i)() },
          onEnterBack: () => { engine?.setScreen(stepKeys[i]); activateStep(i)() },
        })
      )

      const st5 = ScrollTrigger.create({
        trigger: '.how',
        start: 'top center',
        onEnter: () => engine?.setScreen('qrSteps'),
        onEnterBack: () => engine?.setScreen('qrSteps'),
      })

      const st6 = ScrollTrigger.create({
        trigger: '.social',
        start: 'top center',
        onEnter: () => engine?.setScreen('review'),
        onEnterBack: () => engine?.setScreen('review'),
      })

      return () => {
        footerTrigger.kill()
        st1.kill(); stepTriggers.forEach(t => t.kill()); st5.kill(); st6.kill()
      }
    }
  )
  cleanup.push(() => mmPhone.revert())

  // ── Task 4: Hero phone 3D expand + SplitText title ──────────────
  const mm4 = gsap.matchMedia()
  mm4.add(
    {
      motion:       '(prefers-reduced-motion: no-preference)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (ctx) => {
      const { reduceMotion } = ctx.conditions as { motion: boolean; reduceMotion: boolean }

      // ── SplitText char-stagger reveal on hero headline ────────────
      const split = new SplitText('.hero__headline', {
        type: 'chars,words',
        mask: 'chars',
        charsClass: 'hero__headline-char',
      })

      if (!reduceMotion) {
        gsap.fromTo(
          split.chars,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.028,
            duration: 0.72,
            ease: 'power3.out',
            delay: 0.1,
          }
        )
      }

      // Single-source teardown: mm4.revert() (pushed to cleanup) calls this
      // returned function, which reverts the SplitText exactly once.
      return () => split.revert()
    }
  )
  cleanup.push(() => mm4.revert())

  // Reduced-motion guard: skip all motion if user prefers it
  const mm = gsap.matchMedia()
  mm.add(
    {
      motion:      '(prefers-reduced-motion: no-preference)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (ctx) => {
      const { reduceMotion } = ctx.conditions as { motion: boolean; reduceMotion: boolean }
      if (reduceMotion) return

      // ── How steps: Task 3 batch REMOVED — Task 6 owns the how-section reveal ──
      // (SplitText word reveal + clip-path morph in mm6 below replaces this block)

      // ── Testimonials stagger reveal ───────────────────────────────
      ScrollTrigger.batch('.testimonial', {
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 28,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.14,
            overwrite: true,
          }),
        start: 'top 88%',
        once: true,
      })

      return () => {
        // inner cleanup handled by mm.revert() in onUnmounted
      }
    }
  )
  cleanup.push(() => mm.revert())

  // ── Task 6: How-it-works SplitText + clip-path + ROI counter ───
  const mm6 = gsap.matchMedia()
  mm6.add(
    {
      motion:       '(prefers-reduced-motion: no-preference)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (ctx) => {
      const { reduceMotion } = ctx.conditions as { motion: boolean; reduceMotion: boolean }

      if (!reduceMotion) {
        // ── SplitText word-by-word reveal for each step title ────────
        const stepTitles = gsap.utils.toArray('.how__step-title') as HTMLElement[]
        stepTitles.forEach((titleEl: HTMLElement) => {
          const split = new SplitText(titleEl, { type: 'words', wordsClass: 'how__word' })
          // Exponential-backoff stagger (motiondesign skill)
          gsap.from(split.words, {
            opacity: 0,
            y: 22,
            duration: 0.52,
            ease: 'power3.out',
            stagger: {
              each: 0.07,
              ease: 'power1.out',
            },
            scrollTrigger: {
              trigger: titleEl.closest('.how__step') as Element,
              start: 'top 82%',
              once: true,
            },
          })
          cleanup.push(() => split.revert())
        })

        // ── Step number + body fade-slide in ─────────────────────────
        ;(gsap.utils.toArray('.how__step') as HTMLElement[]).forEach((step: HTMLElement) => {
          gsap.from([step.querySelector('.how__step-num'), step.querySelector('.how__step-body')], {
            opacity: 0,
            x: -18,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: step,
              start: 'top 84%',
              once: true,
            },
          })
        })

      } else {
        // Reduced-motion: step titles visible immediately — no SplitText so no split.revert needed
      }

      return () => {
        // per-split reverts already pushed to cleanup above;
        // mm6.revert() (in cleanup) handles the rest
      }
    }
  )
  cleanup.push(() => mm6.revert())

  // ── ROI counter watch: tween displayRevenue on extraRevenue change ─
  // watch fires client-side only (inside onMounted); no SSR risk.
  // immediate:true initialises displayRevenue on mount.
  watch(
    extraRevenue,
    (v) => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        displayRevenue.value = v
        return
      }
      gsap.to(displayRevenue, {
        value: v,
        duration: 0.65,
        ease: 'power2.out',
        onUpdate() {
          displayRevenue.value = Math.round(displayRevenue.value)
        },
      })
    },
    { immediate: true }
  )

  // ── Task 7: Footer reveal (mm7 — own instance, own cleanup) ────
  const mm7 = gsap.matchMedia()
  mm7.add(
    {
      motion:       '(prefers-reduced-motion: no-preference)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (ctx: { conditions: Record<string, boolean> }) => {
      const { reduceMotion } = ctx.conditions

      if (!reduceMotion) {
        // Stagger-reveal each .foot__reveal-item (CTA block + 3 link columns)
        gsap.from('.foot__reveal-item', {
          opacity: 0,
          y: 48,
          duration: 0.72,
          ease: 'power3.out',
          stagger: {
            each: 0.11,
            ease: 'power1.out',
          },
          scrollTrigger: {
            trigger: '.foot',
            start: 'top 82%',
            once: true,
          },
        })

        // Subtle tagline scale-in for emphasis (Emil: unseen detail compounds)
        gsap.from('.foot__tagline', {
          scale: 0.97,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.foot',
            start: 'top 78%',
            once: true,
          },
        })
      }

      return () => {
        // mm7.revert() (pushed to cleanup) handles ScrollTrigger cleanup
      }
    }
  )
  cleanup.push(() => mm7.revert())
})

onUnmounted(async () => {
  if (!import.meta.client) return
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  ScrollTrigger.getAll().forEach((t) => t.kill())
  cleanup.forEach((fn) => fn())
  cleanup = []
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — re-exposed as locals for IDE autocomplete;
   ALL colour values come from tokens.css variables, never raw hex.
   ══════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────────────
   RESET / ROOT
   ─────────────────────────────────────────────────────────────── */
.page-root {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* ScrollSmoother requirement: wrapper must clip overflow so the
   translateY on #smooth-content doesn't create a scrollbar ghost. */
#smooth-wrapper {
  overflow: hidden;
}

/* Fixed full-viewport canvas for the 3D phone journey (Tasks 2+).
   z-index: 2 keeps it above section backgrounds but below text (z-index: 3).
   pointer-events: none ensures no scroll/click interception. */
.phone-stage {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 2;
}

/* ── Task 7: no-journey fallback ───────────────────────────────
   .no-journey is added to .page-root when WebGL is absent,
   engine init throws, or prefers-reduced-motion: reduce is active.
   Hides the fixed canvas; shows the static phone image in the hero slot. */
.no-journey .phone-stage {
  display: none;
}

.hero__phone-fallback {
  display: none; /* hidden by default; revealed only under .no-journey */
  width: 100%;
  max-width: 320px;
  border-radius: 2rem;
  box-shadow: var(--shadow-warm);
  /* z-index: 3 — sits within the hero grid, above section bg (z:2 canvas is hidden anyway) */
  position: relative;
  z-index: 3;
}

.no-journey .hero__phone-fallback {
  display: block;
}

/* ───────────────────────────────────────────────────────────────
   LAYOUT HELPERS
   ─────────────────────────────────────────────────────────────── */
.container {
  width: min(1200px, 100% - 3rem);
  margin-inline: auto;
}

/* ───────────────────────────────────────────────────────────────
   HEADER / NAV
   ─────────────────────────────────────────────────────────────── */
.nav {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--bg-cream) 85%, transparent);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  border-block-end: 1.5px solid transparent;
  transition:
    border-color 0.3s var(--ease-organic),
    box-shadow   0.3s var(--ease-organic);
}

.nav--scrolled {
  border-block-end-color: color-mix(in srgb, var(--terracotta) 20%, transparent);
  box-shadow: 0 4px 32px color-mix(in srgb, var(--terracotta) 8%, transparent);
}

.nav__inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 4.25rem;
  width: min(1200px, 100% - 3rem);
  margin-inline: auto;
}

/* Logo */
.nav__logo {
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--brown-deep);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.05em;
  flex-shrink: 0;
}

.nav__logo-mark {
  display: inline-block;
  color: var(--accent-orange);
  font-style: italic;
}

/* Nav links */
.nav__links {
  display: flex;
  gap: 0.25rem;
  margin-inline-start: auto;
}

@media (max-width: 767px) {
  .nav__links {
    display: none;
  }
}

.nav__link {
  position: relative;
  padding: 0.5rem 0.75rem;
  color: var(--text-soft);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: color 0.2s var(--ease-organic);
}

.nav__link:hover,
.nav__link:focus-visible {
  color: var(--brown-deep);
}

/* Animated underline via ::after */
.nav__link-text {
  position: relative;
  display: inline-block;
}

.nav__link-text::after {
  content: '';
  position: absolute;
  inset-block-end: -2px;
  inset-inline-start: 0;
  width: 100%;
  height: 1.5px;
  background: var(--accent-orange);
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.32s var(--ease-organic);
}

.nav__link:hover .nav__link-text::after,
.nav__link:focus-visible .nav__link-text::after {
  transform: scaleX(1);
  transform-origin: left center;
}

/* CTA group */
.nav__cta-group {
  display: flex;
  gap: 0.625rem;
  align-items: center;
  margin-inline-start: 1.25rem;
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .nav__cta-group {
    display: none;
  }
}

/* Burger */
.nav__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.625rem;
  margin-inline-start: auto;
}

@media (max-width: 767px) {
  .nav__burger {
    display: flex;
  }
}

.nav__burger-bar {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--brown-deep);
  border-radius: 2px;
  transition: opacity 0.2s, transform 0.2s var(--ease-organic);
}

/* Mobile drawer */
.nav__mobile {
  display: none;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.5rem 1.5rem;
  background: var(--bg-cream);
  border-block-end: 1.5px solid color-mix(in srgb, var(--terracotta) 15%, transparent);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s var(--ease-organic);
}

.nav__mobile--open {
  max-height: 22rem;
}

@media (max-width: 767px) {
  .nav__mobile {
    display: flex;
  }
}

.nav__mobile-link {
  padding: 0.75rem 0;
  color: var(--text-main);
  text-decoration: none;
  font-size: 1.0625rem;
  font-weight: 500;
  border-block-end: 1px solid color-mix(in srgb, var(--terracotta) 10%, transparent);
}

.nav__mobile-cta {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding-block-start: 1rem;
}

/* ───────────────────────────────────────────────────────────────
   BUTTONS
   ─────────────────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition:
    background  0.22s var(--ease-organic),
    color       0.22s var(--ease-organic),
    border-color 0.22s var(--ease-organic),
    box-shadow  0.22s var(--ease-organic),
    transform   0.14s var(--ease-organic);
  -webkit-user-select: none;
  user-select: none;
}

.btn:active {
  transform: scale(0.97);
}

.btn:focus-visible {
  outline: 2.5px solid var(--accent-orange);
  outline-offset: 3px;
}

/* Ghost */
.btn--ghost {
  background: transparent;
  color: var(--text-soft);
  border-color: color-mix(in srgb, var(--terracotta) 25%, transparent);
}

.btn--ghost:hover {
  color: var(--brown-deep);
  border-color: var(--terracotta);
  background: color-mix(in srgb, var(--terracotta) 5%, transparent);
}

/* Primary */
.btn--primary {
  background: var(--accent-orange);
  color: var(--bg-cream);
  border-color: var(--accent-orange);
  box-shadow: 0 2px 14px color-mix(in srgb, var(--accent-orange) 30%, transparent);
}

.btn--primary:hover {
  background: var(--terracotta);
  border-color: var(--terracotta);
  box-shadow: var(--shadow-warm);
}

/* Size modifiers */
.btn--lg {
  padding: 0.875rem 2rem;
  font-size: 1.0625rem;
  border-radius: 0.625rem;
}

.btn--full {
  width: 100%;
}

/* ───────────────────────────────────────────────────────────────
   SECTION SHARED
   ─────────────────────────────────────────────────────────────── */
.section-header {
  text-align: center;
  margin-block-end: 4rem;
}

.section-eyebrow {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-block-end: 1rem;
}

.section-heading {
  font-size: clamp(1.875rem, 4vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--brown-deep);
  margin-block-end: 1rem;
}

.section-sub {
  font-size: 1.0625rem;
  line-height: 1.65;
  color: var(--text-soft);
  max-width: 52ch;
  margin-inline: auto;
}

/* ───────────────────────────────────────────────────────────────
   HERO
   ─────────────────────────────────────────────────────────────── */
.hero {
  min-height: 100dvh;
  background: var(--bg-warm);
  padding-block: calc(4.25rem + 5rem) 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  /* overflow: hidden clips children incl. ScrollTrigger pin spacer.
     The phone pin therefore uses pinSpacing: false. If pinSpacing is ever
     re-enabled, this overflow MUST be removed or changed to overflow: clip
     with contain: layout, otherwise the spacer will be clipped invisibly. */
  overflow: hidden;
}

/* Subtle warm radial background bloom */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 72% 40%, color-mix(in srgb, var(--accent-orange) 8%, transparent) 0%, transparent 70%),
    radial-gradient(ellipse 40% 35% at 20% 70%, color-mix(in srgb, var(--terracotta) 5%, transparent) 0%, transparent 65%);
  pointer-events: none;
}

.hero__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  position: relative;
}

@media (max-width: 900px) {
  .hero__layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* Hero text — z-index: 3 ensures it sits above the fixed .phone-stage canvas (z-index: 2) */
.hero__text {
  position: relative;
  z-index: 3;
}

.hero__eyebrow {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-block-end: 1.25rem;
}

.hero__headline {
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.08;
  color: var(--brown-deep);
  margin-block-end: 1.5rem;
}

.hero__accent {
  font-style: italic;
  color: var(--accent-orange);
}

.hero__body {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--text-soft);
  max-width: 44ch;
  margin-block-end: 2.25rem;
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hero__learn-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-soft);
  text-decoration: none;
  transition: color 0.2s var(--ease-organic), gap 0.2s var(--ease-organic);
}

.hero__learn-link:hover {
  color: var(--brown-deep);
  gap: 0.625rem;
}

.hero__learn-arrow {
  transition: transform 0.2s var(--ease-organic);
}

.hero__learn-link:hover .hero__learn-arrow {
  transform: translateX(3px);
}

/* Hero right column: empty grid slot for the future 3D phone canvas */
.hero__visual-slot {
  position: relative;
}

/* Scroll hint */
.hero__scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero__scroll-line {
  display: block;
  width: 1px;
  height: 3rem;
  background: linear-gradient(to bottom, var(--terracotta), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50%       { opacity: 0.9; transform: scaleY(0.7); }
}

/* ───────────────────────────────────────────────────────────────
   FEATURES — phone waypoint layout (Task 5)
   Two-column: left = empty phone slot; right = stacked feature steps.
   ─────────────────────────────────────────────────────────────── */
.features {
  background: var(--bg-vanilla);
  padding-block: 7rem;
  position: relative;
}

/* Two-column: left phone slot + right content */
.features__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

@media (max-width: 900px) {
  .features__layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .features__phone-slot {
    display: none;
  }
}

/* Left column: empty slot — 3D phone canvas occupies this visually */
.features__phone-slot {
  min-height: 60vh;
  position: relative;
}

/* Right column: steps + header */
.features__steps-col {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  z-index: 3;
}

.features__steps-header {
  margin-block-end: 3rem;
}

/* ── Feature steps ───────────────────────────────────────────── */
/*
  Each step starts dimmed (opacity: 0.25) and brightens to 1 when
  the matching ScrollTrigger fires (via GSAP in mmPhone MOTION branch).
  Transition provides a smooth CSS fallback for reduced-motion users.
*/
.feature-step {
  opacity: 0.25;
  padding-block: 2.5rem;
  border-block-start: 1px solid color-mix(in srgb, var(--terracotta) 12%, transparent);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: opacity 0.4s var(--ease-organic);
}

.feature-step:last-child {
  border-block-end: 1px solid color-mix(in srgb, var(--terracotta) 12%, transparent);
}

/* When active (set by GSAP or .is-active class) */
.feature-step.is-active {
  opacity: 1;
}

.feature-step__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--accent-orange) 10%, transparent);
  border-radius: 0.875rem;
  color: var(--accent-orange);
  flex-shrink: 0;
}

.feature-step__title {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--brown-deep);
  line-height: 1.2;
}

.feature-step__body {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-soft);
}

/* Stat callout */
.feature-step__stat {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-block-start: 0.5rem;
}

.feature-step__stat-num {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--accent-orange);
  font-variant-numeric: tabular-nums;
}

.feature-step__stat-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-soft);
  letter-spacing: 0.02em;
}

/* Reduced-motion: show all steps at full opacity immediately */
@media (prefers-reduced-motion: reduce) {
  .feature-step {
    opacity: 1;
    transition: none;
  }
}

/* ───────────────────────────────────────────────────────────────
   HOW IT WORKS
   ─────────────────────────────────────────────────────────────── */
.how {
  min-height: 100dvh;
  background: var(--bg-warm);
  padding-block: 7rem;
}

/*
  Outer two-column: content LEFT, phone slot RIGHT.
  .how__outer is the container-level grid.
  .how__content-col holds the header + steps list (z-index:3 so it
  sits above the fixed .phone-stage canvas).
  .how__phone-slot is an empty column — the fixed canvas shows through.
*/
.how__outer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.how__content-col {
  position: relative;
  z-index: 3;
}

.how__section-header {
  margin-block-end: 3rem;
}

.how__phone-slot {
  min-height: 70vh;
  position: relative;
  /* Empty — fixed canvas shows through */
}

@media (max-width: 820px) {
  .how__outer {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .how__phone-slot {
    min-height: 70vh;
    order: -1; /* phone band above content on mobile */
  }
}

/* Inner layout — now just a single-column step list */
.how__layout {
  display: block;
}

.how__steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}

/* Vertical connector line */
.how__steps::before {
  content: '';
  position: absolute;
  inset-inline-start: 2.25rem;
  inset-block: 0;
  width: 1.5px;
  background: linear-gradient(
    to bottom,
    var(--accent-orange),
    color-mix(in srgb, var(--terracotta) 20%, transparent)
  );
}

.how__step {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: 1.5rem;
  align-items: flex-start;
  padding-block: 2.25rem;
  position: relative;
}

.how__step:first-child {
  padding-block-start: 0;
}

.how__step-num {
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--bg-cream);
  background: var(--terracotta);
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 16px color-mix(in srgb, var(--terracotta) 30%, transparent);
}

.how__step-title {
  font-size: 1.1875rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--brown-deep);
  margin-block-end: 0.5rem;
  padding-block-start: 0.875rem;
}

.how__step-body {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-soft);
}

/* SplitText word wrappers — needed for mask/reveal */
.how__word {
  display: inline-block;
}


/* ─────────────────────────────────────────────────────────────────
   ROI CALCULATOR
   ─────────────────────────────────────────────────────────────── */
.roi {
  min-height: 100dvh;
  background: var(--bg-vanilla);
  padding-block: 7rem;
  position: relative;
  overflow: hidden;
}

/* Soft warm radial bloom behind the whole section */
.roi::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 80% 30%, color-mix(in srgb, var(--accent-orange) 6%, transparent) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 15% 70%, color-mix(in srgb, var(--terracotta) 5%, transparent) 0%, transparent 65%);
  pointer-events: none;
}

/*
  Outer two-column: phone slot LEFT, content RIGHT.
  .roi__outer is the container-level grid.
  .roi__phone-slot is empty — fixed canvas shows through.
  .roi__inner holds the header + widget (content side); z-index:3 so
  text sits above the fixed .phone-stage canvas.
*/
.roi__outer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
  position: relative;
}

.roi__phone-slot {
  min-height: 70vh;
  position: relative;
  /* Empty — fixed canvas shows through */
}

.roi__inner {
  position: relative;
  z-index: 3;
}

@media (max-width: 820px) {
  .roi__outer {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .roi__phone-slot {
    min-height: 70vh;
    order: -1; /* phone band above content on mobile */
  }
}

.roi__header {
  text-align: left;
  margin-block-end: 3rem;
}

.roi__heading {
  /* inherits .section-heading; override max-width for readability */
  max-width: 22ch;
}

.roi__sub {
  font-size: 1.0625rem;
  line-height: 1.65;
  color: var(--text-soft);
  max-width: 44ch;
  margin-block-start: 1rem;
}

/* Widget: two-column on desktop (controls | board) */
.roi__widget {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

@media (max-width: 1100px) {
  .roi__widget {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 820px) {
  .roi__widget {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

/* ── Slider controls ────────────────────────────────────────── */
.roi__controls {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.roi__slider-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.roi__slider-label-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}

.roi__label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--brown-deep);
  letter-spacing: -0.01em;
}

.roi__value {
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--accent-orange);
  font-variant-numeric: tabular-nums;
  min-width: 3.5ch;
  text-align: right;
}

/* ── Custom range input ─────────────────────────────────────── */
/* Reset native appearance entirely */
.roi__range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(
    to right,
    var(--accent-orange) 0%,
    var(--accent-orange) calc(
      (var(--range-pct, 50%))
    ),
    color-mix(in srgb, var(--terracotta) 20%, var(--bg-cream)) calc(
      (var(--range-pct, 50%))
    ),
    color-mix(in srgb, var(--terracotta) 20%, var(--bg-cream)) 100%
  );
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.18s var(--ease-organic);
}

/* Use JS to update --range-pct for the fill gradient */
.roi__range:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-orange) 30%, transparent);
}

/* Webkit thumb */
.roi__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--accent-orange);
  border: 3px solid var(--bg-cream);
  box-shadow:
    0 2px 8px color-mix(in srgb, var(--accent-orange) 40%, transparent),
    0 0 0 1.5px color-mix(in srgb, var(--accent-orange) 60%, transparent);
  cursor: pointer;
  transition:
    transform 0.14s var(--ease-organic),
    box-shadow 0.14s var(--ease-organic);
}

.roi__range::-webkit-slider-thumb:hover {
  transform: scale(1.18);
  box-shadow:
    0 4px 14px color-mix(in srgb, var(--accent-orange) 50%, transparent),
    0 0 0 2px color-mix(in srgb, var(--accent-orange) 70%, transparent);
}

.roi__range:active::-webkit-slider-thumb {
  transform: scale(1.08);
}

/* Moz thumb */
.roi__range::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--accent-orange);
  border: 3px solid var(--bg-cream);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--accent-orange) 40%, transparent);
  cursor: pointer;
  transition:
    transform 0.14s var(--ease-organic),
    box-shadow 0.14s var(--ease-organic);
}

.roi__range::-moz-range-thumb:hover {
  transform: scale(1.18);
}

/* Moz track (provides background for filled portion) */
.roi__range::-moz-range-track {
  height: 6px;
  border-radius: 3px;
  background: color-mix(in srgb, var(--terracotta) 20%, var(--bg-cream));
}

.roi__range::-moz-range-progress {
  height: 6px;
  border-radius: 3px;
  background: var(--accent-orange);
}

/* Tick marks below slider */
.roi__slider-ticks {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-soft);
  letter-spacing: 0.02em;
  padding-inline: 0.125rem;
}

/* ── Result board ───────────────────────────────────────────── */
/* Emil philosophy: premium, celebratory, feels earned */
.roi__board {
  position: relative;
  background: var(--bg-cream);
  border: 1.5px solid color-mix(in srgb, var(--accent-orange) 22%, transparent);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  overflow: hidden;
  box-shadow:
    0 8px 40px color-mix(in srgb, var(--accent-orange) 10%, transparent),
    0 2px 8px  color-mix(in srgb, var(--terracotta) 8%, transparent);
}

/* Ambient glow orb behind the number */
.roi__board-glow {
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    color-mix(in srgb, var(--accent-orange) 18%, transparent) 0%,
    transparent 70%
  );
  filter: blur(28px);
  pointer-events: none;
}

.roi__board-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--terracotta);
  position: relative;
  z-index: 1;
}

.roi__board-amount {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  position: relative;
  z-index: 1;
}

.roi__board-currency {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-orange);
  letter-spacing: -0.03em;
}

.roi__board-num {
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--brown-deep);
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.roi__board-formula {
  font-size: 0.8125rem;
  color: var(--text-soft);
  line-height: 1.5;
  max-width: 28ch;
  position: relative;
  z-index: 1;
}

.roi__board-cta {
  margin-block-start: 0.5rem;
  position: relative;
  z-index: 1;
}


/* ───────────────────────────────────────────────────────────────
   SOCIAL PROOF
   ─────────────────────────────────────────────────────────────── */
.social {
  min-height: 60vh;
  background: var(--bg-cream);
  padding-block: 7rem;
}

.testimonial {
  background: var(--bg-warm);
  border: 1.5px solid color-mix(in srgb, var(--terracotta) 10%, transparent);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.testimonial--featured {
  border-color: color-mix(in srgb, var(--accent-orange) 30%, transparent);
  background: color-mix(in srgb, var(--accent-orange) 4%, var(--bg-cream));
}

.testimonial__quote {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-main);
  font-style: italic;
  flex: 1;
}

.testimonial__author {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.testimonial__name {
  display: block;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--brown-deep);
  font-style: normal;
}

.testimonial__role {
  display: block;
  font-size: 0.8125rem;
  color: var(--text-soft);
  margin-block-start: 0.125rem;
}

/* Social CTA */
.social__cta {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.social__cta-line {
  font-size: 1.0625rem;
  color: var(--text-soft);
}

/* ─────────────────────────────────────────────────────────────────
   TESTIMONIALS — 3-column phone-surround grid (Task 6)
   ─────────────────────────────────────────────────────────────── */

/*
  3-column grid: left cards | center phone slot | right cards.
  Center column (.social__phone-slot) is empty — fixed canvas shows through.
  Cards are explicitly placed via grid-area so the phone reads as surrounded.

  Grid definition:
    col 1 (1fr)  = left cards
    col 2 (1fr)  = center phone slot (spans 3 rows)
    col 3 (1fr)  = right cards

  Row layout:
    row 1: top-left card    | phone slot | top-right card
    row 2: bottom-left card | phone slot | bottom-right card
    row 3: (empty left)     | phone slot | extra right card

  The .testimonial selector is PRESERVED so Task 3/5 GSAP ScrollTrigger.batch
  entrance reveal fires without modification.
*/
.social__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 1.5rem;
  margin-block-end: 4rem;
  align-items: start;
}

/* Center column phone slot — spans all 3 rows so phone has vertical room */
.social__phone-slot {
  grid-column: 2;
  grid-row: 1 / 4;
  min-height: 80vh;
  position: relative;
  /* Empty — fixed canvas shows through */
}

/* Card placement */
.testimonial--tl   { grid-column: 1; grid-row: 1; position: relative; z-index: 3; }
.testimonial--tr   { grid-column: 3; grid-row: 1; position: relative; z-index: 3; }
.testimonial--bl   { grid-column: 1; grid-row: 2; position: relative; z-index: 3; }
.testimonial--br   { grid-column: 3; grid-row: 2; position: relative; z-index: 3; }
.testimonial--extra { grid-column: 3; grid-row: 3; position: relative; z-index: 3; }

/* Legacy column helpers — kept so no GSAP selectors break if referenced */
.testimonial--col-a { grid-column: 1; }
.testimonial--col-b { grid-column: 3; }

/* Deprecated offset helpers — reset to 0 now card positions are explicit */
.testimonial--push { margin-block-start: 0; }
.testimonial--lift { margin-block-start: 0; }

/* Old span variant — no longer used in DOM but kept harmless */
.testimonial--span { position: relative; z-index: 3; }

@media (max-width: 820px) {
  /* Stack to single column; phone band rendered above all cards */
  .social__grid {
    grid-template-columns: 1fr;
    grid-template-rows: none;
  }
  .social__phone-slot {
    grid-column: 1;
    grid-row: auto;
    min-height: 70vh;
  }
  .testimonial--tl,
  .testimonial--tr,
  .testimonial--bl,
  .testimonial--br,
  .testimonial--extra {
    grid-column: 1;
    grid-row: auto;
  }
}

/* Avatar: real photo, circular crop */
.testimonial__avatar-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid color-mix(in srgb, var(--terracotta) 20%, transparent);
  display: block;
  margin-block-end: 1rem;
  /* Emil: tiny detail — warm ring makes avatar feel part of the brand palette */
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-orange) 10%, transparent);
}

.testimonial__avatar-img--lg {
  width: 64px;
  height: 64px;
  margin-block-end: 0;
}

/* Featured quote: slightly larger type for hierarchy */
.testimonial__quote--lg {
  font-size: 1.125rem;
  line-height: 1.65;
}

/* ─────────────────────────────────────────────────────────────────
   FOOTER — organic warm, clip-path wave top (Task 7)
   ─────────────────────────────────────────────────────────────── */

/*
  .foot uses a deep warm terracotta-brown tint — NOT black.
  The wave is a separate ::before-backed div (.foot__wave) with a
  clip-path polygon that creates an organic, hand-drawn curve feel:
  the peak is asymmetric (sits at ~38% across) and the trough is
  wider, giving a gestural quality vs a mechanical sine wave.

  Design token note: --foot-bg is mixed inline (no pure hex) so the
  colour stays within the warm token system.
*/
.foot {
  position: relative;
  /* Deep warm terracotta-brown — darker than --bg-vanilla, NOT black */
  background: color-mix(in srgb, var(--brown-deep) 88%, var(--terracotta));
  margin-block-start: 0;
}

/* Wave separator: a thin SVG-free clip-path shape above the footer body */
.foot__wave {
  position: relative;
  width: 100%;
  /* Height governs how tall the wave notch is */
  height: 64px;
  /*
    Organic clip-path wave (polygon — 6 control points):
      0%,100%  → bottom-left corner
      0%,0%    → top-left corner
      38%,100% → the asymmetric peak (rises fully at 38% width)
      62%,8%   → the right trough (dips back slightly)
      100%,60% → right shoulder before corner
      100%,100%→ bottom-right corner
    The polygon clips the *wave element* itself — the revealed
    background above is var(--bg-cream) from .social above it.
  */
  background: var(--bg-cream);
  clip-path: polygon(
    0% 100%,
    0% 0%,
    38% 100%,
    62% 8%,
    100% 60%,
    100% 100%
  );
}

.foot__body {
  padding-block: 4rem 2.5rem;
}

.foot__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: start;
  margin-block-end: 3.5rem;
}

@media (max-width: 860px) {
  .foot__inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

/* Closing CTA block */
.foot__cta-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}

.foot__tagline {
  font-size: clamp(1.375rem, 3vw, 1.875rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.25;
  /* Warm ivory — NOT white, NOT cream — a step lighter than the bg */
  color: color-mix(in srgb, var(--bg-warm) 92%, white);
}

.foot__cta-btn {
  /* Override primary btn: use cream bg on dark footer for inversion */
  background: color-mix(in srgb, var(--bg-warm) 96%, white); /* white: specular mix */
  color: var(--brown-deep);
  border-color: color-mix(in srgb, var(--bg-warm) 96%, white); /* white: specular mix */
  box-shadow: 0 4px 20px color-mix(in srgb, var(--brown-deep) 30%, transparent);
}

.foot__cta-btn:hover {
  background: white; /* intentional: specular highlight on hover */
  border-color: white;
  box-shadow: 0 6px 28px color-mix(in srgb, var(--brown-deep) 40%, transparent);
}

.foot__cta-btn:focus-visible {
  outline: 2.5px solid color-mix(in srgb, var(--accent-orange) 80%, white);
  outline-offset: 3px;
}

.foot__cta-sub {
  font-size: 0.8125rem;
  color: color-mix(in srgb, var(--bg-warm) 70%, transparent);
  letter-spacing: 0.02em;
}

/* Link column grid */
.foot__links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  min-width: min(380px, 100%);
}

@media (max-width: 580px) {
  .foot__links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.foot__col-heading {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--accent-orange) 75%, white);
  margin-block-end: 1rem;
}

.foot__col-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.foot__link {
  font-size: 0.9375rem;
  color: color-mix(in srgb, var(--bg-warm) 78%, transparent);
  text-decoration: none;
  transition: color 0.18s var(--ease-organic);
  /* Keyboard-accessible: visible focus ring on dark bg */
}

.foot__link:hover {
  color: color-mix(in srgb, var(--bg-warm) 92%, white);
}

.foot__link:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--accent-orange) 80%, white);
  outline-offset: 2px;
  border-radius: 2px;
  color: color-mix(in srgb, var(--bg-warm) 92%, white);
}

/* Base bar */
.foot__base {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding-block-start: 1.75rem;
  border-block-start: 1px solid color-mix(in srgb, var(--bg-warm) 12%, transparent);
}

.foot__logo {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: color-mix(in srgb, var(--bg-warm) 80%, white);
}

.foot__logo-mark {
  font-style: italic;
  color: var(--accent-orange);
}

.foot__copy {
  font-size: 0.8125rem;
  color: color-mix(in srgb, var(--bg-warm) 58%, transparent);
  margin-inline-start: auto;
}

/* Reduced-motion: skip GSAP reveals; items visible immediately */
@media (prefers-reduced-motion: reduce) {
  .foot__reveal-item {
    opacity: 1 !important;
    transform: none !important;
  }
}

/* SplitText mask: clip chars from below */
.hero__headline-char {
  display: inline-block;
}

/* ───────────────────────────────────────────────────────────────
   ACCESSIBILITY: reduced motion
   ─────────────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hero__scroll-line {
    animation: none;
    opacity: 0.5;
  }
  .btn,
  .nav__link,
  .nav,
  .nav__link-text::after {
    transition-duration: 0.01ms;
  }
}
</style>

