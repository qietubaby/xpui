<template>
  <div>
    <div style="margin-top: 20px;">
      <component
        v-if="buttonComponent"
        :is="buttonComponent"
        @click="changeDis(0)"
        >悬浮至最底部</component
      >
      <component
        v-if="buttonComponent"
        :is="buttonComponent"
        @click="changeDis(300)"
        >悬浮至距离底部300px</component
      >
      <component v-if="buttonComponent" :is="buttonComponent" @click="handle()"
        >固定在footer之上</component
      >
    </div>
    <div class="c-footer">
      footer元素<br />
      固钉条默认总是悬浮此在元素之上
    </div>
    <component
      :is="dynamicComponent"
      class="select-footer"
      :distance="dis"
      :stickyElement="stickyElement"
    >
      <div class="select-footer__wrap">
        <div class="select-footer__content">
          <div class="select-footer__content--left">自定义内容</div>
          <div class="select-footer__content--right">
            <div class="select-footer__cum">
              <div class="select-footer__cum--left">
                <p>
                  已选 <span class="num">20</span>
                  项
                </p>
                <em class="icon go-icon-arrow-up"></em>
              </div>
              <div class="ml-33 select-footer__amount">
                总价值：<span>20000</span>
                美元
              </div>
            </div>

            <component
              v-if="buttonComponent"
              :is="buttonComponent"
              class="select-footer__btn"
            >
              申请贷款
            </component>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicComponent: null,
      buttonComponent: null,
      dis: 0,
      stickyElement: 'c-footer',
    }
  },
  methods: {
    changeDis(dis) {
      this.dis = dis
      this.stickyElement = ''
    },
    handle() {
      this.stickyElement = 'c-footer'
    },
  },
  mounted() {
    import('../../../src/components/stickyBar/stickyBar').then(module => {
      this.dynamicComponent = module.default
    })
    import('../../../src/components/button/button').then(module => {
      this.buttonComponent = module.default
    })
  },
}
</script>
<style lang="scss" scoped>
@mixin box-shadow() {
  box-shadow: 0 -2px 10px 0 rgba(190, 193, 202, 0.3);
}
.select-footer {
  z-index: 99;
  width: 100%;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  @include box-shadow();
  &__wrap {
    width: 1200px;
    height: 70px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  .f-shadow {
    @include box-shadow();
  }
  &__content {
    background-color: #fff;
    color: #636672;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 63px;
    width: 980px;
    margin-left: 220px;
    height: 70px;
    line-height: 70px;
    &--right {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  &__cum {
    display: flex;
    &--left {
      display: flex;
      align-items: center;
      cursor: pointer;
      .num {
        color: #2c68ff;
        font-size: 16px;
      }
      .icon {
        margin-left: 8px;
        font-size: 6px;
        color: #727682;
        transition: all 300ms;
      }
    }
  }
  &__amount {
    span {
      font-family: JD-Regular;
      font-size: 28px;
      color: #2c68ff;
      margin-right: 4px;
    }
  }
  &__btn {
    height: 70px;
    width: 112px;
    line-height: 70px;
    color: #fff;
    font-size: 18px;
    border-radius: 0;
    padding: 0;
    background: #2c68ff;
    margin-left: 20px;
    &:hover {
      background: #2c68ff;
      color: #fff;
    }
  }
  .select-table {
    width: 980px;
    // height: 350px;
    padding: 40px 32px 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 22px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 70px;
    right: 0;
    z-index: -1;
  }
  .select-mask {
    height: 70px;
    width: 20px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 210px;
    z-index: 100;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(50px);
    opacity: 0;
  }
}
.c-footer {
  margin-top: 1000px;
  width: 200px;
  height: 200px;
  background: #f0f0f0;
  width: 100%;
  line-height: 200px;
  text-align: center;
  color: #ccc;
  font-size: 40px;
  line-height: 1.5;
}
</style>
