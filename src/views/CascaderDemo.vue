<template>
  <div class="content">
    <h2>Cascader 级联选择器</h2>
    <h3>组件用法</h3>
    <div>
      <p>①点击input框出现级联选择器，通常用在选择地址。</p>
      <p>②可以自动判断父级下有没有子级。</p>
      <p>③支持ajax和本地数据。</p>
    </div>
    <div style="height: 50px;"></div>

    <cascader
      :source.sync="source"
      popoverHeight="200px"
      :selected.sync="selected"
    >
    </cascader>
  </div>
</template>

<script>
import Cascader from '@/components/cascader/cascader.vue'

export default {
  data() {
    return {
      selected: [],
      source: [],
    }
  },
  created() {
    this.source = [
      {
        name: '河北省',
        children: [
          {
            name: '邯郸',
            children: [{ name: '涉县' }, { name: '肥乡' }, { name: '磁县' }],
          },
          {
            name: '石家庄',
          },
        ],
      },
    ]
  },
  components: {
    Cascader,
  },
}
</script>
