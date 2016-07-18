<template>
  <div class="v-input" :class="computedClasses">
    <input v-el:input v-if="rows === 1" :type="type" v-model="value"
      :placeholder="placeholder"
      :maxlength="maxlength" @focus="onFocus" @blur="onBlur" @input="onChange" />
    <textarea v-else :rows="rows" v-model="value" :placeholder="placeholder"
      :maxlength="maxlength" @focus="onFocus" @blur="onBlur" @input="onChange"
      ></textarea>

    <span class="v-input-counter" v-if="maxlength > 0">
      {{value ? value.length : 0 }}/{{maxlength}}
    </span>

    <partial name="errors"></partial>
  </div>
</template>

<script>
  import validatorMixin from './mixins/validator';

  import vValidator from './v-validator.vue';

  export default {
    mixins: [validatorMixin],
    components: {
      vValidator,
    },
    props: {
      value: {},
      type: {
        type: String,
        default: 'text',
      },
      placeholder: String,
      disabled: Boolean,
      rows: {
        type: Number,
        default: 1,
      },
    },
    computed: {
      computedClasses() {
        return {
          'is-disabled': this.disabled,
          'is-invalid': !this.valid,
          'is-focused': this.focused,
        };
      },
    },
    methods: {
      focus() {
        this.$els.input.focus();
      },
      onFocus() {
        this.focused = true;
        this.$emit('focus');
      },
      onBlur() {
        this.focused = false;
        this.validate();
        this.$emit('blur');
      },
      onChange() {
        this.$emit('input');
      },
    },
  };
</script>

<style lang="sass">
  @import "./sass/variable.scss";
  @import "./sass/mixins.scss";

  .v-input {
    display: inline-block;
    vertical-align: middle;
    position: relative;

    input, textarea {
      border: 1px solid #d1d2d4;
      color: #4a4a4a;
      font-size: 14px;
      line-height: 20px;
      padding: 4px 6px;
      width: 100%;

      &:focus {
        border-color: $primary;
      }
    }

    &-counter {
      color: #8e8f92;
      height: 30px;
      left: 100%;
      line-height: 30px;
      margin-left: 10px;
      position: absolute;
      top: 0;
    }

    &-errors {
      @extend %validator-errors;
    }

    &.is-disabled {
      @extend %disabled;
    }

    &.is-invalid {
      input, textarea,
      input:focus, textarea:focus {
        border-color: $danger;
      }
    }
  }
</style>
