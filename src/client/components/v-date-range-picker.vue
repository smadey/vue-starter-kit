<template>
  <div class="v-date-range-picker" :class="computedClasses">
    <v-date-picker
      :value.sync="start"
      :min="min"
      :max="end"
      @change="onStartChange"></v-date-picker>
    <span>至</span>
    <v-date-picker
      :value.sync="end"
      :min="start"
      :max="max"
      @change="onEndChange"></v-date-picker>
  </div>
</template>

<script>
  import vDatePicker from './v-date-picker.vue';

  export default {
    components: {
      vDatePicker,
    },

    props: {
      start: String,
      end: String,
      min: String,
      max: String,
      disabled: Boolean,
    },

    computed: {
      computedClasses() {
        return {
          'is-disabled': this.disabled,
        };
      },
    },

    methods: {
      onStartChange(date, mDate) {
        this.$emit('start-change', date, mDate);
      },
      onEndChange(date, mDate) {
        this.$emit('end-change', date, mDate);
      },
    },
  };
</script>

<style lang="sass">
  .v-date-range-picker {
    display: inline-block;
    vertical-align: middle;

    .v-date-picker {
      float: left;
      width: 90px;

      &:last-child {
        .v-date-picker-picker {
          right: 0;
        }
      }
    }

    & > span {
      float: left;
      line-height: 30px;
      text-align: center;
      width: 30px;
    }

    &.is-disabled {
      opacity: .65;
      pointer-events: none;
    }
  }
</style>
