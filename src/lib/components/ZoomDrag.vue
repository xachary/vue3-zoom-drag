<script setup lang="ts">
import { ref } from 'vue'
import useZoomDrag from '@/lib/hooks/useZoomDrag'
import type { useZoomDragOptions, ZoomDragSize, ZoomDragMethods } from '../types'

const props = withDefaults(
  defineProps<Pick<useZoomDragOptions, 'zoomSpeed' | 'zoomMax' | 'zoomMin' | 'padding'>>(),
  {
    zoomSpeed: () => 0.1,
    zoomMax: () => 3,
    zoomMin: () => 0.2,
  }
)

const boardRef = ref<HTMLElement>()

const { target, board, methods } = useZoomDrag({
  board: boardRef,
  zoomSpeed: props.zoomSpeed,
  zoomMax: props.zoomMax,
  zoomMin: props.zoomMin,
  padding: props.padding,
  //
  onReady: () => {
    emits('ready')
  },
  onTargetChange: (info: ZoomDragSize & { zoom: number }, methods: ZoomDragMethods) => {
    emits('target-change', info, methods)
  },
  onBoardChange: (info: ZoomDragSize, methods: ZoomDragMethods) => {
    emits('board-change', info, methods)
  },
})

const emits = defineEmits(['ready', 'target-change', 'board-change'])

defineExpose(methods)
</script>

<template>
  <div ref="boardRef">
    <slot
      v-bind="{
        target,
        board,
        methods,
      }"
    ></slot>
  </div>
</template>
