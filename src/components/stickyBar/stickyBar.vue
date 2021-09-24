<template>
  <div ref="protocol">
    <slot></slot>
  </div>
</template>
<script>
var _self = null
const resizeObserver = new ResizeObserver(() => {
  console.log(1)
  //e
  _self.handleScroll()
})
export default {
  data() {
    return {}
  },
  props: {
    distance: {
      type: Number,
      default: 0,
    },
    stickyElement: {
      type: String,
      default: '',
    },
  },
  watch: {
    distance() {
      this.handleScroll()
    },
  },
  created() {
    _self = this
    this.$nextTick(() => {
      this.handleScroll()
      resizeObserver.observe(document.body)
    })
  },
  computed: {
    footerSelector() {
      console.log(this.stickyElement)
      const element = this.stickyElement
      if (element) {
        if (element.charAt(0) !== '#') {
          return `.${element}`
        }
        return element
      }
      return ''
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) // 监听（绑定）滚轮滚动事件
    //window.addEventListener('resize', this.handleScroll) // 监听（绑定）滚轮滚动事件
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    //window.removeEventListener('resize', this.handleScroll)
    resizeObserver.disconnect()
  },
  methods: {
    // 计算高度
    handleScroll() {
      let cupping = null
      if (this.footerSelector) {
        cupping =
          window.innerHeight -
          document.querySelector(this.footerSelector).getBoundingClientRect()
            .top
      } else {
        cupping = this.distance
      }

      cupping = cupping < 0 ? 0 : cupping
      if (this.$refs.protocol) {
        this.$refs.protocol.style.bottom = `${cupping}px`
      }
    },
  },
}
</script>
