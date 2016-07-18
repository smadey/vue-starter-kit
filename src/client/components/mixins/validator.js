import { util } from 'vue';

import vnameMixin from './vname.js';

export default {
  mixins: [vnameMixin],

  partials: {
    errors: `
<div :class="vname + '-errors'" v-if="!valid">
  <p v-if="invalids.required">
    <slot name="required">{{requiredTip}}</slot>
  </p>
  <p v-if="invalids.maxlength">
    <slot name="maxlength">{{maxlengthTip}}</slot>
  </p>
  <p v-if="invalids.pattern">
    <slot name="pattern">{{patternTip}}</slot>
  </p>
  <p v-if="invalids.extra">
    <slot name="extra">{{extraTip}}</slot>
  </p>
</div>
    `,
  },
  props: {
    autoValidate: Boolean,
    validateOnInit: Boolean,
    required: Boolean,
    requiredTip: {
      type: String,
      default: '该字段不能为空',
    },
    maxlength: Number,
    maxlengthTip: {
      type: String,
      default: '该字段长度过长',
    },
    pattern: String,
    patternTip: {
      type: String,
      default: '该字段不合法',
    },
    extraTip: String,
  },
  data() {
    return {
      valid: true,
      invalids: {
        required: false,
        maxlength: false,
        pattern: false,
        extra: false,
      },
    };
  },
  computed: {
    // 获取需要验证的值，默认获取 value 值
    modelValue() {
      return this.value;
    },
  },
  watch: {
    extraTip() {
      this.validate();
    },
  },
  ready() {
    if (this.validateOnInit) {
      this.validate();
    }

    if (this.autoValidate) {
      this.$watch('modelValue', util.debounce(() => this.validate(), 300));
    }
  },
  methods: {
    resetValid() {
      this.valid = true;
      this.invalids.required = false;
      this.invalids.maxlength = false;
      this.invalids.pattern = false;
      this.invalids.extra = false;
    },
    validate() {
      this.valid = true;
      this.validateRequired();
      this.validateMaxlength();
      this.validatePattern();
      this.validateExtra();
    },
    validateRequired() {
      if (!this.valid) {
        return;
      }

      if (this.required && !this.modelValue) {
        this.invalids.required = true;
        this.valid = false;
      } else {
        this.invalids.required = false;
      }
    },
    validateMaxlength() {
      if (!this.valid) {
        return;
      }

      if (this.maxlength > 0 && this.modelValue.length > this.maxlength) {
        this.invalids.maxlength = true;
        this.valid = false;
      } else {
        this.invalids.maxlength = false;
      }
    },
    validatePattern() {
      if (!this.valid) {
        return;
      }

      if (this.pattern && !(new RegExp(this.pattern).test(this.modelValue))) {
        this.invalids.pattern = true;
        this.valid = false;
      } else {
        this.invalids.pattern = false;
      }
    },
    validateExtra() {
      if (!this.valid) {
        return;
      }

      if (this.extraTip) {
        this.invalids.extra = true;
        this.valid = false;
      } else {
        this.invalids.extra = false;
      }
    },
  },
};
