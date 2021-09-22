<template>
  <transition name="slide">
    <div class="g-slides-item" v-if="visible" :class="{ reverse }">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'GuluSlideItem',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: undefined,
      reverse: true,
    }
  },
  computed: {
    visible() {
      // selected 总是在变
      return this.selected === this.name
    },
  },
}
</script>
<style lang="scss" scoped>
.slide-leave-active {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  background: red !important;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter.reverse {
  transform: translateX(-100%);
}
.slide-leave-to.reverse {
  transform: translateX(100%);
}
</style>
