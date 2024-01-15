import type Grid from 'muuri'
import type { GridOptions, Item } from 'muuri'

const gridStack = reactive<{ [key: string]: Grid }>({})
export default function useMuuri(
  containerQuery: string,
  options?: { init?: boolean },
) {
  let isDragging = false
  if (!(containerQuery in gridStack)) {
    gridStack[containerQuery] = {} as Grid
  }

  function setLayoutInfo(i: Item) {
    const el = i.getElement() as HTMLElement
    const { top, left } = i.getPosition()
    el.dataset.open = '0'
    el.dataset.i = Array.from(el.parentNode!.children).indexOf(el).toString()
    // top, left, w, h
    el.dataset.initLayout = [top, left, i.getWidth(), i.getHeight()].join()
    el.addEventListener('mousedown', () => (isDragging = false))
    el.addEventListener('mousemove', () => (isDragging = true))

    // @ts-ignore
    if (import.meta.dev) el.item = i
  }
  function parseLayoutInfo(s: string) {
    const [top, left, width, height] = s.split(',')
    return {
      top,
      left,
      width,
      height,
    }
  }

  const GRID_OPTIONS: GridOptions = {
    layoutOnResize: true,
    dragEnabled: false,
    layout: {
      fillGaps: true,
      horizontal: true,
    },
  }

  function itemPositionHandler(event: MouseEvent) {
    event.stopPropagation()
    if (isDragging) return
    isDragging = false

    const el = event.currentTarget as HTMLElement

    if (el.dataset.open == '0') {
      el.dataset.open = '1'
      {
        el.style.width = '100vw'
        el.style.height = '100vh'
        el.style.zIndex = '1'
        el.style.margin = '0px'
        el.style.transform = `translateX(${0}px) translateY(${0}px)`
        el.style.transitionProperty = 'width,height,transform'
        el.style.transitionDuration = '0.2s'
      }
      if (GRID_OPTIONS.dragEnabled && gridStack[containerQuery]) {
        el.addEventListener(
          'transitionend',
          () => {
            gridStack[containerQuery].remove([
              gridStack[containerQuery].getItem(el)!,
            ])
            console.log('!!')
          },
          { once: true },
        )
      }
    } else {
      const { top, left, width, height } = parseLayoutInfo(
        el.dataset.initLayout!,
      )
      el.dataset.open = '0'
      {
        el.style.setProperty('width', width + 'px')
        el.style.setProperty('height', height + 'px')
        el.style.setProperty('z-index', null)
        el.style.setProperty('margin', null)
        el.style.setProperty(
          'transform',
          `translateX(${left}px) translateY(${top}px)`,
        )
      }
      if (GRID_OPTIONS.dragEnabled) {
        el.addEventListener(
          'transitionend',
          () => {
            gridStack[containerQuery].add(el, {
              index: Number(el.dataset.i),
              layout: () => {
                el.style.setProperty('transition-property', null)
                el.style.setProperty('transition-duration', null)
              },
            })
          },
          { once: true },
        )
      }
    }
  }

  const { $muuri } = useNuxtApp()
  onMounted(() => {
    if ('_id' in gridStack[containerQuery] || !options?.init) return

    // Object.assign(current, new $muuri(containerQuery, GRID_OPTIONS))
    gridStack[containerQuery] = new $muuri(containerQuery, GRID_OPTIONS)
    const handler = (items: Item[]) => {
      items.forEach((i) => setLayoutInfo(i))
      gridStack[containerQuery].off('layoutEnd', handler)
    }
    gridStack[containerQuery].on('layoutEnd', handler)
    // @ts-ignore
    window.grid = gridStack[containerQuery].value
  })

  return {
    grid: gridStack[containerQuery],
    itemPositionHandler,
    setLayoutInfo,
  }
}
