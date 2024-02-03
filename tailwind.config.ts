import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./**/*.{vue,ts,md}'],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        ...Array(10)
          .fill(null)
          .reduce((acc, _i, i) => {
            return {
              ...acc,
              [`.w-g${i + 1}`]: {
                width: 80 * (i + 1) + 'px',
                '@media (max-width:500px)': {
                  width: '100%',
                },
              },
            }
          }, {}),
        ...Array(10)
          .fill(null)
          .reduce((acc, _i, i) => {
            return {
              ...acc,
              [`.h-g${i + 1}`]: {
                height: 80 * (i + 1) + 'px',
              },
            }
          }, {}),
      })
    }),
  ],
  theme: {
    extend: {
      screens: {
        g: '500px',
      },
      colors: {
        gold: {
          DEFAULT: '#ffd700',
          '50': '#ffffe7',
          '100': '#feffc1',
          '200': '#fffd86',
          '300': '#fff441',
          '400': '#ffe60d',
          '500': '#ffd700', // DEFAULT
          '600': '#d19e00',
          '700': '#a67102',
          '800': '#89580a',
          '900': '#74480f',
          '950': '#442604',
        },
        sundown: {
          DEFAULT: '#ffadad',
          '50': '#fef2f2',
          '100': '#ffe1e1',
          '200': '#ffc8c8',
          '300': '#ffadad', // DEFAULT
          '400': '#fd6c6c',
          '500': '#f53e3e',
          '600': '#e22020',
          '700': '#be1717',
          '800': '#9d1717',
          '900': '#821a1a',
          '950': '#470808',
        },
        lochmara: {
          DEFAULT: '#0077be',
          '50': '#f0f8ff',
          '100': '#e0f1fe',
          '200': '#b9e4fe',
          '300': '#7ccffd',
          '400': '#36b7fa',
          '500': '#0c9feb',
          '600': '#0077be', // DEFAULT
          '700': '#0164a3',
          '800': '#065586',
          '900': '#0b476f',
          '950': '#072d4a',
        },
        seagull: {
          DEFAULT: '#87ceeb',
          '50': '#f2f9fd',
          '100': '#e4f2fa',
          '200': '#c2e5f5',
          '300': '#87ceeb', // DEFAULT
          '400': '#50b9e0',
          '500': '#2aa0cd',
          '600': '#1b81ae',
          '700': '#17678d',
          '800': '#175775',
          '900': '#184962',
          '950': '#102f41',
        },
        'olive-drab': {
          DEFAULT: '#6b8e23',
          '50': '#f7fbea',
          '100': '#edf5d2',
          '200': '#dbecaa',
          '300': '#c1dd79',
          '400': '#a8cc4f',
          '500': '#89b230',
          '600': '#6b8e23', // DEFAULT
          '700': '#526c1f',
          '800': '#43561e',
          '900': '#394a1d',
          '950': '#1d280b',
        },
        alto: {
          DEFAULT: '#dddddd',
          '50': '#f7f7f7',
          '100': '#ededed',
          '200': '#dddddd', // DEFAULT
          '300': '#c8c8c8',
          '400': '#adadad',
          '500': '#999999',
          '600': '#888888',
          '700': '#7b7b7b',
          '800': '#676767',
          '900': '#545454',
          '950': '#363636',
        },
      },
      borderRadius: {
        inherit: 'inherit',
      },
      fontFamily: {
        silkscreen: 'Silkscreen',
      },
    },
  },
} satisfies Config
