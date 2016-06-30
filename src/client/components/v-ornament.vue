<template>
  <div class="v-ornament" :class="computedClasses" :style="computedStyle">
    <slot></slot>
  </div>
</template>

<script>
  import { util } from 'vue';

  function random(from, to) {
    let rand = Math.random();

    if (to > 0) {
      rand = rand * Math.abs(to - from) + Math.min(from, to);
    } else {
      rand = rand * from;
    }

    return Math.ceil(rand);
  }

  const PHASES = {
    READY: 'ready',
    MOVING: 'moving',
    FINISHED: 'finished',
  };

  export default {
    props: {
      groupWidth: Number,
      groupHeight: Number,
      minX: {
        type: Number,
        default: 0,
      },
      maxX: {
        type: Number,
        default: 100,
      },
      minY: {
        type: Number,
        default: 0,
      },
      maxY: {
        type: Number,
        default: 100,
      },
      moveable: Boolean,
      angle: {
        type: Number,
        default: 0,
      },
      minSpeed: {
        type: Number,
        default: 10,
      },
      maxSpeed: {
        type: Number,
        default: 10,
      },
    },

    data() {
      return {
        phase: PHASES.READY,
      };
    },

    computed: {
      computedClasses() {
        const classes = {};

        classes[this.phase] = true;

        return classes;
      },
      computedStyle() {
        const style = {
          transform: `rotate(${this.angle}deg)`,
        };

        if (!this.moveable || this.phase === PHASES.READY) {
          style.left = `${this.x}px`;
          style.top = `${this.y}px`;
        } else {
          style.left = `${this.finishedPointer.x}px`;
          style.top = `${this.finishedPointer.y}px`;
        }

        if (this.moveable) {
          style['transition-duration'] = this.duration;
        }

        return style;
      },
      x() {
        return Math.round(random(this.minX, this.maxX) / 100 * this.groupWidth);
      },
      y() {
        return Math.round(random(this.minY, this.maxY) / 100 * this.groupHeight);
      },
      ratio() {
        return Math.tan(this.angle % 360 / 180 * Math.PI);
      },
      finishedPointer() {
        const w = this.groupWidth;
        const h = this.groupHeight;

        const angle = this.angle % 360;
        const ratio = this.ratio;

        const x1 = this.x;
        const y1 = this.y;

        let x2;
        let y2;
        let per;

        if (angle <= 180) {
          x2 = w;
          y2 = (x2 - x1) / -ratio + y1;
          per = (w - x1) / w;

          if (y2 < 0) {
            x2 = y1 * ratio + x1;
            y2 = 0;
            per = y1 / h;
          } else if (y2 > h) {
            x2 = (h - y1) * -ratio + x1;
            y2 = h;
            per = (h - y1) / h;
          }
        } else {
          x2 = 0;
          y2 = (x2 - x1) / -ratio + y1;
          per = x1 / w;

          if (y2 < 0) {
            x2 = x1 - y1 * -ratio;
            y2 = 0;
            per = y1 / h;
          } else if (y2 > h) {
            x2 = x1 - (h - y1) * ratio;
            y2 = h;
            per = (h - y1) / h;
          }
        }

        return { x: Math.ceil(x2), y: Math.ceil(y2), per };
      },
      duration() {
        const speed = random(this.minSpeed, this.maxSpeed);
        const duration = 100 * this.finishedPointer.per / speed;

        return `${duration}s`;
      },
    },

    ready() {
      if (this.moveable) {
        setTimeout(() => {
          this.startMove();
        }, 0);
      }
    },

    beforeDestroy() {
      if (this.moveable) {
        this.finishMove();
      }
    },

    methods: {
      startMove() {
        if (this.phase === PHASES.MOVING) {
          return;
        }

        this.phase = PHASES.MOVING;
        this.bindFinishHandler();
      },

      bindFinishHandler() {
        this.finishHandler = () => {
          util.off(this.$el, util.transitionEndEvent, this.finishHandler);
          this.finishHandler = null;
          this.finishMove();
        };

        util.on(this.$el, util.transitionEndEvent, this.finishHandler);
      },

      finishMove() {
        if (this.phase === PHASES.finished) {
          return;
        }

        this.phase = PHASES.finished;
        this.$emit('remove');

        if (this.finishHandler) {
          this.finishHandler();
        }
      },
    },
  };
</script>

<style lang="sass">
  .v-ornament {
    position: absolute;
    transition-property: all;
    transition-timing-function: linear;

    &.moving {
      transition-property: all;
    }

    &.finished {
      display: none;
    }
  }
</style>
