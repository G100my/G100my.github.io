<script setup lang="ts">
import { TransitionAttrs } from '~/constants'

defineProps<{
  modelValue: boolean
}>()
defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>
<template>
  <Transition v-bind="TransitionAttrs">
    <Teleport v-if="modelValue" to="body">
      <div class="h-dvh w-dvh fixed inset-0">
        <div class="absolute bg-lochmara-950/20" />
        <slot />
      </div>
    </Teleport>
  </Transition>
</template>
