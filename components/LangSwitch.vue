<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()
</script>
<template>
  <div class="fixed left-1 top-1">
    <NuxtLink :to="switchLocalePath(locale === 'zh' ? 'en' : 'zh')">
      <IconWrapped name="translate-2" class="text-xl" />
    </NuxtLink>
  </div>
</template>
