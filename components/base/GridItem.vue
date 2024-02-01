<script setup lang="ts">
import Anime from 'animejs'

type GridItemSize = 'sm' | 'md' | undefined
const props = withDefaults(
  defineProps<{
    size?: GridItemSize
    unscalable?: boolean
    col: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  }>(),
  {
    col: 10,
  },
)

let anime: Anime.AnimeInstance
const container = ref<HTMLElement>()

const isScale = ref(false)

let isDragging = false
const clickHandler = (event: MouseEvent) => {
  if (Anime.running.length) return
  if (props.unscalable || isDragging) return

  if (isScale.value) {
    isScale.value = !isScale.value
  } else {
    anime = createAnime(container.value!)
    anime.finished.then(() => {
      isScale.value = !isScale.value
    })
  }
  anime.play()
}

const colSteps = 12
function createAnime(node: HTMLElement): Anime.AnimeInstance {
  const margin = Anime.get(node, 'margin')
  const { left, width, height, top } = node.getBoundingClientRect()
  const translateXfrom = Anime.get(node, 'translateX')
  const translateYfrom = Anime.get(node, 'translateY')

  const scaledW = (window.innerWidth * props.col) / colSteps
  const scaledH = (window.innerHeight * props.col) / colSteps

  const translateYto =
    (window.innerHeight * (colSteps - props.col)) / colSteps / 2 - top
  const translateXto =
    (window.innerWidth * (colSteps - props.col)) / colSteps / 2 - left

  const anime = Anime.timeline({
    autoplay: false,
    loop: false,
    duration: 100,
    easing: 'linear',
    zIndex: 10,
    loopComplete: (anime) => {
      anime.reverse()
    },
  })
    .add({
      targets: '#mask',
      backdropFilter: 'blur(10px)',
      height: '100vh',
    })
    .add({
      targets: node.parentNode,
      zIndex: 10,
    })
    .add({
      targets: node,
      backgroundColor: '#fff',
      translateX: [translateXfrom, translateXto],
    })
    .add({
      targets: node,
      translateY: [translateYfrom, translateYto],
    })
    .add({
      targets: node,
      width: [width, scaledW],
    })
    .add({
      targets: node,
      height: [height, scaledH],
    })
    .add({
      targets: node,
      margin: [margin, 0],
      borderWidth: 16,
    })

  return anime
}
</script>
<template>
  <section
    :class="['absolute w-2/6', 'border border-lochmara-600']"
    @click="clickHandler"
    @mousedown="isDragging = false"
    @mousemove="isDragging = true"
  >
    <div
      data-name="grid_item_content"
      ref="container"
      class="flex flex-col items-center justify-center border-0 border-seagull-300"
    >
      <slot v-bind="{ isScale }" />
    </div>
  </section>
</template>
