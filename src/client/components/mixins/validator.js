export default {
  props: {
    autoValidate: Boolean,
    validateOnInit: Boolean,
    required: Boolean,
    requiredTip: {
      type: String,
      default: '该字段不能为空',
    },
    pattern: String,
    patternTip: {
      type: String,
      default: '该字段不合法',
    },
    extraTip: String,
    maxlength: Number,
  },
  data() {
    return {
      initialModelValue: undefined,
      dirty: false,
      valid: true,
      invalids: {
        required: false,
        pattern: false,
        extra: false,
        maxlength: false,
      },
    };
  },
  computed: {
    // 获取需要验证的值，默认获取 value 值
    modelValue() {
      return this.value;
    },
    dirty() {
      return this.initialModelValue !== this.modelValue;
    },
  },
  watch: {
    extraTip() {
      this.validate();
    },
  },
  ready() {
    this.initialModelValue = this.modelValue;

    if (this.validateOnInit) {
      this.validate();
    }

    if (this.autoValidate) {
      this.$watch('modelValue', () => this.validate());
    }
  },
  methods: {
    resetValid() {
      this.valid = true;
      this.invalids.required = false;
      this.invalids.pattern = false;
      this.invalids.extra = false;
      this.invalids.maxlength = false;
    },
    validate() {
      this.valid = true;
      this.validateRequired();
      this.validatePattern();
      this.validateExtra();
      this.validateMaxlength();
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
  },
};
