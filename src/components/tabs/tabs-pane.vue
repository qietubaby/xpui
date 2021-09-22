<template>
  <div class="tabs-pane" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "GuleTabsPane",
  inject: ["eventBus"],
  data() {
    return {
      active: false
    }
  },
  computed:{
    classes(){
      return {
        active: this.active
      }
    }
  },
  created() {
    //console.log(this.eventBus)
    this.eventBus.$on("update:selected", name => {
      // if( name=== this.name) {
      //   console.log(`pane ${this.name}被选中了`)
      // } else {
      //   console.log(`pane ${this.name}没有被选中`)
      // }
      // console.log(name === this.name)
      // 优化后
      this.active = name === this.name;
    });
  },
  props: {
    name: {
      type: String || Number,
      required: true
    }
  }
};
</script>
<style lang="scss">
.tabs-pane {
  padding: 10px 0;

}
</style>
