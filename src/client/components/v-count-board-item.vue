<template>
  <div class="v-count-board-item up" :class="computedClass">
    <div class="current top">{{current}}</div>
    <div class="next top">{{next}}</div>
    <div class="current bottom">{{current}}</div>
    <div class="next bottom">{{next}}</div>
  </div>
</template>

<script>
  const PHASE_DOING = 'doing';
  const PHASE_DONE = 'done';

  export default {
    props: ['value'],

    data() {
      return {
        current: this.value,
        next: this.value,
        phase: null,
      };
    },

    computed: {
      computedClass() {
        const classes = {};

        if (this.phase) {
          classes[this.phase] = true;
        }

        return classes;
      },
    },

    watch: {
      value(val, oldVal) {
        if (val === oldVal) {
          return;
        }

        this.setupAnimation();

        setTimeout(() => this.executeAnimation(), 20);

        setTimeout(() => this.finishAnimation(), 900);
      },
    },

    methods: {
      setupAnimation() {
        this.current = this.next;
        this.next = this.value;
        this.phase = null;
      },
      executeAnimation() {
        this.phase = PHASE_DOING;
      },
      finishAnimation() {
        this.phase = PHASE_DONE;
      },
    },

  };
</script>

<style lang="sass">
  $height: 72px;
  $width: 56px;

  .v-count-board-item {
    height: $height;
    line-height: $height;
    perspective: 500px;
    position: relative;
    text-align: center;
    transform: translateZ(0);
    width: $width;

    .current, .next {
      color: #fff;
      font-size: 45px;
      left: 0;
      position: absolute;
      top: 0;
      transform-origin: 0 #{$height / 2} 0;
      width: 100%;
    }

    .top {
      background-color: #2b90d9;
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
      height: 50%;
      overflow: hidden;
    }

    .bottom {
      background-color: #00b9f1;
      border-radius: 24px;
      height: 100%;
    }

    &.done {
      .current {
        display: none;
      }
    }

    &.down {
      .top.current {
        z-index: 4;
      }

      .top.next {
        z-index: 3;
      }

      .bottom.next {
        transform: rotate3d(1, 0, 0, 90deg);
        z-index: 2;
      }

      .bottom.current {
        z-index: 1;
      }

      &.doing .top.current {
        transform: rotate3d(1, 0, 0, -90deg);
        transition: transform 0.2625s ease-in;
      }

      &.doing .bottom.next,
      &.done .bottom.next, {
        transform: rotate3d(1, 0, 0, 0);
        transition: transform 0.35s cubic-bezier(0.375, 1.495, 0.61, 0.78) 0.35s;
      }
    }

    &.up {
      .top.next {
        transform: rotate3d(1, 0, 0, -90deg);
        z-index: 4;
      }

      .top.current {
        transform-style: flat;
        z-index: 3;
      }

      .bottom.current {
        z-index: 2;
      }

      .bottom.next {
        z-index: 1;
      }

      &.doing .bottom.current {
        transform: rotate3d(1, 0, 0, 90deg);
        transition: transform 0.35s ease-in;
      }

      &.doing .top.next,
      &.done .top.next, {
        transform: none;
        transition: transform 0.35s ease-out 0.35s;
      }
    }

  }

</style>
