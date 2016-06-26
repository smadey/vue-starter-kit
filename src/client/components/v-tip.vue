<template>
  <v-backdrop class="v-tip" v-if="active" @click="close">
    <v-align horizontal="center">
      <p class="v-tip-text" :class="'v-tip-text-' + mode">{{text}}</p>
    </v-align>
  </v-backdrop>
</template>

<script>
  import vAlign from './v-align.vue';
  import vBackdrop from './v-backdrop.vue';

  export default {
    components: {
      vAlign,
      vBackdrop,
    },
    props: {
      active: {
        type: Boolean,
        default: false,
      },
      mode: {
        type: String,
        default: 'success',
      },
      text: {
      },
      delay: {
        type: Number,
        default: 2500,
      },
    },
    watch: {
      active(val) {
        if (val) {
          this.clearTimer();
          this.timer = setTimeout(() => {
            this.close();
          }, this.delay);
        }
      },
    },
    methods: {
      clearTimer() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      },
      close() {
        this.active = false;
        this.clearTimer();
        this.$emit('close');
      },
    },
  };
</script>

<style lang="sass">
  .v-tip {
    background-color: rgba(0, 0, 0, .2);

    &-text {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      color: #fff;
      display: inline-block;
      margin-left: auto;
      margin-right: auto;
      max-width: 240px;
      padding: 10px 20px;
      outline: none;
      vertical-align: middle;

      &-success {
        background: #5CB85C;
        border: 1px solid #5CB85C;
      }

      &-error {
        background: #ed4259;
        border: 1px solid #ed4259;
      }
    }
  }
</style>
