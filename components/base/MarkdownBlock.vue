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
      <div
        class="group flex h-24 cursor-pointer items-center justify-center p-6"
      >
        <h3 class="text-3xl">{{ (data as ParsedContent).title }}</h3>
        <!-- <div
            v-if="(data as ParsedContent).excerpt"
            class="absolute bottom-0 right-0 flex justify-end overflow-hidden"
          >
            <ContentRendererMarkdown
              :value="(data as ParsedContent).excerpt!"
              :class="[
                'markdown h-5/6 w-5/6 bg-white/80',
                'translate-x-full translate-y-full transition-transform group-hover:translate-x-0 group-hover:translate-y-0',
              ]"
            />
          </div> -->
      </div>
    </template>
  </ContentQuery>
</template>
