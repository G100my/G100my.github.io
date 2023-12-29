<template>
  <NuxtLayout name="app-style">
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
/* font */
@import url('https://fonts.googleapis.com/css2?family=Silkscreen&display=swap');

p,
span,
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-mono;
}

h2 {
  @apply my-4 text-center text-2xl font-bold;
}
h3 {
  font-family: Silkscreen;
  @apply my-4 text-center text-xl;
}

p {
  font-family: jf-jinxuanlatte;
}

/* common */

body {
  @apply bg-black;
}

/* markdown */
.markdown {
  @apply px-10;
}
.markdown > p {
  @apply my-4;
}
.markdown > ul {
  @apply list-disc pl-5;
}
</style>
