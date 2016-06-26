<template>
  <div class="v-validator">
    <div class="v-validator-errors" v-if="!valid">
      <p v-if="invalids.required">
        <slot name="required">{{requiredTip}}</slot>
      </p>
      <p v-if="invalids.pattern">
        <slot name="pattern">{{patternTip}}</slot>
      </p>
      <p v-if="invalids.extra">
        <slot name="extra">{{extraTip}}</slot>
      </p>
    </div>
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
  .v-validator {
    &-errors {
      color: #ed4259;
      margin-top: 3px;
    }
  }
</style>
