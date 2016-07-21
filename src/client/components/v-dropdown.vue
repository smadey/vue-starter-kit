<template>
  <div class="v-dropdown" :class="computedClasses">
    <div class="v-dropdown-toggle" @click="toggle">
      <slot></slot>
    </div>

    <div class="v-dropdown-menu" v-show="active">
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<script>
  import boundMixin from './mixins/bound';

  export default {
    mixins: [boundMixin],

    props: {
      active: Boolean,
      disabled: Boolean,
    },

    computed: {
      computedClasses() {
        return {
          'is-disabled': this.disabled,
        };
      },
    },

    watch: {
      active(val) {
        if (val) {
          this.enableCheckBound(() => this.hide());
        } else {
          this.disableCheckBound();
        }
      },
    },

    methods: {
      toggle() {
        if (this.active) {
          this.hide();
        } else {
          this.show();
        }
      },
      show() {
        this.active = true;
      },
      hide() {
        this.active = false;
      },
    },
  };
</script>

<style lang="sass">
  @import "./sass/variable.scss";
  @import "./sass/mixins.scss";

  .v-dropdown {
    position: relative;

    &-toggle {
      cursor: pointer;
    }

    &-menu {
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      left: 0;
      max-height: 300px;
      min-width: 160px;
      overflow-y: auto;
      padding: 5px 0;
      position: absolute;
      transition: opacity 0.218s;
      z-index: 200;
    }

    &.is-disabled {
      @extend %disabled;
    }
  }
</style>
