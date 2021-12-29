<template>
  <div>
    <div class="tel">
      <span class="label">手机号：</span>
      <span class="content">152****1076</span>
    </div>
    <div class="smsCode_wrap">
      <component v-if="gInput" :is="gInput"></component>
      <component
        v-if="dynamicComponent"
        :is="dynamicComponent"
        @click="sendCodeAjax"
        style="margin-left: 10px;"
      ></component>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import plugin from './plugin'
Vue.use(plugin)

export default {
  data() {
    return {
      dynamicComponent: null,
      gInput: null,
    }
  },
  methods: {
    sendCodeAjax(callback) {
      setTimeout(() => {
        this.$toast('验证码已发送您的手机，请注意查收')
        callback()
      }, 300)
    },
  },
  mounted() {
    import('../../../src/components/smsCode/smsCode').then(module => {
      this.dynamicComponent = module.default
    })
    import('../../../src/components/input/input').then(module => {
      this.gInput = module.default
    })
  },
}
</script>
<style scoped lang="scss">
.tel {
  margin: 16px 0;
  .label {
    color: rgba(0, 0, 0, 0.65);
  }
  .content {
    color: rgba(0, 0, 0, 0.85);
  }
}
.smsCode_wrap {
  display: flex;
  align-items: center;
}
</style>
