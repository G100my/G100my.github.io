<script setup lang="ts">
import todolist from '@/constants/100todo.json'
import { timeFormatter } from '~/utils'
const { t, locale } = useI18n()
const truncatedList = todolist.filter((i) => !!i.event)
const showZh = computed(() => locale.value === 'zh')
</script>
<template>
  <ul class="list-decimal space-y-1 overflow-y-auto pl-5 lg:space-y-2">
    <li v-for="t in truncatedList">
      <p class="flex text-sm">
        <span
          :class="{ 'line-through': t.checked }"
          class="mr-1 flex-1 lg:ml-2 lg:mr-3"
          >{{ showZh ? t.event : t.event_en }}</span
        >
        <time class="self-end text-xs">{{ timeFormatter(t.updated_at) }}</time>
      </p>
    </li>
    <li v-if="truncatedList.length < 100" class="list-none">
      <p class="mt-8 text-center">to be continue...</p>
    </li>
  </ul>
</template>
