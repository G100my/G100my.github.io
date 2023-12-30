import IconWrapped from '~/components/IconWrapped.vue'
import type { ComponentOptions } from 'nuxt/dist/app/compat/capi'

export function useDetailsWrapper(
  componentZh: ComponentOptions,
  componentEn: ComponentOptions,
) {
  return defineComponent({
    setup() {
      const markdown = ref()
      const { locale } = useI18n()
      let isShow = ref(false)
      let maxHeight: number
      let containerDiv: HTMLDivElement | null = null

      function onClick(event: ToggleEvent) {
        isShow.value = !isShow.value
        const target = event.currentTarget as HTMLDivElement
        if (!containerDiv) {
          containerDiv = target.querySelector(`[data-collapse]`)!
          maxHeight = containerDiv.scrollHeight
        }
      }

      return () =>
        h(
          'div',
          { class: 'group', onClick, open: isShow.value ? '' : undefined },
          [
            h('button', { class: 'flex' }, [
              h(IconWrapped, {
                name: 'loader-5-line',
                class:
                  'block rotate-180 transition-transform group-open:rotate-[270deg]',
              }),
              markdown.value?.frontmatter.title,
            ]),
            h(
              'div',
              {
                class: 'transition-[max-height] overflow-hidden',
                'data-collapse': '',
                style: `max-height: ${isShow.value ? maxHeight : 0}px;`,
              },
              h(locale.value === 'en' ? componentEn : componentZh, {
                ref: markdown,
              }),
            ),
          ],
        )
    },
  })
}
