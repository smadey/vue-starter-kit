<template>
  <div class="v-select" :class="computedClasses">
    <div class="v-select-selected" @click="toggle">
      <span>{{computedLabel}}</span>
      <i class="v-select-caret"></i>
    </div>

    <partial name="errors"></partial>

    <div class="v-select-options" v-show="active">
      <ul>
        <li v-for="option in options"
          :class="{selected: option[optionValueKey] == computedValue}"
          @click="select(option)">
          {{option[optionLabelKey]}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import boundMixin from './mixins/bound';
  import validatorMixin from './mixins/validator';

  export default {
    mixins: [boundMixin, validatorMixin],

    props: {
      value: {},
      label: {},
      options: Array,
      optionValueKey: {
        type: String,
        default: 'id', // 与后端统一
      },
      optionLabelKey: {
        type: String,
        default: 'name', // 与后端统一
      },
      disabled: Boolean,
    },
    data() {
      return {
        active: false,
      };
    },
    computed: {
      computedClasses() {
        return {
          'is-disabled': this.disabled,
          'is-invalid': !this.valid,
        };
      },
      computedValue() {
        if (this.value != null) {
          return this.value;
        }

        const options = this.options;

        if (options && options.length) {
          return options[0][this.optionValueKey];
        }

        return undefined;
      },
      computedLabel() {
        const options = this.options;

        if (options && options.length) {
          const optionValueKey = this.optionValueKey;
          const optionLabelKey = this.optionLabelKey;
          const computedValue = this.computedValue;

          let i = options.length;
          let option;

          while (i--) {
            option = options[i];

            if (option[optionValueKey] === computedValue) {
              return option[optionLabelKey];
            }
          }
        }

        return this.label;
      },
    },
    methods: {
      toggle() {
        if (!this.options || !this.options.length) {
          return;
        }

        if (this.active) {
          this.hide();
        } else {
          this.show();
        }
      },
      show() {
        this.active = true;
        this.enableCheckBound(() => this.hide());
      },
      hide() {
        this.active = false;
        this.disableCheckBound();
      },
      select(option) {
        this.hide();
        this.value = option[this.optionValueKey];
        this.label = option[this.optionLabelKey];

        this.validate();
        this.$emit('change', this.value, this.label);
      },
    },
  };
</script>

<style lang="sass">
  @import "./sass/variable.scss";
  @import "./sass/mixins.scss";

  .v-select {
    display: inline-block;
    position: relative;
    vertical-align: middle;

    &-selected {
      border: 1px solid #d1d2d4;
      color: #808080;
      cursor: pointer;
      position: relative;
      padding-right: 30px;
      padding-left: 10px;
      height: 30px;
      line-height: 30px;

      &:hover {
        border-color: #b1b3b6;
        color: #4a4a4a;
      }
    }

    &-caret {
      color: #A6A6A6;
      border-top: 5px solid;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      height: 0;
      position: absolute;
      right: 10px;
      top: 12px;
      width: 0;
    }

    &-options {
      background-color: #fff;
      border-radius: 3px;
      border-top: 1px solid #eee;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      max-height: 300px;
      min-width: 200px;
      overflow-y: auto;
      position: absolute;
      transition: opacity 0.218s;
      width: 100%;
      z-index: 200;

      li {
        color: #808080;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        padding: 0 12px;
        text-align: left;
        white-space: nowrap;

        &.selected,
        &:hover {
          background-color: #e1e1e1;
        }
      }
    }

    &-errors {
      @extend %validator-errors;
    }

    &.is-disabled {
      @extend %disabled;
    }

    &.is-invalid {
      .v-select-selected {
        border-color: $danger;
      }
    }
  }
</style>
