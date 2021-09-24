---
title: InfoDisplay 列表信息展示
sidebarDepth: 2
---

# InfoDisplay 列表信息展示

### 使用方法
- 非常方便的列表信息展示组件，你可以根据后端返回的字段来定义数据
- 每一行的标题和内容都可以自定义
- 宽度可以自适应也可以固定，可以自定义列数
- 如果某一条数据内容较，也可以单独展示
- 标题可以左对齐也可以右对齐，可以设置单条的标题和内容的距离

### 案例

<info-demos></info-demos>




### Props

| 参数        | 说明                     | 类型        | 可选值     | 默认值 |
| :---------- | :----------------------- | :---------- | :--------- | :----- |
| data        | 通常是服务器端返回的数据 | `object`      | -          | -      |
| labels      | 标题列表                 | `labelItem[]` | -          | -      |
| columnCount | 列数                     | `number`      | -          | 2      |
| itemWidth   | 单条的宽度               | `number`      | -          | -      |
| itemSpace   | 单条之间的距离           | `number`      | -          | 48     |
| labelWidth  | 单条标题的宽度           | `number`      | -          | 112    |
| labelAlign  | 单条标题水平对齐方式     | `string`      | _left\|right_ | left   |
| labelSpace  | 单条标题和内容的距离     | `number`      | -          | 16     |

### labelItem数据结构

| 参数      | 说明                 | 类型                    | 可选值 | 默认值 |
| :-------- | :------------------- | :---------------------- | :----- | :----- |
| name      | 映射数据的 key 值    | `string`                  | -      | -      |
| label     | 自定义该条数据的名称 | _string\|function\|vnode_ | -      | -      |
| formatter | 自定义该条数据的内容 | `function`                | -      | -      |
| oneLine   | 该条数据是否独占一行 | `boolean`                 | -      | false  |

### 代码
```
<template>
  <div style="margin-top: 40px;">
    <info-display
      :data="applyInfo.data"
      label-align="left"
      :labels="applyInfo.labels"
    />
  </div>
</template>

<script>
import infoDisplay from '../../../src/components/infoDisplay/infoDisplay.vue'
export default {
  components: {
    infoDisplay,
  },
  data() {
    return {
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

```