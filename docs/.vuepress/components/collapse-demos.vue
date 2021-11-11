<template>
  <div>
    <collapse :single="true" :selected="abc">
      <collapseItem :single="true" title="This is panel header 1" name="1">
        <div class="color">
          A dog is a type of domesticated animal. Known for its loyalty and
          faithfulness, it can be found as a welcome guest in many households
          across the world.
        </div>
      </collapseItem>
      <collapseItem :single="true" title="This is panel header 2" name="2">
        <div class="color">
          A dog is a type of domesticated animal. Known for its loyalty and
          faithfulness, it can be found as a welcome guest in many households
          across the world.
        </div>
      </collapseItem>
      <collapseItem :single="true" title="This is panel header 3" name="3">
        <div class="color">
          A dog is a type of domesticated animal. Known for its loyalty and
          faithfulness, it can be found as a welcome guest in many households
          across the world.
        </div>
      </collapseItem>
    </collapse>

    <pre>
    <code>
      {{ content }}
    </code>
  </pre>
  </div>
</template>
<script>
//tabs 组件

import Collapse from '../../../src/components/collapse/collapse.vue'
import CollapseItem from '../../../src/components/collapse/collapse-item.vue'
export default {
  data() {
    return {
      abc: ['1'],
      content: `
        <collapse :single="true" :selected="abc">
          <collapseItem :single="true" title="This is panel header 1" name="1">
            <div class="color">
              A dog is a type of domesticated animal. Known for its loyalty and
              faithfulness, it can be found as a welcome guest in many households
              across the world.
            </div>
          </collapseItem>
          <collapseItem :single="true" title="This is panel header 2" name="2">
            <div class="color">
              A dog is a type of domesticated animal. Known for its loyalty and
              faithfulness, it can be found as a welcome guest in many households
              across the world.
            </div>
          </collapseItem>
          <collapseItem :single="true" title="This is panel header 3" name="3">
            <div class="color">
              A dog is a type of domesticated animal. Known for its loyalty and
              faithfulness, it can be found as a welcome guest in many households
              across the world.
            </div>
          </collapseItem>
        </collapse>
      `,
    }
  },
  components: {
    Collapse,
    CollapseItem,
  },
}
</script>

<style lang="scss" scoped>
.color {
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5715;
}
</style>
