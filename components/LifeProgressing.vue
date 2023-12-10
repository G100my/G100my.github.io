<script setup lang="ts">
import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3DEventMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
// @ts-ignore
import WebGL from 'three/addons/capabilities/WebGL'

const now = new Date()
const y = now.getFullYear()
const m = now.getMonth()
const nowIndex = (y - 1991) * 12 + (m - 0)

// 70 * 12 = 28 * 30 = 21 * 40 = 840
const LIFE_CUBE_COLS = 21
const LIFE_CUBE_ROWS = 40
const CONTAINER_BG_COLOR = '#020617' // bg-slate-950
const CUBE_COLOR = '#172554' // bg-blue-950

let container: HTMLElement

function doStaticDom() {
  container.classList.add('life_progressing_container')
  container.append(
    ...Array(LIFE_CUBE_COLS * LIFE_CUBE_ROWS)
      .fill(null)
      .map(() => {
        const e = document.createElement('div')
        e.classList.add('life_progressing_item')
        return e
      }),
  )

  const currentMonth = container.children.item(nowIndex) as HTMLDivElement
  currentMonth.classList.add('current')
}
function doThree() {
  if (!container) {
    console.error('Container not found!')
    return
  }

  const CUBE_SIZE = 2
  const FOV = 90

  const w = container.offsetWidth
  const h = container.offsetHeight
  const ASPECT = w / h
  const GAP_COL = 2
  const totalW = LIFE_CUBE_COLS * (GAP_COL + CUBE_SIZE) - GAP_COL
  const GAP_ROW =
    (totalW / ASPECT - CUBE_SIZE * LIFE_CUBE_ROWS) / (LIFE_CUBE_ROWS - 1)
  const totalH = LIFE_CUBE_ROWS * (GAP_ROW + CUBE_SIZE) - GAP_ROW
  const Z = (totalH / 2) * 1.05

  const scene = new Scene()
  scene.background = new Color(CONTAINER_BG_COLOR)
  const camera = new PerspectiveCamera(FOV, ASPECT, 1, 1000)
  camera.position.z = Z
  camera.position.x = ((LIFE_CUBE_COLS - 1) * (CUBE_SIZE + GAP_COL)) / 2
  camera.position.y = -((LIFE_CUBE_ROWS - 1) * (CUBE_SIZE + GAP_ROW)) / 2

  const cubes: Mesh<
    BoxGeometry,
    MeshBasicMaterial | MeshStandardMaterial,
    Object3DEventMap
  >[] = []
  let intensity = 0.05

  const renderer = new WebGLRenderer()
  renderer.setSize(w, h)
  container.appendChild(renderer.domElement)

  let currentCube: Mesh<BoxGeometry, MeshStandardMaterial, Object3DEventMap>

  for (let c = 0; c < LIFE_CUBE_COLS; c++) {
    for (let r = 0; r < LIFE_CUBE_ROWS; r++) {
      const geometry = new BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE)
      const isCurrent = r * LIFE_CUBE_COLS + c === nowIndex
      const material = isCurrent
        ? new MeshStandardMaterial({
            color: CUBE_COLOR,
            emissive: 'white',
            emissiveIntensity: intensity,
          })
        : new MeshBasicMaterial({ color: CUBE_COLOR })
      let cube = new Mesh(geometry, material)
      if (isCurrent)
        currentCube = cube as Mesh<
          BoxGeometry,
          MeshStandardMaterial,
          Object3DEventMap
        >

      cube.position.x = c * (CUBE_SIZE + GAP_COL)
      cube.position.y = -r * (CUBE_SIZE + GAP_ROW)
      cube.position.z = -CUBE_SIZE / 2

      scene.add(cube)
      cubes.push(cube)
    }
  }

  const breatheSpeed = 0.002
  const breatheMax = 0.8
  const breatheMin = 0.05
  let breatheDirection = 1

  function animate() {
    const time = Date.now() * 0.001
    const frequencyOffset = 0.1
    const amplitudeOffset = 1

    for (let cube of cubes) {
      const distanceFromTopLeft = Math.sqrt(
        cube.position.x ** 2 + cube.position.y ** 2,
      )

      cube.position.z =
        Math.sin(distanceFromTopLeft * frequencyOffset + time) * amplitudeOffset
      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.01
    }
    if (currentCube) {
      if (intensity > breatheMax || intensity < breatheMin) {
        breatheDirection = -breatheDirection
      }
      intensity += breatheSpeed * breatheDirection
      currentCube.material.emissiveIntensity = intensity
    }

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()
}

function showWarning() {
  const warning = WebGL.getWebGLErrorMessage() as HTMLElement
  warning.style.position = 'fixed'
  warning.style.bottom = '0'
  document.body.appendChild(warning)
  setTimeout(() => {
    document.body.removeChild(warning)
  }, 4000)
}

const isSupport = WebGL.isWebGLAvailable()
onMounted(() => {
  container = document.getElementById('life_progressing')!
  if (isSupport) {
    doThree()
  } else {
    doStaticDom()
    showWarning()
  }
})
</script>
<template>
  <section>
    <div id="life_progressing" class="h-full w-full" />
  </section>
</template>
<style>
#life_progressing {
  --lightColor: white;
}
.life_progressing_container {
  grid-template-columns: repeat(v-bind(LIFE_CUBE_COLS), 1fr);
  grid-template-rows: repeat(v-bind('LIFE_CUBE_ROWS'), 1fr);
  @apply grid h-screen w-full items-center justify-items-center gap-0.5 bg-slate-950 p-3;
}
.life_progressing_item {
  @apply h-3 w-3 rounded-sm  bg-blue-950 sm:h-4 sm:w-4;
}
.life_progressing_item.current {
  @apply bg-white/50;
  animation: breathing_light 2s infinite alternate;
}

@keyframes breathing_light {
  from {
    box-shadow: 0 0 2px var(--lightColor);
    transform: scale(1);
  }
  to {
    box-shadow: 0 0 20px var(--lightColor);
    transform: scale(1.05);
  }
}
</style>
