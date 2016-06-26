<template>
  <div class="v-scroll">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll';

  export default {
    ready() {
      new IScroll(this.$el, {
        mouseWheel: true,
        scrollbars: true,
        fadeScrollbars: true,
      });
    },
  };
</script>

<style lang="sass">
  .v-scroll {
    height: 100%;

    .iScrollVerticalScrollbar {
      right: 3px !important;
      width: 6px !important;
    }

    .iScrollIndicator {
      background: rgba(0, 0, 0, 0.3) !important;
      border-width: 0 !important;
    }
  }
</style>
