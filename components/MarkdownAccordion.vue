<script setup lang="ts">
const props = defineProps<{
  article: string
  initShow?: boolean
}>()

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

const content = await queryContent(props.article).findOne()
onMounted(() => {
  console.log('!!')
  console.log(getCurrentInstance()?.refs)
})
</script>
<template>
  <div class="group" :open="isShow">
    <button
      type="button"
      :class="[
        'text-1xl flex w-full rounded-md py-2 pl-1 pr-3',
        'bg-gradient-to-b from-sundown-50 via-seagull-400 via-80% to-seagull-700',
        'border-2 border-seagull-900',
        'lg:border-none lg:bg-gray-50/40 lg:bg-none lg:px-3 lg:text-3xl lg:backdrop-blur-lg',
      ]"
      @click="onClick"
    >
      <IconWrapped
        name="loader-5-line"
        class="rotate-180 transition-transform group-open:rotate-[0.75turn]"
      />
    </button>
    <div
      class="overflow-hidden bg-gray-50/40 backdrop-blur-lg transition-[max-height]"
      data-collapse
      :style="`max-height: ${isShow ? maxHeight : 0}px;`"
    >
      <slot>
        <ContentQuery
          path="about"
          :locale="$i18n.locale"
          v-slot="{ data }"
          find="one"
        >
          <ContentRenderer :value="data" class="markdown" />
        </ContentQuery>
      </slot>
    </div>
  </div>
</template>
