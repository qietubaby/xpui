<template>
  <div class="g-nav-item" :class="{selected}" @click="onClick">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "NavItem",
  inject: ["root"],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: false
    };
  },
  created() {
    // 一上来把所有的子元素加到根上
    this.root.addItem(this);
  },
  methods: {
    onClick() {
      this.root.namePath = []
      this.$parent.updateNamePath && this.$parent.updateNamePath()
      this.$emit("add:selected", this.name)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var.scss";
.g-nav-item {
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  &.selected {
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom: 2px solid $blue;
      width: 100%;
    }
  }
  
}

.g-sub-nav .g-nav-item {
  color: $light-color;
  &.selected {
    color: $color;
    background: $gray;
    &::after {
      display: none;
    }
  }
}
</style>
