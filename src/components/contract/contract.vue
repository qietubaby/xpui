<template>
  <section v-if="show" :class="baseClass" :style="diaLogStyle">
    <div :class="baseClass + '__head'">
      <h4 :class="baseClass + '__head--title'">{{ title }}</h4>
      <i :class="baseClass + '__head--icon go-icon-error-s'" @click="close"></i>
    </div>
    <div :class="baseClass + '__body'">
      <div
        v-if="contractList && contractList.length > 1"
        :class="baseClass + '__nav mt-8'"
      >
        <ul :class="baseClass + '__nav-list'">
          <li
            v-for="(item, index) in contractList"
            :key="index"
            :class="cIndex === index ? 'active' : ''"
            :style="
              `cursor:${
                canIClick || hasRead[index] ? 'pointer' : 'not-allowed'
              };`
            "
            @click="switchContract(index)"
          >
            {{ item.contractName }}
          </li>
        </ul>
      </div>
      <div
        :class="baseClass + '__iframewrap'"
        :style="
          `border-left:${
            contractList && contractList.length > 1
              ? '1px solid #f0f0f0'
              : 'none'
          };`
        "
      >
        <div
          :class="baseClass + '__iframe'"
          :style="`padding:0 ${paddingLeftRight}px;`"
        >
          <iframe
            v-if="previewUrlInside"
            ref="iframeWrap"
            :src="previewUrlInside"
            frameborder="0"
          ></iframe>
        </div>
        <div :class="baseClass + '__foot'">
          <slot name="btns">
            <go-button
              :class="baseClass + '__foot--btn'"
              size="medium"
              :disabled="isDisabled"
              :loading="loading"
              @click="confirm"
              >{{ timeNum ? `(${timeNum})` : '' }}{{ btnTextInside }}</go-button
            >
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ui-contract-dialog',
  props: {
    show: Boolean,
    title: {
      type: String,
      default: '合同预览',
    },
    previewUrl: {
      type: String,
      default: '',
    },
    btnText: {
      type: String,
      default: '已阅读并同意协议',
    },
    timeCount: {
      type: Number,
      default: 15,
    },
    contractList: {
      type: Array,
    },
    canIClick: {
      type: Boolean,
      default: false,
    },
    paddingLeftRight: {
      type: String,
      default: '0',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeId: null,
      isDisabled: true,
      timeNum: null,
      baseClass: 'ui-contract-dialog',
      cIndex: 0,
      record: 0,
      hasRead: [],
    }
  },
  watch: {
    show() {
      this.forbinScroll()
    },
  },
  computed: {
    diaLogStyle() {
      let w = this.contractList && this.contractList.length > 1 ? 960 : 800
      return `width:${w}px;margin-left:-${w / 2}px`
    },
    btnTextInside() {
      if (this.contractList && !this.canIClick) {
        if (this.cIndex === this.contractList.length - 1) {
          return this.btnText
        }
        return '已阅读，继续下一份'
      } else {
        return this.btnText
      }
    },
    previewUrlInside() {
      if (this.contractList && this.contractList.length) {
        return this.contractList[this.cIndex].previewUrl
      } else {
        return this.previewUrl
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:show', false)
    },
    confirm() {
      if (
        this.contractList &&
        !this.canIClick &&
        this.cIndex < this.contractList.length - 1
      ) {
        this.hasRead[this.record] = 1
        this.cIndex++
        this.record++
        this.hasRead[this.record] = 1
      } else {
        this.cIndex = 0
        this.$emit('confirm')
        this.close()
      }
    },
    forbinScroll() {
      document.body.style.overflow = this.show ? 'hidden' : ''
    },
    handleCountDown() {
      clearInterval(this.timeId)
      this.isDisabled = true
      this.timeId = setInterval(() => {
        this.timeNum--
        if (this.timeNum <= 0) {
          clearInterval(this.timeId)
          this.isDisabled = false
          this.timeNum = 0
        }
      }, 1000)

      // 清除timeId
      this.$once('hook:beforeDestroy', () => clearInterval(this.timeId))
    },
    switchContract(index) {
      if (!this.canIClick) {
        if (index > this.record) {
          return
        } else {
          this.cIndex = index
        }
      }
      this.cIndex = index
    },
  },
  mounted() {
    this.timeNum = this.timeCount
    this.handleCountDown()
  },
}
</script>
<style lang="scss" scoped>
$deep-color: #000;
$shallow-color: #fff;
.ui-contract-dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  height: 520px;
  margin-top: -245px;
  border-radius: 2px;
  overflow: hidden;
  z-index: 2000;

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($deep-color, 0.6);
    z-index: -1;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 18px 0 24px;
    background-color: $shallow-color;
    border-bottom: 1px solid rgba($deep-color, 0.06);
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;

    &--title {
      line-height: 24px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: rgba($deep-color, 0.8);
    }

    &--icon {
      font-size: 14px;
      color: rgba($deep-color, 0.2);
      cursor: pointer;
    }
  }

  &__body {
    width: 100%;
    padding: 24px 0;
    background-color: $shallow-color;
    display: flex;
    justify-content: space-between;
    height: 472px;
  }
  &__nav {
    width: 240px;
    padding: 0 20px 0 24px;
    &-list {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      li {
        margin-bottom: 20px;
        &.active {
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
  }
  &__iframewrap {
    flex: 1;
    height: 424px;
  }
  &__iframe {
    height: 367px;
    overflow: hidden;
    iframe {
      width: 100%;
      height: 100%;
    }
  }

  &__foot {
    padding: 24px 24px 0 0;
    background-color: $shallow-color;
    text-align: right;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    &--btn {
      cursor: pointer;
      float: none !important;
      height: 32px;
      font-size: 14px;
      line-height: 32px;
    }
  }
}
</style>
