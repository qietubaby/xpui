<template>
  <div :style="`color:${color}`">
    <slot
      :changeColor="changeColor"
      name="title"
    >这是子组件</slot>
    <div>
      <br />
      <g-button @click="changeNum">Sync的用处，改变后面的值 - {{num}}</g-button>
    </div>

  </div>
</template>
<script>
export default {
  props: ['num'],
  data() {
    return {
      color: 'red'
    }
  },
  methods: {
    changeNum() {
      this.$emit('update:num', 456)
    },
    changeColor() {
      if (this.color === 'red') {
        this.color = 'green'
      } else {
        console.log(this.color)
        this.color = 'red'

      }

    }
  }
}
</script>
