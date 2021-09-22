<template>
  <div class="tabs">
    <slot></slot>
    <slot name="actions"></slot>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'GuluTabs',
  props: {
    selected: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) >= 0
      }
    }
  },
  data() {
    return {
      eventBus: new Vue()
    }
  },
  provide() {
    return {
      eventBus: this.eventBus
    }
  },
  created() {

    // this.$emit('update:selected','xxx')
  },
  mounted() {
    
    // created是父组件先执行  mounted是子组件先执行

    // 只有在mounted里所有子组件才挂载完毕
    // this.eventBus.$emit('update:selected','这是 this eventBus $emit 出来的数据')
    // 传递childvm的作用在于 在 tabs-head中需要使用childvm的位置
    this.$children.forEach((vm) => {
      if (vm.$options.name === 'GuluTabsHead') {
        vm.$children.forEach((childvm) => {
          if (childvm.$options.name === 'GuluTabsItem' && childvm.name === this.selected) {
            this.eventBus.$emit('update:selected', this.selected, childvm)
          }
        })
      }
    })

  }
}
</script>