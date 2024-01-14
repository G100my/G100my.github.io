import type Grid from 'muuri'
import type { GridOptions, Item } from 'muuri'

export function setLayoutInfo(i: Item) {
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
export function parseLayoutInfo(s: string) {
  const [top, left, width, height] = s.split(',')
  return {
    top,
    left,
    width,
    height,
  }
}

export const GRID_OPTIONS: GridOptions = {
  layoutOnResize: true,
  dragEnabled: false,
  layout: {
    fillGaps: true,
    horizontal: true,
  },
}

let isDragging = false
export function dragStartHandler() {
  isDragging = true
}

export function itemPositionHandler(event: MouseEvent, grid?: Grid) {
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
    if (GRID_OPTIONS.dragEnabled && grid) {
      el.addEventListener(
        'transitionend',
        () => {
          grid.remove([grid.getItem(el)!])
          console.log('!!')
        },
        { once: true },
      )
    }
  } else {
    const { top, left, width, height } = parseLayoutInfo(el.dataset.initLayout!)
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
    if (GRID_OPTIONS.dragEnabled && grid) {
      el.addEventListener(
        'transitionend',
        () => {
          grid.add(el, {
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
  console.log(
    '🚀 ~ itemPositionHandler ~ GRID_OPTIONS.dragEnabled:',
    GRID_OPTIONS.dragEnabled,
  )
}
