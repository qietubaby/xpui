<template>
  <div>
    <div class="box">
      <g-slides class="wrapper" :selected.sync="selected">
        <g-slides-item name="0">
          <div class="slidebox">1</div>
        </g-slides-item>
        <g-slides-item name="1">
          <div class="slidebox odd">2</div>
        </g-slides-item>
        <g-slides-item name="2">
          <div class="slidebox">3</div>
        </g-slides-item>
        <g-slides-item name="3">
          <div class="slidebox odd">4</div>
        </g-slides-item>
      </g-slides>
    </div>
    <pre>
    <code>
      {{ content }}
    </code>
  </pre>
  </div>
</template>
<script>
//轮播图组件
import Slides from '../../../src/components/slides/slides.vue'
import slidesItem from '../../../src/components/slides/slides-item.vue'
export default {
  components: {
    gSlides: Slides,
    gSlidesItem: slidesItem,
  },
  data() {
    return {
      // slides数据
      selected: '2',
      showbox2: false,
      content: ` <g-slides class="wrapper" :selected.sync="selected">
        <g-slides-item name="0">
          <div class="slidebox">1</div>
        </g-slides-item>
        <g-slides-item name="1">
          <div class="slidebox odd">2</div>
        </g-slides-item>
        <g-slides-item name="2">
          <div class="slidebox">3</div>
        </g-slides-item>
        <g-slides-item name="3">
          <div class="slidebox odd">4</div>
        </g-slides-item>
      </g-slides>`,
    }
  },
  methods: {
    showTwo() {
      this.showbox2 = !this.showbox2
    },
  },
}
</script>
<style lang="scss" scoped>
.box {
  width: 320px;
}
.slidebox {
  background: #d3dce6;
  font-size: 16px;
  text-align: center;
  line-height: 150px;
  width: 320px;
  height: 150px;
  color: #fff;
  &.odd {
    background: #99a9bf;
  }
}
</style>
