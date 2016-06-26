<template>
  <div class="v-align">
    <div class="v-align-inner" :style="style">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      horizontal: String,
      vertical: String,
    },
    computed: {
      style() {
        return {
          'text-align': this.horizontal,
          'vertical-align': this.vertical,
        };
      },
    },
  };
</script>

<style lang="sass">
  .v-align {
    display: table;
    height: 100%;
    width: 100%;

    &-inner {
      display: table-cell;
      vertical-align: middle;
    }
  }
</style>
