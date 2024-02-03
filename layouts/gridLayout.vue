<script setup lang="ts">
import type { GridOptions, Item } from 'muuri'
import type Grid from 'muuri'
import { MY_INFO, gridInjectionKey } from '~/constants'
const { isMobile } = useDevice()

const GRID_OPTIONS: GridOptions = {
  layoutOnResize: true,
  dragEnabled: !isMobile,
  layout: {
    fillGaps: true,
  },
  items: undefined,
}

const { $muuri } = useNuxtApp()
const grid = ref<Grid>()
onMounted(() => {
  grid.value = new $muuri('#grid_container', GRID_OPTIONS)
  // @ts-ignore
  window.grid = grid.value
  const items = Array.from(
    document.getElementById('grid_container')!.querySelectorAll('section'),
  )
  const realItems = items.filter((i) => {
    return window.getComputedStyle(i).display !== 'none'
  })
  let placeHolderItems: HTMLElement[] | Item[] = items.filter((i) => {
    return window.getComputedStyle(i).display === 'none'
  })

  nextTick(() => {
    for (let i = 0; i < realItems.length; i++) {
      const e = realItems[i]
      e.addEventListener(
        'transitionend',
        () => {
          // remove GridItem static class: '-translate-x-[800px]'
          e.classList.remove('-translate-x-[800px]', 'transition-transform')
        },
        { once: true },
      )
      setTimeout(() => {
        grid.value?.add(e)
      }, i * 60)
    }
  })
  setTimeout(
    () => {
      placeHolderItems = grid.value?.add(placeHolderItems as HTMLElement[], {
        index: -1,
      })!
    },
    (realItems.length + 1) * 60,
  )
  const hidePlaceholder = () => {
    if (window.innerWidth < 500) {
      grid.value?.hide(placeHolderItems as Item[])
      window.onresize = showPlaceholder
    }
  }
  const showPlaceholder = () => {
    if (window.innerWidth > 500) {
      grid.value?.show(placeHolderItems as Item[])
      window.onresize = hidePlaceholder
    }
  }
  window.onresize = showPlaceholder
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
  <div class="mx-auto h-screen max-h-screen overflow-auto p-10">
    <main id="grid_container" :class="['relative mx-auto max-w-7xl']">
      <GridItem unscalable class="w-g4 h-g6 g:p-6 p-3">
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

      <GridItem unscalable class="w-g4 h-g6">
        <LifeProgressing class="h-full w-full" />
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

      <section
        v-for="i in 50"
        class="g:block w-g1 h-g1 absolute hidden w-full -translate-x-[800px] outline outline-seagull-950 transition-transform"
      >
        <div class="h-full w-full"></div>
      </section>

      <GridItem class="w-g3 h-g4">
        <p class="p-4">
          {{ $t('website.description') }}
        </p>
      </GridItem>

      <GridItem unscalable class="flex items-center justify-center">
        <LangSwitch
          class="flex h-20 w-20 items-center justify-center !text-6xl"
        />
      </GridItem>
    </main>
    <div id="mask" class="fixed inset-0 h-0" />
  </div>
</template>
<style scoped>
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
