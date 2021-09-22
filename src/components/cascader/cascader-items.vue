<template>
  <div
    class="cascaderItem"
    :style="{height: height}"
  >
    <div class="left">
      <!-- <div style="color:red;">
       selected: {{selected && selected[level] && selected[level].name}}
       level: {{level}}
      </div> -->
      <div
        class="label"
        @click="onClickLabel(item)"
        :key="index"
        v-for="(item,index) in items"
      >
        <span>{{item.name}}</span>
        <icon
          class="icon"
          v-if="rightArrowVisible(item)"
          name="right"
        ></icon>
      </div>

    </div>
    <div
      class="right"
      v-if="rightItems"
    >
      <gulu-cascader-items
        :level="level+1"
        :selected="selected"
        :height="height"
        :items="rightItems"
        @update:selected="onUpdateSelected"
        :load-data="loadData"
      ></gulu-cascader-items>
    </div>
  </div>
</template>
<script>
import Icon from '@/components/icon/icon.vue';
export default {
  name: "GuluCascaderItems",
  props: {
    items: {
      type: Array
    },
    height: {
      type: String
    },
    selected: {
      type: Array,
      default: () => { return [] }
    },
    level: {
      type: Number,
      default: 0
    },
    loadData: {
      type: Function
    }
  },
  data() {
    return {
      leftSelected: null
    };
  },
  computed: {
    /*
    因为它的依赖没有更新，这种写法不会更新rightItems
    rightItems() {
      let currentSelected = this.selected[this.level]
      if (currentSelected && currentSelected.children) {
        return currentSelected.children;
      } else {
        return null;
      }
    }
    */
    rightItems() {
      if (this.selected[this.level]) {
        let selected = this.items.filter((item) => item.name === this.selected[this.level].name)
        if (selected && selected[0].children && selected[0].children.length > 0) {
          return selected[0].children
        } else {
          return null
        }
      } else {
        return null
      }
    },

  },
  components: {
    Icon
  },
  methods: {
    rightArrowVisible(item) {
      //用来判断当前数据是否是动态的，从而决定用哪种方法来隐藏右侧的箭头
      return this.loadData ? !item.isLeaf : item.children
    },
    onClickLabel(item) {

      // this.leftSelected = item
      // this.selected[this.level] = item // Vue这么赋值无效，必须用set
      // this.$set(this.selected,this.level,item)
      let copy = JSON.parse(JSON.stringify(this.selected))



      copy[this.level] = item


      // 删除当前level后面的值，以便更新数据。（比如之前选择了河北，现在选择了杭州，就把河北下面的市区域删掉）
      copy.splice(this.level + 1)


      this.$emit('update:selected', copy)

    },
    onUpdateSelected(newSelected) {
      this.$emit('update:selected', newSelected)
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/var.scss";
.cascaderItem {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .left {
    height: 100%;
    padding: 0.3em 0;
    overflow: auto;
  }
  .right {
    border-left: 1px solid $border-color-light;
    height: 100%;
  }
  .label {
    padding: 0.3em 1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
    justify-content: space-between;
    &:hover {
      background: $gray;
    }
    > .name {
      margin-right: 1em;
      user-select: none;
    }
    .icon {
      margin-left: 1rem;
      color: $border-color-light;
      transform: scale(0.7);
    }
  }
}
</style>
