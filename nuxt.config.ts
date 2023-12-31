import Markdown from 'unplugin-vue-markdown/vite'

const isProd = process.env.NODE_ENV === 'production' ? true : undefined
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
  devServer: {
    port: 2309,
  },
  app: {
    head: {
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
      ],
    },
  },
  nitro: {
    preset: 'github-pages',
  },
  components: [
    { path: '~/contents', extensions: ['.md'], prefix: 'Markdown' },
    '~/components',
  ],
  vite: {
    vue: { include: [/\.vue$/, /\.md$/] },
    plugins: [
      Markdown({
        wrapperClasses: 'markdown',
        exclude: '_*.md',
      }),
    ],
  },
})
