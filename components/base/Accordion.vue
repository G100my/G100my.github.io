<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    initShow?: boolean
  }>(),
  {
    initShow: false,
  },
)

const show = ref(props.initShow)
const maxHeight = ref(0)
function toggle(event: MouseEvent) {
  show.value = !show.value
}

const container = ref<HTMLDivElement>()
onMounted(() => {
  maxHeight.value = container.value!.scrollHeight
})
</script>
<template>
  <div class="group" :open="show ? true : undefined">
    <button
      type="button"
      :class="[
        'text-1xl flex w-full rounded-md py-2 pl-1 pr-3',
        'bg-gradient-to-b from-sundown-50 via-seagull-400 via-80% to-seagull-700',
        'border-2 border-seagull-900',
        'group-open:rounded-b-none',
        'lg:border-none lg:bg-gray-50/40 lg:bg-none lg:px-3 lg:text-2xl lg:backdrop-blur-lg',
      ]"
      @click="toggle"
    >
      <IconWrapped
        name="loader-5-line"
        class="rotate-180 transition-transform group-open:rotate-[0.75turn]"
      />
      <span class="h-8 flex-1 text-center">{{ title }}</span>
      <IconWrapped
        name="loader-5-line"
        class="rotate-90 transition-transform group-open:rotate-[0turn]"
      />
    </button>

    <div
      ref="container"
      class="overflow-hidden rounded-b-md bg-gray-50/40 backdrop-blur-lg transition-[max-height]"
      :style="`max-height: ${show ? maxHeight : 0}px;`"
    >
      <slot />
    </div>
  </div>
</template>
