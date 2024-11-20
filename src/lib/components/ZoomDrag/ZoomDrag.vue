<script setup lang="ts">
import { ref } from 'vue'
import { useZoomDrag } from '@/lib/hooks/useZoomDrag'
import type { useZoomDragOptions } from '../../types'

const props = withDefaults(
  defineProps<Pick<useZoomDragOptions, 'zoomSpeed' | 'zoomMax' | 'zoomMin' | 'padding'>>(),
  {
    zoomSpeed: () => 0.1,
    zoomMax: () => 3,
    zoomMin: () => 0.2,
  }
)

const board = ref<HTMLElement>()

const { zoom, left, top, fitSize } = useZoomDrag({
  board,
  zoomSpeed: props.zoomSpeed,
  zoomMax: props.zoomMax,
  zoomMin: props.zoomMin,
  padding: props.padding,
  //
  onReady: () => {
    emits('ready')
  },
  onResize: (width: number, height: number, left: number, top: number) => {
    emits('resize', width, height, left, top)
  },
})

const emits = defineEmits(['ready', 'resize'])
</script>

<template>
  <div ref="board">
    <slot
      v-bind="{
        zoom,
        left,
        top,
        fitSize,
      }"
    ></slot>
  </div>
</template>
