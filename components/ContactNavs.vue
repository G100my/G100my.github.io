<script setup lang="ts">
import { MY_INFO } from '~/constants'
</script>
<template>
  <nav>
    <a :href="'mailto:' + MY_INFO.email">
      <IconWrapped name="mail-line" />
      <span class="sr-only">Email</span>
    </a>

    <a target="_blank" :href="MY_INFO.cakeResume">
      <IconWrapped name="article-line" />
      <span class="sr-only">Resume</span>
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
  @apply flex aspect-square items-center justify-center;
  @apply rounded-lg p-3 text-3xl shadow-lg;
}
nav > a > i {
  @apply flex aspect-square items-center justify-center leading-none;
}
</style>
