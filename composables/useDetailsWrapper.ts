import type { ComponentOptions } from 'nuxt/dist/app/compat/capi'

export function useDetailsWrapper(
  componentZh: ComponentOptions,
  componentEn: ComponentOptions,
) {
  return {
    setup() {
      const markdown = ref()
      const { locale } = useI18n()
      return () =>
        h('details', [
          h('summary', markdown.value?.frontmatter.title),
          h(locale.value === 'en' ? componentEn : componentZh, {
            ref: markdown,
          }),
        ])
    },
  }
}
