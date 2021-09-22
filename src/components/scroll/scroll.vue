<!--  -->
<template>
  <div
    ref="parent"
    class="gulu-scroll-wrapper"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @wheel="onWheel"
  >
    <div
      ref="child"
      class="gulu-scroll"
      :style="{transform:`translateY(${this.contentY}px)`}"
    >
      <slot></slot>
    </div>
    <div
      class="gulu-scroll-track"
      v-show="scrollBarVisible"
    >
      <div
        class="gulu-scroll-bar"
        ref="bar"
        @mousedown="onMouseDownScrollBar"
        @selecstart="onSelectStartScrollBar"
      >
        <div class="gulu-scroll-bar-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuluScroll',
  data() {
    return {
      scrollBarVisible: true,
      isScrolling: false,
      startPosition: undefined,
      endPosition: undefined,
      scrollBarY: 0,
      parentHeight: undefined,
      childHeight: undefined,
      barHeight: undefined,
      contentY: 0
    }
  },
  beforeDestroy() {
    // 移除 document 事件监听
  },
  mounted() {

    document.addEventListener('mousemove', (e) => {
      this.onMouseMoveScrollBar(e)
    })

    document.addEventListener('mouseup', (e) => {
      this.onMouseUpScrollBar(e)
    })
    let parent = this.$refs.parent
    let child = this.$refs.child
    this.parentHeight = parent.getBoundingClientRect().height
    this.childHeight = child.getBoundingClientRect().height

    this.updateScrollBar()
  },
  methods: {
    onWheel(e) {
      //获取 maxHeight，用于限制 contentY
      let maxHeight = this.calculateContentYMax()

      // 获取contentY初始值
      if (e.deltaY > 20) {
        this.contentY -= 20 * 3
      } else if (e.deltaY < -20) {
        this.contentY -= -20 * 3
      } else {
        this.contentY -= e.deltaY * 3
      }

      // 对contentY加限制
      if (this.contentY > 0) {
        this.contentY = 0
      } else if (this.contentY < -maxHeight) {
        this.contentY = -maxHeight
      } else {
        // 滚动中
        e.preventDefault()
      }
      // child.style.transform = `translateY(${this.contentY}px)`
      this.updateScrollBar()

    },
    calculateContentYMax() {
      //获取 maxHeight，用于限制 contentY
      let { borderTopWidth, borderBottomWidth, paddingTop, paddingBottom } = window.getComputedStyle(this.$refs.parent)
      borderTopWidth = parseInt(borderTopWidth)
      borderBottomWidth = parseInt(borderBottomWidth)
      paddingTop = parseInt(paddingTop)
      paddingBottom = parseInt(paddingBottom)
      let maxHeight = this.childHeight - this.parentHeight + (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom)
      return maxHeight
    },
    updateScrollBar() {
      let translateY = this.contentY
      let parentHeight = this.parentHeight
      let childHeight = this.childHeight

      this.barHeight = parentHeight * parentHeight / childHeight
      let bar = this.$refs.bar
      bar.style.height = this.barHeight + 'px'
      let y = parentHeight * translateY / childHeight
      bar.style.transform = `translateY(${-y}px)`
      this.scrollBarY = -y
    },
    onMouseEnter() {
      this.scrollBarVisible = true
    },
    onMouseLeave() {
      this.scrollBarVisible = false
    },
    onMouseDownScrollBar(e) {
      this.isScrolling = true
      let { screenX, screenY } = e
      this.startPosition = { x: screenX, y: screenY }
    },
    onMouseMoveScrollBar(e) {
      if (!this.isScrolling) { return }
      let { screenX, screenY } = e
      this.endPosition = { x: screenX, y: screenY }
      let delta = { x: this.endPosition.x - this.startPosition.x, y: this.endPosition.y - this.startPosition.y }
      // this.translateX = parseInt(this.translateX) + delta.x
      this.scrollBarY = parseInt(this.scrollBarY) + delta.y
      let maxScrollHeight = this.parentHeight - this.barHeight
      if (this.scrollBarY < 0) {
        this.scrollBarY = 0
      } else if (this.scrollBarY > maxScrollHeight) {
        this.scrollBarY = maxScrollHeight
      }

      // 滑动滚动条改变内容的translateY
      this.contentY = -(this.childHeight * this.scrollBarY / this.parentHeight)

      this.startPosition = this.endPosition
      this.$refs.bar.style.transform = `translate(0px, ${this.scrollBarY}px)`



    },
    onMouseUpScrollBar() {
      this.isScrolling = false
    },
    onSelectStartScrollBar(e) {
      e.preventDefault()
    }
  }
}

</script>
<style lang="scss" scoped>
.gulu-scroll {
  transition: transform 0.05s ease;
  &-wrapper {
    overflow: hidden;
    position: relative;
  }
  &-track {
    position: absolute;
    top: 0;
    width: 10px;
    right: 0;
    height: 100%;
    width: 14px;
    background: #fafafa;
    border-left: 1px solid #e8e7e8;
    opacity: 0.9;
  }
  &-bar {
    position: absolute;
    top: -1px;
    left: 50%;
    height: 40px;
    width: 8px;
    padding: 4px 0;

    margin-left: -4px;

    &-inner {
      height: 100%;
      border-radius: 4px;
      background: #c2c2c2;
      &:hover {
        background: #7d7d7d;
      }
    }
  }
}
</style>