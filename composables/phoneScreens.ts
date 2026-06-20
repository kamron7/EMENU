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
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

function row(ctx: CanvasRenderingContext2D, y: number, dish: string, price: string, accent = false) {
  ctx.fillStyle = BROWN; ctx.font = '32px system-ui'; ctx.textAlign = 'left'; ctx.fillText(dish, 40, y)
  ctx.fillStyle = accent ? ORANGE : SOFT; ctx.textAlign = 'right'; ctx.fillText(price, W - 40, y)
}

function pill(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, bg: string, fg: string) {
  ctx.font = '22px system-ui'
  const tw = ctx.measureText(label).width
  const pw = tw + 24, ph = 34
  ctx.fillStyle = bg
  ctx.beginPath()
  ctx.roundRect(x, y - 26, pw, ph, 17)
  ctx.fill()
  ctx.fillStyle = fg
  ctx.textAlign = 'left'
  ctx.fillText(label, x + 12, y)
}

export function drawMenu(): THREE.CanvasTexture {
  const { c, ctx } = base()
  // Header band
  ctx.fillStyle = ORANGE; ctx.fillRect(0, 0, W, 220)
  ctx.fillStyle = CREAM; ctx.font = 'bold 44px system-ui'; ctx.textAlign = 'left'
  ctx.fillText("Today's Menu", 40, 130)
  // Divider
  ctx.fillStyle = WARM; ctx.fillRect(40, 260, W - 80, 2)
  // Rows
  row(ctx, 320, 'Saffron Risotto', '€18')
  row(ctx, 400, 'Slow Lamb Shoulder', '€24', true)
  row(ctx, 480, 'Burrata & Tomato', '€14')
  row(ctx, 560, 'Chocolate Fondant', '€9')
  return toTexture(c)
}

export function drawPriceSync(): THREE.CanvasTexture {
  const { c, ctx } = base()
  // Header
  ctx.fillStyle = TERRA; ctx.fillRect(0, 0, W, 220)
  ctx.fillStyle = CREAM; ctx.font = 'bold 42px system-ui'; ctx.textAlign = 'left'
  ctx.fillText('Instant Price Sync', 40, 130)
  // Subtitle
  ctx.fillStyle = CREAM; ctx.globalAlpha = 0.75; ctx.font = '26px system-ui'
  ctx.fillText('Live on every device', 40, 175); ctx.globalAlpha = 1

  // Price rows: old (strikethrough) → new
  const items = [
    { dish: 'Truffle Pasta',   old: '€22', new: '€19' },
    { dish: 'Sea Bass',        old: '€28', new: '€24' },
    { dish: 'Tiramisu',        old: '€11', new: '€9'  },
  ]
  let y = 320
  for (const item of items) {
    // Dish name
    ctx.fillStyle = BROWN; ctx.font = '30px system-ui'; ctx.textAlign = 'left'
    ctx.fillText(item.dish, 40, y)
    // Old price (strikethrough)
    ctx.fillStyle = SOFT; ctx.font = '28px system-ui'; ctx.textAlign = 'right'
    ctx.fillText(item.old, W - 160, y)
    const oldW = ctx.measureText(item.old).width
    ctx.strokeStyle = SOFT; ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(W - 160 - oldW, y - 10)
    ctx.lineTo(W - 160, y - 10)
    ctx.stroke()
    // New price (ORANGE)
    ctx.fillStyle = ORANGE; ctx.font = 'bold 30px system-ui'
    ctx.fillText(item.new, W - 40, y)
    y += 100
  }

  // Synced pill
  ctx.fillStyle = '#e8f5e9'; ctx.font = 'bold 24px system-ui'
  const pillText = 'synced ✓'
  const pillW = ctx.measureText(pillText).width + 32
  ctx.beginPath()
  ctx.roundRect(W / 2 - pillW / 2, 640, pillW, 44, 22)
  ctx.fill()
  ctx.fillStyle = '#2e7d32'; ctx.textAlign = 'center'
  ctx.fillText(pillText, W / 2, 669)
  return toTexture(c)
}

export function drawAllergen(): THREE.CanvasTexture {
  const { c, ctx } = base()
  // Header
  ctx.fillStyle = TERRA; ctx.fillRect(0, 0, W, 220)
  ctx.fillStyle = CREAM; ctx.font = 'bold 44px system-ui'; ctx.textAlign = 'left'
  ctx.fillText('Allergen Tags', 40, 130)
  ctx.fillStyle = CREAM; ctx.globalAlpha = 0.75; ctx.font = '26px system-ui'
  ctx.fillText('Clear for every dish', 40, 175); ctx.globalAlpha = 1

  // Dish rows with allergen chips
  const dishes: Array<{ name: string; tags: Array<{ label: string; bg: string; fg: string }> }> = [
    {
      name: 'Saffron Risotto',
      tags: [
        { label: 'gluten-free', bg: ORANGE + '33', fg: TERRA },
        { label: 'vegan', bg: TERRA + '22', fg: TERRA },
      ],
    },
    {
      name: 'Slow Lamb Shoulder',
      tags: [
        { label: 'nuts', bg: BROWN + '22', fg: BROWN },
      ],
    },
    {
      name: 'Burrata & Tomato',
      tags: [
        { label: 'gluten-free', bg: ORANGE + '33', fg: TERRA },
        { label: 'dairy', bg: WARM, fg: SOFT },
      ],
    },
    {
      name: 'Chocolate Fondant',
      tags: [
        { label: 'nuts', bg: BROWN + '22', fg: BROWN },
        { label: 'dairy', bg: WARM, fg: SOFT },
        { label: 'gluten', bg: TERRA + '22', fg: TERRA },
      ],
    },
  ]

  let y = 290
  for (const d of dishes) {
    ctx.fillStyle = BROWN; ctx.font = 'bold 28px system-ui'; ctx.textAlign = 'left'
    ctx.fillText(d.name, 40, y)
    y += 42
    let px = 40
    for (const tag of d.tags) {
      ctx.font = '20px system-ui'
      const tw = ctx.measureText(tag.label).width
      const pw = tw + 20, ph = 30
      ctx.fillStyle = tag.bg
      ctx.beginPath()
      ctx.roundRect(px, y - 22, pw, ph, 15)
      ctx.fill()
      ctx.fillStyle = tag.fg; ctx.textAlign = 'left'
      ctx.fillText(tag.label, px + 10, y)
      px += pw + 10
    }
    y += 60
  }
  return toTexture(c)
}

export function drawMultilang(): THREE.CanvasTexture {
  const { c, ctx } = base()
  // Header
  ctx.fillStyle = ORANGE; ctx.fillRect(0, 0, W, 220)
  ctx.fillStyle = CREAM; ctx.font = 'bold 40px system-ui'; ctx.textAlign = 'left'
  ctx.fillText('Multi-language', 40, 120)
  // Globe glyph
  ctx.font = '52px system-ui'; ctx.textAlign = 'right'
  ctx.fillText('🌐', W - 40, 130)
  ctx.fillStyle = CREAM; ctx.globalAlpha = 0.75; ctx.font = '26px system-ui'; ctx.textAlign = 'left'
  ctx.fillText('40+ languages supported', 40, 175); ctx.globalAlpha = 1

  // Divider
  ctx.fillStyle = WARM; ctx.fillRect(40, 240, W - 80, 2)

  // The same dish shown in 3 languages stacked
  const entries = [
    { lang: 'EN', text: 'Slow-roasted Lamb Shoulder', sub: 'with rosemary jus' },
    { lang: 'FR', text: 'Épaule d\'agneau confite', sub: 'au jus de romarin' },
    { lang: '中文', text: '慢烤羊肩', sub: '迷迭香汁' },
  ]

  let y = 310
  for (const entry of entries) {
    // Language badge
    ctx.fillStyle = ORANGE
    ctx.beginPath()
    ctx.roundRect(40, y - 30, 72, 36, 8)
    ctx.fill()
    ctx.fillStyle = CREAM; ctx.font = 'bold 20px system-ui'; ctx.textAlign = 'center'
    ctx.fillText(entry.lang, 76, y - 6)

    // Dish name
    ctx.fillStyle = BROWN; ctx.font = 'bold 28px system-ui'; ctx.textAlign = 'left'
    ctx.fillText(entry.text, 130, y - 4)

    // Sub
    ctx.fillStyle = SOFT; ctx.font = '22px system-ui'
    ctx.fillText(entry.sub, 130, y + 26)

    // Separator
    y += 88
    if (y < 560) {
      ctx.fillStyle = WARM; ctx.fillRect(40, y - 20, W - 80, 1)
    }
  }

  // Tagline
  ctx.fillStyle = TERRA; ctx.font = 'italic 24px system-ui'; ctx.textAlign = 'center'
  ctx.fillText('Every guest feels at home', W / 2, 860)
  return toTexture(c)
}

export function drawQrSteps(): THREE.CanvasTexture {
  const { c, ctx } = base()
  // Header
  ctx.fillStyle = BROWN; ctx.fillRect(0, 0, W, 220)
  ctx.fillStyle = CREAM; ctx.font = 'bold 44px system-ui'; ctx.textAlign = 'center'
  ctx.fillText('Scan to view', W / 2, 130)
  ctx.fillStyle = CREAM; ctx.globalAlpha = 0.65; ctx.font = '24px system-ui'
  ctx.fillText('Your menu, anywhere', W / 2, 175); ctx.globalAlpha = 1

  // QR-like 8×8 block matrix centered
  const blockSize = 34
  const gap = 4
  const qrSize = 8 * blockSize + 7 * gap
  const qrX = (W - qrSize) / 2
  const qrY = 260

  // Outer border
  ctx.fillStyle = BROWN
  ctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20)
  ctx.fillStyle = CREAM
  ctx.fillRect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 12)

  // Deterministic QR-like pattern (warm colors)
  const pattern = [
    [1,1,1,0,1,0,1,1],
    [1,0,1,1,0,1,0,1],
    [1,1,1,0,1,0,1,0],
    [0,1,0,1,0,1,1,1],
    [1,0,1,0,1,0,0,1],
    [1,1,0,1,0,1,1,0],
    [0,1,1,0,1,1,0,1],
    [1,0,1,1,0,0,1,1],
  ]

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (pattern[row][col]) {
        ctx.fillStyle = BROWN
        ctx.fillRect(
          qrX + col * (blockSize + gap),
          qrY + row * (blockSize + gap),
          blockSize,
          blockSize
        )
      } else {
        ctx.fillStyle = WARM
        ctx.fillRect(
          qrX + col * (blockSize + gap),
          qrY + row * (blockSize + gap),
          blockSize,
          blockSize
        )
      }
    }
  }

  // Corner finder squares (standard QR feature)
  const finderSize = 3 * (blockSize + gap) - gap
  for (const [fx, fy] of [[qrX, qrY], [qrX + 5 * (blockSize + gap), qrY], [qrX, qrY + 5 * (blockSize + gap)]] as [number, number][]) {
    ctx.strokeStyle = ORANGE; ctx.lineWidth = 4
    ctx.strokeRect(fx - 2, fy - 2, finderSize + 4, finderSize + 4)
  }

  // Steps beneath QR
  const steps = ['1  Scan', '2  Browse', '3  Order']
  let sx = 40
  const stepY = qrY + qrSize + 60
  for (const step of steps) {
    ctx.fillStyle = ORANGE
    const sw = (W - 80 - 32) / 3
    ctx.beginPath()
    ctx.roundRect(sx, stepY, sw, 64, 12)
    ctx.fill()
    ctx.fillStyle = CREAM; ctx.font = 'bold 24px system-ui'; ctx.textAlign = 'center'
    ctx.fillText(step, sx + sw / 2, stepY + 38)
    sx += sw + 16
  }

  // Footer text
  ctx.fillStyle = SOFT; ctx.font = '22px system-ui'; ctx.textAlign = 'center'
  ctx.fillText('No app needed — works in any browser', W / 2, 960)
  return toTexture(c)
}

export function drawReview(): THREE.CanvasTexture {
  const { c, ctx } = base()
  // Header gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 300)
  grad.addColorStop(0, WARM)
  grad.addColorStop(1, CREAM)
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H)

  // 5 star row
  const starY = 200
  const starSize = 64
  const starGap = 16
  const starsTotal = 5 * starSize + 4 * starGap
  let sx = (W - starsTotal) / 2
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = ORANGE
    ctx.font = `${starSize}px system-ui`
    ctx.textAlign = 'left'
    ctx.fillText('★', sx, starY + starSize * 0.85)
    sx += starSize + starGap
  }

  // Quote
  ctx.fillStyle = BROWN; ctx.font = 'italic 28px system-ui'; ctx.textAlign = 'center'
  const quote = '"eMenu transformed our restaurant. Guests love it, staff love it."'
  // Word-wrap the quote
  const maxW = W - 80
  const words = quote.split(' ')
  let line = ''
  let qy = 360
  for (const word of words) {
    const test = line ? line + ' ' + word : word
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, W / 2, qy)
      line = word
      qy += 38
    } else {
      line = test
    }
  }
  if (line) { ctx.fillText(line, W / 2, qy); qy += 38 }

  // Reviewer info
  qy += 40
  ctx.fillStyle = TERRA; ctx.font = 'bold 26px system-ui'; ctx.textAlign = 'center'
  ctx.fillText('— Maria Kowalczyk, Bistro Soleil', W / 2, qy)

  // Rating pill
  qy += 80
  ctx.fillStyle = ORANGE + '22'
  ctx.beginPath()
  const ratingText = '★ 4.9 / 320 reviews'
  ctx.font = 'bold 26px system-ui'
  const rW = ctx.measureText(ratingText).width + 48
  ctx.roundRect(W / 2 - rW / 2, qy - 30, rW, 48, 24)
  ctx.fill()
  ctx.fillStyle = SOFT; ctx.textAlign = 'center'
  ctx.fillText(ratingText, W / 2, qy + 5)

  // Bottom tagline
  ctx.fillStyle = TERRA; ctx.font = 'italic 24px system-ui'
  ctx.fillText('Join 2,400+ happy restaurants', W / 2, 900)

  return toTexture(c)
}

export function buildAllScreens(): Record<ScreenKey, THREE.CanvasTexture> {
  return {
    menu: drawMenu(),
    priceSync: drawPriceSync(),
    allergen: drawAllergen(),
    multilang: drawMultilang(),
    qrSteps: drawQrSteps(),
    review: drawReview(),
  }
}
