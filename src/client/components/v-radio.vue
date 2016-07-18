<template>
  <label :for="vid" class="v-radio" :class="computedClasses">
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
      computedClasses() {
        const classes = {
          'v-radio-disabled': this.disabled,
        };

        return classes;
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
    vertical-align: middle;

    &-disabled {
      @extend %disabled;
    }

    & + & {
      margin-left: 20px;
    }

    input {
      clip: rect(0, 0, 0, 0);
      margin: 1px 0 0 3px;
      position: absolute;

      &:checked + i {
        background-position: -112px 0;
      }
    }

    i {
      background: url('./img/inputs.png') -80px 0 / 160px 16px no-repeat;
      display: inline-block;
      height: 15px;
      margin-top: -1px;
      vertical-align: middle;
      width: 15px;
    }

    &:hover i {
      background-position: -96px 0;
    }

    &.v-radio-disabled i {
      background-position: -128px 0;
      cursor: default;
    }

    &.v-radio-disabled input:checked + i {
      background-position: -144px 0;
    }
  }
</style>
