<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

defineProps<{
  article: string
  open: boolean
}>()
</script>
<template>
  <div>
    <ContentQuery
      :path="article"
      :locale="$i18n.locale"
      v-slot="{ data }"
      find="one"
    >
      <template v-if="open">
        <div class="rounded-lg bg-white/80 p-4 text-xl">
          <ContentRenderer :value="data" />
        </div>
      </template>
      <template v-else>
        <div class="group flex h-80 cursor-pointer items-center justify-center">
          <h3 class="text-5xl">{{ (data as ParsedContent).title }}</h3>
          <div
            class="absolute bottom-0 right-0 overflow-hidden group-hover:block"
          >
            <ContentRendererMarkdown
              :value="(data as ParsedContent).excerpt!"
              class="markdown trnaslate-y-full h-64 w-64 translate-x-full translate-y-full transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
            />
          </div>
        </div>
      </template>
    </ContentQuery>
  </div>
</template>
