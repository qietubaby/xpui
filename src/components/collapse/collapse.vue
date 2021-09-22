<template>
  <div class="collapse">
    <slot :single="single"></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'GuluCollapse',
  props: {
    single: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
    },
  },
  data() {
    return {
      eventBus: new Vue(),
    }
  },
  provide() {
    return {
      eventBus: this.eventBus,
    }
  },
  mounted() {
    // 这里是通知eventbus  再由eventbus 通知给三个子组件
    this.eventBus.$emit('update:selected', this.selected)

    this.eventBus.$on('update:addSelected', name => {
      let selectedCopy = JSON.parse(JSON.stringify(this.selected))

      if (this.single) {
        selectedCopy = [name]
        this.eventBus.$emit('update:selected', selectedCopy)
      } else {
        this.eventBus.$emit('update:selected', name)
      }

      // this.$emit('update:selected', selectedCopy)
    })
    this.eventBus.$on('update:removeSelected', name => {
      //let selectedCopy = JSON.parse(JSON.stringify(this.selected))
      //let index = selectedCopy.indexOf(name)

      if (this.single) {
        this.eventBus.$emit('update:selected', name)
      } else {
        this.eventBus.$emit('update:selected', name)
      }
      // this.$emit('update:selected', selectedCopy)
    })
  },
}
</script>

<style scoped lang="scss">
$grey: #ddd;
$border-radius: 4px;
.collapse {
  border: 1px solid $grey;
  border-radius: $border-radius;
}
</style>
