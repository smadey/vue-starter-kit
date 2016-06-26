<template>
  <label :for="id" class="v-checkbox" :class="{disabled: disabled}">
    <input type="checkbox" :id="id" :name="name" :value="checkboxValue" v-model="value">
    <i></i>
    <slot></slot>
  </label>
</template>

<script>
  import idMixin from './mixins/id';

  export default {
    mixins: [idMixin],
    props: {
      value: {
        require: true,
      },
      checkboxValue: {
      },
      name: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="sass">
  .v-checkbox {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;

    input {
      clip: rect(0, 0, 0, 0);
      margin: 1px 0 0 3px;
      position: absolute;

      &:checked + i {
        background-position: -32px 0;
      }
    }

    i {
      background: #fff url('./img/inputs.png') 0 0 / 160px 16px no-repeat;
      display: inline-block;
      height: 16px;
      position: relative;
      top: -1px;
      vertical-align: middle;
      width: 16px;
    }

    &:hover i {
      background-position: -16px 0;
    }

    &.disabled i {
      background-position: -48px 0;
      cursor: default;
    }

    &.disabled input:checked + i {
      background-position: -64px 0;
    }
  }
</style>
