<script setup lang="ts">
import { MY_INFO } from '~/constants'
</script>
<template>
  <nav class="flex items-center justify-around gap-4">
    <a :href="'mailto:' + MY_INFO.email">
      <i class="ri-mail-line text-4xl" />
      <span class="sr-only">Email</span>
    </a>

    <a target="_blank" :href="MY_INFO.ig">
      <i class="ri-instagram-line text-4xl" />
      <span class="sr-only">Instagram</span>
    </a>

    <a target="_blank" :href="MY_INFO.github">
      <i class="ri-github-line text-4xl" />
      <span class="sr-only">Github</span>
    </a>

    <a target="_blank" :href="MY_INFO.linkedin">
      <i class="ri-linkedin-line text-4xl"></i>
      <span class="sr-only">Linkedin</span>
    </a>
  </nav>
</template>
