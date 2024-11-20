<template>
  <div class="demo" ref="board">
    <div
      :style="{
        visibility: ready1 ? 'visible' : 'hidden',
      }"
      ref="target"
    >
      <img
        src="/big.jpg"
        alt="img"
        @dragstart.prevent
        @load="
          () => {
            ready1 = true
            fitSize()
          }
        "
      />
    </div>
  </div>
  <ZoomDrag class="demo">
    <template #default="{ fitSize: fitSizeInner }">
      <div :style="{ visibility: ready2 ? 'visible' : 'hidden' }">
        <img
          src="/big.jpg"
          alt="img"
          @dragstart.prevent
          @load="
            () => {
              ready2 = true
              fitSizeInner()
            }
          "
        />
      </div>
    </template>
  </ZoomDrag>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { useZoomDrag } from '@/lib/hooks/useZoomDrag'

import { ZoomDrag } from '@/lib/components/ZoomDrag'

const board = ref<HTMLElement>()
const target = ref<HTMLElement>()
const ready1 = ref(false)

const { fitSize } = useZoomDrag({
  board,
  target,
  zoomSpeed: 0.05,
})

const ready2 = ref(false)
</script>

<style lang="less">
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
</style>

<style lang="less">
body {
  padding: 24px;
  background-color: #ddd;
}

.demo {
  height: calc(50vh - 24px * 3 / 2);
  background-color: #fff;

  & + .demo {
    margin-top: 24px;
  }
}
</style>
