<template>
  <div class="demo">
    <notice-bar
      :noticeList="noticeList"
      :selected.sync="noticeList[0].name"
      @viewClick="viewClickHandle"
    ></notice-bar>
  </div>
</template>
<script>
import noticeBar from '../../../src/components/noticeBar/noticeBar.vue'

export default {
  name: 'noticeBar-demos',
  components: {
    noticeBar,
  },
  data() {
    return {
      noticeList: [
        {
          name: '0',
          message: '1月27日工商银行关于待还款管控利率问题调查通知',
          isLink: true,
          href: 'https://www.baidu.com',
          openNew: false,
          type: 'backlog',
          handleText: '查看详情',
        },
        {
          name: '1',
          message: '1月27日工商银行关于待还款管控利率问题调查通知',
          isLink: false,
          href: 'https://www.baidu.com',
          openNew: true,
          type: 'info',
        },
        {
          name: '2',
          message:
            '1月27日工商银行关于待还款管控利率问题调查通知,1月27日工商银行关于待还款管控利率问题调查通知,1月27日工商银行关于待还款管控利率问题调查通知（可选）',
          isLink: false,
          href: 'https://www.baidu.com',
          openNew: true,
          type: 'urgent',
          handleText: '立即处理',
        },
      ],
    }
  },
  methods: {
    viewClickHandle(item) {
      console.log(item)
    },
  },
}
</script>
<style scoped lang="scss">
.demo {
  background-color: aliceblue;
  padding: 10px;
  margin-top: 20px;
}
</style>
