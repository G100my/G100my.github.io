<script setup lang="ts">
import { MY_INFO } from '~/constants'
</script>
<template>
  <!-- <img src="~/assets/bg.png" class="fixed h-screen w-screen object-cover" /> -->
  <div
    class="fixed inset-0 h-screen w-full bg-gradient-to-b from-lochmara-50/90 from-30% to-lochmara-800/80"
  />
  <main
    id="grid_container"
    :class="[
      'h-dvh relative w-screen space-y-5 overflow-auto px-10',
      'lg:flex lg:flex-col',
      // 'bg-[url(~/assets/bg.png)]',
    ]"
  >
    <section>
      <h1 class="mt-10 py-3 text-center text-5xl">
        <p>[ {{ MY_INFO.name }} ]</p>
      </h1>

      <div class="_gradient_border mx-auto w-fit rounded-full">
        <!-- <Avator /> -->
        <div class="aspect-square w-[310px] bg-black">test</div>
      </div>
    </section>

    <section class="_contact">
      <h2>Contacts</h2>
      <ContactNavs class="mb-3 flex items-center justify-between gap-4" />
    </section>

    <MarkdownAccordion article="about" />
    <MarkdownAccordion article="projects" />
    <MarkdownAccordion article="tech" />
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
  @apply mx-auto w-4/12 max-w-md lg:m-5;
  /* @apply outline outline-8 outline-red-600; */
}
</style>
