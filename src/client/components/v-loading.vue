<template>
  <v-backdrop class="v-loading" v-if="show">
    <v-align>
      <v-spinner></v-spinner>
    </v-align>
  </v-backdrop>
</template>

<script>
  import vAlign from './v-align.vue';
  import vBackdrop from './v-backdrop.vue';
  import vSpinner from './v-spinner.vue';

  export default {
    components: {
      vAlign,
      vBackdrop,
      vSpinner,
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="sass">
  .v-loading {
    background-color: rgba(0, 0, 0, .15);
  }
</style>
