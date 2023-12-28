<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()
</script>
<template>
  <div class="bg-slate-950 relative mx-auto h-screen max-w-lg">
    <main
      class="_container text-white relative z-10 mx-auto h-screen min-h-screen snap-y snap-mandatory space-y-10 overflow-hidden overflow-y-auto p-10 sm:no-scrollbar"
    >
      <CoverBlock />

      <section class="flex items-center">
        <MarkdownAboutZh />
      </section>

      <TechBlock />

      <section>
        <MarkdownHowCanIHelpZh />
      </section>

      <!-- spotify block -->
      <!-- side projects -->
      <!-- what next -->
      <!-- <TodolistBlock /> -->

      <!-- <LifeProgressing class="h-screen" /> -->

      <div class="absolute bottom-1 left-1">
        <NuxtLink :to="switchLocalePath(locale === 'zh' ? 'en' : 'zh')">
          <IconWrapped name="translate-2" class="text-xl" />
        </NuxtLink>
      </div>
    </main>
  </div>
</template>
<style>
._container {
  background-image: url('~/assets/bg.png');
  background-position-y: center;
  background-position-x: 46.4%;
}
section {
  /* @apply rounded-lg bg-seagull-50/80 outline outline-2 outline-offset-4 outline-seagull-200 backdrop:blur-lg; */
  @apply rounded-lg bg-seagull-900/50 outline outline-2 outline-seagull-200 backdrop-blur-xl;
}
main > div,
main > section {
  @apply max-h-full snap-center;
}
main > section {
  @apply overflow-auto no-scrollbar;
}

/* https://cssarrowplease.com/ */
.arrow_box {
  @apply absolute right-full -translate-x-3 p-1 text-xs;
  background: #4b5563;
  border: 2px solid #f3f4f6;
}
.arrow_box:after,
.arrow_box:before {
  left: 100%;
  top: 50%;
  border: solid transparent;
  content: '';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow_box:after {
  border-color: rgba(75, 85, 99, 0);
  border-left-color: #4b5563;
  border-width: 6px;
  margin-top: -6px;
}
.arrow_box:before {
  border-color: rgba(243, 244, 246, 0);
  border-left-color: #f3f4f6;
  border-width: 9px;
  margin-top: -9px;
}
</style>
