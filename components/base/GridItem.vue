<script setup lang="ts">
import useMuuri from '~/composables/muuri'

type GridItemSize = 'sm' | 'md' | undefined
const props = defineProps<{
  size?: GridItemSize
  unscalable?: boolean
}>()

const getSizeClass = (size: GridItemSize) => {
  switch (size) {
    case 'sm':
      return 'w-40'
    default:
    case 'md':
      return 'w-80'
  }
}

const { itemPositionHandler } = useMuuri('#grid_container')
const sizeClass = getSizeClass(props.size)
const isScale = ref(false)
const clickHandler = (event: MouseEvent) => {
  if (props.unscalable) return
  isScale.value = !isScale.value
  itemPositionHandler(event)
}
</script>
<template>
  <section :class="['absolute', sizeClass]" @click="clickHandler">
    <slot v-bind="{ isScale }" />
  </section>
</template>
