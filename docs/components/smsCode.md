---
title: SmsCode 短信验证码
sidebarDepth: 2
---

# SmsCode 短信验证码

### 使用方法

- 调用完请求发送验证码的接口后，请一定记得调用组件的回调函数
- 发送完后默认60s后可以再次点击发送，这个时间可以自定义
- 倒计时会缓存到sessionStorage，刷新浏览器会继续读秒
- 将包含：短信验证码|合同弹窗|悬浮选择器|列表排列|消息条|

### 案例

<code-demos></code-demos>

### Props

参数	| 说明	| 类型	| 可选值	| 默认值
:--- | :---| :--- | :--- | :---
initText | 按钮文本 | string | - | 获取验证码
tag | 按钮的元素 | string | - |  g-input
count | 倒计时的时间 | number | - | 60
click | 点击按钮后触发 | - | - | -
callback | 点击按钮后的回调，如不执行无法读秒 | - | - | -

### 代码
```
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

```