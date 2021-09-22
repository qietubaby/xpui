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
import Input from '@/components/input/input.vue'
import smsCode from '@/components/smsCode/smsCode'
export default {
  name: 'smsCodeDemo',
  components: {
    smsCode,
    gInput: Input,
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
  margin-bottom: 16px;
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
