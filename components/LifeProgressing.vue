<script setup lang="ts">
import {
  BoxGeometry,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Object3DEventMap,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  WebGLUtils,
} from 'three'
// @ts-ignore
import WebGL from 'three/addons/capabilities/WebGL'

// 70 * 12 = 28 * 30 = 21 * 40 = 840
const LIFE_CUBE_COLS = 21
const LIFE_CUBE_ROWS = 40

let container: HTMLElement

function doStaticDom() {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const nowIndex = (y - 1991) * 12 + (m - 0)
  const containerClasses =
    `grid h-screen w-full grid-cols-[repeat(${LIFE_CUBE_COLS},1fr)] grid-rows-[repeat(${LIFE_CUBE_ROWS},1fr)] items-center justify-items-center gap-0.5 p-3`.split(
      ' ',
    )
  const itemsClasses =
    `h-3 w-3 rounded-[1px] border border-neutral-900 bg-blue-950/40 sm:h-4 sm:w-4`.split(
      ' ',
    )

  container.classList.add(...containerClasses)
  container.append(
    ...Array(LIFE_CUBE_COLS * LIFE_CUBE_ROWS)
      .fill(null)
      .map(() => {
        const e = document.createElement('div')
        e.classList.add(...itemsClasses)
        return e
      }),
  )

  const target = container.children.item(nowIndex) as HTMLDivElement
  target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
}
function doThree() {
  if (!container) {
    console.error('Container not found!')
    return
  }

  const CUBE_COLS = 21
  const CUBE_ROWS = 40
  const CUBE_SIZE = 2
  const FOV = 90

  const w = container.offsetWidth
  const h = container.offsetHeight
  const ASPECT = w / h
  const GAP_COL = 2
  const totalW = CUBE_COLS * (GAP_COL + CUBE_SIZE) - GAP_COL
  const GAP_ROW = (totalW / ASPECT - CUBE_SIZE * CUBE_ROWS) / (CUBE_ROWS - 1)
  const totalH = CUBE_ROWS * (GAP_ROW + CUBE_SIZE) - GAP_ROW
  const Z = (totalH / 2) * 1.05

  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, ASPECT, 1, 1000)
  camera.position.z = Z
  camera.position.x = ((CUBE_COLS - 1) * (CUBE_SIZE + GAP_COL)) / 2
  camera.position.y = ((CUBE_ROWS - 1) * (CUBE_SIZE + GAP_ROW)) / 2

  const cubes: Group<Object3DEventMap>[] = []

  const renderer = new WebGLRenderer()
  renderer.setSize(w, h)
  container.appendChild(renderer.domElement)

  // const lineMaterial = new LineBasicMaterial({ color: 'gray' })

  for (let c = 0; c < CUBE_COLS; c++) {
    for (let r = 0; r < CUBE_ROWS; r++) {
      const geometry = new BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE)
      const material = new MeshBasicMaterial({
        color: '#162555',
      })
      let cube = new Mesh(geometry, material)

      let edges = new EdgesGeometry(geometry)
      // let line = new LineSegments(edges, lineMaterial)

      let group = new Group()
      group.add(cube)
      // group.add(line)

      group.position.x = c * (CUBE_SIZE + GAP_COL)
      group.position.y = r * (CUBE_SIZE + GAP_ROW)
      group.position.z = -CUBE_SIZE / 2

      scene.add(group)
      cubes.push(group)
    }
  }

  function animate() {
    const time = Date.now() * 0.001
    const frequencyOffset = 0.08
    const amplitudeOffset = 1.2

    for (let cube of cubes) {
      const distanceFromTopLeft = Math.sqrt(
        cube.position.x ** 2 + cube.position.y ** 2,
      )

      cube.position.z =
        Math.sin(distanceFromTopLeft * frequencyOffset + time) * amplitudeOffset
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
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
  container = document.getElementById('date_container')!
  if (isSupport) {
    doThree()
  } else {
    doStaticDom()
    showWarning()
  }
})
</script>
<template>
  <div id="date_container" class="m h-screen w-screen bg-blue-950/40" />
  <!-- <div
    id="date_container"
    class="grid h-screen w-full grid-cols-[repeat(21,1fr)] grid-rows-[repeat(40,1fr)] items-center justify-items-center gap-0.5 p-3"
  >
    <div
      v-for="i in 840"
      class="h-3 w-3 rounded-[1px] border border-neutral-900 bg-blue-950/40 sm:h-4 sm:w-4"
    />
  </div> -->
</template>
