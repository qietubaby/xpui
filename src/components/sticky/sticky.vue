<template>
  <div
    class="gulu-sticky-wrapper"
    ref="wrapper"
  >
    <div
      class="gulu-sticky"
      ref="wrapper"
      :class="classes"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sticky',
  data() {
    return {
      sticky: false
    }
  },
  mounted() {
    let { top } = this.top()

    window.addEventListener('scroll', () => {


      if (window.scrollY > top) {
        console.log('滚过了元素顶部')
        let { height } = this.height()


        this.$refs.wrapper.style.height = `${height}px`
        this.sticky = true
      } else {
        console.log('没有滚过了元素顶部')
        this.sticky = false
      }
    })
  },
  created() {

  },
  computed: {
    classes() {
      return {
        sticky: this.sticky
      }
    }
  },
  methods: {
    top() {
      let { top } = this.$refs.wrapper.getBoundingClientRect()
      return { top: top + window.scrollY }
    },
    height() {
      let { height } = this.$refs.wrapper.getBoundingClientRect()
      return { height }
    }
  }
}
</script>
<style scoped lang="scss">
.gulu-sticky {
  &.sticky {
    background: #f0f0f0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>


