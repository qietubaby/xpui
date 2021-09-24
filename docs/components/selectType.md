---
title: SelectType 选择类型
sidebarDepth: 2
---

# SelectType 选择类型

### 使用方法

- 通过设置 value-key 属性，改变 v-model 绑定的属性，其中 value-key 需为 typeItem 中声明的字段。
- 通过设置 type-list 内 disabled 字段为 true 禁用某一项。
- 添加说明性文案
- 通过设置默认插槽，可以自定义内容区。

<selectType-demos></selectType-demos>

### Props

| 参数          | 说明                                   | 类型          | 可选值 | 默认值  |
| :------------ | :------------------------------------- | :------------ | :----- | :------ |
| v-model/value | 指定的`value-key`字段的值              | `string\number`| -      | -       |
| type-list     | 类型列表，数据结构如下`typeItem`，必传 | `array`         | -      | -       |
| value-key     | 改变`v-model`绑定的字段                | `string`        | -      | 'value' |
| max-width     | 选择类型组件的最大宽度                | `number`        | -      | - |

### Events

| 名称   | 说明           | 回调参数 |
| :----- | :------------- | :------- |
| change | 改变选项时触发 | `value`  |

### Slots

| 名称    | 说明                       |
| :------ | :------------------------- |
| default | 自定义内容区域，作用域插槽 |

### typeItem 数据结构

```js
const typeItem = {
  // 选项名称
  label: String,
  // 选项的值，可以配合v-model使用，和后端交互
  value: String 或 Number,
  // 选项的说明性文案
  desc: String,
  // 选项是否禁用
  disabled: Boolean,
  // 其他自定义字段
  ...
}
```

### 代码

```
<template>
  <div>
    <div style="margin-bottom: 20px;">案例1：禁用项</div>
    <selectType v-model="value" :type-list="list" @change="handleChange" />
    <br />
    <br />
    <br />
    <div style="margin-bottom: 20px;">案例2：自定义内容</div>
    <selectType v-model="value" :max-width="480" :type-list="list">
      <template slot-scope="{ item }">
        <div>{{ item.label }}</div>
        <g-input v-model="item.value" />
      </template>
    </selectType>
  </div>
</template>
<script>
import SelectType from '../../../src/components/selectType/selectType.vue'
import input from '../../../src/components/input/input.vue'
export default {
  name: 'selectType-demos',
  components: {
    SelectType,
    gInput: input,
  },
  data() {
    return {
      value: 0,
      list: [
        { label: '选项项目一', value: 0 },
        { label: '选项项目二', value: 1 },
        { label: '选项项目三', value: 2, disabled: true },
        { label: '带说明文字四', value: 3, desc: '说明文案' },
      ],
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
  },
}
</script>

```
