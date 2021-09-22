<template>
  <div class="wrapper" :class="{ error }">
    <input
      :disabled="disabled"
      :value="value"
      type="text"
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    />
    <template v-if="error">
      <icon name="settings" class="icon-error"></icon>
      <span class="error-Message">{{ error }}</span>
    </template>
  </div>
</template>

<script>
import Icon from '../icon/icon'
export default {
  components: { Icon },
  name: 'lunzi-input',
  props: {
    value: {
      type: [String, Date],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/var.scss';
$height: $input-height;
.wrapper {
  > :not(:last-child) {
    margin-right: 0.5em;
  }
  display: inline-flex;
  align-items: center;
  font-size: $font-size;
  > input {
    height: $height;
    border: 1px solid $border-color;
    padding: 0 8px;
    border-radius: $border-radius;
    &:hover {
      border-color: $border-color-hover;
    }
    &:focus {
      // box-shadow: inset 0 1px 3px $box-shadow-color;
      outline: none;
    }
    &[disabled] {
      border-color: #bbb;
      color: #bbb;
      cursor: not-allowed;
    }
  }
  &.error {
    > input {
      border-color: $red;
    }
  }
  .icon-error {
    fill: $red;
  }
  .error-Message {
    color: $red;
  }
}
</style>
