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
