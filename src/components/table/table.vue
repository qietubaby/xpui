<template>
  <div class="gulu-table-wrapper" ref="wrapper">
    <div ref="tableWrapper" :style="{ height, overflow: 'auto' }">
      <table
        class="gulu-table"
        :class="{ bordered, compact, striped: striped }"
        ref="table"
      >
        <thead>
          <tr>
            <th
              v-if="expendField"
              :style="{ width: '50px' }"
              class="gulu-table-center"
            ></th>
            <th
              v-if="checkable"
              :style="{ width: '50px' }"
              class="gulu-table-center"
            >
              <input
                type="checkbox"
                @change="onChangeAllItems"
                ref="allChecked"
                :checked="areAllItemsSelected"
              />
            </th>
            <th :style="{ width: '50px' }" v-if="numberVisible">#</th>
            <th
              v-for="column in columns"
              :key="column.field"
              :style="{ width: column.width + 'px' }"
            >
              <div class="gulu-table-header">
                {{ column.text }}
                <span
                  v-if="column.field in orderBy"
                  class="gulu-table-sorter"
                  @click="changeOrderBy(column.field)"
                >
                  <g-icon
                    name="asc"
                    :class="{ active: orderBy[column.field] === 'asc' }"
                  ></g-icon>
                  <g-icon
                    name="desc"
                    :class="{ active: orderBy[column.field] === 'desc' }"
                  ></g-icon>
                </span>
              </div>
            </th>
            <th ref="actionsHeader" v-if="$scopedSlots.default"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in dataSource">
            <tr :key="item.id">
              <td
                v-if="expendField"
                :style="{ width: '50px' }"
                class="gulu-table-center"
              >
                <g-icon name="right" @click="expendItem(item.id)"></g-icon>
              </td>
              <td
                v-if="checkable"
                :style="{ width: '50px' }"
                class="gulu-table-center"
              >
                <input
                  type="checkbox"
                  @change="onChangeItem(item, index, $event)"
                  :checked="inSelectedItems(item)"
                />
              </td>
              <td v-if="numberVisible" :style="{ width: '50px' }">
                {{ index + 1 }}
              </td>
              <template v-for="column in columns">
                <td :key="column.field" :style="{ width: column.width + 'px' }">
                  <template v-if="column.render">
                    <vnodes
                      :vnodes="column.render({ value: item[column.field] })"
                    ></vnodes>
                  </template>
                  <template v-else>
                    {{ item[column.field] }}
                  </template>
                </td>
              </template>

              <!--编辑等操作-->
              <td v-if="$scopedSlots.default">
                <div ref="actions" style="display:inline-block">
                  <slot :item="item" frank="18"></slot>
                </div>
              </td>
            </tr>

            <!--点击箭头展开的描述-->
            <tr v-if="inExpendedIds(item.id)" :key="`${item.id}-expend`">
              <td :colspan="columns.length + expendedCellColSpan">
                {{ item[expendField] }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="gulu-table-loading" v-if="loading">
      <g-icon name="loading"></g-icon>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  name: 'GuluTable',
  props: {
    height: {
      type: [Number, String],
    },
    // 点击后展示哪个字段的内容 demo中展示 description
    expendField: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: true,
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
    compact: {
      type: Boolean,
      default: false,
    },
    // columns: {
    //   type: Array,
    //   required: true
    // },
    // id很重要，必须传
    dataSource: {
      type: Array,
      required: true,
      validataor(array) {
        return !(array.filter(item => item.id === undefined).length > 0)
      },
    },
    numberVisible: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    orderBy: {
      type: Object,
      default: () => ({}),
    },
    checkable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expendedIds: [],
      columns: [],
    }
  },
  mounted() {
    // 解决单元格中不可以存在其他标签的bug，比如a标签
    // console.log(this.$slots.default)
    this.columns = this.$slots.default.map(node => {
      let { text, field, width } = node.componentOptions.propsData
      let render = node.data.scopedSlots && node.data.scopedSlots.default
      //console.log(render)
      return { text, field, width, render }
    })

    // 判断选中状态
    if (
      this.selectedItems.length !== this.dataSource.length &&
      this.selectedItems.length !== 0
    ) {
      this.$refs.allChecked.indeterminate = true
    }

    /*
    // 这是第一种思路
    // 克隆一份table，然后把tbody拿掉，只留下thead
    let table2 = this.$refs.table.cloneNode(true)
    this.table2 = table2
    table2.classList.add('gulu-table-copy')
    this.$refs.wrapper.appendChild(table2)
  //  this.table2.style.background = 'red'
    this.updateHeadersWidth()
    this.onWindowResize = () => this.updateHeadersWidth()
    window.addEventListener('resize', () => this.onWindowResize)
    */

    this.$nextTick(() => {
      // 浅拷贝
      let table2 = this.$refs.table.cloneNode(false)
      table2.classList.add('gulu-table-copy')

      // 获取head的高度
      let tHead = this.$refs.table.children[0]
      let { height } = tHead.getBoundingClientRect()
      this.$refs.tableWrapper.style.marginTop = height + 'px'
      this.$refs.tableWrapper.style.height = this.height - height + 'px'
      table2.appendChild(tHead)

      this.$refs.wrapper.appendChild(table2)
    })

    //这是没有scope的slots
    //console.log(this.$slots)

    // 计算自定义列slot的宽度
    if (this.$scopedSlots.default) {
      // 拿到第一个div的宽度,不要让div的宽度那么宽，display:inline-block
      let div = this.$refs.actions[0]
      let { width } = this.$refs.actions[0].getBoundingClientRect()
      let parent = div.parentNode //td
      let styles = getComputedStyle(parent)
      // let pddingLeft = styles.getPropertyValue('padding-left')
      let pddingRight = styles.getPropertyValue('padding-right')
      let borderLeft = styles.getPropertyValue('border-left-width')
      let borderRight = styles.getPropertyValue('border-right-width')
      let width2 =
        width +
        parseInt(pddingRight) +
        parseInt(pddingRight) +
        parseInt(borderLeft) +
        parseInt(borderRight) +
        'px'
      this.$refs.actionsHeader.style.width = width2
      this.$refs.actions.map(div => {
        div.parentNode.style.width = width2
      })
    }
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.onWindowResize)
  },
  computed: {
    // 判断是否全部选中
    areAllItemsSelected() {
      const a = this.dataSource.map(item => item.id).sort()
      const b = this.selectedItems.map(item => item.id).sort()
      if (a.length !== b.length) {
        return false
      }
      let equal = true
      for (let i = 0; i < a.length; i++)
        if (a[i] !== b[i]) {
          equal = false
          break
        }
      return equal

      // 使用选中的数据的长度和原数据的长度相等的做法并不准确有bug，需要让两个元素的id完全相等。
      // return this.dataSource.length === this.selectedItems.length
    },
    expendedCellColSpan() {
      let result = 0
      if (this.checkable) {
        result += 1
      }
      if (this.expendField) {
        result += 1
      }
      return result
    },
  },
  watch: {
    // indeterminate 是全选按钮input选中部分的状态
    selectedItems() {
      if (this.selectedItems.length === this.dataSource.length) {
        this.$refs.allChecked.indeterminate = false
      } else if (this.selectedItems.length === 0) {
        this.$refs.allChecked.indeterminate = false
      } else {
        this.$refs.allChecked.indeterminate = true
      }
    },
  },
  methods: {
    // 这里思路取消了。让用户自己设置宽度
    // 分别计算thead的th的宽度 让克隆出来的thead宽度和原来table的thead的宽度相等
    // updateHeadersWidth(){
    //   let table2 = this.table2
    //   let tableHeader = Array.from(this.$refs.table.children).filter(node => node.tagName.toLowerCase() === 'thead')[0]
    //   let tableHeader2
    //   Array.from(table2.children).map(node => {
    //     if(node.tagName.toLowerCase() !== 'thead') {
    //       node.remove()
    //     } else {
    //       tableHeader2 = node
    //     }
    //   })
    //   Array.from(tableHeader.children[0].children).map((th, i) => {
    //     const {width} = th.getBoundingClientRect()
    //     console.log(width)
    //     tableHeader2.children[0].children[i].style.width = width + 'px'
    //   })
    // },
    changeOrderBy(key) {
      const copy = JSON.parse(JSON.stringify(this.orderBy))
      let oldValue = copy[key]
      if (oldValue === 'asc') {
        copy[key] = 'desc'
      } else if (oldValue === 'desc') {
        copy[key] = true
      } else {
        copy[key] = 'asc'
      }
      this.$emit('update:orderBy', copy, key)
    },
    inSelectedItems(item) {
      return this.selectedItems.filter(i => i.id === item.id).length > 0
    },
    onChangeItem(item, index, e) {
      let selected = e.target.checked
      let copy = JSON.parse(JSON.stringify(this.selectedItems))
      if (selected) {
        copy.push(item)
      } else {
        // 把selectedItems中所有的item的id都不等于这个item的id的item过滤出来，不正是把这一项从selectedItems中移除了么
        copy = copy.filter(i => i.id !== item.id)
      }
      this.$emit('update:selectedItems', copy)
    },
    onChangeAllItems(e) {
      let selected = e.target.checked

      this.$emit('update:selectedItems', selected ? this.dataSource : [])
    },
    expendItem(id) {
      if (this.inExpendedIds(id)) {
        this.expendedIds.splice(this.expendedIds.indexOf(id), 1)
      } else {
        this.expendedIds.push(id)
      }
    },
    inExpendedIds(id) {
      return this.expendedIds.indexOf(id) >= 0
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/var.scss';
$grey: darken($gray, 10%);
.gulu-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-bottom: 1px solid $grey;
  &.bordered {
    border: 1px solid $grey;
    td,
    th {
      border: 1px solid $grey;
    }
  }
  &.compact {
    td,
    th {
      padding: 4px;
    }
  }
  td,
  th {
    border-bottom: 1px solid $grey;
    text-align: left;
    padding: 8px;
  }
  &.striped {
    tbody {
      > tr {
        &:nth-child(odd) {
          background: white;
        }
        &:nth-child(even) {
          background: lighten($grey, 10%);
        }
      }
    }
  }
  &-sorter {
    display: inline-flex;
    flex-direction: column;
    margin: 0 4px;
    cursor: pointer;
    svg {
      width: 14px;
      height: 14px;
      fill: $grey;
      &.active {
        fill: red;
      }
      &:first-child {
        position: relative;
        bottom: -3px;
      }
      &:nth-child(2) {
        position: relative;
        top: -3px;
      }
    }
  }
  &-header {
    display: flex;
    align-items: center;
  }

  &-wrapper {
    position: relative;
    overflow: auto;
  }
  &-loading {
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 50px;
      height: 50px;
      @include spin;
    }
  }
  &-copy {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
  }
  & &-center {
    text-align: center;
  }
}
</style>
