<template>
  <label :for="vid" class="v-checkbox" :class="{ 'is-disabled': disabled }">
    <input type="checkbox" :id="vid" :name="name" :value="checkboxValue" v-model="value">
    <i></i>
    <slot></slot>
  </label>
</template>

<script>
  import vidMixin from './mixins/vid';

  export default {
    mixins: [vidMixin],
    props: {
      value: {
        require: true,
      },
      checkboxValue: {},
      name: String,
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="sass">
  @import "./sass/variable.scss";
  @import "./sass/mixins.scss";

  .v-checkbox {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;

    input {
      clip: rect(0, 0, 0, 0);
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
      border-radius: 1px;
      display: inline-block;
      height: 16px;
      margin-top: -2px;
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
