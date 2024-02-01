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
        <ContentRenderer
          :value="data"
          class="rounded-lg bg-white/80 p-4 text-xl"
        />
      </template>
      <template v-else>
        <div class="group flex h-40 cursor-pointer items-center justify-center">
          <h3 class="text-5xl">{{ (data as ParsedContent).title }}</h3>
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
  </div>
</template>
