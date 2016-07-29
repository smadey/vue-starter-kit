<template>
  <div class="app container">
    <v-steps :steps="['step1', 'step2', 'step3', 'step4', 'step5']"
      :current-step-index="3" :step-component="stepComponent"></v-steps>

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
    <v-modal :show="modalShow" :mode="modalMode" :body="modalBody"
      @resolve="resolveModal" @reject="rejectModal"></v-modal>
  </div>
</template>

<script>
  import modalMixin from '../components/mixins/modal';

  import vScrollMagic from '../components/v-scroll-magic.vue';

  import vSteps from '../components/v-steps.vue';

  export default {
    mixins: [modalMixin],

    components: {
      vScrollMagic,
      vSteps,
      step: {
        template: '<div class="step-item">This is step "{{step}}"</div>',
        props: ['step'],
      },
    },

    data() {
      return {
        phase: 0,
        stepComponent: this.$options.components.step,
        phases: [
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
        ],
      };
    },

    ready() {
      // this.openModal('primary', 'Hello, Vue');
    },
  };
</script>

<style lang="sass">
  @import "../sass/variable.scss";
  @import "../sass/reset.scss";
  @import "../sass/font-awesome.scss";
  @import "../sass/utils.scss";
  @import "../sass/transition.scss";

  html, body {
    height: 100%;
  }

  .app {
    // background: url('../img/logo.png') 50% 50% / 200px 200px no-repeat;
    height: 100%;

    .v-scroll-magic {
      margin-bottom: 1000px;
      margin-top: 600px;

      .imgs {
        height: 511px;
        position: relative;

        .img {
          background-position: 50% 50%;
          background-repeat: no-repeat;
          background-size: cover;
          height: 100%;
          left: 0;
          opacity: 0;
          position: absolute;
          top: 0;
          width: 100%;

          &-1 {
            background-image: url('http://qidian.gtimg.com/yuewen/v1/css/images/yw-hd-bg-1_l.jpg');
          }

          &-2 {
            background-image: url('http://qidian.gtimg.com/yuewen/v1/css/images/yw-hd-bg-2_l.jpg');
          }

          &-3 {
            background-image: url('http://qidian.gtimg.com/yuewen/v1/css/images/yw-hd-bg-3_l.jpg');
          }
        }
      }

      ul {
        margin-top: 50px;
        text-align: center;

        .fade-leave {
          transition: none;
        }
      }
    }
  }

</style>
