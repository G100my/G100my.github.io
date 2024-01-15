<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
<template>
  <i :class="'ri-' + name" />
</template>
