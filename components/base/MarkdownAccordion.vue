<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

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
    <Accordion :title="(data as ParsedContent).title!">
      <ContentRenderer :value="data" class="markdown" />
    </Accordion>
  </ContentQuery>
</template>
