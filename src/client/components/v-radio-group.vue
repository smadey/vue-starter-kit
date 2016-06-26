<template>
  <div class="v-radio-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        require: true,
      },
    },
  };
</script>

<style lang="sass">
  .v-radio-group {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
  }
</style>
