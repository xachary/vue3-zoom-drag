import { ref, type App } from 'vue'
import ZoomDrag from './components/ZoomDrag.vue'
import useZoomDrag from './hooks/useZoomDrag'

export * from './types'

export default {
  install(app: App) {
    app.component('ZoomDrag', ZoomDrag)

    app.directive('zoom-drag', {
      mounted: (el, { value }) => {
        useZoomDrag({
          ...value,
          board: ref(el),
        })
      },
    })
  },
}

export { ZoomDrag, useZoomDrag }
