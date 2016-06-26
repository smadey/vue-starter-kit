<template>
  <div class="v-datetime-picker" :class="computedClasses">
    <v-date-picker placeholder="日期"
      :value="date"
      :min="min"
      :max="max"
      @change="onDateChange"></v-date-picker>
    <v-time-picker placeholder="时间"
      :date="date"
      :value="time"
      :min="min"
      :max="max"
      :disabled="!date"
      @change="onTimeChange"></v-date-picker>
  </div>
</template>

<script>
  import moment from 'moment';

  import vDatePicker from './v-date-picker.vue';
  import vTimePicker from './v-time-picker.vue';

  export default {
    components: {
      vDatePicker,
      vTimePicker,
    },

    props: {
      value: String,
      min: String,
      max: String,
      disabled: Boolean,
    },

    computed: {
      date() {
        return this.value ? this.value.split(' ')[0] : '';
      },
      time() {
        return this.value ? this.value.split(' ')[1] : '';
      },
      computedClasses() {
        return {
          'is-disabled': this.disabled,
        };
      },
    },

    methods: {
      onDateChange(date) {
        this.value = this.date ? this.value.replace(this.date, date) : date;
        this.emitChange();
      },
      onTimeChange(time) {
        this.value = this.time ?
          this.value.replace(this.time, time) :
          `${this.date} ${time}`;
        this.emitChange();
      },
      emitChange() {
        this.$emit('change', this.value, moment(this.value, 'YYYY-MM-DD HH:mm'));
      },
    },
  };
</script>

<style lang="sass">
  .v-datetime-picker {
    display: inline-block;
    min-width: 160px;
    vertical-align: middle;

    .v-date-picker {
      float: left;
      margin-right: 10px;
      width: 95px;
    }

    .v-time-picker {
      float: left;
      width: 55px;
    }
    &.is-disabled {
      opacity: .65;
      pointer-events: none;
    }
  }
</style>
