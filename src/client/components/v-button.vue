<template>
  <button :type="type" class="v-button" :class="computedClasses">
    <slot></slot>
  </button>
</template>

<script>
  import idMixin from './mixins/id';

  export default {
    mixins: [idMixin],
    props: {
      type: {
        type: String,
        default: 'button',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
      },
      theme: {
        type: String,
      },
    },
    computed: {
      computedClasses() {
        const classes = {
          disabled: this.disabled,
        };

        if (this.size) {
          classes[`v-button-${this.size}`] = true;
        }

        if (this.theme) {
          classes[`v-button-${this.theme}`] = true;
        }

        return classes;
      },
    },
  };
</script>

<style lang="sass">
  .v-button {
    background-image: none;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    line-height: 20px;
    margin-bottom: 0;
    padding: 4px 16px;
    text-align: center;
    touch-action: manipulation;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;

    &:hover {
      // 使用此方法可取代为每种类型的 hover 设置样式
      box-shadow: 0 0 9999px rgba(0, 0, 0, .15) inset;
    }

    &:active {
      // 使用此方法可取代为每种类型的 active 设置样式
      box-shadow: 0 0 9999px rgba(0, 0, 0, .3) inset;
    }

    &.disabled {
      box-shadow: none;
      cursor: not-allowed;
      opacity: 0.65;
      pointer-events: none;
    }

    &-large {
      border-radius: 3px;
      font-size: 16px;
      line-height: 24px;
      padding: 7px 40px;
    }

    &, &-default {
      background-color: #fff;
      border-color: #d1d2d4;
      color: #4a4a4a;

      // &:hover {
      //   background-color: #e6e6e6;
      //   border-color: #b1b3b6;
      //   color: #4a4a4a;
      // }
    }

    &-primary {
      background-color: #2972cc;
      border-color: #2566b7;
      color: #fff;

      // &:hover {
      //   background-color: #205aa2;
      //   border-color: #1a4a84;
      //   color: #fff;
      // }
    }

    &-danger {
      background-color: #ed4259;
      border-color: #eb2b45;
      color: #fff;

      // &:hover {
      //   background-color: #e61632;
      //   border-color: #c5132b;
      //   color: #fff;
      // }
    }

    &-link {
      background-color: transparent;
      border-color: transparent;
      color: #2972cc;
    }
  }
</style>
