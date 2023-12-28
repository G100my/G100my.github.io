<script setup lang="ts">
import { MY_INFO } from '~/constants'
</script>
<template>
  <nav class="flex items-center justify-between gap-4">
    <a :href="'mailto:' + MY_INFO.email">
      <IconWrapped name="mail-line" class="text-4xl" />
      <span class="sr-only">Email</span>
    </a>

    <a target="_blank" :href="MY_INFO.ig">
      <IconWrapped name="instagram-line" class="text-4xl" />
      <span class="sr-only">Instagram</span>
    </a>

    <a target="_blank" :href="MY_INFO.github">
      <IconWrapped name="github-line" class="text-4xl" />
      <span class="sr-only">Github</span>
    </a>

    <a target="_blank" :href="MY_INFO.linkedin">
      <IconWrapped name="linkedin-line" class="text-4xl" />
      <span class="sr-only">Linkedin</span>
    </a>
  </nav>
</template>
