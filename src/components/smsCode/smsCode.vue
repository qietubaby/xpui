<script>
import * as Util from '../../utils'
import Button from '../../components/button/button.vue'

export default {
  name: 'smsCode',
  data() {
    return {
      text: '获取验证码',
      disabled: false,
    }
  },
  components: {
    uiButton: Button,
  },
  computed: {
    key() {
      return `lastSendTime-${this.type}`
    },
  },
  methods: {
    readTime(t) {
      var time = t
      var timeId = setInterval(() => {
        time--
        this.text = `${time}s`
        if (time == 0) {
          this.disabled = false
          this.text = '重新获取'
          Util.removeStorage(this.key)
          clearInterval(timeId)
        }
      }, 1000)
    },
    send() {
      // 调用ajax 发送短信
      // 相关的错误提示和发送成功的提示在success和error里修改
      this.$emit('click', () => {
        this.disabled = true
        this.text = `${this.count}s`
        this.readTime(this.count)
        try {
          Util.setStorage(this.key, +new Date())
        } catch (e) {
          console.log(e)
        }
      })
    },
    resetText() {
      if (this.text == '重新获取') {
        this.text = this.initText
      }
    },
  },
  props: {
    type: String,
    initText: {
      type: String,
      default: '获取验证码',
    },
    size: {
      type: String,
      default: 'medium',
    },
    reInit: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'ui-button',
    },
    count: {
      type: Number,
      default: 60,
    },
  },
  mounted() {
    this.text = this.initText
    var lastTime = Util.getStorage(this.key)
    if (lastTime) {
      var currentTime = +new Date()
      //发送未满60秒
      // 剩余时间 秒
      var leftTime = this.count - Math.ceil((currentTime - lastTime) / 1000)
      if (leftTime > 0) {
        this.disabled = true
        this.text = `${leftTime}s`
        this.readTime(leftTime)
      } else {
        Util.removeStorage(this.key)
      }
    }
  },
  render(h) {
    return h(
      this.tag,
      {
        class: {
          'sms-button': true,
        },
        props: {
          // size: this.size,
          // type: 'minor',
          disabled: this.disabled,
        },
        domProps: {
          innerHTML: this.text,
        },
        on: {
          click: this.send,
        },
      },
      [this.text],
    )
  },
}
</script>

<style lang="scss">
.sms-button {
  display: block;
  min-width: 100px;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
}
</style>
