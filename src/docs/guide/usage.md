# 使用

## Hook

```html
<template>
  <div ref="board" class="demo">
    <div>Somethings</div>
  </div>
</template>
```

```ts
// 页面

import { ref } from 'vue'

import { useZoomDrag } from 'vue3-zoom-drag'

const board = ref<HTMLElement>()

useZoomDrag({
  board,
  zoomMin: 0.1,
})
```

## Component

```html
<template>
  <ZoomDrag :zoomMin="0.1" class="demo">
    <div>Somethings</div>
  </ZoomDrag>
</template>
```

```ts
// 页面

import { ZoomDrag } from 'vue3-zoom-drag'
```

## Directive

```html
<template>
  <div v-zoom-drag="{ zoomMin: 0.1 }" class="demo">
    <div>Somethings</div>
  </div>
</template>
```

```ts
// 全局安装

// src/main.ts

import { createApp } from 'vue'

import App from './demo/App.vue'

import ZoomDrag from 'vue3-zoom-drag'

const app = createApp(App)

app.use(ZoomDrag)

app.mount('#app')
```

# 示例样式

```less
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}

body {
  min-height: 100vh;
  transition:
    color 0.5s,
    background-color 0.5s;
  background: var(--color-background);
  color: var(--color-text);
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  text-rendering: optimizelegibility;
}

body {
  padding: 24px;
  background-color: #ddd;
}

.demo {
  display: inline-block;
  width: 100%;
  height: calc(100vh - 24px * 2);
  overflow: hidden;
  background-color: #fff;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 300px;
    background: yellow;
  }
}
```
