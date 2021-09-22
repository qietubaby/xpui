import Toast from '../../../src/components/toast/toast.vue'

// 解决重复出现toast问题5001037
let currentToast
export default {
  install(Vue) {
    //options
    Vue.prototype.$toast = function(message, toastOptions) {
      if (currentToast) {
        currentToast.close()
      }
      currentToast = createToast({
        Vue,
        message,
        propsData: toastOptions,
        onClose: () => {
          currentToast = null
        },
      })
    }
  },
}

/*helpers*/
function createToast({ Vue, message, propsData, onClose }) {
  let Constructor = Vue.extend(Toast)
  let toast = new Constructor({
    propsData,
  })

  // 默认插槽
  toast.$slots.default = [message]
  toast.$mount()
  toast.$on('close', onClose)
  document.body.appendChild(toast.$el)
  return toast
  //console.log(123)
}
