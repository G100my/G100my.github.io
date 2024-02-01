<script setup lang="ts">
import type Grid from 'muuri'
import { MY_INFO, gridInjectionKey } from '~/constants'

const { $muuri } = useNuxtApp()
const grid = ref<Grid>()
onMounted(() => {
  grid.value = new $muuri('#grid_container', GRID_OPTIONS)
})
provide(gridInjectionKey, grid)
</script>
<template>
  <!-- <img src="~/assets/bg.png" class="fixed h-screen w-screen object-cover" /> -->
  <div
    class="fixed inset-0 h-screen w-full bg-gradient-to-b from-lochmara-50/90 from-30% to-lochmara-800/80"
  />
  <div class="container mx-auto p-10">
    <main id="grid_container" :class="['relative']">
      <GridItem unscalable class="p-3">
        <h1 class="py-3 text-center text-5xl">
          <p>[ {{ MY_INFO.name }} ]</p>
        </h1>

        <div class="mx-auto w-fit rounded-full">
          <Avator />
        </div>

        <div class="_contact">
          <h2>Contacts</h2>
          <ContactNavs class="mb-3 flex items-center justify-around gap-4" />
        </div>
      </GridItem>

      <GridItem v-slot="{ isScale }">
        <MarkdownBlock article="about" :open="isScale" />
        <!-- <MarkdownAccordion v-else article="about" /> -->
      </GridItem>
      <GridItem v-slot="{ isScale }">
        <MarkdownBlock article="projects" :open="isScale" />
      </GridItem>
      <GridItem v-slot="{ isScale }">
        <MarkdownBlock article="tech" :open="isScale">
          <TechList />
        </MarkdownBlock>
      </GridItem>
      <GridItem unscalable>
        <div class="w-g4 h-g6">
          <LifeProgressing />
        </div>
      </GridItem>
      <GridItem>
        <div
          class="flex h-[500px] w-full items-center justify-center bg-black text-white"
        >
          spotify
        </div>
      </GridItem>
      <GridItem class="py-4 lg:py-0" v-slot="{ isScale }">
        <Todolist
          class="h-full px-4 py-2 no-scrollbar"
          :class="{ 'max-h-96 max-w-sm': !isScale }"
        />
      </GridItem>

      <GridItem unscalable>
        <LangSwitch
          class="flex h-24 w-24 items-center justify-center !text-6xl"
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
._markdown p {
  @apply leading-normal;
}
._markdown li {
  @apply leading-snug;
}
._contact > h2 {
  @apply my-1 flex items-center text-center text-lg before:mr-4 after:ml-4;
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
