<template>
  <div class="home">
    <div>判断是否是微信小程序环境并且跳转回微信小程序</div>
    <g-button>跳转回微信小程序</g-button>
    <son :num.sync="num">
      <div
        slot="title"
        slot-scope="{changeColor}"
      >
        
        <h3>这是子组件</h3>
        {{$route.meta.isLogin}}
        <g-button
          class="mt20"
          @click="changeColor"
        >slot->父组件中定制的内容要渲染子组件的数据或者执行子组件中的方法</g-button>
      </div>
    </son>
    <br />
    <hr />
    <div>
      <h3>Vuex复习</h3>
      <div>我的名字是：{{userName}}</div>
      <div>
        <g-button @click="changeName('James')">修改name</g-button>
        <g-button @click="changeNameAsync('Jane')">1s后修改name</g-button>
      </div>
      <div>
        Getters-我的名字是：{{userNameGetter}}
      </div>
      <div>
        根级别的数据：{{product}}
      </div>
    </div>
    <g-input @input="getValue" error=""/>
    <br/>
  </div>
</template>

<script>
import Son from '@/components/fatherAndSon/son.vue'
// import HTTP from '@/server'
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      num: 123
    }
  },
  created() {
    // console.log(this.$route)
    // HTTP.get('https://www.easy-mock.com/project/5b8cc3645ae7a7318a665203').then((res) => {
    //   console.log(1222222)
    //   console.log(this)
    // })
  },
  components: {
    Son
  },
  computed: {
    ...mapState('user', ['userName']),
    ...mapGetters([
      'userNameGetter'
    ]),
    ...mapState(['product'])
  },
  methods: {

    ...mapMutations('user', ['changeName']),
    //changeName() {
    //this.$store.commit('user/changeName', 'James')
    //},

    // ...mapActions('user', ['changeNameAsync'])

    changeNameAsync() {
      this.$store.dispatch('user/changeNameAsync', 'Jane').then(()=>{
        console.log(123)
      })
    },
    getValue(e){
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.mt20,
div {
  margin-top: 20px;
}
</style>