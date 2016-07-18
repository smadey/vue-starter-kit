<template>
  <button :type="type" class="v-button" :class="computedClasses">
    <slot></slot>
  </button>
</template>

<script>
  export default {
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
  @import "./sass/variable.scss";
  @import "./sass/mixins.scss";

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
      @extend %disabled;
    }

    &-large {
      border-radius: 3px;
      font-size: 16px;
      line-height: 24px;
      padding: 7px 40px;
    }

    &, &-default {
      background-color: $btn-default-bg;
      border-color: $btn-default-border;
      color: $btn-default-color;
    }

    &-primary {
      background-color: $btn-primary-bg;
      border-color: $btn-primary-border;
      color: $btn-primary-color;
    }

    &-danger {
      background-color: $btn-danger-bg;
      border-color: $btn-danger-border;
      color: $btn-danger-color;
    }

    &-link {
      background-color: $btn-link-bg;
      border-color: $btn-link-border;
      color: $btn-link-color;
    }
  }
</style>
