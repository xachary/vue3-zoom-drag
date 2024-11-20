import { type Ref, type ComputedRef } from 'vue'

export type useZoomDragOptions = {
  /**
   * 容器区域
   */
  board: Ref<HTMLElement | undefined> | ComputedRef<HTMLElement | undefined>
  /**
   * 目标区域
   */
  target?: Ref<HTMLElement | undefined> | ComputedRef<HTMLElement | undefined>
  /**
   * 容器大小变化事件
   * @param width 宽
   * @param height 高
   * @param left x
   * @param top y
   */
  onResize?: (width: number, height: number, left: number, top: number) => void
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
