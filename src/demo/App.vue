<template>
  <div ref="boardRef" class="demo">
    <div
      :style="{
        visibility: ready1 ? 'visible' : 'hidden',
      }"
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
  <ZoomDrag
    :zoomMin="0.1"
    @target-change="onTargetChange"
    @board-change="onBoardChange"
    class="demo"
    ref="comp"
  >
    <template #default="{ methods: { fitSize: fitSizeInner } }">
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
  <div v-zoom-drag="{ zoomMin: 0.1, onTargetChange, onBoardChange }" class="demo">
    <img src="/big.jpg" alt="img" @dragstart.prevent />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import type { useZoomDragOptions } from '@/lib/types'
// import type { useZoomDragOptions } from '../../dist'

import useZoomDrag from '@/lib/hooks/useZoomDrag'
// import { useZoomDrag } from '../../dist'
// import { useZoomDrag } from 'vue3-zoom-drag'

// src/main.ts 中 app.use 安装了
// import ZoomDrag from '@/lib/components/ZoomDrag.vue'
// import { ZoomDrag } from '../../dist'

const boardRef = ref<HTMLElement>()
const ready1 = ref(false)

const onTargetChange: useZoomDragOptions['onTargetChange'] = (info) => {
  console.log('target change', info)
}

const onBoardChange: useZoomDragOptions['onBoardChange'] = (info, methods) => {
  console.log('board change', info)
  methods.fitSize()
}

const {
  methods: { fitSize },
} = useZoomDrag({
  board: boardRef,
  zoomMin: 0.1,
  onTargetChange,
  onBoardChange,
})

const comp = ref()
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
  display: inline-block;
  width: calc(33.33% - 24px * 2 / 3);
  height: calc(100vh - 24px * 2);
  overflow: hidden;
  background-color: #fff;

  & + .demo {
    margin-left: 24px;
  }

  &::before {
    position: absolute;
    width: 100%;
    color: #999;
    font-size: 24px;
    text-align: center;
  }

  &:nth-of-type(1) {
    &::before {
      content: 'hook: useZoomDrag';
    }
  }

  &:nth-of-type(2) {
    &::before {
      content: 'component: ZoomDrag';
    }
  }

  &:nth-of-type(3) {
    &::before {
      content: 'directive: v-zoom-drag';
    }
  }
}
</style>
