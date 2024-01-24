<script setup lang="ts">
import type Grid from 'muuri'

const { $muuri } = useNuxtApp()
const signal = ref(false)
provide('createAnime', readonly(signal))
let grid: Grid
onMounted(() => {
  grid = new $muuri('#grid_container', GRID_OPTIONS)
  grid.on('layoutEnd', () => {
    signal.value = true
  })
})
</script>
<template>
  <!-- <img src="~/assets/bg.png" class="fixed h-screen w-screen object-cover" /> -->
  <div
    class="fixed inset-0 h-screen w-full bg-gradient-to-b from-lochmara-50/90 from-30% to-lochmara-800/80"
  />
  <main
    id="grid_container"
    :class="[
      'relative h-screen w-screen',
      // 'space-y-5 px-10',
      // 'lg:grid',
      // 'lg:flex lg:flex-col',
      // 'bg-[url(~/assets/bg.png)]',
    ]"
  >
    <GridItem>
      <h1 class="mt-10 py-3 text-center text-5xl">
        <p>[ {{ MY_INFO.name }} ]</p>
      </h1>

      <div class="_gradient_border mx-auto w-fit rounded-full">
        <!-- <Avator /> -->
        <div class="aspect-square w-[310px] bg-black">test</div>
      </div>
      <div class="_contact">
        <h2>Contacts</h2>
        <ContactNavs class="mb-3 flex items-center justify-between gap-4" />
      </div>
    </GridItem>

    <GridItem v-slot="{ isScale }">
      <pre>{{ isScale }}</pre>
      <div v-if="isScale">test</div>
      <MarkdownAccordion v-else article="about" />
    </GridItem>
    <GridItem>
      <MarkdownAccordion article="projects" />
    </GridItem>
    <GridItem>
      <MarkdownAccordion article="tech" />
    </GridItem>
    <GridItem>
      <TechList />
    </GridItem>
    <GridItem>
      <!-- <LifeProgressing /> -->
      <div class="h-[500px] w-80 bg-black"></div>
    </GridItem>
    <GridItem unscalable size="sm">
      <LangSwitch
        class="flex h-20 w-full items-center justify-center !text-6xl"
      />
    </GridItem>
  </main>
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
#grid_container > * {
  /* @apply absolute; */
  /* @apply mx-auto max-w-md; */
  /* @apply lg:m-5 lg:w-4/12; */
  @apply outline outline-1 outline-red-600;
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
