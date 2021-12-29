<template>
  <div>
    <component v-if="buttonComponent" :is="buttonComponent" @click="showToast"
      >点我触发toast组件</component
    >
    <pre>
    <code>
      {{ content }}
    </code>
  </pre>
  </div>
</template>

<script>
import Vue from 'vue'

import plugin from './plugin'

Vue.use(plugin)

export default {
  data() {
    return {
      buttonComponent: null,
      content: `<g-button @click="showToast">点我触发toast组件</g-button>
     
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
      },`,
    }
  },
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
  mounted() {
    import('../../../src/components/button/button').then(module => {
      this.buttonComponent = module.default
    })
  },
}
</script>
