<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'

const props = defineProps<{
  label: string
  name: string
  type?: InputTypeHTMLAttribute | 'textarea'
}>()

const id = useId()
</script>
<template>
  <label
    :for="id"
    class="relative block overflow-hidden rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-lochmara-600"
  >
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :placeholder="label"
      class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    />
    <input
      v-else
      :type="type"
      :id="id"
      :placeholder="label"
      class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    />

    <span
      class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
    >
      {{ label }}
    </span>
  </label>
</template>
