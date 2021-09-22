<template>
  <div class="content">
    <h2>Pagination 分页</h2>
    <h3>组件用法</h3>
    <p>①点击按钮进行页面跳转</p>
    <div style="height:50px;"></div>
    <pager :hide-if-one-page="false" :totalPage="totalPage" :currentPage.sync="currentPage"></pager>
  </div>
</template>

<script>
import Pager from '@/components/pager/pager.vue'
export default {
  data(){
    return {
      totalPage:10,
      currentPage: 3
    }
  },
  components: {
   Pager
  }
}
</script>