<script setup lang="ts">
import Anime from 'animejs'
import { createMoveAnime } from '~/utils'

defineOptions({
  inheritAttrs: false,
})

type GridItemSize = 'sm' | 'md' | undefined
const props = defineProps<{
  size?: GridItemSize
  unscalable?: boolean
}>()

let moveAnime: Anime.AnimeInstance
let bgAnime: Anime.AnimeInstance
const container = ref<HTMLElement>()

const isScale = ref(false)

let isDragging = false
const clickHandler = (event: MouseEvent) => {
  if (Anime.running.length) return
  if (props.unscalable || isDragging) return

  if (!bgAnime) bgAnime = createColorAnime(container.value!)

  if (isScale.value) {
    isScale.value = !isScale.value
    moveAnime.finished.then(() => {
      container.value?.setAttribute('style', '')
    })
  } else {
    moveAnime = createMoveAnime(container.value!)
    moveAnime.finished.then(() => {
      isScale.value = !isScale.value
    })
  }
  moveAnime.play()
  bgAnime.play()
}
</script>
<template>
  <section
    :class="[
      'g:-translate-x-[600px] g:w-auto absolute w-full -translate-x-full outline outline-seagull-950 transition-transform',
      { 'cursor-pointer': !unscalable },
    ]"
    @click="clickHandler"
    @mousedown="isDragging = false"
    @mousemove="isDragging = true"
  >
    <div
      data-name="grid_item_content"
      ref="container"
      class="h-full w-full overflow-auto border-0 border-seagull-300 no-scrollbar"
      v-bind="$attrs"
    >
      <slot v-bind="{ isScale }" />
    </div>
  </section>
</template>
