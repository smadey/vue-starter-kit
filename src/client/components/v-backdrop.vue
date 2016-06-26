<template>
  <div class="v-backdrop" :style="{'z-index': zIndex}" :transition="transition">
    <slot></slot>
  </div>
</template>

<script>
  let zIndex = 200;

  export default {
    props: {
      transition: {
        type: String,
        default: 'backdrop',
      },
    },
    data() {
      return {
        zIndex: zIndex++,
      };
    },
  };
</script>

<style lang="sass">
  .v-backdrop {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }

  .backdrop {
    &-transition {
      transition: opacity ease-out .2s;
    }

    &-enter, &-leave {
      opacity: 0;
    }
  }
</style>
