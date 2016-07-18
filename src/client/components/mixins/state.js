
export default {
  props: {
    autoInitialState: Boolean,
  },
  data() {
    return {
      stateInitialized: false,
      initialStateValue: null,
    };
  },
  computed: {
    // 获取需要的状态的值，默认获取 value 值
    stateValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.value = val;
      },
    },
    dirty() {
      return this.stateInitialized && this.initialStateValue !== this.stateValue;
    },
  },
  ready() {
    if (this.autoInitialState) {
      this.setInitialState();
    }
  },
  methods: {
    setInitialState() {
      this.stateInitialized = true;
      this.initialStateValue = this.stateValue;
    },
    resetState() {
      this.stateValue = this.initialStateValue;
    },
  },
};
