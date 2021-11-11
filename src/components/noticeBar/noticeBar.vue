<template>
  <div>
    <div class="notice-bar">
      <g-slides :selected.sync="selected" direction="y" :showNav="false">
        <template v-for="item in noticeList">
          <g-slides-item
            :key="item.name"
            :name="item.name"
            style="height: 48px;"
          >
            <div class="notice-bar__item">
              <g-tag :type="tagType[item.type].type">{{
                tagType[item.type].name
              }}</g-tag>
              <div
                class="notice-bar__item-content"
                :class="
                  `notice-bar__item-content-${
                    tagType[item.type || 'info']['type']
                  }`
                "
              >
                {{ item.message }}
              </div>
              <template v-if="item.isLink">
                <a
                  :href="item.href"
                  class="notice-bar__item-btn"
                  :target="item.openNew ? '_blank' : '_self'"
                  ><span>{{ item.handleText || '查看详情' }}</span></a
                >
              </template>
              <template v-else>
                <a
                  class="notice-bar__item-btn"
                  @click="$emit('viewClick', item)"
                  href="javascript:;"
                  ><span>{{ item.handleText || '查看详情' }}</span></a
                >
              </template>
            </div>
          </g-slides-item>
        </template>
      </g-slides>
    </div>
  </div>
</template>
<script>
import Slides from '../slides/slides.vue'
import SlidesItem from '../slides/slides-item.vue'
import Tag from '../tag/tag.vue'
const TAG_TYPE = {
  info: { name: '通知', type: '' },
  backlog: { name: '待办', type: 'warning' },
  urgent: { name: '紧急', type: 'danger' },
}
export default {
  name: 'noticeBar',
  components: {
    gSlides: Slides,
    gSlidesItem: SlidesItem,
    gTag: Tag,
  },
  props: {
    noticeList: {
      type: Array,
    },
  },
  data() {
    return {
      // slides数据
      selected: '',
      tagType: TAG_TYPE,
    }
  },
  watch: {
    noticeList(val) {
      this.selected = val[0].id
    },
  },
}
</script>
<style lang="scss" scoped>
.notice-bar {
  background: #fff;
  padding: 0 32px;
  &__item {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-content {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      margin-bottom: 1px;
      color: rgba(0, 0, 0, 0.85);
      text-align: left;
      &-danger {
        color: #f52f3e;
      }
      margin-left: 8px;
    }
    &-btn {
      font-size: 12px;
      margin-left: 16px;
      color: #2c68ff;
    }
  }
}
</style>
