<template>
  <div class="v-range" :class="computedClasses">
    <input type="range" v-model="value" :min="min" :max="max">
    <div class="items">
      <div :style="itemsValueStlye"></div>
      <span v-for="d in items" :style="itemStyle"
         :class="{ on: d <= value }"
         @click="value = d"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: Number,
      min: Number,
      max: Number,
      step: {
        type: Number,
        default: 1,
      },
      theme: String,
    },
    computed: {
      computedClasses() {
        const classes = {
          disabled: this.disabled,
        };

        if (this.theme) {
          classes[`v-range-${this.theme}`] = true;
        }

        return classes;
      },

      items() {
        const items = [];
        const step = this.step;
        const max = this.max;
        let item = this.min;

        while (item <= max) {
          items.push(item);
          item += step;
        }

        return items;
      },

      itemStyle() {
        return {
          'margin-right': `${100 / (this.items.length - 1)}%`,
        };
      },

      itemsValueStlye() {
        const max = this.max;
        const min = this.min;
        const val = this.value;

        const per = (val - min) / (max - min);

        return {
          width: `${per * 100}%`,
        };
      },
    },
  };
</script>

<style lang="sass">
  @import './sass/variable.scss';

  .v-range {
    display: inline-block;
    vertical-align: middle;
    position: relative;

    input {
      height: 20px;
      opacity: 0;
      position: relative;
      vertical-align: middle;
      width: 100%;
      z-index: 2;

      &::-webkit-slider-runnable-track {
        color: #bdbdbd;
      }

      &:hover + .items {
        div:after {
          box-shadow: 0 0 2px rgba(93, 93, 93, .7);
          height: $range-thumb-size;
          margin-left: -$range-thumb-size / 2;
          margin-top: -$range-thumb-size / 2;
          width: $range-thumb-size;
        }
      }

      &:active + .items {
        div:after {
          box-shadow: none;
          height: $range-thumb-size;
          margin-left: -$range-thumb-size / 2;
          margin-top: -$range-thumb-size / 2;
          width: $range-thumb-size;
        }
      }
    }

    .items {
      background-color: $range-color;
      height: $range-items-height;
      left: $range-item-size / 2;
      margin-top: -$range-items-height / 2;
      position: absolute;
      right: $range-item-size / 2;
      top: 50%;
      z-index: 1;

      div {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        z-index: 2;

        &:after {
          background-color: #fff;
          border: 1px solid $range-color;
          border-radius: 50%;
          content: '';
          height: $range-item-size;
          left: 100%;
          margin-left: -$range-item-size / 2;
          margin-top: -$range-item-size / 2;
          position: absolute;
          top: 50%;
          width: $range-item-size;
        }
      }

      span {
        background-color: #cbcbcb;
        border-radius: 50%;
        display: block;
        height: 100%;
        float: left;
        position: relative;
        width: 0;
        z-index: 1;

        &:before, &:after {
          content: '';
          position: absolute;
        }

        &:before {
          background-color: inherit;
          border-radius: inherit;
          bottom: -($range-item-size - $range-items-height) / 2;
          left: -$range-item-size / 2;
          right: -$range-item-size / 2;
          top: -($range-item-size - $range-items-height) / 2;
        }

        &:after {
          bottom: -($range-item-clickable-size - $range-items-height) / 2;
          left: -$range-item-clickable-size / 2;
          right: -$range-item-clickable-size / 2;
          top: -($range-item-clickable-size - $range-items-height) / 2;
        }

        &:last-child {
          margin-right: 0 !important;
          right: 0;
          position: absolute;
        }

        &.on {
          background-color: #cbcbcb;
        }
      }
    }

    &-success {
      input:active + .items {
        div:after {
          border-color: $success;
        }
      }

      .items {
        div {
          background-color: $success;
        }

        span {
          &.on {
            background-color: $success;
          }
        }
      }
    }

    &-danger {
      input:active + .items {
        div:after {
          border-color: $danger;
        }
      }

      .items {
        div {
          background-color: $danger;
        }

        span {
          &.on {
            background-color: $danger;
          }
        }
      }
    }

    &.is-disabled {
      opacity: .65;
      pointer-events: none;
    }
  }
</style>
