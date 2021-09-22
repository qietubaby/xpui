<template>
  <div class="wrapper" :class="toastClasses">
    <div class="toast" ref="toast">
      <!-- <slot></slot> 可以使用slot，但是无法使用v-html所以更换方案 -->
      <slot v-if="!enableHtml"></slot>
      <div v-else v-html="$slots.default[0]"></div>
      <div class="line" ref="line"></div>
      <span class="close" v-if="closeButton" @click="onClickClose">
        {{ closeButton.text }}
      </span>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'
// Vue.prototype.$toast = function (a, b) {
//   console.log(a, b)
// }

// 并非组件本身，只是构建组件的选项
export default {
  name: 'gToast',
  props: {
    autoClose: {
      type: Boolean,
      default: true,
    },
    autoCloseDelay: {
      type: Number,
      default: 5,
    },
    closeButton: {
      type: Object,
      default: () => {
        return {
          text: '关闭',
          callback: undefined,
        }
      },
    },
    enableHtml: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'middle'].indexOf(value) >= 0
      },
    },
  },
  computed: {
    toastClasses() {
      return {
        [`position-${this.position}`]: true,
      }
    },
  },
  mounted() {
    if (this.autoClose) {
      setTimeout(() => {
        this.close()
      }, this.autoCloseDelay * 1000)
    }
    this.$nextTick(() => {
      this.$refs.line.style.height =
        this.$refs.toast.getBoundingClientRect().height + 'px'
    })
  },
  methods: {
    log() {
      console.log('测试')
    },
    close() {
      this.$el.remove()
      this.$emit('close')

      // 把一些绑定的事件什么的取消掉
      this.$destroy()
    },
    onClickClose() {
      this.close()
      if (this.closeButton && typeof this.closeButton.callback === 'function') {
        this.closeButton.callback(this) // this === toast实例
      }
    },
  },
}
</script>
<style lang="scss" scoped>
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
$animation-duration: 1s;
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.wrapper {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  &.position-top {
    top: 0;
    .toast {
      animation: slide-down $animation-duration;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
  &.position-bottom {
    bottom: 0;
    .toast {
      animation: slide-up $animation-duration;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &.position-middle {
    top: 50%;
    transform: translate(-50%, -50%);
    .toast {
      animation: fade-in $animation-duration;
    }
  }
}
.toast {
  font-size: $font-size;
  min-height: $toast-min-height;
  line-height: 1.8;

  display: flex;
  color: white;
  align-items: center;
  background: $toast-bg;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  padding: 0 16px;
  z-index: 999;
  .close {
    padding-left: 16px;
    flex-shrink: 0;
    cursor: pointer;
  }
  .line {
    height: 100%;
    margin-left: 16px;
    border-left: 1px solid #666;
  }
}
</style>
