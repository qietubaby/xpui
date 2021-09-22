<template>
  <div style="border: 1px solid black;">
    <g-row gutter="20">
      <g-col>1</g-col>
      <g-col>2</g-col>
    </g-row>
    <div id="app" style="padding: 100px;">
      <collapse :selected.sync="selectedTab" single>
        <collapse-item title="标题1" name="1">内容1</collapse-item>
        <collapse-item title="标题2" name="2">内容2</collapse-item>
        <collapse-item title="标题3" name="3">内容3</collapse-item>
      </collapse>

      {{selectedTab}}
    </div>
  </div>
</template>
<script>
import GRow from "@/components/grid/row.vue";
import GCol from "@/components/grid/col.vue";
import Collapse from "@/components/collapse/collapse.vue";
import CollapseItem from "@/components/collapse/collapse-item.vue";
export default {
  data(){
    return {
      selectedTab:['2']
    }
  },
  components: {
    GRow,
    GCol,
    Collapse,
    CollapseItem
  }
};
</script>
<style lang="css" scoped>
</style>