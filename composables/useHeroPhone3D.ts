import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

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

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (renderer && scene && camera) renderer.render(scene, camera)
    }
    loop()
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
    canvasEl = null
  }

  return { init, resize, dispose }
}
