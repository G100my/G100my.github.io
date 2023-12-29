<script setup lang="ts">
import { MY_INFO } from '~/constants'
import About_en from '~/contents/About_en.md'
import About_zh from '~/contents/About_zh.md'

const WrappedMarkdownAbout = useDetailsWrapper(About_en, About_zh)
</script>
<template>
  <main
    class="h-screen w-screen bg-gradient-to-b from-lochmara-100 from-30% to-lochmara-950"
  >
    <h1 class="py-3 text-center text-lg">
      <p>[ {{ MY_INFO.name }} ]</p>
    </h1>

    <div class="_gradient_border mx-auto w-fit rounded-full">
      <Avator />
    </div>

    <div class="mx-10">
      <section class="_contact">
        <h2>Contacts</h2>
        <!-- <ContactNavs class="mb-3" /> -->
      </section>

      <hr
        class="h-0.5 border-b border-t-0 border-lochmara-950 bg-lochmara-50"
      />

      <div>
        <WrappedMarkdownAbout />
      </div>
    </div>
  </main>
</template>
<style scoped>
._contact > h2 {
  @apply my-1 flex items-center text-center text-lg before:mr-4 after:ml-4;
}
._contact > h2::before,
._contact > h2::after {
  @apply h-0.5 flex-1 border-b border-lochmara-950 bg-lochmara-50;
}
</style>
