<template>
  <div class="popover" ref="popover">
    <!-- @click="onClick"  -->
    <div
      ref="contentWrapper"
      class="content-wrapper"
      :class="{ [`position-${position}`]: true }"
      v-if="visible"
    >
      <slot name="content" :close="close"></slot>
    </div>
    <span ref="triggerWrapper" style="display:inline-block;">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'GulePopover',
  props: {
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
      },
    },
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return ['click', 'hover'].indexOf(value) >= 0
      },
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  mounted() {
    if (this.trigger === 'click') {
      this.$refs.popover.addEventListener('click', this.onClick)
    } else {
      this.$refs.popover.addEventListener('mouseenter', this.open)
      this.$refs.popover.addEventListener('mouseleave', this.close)
    }
  },
  beforeDestroyed() {
    if (this.trigger === 'click') {
      this.$refs.popover.removeEventListener('click', this.onClick)
    } else {
      this.$refs.popover.removeEventListener('mouseenter', this.open)
      this.$refs.popover.removeEventListener('mouseleave', this.close)
    }
  },
  computed: {
    openEvent() {
      if (this.trigger === 'click') {
        return 'click'
      } else {
        return 'mouseenter'
      }
    },
    closeEvent() {
      if (this.trigger === 'click') {
        return 'click'
      } else {
        return 'mouseleave'
      }
    },
  },

  methods: {
    positionContent() {
      const { contentWrapper, triggerWrapper } = this.$refs
      document.body.appendChild(contentWrapper)

      let { height: height2 } = contentWrapper.getBoundingClientRect()
      let { width, height, top, left } = triggerWrapper.getBoundingClientRect()
      let x = {
        top: {
          top: top + window.scrollY,
          left: left + window.scrollX,
        },
        bottom: {
          top: top + height + window.scrollY,
          left: left + window.scrollX,
        },
        left: {
          top: top + window.scrollY + (height - height2) / 2,
          left: left + window.scrollX,
        },
        right: {
          top: top + window.scrollY + (height - height2) / 2,
          left: left + window.scrollX + width + 10,
        },
      }
      contentWrapper.style.left = x[this.position].left + 'px'
      contentWrapper.style.top = x[this.position].top + 'px'
    },
    eventHandler(e) {
      // 排除掉按钮本身和弹出框，证明用户点击的是document
      if (
        this.$refs.popover &&
        (this.$refs.popover === e.target ||
          this.$refs.popover.contains(e.target))
      ) {
        return
      }
      if (
        this.$refs.contentWrapper &&
        (this.$refs.contentWrapper === e.target ||
          this.$refs.contentWrapper.contains(e.target))
      ) {
        return
      }
      this.close()
    },
    listenToDocument() {
      // 给document添加点击事件
      document.addEventListener('click', this.eventHandler)
    },
    open() {
      this.visible = true
      this.$emit('open')
      setTimeout(() => {
        this.positionContent()
        this.listenToDocument()
      }, 1)
    },
    close() {
      this.visible = false
      this.$emit('close')
      document.removeEventListener('click', this.eventHandler)
    },
    onClick(event) {
      if (this.$refs.triggerWrapper.contains(event.target)) {
        if (this.visible === true) {
          this.close()
        } else {
          this.open()
        }
      }
    },
  },
}
</script>
<style scoped lang="scss">
$border-color: #ebeef5;
$border-radius: 4px;
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper {
  position: absolute;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  // box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.1));
  background-color: #fff;
  padding: 0.5em 1em;
  max-width: 20em;
  word-break: break-all;

  &::before,
  &::after {
    content: '';
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
  }
  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before,
    &::after {
      left: 10px;
      border-bottom: none;
    }

    &::before {
      top: 100%;
      border-top-color: $border-color;
    }
    &::after {
      border-top-color: white;
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before,
    &::after {
      left: 10px;
    }
    &::before {
      border-top: none; // 解决hover状态下，弹出框闪动问题
      border-bottom-color: $border-color;
      bottom: 100%;
    }
    &::after {
      border-top: none;
      border-bottom-color: white;
      bottom: calc(100% - 1px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before,
    &::after {
      top: 50%;
      transform: translateY(-50%);
      border-right: none;
    }
    &::before {
      border-left-color: $border-color;
      left: 100%;
    }
    &::after {
      border-left-color: white;
      left: calc(100% - 1px);
    }
  }
  &.position-right {
    &::before,
    &::after {
      top: 50%;
      transform: translateY(-50%);
      border-left: none;
    }
    &::before {
      border-right-color: $border-color;
      left: -11px;
    }
    &::after {
      border-right-color: white;
      left: -10px;
    }
  }
}
</style>
