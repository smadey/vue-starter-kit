<template>
  <div class="v-scroll-magic">
    <slot></slot>
  </div>
</template>

<script>
  /* eslint-disable max-len */

  /**
   * alias:
   * 'TweenMax': path.resolve('node_modules/gsap/src/uncompressed/TweenMax.js'),
   * 'TweenLite': path.resolve('node_modules/gsap/src/uncompressed/TweenLite.js'),
   * 'TimelineMax': path.resolve('node_modules/gsap/src/uncompressed/TimelineMax.js'),
   * 'ScrollMagic': path.resolve('node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
   * 'ScrollMagic-gsap': path.resolve('node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
   * 'ScrollMagic-debug': path.resolve('node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
   */

  /**
example:
<v-scroll-magic v-if="phases.length" :phases="phases">
  <div class="imgs">
    <div class="img img-1"></div>
    <div class="img img-2"></div>
    <div class="img img-3"></div>
  </div>

  <ul>
    <li v-show="phase == 1" transition="fade">
      完善的作家孵化和培养体系，打造作家、读者、平台互生共荣的文化生态体系。
    </li>
    <li v-show="phase == 2" transition="fade">
      原创小说已覆盖行业 90% 以上，覆盖200多种内容品类。
    </li>
    <li v-show="phase == 3" transition="fade">
      以 QQ 阅读为中心，包罗网络原创、传统出版、音频听书等品牌功能的完整产品矩阵。
    </li>
  </ul>
</v-scroll-magic>

[
  {
    target: '.img-1',
    duration: 1,
    fromVars: {
      opacity: 0,
      top: -20,
    },
    toVars: {
      opacity: 1,
      top: 0,
      onStart: () => (this.phase = 1),
      onReverseComplete: () => (this.phase = 0),
    },
  },
  {
    target: '.img-2',
    duration: 1,
    fromVars: {
      opacity: 0,
      left: 20,
    },
    toVars: {
      opacity: 1,
      left: 0,
      onStart: () => (this.phase = 2),
      onReverseComplete: () => (this.phase = 1),
    },
  },
  {
    target: '.img-3',
    duration: 1,
    fromVars: {
      opacity: 0,
      top: 20,
    },
    toVars: {
      opacity: 1,
      top: 0,
      onStart: () => (this.phase = 3),
      onReverseComplete: () => (this.phase = 2),
    },
  },
]
   */

  import TweenMax from 'TweenMax';
  import TimelineMax from 'TimelineMax';
  import ScrollMagic from 'ScrollMagic';
  import 'ScrollMagic-gsap';
  import 'ScrollMagic-debug';

  export default {
    props: {
      phases: Array,
      triggerHook: {
        type: String,
        default: 'onLeave',
      },
      duration: {
        type: Number,
        default: 1000,
      },
      offset: {
        type: Number,
        default: -20,
      },
    },

    beforeDestroy() {
      if (this.controller) {
        this.controller.destroy(true);
      }
    },

    watch: {
      phases() {
        this.initScene();
      },
    },

    ready() {
      this.initScene();
    },

    methods: {
      initScene() {
        if (!this.phases.length) {
          return;
        }

        if (!this.controller) {
          this.controller = new ScrollMagic.Controller();
        }

        const tween = new TimelineMax();
        const scene = new ScrollMagic.Scene({
          triggerElement: this.$el,
          triggerHook: this.triggerHook,
          duration: this.duration,
          offset: this.offset,
        });

        this.phases.forEach(d => {
          const target = this.$el.querySelectorAll(d.target);
          tween.add(TweenMax.fromTo(target, d.duration, d.fromVars, d.toVars));
        });

        scene.setTween(tween).setPin(this.$el).addIndicators();
        this.controller.addScene(scene);
      },
    },
  };
</script>

<style lang="sass">
  .v-scroll-magic {
  }
</style>
