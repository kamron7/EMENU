<template>
  <div ref="root" class="page-root">

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
        aria-modal="true"
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

        <div class="hero__visual" aria-hidden="true">
          <div class="hero__card hero__card--back">
            <div class="hero__card-inner">
              <div class="hero__card-label">Today's special</div>
              <div class="hero__card-dish">Saffron Risotto</div>
              <div class="hero__card-price">€ 18</div>
            </div>
          </div>
          <div class="hero__card hero__card--front">
            <div class="hero__card-inner">
              <div class="hero__card-label">Chef's pick</div>
              <div class="hero__card-dish">Slow Lamb Shoulder</div>
              <div class="hero__card-price">€ 24</div>
              <div class="hero__card-tag">Popular</div>
            </div>
          </div>
          <div class="hero__glow" aria-hidden="true" />
        </div>
      </div>

      <div class="hero__scroll-hint" aria-hidden="true">
        <span class="hero__scroll-line" />
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         FEATURES — four capabilities, card grid
         ════════════════════════════════════════════ -->
    <section class="features" id="features" aria-labelledby="features-heading">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">What eMenu does</p>
          <h2 id="features-heading" class="section-heading">Everything your menu needs to perform</h2>
          <p class="section-sub">From QR scan to order, every step is crafted to feel effortless — for your guests and your team.</p>
        </header>

        <div class="features__grid">
          <article class="feature-card">
            <div class="feature-card__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="16" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="16" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M16 20h8M20 16v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            </div>
            <h3 class="feature-card__title">Instant QR menus</h3>
            <p class="feature-card__body">Generate a scannable QR code in seconds. Guests are at your menu before the water arrives.</p>
          </article>

          <article class="feature-card">
            <div class="feature-card__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 4v20M4 14h20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="14" cy="14" r="9" stroke="currentColor" stroke-width="1.6"/></svg>
            </div>
            <h3 class="feature-card__title">Live menu updates</h3>
            <p class="feature-card__body">Sold out of the risotto? Update in one tap. Every scan reflects the change immediately.</p>
          </article>

          <article class="feature-card">
            <div class="feature-card__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 21l4-8 4 5 3-4 5 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.6"/></svg>
            </div>
            <h3 class="feature-card__title">Rich photography</h3>
            <p class="feature-card__body">Dishes with photos outsell plain text by 30%. Upload once, display beautifully on every device.</p>
          </article>

          <article class="feature-card">
            <div class="feature-card__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M8 10h12M8 14h8M8 18h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.6"/></svg>
            </div>
            <h3 class="feature-card__title">Multi-language</h3>
            <p class="feature-card__body">Serve international guests in their own language. eMenu translates your menu automatically.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         HOW IT WORKS — numbered process, warm tone
         ════════════════════════════════════════════ -->
    <section class="how" id="how" aria-labelledby="how-heading">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Simple from day one</p>
          <h2 id="how-heading" class="section-heading">Up and running in under ten minutes</h2>
        </header>

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
    </section>

    <!-- ═══════════════════════════════════════════════
         SOCIAL PROOF — quotes, warm and human
         ════════════════════════════════════════════ -->
    <section class="social" id="social" aria-labelledby="social-heading">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">From restaurants who've switched</p>
          <h2 id="social-heading" class="section-heading">Guests notice. Staff notice. Revenue follows.</h2>
        </header>

        <div class="social__grid">
          <blockquote class="testimonial">
            <p class="testimonial__quote">"We saw a 22% increase in dessert orders the first week. Guests browse longer when the menu looks this good."</p>
            <footer class="testimonial__author">
              <div class="testimonial__avatar" aria-hidden="true">M</div>
              <div>
                <cite class="testimonial__name">Maria Kowalczyk</cite>
                <span class="testimonial__role">Owner, Bistro Soleil — Warsaw</span>
              </div>
            </footer>
          </blockquote>

          <blockquote class="testimonial">
            <p class="testimonial__quote">"Updating the menu used to take an hour and a trip to the printer. Now it's thirty seconds on my phone."</p>
            <footer class="testimonial__author">
              <div class="testimonial__avatar" aria-hidden="true">R</div>
              <div>
                <cite class="testimonial__name">Reza Ahmadi</cite>
                <span class="testimonial__role">Head Chef, Casa Terre — Amsterdam</span>
              </div>
            </footer>
          </blockquote>

          <blockquote class="testimonial testimonial--featured">
            <p class="testimonial__quote">"Our international guests feel at home now. eMenu translated everything in minutes and the photos made the food irresistible."</p>
            <footer class="testimonial__author">
              <div class="testimonial__avatar" aria-hidden="true">L</div>
              <div>
                <cite class="testimonial__name">Lucia Ferraro</cite>
                <span class="testimonial__role">Manager, Trattoria del Porto — Naples</span>
              </div>
            </footer>
          </blockquote>
        </div>

        <div class="social__cta">
          <p class="social__cta-line">Join 2,400+ restaurants already using eMenu.</p>
          <a href="#" class="btn btn--primary btn--lg">Start free — no card needed</a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         FOOTER — minimal, warm
         ════════════════════════════════════════════ -->
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <span class="site-footer__logo">eMenu</span>
        <p class="site-footer__copy">© 2026 eMenu. All rights reserved.</p>
        <nav class="site-footer__links" aria-label="Footer navigation">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const root = ref<HTMLElement | null>(null)
const isScrolled = ref(false)
const mobileOpen = ref(false)

let cleanup: Array<() => void> = []

onMounted(async () => {
  if (!import.meta.client) return

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
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  const { SplitText } = await import('gsap/SplitText')
  gsap.registerPlugin(ScrollTrigger, SplitText)

  // Section animation stubs — later tasks add initHero / initFeatures etc.
  // They push their own cleanup fns to `cleanup`.
  // Example slot (Task 4):
  // initHero(gsap, ScrollTrigger, SplitText, cleanup)

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

      // ── Hero card parallax tease ──────────────────────────────────
      gsap.to('.hero__card--front', {
        y: -12,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
      gsap.to('.hero__card--back', {
        y: 8,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.4,
      })

      // ── Feature cards stagger reveal ─────────────────────────────
      ScrollTrigger.batch('.feature-card', {
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 32,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            overwrite: true,
          }),
        start: 'top 88%',
        once: true,
      })

      // ── How steps reveal ─────────────────────────────────────────
      ScrollTrigger.batch('.how__step', {
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            x: -24,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.12,
            overwrite: true,
          }),
        start: 'top 85%',
        once: true,
      })

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

/* Hero text */
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

/* Hero visual: stacked menu cards */
.hero__visual {
  position: relative;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .hero__visual {
    height: 260px;
  }
}

.hero__glow {
  position: absolute;
  inset: 15%;
  background: radial-gradient(ellipse, color-mix(in srgb, var(--accent-orange) 18%, transparent) 0%, transparent 70%);
  filter: blur(32px);
  pointer-events: none;
}

.hero__card {
  position: absolute;
  background: var(--bg-cream);
  border-radius: 1.25rem;
  box-shadow: var(--shadow-warm);
  border: 1.5px solid color-mix(in srgb, var(--terracotta) 12%, transparent);
  padding: 1.75rem;
  will-change: transform;
}

.hero__card--back {
  width: 68%;
  bottom: 10%;
  left: 6%;
  transform: rotate(-4deg);
  opacity: 0.8;
  z-index: 1;
}

.hero__card--front {
  width: 72%;
  top: 8%;
  right: 4%;
  z-index: 2;
  transform: rotate(2deg);
}

.hero__card-inner {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.hero__card-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--terracotta);
}

.hero__card-dish {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--brown-deep);
}

.hero__card-price {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--accent-orange);
  margin-block-start: 0.25rem;
}

.hero__card-tag {
  display: inline-block;
  margin-block-start: 0.5rem;
  padding: 0.2rem 0.6rem;
  background: color-mix(in srgb, var(--accent-orange) 12%, transparent);
  color: var(--terracotta);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 2rem;
  align-self: flex-start;
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
   FEATURES
   ─────────────────────────────────────────────────────────────── */
.features {
  min-height: 70vh;
  background: var(--bg-vanilla);
  padding-block: 7rem;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: var(--bg-cream);
  border: 1.5px solid color-mix(in srgb, var(--terracotta) 10%, transparent);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition:
    box-shadow 0.25s var(--ease-organic),
    border-color 0.25s var(--ease-organic),
    transform 0.25s var(--ease-organic);
}

.feature-card:hover {
  box-shadow: var(--shadow-warm);
  border-color: color-mix(in srgb, var(--terracotta) 30%, transparent);
  transform: translateY(-3px);
}

@media (hover: none) {
  .feature-card:hover {
    transform: none;
    box-shadow: none;
  }
}

.feature-card__icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--accent-orange) 10%, transparent);
  border-radius: 0.75rem;
  color: var(--accent-orange);
  flex-shrink: 0;
}

.feature-card__title {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--brown-deep);
}

.feature-card__body {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-soft);
}

/* ───────────────────────────────────────────────────────────────
   HOW IT WORKS
   ─────────────────────────────────────────────────────────────── */
.how {
  min-height: 60vh;
  background: var(--bg-warm);
  padding-block: 7rem;
}

.how__steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 680px;
  margin-inline: auto;
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

/* ───────────────────────────────────────────────────────────────
   SOCIAL PROOF
   ─────────────────────────────────────────────────────────────── */
.social {
  min-height: 60vh;
  background: var(--bg-cream);
  padding-block: 7rem;
}

.social__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-block-end: 4rem;
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

.testimonial__avatar {
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--terracotta) 15%, var(--bg-vanilla));
  color: var(--terracotta);
  font-weight: 700;
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* ───────────────────────────────────────────────────────────────
   FOOTER
   ─────────────────────────────────────────────────────────────── */
.site-footer {
  background: var(--bg-vanilla);
  border-block-start: 1.5px solid color-mix(in srgb, var(--terracotta) 10%, transparent);
  padding-block: 2.25rem;
  margin-block-start: auto;
}

.site-footer__inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.site-footer__logo {
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--brown-deep);
}

.site-footer__copy {
  font-size: 0.875rem;
  color: var(--text-soft);
  margin-inline-start: auto;
}

.site-footer__links {
  display: flex;
  gap: 1.25rem;
}

.site-footer__links a {
  font-size: 0.875rem;
  color: var(--text-soft);
  text-decoration: none;
  transition: color 0.18s var(--ease-organic);
}

.site-footer__links a:hover {
  color: var(--brown-deep);
}

/* ───────────────────────────────────────────────────────────────
   ACCESSIBILITY: reduced motion
   ─────────────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hero__scroll-line {
    animation: none;
    opacity: 0.5;
  }
  .hero__card--front,
  .hero__card--back {
    /* GSAP float animations are guarded in script;
       CSS transitions still use prefers-reduced-motion: reduce safeguard */
    transition: none;
  }
  .btn,
  .nav__link,
  .feature-card,
  .nav,
  .nav__link-text::after {
    transition-duration: 0.01ms;
  }
}
</style>
