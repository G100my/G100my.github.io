<script setup lang="ts">
defineProps<{
  article: string
}>()

const isDesktop = useDevice().isDesktop
</script>
<template>
  <ContentQuery
    :path="article"
    :locale="$i18n.locale"
    v-slot="{ data }"
    find="one"
  >
    <template v-if="!!(data instanceof Array)"> </template>
    <div
      v-else-if="isDesktop"
      class="group relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <h3 class="text-5xl">{{ data.title }}</h3>

      <div
        v-if="data.excerpt"
        class="absolute inset-0 left-1/4 top-1/4 hidden bg-white/60 group-hover:flex"
      >
        <ContentRendererMarkdown :value="data.excerpt" class="markdown" />
      </div>
      <!-- <ContentRenderer :value="data" class="markdown" /> -->
    </div>
    <Accordion v-else :title="data.title!">
      <ContentRenderer :value="data" class="markdown" />
    </Accordion>
  </ContentQuery>
</template>
