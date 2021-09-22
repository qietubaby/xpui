<template>
  <!-- @click="$emit('click')" -->
  <button
    class="g-button"
    :class="{ [`icon-${iconPosition}`]: true, ['is-disabled']: disabled }"
    @click="clickHandle"
  >
    <g-icon class="icon" v-if="icon && !loading" :name="icon"></g-icon>
    <g-icon name="loading" v-if="loading" class="loading icon"></g-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>
<script>
import Icon from '../icon/icon'
export default {
  components: {
    gIcon: Icon,
  },
  props: {
    icon: {},
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconPosition: {
      typoe: String,
      default: 'left',
      validator(value) {
        // 属性检查器 验证iconPosition是否为'left'或者'right'

        // if(value !=='left' && value !== 'right') {
        //   return false;
        // } else {
        //   return true
        // }

        // 简化后
        // return !(value !=='left' && value !== 'right');

        // 简化后
        return value === 'left' || value === 'right'
      },
    },
  },
  methods: {
    clickHandle() {
      if (!this.disabled) {
        this.$emit('click')
      } else {
        return
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/var.scss';
.g-button {
  font-size: $font-size;
  line-height: $font-size;
  height: $button-height;
  padding: 0 1em;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  background: $button-bg;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  color: #606266;
  cursor: pointer;
  &.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
    &:hover {
      color: #c0c4cc;
      cursor: not-allowed;
      background-image: none;
      background-color: #fff;
      border-color: #ebeef5;
      > .icon {
        fill: #606266;
      }
    }
  }
  &:hover {
    border-color: $border-color-hover;
    background-color: $button-active-bg;
    color: #409eff;
    > .icon {
      fill: #409eff;
    }
  }
  &:active {
    background-color: $button-active-bg;
    color: #409eff;
  }
  &:focus {
    outline: none;
  }
  > .icon {
    width: 1em;
    height: 1em;
    order: 1;
    margin-right: 0.1em;
    fill: #606266;
  }
  > .content {
    order: 2;
  }
  &.icon-right {
    > .icon {
      order: 2;
      margin-left: 0.1em;
      margin-right: 0.3em;
    }
    > .content {
      order: 0.9;
    }
  }
  .loading {
    @include spin;
  }
  & + & {
    margin-left: 4px;
  }
}
</style>
