<template>
  <div style="margin: 40px 0;width:900px;">
    <g-button @click="changeColumn">改变列数</g-button>
    <info-display
      :data="applyInfo.data"
      label-align="left"
      :labels="applyInfo.labels"
      :columnCount="columnCount"
      style="margin-top: 30px;"
    />
  </div>
</template>

<script>
import infoDisplay from '../../../src/components/infoDisplay/infoDisplay.vue'
import Button from '../../../src/components/button/button.vue'
export default {
  components: {
    infoDisplay,
    gButton: Button,
  },
  data() {
    return {
      columnCount: 2,
      applyInfo: {
        labels: [
          {
            name: 'productName',
            label: '产品名称',
          },
          {
            name: 'storageName',
            label: '商品名称',
          },
          {
            name: 'weight',
            label: '重量',
          },
          {
            name: 'number',
            label: '数量',
          },
          {
            name: 'pledgeApplyCode',
            label: '申请编码',
          },
          {
            name: 'contractName',
            label: '合同名称及下载',
            formatter: data => {
              return (
                <div>
                  {data.contractName}
                  <span
                    style="color: #2C68FF; margin-left: 8px;cursor: pointer;"
                    on-click={() => {
                      this.handleDownFile(data)
                    }}
                  >
                    <i
                      class="fin-icon-download"
                      style=" vertical-align: middle;margin-bottom:2px;"
                    ></i>
                    下载
                  </span>
                </div>
              )
            },
          },
          {
            name: 'status',
            label: '合同状态',
            formatter: data => {
              return (
                <span
                  style={`color: ${data.status === '130426' ? '#f52f3e' : ''}`}
                >
                  未签署
                </span>
              )
            },
          },
          {
            name: 'applyDate',
            label: '申请日期',
          },
        ],
        data: {},
      },
    }
  },
  methods: {
    handleDownFile(data) {
      this.$message(`下载文件${data.pledgeApplyCode}`)
    },
    changeColumn() {
      this.columnCount++
      if (this.columnCount > 3) {
        this.columnCount = 1
      }
    },
  },
  mounted() {
    setTimeout(() => {
      const rst = {
        applyInfo: {
          productName: '京东自有资金产品',
          pledgeApplyCode: 'ZY000004045',
          storageName: '橡胶',
          contractName: '电子仓单',
          weight: '100kg',
          number: '8吨',
          applyDate: '2021-06-18',
          status: '130426',
        },
      }
      this.applyInfo.data = { ...rst.applyInfo }
    }, 300)
  },
}
</script>
