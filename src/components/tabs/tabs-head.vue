<template>
  <div class="tabs-head">
    <slot></slot>
    <div
      class="line"
      ref="line"
    ></div>

    <div class="setting-wrapper">
      <slot name="actions"></slot>
    </div>

  </div>
</template>
<script>
export default {
  name: 'GuluTabsHead',
  inject: ['eventBus'],
  mounted() {
    this.eventBus.$on('update:selected', (item, vm) => {
      let parentLeft = vm.$parent.$el.getBoundingClientRect().left
      let { width, left } = vm.$el.getBoundingClientRect()
      this.$refs.line.style.width = `${width}px`
      this.$refs.line.style.transform = `translateX(${left - parentLeft}px)`
    })
  }
}
</script>
<style lang="scss">
$tab-height: 40px;
$blue: #1890ff;
.tabs-head {
  display: flex;
  height: $tab-height;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #ddd;
  > .line {
    position: absolute;
    bottom: -1px;
    border-bottom: 2px solid $blue;
    transition: all 350ms;
  }
  .setting-wrapper {
    margin-left: auto;
  }
}
</style>
