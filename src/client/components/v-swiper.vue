<template>
  <div class="v-swiper swiper swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';

  export default {
    props: ['direction', 'initialSlide', 'runCallbacksOnInit'],

    ready() {
      new Swiper(this.$el, {
        initialSlide: this.initialSlide,
        direction: this.direction,
        runCallbacksOnInit: this.runCallbacksOnInit,
        onInit: (swiper) => {
          this.$emit('init', swiper);
        },
        onTransitionStart: (swiper) => {
          this.$emit('transition-start', swiper);
        },
        onSlideChangeStart: (swiper) => {
          this.$emit('slide-change-start', swiper);
        },
        onSlideChangeEnd: (swiper) => {
          this.$emit('slide-change-end', swiper);
        },
      });
    },
  };
</script>

<style lang="sass">
  @import "./sass/swiper.scss";
</style>
