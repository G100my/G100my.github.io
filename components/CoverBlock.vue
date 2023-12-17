<script setup lang="ts">
// can not import from alias ??
import {
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  Object3DEventMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

async function init() {
  const canvas = document.getElementById('canvas')!
  const scene = new Scene()
  const renderer = new WebGLRenderer({ antialias: true, canvas, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  const gltfLoader = new GLTFLoader()
  {
    const fov = 75
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.1
    const far = 1000
    var camera = new PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 50)
  }
  {
    const skyColor = Color.NAMES.whitesmoke
    const groundColor = Color.NAMES.darkblue
    const intensity = 5
    const light = new HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }
  let directionalLight: DirectionalLight
  {
    const color = Color.NAMES.lightskyblue
    const intensity = 0.8
    directionalLight = new DirectionalLight(color, intensity)
    directionalLight.position.z = 10
    scene.add(directionalLight)
    scene.add(directionalLight.target)
  }
  // {
  //   const controls = new OrbitControls(camera, canvas)
  //   controls.target.set(0, 5, 0)
  //   controls.update()
  // }
  const url = '/card_me_rounded.gltf'
  let card: Group<Object3DEventMap>
  gltfLoader.load(url, (gltf) => {
    card = gltf.scene
    scene.add(card)
    requestAnimationFrame(render)
  })

  let angle = 0
  const radius = 5
  function render(time: number) {
    time *= 0.001
    card.rotation.y = Math.sin(time) * 0.05
    card.rotation.x = Math.sin(time) * 0.05

    directionalLight.position.x = radius * Math.cos(angle)
    directionalLight.position.y = radius * Math.sin(angle)

    angle += 0.01

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
}
onMounted(() => {
  init()
})
</script>
<template>
  <section>
    <div class="fixed h-screen w-screen">
      <canvas id="canvas" class="bg-transparent" />
    </div>
    <h2 class="-mx-10 bg-blue-900/50 px-10 py-4 text-5xl">WEB DEVELOPER</h2>
  </section>
</template>
