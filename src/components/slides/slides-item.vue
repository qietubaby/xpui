<template>
  <transition :name="directionName">
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
    directionName() {
      if (this.$parent.direction === 'x') {
        return 'slide'
      } else {
        return 'slidey'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.slide-leave-active,
.slidey-leave-active {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.slide-enter-active,
.slide-leave-active,
.slidey-enter-active,
.slidey-leave-active {
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
/*Y*/
.slidey-enter {
  transform: translateY(100%);
}
.slidey-leave-to {
  transform: translateY(-100%);
}
.slidey-enter.reverse {
  transform: translateY(-100%);
}
.slidey-leave-to.reverse {
  transform: translateY(100%);
}
</style>
