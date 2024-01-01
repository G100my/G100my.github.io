<script setup lang="ts">
import { MY_INFO } from '~/constants'
import MDAboutEn from '~/contents/About_en.md'
console.log('🚀 ~ file: appStyle.vue:4 ~ MDAboutEn:', MDAboutEn)
import MDAboutZh from '~/contents/About_zh.md'
import MDHowCanIHelpZh from '~/contents/HowCanIHelp_zh.md'
import MDProjectEn from '~/contents/Projects_en.md'
import MDProjectZh from '~/contents/Projects_zh.md'
import MDTechEn from '~/contents/Tech_en.md'
import MDTechZh from '~/contents/Tech_zh.md'

const WrappedMDAbout = useDetailsWrapper({ zh: MDAboutZh, en: MDAboutEn })
const WrappedMDHowCanIHelp = useDetailsWrapper({ zh: MDHowCanIHelpZh })
const WrappedMDProjects = useDetailsWrapper({
  en: MDProjectEn,
  zh: MDProjectZh,
})
const WrappedMDTech = useDetailsWrapper({ en: MDTechEn, zh: MDTechZh })
</script>
<template>
  <img src="~/assets/bg.png" class="fixed h-screen w-screen object-cover" />
  <main
    :class="[
      'relative h-screen w-screen overflow-auto px-10',
      'bg-gradient-to-b from-lochmara-50/90 from-30% to-lochmara-950/80',
      // 'bg-[url(~/assets/bg.png)]',
    ]"
  >
    <h1 class="py-3 text-center text-lg">
      <p>[ {{ MY_INFO.name }} ]</p>
    </h1>

    <div class="_gradient_border mx-auto w-fit rounded-full">
      <Avator />
    </div>

    <div>
      <section class="_contact">
        <h2>Contacts</h2>
        <ContactNavs class="mb-3" />
      </section>

      <hr
        class="h-0.5 border-b border-t-0 border-lochmara-950 bg-lochmara-50"
      />

      <div class="space-y-5">
        <WrappedMDAbout />
        <WrappedMDTech />
        <WrappedMDHowCanIHelp v-if="$i18n.locale === 'zh'" />
        <WrappedMDProjects />
      </div>
    </div>
  </main>
</template>
<style>
._contact > h2 {
  @apply my-1 flex items-center text-center text-lg before:mr-4 after:ml-4;
}
._contact > h2::before,
._contact > h2::after {
  @apply h-0.5 flex-1 border-b border-lochmara-950 bg-lochmara-50;
}
main > * {
  @apply mx-auto max-w-md;
}
</style>
