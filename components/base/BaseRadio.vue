<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
defineProps<{
  name: string
  value: string | number
  label: string
}>()
const id = useId()
</script>
<template>
  <input :id="id" type="radio" name="for_what" :value="value" v-bind="$attrs" />
  <label :for="id">{{ label }}</label>
</template>
