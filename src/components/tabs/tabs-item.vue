<template>
  <div class="tabs-item" @click="onClick" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'GuluTabsItem',
  inject: ['eventBus'],
  data(){
    return {
      active: false
    }
  },
  computed:{
    classes(){
      return {
        active: this.active,
        disabled: this.disabled
      }
    }
  },
  created() {
    // on是监听  emit是触发
    this.eventBus.$on('update:selected',(name) => {
      // if(name === this.name) {
      //   console.log(`${this.name}被选中了`)
      //   this.active = true
      // } else {
      //   console.log(`${this.name}没有被选中`)
      //   this.active = false
      // }
      // 优化后
      this.active = name === this.name

     
    })
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type:String || Number,
      required: true
    }
  },
  methods:{
    onClick() {
      if(this.disabled){
        return
      }
      // 传递childvm的作用在于 在 tabs-head中需要使用childvm的位置
      this.eventBus.$emit('update:selected', this.name, this)
    }
  }
}
</script>
<style lang="scss">
  $blue:#1890ff;
  $disabled-text-colr: #dbdbdb;
  .tabs-item {
    flex-shrink: 0;
    padding: 0 1em;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;

    &.active {
      color:$blue;
      font-weight: bold;
    }
    &.disabled {
      color: $disabled-text-colr;
    }
  }
</style>
