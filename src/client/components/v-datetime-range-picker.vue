<template>
  <div class="v-datetime-range-picker" :class="computedClasses">
    <v-datetime-picker
      :value.sync="start"
      :min="min"
      :max="end"
      @change="onStartChange"></v-datetime-picker>
    <span>至</span>
    <v-datetime-picker
      :value.sync="end"
      :min="start"
      :max="max"
      @change="onEndChange"></v-datetime-picker>
  </div>
</template>

<script>
  import vDatetimePicker from './v-datetime-picker.vue';

  export default {
    components: {
      vDatetimePicker,
    },

    props: {
      start: String,
      end: String,
      min: [String, Object],
      max: [String, Object],
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
      onStartChange(datetime, mDatetime) {
        this.$emit('start-change', datetime, mDatetime);
      },
      onEndChange(datetime, mDatetime) {
        this.$emit('end-change', datetime, mDatetime);
      },
    },
  };
</script>

<style lang="sass">
  .v-datetime-range-picker {
    display: inline-block;
    min-width: 350px;
    vertical-align: middle;

    .v-datetime-picker {
      float: left;
      width: 160px;

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
