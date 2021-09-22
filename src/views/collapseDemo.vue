<template>
  <div class="content">
    <h2>Collapse 折叠面板</h2>
    <h3>组件用法</h3>
    <div>
      <p>① 对复杂区域进行分组和隐藏，保持页面的整洁。</p>
      <p>② 手风琴 是一种特殊的折叠面板，只允许单个内容区域展开。</p>
    </div>
    <div style="height:30px;"></div>
    <collapse
      :single="true"
      :selected="abc"
    >
      <collapseItem
        :single="true"
        title="This is panel header 1"
        name="1"
      >
        <div class="color">A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</div>
      </collapseItem>
      <collapseItem
        :single="true"
        title="This is panel header 2"
        name="2"
      >
        <div class="color">A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.

        </div>
      </collapseItem>
      <collapseItem
        :single="true"
        title="This is panel header 3"
        name="3"
      >
        <div class="color">A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.

        </div>
      </collapseItem>
    </collapse>
  </div>
</template>

<script>
//tabs 组件
import Collapse from '@/components/collapse/collapse.vue'
import CollapseItem from '@/components/collapse/collapse-item.vue'

export default {
  data() {
    return {
      abc: ['1']
    }
  },
  components: {
    Collapse,
    CollapseItem
  }
}
</script>
<style lang="scss" scoped>
.color {
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5715;
}
</style>