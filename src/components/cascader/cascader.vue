<template>
  <div
    class="cascader"
    v-click-outside="close"
  >
    <div
      class="trigger"
      @click="toggle"
    >
      {{result || '&nbsp;'}}
      <!--加空格是为了避免去掉选择框下面的空白-->
    </div>

    <div
      class="popover-wraper"
      v-if="popoverVisible"
    >
      <cascader-items
        :items="source"
        :height="popoverHeight"
        :selected="selected"
        :load-data="loadData"
        @update:selected="onUpdateSelected"
      >
      </cascader-items>
    </div>
  </div>
</template>
<script>
import CascaderItems from './cascader-items'
import ClickOutside from '@/click-outside.js'
export default {
  name: 'GuluCascader',
  components: {
    CascaderItems
  },
  directives: {
    ClickOutside
  },
  props: {
    source: {
      type: Array
    },
    popoverHeight: {
      type: String
    },
    selected: {
      type: Array,
      default: () => { return [] }
    },
    loadData: {
      type: Function
    }
  },

  data() {
    return {
      popoverVisible: false
    }
  },
  methods: {
    onUpdateSelected(newSelected) {
      this.$emit('update:selected', newSelected)


      // 最后一项就是用户选中的那一项
      let lastItem = newSelected[newSelected.length - 1]




      // * 目的 * 在source中找到lastItem，然后给它加个children 接着更新数据
      // 每一项都没有children 用简单的方法
      let simplest = (children, id) => {
        return children.filter(item => item.id === id)[0]
      }

      // 某一项有children 用复杂的方法
      let complex = (children, id) => {
        let noChildren = []
        let hasChildren = []
        children.forEach(item => {
          if (item.children) {
            hasChildren.push(item)
          } else {
            noChildren.push(item)
          }
        })
        let found = simplest(noChildren, id)

        if (found) {
          return found
        } else {
          found = simplest(hasChildren, id)
          if (found) { return found }
          else {
            for (let i = 0; i < hasChildren.length; i++) {
              found = complex(hasChildren[i].children, id)
              if (found) {
                return found
              }
            }
            return undefined
          }
        }
      }


      // 这个提供给用户的一个更新数据的方法
      // 这里的 result 是父组件中的loadData方法获取到的
      let updateSource = (result) => {


        // let toUpdate = this.source.filter(item=>item.id === lastItem.id)[0]
        // let toUpdate = complex(this.source, lastItem.id)

        // 不能直接使用props过来的值，需要深拷贝
        let copy = JSON.parse(JSON.stringify(this.source))

        // 从copy中找到lastItem，给它加上children 然后更新数据
        let toUpdate = complex(copy, lastItem.id)
        toUpdate.children = result
        this.$emit('update:source', copy)
      }



      // 调用回调的时候传一个函数，这个函数理论上应该被调用
      // 针对需要异步请求过来的数据
      if (!lastItem.isLeaf) {
        this.loadData && this.loadData(lastItem, updateSource) // 回调
      }

    },
    close() {
      this.popoverVisible = false
    },
    toggle() {
      this.popoverVisible = !this.popoverVisible
    }
  },
  computed: {
    result() {
      return this.selected.map((item) => item.name).join('/')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var.scss";
.cascader {
  position: relative;
  display: inline-block;
  .trigger {
    border: 1px solid $border-color;
    height: $input-height;
    display: inline-flex;
    align-items: center;
    border-radius: $border-radius;
    min-width: 10em;
    padding: 0 1em;
  }
  .popover-wraper {
    position: absolute;
    overflow: hidden;
    top: 100%;
    left: 0;
    background-color: #fff;
    display: flex;
    @extend .box-shadow; //选择器多，样式少
    // @include box-shadow2; //选择器少，样式多
    .label {
      white-space: nowrap;
    }
  }
}
</style>

