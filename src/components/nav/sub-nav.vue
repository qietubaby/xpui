<template>
  <div class="g-sub-nav" :class="{active}" v-click-outside="close">
    <span class="g-sub-nav-label" @click="onClick">
      <slot name="title"></slot>
      <span class="g-sub-nav-icon" :class="{open}">
        <g-icon name="right"></g-icon>
      </span>
    </span>
    <div class="g-sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import GIcon from "../icon/icon";
import ClickOutside from '@/click-outside.js'
export default {
  components: { GIcon },
  directives: {
    ClickOutside
  },
  name: "GuluSubNav",
  inject: ["root"],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    active() {
      // 如果子元素被选中了那么它的父级也应该加个标记 
      return this.root.namePath.indexOf(this.name) >= 0 ? true : false
    }
  },
  methods: {
    onClick() {
      this.open = !this.open;
    },
    close() {
      this.open = false
    },
    updateNamePath() {
      this.root.namePath.unshift(this.name)
      if (this.$parent.updateNamePath) {
        this.$parent.updateNamePath();
      } else {
        //this.root.namePath = []
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/var.scss";
.g-sub-nav {
  position: relative;
  &.active {
    &::after {
      content:'';
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom: 2px solid $blue;
      width: 100%;
    }
  }

  &-label {
    padding: 10px 20px;
    display: block;
    cursor: pointer;
  }
  &-icon {
    display: none;
  }
  &-popover {
    background-color: white;
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 1px;
    white-space: nowrap;
    box-shadow: 0 0 3px fade_out(black, 0.8);
    border-radius: $border-radius;
    font-size: $font-size;
    min-width: 8em;
    color: $light-color;
  }
}
.g-sub-nav .g-sub-nav {
  &.active {
    &::after {
      display: none;
    }
  }
  .g-sub-nav-popover {
    top: 0;
    left: 100%;
    margin-left: 8px;
  }
  .g-sub-nav-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:10px 10px 10px 20px;
  }
  .g-sub-nav-icon {
    display: inline-flex;
    svg {fill: $light-color;}
    transition: transform 250ms;
    
    &.open {
      transform: rotate(180deg)
    }
  }
}
</style>
