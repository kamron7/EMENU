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
          <!-- floating menu cards (keep for ambient depth) -->
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

          <!-- CSS phone mockup -->
          <div class="hero__phone-wrap">
            <div class="hero__phone">
              <div class="hero__phone-notch"></div>
              <div class="hero__phone-screen">
                <!-- food hero image -->
                <div class="hero__phone-img-wrap">
                  <!-- swap Unsplash URL below for your food photo -->
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80"
                    alt=""
                    class="hero__phone-img"
                    loading="lazy"
                    width="300"
                    height="200"
                  />
                  <div class="hero__phone-img-overlay"></div>
                </div>
                <!-- menu UI rows -->
                <div class="hero__phone-menu">
                  <p class="hero__phone-menu-label">Today's menu</p>
                  <div class="hero__phone-row">
                    <span class="hero__phone-dish">Saffron Risotto</span>
                    <span class="hero__phone-chip">€ 18</span>
                  </div>
                  <div class="hero__phone-row">
                    <span class="hero__phone-dish">Slow Lamb Shoulder</span>
                    <span class="hero__phone-chip hero__phone-chip--accent">€ 24</span>
                  </div>
                  <div class="hero__phone-row">
                    <span class="hero__phone-dish">Burrata &amp; Tomato</span>
                    <span class="hero__phone-chip">€ 14</span>
                  </div>
                  <div class="hero__phone-row">
                    <span class="hero__phone-dish">Chocolate Fondant</span>
                    <span class="hero__phone-chip">€ 9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero__scroll-hint" aria-hidden="true">
        <span class="hero__scroll-line" />
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         FEATURES — pinned horizontal carousel (Task 5)
         ════════════════════════════════════════════ -->
    <section class="features" id="features" aria-labelledby="features-heading">
      <!-- Decorative blobs — positioned behind track, parallax at slower scrub -->
      <div class="blob blob--a" aria-hidden="true"></div>
      <div class="blob blob--b" aria-hidden="true"></div>
      <div class="blob blob--c" aria-hidden="true"></div>

      <div class="features__viewport">
        <header class="section-header features__header">
          <p class="section-eyebrow">What eMenu does</p>
          <h2 id="features-heading" class="section-heading">Everything your menu needs to perform</h2>
          <p class="section-sub">From QR scan to order, every step is crafted to feel effortless — for your guests and your team.</p>
        </header>

        <!-- Horizontal scroll track: flex row, each card ~80vw -->
        <div class="features__track">

          <article class="feature-card">
            <div class="feature-card__visual feature-card__visual--sync" aria-hidden="true">
              <!-- Price sync illustration: two price tags in sync -->
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect x="6" y="16" width="24" height="32" rx="4" fill="color-mix(in srgb, var(--accent-orange) 12%, transparent)" stroke="var(--accent-orange)" stroke-width="1.8"/>
                <path d="M14 28h8M14 34h5" stroke="var(--accent-orange)" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M10 24h6" stroke="var(--terracotta)" stroke-width="1.4" stroke-linecap="round"/>
                <rect x="34" y="16" width="24" height="32" rx="4" fill="color-mix(in srgb, var(--terracotta) 10%, transparent)" stroke="var(--terracotta)" stroke-width="1.8"/>
                <path d="M42 28h8M42 34h5" stroke="var(--terracotta)" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M38 24h6" stroke="var(--accent-orange)" stroke-width="1.4" stroke-linecap="round"/>
                <!-- Sync arrow -->
                <path d="M30 32h4M31 30l-2 2 2 2" stroke="var(--brown-deep)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="feature-card__icon" aria-hidden="true">
              <!-- Lightning bolt: instant price sync -->
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M16 4L8 16h7l-3 8 11-13h-7l3-7z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="feature-card__title">Instant Price Sync</h3>
            <p class="feature-card__body">Change a price in your dashboard and it's live on every guest's phone within seconds — no reprinting, no confusion, no revenue left on the table.</p>
            <div class="feature-card__stat">
              <span class="feature-card__stat-num">2 s</span>
              <span class="feature-card__stat-label">average update time</span>
            </div>
          </article>

          <article class="feature-card">
            <div class="feature-card__visual feature-card__visual--allergen" aria-hidden="true">
              <!-- Allergen tag illustration: shield with leaf -->
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M32 8L14 18v14c0 10 8 19 18 22 10-3 18-12 18-22V18L32 8z" fill="color-mix(in srgb, var(--accent-orange) 10%, transparent)" stroke="var(--accent-orange)" stroke-width="1.8"/>
                <path d="M24 32c4-8 12-10 16-6" stroke="var(--terracotta)" stroke-width="1.6" stroke-linecap="round"/>
                <circle cx="32" cy="30" r="5" fill="color-mix(in srgb, var(--accent-orange) 20%, transparent)" stroke="var(--accent-orange)" stroke-width="1.6"/>
                <path d="M29 30l2 2 4-4" stroke="var(--terracotta)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="feature-card__icon" aria-hidden="true">
              <!-- Shield check: allergen safety -->
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4L5 9v7c0 5.5 4 10.5 9 12 5-1.5 9-6.5 9-12V9L14 4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                <path d="M10 14l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="feature-card__title">Allergen Tags</h3>
            <p class="feature-card__body">Mark every dish with the allergens it contains. Guests with dietary needs browse confidently, your staff answer fewer questions, and you meet compliance requirements effortlessly.</p>
            <div class="feature-card__stat">
              <span class="feature-card__stat-num">14</span>
              <span class="feature-card__stat-label">EU allergens supported</span>
            </div>
          </article>

          <article class="feature-card">
            <div class="feature-card__visual feature-card__visual--lang" aria-hidden="true">
              <!-- Language illustration: speech bubbles with flags -->
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect x="8" y="12" width="28" height="20" rx="4" fill="color-mix(in srgb, var(--accent-orange) 10%, transparent)" stroke="var(--accent-orange)" stroke-width="1.8"/>
                <path d="M36 32l-4 5h4V32z" fill="var(--accent-orange)"/>
                <path d="M14 20h16M14 26h10" stroke="var(--accent-orange)" stroke-width="1.4" stroke-linecap="round"/>
                <rect x="28" y="32" width="28" height="20" rx="4" fill="color-mix(in srgb, var(--terracotta) 10%, transparent)" stroke="var(--terracotta)" stroke-width="1.8"/>
                <path d="M28 37l4-5v5h-4z" fill="var(--terracotta)"/>
                <path d="M34 40h16M34 46h10" stroke="var(--terracotta)" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="feature-card__icon" aria-hidden="true">
              <!-- Globe: multi-language -->
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="9" stroke="currentColor" stroke-width="1.6"/>
                <path d="M14 5c-3 4-3 14 0 18M14 5c3 4 3 14 0 18" stroke="currentColor" stroke-width="1.6"/>
                <path d="M5 14h18" stroke="currentColor" stroke-width="1.6"/>
                <path d="M6.5 9.5h15M6.5 18.5h15" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/>
              </svg>
            </div>
            <h3 class="feature-card__title">Multi-language Support</h3>
            <p class="feature-card__body">One menu, every language. eMenu translates your dishes and descriptions automatically so international guests feel at home the moment they scan — no bilingual staff required.</p>
            <div class="feature-card__stat">
              <span class="feature-card__stat-num">40+</span>
              <span class="feature-card__stat-label">languages available</span>
            </div>
          </article>

        </div><!-- /.features__track -->
      </div><!-- /.features__viewport -->
    </section>

    <!-- ═══════════════════════════════════════════════
         HOW IT WORKS — numbered process + media reveal
         ════════════════════════════════════════════ -->
    <section class="how" id="how" aria-labelledby="how-heading">
      <div class="container">
        <header class="section-header">
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

          <!-- Media reveal: clip-path morphs open on scroll -->
          <div class="how__media" aria-hidden="true">
            <!-- swap: replace with your own food/product photo -->
            <img
              class="how__media-img"
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80"
              alt=""
              loading="lazy"
              width="900"
              height="640"
            />
            <div class="how__media-overlay" aria-hidden="true"></div>
            <!-- Decorative badge over image -->
            <div class="how__media-badge" aria-hidden="true">
              <span class="how__media-badge-num">10<sup>min</sup></span>
              <span class="how__media-badge-label">to go live</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         ROI CALCULATOR — interactive revenue estimator
         ════════════════════════════════════════════ -->
    <section class="roi" id="roi" aria-labelledby="roi-heading">
      <div class="container roi__inner">
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
      </div>
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

        <!-- Asymmetric grid — varied margin-top offsets create editorial depth -->
        <div class="social__grid">

          <!-- Card 1: top-left, no offset -->
          <blockquote class="testimonial testimonial--col-a">
            <!-- swap: https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&q=80 -->
            <img
              class="testimonial__avatar-img"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&q=80"
              alt="Maria Kowalczyk"
              width="48"
              height="48"
              loading="lazy"
            /><!-- swap -->
            <p class="testimonial__quote">"We saw a 22% increase in dessert orders the first week. Guests browse longer when the menu looks this good."</p>
            <footer class="testimonial__author">
              <div>
                <cite class="testimonial__name">Maria Kowalczyk</cite>
                <span class="testimonial__role">Owner, Bistro Soleil — Warsaw</span>
              </div>
            </footer>
          </blockquote>

          <!-- Card 2: right column, pushed down — creates asymmetric rhythm -->
          <blockquote class="testimonial testimonial--col-b testimonial--push">
            <!-- swap: https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&q=80 -->
            <img
              class="testimonial__avatar-img"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&q=80"
              alt="Reza Ahmadi"
              width="48"
              height="48"
              loading="lazy"
            /><!-- swap -->
            <p class="testimonial__quote">"Updating the menu used to take an hour and a trip to the printer. Now it's thirty seconds on my phone."</p>
            <footer class="testimonial__author">
              <div>
                <cite class="testimonial__name">Reza Ahmadi</cite>
                <span class="testimonial__role">Head Chef, Casa Terre — Amsterdam</span>
              </div>
            </footer>
          </blockquote>

          <!-- Card 3: featured — spans full width, centrepiece of the grid -->
          <blockquote class="testimonial testimonial--featured testimonial--span">
            <!-- swap: https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&q=80 -->
            <img
              class="testimonial__avatar-img testimonial__avatar-img--lg"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&q=80"
              alt="Lucia Ferraro"
              width="64"
              height="64"
              loading="lazy"
            /><!-- swap -->
            <p class="testimonial__quote testimonial__quote--lg">"Our international guests feel at home now. eMenu translated everything in minutes and the photos made the food irresistible."</p>
            <footer class="testimonial__author">
              <div>
                <cite class="testimonial__name">Lucia Ferraro</cite>
                <span class="testimonial__role">Manager, Trattoria del Porto — Naples</span>
              </div>
            </footer>
          </blockquote>

          <!-- Card 4: bottom-left, lifted slightly relative to card 5 -->
          <blockquote class="testimonial testimonial--col-a testimonial--lift">
            <!-- swap: https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=96&q=80 -->
            <img
              class="testimonial__avatar-img"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=96&q=80"
              alt="Tomasz Wiśniewski"
              width="48"
              height="48"
              loading="lazy"
            /><!-- swap -->
            <p class="testimonial__quote">"Our team spends zero time on menu maintenance. That's an hour a day back to the kitchen where it belongs."</p>
            <footer class="testimonial__author">
              <div>
                <cite class="testimonial__name">Tomasz Wiśniewski</cite>
                <span class="testimonial__role">Head Chef, Kuchnia Rzeki — Kraków</span>
              </div>
            </footer>
          </blockquote>

          <!-- Card 5: bottom-right, natural resting position -->
          <blockquote class="testimonial testimonial--col-b">
            <!-- swap: https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=96&q=80 -->
            <img
              class="testimonial__avatar-img"
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=96&q=80"
              alt="Aiko Nakamura"
              width="48"
              height="48"
              loading="lazy"
            /><!-- swap -->
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

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const root = ref<HTMLElement | null>(null)
const isScrolled = ref(false)
const mobileOpen = ref(false)

// ── Task 6: ROI calculator reactive state ────────────────────────
const covers = ref(80)
const avgBill = ref(35)
const UPLIFT = 0.15
const DAYS = 30
const extraRevenue = computed(() => Math.round(covers.value * avgBill.value * UPLIFT * DAYS))
// displayRevenue is tweened client-side; server renders the computed value directly
const displayRevenue = ref(extraRevenue.value)

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

        // ── 3D phone scroll-expand (scrub) ────────────────────────
        gsap.fromTo(
          '.hero__phone',
          { scale: 0.6, rotateX: 18, y: 60, transformPerspective: 900 },
          {
            scale: 1,
            rotateX: 0,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: '+=80%',
              scrub: 1.2,
              pin: '.hero__phone-wrap',
              pinSpacing: false,
            },
          }
        )
      } else {
        // reduced-motion: just show phone at final state immediately
        gsap.set('.hero__phone', { scale: 1, rotateX: 0, y: 0 })
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

        // ── Media clip-path morph: inset rectangle opens on scroll ───
        // Emil-design-eng: clip-path is GPU-accelerated, reveals with intent
        gsap.fromTo(
          '.how__media',
          { clipPath: 'inset(14% 18% 14% 18% round 2rem)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
            ease: 'none',
            scrollTrigger: {
              trigger: '.how',
              start: 'top 65%',
              end: 'center 45%',
              scrub: 1.2,
            },
          }
        )
      } else {
        // Reduced-motion: instantly show steps and media at final state
        gsap.set('.how__media', { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)' })
        // Step titles visible immediately — no SplitText so no split.revert needed
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

  // ── Task 5: Pinned horizontal feature carousel + blob parallax ──
  const mm5 = gsap.matchMedia()
  mm5.add(
    {
      motion:       '(prefers-reduced-motion: no-preference)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (ctx: { conditions: Record<string, boolean> }) => {
      const { reduceMotion } = ctx.conditions

      if (reduceMotion) {
        // Reduced-motion: stack cards vertically, no pin, just show them.
        gsap.set('.features__track', { display: 'flex', flexWrap: 'wrap' })
        return
      }

      // ── Horizontal scrub: pin .features, drive .features__track x ──
      // ease: 'none' is required so scroll position and horizontal position
      // remain 1:1 (see gsap-scrolltrigger skill).
      // Fix: use pixel-based x (not xPercent) equal to the actual overflow
      // distance so translation and pin distance match exactly.
      const track = document.querySelector('.features__track') as HTMLElement

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: '.features',
          pin: true,
          // overflow: visible is set on .features in CSS so the pin spacer
          // is not clipped. See source comment on .features below.
          scrub: 1,
          invalidateOnRefresh: true,
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
        },
      })

      // ── Blob parallax — slower scrub (2) than the track (1) ──────
      // Fix: span the same pinned distance as the track so blobs parallax
      // across the full horizontal scroll, not just the unpinned section height.
      gsap.to('.blob', {
        xPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.features',
          scrub: 2,
          start: 'top top',
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
        },
      })
    }
  )
  cleanup.push(() => mm5.revert())

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
            start: 'top 82%',
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
   FEATURES — pinned horizontal carousel (Task 5)
   ─────────────────────────────────────────────────────────────── */

/*
  overflow: visible (not hidden) is intentional here.
  ScrollTrigger's pin spacer is inserted as a sibling AFTER .features.
  If an ancestor has overflow:hidden it clips the spacer and the pin
  breaks silently. By keeping overflow default (visible) the spacer
  renders correctly. Do NOT add overflow:hidden to .features or its
  ancestors (.page-root) without also removing/adjusting the pin.
*/
.features {
  background: var(--bg-vanilla);
  position: relative;          /* stacking context for blobs */
  /* height is determined by pin spacer; don't set min-height */
}

/* Viewport wrapper: full-screen viewport for the pinned section */
.features__viewport {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;            /* clip cards peeking out sideways */
  position: relative;
}

/* Section header inside pinned viewport */
.features__header {
  margin-block-end: 3rem;
  padding-block-start: 5rem;
  position: relative;
  z-index: 2;
}

/* Horizontal track: flex row, each card ~80vw */
.features__track {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 2rem;
  padding-inline: max(2rem, calc((100vw - 80vw) / 2));
  padding-block-end: 4rem;
  will-change: transform;
  position: relative;
  z-index: 2;
}

/* ── Feature cards ─────────────────────────────────────────────── */
.feature-card {
  flex: 0 0 80vw;
  max-width: 640px;
  background: var(--bg-cream);
  border: 1.5px solid color-mix(in srgb, var(--terracotta) 10%, transparent);
  border-radius: 1.5rem;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  /* Tactile lift on hover — the card is ~80vw so users hover over it */
  transition:
    box-shadow 0.28s var(--ease-organic),
    border-color 0.28s var(--ease-organic),
    transform 0.28s var(--ease-organic);
  /* Subtle depth: warm shadow at rest */
  box-shadow: 0 2px 16px color-mix(in srgb, var(--terracotta) 6%, transparent);
}

@media (hover: hover) and (pointer: fine) {
  .feature-card:hover {
    box-shadow: var(--shadow-warm);
    border-color: color-mix(in srgb, var(--terracotta) 28%, transparent);
    transform: translateY(-4px);
  }
}

/* Large decorative illustration area */
.feature-card__visual {
  width: 100%;
  height: 120px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-card__visual--sync {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--accent-orange) 8%, var(--bg-vanilla)),
    color-mix(in srgb, var(--terracotta) 6%, var(--bg-cream))
  );
}

.feature-card__visual--allergen {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--terracotta) 8%, var(--bg-vanilla)),
    color-mix(in srgb, var(--accent-orange) 5%, var(--bg-cream))
  );
}

.feature-card__visual--lang {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--brown-deep) 5%, var(--bg-vanilla)),
    color-mix(in srgb, var(--accent-orange) 7%, var(--bg-cream))
  );
}

.feature-card__icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--accent-orange) 10%, transparent);
  border-radius: 0.875rem;
  color: var(--accent-orange);
  flex-shrink: 0;
}

.feature-card__title {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--brown-deep);
  line-height: 1.2;
}

.feature-card__body {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-soft);
  flex: 1;
}

/* Stat callout at card bottom — appetizing proof point */
.feature-card__stat {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding-block-start: 0.75rem;
  border-block-start: 1px solid color-mix(in srgb, var(--terracotta) 10%, transparent);
  margin-block-start: auto;
}

.feature-card__stat-num {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--accent-orange);
  font-variant-numeric: tabular-nums;
}

.feature-card__stat-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-soft);
  letter-spacing: 0.02em;
}

/* ── Decorative blobs ─────────────────────────────────────────── */
/*
  Blobs use organic border-radius and warm gradients (token-based).
  They are absolutely positioned behind the track (z-index 0) and
  parallax at scrub:2 (slower than the track's scrub:1) giving depth.
*/
.blob {
  position: absolute;
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%;
  pointer-events: none;
  will-change: transform;
  z-index: 0;
}

.blob--a {
  width: clamp(280px, 35vw, 520px);
  height: clamp(200px, 28vw, 400px);
  top: 5%;
  left: -8%;
  background: radial-gradient(
    ellipse at 40% 50%,
    color-mix(in srgb, var(--accent-orange) 14%, transparent),
    color-mix(in srgb, var(--terracotta) 6%, transparent) 60%,
    transparent 100%
  );
  border-radius: 67% 33% 58% 42% / 43% 67% 33% 57%;
}

.blob--b {
  width: clamp(200px, 28vw, 420px);
  height: clamp(180px, 24vw, 360px);
  top: 45%;
  left: 45%;
  background: radial-gradient(
    ellipse at 55% 45%,
    color-mix(in srgb, var(--terracotta) 10%, transparent),
    color-mix(in srgb, var(--accent-orange) 5%, transparent) 55%,
    transparent 100%
  );
  border-radius: 42% 58% 35% 65% / 55% 38% 62% 45%;
}

.blob--c {
  width: clamp(160px, 22vw, 340px);
  height: clamp(140px, 18vw, 280px);
  bottom: 8%;
  right: 5%;
  background: radial-gradient(
    ellipse at 50% 55%,
    color-mix(in srgb, var(--bg-warm) 40%, color-mix(in srgb, var(--accent-orange) 8%, transparent)),
    transparent 70%
  );
  border-radius: 55% 45% 40% 60% / 60% 40% 65% 35%;
}

/* ── Reduced-motion: stacked cards, no pin ──────────────────────
   GSAP's mm5 sets flexWrap:wrap on the track; these CSS rules
   make the stacked layout look intentional and readable.         */
@media (prefers-reduced-motion: reduce) {
  .features__track {
    flex-wrap: wrap;
    padding-inline: 0;
  }
  .feature-card {
    flex: 1 1 280px;
    max-width: 100%;
  }
  .blob {
    display: none; /* blobs rely on scroll parallax — hide when motion off */
  }
}

/* ───────────────────────────────────────────────────────────────
   HOW IT WORKS
   ─────────────────────────────────────────────────────────────── */
.how {
  min-height: 60vh;
  background: var(--bg-warm);
  padding-block: 7rem;
}

/* Two-column layout: steps left, media right */
.how__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

@media (max-width: 900px) {
  .how__layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
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

/* ── Media column ────────────────────────────────────────────── */
.how__media {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  /* GSAP will animate clip-path; set initial state via JS to avoid flash */
  clip-path: inset(14% 18% 14% 18% round 2rem);
  will-change: clip-path;
  box-shadow:
    0 8px 40px color-mix(in srgb, var(--terracotta) 18%, transparent),
    0 2px 8px  color-mix(in srgb, var(--brown-deep) 10%, transparent);
}

.how__media-img {
  display: block;
  width: 100%;
  height: 420px;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 900px) {
  .how__media-img {
    height: 260px;
  }
}

/* Warm gradient overlay — top-to-bottom fade from transparent to cream tint */
.how__media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    color-mix(in srgb, var(--brown-deep) 22%, transparent) 100%
  );
  pointer-events: none;
}

/* Decorative badge — "10 min to go live" */
.how__media-badge {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
  background: color-mix(in srgb, var(--bg-cream) 92%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid color-mix(in srgb, var(--accent-orange) 20%, transparent);
  border-radius: 0.875rem;
  padding: 0.875rem 1.125rem;
  box-shadow: 0 4px 20px color-mix(in srgb, var(--terracotta) 16%, transparent);
}

.how__media-badge-num {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--accent-orange);
  line-height: 1;
}

.how__media-badge-num sup {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  vertical-align: super;
  color: var(--terracotta);
}

.how__media-badge-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-soft);
}

/* ─────────────────────────────────────────────────────────────────
   ROI CALCULATOR
   ─────────────────────────────────────────────────────────────── */
.roi {
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

.roi__inner {
  position: relative;
  z-index: 1;
}

.roi__header {
  text-align: center;
  margin-block-end: 4rem;
}

.roi__heading {
  /* inherits .section-heading; override max-width for readability */
  max-width: 22ch;
  margin-inline: auto;
}

.roi__sub {
  font-size: 1.0625rem;
  line-height: 1.65;
  color: var(--text-soft);
  max-width: 52ch;
  margin-inline: auto;
  margin-block-start: 1rem;
}

/* Widget: two-column on desktop (controls | board) */
.roi__widget {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

@media (max-width: 860px) {
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

/* Reduced-motion: no clip-path animation on .how__media */
@media (prefers-reduced-motion: reduce) {
  .how__media {
    clip-path: inset(0% 0% 0% 0% round 1.5rem) !important;
  }
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

/* ─────────────────────────────────────────────────────────────────
   TESTIMONIALS — asymmetric grid restructure (Task 7)
   ─────────────────────────────────────────────────────────────── */

/*
  Two-column grid with deliberate row-height auto sizing.
  Asymmetry is achieved by:
    1. .testimonial--push  → margin-block-start offset on column B cards
    2. .testimonial--lift  → negative margin pulls card up against the flow
    3. .testimonial--span  → column-span: all for the featured centrepiece
  The .testimonial class is kept exactly so Task 3's ScrollTrigger.batch
  entrance reveal fires without modification.
*/
.social__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-block-end: 4rem;
  align-items: start;  /* critical: auto-height rows, no stretch */
}

@media (max-width: 680px) {
  .social__grid {
    grid-template-columns: 1fr;
  }
  /* reset all offsets on single-column layout */
  .testimonial--push,
  .testimonial--lift {
    margin-block-start: 0 !important;
  }
}

/* Column placement helpers */
.testimonial--col-a { grid-column: 1; }
.testimonial--col-b { grid-column: 2; }

/* Offset: push card B row-1 down, creating visual breathing room */
.testimonial--push { margin-block-start: 2.5rem; }

/* Lift: pull card A row-2 upward, overlapping the gap slightly */
.testimonial--lift { margin-block-start: -0.75rem; }

/* Featured: spans both columns; centrepiece with horizontal layout */
.testimonial--span {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 0 1.5rem;
  align-items: center;
}

.testimonial--span .testimonial__avatar-img--lg {
  grid-row: 1 / 3;
  align-self: center;
}

.testimonial--span .testimonial__quote--lg {
  grid-column: 2;
}

.testimonial--span .testimonial__author {
  grid-column: 2;
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
  background: color-mix(in srgb, var(--bg-warm) 96%, white);
  color: var(--brown-deep);
  border-color: color-mix(in srgb, var(--bg-warm) 96%, white);
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
  color: color-mix(in srgb, var(--bg-warm) 55%, transparent);
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
  color: color-mix(in srgb, var(--bg-warm) 60%, transparent);
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
  color: color-mix(in srgb, var(--bg-warm) 40%, transparent);
  margin-inline-start: auto;
}

/* Reduced-motion: skip GSAP reveals; items visible immediately */
@media (prefers-reduced-motion: reduce) {
  .foot__reveal-item {
    opacity: 1 !important;
    transform: none !important;
  }
}

/* ───────────────────────────────────────────────────────────────
   HERO — PHONE MOCKUP
   ─────────────────────────────────────────────────────────────── */

/* Wrap: pinned by ScrollTrigger; sits inside .hero__visual */
.hero__phone-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 3;
}

/* The phone frame shell — gradient border via padding + background-clip */
.hero__phone {
  position: relative;
  width: 210px;
  height: 430px;
  border-radius: 2.75rem;
  /* Glistening gradient border: warm gold → terracotta → ivory sheen */
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--accent-orange) 60%, var(--bg-cream)) 0%,
      var(--terracotta) 35%,
      color-mix(in srgb, var(--brown-deep) 80%, var(--terracotta)) 60%,
      color-mix(in srgb, var(--accent-orange) 40%, white) 100% /* intentional: specular white, no token */
    );
  padding: 2px; /* border thickness */
  box-shadow:
    0 8px 32px color-mix(in srgb, var(--terracotta) 28%, transparent),
    0 32px 80px color-mix(in srgb, var(--brown-deep) 18%, transparent),
    0 2px 8px  color-mix(in srgb, var(--accent-orange) 20%, transparent),
    inset 0 1px 0 color-mix(in srgb, #fff 30%, transparent);
  will-change: transform;
  transform-origin: center bottom;
  /* glossy specular sheen overlay */
  isolation: isolate;
}

/* Top specular gloss reflection */
.hero__phone::before {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: calc(2.75rem - 2px);
  background: linear-gradient(
    160deg,
    color-mix(in srgb, #fff 22%, transparent) 0%,
    transparent 42%
  );
  pointer-events: none;
  z-index: 2;
}

/* Notch */
.hero__phone-notch {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 18px;
  background: color-mix(in srgb, var(--brown-deep) 92%, transparent);
  border-radius: 0 0 1rem 1rem;
  z-index: 4;
}

/* Inner screen surface */
.hero__phone-screen {
  width: 100%;
  height: 100%;
  border-radius: calc(2.75rem - 2px);
  background: var(--bg-cream);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Food hero image inside screen */
.hero__phone-img-wrap {
  position: relative;
  width: 100%;
  height: 195px;
  flex-shrink: 0;
  overflow: hidden;
}

.hero__phone-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Warm gradient fade at bottom of image into the menu list */
.hero__phone-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    color-mix(in srgb, var(--bg-cream) 90%, transparent) 100%
  );
}

/* Menu list area */
.hero__phone-menu {
  flex: 1;
  padding: 0.75rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  overflow: hidden;
}

.hero__phone-menu-label {
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-block-end: 0.25rem;
}

/* Each dish row: name on left, price chip on right */
.hero__phone-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  padding: 0.3125rem 0.5rem;
  background: color-mix(in srgb, var(--bg-vanilla) 80%, transparent);
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--terracotta) 8%, transparent);
}

.hero__phone-dish {
  font-size: 0.5625rem;
  font-weight: 600;
  color: var(--brown-deep);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Price chip */
.hero__phone-chip {
  flex-shrink: 0;
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0.125rem 0.375rem;
  border-radius: 2rem;
  background: color-mix(in srgb, var(--accent-orange) 12%, transparent);
  color: var(--terracotta);
}

.hero__phone-chip--accent {
  background: var(--accent-orange);
  color: var(--bg-cream);
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
