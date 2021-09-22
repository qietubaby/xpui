<template>
  <div class="content">
    <h2>Toast 消息提示</h2>
    <h3>组件用法</h3>
    <div>
      <p>
        ①
        Toast提供3种不同位置的展示方式，可以通过传入top/bottom/middle来选择你要的效果。
      </p>
      <p>② 可以在callback中传入参数来调用toast关闭后的函数。</p>
      <p>③ 可以选择是否要解析HTML标签。</p>
      <p>④ 可以选择自动关闭或者手动关闭消息提示。</p>
    </div>
    <div style="height: 50px;"></div>
    <g-button @click="showToast">点我触发toast组件</g-button>
  </div>
</template>

<script>
export default {
  methods: {
    showToast() {
      this.$toast('<p>我是message</p>', {
        position: 'top',
        enableHtml: true,
        closeButton: {
          text: '知道了',
          callback(toast) {
            toast.log()
            console.log('这里是回调')
          },
        },
      })
    },
  },
}
</script>
