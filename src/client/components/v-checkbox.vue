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
        background-position: -32px 0;
      }
    }

    i {
      background: #fff url('./img/inputs.png') 0 0 / 160px 16px no-repeat;
      display: inline-block;
      height: 15px;
      margin-top: -2px;
      vertical-align: middle;
      width: 15px;
    }

    &:hover i {
      background-position: -16px 0;
    }

    &.is-disabled {
      @extend %disabled;

      i {
        background-position: -48px 0;
      }

      input:checked + i {
        background-position: -64px 0;
      }
    }
  }
</style>
