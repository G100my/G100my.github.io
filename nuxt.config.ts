// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  i18n: {
    // Link localizing settings
    locales: ['en', 'zh'],
    defaultLocale: 'zh',

    bundle: {
      compositionOnly: true,
      // 還沒有這個功能
      // fullInstall: false,
    },
  },
})
