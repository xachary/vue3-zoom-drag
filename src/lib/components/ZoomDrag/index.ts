import { ref, type App } from 'vue'

import ZoomDrag from './ZoomDrag.vue'
import { useZoomDrag } from '@/lib/hooks/useZoomDrag'

export * from '../../types'

export { ZoomDrag }

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
