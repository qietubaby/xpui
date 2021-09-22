<template>
  <div>
    <g-popover
      position="bottom"
      ref="popover"
      @open="onOpen"
    >
      <g-input
        type="text"
        :value="formattedValue"
      />
      <template slot="content">
        <div
          class="gulu-date-picker-pop"
          @selectstart.prevent
        >
          <div class="gulu-date-picker-nav">
            <span
              :class="c('prevYear','navItem')"
              @click="onClickPrevYear"
            >
              <g-icon name="zuozuo" /></span>
            <span
              :class="c('prevMonth','navItem')"
              @click="onClickPrevMonth"
            >
              <g-icon name="left" /></span>
            <span :class="c('yearAndMonth')">
              <span @click="onClickYear">{{display.year}}年</span>
              <span @click="onClickMonth">{{display.month+1}}月</span>
            </span>
            <span
              :class="c('nextMonth','navItem')"
              @click="onClickNextMonth"
            >
              <g-icon name="right" /></span>
            <span
              :class="c('nextYear','navItem')"
              @click="onClickNextYear"
            >
              <g-icon name="youyou" /></span>
          </div>
          <div class="gulu-date-picker-panels">

            <div class="gulu-date-picker-content">

              <template v-if="mode==='month'">
                <div :class="c('selectMonth')">
                  <div :class="c('selects')">
                    <select
                      @change="onSelectYear"
                      :value="display.year"
                    >
                      <option
                        v-for="year in years"
                        :key="year"
                        :value="year"
                      >{{year}}</option>
                    </select>年
                    <select
                      @change="onSelectMonth"
                      :value="display.month"
                    >
                      <option
                        v-for="month in helper.range(0,12)"
                        :key="month"
                        :value="month"
                      >{{month+1}}</option>
                    </select>月
                  </div>
                  <div :class="c('returnToDayMode')">
                    <button @click="changeMode">返回</button>
                  </div>
                </div>
              </template>

              <!--展示日期-->
              <template v-else>
                <div class="gulu-date-picker-weekdays">
                  <span
                    class="gulu-date-picker-weekday"
                    v-for="i in [1,2,3,4,5,6,0]"
                    :key="i"
                  >
                    {{weekdays[i]}}
                  </span>
                </div>
                <div
                  class="gulu-date-picker-row"
                  v-for="i in helper.range(1,7)"
                  :key="i"
                >
                  <span
                    :class="[c('cell'),{
                      currentMonth: isCurrentMonth(getVisibleDay(i,j)),
                      selected: isSelected(getVisibleDay(i,j)),
                      today: isToday(getVisibleDay(i, j))
                    }]"
                    v-for="j in helper.range(1,8)"
                    :key="j"
                    @click="onClickCell(getVisibleDay(i,j))"
                  >
                    {{getVisibleDay(i,j).getDate()}}
                  </span>
                </div>
              </template>

            </div>
          </div>
          <div class="gulu-date-picker-actions">
            <g-button @click="onClickToday">今天</g-button>
            <g-button @click="onClickClear">清除</g-button>
          </div>
        </div>
      </template>
    </g-popover>

  </div>
</template>
<script>
import GInput from "@/components/input/input.vue";
import GIcon from "@/components/icon/icon.vue";
import GPopover from "@/components/popover/popover.vue";
import GButton from "@/components/button/button.vue";
import helper from './helper';
export default {
  components: {
    GInput,
    GIcon,
    GPopover,
    GButton
  },
  props: {
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    value: {
      type: Date
    },
    scope: {
      type: Array,
      default: () => [new Date(1900, 0, 1), helper.addYear(new Date(), 100)]
    }
  },
  data() {
    let [year, month] = helper.getYearMonthDate(this.value || new Date())
    return {
      mode: 'day',
      helper: helper,
      popoverContainer: null,
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      display: { year, month }
    }
  },
  computed: {

    visibleDays() {

      let date = new Date(this.display.year, this.display.month, 1)

      // 获取到这个月的第一天
      let first = helper.firstDayOfMonth(date)

      // 获取到这个月的最后一天
      let last = helper.lastDayOfMonth(date)

      // 当前月的天数
      let array = []
      let [year, month] = helper.getYearMonthDate(date)

      for (let i = first.getDate(); i <= last.getDate(); i++) {
        array.push(new Date(year, month, i))
      }

      // 一个月跨度是6周
      // 我们通常看到的日历展示是展示上个月的几天、下一月的几天以及当月的所有天数，如果和星期对应起来，应该是42天
      // 计算上个月末尾几天的天数
      // 因为 0 表示星期天，所以 0 要单独处理。 如果1号是星期一，那么前面加0天，如果是1号是星期二，前面
      // 加1天，如果是0（星期天），前面就加6天

      // M:当月的所有日期  X： 31号后面几天  N： 1日是星期几
      // (N-1) + M + X = 42



      let n = first.getDay() === 0 ? 6 : first.getDay() - 1
      let array2 = []
      for (let i = 0; i < n; i++) {
        array2.push(new Date(year, month, -i))
      }



      // 计算下个月的前几天  42是每页展示的日期个数
      let m = 42 - array.length - array2.length;
      let array3 = [];
      for (let i = 1; i <= m; i++) {
        array3.push(new Date(year, month + 1, i))
      }
      return [...array2, ...array, ...array3]
    },
    formattedValue() {
      if (!this.value) { return '' }
      const [year, month, day] = helper.getYearMonthDate(this.value)
      return `${year}-${helper.pad2(month + 1)}-${helper.pad2(day)}`
    },

    years() {
      return helper.range(this.scope[0].getFullYear(), this.scope[1].getFullYear() + 1)
    }

  },
  methods: {
    onOpen(){
      this.mode = 'day';
    },
    changeMode() {
      setTimeout(()=>{
        this.mode = 'day'
      },1)
    },
    c(...classNames) {
      return classNames.map(className => `gulu-date-picker-${className}`)
    },
    onClickYear() {
      this.mode = 'years'
    },
    onClickMonth() {
      if (this.mode === 'month') {
        this.mode === ''
      } else {
        this.mode = 'month'
      }

    },

    // 6行7列
    // 1 1  => 0
    // 1 2 => 1
    // 1 3 => 2
    getVisibleDay(row, col) {
      return this.visibleDays[(row - 1) * 7 + col - 1]
    },
    onClickCell(date) {
      // 只能点击当前月份的日期
      if (this.isCurrentMonth(date)) {
        this.$emit('input', date)
        this.$refs.popover.close()
      }

    },
    // 判断是否是当前月份，当然也必须是同一年
    isCurrentMonth(date) {
      let [year1, month1] = helper.getYearMonthDate(date);
      return year1 === this.display.year && month1 === this.display.month;
    },
    isSelected(date) {
      if (!this.value) { return false }
      let [y, m, d] = helper.getYearMonthDate(date);

      let [y2, m2, d2] = helper.getYearMonthDate(this.value);
      return y === y2 && m === m2 && d === d2;
    },
    onClickPrevYear() {
      const oldDate = new Date(this.display.year, this.display.month);
      const newDate = helper.addYear(oldDate, -1);
      const [year, month] = helper.getYearMonthDate(newDate);
      this.display = { year, month };
    },
    onClickNextYear() {
      const oldDate = new Date(this.display.year, this.display.month);
      const newDate = helper.addYear(oldDate, 1);
      const [year, month] = helper.getYearMonthDate(newDate);
      this.display = { year, month };
    },
    onClickNextMonth() {
      const oldDate = new Date(this.display.year, this.display.month);
      const newDate = helper.addMonth(oldDate, 1);
      const [year, month] = helper.getYearMonthDate(newDate);
      this.display = { year, month };
    },
    // 上一月
    onClickPrevMonth() {
      const oldDate = new Date(this.display.year, this.display.month);
      const newDate = helper.addMonth(oldDate, -1);
      const [year, month] = helper.getYearMonthDate(newDate);
      this.display = { year, month };
    },
    onSelectYear(e) {

      const year = e.target.value - 0;

      const d = new Date(year, this.display.month);
      if (d >= this.scope[0] && d <= this.scope[1]) {
        this.display.year = year
      } else {
        alert('no');
        e.target.value = this.display.year;
      }
    },
    onSelectMonth(e) {
      const month = e.target.value - 0;
      const d = new Date(this.display.year, month);
      if (d >= this.scope[0] && d <= this.scope[1]) {
        this.display.month = month;
      } else {
        alert('no')
        e.target.value = this.display.month;
      }
    },

    // 跳转到今天日期
    onClickToday() {
      const now = new Date()
      const [year, month, day] = helper.getYearMonthDate(now)
      this.display = { year, month }
      //this.value = new Date(year, month, day)
      this.$emit('input', new Date(year, month, day))
    },
    // 清除日期
    onClickClear() {
      this.$emit('input', undefined)
      this.$refs.popover.close()
    },
    // 今天日期状态
    isToday(date) {
      let [y, m, d] = helper.getYearMonthDate(date);
      let [y2, m2, d2] = helper.getYearMonthDate(new Date());
      return y === y2 && m === m2 && d === d2;
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/css/var.scss";
.gulu-date-picker {
  &-nav {
    display: flex;
    align-items: center;
  }
  &-navItem,
  &-cell,
  &-weekday {
    width: 32px;
    height: 32px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  &-cell {
    color: #ddd;
    cursor: not-allowed;
    border-radius: $border-radius;
    &.currentMonth {
      color: black;
      &:hover {
        background: $blue;
        cursor: pointer;
        border-radius: $border-radius;
        color: white;
      }
    }
    &.today {
      background-color: $gray;
    }
    &.selected {
      border: 1px solid $blue;
    }
  }
  &-yearAndMonth {
    margin: 0 auto;
  }
  &-selectMonth {
    width: 224px;
    height: 224px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &-returnToDayMode {
    margin-top: 8px;
  }
  &-actions {
    padding: 8px;
    text-align: right;
  }
}
</style>
