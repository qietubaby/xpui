<template>
  <div>
    <div class="contract-page">
      <input type="checkbox" :checked="checked" /> 点击合同标题弹出合同内容<span
        @click="show = true"
        v-for="item in contractPreviewList"
        :key="item.previewUrl"
        >《{{ item.contractName }}》</span
      >
    </div>

    <ui-contract-dialog
      :show.sync="show"
      btnText="全部已阅读并同意协议"
      :timeCount="0"
      :contractList="contractPreviewList"
      :canIClick="false"
      paddingLeftRight="24"
      :loading="contractLoading"
      @confirm="dislogCallback"
    ></ui-contract-dialog>
  </div>
</template>
<script>
import Vue from 'vue'

import plugin from './plugin'

Vue.use(plugin)

import contract from '../../../src/components/contract/contract.vue'

export default {
  name: 'contractDemo',
  components: {
    uiContractDialog: contract,
  },
  data() {
    return {
      show: false,
      contractLoading: false,
      contractPreviewList: [
        {
          previewUrl: 'https://cn.vuejs.org/',
          contractName: '购房合同',
        },
        {
          previewUrl: 'https://router.vuejs.org/zh/',
          contractName: '装修协议',
        },
        {
          previewUrl: 'https://cli.vuejs.org/zh/',
          contractName: '个人房屋租赁合同',
        },
      ],
    }
  },
  methods: {
    dislogCallback() {
      this.checked = true
      this.$toast('您点击了同意合同按钮', {
        position: 'middle',
      })
    },
  },
}
</script>
<style scoped lang="scss">
.contract-page {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  margin: 20px 0 40px;
  input {
    margin-top: 5px;
  }
  span {
    color: #2c68ff;
    cursor: pointer;
  }
}
</style>
