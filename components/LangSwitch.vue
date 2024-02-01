<script setup lang="ts">
import type Grid from 'muuri'
import { gridInjectionKey } from '~/constants'

const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()
const grid = inject<Ref<Grid>>(gridInjectionKey)

async function handleClick() {
  // ! refactor me
  setTimeout(() => {
    grid?.value.refreshItems()
    grid?.value.layout()
  }, 100)
}
</script>
<template>
  <NuxtLink
    :to="switchLocalePath(locale === 'zh' ? 'en' : 'zh')"
    class="text-xl"
    @click="handleClick"
  >
    <IconWrapped name="translate-2" />
  </NuxtLink>
</template>
