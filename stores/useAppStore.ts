interface State {
  device: 'desktop' | 'mobile' | null
}

export const useAppStore = defineStore('appStore', {
  state: (): State => ({
    device: null,
  }),
  getters: {
    isDesktop: (state) => state.device === 'desktop',
  },
})
