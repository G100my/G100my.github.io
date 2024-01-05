import IconWrapped from '~/components/IconWrapped.vue'
import type { ComponentOptions } from 'nuxt/dist/app/compat/capi'

interface ArticleLangs {
  en?: ComponentOptions
  zh?: ComponentOptions
}

export function useDetailsWrapper(article: ArticleLangs) {
  const { locale } = useI18n()
  const { isDesktop } = useDevice()

  if (!(locale.value in article)) {
    return undefined
  }

  return defineComponent({
    setup() {
      const markdown = ref()
      let isShow = ref(isDesktop)
      let maxHeight: number
      let containerDiv: HTMLDivElement | null = null

      function onClick(event: ToggleEvent) {
        isShow.value = !isShow.value
        const button = event.currentTarget as HTMLDivElement
        if (!containerDiv) {
          containerDiv = button.parentNode!.querySelector(`[data-collapse]`)!
          maxHeight = containerDiv.scrollHeight
        }
      }

      return () =>
        h('div', { class: 'group', open: isShow.value ? '' : undefined }, [
          h(
            'button',
            {
              class: [
                'text-1xl flex w-full rounded-md py-2 pl-1 pr-3',
                'bg-gradient-to-b from-sundown-50 via-seagull-400 via-80% to-seagull-700',
                'border-2 border-seagull-900',
                'lg:border-none lg:bg-gray-50/40 lg:bg-none lg:text-3xl lg:backdrop-blur-lg lg:px-3 lg:rounded-b-none',
              ],
              onClick,
            },
            [
              h(IconWrapped, {
                name: 'loader-5-line',
                class:
                  'rotate-180 transition-transform group-open:rotate-[0.75turn]',
              }),
              markdown.value?.frontmatter.title,
            ],
          ),
          h(
            'div',
            {
              class:
                'transition-[max-height] overflow-hidden bg-gray-50/40 backdrop-blur-lg',
              'data-collapse': '',
              style: `max-height: ${isShow.value ? maxHeight : 0}px;`,
            },
            [
              h(
                article[locale.value as keyof ArticleLangs] as ComponentOptions,
                {
                  ref: markdown,
                  class: 'p-3',
                },
              ),
              h(
                'button',
                {
                  class: 'h-10 w-full  text-3xl text-lochmara-950',
                  onClick,
                },
                [h(IconWrapped, { name: 'arrow-up-double-line' })],
              ),
            ],
          ),
        ])
    },
  })
}
