import Anime from 'animejs'
import { theme } from '#tailwind-config'

export function copy2clipboard(v: string) {
  navigator.clipboard.writeText(v)
}

const colSteps = 12
export function createMoveAnime(
  node: HTMLElement,
  col: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = 10,
): Anime.AnimeInstance {
  const margin = Anime.get(node, 'margin')
  const { left, width, height, top } = node.getBoundingClientRect()
  const translateXfrom = Anime.get(node, 'translateX')
  const translateYfrom = Anime.get(node, 'translateY')

  let scaledW = (window.innerWidth * col) / colSteps
  const scaledH = (window.innerHeight * col) / colSteps

  if (scaledW > 1000) scaledW = 1000

  const translateXto = (window.innerWidth - scaledW) / 2 - left
  const translateYto =
    (window.innerHeight * (colSteps - col)) / colSteps / 2 - top

  const anime = Anime.timeline({
    autoplay: false,
    loop: false,
    duration: 100,
    easing: 'linear',
    loopComplete: (anime) => {
      anime.reverse()
    },
  })
    .add({
      targets: '#mask',
      backdropFilter: 'blur(10px)',
      height: '100vh',
    })
    .add({
      targets: node.parentNode,
      zIndex: [0, 10],
      outlineWidth: 0,
    })
    .add({
      targets: node,
      translateX: [translateXfrom, translateXto],
      margin: [margin, 0],
    })
    .add({
      targets: node,
      translateY: [translateYfrom, translateYto],
    })
    .add({
      targets: node,
      width: [width, scaledW],
    })
    .add({
      targets: node,
      height: [height, scaledH],
    })

  return anime
}

export function createColorAnime(node: HTMLElement): Anime.AnimeInstance {
  return Anime({
    targets: node,
    duration: 1000,
    autoplay: false,
    loop: false,
    easing: 'linear',
    loopComplete: (anime) => anime.reverse(),
    backgroundColor: theme.colors.lochmara[50],
    opacity: 0.9,
    borderRadius: 28,
  })
}

export function timeFormatter(timestamp: string) {
  const date = new Date(timestamp)
  const y = date.getFullYear()
  let m: string | number = date.getMonth() + 1
  if (m < 10) m = '0' + m
  let d: string | number = date.getDate()
  if (d < 10) d = '0' + d
  return `${y}/${m}/${d}`
}
