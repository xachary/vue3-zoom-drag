import { ref, type Ref, reactive, watch } from 'vue'

import type { useZoomDragOptions, ZoomDragMethods, ZoomDragSize } from '../types'

const DefaultOptions: Partial<useZoomDragOptions> = {
  zoomSpeed: 0.1,
  zoomMax: 10,
  zoomMin: 0.2,
  padding: [0, 0, 0, 0],
}

export default function useZoomDrag(opts: useZoomDragOptions): {
  target: Ref<ZoomDragSize & { zoom: number }>
  board: Ref<ZoomDragSize>
  methods: ZoomDragMethods
} {
  const options = { ...DefaultOptions, ...opts }

  // 状态值
  const state = reactive({
    lastLeft: 0, // 上次的left
    lastTop: 0, // 上次的top
    overX: 0, // 鼠标移动坐标x
    overY: 0, // 鼠标移动坐标y
    boardLeft: 0, // 容器区域距离浏览器左边距离
    boardTop: 0, // 容器区域距离浏览器上边距离

    startX: 0, // 长按开始坐标x
    startY: 0, // 长按开始坐标y
    isDown: false, // 鼠标是否长按中
    moveX: 0, // 长按移动坐标x
    moveY: 0, // 长按移动坐标y

    boardWidth: 0, // 容器区域宽
    boardHeight: 0, // 容器区高
    targetWidth: 0, // 目标区域宽
    targetHeight: 0, // 目标区域高
  })

  const zoom = ref<number>(0)
  const left = ref<number>(0)
  const top = ref<number>(0)

  const targetInfoRef: Ref<ZoomDragSize & { zoom: number }> = ref({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    zoom: 1,
  })
  const boardInfoRef: Ref<ZoomDragSize> = ref({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  })

  function getTarget() {
    if (options.target === void 0) {
      if (options.board.value !== void 0) {
        return options.board.value.children[0] as HTMLElement
      }
    }

    return options.target?.value
  }

  function updateTargetStyle() {
    const target = getTarget()

    if (target) {
      target.style.transform = `scale(${zoom.value + 1})`
      target.style.left = `${left.value}px`
      target.style.top = `${top.value}px`

      targetInfoRef.value = {
        width: Math.round(state.targetWidth * (zoom.value + 1)),
        height: Math.round(state.targetHeight * (zoom.value + 1)),
        left: left.value,
        top: top.value,
        zoom: zoom.value,
      }

      options.onTargetChange && options.onTargetChange(targetInfoRef.value, { fitSize })
    }
  }

  // 自适应大小
  async function fitSize(animate = false) {
    const target = getTarget()
    if (options.board.value && target) {
      // 记录容器、目标大小
      ;[state.boardWidth, state.boardHeight, state.boardLeft, state.boardTop] = await getSize(
        options.board.value
      )
      ;[state.targetWidth, state.targetHeight] = await getSize(target)
      //

      if (animate) {
        target.style.transition = 'all 0.3s ease-in'
      }

      const rateBoard = state.boardWidth / state.boardHeight
      const rateTarget = state.targetWidth / state.targetHeight

      const [boardWidth, boardHeight] = [
        state.boardWidth - (options.padding?.[1] ?? 0) - (options.padding?.[3] ?? 0),
        state.boardHeight - (options.padding?.[0] ?? 0) - (options.padding?.[2] ?? 0),
      ]

      if (rateBoard > rateTarget) {
        zoom.value = boardHeight / state.targetHeight - 1
      } else if (rateBoard < rateTarget) {
        zoom.value = boardWidth / state.targetWidth - 1
      }

      zoom.value = Math.floor(zoom.value * 100) / 100

      if (zoom.value > 0) {
        zoom.value = 0
      }
      left.value = Math.round(
        (boardWidth - state.targetWidth * (1 + zoom.value)) / 2 + (options.padding?.[3] ?? 0)
      )
      top.value = Math.round(
        (boardHeight - state.targetHeight * (1 + zoom.value)) / 2 + (options.padding?.[0] ?? 0)
      )
      state.lastLeft = left.value
      state.lastTop = top.value

      updateTargetStyle()

      if (animate) {
        setTimeout(() => {
          if (target) {
            target.style.transition = 'none'
          }
        }, 300)
      }
    }
  }

  // 放大缩小
  function changeZoom(value: number) {
    const target = getTarget()

    if (options.board.value && target) {
      const lastTargetWidth = state.targetWidth * (1 + zoom.value)
      const lastTargetHeight = state.targetHeight * (1 + zoom.value)
      const lastOffsetX = state.overX - state.lastLeft - state.boardLeft
      const lastOffsetY = state.overY - state.lastTop - state.boardTop
      const rateX = lastOffsetX / lastTargetWidth
      const rateY = lastOffsetY / lastTargetHeight

      zoom.value += value
      zoom.value = Math.round(zoom.value * 100) / 100

      const newTargetWidth = state.targetWidth * (1 + zoom.value)
      const newTargetHeight = state.targetHeight * (1 + zoom.value)

      const newSpanX = newTargetWidth * rateX - lastOffsetX
      const newSpanY = newTargetHeight * rateY - lastOffsetY

      left.value = Math.round(state.lastLeft - newSpanX)
      top.value = Math.round(state.lastTop - newSpanY)
      state.lastLeft = left.value
      state.lastTop = top.value

      updateTargetStyle()
    }
  }

  // 获取元素大小
  async function getSize(ele: HTMLElement | undefined): Promise<[number, number, number, number]> {
    function inner(resolve: (res: [number, number, number, number]) => void) {
      if (ele) {
        const { left, top } = ele.getBoundingClientRect()
        const [width, height] = [ele.clientWidth, ele.clientHeight]
        resolve([width, height, left, top])
      } else {
        resolve([0, 0, 0, 0])
      }
    }
    return new Promise((resolve) => {
      if (ele) {
        if (ele instanceof HTMLImageElement) {
          if (ele.complete) {
            inner(resolve)
          } else {
            ele.onload = () => {
              inner(resolve)
            }
          }
        } else {
          inner(resolve)
        }
      } else {
        resolve([0, 0, 0, 0])
      }
    })
  }

  const eventHandlers = {
    zoom: (e: WheelEvent) => {
      if (e.deltaY < 0) {
        if (zoom.value <= options.zoomMax! - options.zoomSpeed!) {
          changeZoom(options.zoomSpeed!)
        }
      } else if (e.deltaY > 0) {
        if (zoom.value >= options.zoomMin! - 1 + options.zoomSpeed!) {
          changeZoom(-options.zoomSpeed!)
        }
      }

      e.preventDefault()
    },
    contextmenu: (e: MouseEvent) => {
      e.preventDefault()
    },
    dragStart: (e: MouseEvent) => {
      if (e.button === 0) {
        state.startX = e.clientX
        state.startY = e.clientY
        state.isDown = true
      }
    },
    dragMove: (e: MouseEvent) => {
      state.overX = e.clientX
      state.overY = e.clientY
      if (state.isDown) {
        state.moveX = e.clientX
        state.moveY = e.clientY
        left.value = Math.round(state.lastLeft + state.moveX - state.startX)
        top.value = Math.round(state.lastTop + state.moveY - state.startY)

        updateTargetStyle()
      }
    },
    dragEnd: () => {
      state.isDown = false
      state.lastLeft = left.value
      state.lastTop = top.value
    },
  }

  // 事件处理
  function eventHandle() {
    const target = getTarget()

    if (options.board.value && target) {
      options.board.value.addEventListener('wheel', eventHandlers.zoom)
      //
      options.board.value.addEventListener('mousedown', eventHandlers.dragStart)
      options.board.value.addEventListener('mousemove', eventHandlers.dragMove)
      options.board.value.addEventListener('mouseup', eventHandlers.dragEnd)
      options.board.value.addEventListener('mouseleave', eventHandlers.dragEnd)
      //
      options.board.value.addEventListener('contextmenu', eventHandlers.contextmenu)
      //
      const resizeObserver = new ResizeObserver(async () => {
        ;[state.boardWidth, state.boardHeight, state.boardLeft, state.boardTop] = await getSize(
          options.board.value
        )

        boardInfoRef.value = {
          width: state.boardWidth,
          height: state.boardHeight,
          left: state.boardLeft,
          top: state.boardTop,
        }

        options.onBoardChange && options.onBoardChange(boardInfoRef.value, { fitSize })
      })
      resizeObserver.observe(options.board.value)
    }
  }

  // 切换鼠标 cursor
  watch(
    () => state.isDown,
    () => {
      options.board.value &&
        (options.board.value.style.cursor = state.isDown ? 'pointer' : 'default')
    }
  )

  // 容器区域必须样式
  function boardStyle() {
    if (options.board.value) {
      const boardComputedStyle = getComputedStyle(options.board.value)
      options.board.value.style.overflow = 'hidden'
      options.board.value.style.userSelect = 'none'
      if (!['absolute', 'relative', 'fixed'].includes(boardComputedStyle.position)) {
        options.board.value.style.position = 'relative'
      }
    }
  }

  // 目标区域必须样式
  function targetStyle() {
    const target = getTarget()

    if (target) {
      target.style.position = 'absolute'
      target.style.transform = 'scale(1)'
      target.style.transformOrigin = '0 0'
      target.style.userSelect = 'none'
      target.draggable = false
    }
  }

  watch(
    () => [options.board.value, options.target?.value],
    async () => {
      const target = getTarget()

      if (options.board.value && target) {
        // 必须样式
        boardStyle()
        targetStyle()
        // 事件控制
        eventHandle()
        //
        await fitSize()

        // 初始化完成
        options.onReady && options.onReady()
      }
    },
    {
      immediate: true,
    }
  )

  return {
    target: targetInfoRef,
    board: boardInfoRef,
    methods: { fitSize },
  }
}
