<template>
  <div class="gulu-pager" :class="{ hide: hideIfOnePage ===true && totalPage <= 1 }">
    <span
      @click="onClickPage(currentPage - 1)"
      class="gulu-pager-item"
      :class="{ disabled: currentPage === 1 }"
    >
      上一页
    </span>
    <template v-for="(page, index) in pages">
      <template v-if="page === currentPage">
        <span :key="index" class="current gulu-pager-item"> {{ page }}</span>
      </template>
      <template v-else-if="page === '...'">
        <span :key="index" class="sepatator gulu-pager-item">...</span>
      </template>
      <template v-else>
        <a
          :key="index"
          class="other gulu-pager-item"
          @click="onClickPage(page)"
          >{{ page }}</a
        >
      </template>
    </template>
    <span
      class="gulu-pager-item"
      :class="{ disabled: currentPage === totalPage }"
      @click="onClickPage(currentPage + 1)"
    >
      下一页
    </span>
  </div>
</template>
<style scoped lang="scss">
@import '@/assets/css/var.scss';
.gulu-pager {
  &.hide {
    display: none;
  }
  display: flex;
  align-items: center;
  &-item {
    padding: 0 4px;
    border-radius: $border-radius;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    min-width: 30px;
    font-weight: 700;
    height: 30px;
    margin: 0 4px;
    color: $light-color;
    cursor: pointer;
    background-color: #f4f4f5;
    &.disabled {
      display: none;
    }
    &.sepatator {
      border: none;
      background: none;
      cursor: default;
    }

    &:hover {
      color: $blue;
    }
    &.current {
      cursor: default;
      background-color: $blue;
      color: #fff;
    }
  }
}
</style>
<script>
export default {
  name: 'GuluPager',
  props: {
    totalPage: {
      type: Number,
      require: true
    },
    currentPage: {
      type: Number,
      require: true
    },
    hideIfOnePage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    pages() {
      let pages = [
        1,
        this.totalPage,
        this.currentPage,
        this.currentPage - 1,
        this.currentPage - 2,
        this.currentPage + 1,
        this.currentPage + 2
      ].filter(n => n >= 1 && n <= this.totalPage)
      let u = unique(pages.sort((a, b) => a - b))
      let u2 = u.reduce((prev, current, index) => {
        if (u[index + 1] !== undefined && u[index + 1] - u[index] > 1) {
          prev.push(current)
          prev.push('...')
        } else {
          prev.push(current)
        }
        return prev
      }, [])
      return u2
    }
  },
  methods: {
    onClickPage(n) {
      if (n >= 1 && n <= this.totalPage) {
        this.$emit('update:currentPage', n)
      }
    }
  }
}

// 当当前页是3的时候，就会出现两个[1]页码，所以要去重
function unique(array) {
  const object = {}
  array.map(number => {
    object[number] = true
  })
  return Object.keys(object).map(s => parseInt(s, 10))
}
</script>
