const isProd = process.env.NODE_ENV === 'production' ? true : undefined
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@nuxt/content',
  ],
  i18n: {
    locales: [
      { code: 'zh', file: './locales/zh.json', name: 'zh' },
      { code: 'en', file: './locales/en.json', name: 'en' },
    ],
    defaultLocale: 'zh',
    types: 'composition',
    bundle: {
      fullInstall: false,
      compositionOnly: true,
    },
  },
  devServer: { port: 2309 },
  ssr: true,
  app: {
    head: {
      title: 'Lo - Profile Playground',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css',
        },
      ],
      script: [
        // justfont
        isProd
          ? {
              type: 'text/javascript',
              src: './justfont.js',
            }
          : {
              src: '//s3-ap-northeast-1.amazonaws.com/justfont-user-script/jf-65073.js',
            },
        // Google tag (gtag.js)
        isProd && {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-HPQ1FNRQFH',
          async: true,
        },
        isProd && {
          innerHTML: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HPQ1FNRQFH');`,
        },
      ],
    },
  },
  nitro: { preset: 'github-pages' },
  components: [{ path: '~/components', pathPrefix: false }],
  content: {
    locales: ['en', 'zh'],
    navigation: false,
    markdown: { anchorLinks: false },
  },
  tailwindcss: { exposeConfig: true },
})
