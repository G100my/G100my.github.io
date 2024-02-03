<script setup lang="ts">
import Anime from 'animejs'
import { createMoveAnime } from '~/utils'

defineOptions({
  inheritAttrs: false,
})

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
  } else {
    moveAnime = createMoveAnime(container.value!, props.col)
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
      'absolute',
      'outline outline-seagull-950',
      { 'cursor-pointer': !unscalable },
      '-translate-x-[1000px] transition-transform',
    ]"
    @click="clickHandler"
    @mousedown="isDragging = false"
    @mousemove="isDragging = true"
  >
    <div
      data-name="grid_item_content"
      ref="container"
      class="overflow-auto border-0 border-seagull-300 no-scrollbar"
      v-bind="$attrs"
    >
      <slot v-bind="{ isScale }" />
    </div>
  </section>
</template>
