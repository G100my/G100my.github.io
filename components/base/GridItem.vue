<script setup lang="ts">
import Anime from 'animejs'

type GridItemSize = 'sm' | 'md' | undefined
const props = defineProps<{
  size?: GridItemSize
  unscalable?: boolean
}>()

let anime: Anime.AnimeInstance
const container = ref<HTMLElement>()

const getSizeClass = (size: GridItemSize) => {
  switch (size) {
    case 'sm':
      return 'w-40'
    default:
    case 'md':
      return 'w-1/3'
  }
}

const sizeClass = getSizeClass(props.size)
const isScale = ref(false)
const clickHandler = (event: MouseEvent) => {
  if (props.unscalable) return
  isScale.value = !isScale.value
  anime.play()
}

function createAnime(node: HTMLElement): Anime.AnimeInstance {
  const margin = Anime.get(node, 'margin')
  const { left, width, height, top } = node.getBoundingClientRect()
  const translateX = Anime.get(node, 'translateX')
  const translateY = Anime.get(node, 'translateY')

  const vw = window.innerWidth
  const vh = window.innerHeight

  const anime = Anime({
    autoplay: false,
    loop: false,
    duration: 200,
    zIndex: 0,
    targets: node,
    margin: [margin, 0],
    width: [width, vw],
    height: [height, vh],
    position: 'fixed',
    loopComplete: (anime) => {
      anime.reverse()
    },
    translateX: [translateX, -left],
    translateY: [translateY, -top],
  })

  return anime
}

const signal = inject<Ref<boolean>>('createAnime')
const unwatch = watch(
  () => signal?.value,
  (v) => {
    if (!v) return
    anime = createAnime(container.value!)
    unwatch()
  },
)
</script>
<template>
  <section
    :class="[
      'absolute',
      sizeClass,
      // { 'flex items-center justify-center bg-black/30': isScale },
    ]"
    @click="clickHandler"
  >
    <div
      ref="container"
      class="border p-4"
      :class="[
        'bg-blue-700',
        {
          // sizeClass: !isScale
        },
      ]"
    >
      <slot v-bind="{ isScale }" />
    </div>
  </section>
</template>
