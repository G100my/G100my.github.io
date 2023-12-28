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
import { MY_INFO } from '~/constants'

async function init() {
  const canvas = document.getElementById('canvas')!
  const scene = new Scene()
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  // scene.background = new Color(Color.NAMES.grey) // testing bg
  const renderer = new WebGLRenderer({ antialias: true, canvas, alpha: true })
  renderer.setSize(w, h)
  const gltfLoader = new GLTFLoader()

  {
    // camera
    const fov = 75
    const aspect = 1
    const near = 17
    const far = 30
    var camera = new PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 22)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  {
    // light
    const skyColor = Color.NAMES.whitesmoke
    const groundColor = Color.NAMES.darkblue
    const intensity = 5
    const light = new HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }
  let directionalLight: DirectionalLight
  {
    // directional Light
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
  function resizeRendererToDisplaySize(renderer: WebGLRenderer) {
    const canvas = renderer.domElement
    const needResize = canvas.width !== w || canvas.height !== h
    if (needResize) {
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
  }
  function render(time: number) {
    time *= 0.0001
    card.rotation.y = radius * Math.cos(angle) * 0.008
    card.rotation.x = radius * Math.sin(angle) * 0.008

    directionalLight.position.x = radius * Math.cos(angle)
    directionalLight.position.y = radius * Math.sin(angle)

    angle += 0.01

    renderer.render(scene, camera)
    requestAnimationFrame(render)
    resizeRendererToDisplaySize(renderer)
  }
}
onMounted(() => {
  init()
})

const { t } = useI18n()
const top = [
  t('me.title', '', { locale: 'en' }),
  t('me.company_of_employment', '', { locale: 'en' }),
  t(
    'about.based_in',
    { location: t('me.location', '', { locale: 'en' }) },
    { locale: 'en' },
  ),
]
</script>
<template>
  <div class="h-full space-y-10">
    <h1
      class="relative -z-10 -mx-10 space-y-3 bg-seagull-900 py-4 text-center text-5xl"
    >
      <p>Web Developer</p>
      <p>[ {{ MY_INFO.name }} ]</p>
    </h1>
    <canvas id="canvas" class="bg-transparent aspect-square w-[310px]" />
    <section class="p-6">
      <ul class="space-y-1 text-base">
        <li v-for="i in top" class="flex">
          <IconWrapped name="loader-5-line" class="rotate-180" />
          <span class="whitespace-nowrap">{{ i }}</span>
        </li>
      </ul>
      <ContactBlock class="mt-4" />
    </section>
  </div>
</template>
