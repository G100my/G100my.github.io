<script setup lang="ts">
import type { Item } from 'muuri'
import type Grid from 'muuri'
import type { SetupContext } from 'nuxt/dist/app/compat/capi'
import { MY_INFO } from '~/constants'

const grid = ref<Grid>()

const { $muuri } = useNuxtApp()
onMounted(() => {
  grid.value = new $muuri('#grid_container', GRID_OPTIONS)
  const handler = (items: Item[]) => {
    items.forEach((i) => setLayoutInfo(i))
    grid.value!.off('layoutEnd', handler)
  }
  grid.value.on('layoutEnd', handler)

  // @ts-ignore
  window.grid = grid.value
})

const GridItem = (_props: any, content: SetupContext) =>
  h(
    'section',
    {
      onClick: (event) => itemPositionHandler(event, grid.value!),
      class: 'w-80',
    },
    content.slots.default?.(),
  )
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

    <GridItem>
      <MarkdownAccordion article="about" />
    </GridItem>
    <GridItem>
      <MarkdownAccordion article="projects" />
    </GridItem>
    <GridItem>
      <MarkdownAccordion article="tech" />
    </GridItem>
  </main>
</template>
<style>
._contact > h2 {
  @apply my-1 flex items-center text-center text-lg before:mr-4 after:ml-4;
}
._contact > h2::before,
._contact > h2::after {
  @apply h-0.5 flex-1 border-b border-lochmara-950 bg-lochmara-50;
}
main > * {
  @apply absolute m-10;
  /* @apply mx-auto max-w-md; */
  /* @apply lg:m-5 lg:w-4/12; */
  @apply outline outline-8 outline-red-600;
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
