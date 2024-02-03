<script setup lang="ts">
import type Grid from 'muuri'
import { MY_INFO, gridInjectionKey } from '~/constants'

const { $muuri } = useNuxtApp()
const grid = ref<Grid>()
onMounted(() => {
  grid.value = new $muuri('#grid_container', GRID_OPTIONS)
  // @ts-ignore
  window.grid = grid.value
  const items = document
    .getElementById('grid_container')!
    .querySelectorAll('section')

  nextTick(() => {
    for (let i = 0; i < items.length; i++) {
      const e = items[i]
      e.addEventListener(
        'transitionend',
        () => {
          // remove GridItem static class: '-translate-x-[1000px]'
          e.classList.remove('-translate-x-[1000px]', 'transition-transform')
        },
        { once: true },
      )
      setTimeout(() => {
        grid.value?.add(e)
      }, i * 60)
    }
  })
})
provide(gridInjectionKey, grid)

function handleRelayout() {
  // grid.value?.refreshSortData()
  grid.value?.refreshItems()
  grid.value?.layout()
}
</script>
<template>
  <!-- <img src="~/assets/bg.png" class="fixed h-screen w-screen object-cover" /> -->
  <div
    class="fixed inset-0 h-screen w-full bg-gradient-to-b from-lochmara-50/90 from-30% to-lochmara-800/80"
  />
  <div class="mx-auto h-screen max-h-screen overflow-hidden p-10">
    <main id="grid_container" :class="['relative mx-auto max-w-7xl']">
      <GridItem unscalable class="w-g4 h-g6 p-6">
        <h1 class="text-center text-5xl" @click="handleRelayout">
          <p>[ {{ MY_INFO.name }} ]</p>
        </h1>

        <div class="mx-auto w-fit rounded-full">
          <Avator />
        </div>

        <div class="_contact">
          <h2>Contacts</h2>
          <ContactNavs class="flex items-center justify-around gap-4" />
        </div>
      </GridItem>

      <GridItem v-slot="{ isScale }" class="w-g3">
        <MarkdownBlock article="about" :open="isScale" />
      </GridItem>
      <GridItem v-slot="{ isScale }" class="w-g4">
        <MarkdownBlock article="projects" :open="isScale" />
      </GridItem>
      <GridItem v-slot="{ isScale }" class="w-g5">
        <MarkdownBlock article="tech" :open="isScale">
          <TechList />
        </MarkdownBlock>
      </GridItem>

      <GridItem unscalable>
        <div class="w-g4 h-g6">
          <LifeProgressing />
        </div>
      </GridItem>

      <GridItem class="w-g4 h-g6 flex flex-col p-6" v-slot="{ isScale }">
        <h2 class="text-xl">{{ $t('todolist.title') }}</h2>
        <p v-show="isScale" class="mb-3 text-center">
          {{ $t('todolist.description') }}
        </p>
        <Todolist class="h-full no-scrollbar" :class="{ 'flex-1': !isScale }" />
      </GridItem>

      <GridItem unscalable class="w-g4 h-g4 flex flex-col">
        <h2 class="px-2 pt-6 text-lg">{{ $t('my_music.title') }}</h2>
        <iframe
          style="border-radius: 12px"
          class="my-auto opacity-80"
          src="https://open.spotify.com/embed/playlist/67qPP56zAaGoHYzbTzEyfC?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </GridItem>

      <GridItem v-for="i in 50" unscalable>
        <div class="w-g1 h-g1"></div>
      </GridItem>

      <GridItem unscalable>
        <LangSwitch
          class="flex h-20 w-20 items-center justify-center !text-6xl"
        />
      </GridItem>
    </main>
    <div id="mask" class="fixed inset-0 h-0" />
  </div>
</template>
<style>
/* markdown */
._markdown {
  @apply flex flex-col gap-4 px-4 py-6 text-base lg:px-8 lg:py-10 lg:text-lg;
}
._markdown > ul {
  @apply list-disc pl-5;
}
._markdown > ol {
  @apply list-decimal pl-5;
}
._markdown p {
  @apply leading-normal;
}
._markdown li {
  @apply leading-snug;
}
._markdown a {
  @apply text-seagull-800 underline underline-offset-2;
}

._contact > h2 {
  @apply flex items-center text-center text-lg before:mr-4 after:ml-4;
}
._contact > h2::before,
._contact > h2::after {
  @apply h-0.5 flex-1 border-b border-lochmara-950 bg-lochmara-50;
}
.muuri-item-dragging {
  z-index: 3;
}
.muuri-item-releasing {
  z-index: 2;
}
.muuri-item-hidden {
  z-index: 0;
}
</style>
