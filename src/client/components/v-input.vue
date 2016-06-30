<template>
  <div class="v-input" :class="computedClasses">
    <slot>
      <input v-el:input v-if="rows === 1" :type="type" v-model="value"
        :placeholder="placeholder"
        :maxlength="maxlength" @focus="onFocus" @blur="onBlur" @input="onChange" />
      <textarea v-else :rows="rows" v-model="value" :placeholder="placeholder"
        :maxlength="maxlength" @focus="onFocus" @blur="onBlur" @input="onChange"
        ></textarea>
    </slot>
    <span class="v-input-counter" v-if="maxlength > 0">
      {{value ? value.length : 0 }}/{{maxlength}}
    </span>

    <div class="v-input-errors" v-if="!valid">
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
  import idMixin from './mixins/id';
  import validatorMixin from './mixins/validator';

  export default {
    mixins: [idMixin, validatorMixin],
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
          'is-dirty': this.dirty,
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
        border-color: #2972cc;
      }
    }

    input {
      height: 30px;
      vertical-align: middle;
    }

    textarea {
      vertical-align: top;
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
      color: #ed4259;

      p {
        margin-top: 3px;
      }
    }

    &.is-disabled {
      opacity: .65;
      pointer-events: none;
    }

    &.is-invalid {
      input, textarea,
      input:focus, textarea:focus {
        border-color: #ed4259;
      }
    }
  }
</style>
