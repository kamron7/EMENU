import * as THREE from 'three'
import { gsap } from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
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
  setScreen(key: ScreenKey): void
  /** @deprecated Task 4 will remove this alias — use setScreen */
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
  let dracoLoader: DRACOLoader | null = null
  const disposables: Array<() => void> = []

  // Screen mesh material + cached textures
  let screenMat: THREE.MeshStandardMaterial | null = null
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
      // Wire DRACOLoader so Draco-compressed meshes decode correctly
      dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      loader.setDRACOLoader(dracoLoader)

      const gltf = await loader.loadAsync('/models/phone.glb')
      const root = gltf.scene

      // normalize: center + scale to ~2 units tall
      const box = new THREE.Box3().setFromObject(root)
      const size = new THREE.Vector3()
      box.getSize(size)
      const center = new THREE.Vector3()
      box.getCenter(center)
      root.position.sub(center)
      const s = 2 / (size.y || 1)

      const modelGroup = new THREE.Group()
      modelGroup.add(root)
      modelGroup.scale.setScalar(s)
      // This GLB's screen faces -z by default; flip so the screen (and the menu
      // overlay parented to it) faces the camera at the neutral pose.
      modelGroup.rotation.y = Math.PI

      // Outer container: what gets returned as `phone`. The render loop writes
      // basePose to this group; the inner modelGroup keeps the GLB's orientation.
      const container = new THREE.Group()
      container.add(modelGroup)
      container.userData.isRealModel = true
      return container
    } catch (err) {
      console.warn('[eMenu] loadPhone failed, using procedural fallback:', err)
      return buildProceduralPhone()
    }
  }

  // Find the device's screen mesh: the emissive-textured mesh with the largest
  // flat area. Real phone GLBs light their screen with an emissive wallpaper.
  function findScreenMesh(rootObj: THREE.Object3D): THREE.Mesh | null {
    let best: THREE.Mesh | null = null
    let bestArea = 0
    rootObj.traverse((o) => {
      const m = o as THREE.Mesh
      if (!m.isMesh) return
      const mat = m.material as THREE.MeshStandardMaterial
      if (!mat || !mat.emissiveMap) return
      m.geometry.computeBoundingBox()
      const bb = m.geometry.boundingBox!
      const dims = [bb.max.x - bb.min.x, bb.max.y - bb.min.y, bb.max.z - bb.min.z].sort((a, b) => b - a)
      const area = dims[0] * dims[1] // product of the two largest extents
      if (area > bestArea) { bestArea = area; best = m }
    })
    return best
  }

  function bindScreen(phoneGroup: THREE.Group): void {
    screens = buildAllScreens()
    disposables.push(() => {
      if (screens) {
        for (const k of Object.keys(screens) as ScreenKey[]) screens[k].dispose()
        screens = null
      }
    })

    const mesh = (phoneGroup.getObjectByName('screen') as THREE.Mesh | undefined) ?? findScreenMesh(phoneGroup)
    if (!mesh) return

    // The menu textures use the screen mesh's own UVs, which already read
    // correctly with the 180° model flip — no horizontal mirror needed.
    const mat = mesh.material as THREE.MeshStandardMaterial
    screenMat = mat
    mat.map = screens.menu
    mat.emissive = new THREE.Color(0xffffff)
    mat.emissiveMap = screens.menu
    mat.emissiveIntensity = 1.0
    mat.needsUpdate = true
  }

  function setScreen(key: ScreenKey): void {
    if (!screenMat || !screens || key === currentKey) return
    screenMat.map = screens[key]
    screenMat.emissiveMap = screens[key]
    screenMat.needsUpdate = true
    currentKey = key
  }

  // The canvas is fixed at 100vw×100vh; clientWidth can read 0 before layout
  // settles, which leaves the renderer at Three's 300×150 default. Fall back to
  // the window dimensions so the framebuffer + camera aspect are always correct.
  function viewportSize(): { w: number; h: number } {
    const w = canvasEl?.clientWidth || window.innerWidth
    const h = canvasEl?.clientHeight || window.innerHeight
    return { w, h }
  }

  async function init(canvas: HTMLCanvasElement): Promise<void> {
    canvasEl = canvas
    const { w, h } = viewportSize()
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h, false)
    // Enable physically correct lighting for PBR materials
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100)
    camera.position.set(0, 0, 6)

    // Backup to the ResizeObserver in index.vue: window resize always re-syncs.
    const onWinResize = () => resize()
    window.addEventListener('resize', onWinResize)
    disposables.push(() => window.removeEventListener('resize', onWinResize))

    // warm 3-point lighting
    const key = new THREE.DirectionalLight(0xfff0d8, 3.5)
    key.position.set(3, 4, 5)
    const fill = new THREE.DirectionalLight(0xffd9a8, 1.5)
    fill.position.set(-4, 0, 2)
    const rim = new THREE.DirectionalLight(0xffffff, 1.8)
    rim.position.set(0, 2, -5)
    const amb = new THREE.AmbientLight(0xfff3e2, 2.0)
    scene.add(key, fill, rim, amb)

    // Build a warm procedural environment map so metallic surfaces
    // show specular reflections (required for metalness:1 materials to be visible).
    try {
      const pmrem = new THREE.PMREMGenerator(renderer)
      pmrem.compileEquirectangularShader()
      const envTexture = pmrem.fromScene(new THREE.RoomEnvironment()).texture
      scene.environment = envTexture
      pmrem.dispose()
      disposables.push(() => envTexture.dispose())
    } catch (pmremErr) {
      // PMREMGenerator failed (e.g. context not ready) — continue without env map
      console.warn('[eMenu] PMREMGenerator failed, continuing without env map:', pmremErr)
    }

    phone = await loadPhone()
    scene.add(phone)

    // Bind menu textures directly to the screen mesh (in-device rendering)
    bindScreen(phone)

    // Set initial hero pose immediately so phone starts parked on the right
    // (no visible jump from center to right on first paint).
    setPose({ x: 1.7, y: 0, rotX: 0, rotY: 0, scale: 1.0 })

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
    const { w, h } = viewportSize()
    if (w === 0 || h === 0) return
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
    dracoLoader?.dispose()
    renderer = null
    scene = null
    camera = null
    phone = null
    screenMat = null
    dracoLoader = null
    canvasEl = null
  }

  // Temporary alias for Task 4 callers in index.vue — Task 4 will replace these
  // call-sites with setScreen() and remove this alias.
  const crossfadeScreen = setScreen

  return { init, resize, dispose, setScreen, crossfadeScreen, setIdle, setPose, setRenderActive }
}
