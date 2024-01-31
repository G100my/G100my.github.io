<script setup lang="ts">
import type Grid from 'muuri'
import { MY_INFO } from '~/constants'

const { $muuri } = useNuxtApp()
let grid: Grid
onMounted(() => {
  grid = new $muuri('#grid_container', GRID_OPTIONS)
})
</script>
<template>
  <!-- <img src="~/assets/bg.png" class="fixed h-screen w-screen object-cover" /> -->
  <div
    class="fixed inset-0 h-screen w-full bg-gradient-to-b from-lochmara-50/90 from-30% to-lochmara-800/80"
  />
  <div class="p-10">
    <main id="grid_container" :class="['relative']">
      <GridItem unscalable>
        <h1 class="py-3 text-center text-5xl">
          <p>[ {{ MY_INFO.name }} ]</p>
        </h1>

        <div class="_gradient_border mx-auto w-fit rounded-full">
          <Avator />
        </div>

        <div class="_contact">
          <h2>Contacts</h2>
          <ContactNavs class="mb-3 flex items-center justify-around gap-4" />
        </div>
      </GridItem>

      <GridItem v-slot="{ isScale }" :col="6">
        <MarkdownBlock article="about" :open="isScale" />
        <!-- <MarkdownAccordion v-else article="about" /> -->
      </GridItem>
      <GridItem v-slot="{ isScale }">
        <MarkdownBlock article="projects" :open="isScale" />
      </GridItem>
      <GridItem v-slot="{ isScale }">
        <MarkdownBlock article="tech" :open="isScale" />
      </GridItem>
      <GridItem>
        <TechList />
      </GridItem>
      <GridItem>
        <div
          class="flex h-[500px] w-full items-center justify-center bg-black text-white"
        >
          LifeProgressing
        </div>
      </GridItem>
      <GridItem>
        <div
          class="flex h-[500px] w-full items-center justify-center bg-black text-white"
        >
          spotify
        </div>
      </GridItem>
      <GridItem>
        <div
          class="flex h-[500px] w-full items-center justify-center bg-black text-white"
        >
          todolist
        </div>
      </GridItem>

      <GridItem unscalable class="!w-1/6">
        <LangSwitch
          class="flex h-20 w-full items-center justify-center !text-6xl"
        />
      </GridItem>
    </main>
    <div id="mask" class="fixed inset-0 h-0" />
  </div>
</template>
<style>
/* markdown */
.markdown {
  @apply flex flex-col gap-4 p-4 pb-8 pt-6;
}
.markdown > ul {
  @apply list-disc pl-5;
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
