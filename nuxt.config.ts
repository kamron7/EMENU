import { fileURLToPath } from 'node:url'

const gsapEsm = fileURLToPath(new URL('./gsap-public/esm', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['~/assets/css/tokens.css'],
  build: { transpile: ['gsap', 'three'] },
  vite: {
    resolve: {
      alias: {
        'gsap/ScrollTrigger': `${gsapEsm}/ScrollTrigger.js`,
        'gsap/SplitText': `${gsapEsm}/SplitText.js`,
        'gsap': `${gsapEsm}/index.js`
      }
    }
  },
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
