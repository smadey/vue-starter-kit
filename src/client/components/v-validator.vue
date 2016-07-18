<template>
  <div class="v-validator">
    <partial name="errors"></partial>
  </div>
</template>

<script>
  import validatorMixin from './mixins/validator';

  export default {
    mixins: [validatorMixin],
    props: {
      value: {},
    },
  };
</script>

<style lang="sass">
  @import "./sass/variable.scss";
  @import "./sass/mixins.scss";

  .v-validator {
    &-errors {
      @extend %validator-errors;
    }
  }
</style>
