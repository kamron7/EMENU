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
