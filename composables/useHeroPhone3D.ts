import * as THREE from 'three'
import { gsap } from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { buildAllScreens } from './phoneScreens'
import type { ScreenKey } from './phoneScreens'

export interface PhonePose {
  x: number
  y: number
  rotX: number
  rotY: number
  scale: number
}

export interface HeroPhone3D {
  init(canvas: HTMLCanvasElement): Promise<void>
  resize(): void
  dispose(): void
  crossfadeScreen(key: ScreenKey): void
  setIdle(enabled: boolean): void
  setPose(p: PhonePose): void
  setRenderActive(active: boolean): void
}

export function createHeroPhone3D(): HeroPhone3D {
  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let phone: THREE.Group | null = null
  let raf = 0
  let canvasEl: HTMLCanvasElement | null = null
  const disposables: Array<() => void> = []

  // Screen planes
  let screenA: THREE.Mesh | null = null
  let screenB: THREE.Mesh | null = null
  let screens: ReturnType<typeof buildAllScreens> | null = null
  let currentKey: ScreenKey = 'menu'

  // Idle float state
  let idle = false
  let idleT = 0

  // Base pose (set by setPose; idle adds a small offset on top in the loop)
  let basePose: PhonePose = { x: 0, y: 0, rotX: 0, rotY: 0, scale: 1 }
  let renderActive = true

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
      const gltf = await loader.loadAsync('/models/phone.glb') /* swap: replace public/models/phone.glb with your model */
      const root = gltf.scene
      // normalize: center + scale to ~2 units tall
      const box = new THREE.Box3().setFromObject(root)
      const size = new THREE.Vector3()
      box.getSize(size)
      const center = new THREE.Vector3()
      box.getCenter(center)
      root.position.sub(center)
      const s = 2 / (size.y || 1)
      const wrap = new THREE.Group()
      wrap.add(root)
      wrap.scale.setScalar(s)
      return wrap
    } catch {
      return buildProceduralPhone()
    }
  }

  function attachScreenPlanes(phoneGroup: THREE.Group): void {
    // Find existing screen mesh or create one
    let screenMesh = phoneGroup.getObjectByName('screen') as THREE.Mesh | undefined

    // Determine plane dimensions from the screen mesh geometry or default
    let planeW = 0.9
    let planeH = 1.92
    let planeZ = 0.062 // slightly in front of the body

    if (screenMesh) {
      // Use the screen mesh's geometry to size our planes
      const geo = screenMesh.geometry
      geo.computeBoundingBox()
      const bb = geo.boundingBox!
      planeW = bb.max.x - bb.min.x
      planeH = bb.max.y - bb.min.y
      planeZ = 0 // we'll be a child of the screen mesh, so local z = 0

      // Replace the screen mesh material with a transparent one (our planes will show the content)
      const mat = screenMesh.material as THREE.MeshBasicMaterial
      mat.transparent = true
      mat.opacity = 0
      mat.needsUpdate = true
    }

    // Build cached textures
    screens = buildAllScreens()
    // Push texture disposal to disposables
    disposables.push(() => {
      if (screens) {
        for (const key of Object.keys(screens) as ScreenKey[]) {
          screens[key].dispose()
        }
        screens = null
      }
    })

    // Screen A: opaque, shows current
    const geoA = new THREE.PlaneGeometry(planeW, planeH)
    const matA = new THREE.MeshBasicMaterial({
      map: screens.menu,
      transparent: false,
    })
    screenA = new THREE.Mesh(geoA, matA)
    screenA.renderOrder = 1

    // Screen B: transparent overlay for crossfade (slightly in front)
    const geoB = new THREE.PlaneGeometry(planeW, planeH)
    const matB = new THREE.MeshBasicMaterial({
      map: null,
      transparent: true,
      opacity: 0,
    })
    screenB = new THREE.Mesh(geoB, matB)
    screenB.renderOrder = 2
    screenB.position.z = 0.001 // keep tiny z offset as fallback

    // Push geometry/material disposal
    disposables.push(() => {
      geoA.dispose(); matA.dispose()
      geoB.dispose(); matB.dispose()
    })

    if (screenMesh) {
      // Attach as children of the screen mesh
      screenA.position.set(0, 0, 0.001)
      screenMesh.add(screenA, screenB)
    } else {
      // No screen mesh found: attach to the phone group at the right Z
      screenA.position.set(0, 0, planeZ)
      screenB.position.set(0, 0, planeZ + 0.001)
      phoneGroup.add(screenA, screenB)
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
    const key = new THREE.DirectionalLight(0xfff0d8, 2.2)
    key.position.set(3, 4, 5)
    const fill = new THREE.DirectionalLight(0xffd9a8, 0.8)
    fill.position.set(-4, 0, 2)
    const rim = new THREE.DirectionalLight(0xffffff, 1.0)
    rim.position.set(0, 2, -5)
    const amb = new THREE.AmbientLight(0xfff3e2, 0.6)
    scene.add(key, fill, rim, amb)

    phone = await loadPhone()
    scene.add(phone)

    // Attach screen planes after phone is added
    attachScreenPlanes(phone)

    let lastTime = performance.now()
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      // Apply base pose from setPose, then add idle float offset on top
      if (phone) {
        phone.position.x = basePose.x
        phone.position.y = basePose.y
        phone.rotation.x = basePose.rotX
        phone.rotation.y = basePose.rotY
        phone.scale.setScalar(basePose.scale)

        if (idle) {
          idleT += dt
          phone.position.y += Math.sin(idleT * 1.2) * 0.03
          phone.rotation.y += Math.sin(idleT * 0.7) * 0.04
        }
      }

      if (renderActive && renderer && scene && camera) renderer.render(scene, camera)
    }
    loop(performance.now())
  }

  function crossfadeScreen(key: ScreenKey): void {
    if (!screenA || !screenB || !screens || key === currentKey) return
    const matB = screenB.material as THREE.MeshBasicMaterial
    matB.map = screens[key]
    matB.needsUpdate = true
    gsap.killTweensOf(matB)
    gsap.to(matB, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        const matA = screenA!.material as THREE.MeshBasicMaterial
        matA.map = screens![key]
        matA.needsUpdate = true
        matB.opacity = 0
        matB.map = null
        matB.needsUpdate = true
      },
    })
    currentKey = key
  }

  function setPose(p: PhonePose): void {
    if (!phone) return
    basePose.x = p.x
    basePose.y = p.y
    basePose.rotX = p.rotX
    basePose.rotY = p.rotY
    basePose.scale = p.scale
  }

  function setRenderActive(active: boolean): void {
    renderActive = active
  }

  function setIdle(enabled: boolean): void {
    idle = enabled
    if (!enabled) {
      idleT = 0
    }
  }

  function resize(): void {
    if (!renderer || !camera || !canvasEl) return
    const w = canvasEl.clientWidth
    const h = canvasEl.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function dispose(): void {
    cancelAnimationFrame(raf)
    disposables.forEach((fn) => fn())
    scene?.traverse((obj) => {
      const m = obj as THREE.Mesh
      if (m.geometry) m.geometry.dispose()
      const mat = m.material as THREE.Material | THREE.Material[] | undefined
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
      else mat?.dispose()
    })
    renderer?.dispose()
    renderer?.forceContextLoss?.()
    renderer = null
    scene = null
    camera = null
    phone = null
    screenA = null
    screenB = null
    canvasEl = null
  }

  return { init, resize, dispose, crossfadeScreen, setIdle, setPose, setRenderActive }
}
