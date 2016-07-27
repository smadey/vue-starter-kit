<template>
  <label :for="vid" class="v-radio" :class="{ 'is-disabled': disabled }">
    <input type="radio" :id="vid" :name="computedName" :value="radioValue" v-model="value">
    <i></i>
    <slot></slot>
  </label>
</template>

<script>
  import vidMixin from './mixins/vid';

  export default {
    mixins: [vidMixin],
    props: {
      value: {},
      name: String,
      radioValue: {
        require: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      computedName() {
        return this.name || this.$parent.name;
      },
    },
  };
</script>

<style lang="sass">
  @import "./sass/variable.scss";
  @import "./sass/mixins.scss";

  .v-radio {
    cursor: pointer;
    display: inline-block;
    height: 16px;
    line-height: 1;
    vertical-align: middle;

    & + & {
      margin-left: 20px;
    }

    input {
      clip: rect(0, 0, 0, 0);
      margin: 1px 0 0 3px;
      position: absolute;

      &:checked + i {
        background-color: $primary;
        border-color: $primary;

        &:after {
          transform: rotate(45deg) scale(1);
        }
      }
    }

    i {
      background-color: #fff;
      border: 1px solid #e0e1e2;
      border-radius: 50%;
      display: inline-block;
      height: 16px;
      margin-top: -1px;
      position: relative;
      transition: border-color .1s cubic-bezier(.71,-.46,.29,1.46),
        background-color .1s cubic-bezier(.71,-.46,.29,1.46);
      vertical-align: middle;
      width: 16px;

      &:after {
        border: 2px solid #fff;
        border-left: 0;
        border-top: 0;
        content: '';
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scale(0);
        transition: all .2s cubic-bezier(.71,-.46,.88,.6);
        width: 4px;
      }
    }

    &:hover {
      i {
        border-color: $primary;
      }
    }

    &.is-disabled {
      @extend %disabled;
    }
  }
</style>
