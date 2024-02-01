<script setup lang="ts">
import IconAWS from '@/assets/tech/aws.svg'
import IconCss3 from '@/assets/tech/CSS3.svg'
import IconCypress from '@/assets/tech/Cypress.svg'
import IconGitHubAction from '@/assets/tech/GitHubActions.svg'
import IconGoogleExtension from '@/assets/tech/extension.svg'
import IconHTML5 from '@/assets/tech/HTML5.svg'
import IconJavaScript from '@/assets/tech/JavaScript.svg'
import IconNodeJs from '@/assets/tech/Nodejs.svg'
import IconNuxt from '@/assets/tech/nuxt.svg'
import IconMetaSpark from '@/assets/tech/sparkar-by-facebook.svg'
import IconPWA from '@/assets/tech/pwalogo-inverse.svg'
import IconSass from '@/assets/tech/Sass.svg'
import IconTailwindCSS from '@/assets/tech/TailwindCSS.svg'
import IconTypeScript from '@/assets/tech/TypeScript.svg'
import IconVue from '@/assets/tech/vue.svg'
import IconReact from '@/assets/tech/React.svg'

const list = [
  { icon: IconVue, name: 'Vue', good: true },
  { icon: IconTypeScript, name: 'TypeScript', good: true },
  { icon: IconTailwindCSS, name: 'Tailwind CSS', good: true },
  { icon: IconHTML5, name: 'HTML5' },
  { icon: IconCss3, name: 'CSS3' },
  { icon: IconJavaScript, name: 'JavaScript' },
  { icon: IconSass, name: 'Sass' },
  { icon: IconNodeJs, name: 'NodeJs' },
  { icon: IconReact, name: 'React' },
  { icon: IconCypress, name: 'Cypress' },
  { icon: IconGitHubAction, name: 'GitHub\nAction' },
  { icon: IconNuxt, name: 'Nuxt' },
  { icon: IconAWS, name: 'AWS' },
  { icon: IconPWA, name: 'PWA' },
  { icon: IconGoogleExtension, name: 'Google\nExtension' },
  { icon: IconMetaSpark, name: 'Meta Spark' },
]
</script>
<template>
  <ul
    class="flex w-full flex-wrap justify-center gap-x-1 gap-y-5 pt-2 first:pt-0 lg:gap-6"
  >
    <li
      v-for="i in list"
      class="relative flex flex-shrink-0 flex-col items-center gap-1.5"
      :class="{
        'after:absolute after:right-0 after:top-0 after:block after:content-[\'\uD83D\uDC4D\']':
          i.good,
      }"
    >
      <img
        :src="i.icon"
        :alt="i.name"
        class="_gradient h-5 w-5 sm:h-8 sm:w-8 lg:h-12 lg:w-12"
        :title="i.name"
      />
      <span class="whitespace-pre-line text-center text-xs sm:text-sm">{{
        i.name
      }}</span>
    </li>
  </ul>
</template>
<style>
._gradient {
  background: radial-gradient(theme('colors.seagull.200'), transparent 70%);
}
</style>
