<template>
  <div>
    <div class="tel">
      <span class="label">手机号：</span>
      <span class="content">152****1076</span>
    </div>
    <div class="smsCode_wrap">
      <g-input></g-input>
      <sms-code @click="sendCodeAjax" style="margin-left: 10px;"></sms-code>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import plugin from './plugin'
Vue.use(plugin)

import smsCode from '../../../src/components/smsCode/smsCode'
import Input from '../../../src/components/input/input.vue'

export default {
  components: {
    gInput: Input,
    smsCode,
  },
  data() {
    return {}
  },
  methods: {
    sendCodeAjax(callback) {
      setTimeout(() => {
        this.$toast('验证码已发送您的手机，请注意查收')
        callback()
      }, 300)
    },
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
