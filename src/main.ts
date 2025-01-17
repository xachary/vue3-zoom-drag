import { createApp } from 'vue'
import App from './demo/App.vue'

import ZoomDrag from '@/lib'

import { logArray } from './log'

const {
  lastBuildTime,
  git: { branch, tag, hash },
} = __BUILD_INFO__

logArray(['branch', branch])
logArray(['tag', tag])
logArray(['hash', hash])
logArray(['build', lastBuildTime])

const app = createApp(App)

app.use(ZoomDrag)

app.mount('#app')
