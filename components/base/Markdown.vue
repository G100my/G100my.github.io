<script setup lang="ts">
defineProps<{
  article: string
}>()
</script>
<template>
  <ContentQuery
    :path="article"
    :locale="$i18n.locale"
    v-slot="{ data }"
    find="one"
  >
    <ContentRenderer :value="data" class="markdown" />
  </ContentQuery>
</template>
