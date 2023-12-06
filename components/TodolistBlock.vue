<script setup lang="ts">
import todolist from '@/constants/100todo.json'
const { t, locale } = useI18n()
const truncatedList = todolist.filter((i) => !!i.event)
const showZh = computed(() => locale.value === 'zh')
</script>
<template>
  <section class="flex h-screen flex-col pb-[10%] pt-[14%]">
    <h2 class="mb-6 text-center text-3xl">{{ t('100.title') }}</h2>
    <ul
      class="mx-8 flex-1 space-y-1 overflow-y-auto rounded-lg border px-4 py-2"
    >
      <li v-for="t in truncatedList">
        <p class="flex text-sm">
          <span class="w-7">{{ t.i + '.' }}</span>
          <span :class="{ 'line-through': t.checked }" class="mr-1 flex-1">{{
            showZh ? t.event : t.event_en
          }}</span>
          <time class="self-end text-xs">{{ t.updated_at }}</time>
        </p>
      </li>
      <li v-if="truncatedList.length < 100">
        <p class="mt-8 text-center">to be continue...</p>
      </li>
    </ul>
  </section>
</template>
