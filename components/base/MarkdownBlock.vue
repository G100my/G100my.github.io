<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

defineProps<{
  article: string
  open: boolean
}>()
</script>
<template>
  <ContentQuery
    :path="article"
    :locale="$i18n.locale"
    v-slot="{ data }"
    find="one"
  >
    <template v-if="open">
      <div class="h-full w-full rounded-lg p-4">
        <ContentRenderer :value="data" class="_markdown text-md" />
        <slot />
      </div>
    </template>
    <template v-else>
      <div class="h-g1 flex flex-col items-center justify-center">
        <h2 class="whitespace-nowrap text-3xl">
          {{ (data as ParsedContent).title }}
        </h2>
      </div>
      <ContentRendererMarkdown
        v-if="(data as ParsedContent).excerpt"
        :value="(data as ParsedContent).excerpt!"
        class="h-g3 p-4 pt-0"
      />
    </template>
  </ContentQuery>
</template>
