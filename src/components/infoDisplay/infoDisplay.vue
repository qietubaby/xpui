<script>
export default {
  name: 'infoDisplay',
  props: {
    data: Object,
    labels: Array,
    columnCount: {
      type: Number,
      default: 2,
    },
    itemWidth: {
      type: Number,
    },
    itemSpace: {
      type: Number,
      default: 48,
    },
    labelWidth: {
      type: Number,
      default: 112,
    },
    labelAlign: {
      type: String,
      default: 'right',
    },
    labelSpace: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      list: [],
    }
  },
  watch: {
    data: {
      deep: true,
      handler: function() {
        this.list = this.getList()
      },
    },
    labels: function() {
      this.list = this.getList()
    },
  },
  methods: {
    getList() {
      let { labels, data } = this
      if (labels && data) {
        return labels.map(m => {
          let label = m.label
          let formatter = m.formatter
          let value = formatter ? formatter(data) : data[m.name]
          if (
            Object.prototype.toString.apply(label).toLowerCase() ===
            '[object function]'
          ) {
            label = label(data)
          }
          return {
            label,
            value,
            oneLine: m.oneLine,
          }
        })
      } else {
        return []
      }
    },
    getLabelStyle(item) {
      if (!item.label) return {}
      return {
        width: `${this.labelWidth}px`,
        textAlign: this.labelAlign,
      }
    },
    // 计算总宽度
    getWrapStyle() {
      let totalWidth = ''
      if (this.itemWidth) {
        totalWidth = `${this.columnCount * this.itemWidth +
          this.columnCount * this.itemSpace}px`
      } else {
        totalWidth = `calc(100% + ${this.itemSpace}px)`
        console.log(totalWidth)
      }
      return {
        width: totalWidth,
        marginLeft: `-${this.itemSpace}px`,
      }
    },
    // 每一项的样式
    getItemStyle(m) {
      let width = ''
      if (m.oneLine) {
        if (this.itemWidth) {
          width = `${this.columnCount * this.itemWidth +
            (this.columnCount - 1) * this.itemSpace}px`
        } else {
          width = `calc(100%-${this.itemSpace}px)`
        }
      } else {
        if (this.itemWidth) {
          width = `${this.itemWidth}px`
        } else {
          width = `calc(${100 / this.columnCount}% - ${this.itemSpace}px)`
        }
      }
      return {
        width,
        marginLeft: `${this.itemSpace}px`,
      }
    },
    // 内容的样式
    getContentStyle(item) {
      if (!item.label) return {}
      return {
        marginLeft: `${this.labelWidth + this.labelSpace}px`,
      }
    },
  },
  render() {
    return (
      <div class="info-display">
        <div class="info-display-list" style={this.getWrapStyle()}>
          {this.list.map((m, i) => {
            return (
              <div class="info-display-item" style={this.getItemStyle(m, i)}>
                {m.label ? (
                  <label
                    class="info-display-item__label"
                    style={this.getLabelStyle(m)}
                  >
                    {m.label}
                  </label>
                ) : null}
                <div
                  class="info-display-item__content"
                  style={this.getContentStyle(m)}
                >
                  {m.value}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
  mounted() {
    this.list = this.getList()
  },
}
</script>
<style lang="scss" scoped>
.info-display {
  overflow: hidden;

  &-list {
    margin: -24px 0 0 0;
  }
  &-item {
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
    margin-top: 24px;
    vertical-align: top;
    box-sizing: border-box;

    &__label {
      color: rgba(0, 0, 0, 0.65);
      float: left;
    }
    &__content {
      color: rgba(0, 0, 0, 0.85);
      word-break: break-all;
      margin: 0;
    }
  }
}
</style>
