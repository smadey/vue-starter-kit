<template>
  <ul class="v-steps" :class="{ fallback: fallback }">
    <li v-for="step in steps">
      <div class="step" :class="{ on: $index < currentStepIndex }">
        <span v-if="!stepComponent">{{step}}</span>
        <component v-else :is="stepComponent" :step="step"></component>
      </div>
    </li>
  </ul>
</template>

<script>
  const IS_LT_IE10 = document.documentMode < 10;

  export default {
    props: {
      steps: Array,
      currentStepIndex: Number,
      stepComponent: Function,
    },

    data() {
      return {
        fallback: IS_LT_IE10,
      };
    },
  };
</script>

<style lang="sass">
  @import "./sass/variable.scss";

  .v-steps {
    display: flex;

    & > li {
      flex: 1;

      & + li {
        margin-left: $steps-arrow + $steps-gap;
      }

      &:first-child .step:before, &:last-child .step:after {
        display: none;
      }
    }

    &.fallback {
      display: table;
      width: 100%;

      & > li {
        display: table-cell;
        padding: 0 #{($steps-arrow + $steps-gap) / 2};

        &:first-child {
          padding-left: 0;
        }

        &:last-child {
          padding-right: 0;
        }
      }
    }

    .step {
      background-color: $steps-bg;
      border-color: $steps-bg;
      color: $steps-color;
      height: $steps-height;
      line-height: $steps-height;
      position: relative;
      text-align: center;

      &:before, &:after {
        border-style: solid;
        border-width: $steps-height / 2 0 $steps-height / 2 $steps-arrow;
        content: ' ';
        height: 0;
        margin-top: -$steps-height / 2;
        position: absolute;
        top: 50%;
        width: 0;
      }

      &:before {
        border-color: inherit;
        border-left-color: transparent;
        right: 100%;
      }

      &:after {
        border-color: transparent;
        border-left-color: inherit;
        left: 100%;
      }

      &.on {
        background-color: $steps-active-bg;
        border-color: $steps-active-bg;
        color: $steps-active-color;
      }
    }
  }
</style>
