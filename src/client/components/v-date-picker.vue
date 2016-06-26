<template>
  <div class="v-date-picker" :class="computedClasses">
    <slot>
      <input type="text" :value="value" readonly
        :placeholder="placeholder" @click="toggle">
    </slot>

    <div class="v-date-picker-picker" v-show="active">
      <div class="v-date-picker-switchs" v-if="phase">
        <span class="v-date-picker-prev" @click="prev"
          :class="{ disabled: isPrevDisabled }">
          <i class="fa fa-angle-left"></i>
        </span>
        <span class="v-date-picker-next" @click="next"
          :class="{ disabled: isNextDisabled }">
          <i class="fa fa-angle-right"></i>
        </span>
        <span class="v-date-picker-title" @click="switchToParentPhase">{{title}}</span>
      </div>

      <div class="v-date-picker-years" v-if="phase === 'year'">
        <span v-for="y in years" track-by="$index"
          :class="{ disabled: y.disabled, selected: y.selected }"
          @click="selectYear(y)">{{y.year}}</span>
      </div>

      <div class="v-date-picker-months" v-if="phase === 'month'">
        <span v-for="m in months" track-by="$index"
          :class="{ disabled: m.disabled, selected: m.selected }"
          @click="selectMonth(m)">{{m.month}}</span>
      </div>

      <template v-if="phase === 'date'">
        <div class="v-date-picker-days">
          <span v-for="day in days" track-by="$index">{{day}}</span>
        </div>

        <div class="v-date-picker-dates">
          <span v-for="d in dates" track-by="$index"
            :class="{ disabled: d.disabled, selected: d.selected }"
            @click="selectDate(d)">{{d.date}}</span>
        </div>
      </template>

    </div>
  </div>

</template>

<script>
  import moment from 'moment';
  import 'moment/locale/zh-cn';

  import boundMixin from './mixins/bound';

  // 修正一周开始时间为周日
  moment.localeData()._week.dow = 0; // eslint-disable-line no-underscore-dangle

  export default {
    mixins: [boundMixin],

    props: {
      value: String,
      min: String,
      max: String,
      yFormatter: {
        type: String,
        default: 'YYYY',
      },
      ymFormatter: {
        type: String,
        default: 'YYYY-MM',
      },
      formatter: {
        type: String,
        default: 'YYYY-MM-DD',
      },
      placeholder: String,
      disabled: Boolean,
    },

    data() {
      return {
        active: false,
        yearMonth: null,
        phase: '',
        days: moment.weekdaysMin(),
      };
    },

    computed: {
      computedClasses() {
        return {
          'is-disabled': this.disabled,
        };
      },

      /**
       * @return {Moment} 当前选中日期
       */
      mValue() {
        return this.value ? moment(this.value, this.formatter) : moment().startOf('day');
      },

      /**
       * @return {Moment} 当前年月
       */
      mYearMonth() {
        return moment(this.yearMonth, this.ymFormatter);
      },

      /**
       * @return {Moment} 最小日期
       */
      mMinDate() {
        return this.min ?
          moment(this.min, this.formatter) :
          moment().startOf('day').add(-5, 'year');
      },

      /**
       * @return {Moment} 最大日期
       */
      mMaxDate() {
        return this.max ? moment(this.max, this.formatter) : moment().startOf('day');
      },

      /**
       * @return {String} 标题, 根据当前阶段显示不同格式数据
       */
      title() {
        let title;

        const year = this.mYearMonth.year();

        switch (this.phase) {
          case 'year':
            title = `${year - 6}-${year + 5}`;
            break;
          case 'month':
            title = year;
            break;
          default:
            title = this.yearMonth;
        }

        return title;
      },

      /* eslint-disable max-len */
      /**
       * @return {[Array<{year: String, moment: Moment, selected: Boolean, disabled: Boolean}>]} 年份数组, 当前年份前6后5
       */
      years() {
        const years = [];

        const year = this.mYearMonth.clone().startOf('year');

        const curDate = this.mValue.clone().startOf('year');
        const minDate = this.mMinDate.clone().startOf('year');
        const maxDate = this.mMaxDate.clone().startOf('year');

        const len = 12;
        const start = year.year() - 6;
        let i;
        let temp;

        for (i = 0; i < len; i++) {
          temp = year.clone().year(start + i);

          years.push({
            year: temp.format('YYYY'),
            moment: temp,
            selected: temp.isSame(curDate),
            disabled: temp.isAfter(maxDate) || temp.isBefore(minDate),
          });
        }

        return years;
      },

      /**
       * @return {[Array<{month: String, moment: Moment, selected: Boolean, disabled: Boolean}>]} 月份数组, 1 - 12 月
       */
      months() {
        const months = [];

        const month = this.mYearMonth.clone().startOf('year');

        const curDate = this.mValue.clone().startOf('month');
        const minDate = this.mMinDate.clone().startOf('month');
        const maxDate = this.mMaxDate.clone().startOf('month');

        const len = 12;
        let i;
        let temp;

        for (i = 0; i < len; i++) {
          temp = month.clone().month(i);

          months.push({
            month: temp.format('MMM'),
            moment: temp,
            selected: temp.isSame(curDate),
            disabled: temp.isAfter(maxDate) || temp.isBefore(minDate),
          });
        }

        return months;
      },

      /**
       * @return {[Array<{date: String, moment: Moment, selected: Boolean, disabled: Boolean}>]} 月份数组, 本月第一天所在周的第一天 - 本月最后一天所在周的最后一天
       */
      dates() {
        const dates = [];

        const date = this.mYearMonth.clone().startOf('month');

        const curDate = this.mValue.clone().startOf('day');
        const minDate = this.mMinDate.clone().startOf('day');
        const maxDate = this.mMaxDate.clone().startOf('day');

        const monthStartDate = date.clone().startOf('month');
        const monthEndDate = date.clone().endOf('month');

        const firstDate = monthStartDate.clone().startOf('week');
        const lastDate = monthEndDate.clone().endOf('week');

        const monthDays = date.daysInMonth();
        const prevMonthDays = moment.duration({ from: firstDate, to: monthStartDate }).days();
        const nextMonthDays = moment.duration({ from: monthEndDate, to: lastDate }).days();

        let i = 0;
        let temp;

        for (i = 0; i < monthDays; i++) {
          temp = date.clone().date(i + 1);

          dates.push({
            date: temp.date(),
            moment: temp,
            selected: temp.isSame(curDate),
            disabled: temp.isAfter(maxDate) || temp.isBefore(minDate),
          });
        }

        for (i = 0; i < prevMonthDays; i++) {
          temp = monthStartDate.clone().add(-i - 1, 'day');

          dates.unshift({
            date: temp.date(),
            moment: temp,
            selected: false,
            disabled: true,
          });
        }

        for (i = 0; i < nextMonthDays; i++) {
          temp = monthEndDate.clone().add(i + 1, 'day');

          dates.push({
            date: temp.date(),
            moment: temp,
            selected: false,
            disabled: true,
          });
        }

        return dates;
      },
      /* eslint-enable max-len */

      /**
       * @return {Boolean} 向前操作激活状态，根据不同阶段做不同判断
       */
      isPrevDisabled() {
        const minDate = this.mMinDate.clone();
        let start;

        switch (this.phase) {
          case 'year':
            minDate.startOf('year');
            start = this.years[0].moment;
            break;
          case 'month':
            minDate.startOf('month');
            start = this.months[0].moment;
            break;
          default:
            minDate.startOf('day');
            start = this.dates[0].moment;
        }

        return minDate.isAfter(start);
      },

      /**
       * @return {Boolean} 向后操作激活状态，根据不同阶段做不同判断
       */
      isNextDisabled() {
        const maxDate = this.mMaxDate.clone();
        let end;

        switch (this.phase) {
          case 'year':
            maxDate.startOf('year');
            end = this.years[this.years.length - 1].moment;
            break;
          case 'month':
            maxDate.startOf('month');
            end = this.months[this.months.length - 1].moment;
            break;
          default:
            maxDate.startOf('day');
            end = this.dates[this.dates.length - 1].moment;
        }

        return maxDate.isBefore(end);
      },
    },

    methods: {
      toggle() {
        if (this.active) {
          this.hide();
        } else {
          this.show();
        }
      },
      show() {
        this.active = true;
        this.phase = 'date';
        this.yearMonth = this.mValue.format('YYYY-MM');
        this.enableCheckBound(() => this.hide());
      },
      hide() {
        this.active = false;
        this.disableCheckBound();
      },

      prev() {
        const currYearMonth = this.mYearMonth;
        let prevYearMonth;

        switch (this.phase) {
          case 'year':
            prevYearMonth = currYearMonth.add(-12, 'year');
            break;
          case 'month':
            prevYearMonth = currYearMonth.add(-1, 'year');
            break;
          default:
            prevYearMonth = currYearMonth.add(-1, 'month');
        }

        this.yearMonth = prevYearMonth.format('YYYY-MM');
      },

      next() {
        const currYearMonth = this.mYearMonth;
        let nextYearMonth;

        switch (this.phase) {
          case 'year':
            nextYearMonth = currYearMonth.add(12, 'year');
            break;
          case 'month':
            nextYearMonth = currYearMonth.add(1, 'year');
            break;
          default:
            nextYearMonth = currYearMonth.add(1, 'month');
        }

        this.yearMonth = nextYearMonth.format('YYYY-MM');
      },

      switchToParentPhase() {
        if (this.phase === 'date') {
          this.phase = 'month';
        } else {
          this.phase = 'year';
        }
      },

      selectYear(y) {
        this.phase = 'month';
        this.yearMonth = y.moment.format('YYYY-MM');
      },

      selectMonth(m) {
        this.phase = 'date';
        this.yearMonth = m.moment.format('YYYY-MM');
      },

      selectDate(d) {
        this.value = d.moment.format(this.formatter);

        this.hide();
        this.$emit('change', this.value, d.moment);
      },
    },
  };
</script>

<style lang="sass">
  .v-date-picker {
    $primary: #2972cc;

    display: inline-block;
    vertical-align: middle;
    position: relative;

    input {
      border: 1px solid #d1d2d4;
      color: #4a4a4a;
      cursor: pointer;
      font-size: 14px;
      height: 30px;
      line-height: 20px;
      padding: 4px 6px;
      vertical-align: middle;
      width: 100%;

      &:focus {
        border-color: #2972cc;
      }
    }

    &-picker {
      background-color: #fff;
      border-radius: 3px;
      border-top: 1px solid #eee;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      overflow: auto;
      padding: 5px;
      position: absolute;
      transition: opacity 0.218s;
      width: 220px;
      z-index: 200;
    }

    &-prev,
    &-next,
    &-title {
      cursor: pointer;
      display: block;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }

    &-prev,
    &-next {
      color: #808080;
      margin-top: -2px;

      i {
        font-size: 20px;
        line-height: inherit;
        width: 35px;
      }

      &.disabled {
        color: #ccd0d7;
        pointer-events: none;
      }

      &:hover i {
        color: $primary;
      }
    }

    &-prev {
      float: left;
    }

    &-next {
      float: right;
    }

    &-title {
      color: #4c5161;
      margin: 0 35px;

      &:hover {
        background-color: #f0f0f2;
      }
    }

    &-years,
    &-months,
    &-days,
    &-dates {
      overflow: hidden;
      text-align: center;

      span {
        border-radius: 2px;
        color: #4c5161;
        float: left;
      }
    }

    &-years,
    &-months,
    &-dates {
      span {
        cursor: pointer;

        &.disabled {
          color: #ccd0d7;
          pointer-events: none;
        }

        &:hover {
          background-color: #f0f0f2;
        }

        &.selected {
          background-color: $primary;
          color: #fff;
        }
      }
    }

    &-years,
    &-months {
      span {
        height: 40px;
        line-height: 40px;
        width: 25%;
      }
    }

    &-days,
    &-dates {
      span {
        height: 30px;
        line-height: 30px;
        width: 14.2857143%;
      }
    }

    &.is-disabled {
      opacity: .65;
      pointer-events: none;
    }

    &.is-invalid {
      input,
      input:focus {
        border-color: #ed4259;
      }
    }
  }
</style>
