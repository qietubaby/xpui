---
title: Contract 合同组件
sidebarDepth: 2
---

# Contract 合同组件

### 使用方法

- 点击按钮控制合同弹窗显示或隐藏 
- 如果只有一个合同，可以根据情况判断是否展示左侧合同导航
- 合同异步加载不让用户操作
- 用户没有预览合同是否禁用左侧合同导航
- 合同倒计时功能，强制用户必须在N秒后才能点击同意按钮


### 案例

<contract-demos></contract-demos>




### Props

参数	| 说明	| 类型	| 可选值	| 默认值
:--- | :---| :--- | :--- | :---
show | 合同是否展示 | string | - | -
previewUrl | 如何只有一份合同，只传这个合同的url即可 | string | - | -
btnText | 合同弹窗右下角按钮文本内容 | string | - | -
timeCount | 设置倒计时，时间没结束无法点击按钮 | number | - | -
contractList | 合同列表，每一项合同需包含 previewUrl(合同地址) 和 conctName（合同名称）Array | Array | - | -
canIClick | 是否可以让用户点击左侧的列表进行切换 | boolean | - | - false
loading	| 合同如果是异步的，可以设置右下角按钮为loading状态	| boolean	| -	| false

### 代码
```
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

```
