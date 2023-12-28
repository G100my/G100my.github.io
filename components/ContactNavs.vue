<script setup lang="ts">
import { MY_INFO } from '~/constants'
</script>
<template>
  <nav class="flex items-center justify-between gap-4 p-1">
    <a :href="'mailto:' + MY_INFO.email">
      <IconWrapped name="mail-line" />
      <span class="sr-only">Email</span>
    </a>

    <a target="_blank" :href="MY_INFO.ig">
      <IconWrapped name="instagram-line" />
      <span class="sr-only">Instagram</span>
    </a>

    <a target="_blank" :href="MY_INFO.github">
      <IconWrapped name="github-line" />
      <span class="sr-only">Github</span>
    </a>

    <a target="_blank" :href="MY_INFO.linkedin">
      <IconWrapped name="linkedin-line" />
      <span class="sr-only">Linkedin</span>
    </a>
  </nav>
</template>
<style scoped>
nav > a {
  @apply outline outline-2 outline-offset-2 outline-alto-200;
  @apply rounded-full shadow-lg;
}
nav > a > i {
  @apply bg-gradient-to-b from-sundown-100 from-20% to-seagull-600;
  @apply block aspect-square rounded-full p-1 text-xl leading-none;
}
</style>
