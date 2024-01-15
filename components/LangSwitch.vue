<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()
</script>
<template>
  <NuxtLink
    :to="switchLocalePath(locale === 'zh' ? 'en' : 'zh')"
    class="text-xl"
  >
    <IconWrapped name="translate-2" />
  </NuxtLink>
</template>
