<template>
  <div>
    <g-input @change="inputChange"></g-input>
    <!--
      input几个状态
      normal hovered focused disabled readonly
      error sucess
       
    -->
  </div>
</template>
<script>
export default {
  name:'inputDemo',
  created() {
   // 主动触发事件
    setTimeout(()=>{
      let event = new Event('change');
      let inputElement = this.$el.querySelector('input')
      inputElement.dispatchEvent(event)
    }, 3000)
  },
  methods: {
    inputChange(e) {
      console.log(e)
    }
  }
}
</script>