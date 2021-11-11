<template>
  <div
    class="g-slides"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="g-slides-window" ref="window">
      <div class="g-slides-wrapper">
        <slot></slot>
      </div>

      <ul class="g-slides-dots" v-if="showNav">
        <li
          :key="n"
          v-for="n in childrenLength"
          @click="select(n - 1)"
          :class="{ active: selectedIndex === n - 1 }"
        >
          <span></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selected: {
      type: String,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      default: 'x',
    },
    showNav: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      childrenLength: 0,
      lastSelectedIndex: undefined,
      startTouch: {},
    }
  },
  mounted() {
    this.updateChildren()
    this.playAutomatically()
    this.childrenLength = this.items.length
    //   this.childrenLength = this.$children.filter(vm => vm.$options.name === 'GuluSlideItem').length;
  },
  updated() {
    this.updateChildren()
  },
  computed: {
    selectedIndex() {
      let index = this.names.indexOf(this.selected)
      return index === -1 ? 0 : index
    },
    names() {
      return this.items.map(vm => vm.name)
    },
    items() {
      return this.$children.filter(vm => vm.$options.name === 'GuluSlideItem')
    },
  },
  methods: {
    onMouseEnter() {
      this.pause()
    },
    onMouseLeave() {
      this.playAutomatically()
    },
    pause() {
      window.clearTimeout(this.timerId)
      this.timerId = undefined
    },
    onTouchStart(e) {
      this.pause()
      if (e.touches.length > 1) {
        return
      }
      this.startTouch = e.touches[0]
    },
    onTouchEnd(e) {
      let endTouch = e.changedTouches[0]
      let { clientX: x1, clientY: y1 } = this.startTouch
      let { clientX: x2, clientY: y2 } = endTouch

      // 如何判断用户没有在斜着滑
      // 30°的对角是斜角的一半  斜线的长度 = Math.sqrt((x2-x1)² + (y2-y1)²)  Math,sqrt开方
      let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

      // 对角线的长度
      let deltaY = Math.abs(y2 - y1)
      let rate = distance / deltaY
      // 30°的对角是斜角的一半，如果大于2说明用户可能没有斜着滑
      if (rate > 2) {
        if (x2 > x1) {
          this.select(this.selectedIndex - 1)
        } else {
          this.select(this.selectedIndex + 1)
        }
      }
      this.$nextTick(() => {
        this.playAutomatically()
      })
    },
    playAutomatically() {
      // setInterval(()=>{
      //   if(index === names.length) { index = 0 }
      //   this.$emit('update:selected',names[index + 1])
      //   index++
      // },1000)

      // 用setTimeout模拟 setInterval
      if (this.timerId) {
        return
      }

      let run = () => {
        let index = this.names.indexOf(this.getSelected())

        let newIndex = index + 1

        //this.$emit('update:selected',this.names[newIndex])
        this.select(this.names[newIndex])
        this.timerId = setTimeout(run, 3000)
      }
      this.timerId = setTimeout(run, 3000)
    },
    getSelected() {
      let first = this.$children[0]
      return this.selected || first.name
    },
    updateChildren() {
      let selected = this.getSelected()
      // console.log(this.lastSelectedIndex)
      // 让所有的子组件的selected 都变成一样
      this.$children.forEach(vm => {
        let reverse = this.selectedIndex > this.lastSelectedIndex ? false : true

        // 只有在定时器开启才去判断这个
        if (this.timerId) {
          if (
            this.lastSelectedIndex === this.$children.length - 1 &&
            this.selectedIndex === 0
          ) {
            reverse = false
          }
          if (
            this.lastSelectedIndex === 0 &&
            this.selectedIndex === this.$children.length - 1
          ) {
            reverse = true
          }
        }
        // 判断当前是正序还是倒序
        vm.reverse = reverse

        this.$nextTick(() => {
          vm.selected = selected
        })
      })
    },
    select(newIndex) {
      this.lastSelectedIndex = this.selectedIndex
      if (newIndex === -1) {
        newIndex = this.names.length - 1
      }
      if (newIndex === this.names.length) {
        newIndex = 0
      }

      this.$emit('update:selected', this.names[newIndex])
    },
  },
}
</script>
<style lang="scss" scoped>
.g-slides {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  &-wrapper {
    position: relative;
  }
  &-window {
    position: relative;
    text-align: center;
  }
  &-dots {
    position: absolute;
    z-index: 9999;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    line-height: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      display: inline-block;
      padding: 12px 4px;
      cursor: pointer;
      > span {
        display: block;
        opacity: 0.48;
        width: 30px;
        height: 2px;
        background-color: #fff;
        border: none;
        outline: none;
        margin: 0;
        cursor: pointer;
        transition: 0.3s;
      }
      &.active {
        span {
          opacity: 1;
          cursor: default;
        }
      }
    }
  }
}
</style>
