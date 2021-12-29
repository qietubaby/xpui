<template>
  <div>
    <div style="margin-bottom: 20px;">案例1：禁用项</div>
    <component
      v-if="selectType"
      :is="selectType"
      v-model="value"
      :type-list="list"
      @change="handleChange"
    />
    <br />
    <br />
    <br />
    <div style="margin-bottom: 20px;">案例2：自定义内容</div>
    <component
      v-if="selectType"
      :is="selectType"
      v-model="value"
      :max-width="480"
      :type-list="list"
    >
      <template slot-scope="{ item }">
        <div>{{ item.label }}</div>
        <component v-if="gInput" :is="gInput" v-model="item.value" />
      </template>
    </component>
  </div>
</template>
<script>
export default {
  name: 'selectType-demos',

  data() {
    return {
      value: 0,
      selectType: null,
      gInput: null,
      list: [
        { label: '选项项目一', value: '0' },
        { label: '选项项目二', value: '1' },
        { label: '选项项目三', value: '2', disabled: true },
        { label: '带说明文字四', value: '3', desc: '说明文案' },
      ],
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
  },
  mounted() {
    import('../../../src/components/selectType/selectType').then(module => {
      this.selectType = module.default
    })
    import('../../../src/components/input/input').then(module => {
      this.gInput = module.default
    })
  },
}
</script>
