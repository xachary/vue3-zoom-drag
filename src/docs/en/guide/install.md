# Install

```bash
pnpm i vue3-zoom-drag
```

## Global install

```ts
// src/main.ts

import { createApp } from 'vue'

import App from './demo/App.vue'

import ZoomDrag from 'vue3-zoom-drag'

const app = createApp(App)

app.use(ZoomDrag)

app.mount('#app')
```
