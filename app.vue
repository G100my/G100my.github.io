<template>
  <!-- <NuxtLayout> -->
  <NuxtLayout name="grid-layout">
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
/* font */
@import url('https://fonts.googleapis.com/css2?family=Silkscreen&display=swap');

/* common */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: Silkscreen;
  @apply my-4 text-center font-bold;
}

p {
  font-family: jf-jinxuanlatte;
}

body {
  @apply bg-black;
}

/* markdown */
._markdown {
  @apply flex flex-col gap-4 px-4 py-6 text-base lg:px-8 lg:py-10 lg:text-lg;
}
._markdown > ul {
  @apply list-disc pl-5;
}
._markdown > ol {
  @apply list-decimal pl-5;
}
._markdown p {
  @apply leading-normal;
}
._markdown li {
  @apply leading-snug;
}
._markdown a {
  @apply text-seagull-800 underline underline-offset-2;
}
</style>
