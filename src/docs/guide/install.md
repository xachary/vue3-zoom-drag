# 安装

```bash
pnpm i vue3-zoom-drag
```

## 全局安装

```ts
// src/main.ts

import { createApp } from 'vue'

import App from './demo/App.vue'

import ZoomDrag from 'vue3-zoom-drag'

const app = createApp(App)

app.use(ZoomDrag)

app.mount('#app')
```
