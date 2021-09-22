<template>
  <son :num.sync="num"></son>
</template>
<script>
import Son from './son.vue'
export default {
  data(){
    return {
      num: 456
    }
  },
  components:{
    Son
  }
}
</script>
