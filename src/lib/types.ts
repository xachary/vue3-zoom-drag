import { type Ref } from 'vue'

export interface ZoomDragSize {
  width: number
  height: number
  left: number
  top: number
}

export type ZoomDragMethods = {
  fitSize: (animate?: boolean) => void
}

export type useZoomDragOptions = {
  /**
   * 容器区域
   */
  board: Ref<HTMLElement | undefined>
  /**
   * 目标区域
   */
  target?: Ref<HTMLElement | undefined>
  /**
   * 目标变化事件
   */
  onTargetChange?: (info: ZoomDragSize & { zoom: number }, methods: ZoomDragMethods) => void
  /**
   * 容器大小变化事件
   */
  onBoardChange?: (info: ZoomDragSize, methods: ZoomDragMethods) => void
  /**
   * 初始化完成事件
   */
  onReady?: () => void
  /**
   * 放大缩小速率（默认 0.1）
   */
  zoomSpeed?: number
  /**
   * 最高放大倍速（默认 3）
   */
  zoomMax?: number
  /**
   * 最低缩小倍速（默认 0.2）
   */
  zoomMin?: number
  /**
   * 内边距
   */
  padding?: [number, number, number, number]
}
