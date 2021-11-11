<template>
  <span :class="`gtag gtag-${type}`">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.gtag {
  box-sizing: border-box;
  height: 22px;
  padding: 0 4px;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  font-size: 12px;
  line-height: 20px;
  color: #2c68ff;
  white-space: nowrap;
  &-success {
    border-color: #bef7e5;
    color: #0ed57d;
    background-color: #f2fffb;
  }
  &-warning {
    border-color: #fff0c2;
    color: #ff9c00;
    background-color: #fffcf2;
  }
  &-danger {
    border-color: #ffccd7;
    color: #f52f3e;
    background-color: #fff2f5;
  }
}
</style>
