<template>
  <div>
    <div class="box">
      <g-slides :selected.sync="selected" direction="y" :showNav="true">
        <template v-for="item in num">
          <g-slides-item :key="item.name" :name="item.name">
            <div class="slidebox">{{ item.name }}</div>
          </g-slides-item>
        </template>
      </g-slides>
    </div>
  </div>
</template>
<script>
import Slides from '@/components/slides/slides.vue'
import SlidesItem from '@/components/slides/slides-item.vue'
export default {
  components: {
    gSlides: Slides,
    gSlidesItem: SlidesItem,
  },
  data() {
    return {
      // slides数据
      selected: '1',
      num: [
        {
          name: '0',
        },
        {
          name: '1',
        },
        {
          name: '2',
        },
        {
          name: '3',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
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
