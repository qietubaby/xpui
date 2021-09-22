<!-- Table组件展示 -->
<template>
  <div class="content">
    <h2>Table 表格</h2>
    <h3>组件用法</h3>
    <div>
      <p>①可以全选表格。</p>
      <p>②可以展示表格某一项的描述。</p>
      <p>③可以让表格根据条件排序。</p>
      <p>④可以点击表格的操作按钮定义一些操作。</p>
    </div>
    <div style="height: 50px;"></div>
    <g-table
      :data-source="dataSource"
      :selected-items.sync="selected"
      :bordered="true"
      :order-by.sync="orderBy"
      @update:orderBy="x"
      :loading="loading"
      :height="400"
      expend-field="description"
      :checkable="true"
    >
      <template slot-scope="xxx">
        <g-button @click="edit(xxx.item)">编辑</g-button>
        <g-button @click="view(xxx.item)">查看</g-button>
      </template>

      <g-table-column text="姓名" field="name" :width="100">
        <template slot-scope="props">
          <a href="#">{{ props.value }}</a>
        </template>
      </g-table-column>
      <g-table-column text="分数" field="score"></g-table-column>
    </g-table>
  </div>
</template>

<script>
import GTable from '@/components/table/table.vue'
import GTableColumn from '@/components/table/table-column.vue'
import GButton from '@/components/button/button.vue'

export default {
  data() {
    return {
      selected: [
        {
          id: 1,
          name: '方方',
          score: 100,
        },
      ],
      // columns: [
      //   { text: '姓名', field: 'name', width: 200 },
      //   { text: '分数', field: 'score' }
      // ],
      orderBy: {
        // true表示开启排序，但是不确定是asc desc
        name: true,
        score: 'desc',
      },
      loading: false,
      dataSource: [
        {
          id: 1,
          name: '方方',
          score: 100,
          description: '这个是老师啊',
        },
        {
          id: 2,
          name: '圆圆',
          score: 37,
          description: '这个是学生啊',
        },
        {
          id: 3,
          name: '张三',
          score: 45,
          description: '这个是学生啊',
        },
        {
          id: 4,
          name: '李四',
          score: 99,
          description: '这个是学生啊',
        },
        {
          id: 5,
          name: '超人',
          score: 25,
          description: '这个是学生啊',
        },
        {
          id: 6,
          name: '蝙蝠侠',
          score: 89,
          description: '这个是学生啊',
        },
        {
          id: 7,
          name: '蜘蛛侠',
          score: 38,
          description: '这个是学生啊',
        },
        {
          id: 8,
          name: '钢铁侠',
          score: 2,
          description: '这个是学生啊',
        },
        {
          id: 9,
          name: '方方',
          score: 100,
          description: '这个是学生啊',
        },
        {
          id: 10,
          name: '圆圆',
          score: 37,
          description: '这个是学生啊',
        },
        {
          id: 11,
          name: '张三',
          score: 45,
          description: '这个是学生啊',
        },
        {
          id: 12,
          name: '李四',
          score: 99,
          description: '这个是学生啊',
        },
        {
          id: 13,
          name: '超人',
          score: 25,
          description: '这个是学生啊',
        },
        {
          id: 14,
          name: '蝙蝠侠',
          score: 89,
          description: '这个是学生啊',
        },
        {
          id: 15,
          name: '蜘蛛侠',
          score: 38,
          description: '这个是学生啊',
        },
        {
          id: 16,
          name: '钢铁侠',
          score: 2,
          description: '这个是学生啊',
        },
      ],
    }
  },

  components: {
    GTable,
    GTableColumn,
    GButton,
  },
  methods: {
    x() {
      this.loading = true
      this.dataSource = this.dataSource.sort((a, b) => a.score - b.score)
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    edit(item) {
      alert(`开始编辑${item.id}`)
    },
    view(item) {
      alert(`开始查看${item.id}`)
    },
  },
}
</script>
<style lang="scss" scoped></style>
