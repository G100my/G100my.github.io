<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const props = withDefaults(
  defineProps<{
    article: string
    initShow?: boolean
  }>(),
  {
    initShow: undefined,
  },
)

let isShow = ref(props.initShow ?? useDevice().isDesktop)
let maxHeight: number
let containerDiv: HTMLDivElement | null = null

function onClick(event: MouseEvent) {
  isShow.value = !isShow.value
  const button = event.currentTarget as HTMLDivElement
  if (!containerDiv) {
    containerDiv = button.parentNode!.querySelector(`[data-collapse]`)!
    maxHeight = containerDiv.scrollHeight
  }
}
</script>
<template>
  <div class="group" :open="isShow ? true : undefined">
    <ContentQuery
      :path="article"
      :locale="$i18n.locale"
      v-slot="{ data }"
      find="one"
    >
      <button
        type="button"
        :class="[
          'text-1xl flex w-full rounded-md py-2 pl-1 pr-3',
          'bg-gradient-to-b from-sundown-50 via-seagull-400 via-80% to-seagull-700',
          'border-2 border-seagull-900',
          'lg:border-none lg:bg-gray-50/40 lg:bg-none lg:px-3 lg:text-2xl lg:backdrop-blur-lg',
        ]"
        @click="onClick"
      >
        <IconWrapped
          name="loader-5-line"
          class="rotate-180 transition-transform group-open:rotate-[0.75turn]"
        />
        <span class="h-8 flex-1 text-center">{{
          (data as ParsedContent).title
        }}</span>
        <IconWrapped
          name="loader-5-line"
          class="rotate-90 transition-transform group-open:rotate-[0turn]"
        />
      </button>
      <div
        class="overflow-hidden bg-gray-50/40 px-4 backdrop-blur-lg transition-[max-height]"
        data-collapse
        :style="`max-height: ${isShow ? maxHeight : 0}px;`"
      >
        <ContentRenderer :value="data" class="markdown" />
      </div>
    </ContentQuery>
  </div>
</template>
