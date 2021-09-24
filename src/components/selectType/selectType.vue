<template>
  <div :class="baseClass" :style="selectTypeStyle">
    <div
      v-for="(item, index) in typeList"
      :key="index"
      :class="[
        `${baseClass}-item`,
        {
          'is-disabled': item.disabled,
          'is-selected':
            isExist(item[valueKey]) &&
            isExist(model) &&
            item[valueKey] === model,
        },
      ]"
      @click="handleChange(item, index)"
    >
      <slot :item="item">
        <div v-if="item.label" :class="`${baseClass}-item__name`">
          {{ item.label }}
        </div>
        <div v-if="item.desc" :class="`${baseClass}-item__desc`">
          {{ item.desc }}
        </div>
      </slot>
      <div :class="`${baseClass}-item__arrow`"></div>
      <div :class="`${baseClass}-item__check`"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectType',
  model: {
    event: 'change',
  },
  props: {
    value: {},
    valueKey: {
      type: String,
      default: 'value',
    },
    typeList: {
      type: Array,
      require: true,
    },
    maxWidth: {
      type: Number,
    },
  },
  computed: {
    baseClass() {
      return 'select-type'
    },
    selectTypeStyle() {
      if (!this.maxWidth) return {}
      return {
        maxWidth: this.maxWidth + 'px',
      }
    },
    model: {
      get() {
        return this.value
      },
      set(val) {
        if (val !== this.value) {
          this.$emit('change', val)
        }
      },
    },
  },
  methods: {
    handleChange(item) {
      if (item.disabled) return
      if (this.isExist(item[this.valueKey])) {
        this.model = item[this.valueKey]
      } else {
        throw new Error(`该项的${this.valueKey}属性不存在`)
      }
    },
    isExist(val) {
      return val !== undefined && val !== null
    },
  },
}
</script>
<style lang="scss" scoped>
.select-type {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  margin-top: -8px;
  line-height: 1.5;

  &-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 8px;
    margin-top: 8px;
    padding: 6px 18px;
    font-weight: normal;
    box-sizing: border-box;
    background-color: #fff;
    border: 2px solid #d9d9d9;
    cursor: pointer;

    &__name {
      max-width: 472px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.65);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__desc {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      line-height: 22px;
      text-align: center;
    }

    &:hover {
      .select-type-item__name {
        color: #2c68ff;
      }
    }

    &__arrow {
      position: absolute;
      bottom: 0;
      right: 0;
      border-width: 10px;
      border-style: solid;
      border-color: transparent;
      border-bottom-color: #d9d9d9;
      border-right-color: #d9d9d9;
    }

    &__check {
      position: absolute;
      bottom: 4px;
      right: 2px;
      width: 6px;
      height: 3px;
      border: 2px solid #fff;
      border-top: 0;
      border-right: 0;
      box-sizing: content-box;
      transform: rotate(-45deg);
    }

    &.is-selected {
      border-color: #2c68ff;

      .select-type-item__name {
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
      }

      .select-type-item__arrow {
        border-bottom-color: #2c68ff;
        border-right-color: #2c68ff;
      }
    }

    &.is-disabled {
      border-color: #e5e5e5;
      background-color: transparent;
      cursor: not-allowed;

      .select-type-item__name,
      .select-type-item__desc {
        color: rgba(0, 0, 0, 0.25);
      }

      .select-type-item__arrow {
        border-bottom-color: #e5e5e5;
        border-right-color: #e5e5e5;
      }
    }
  }
}
</style>
