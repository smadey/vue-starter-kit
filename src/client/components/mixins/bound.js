export default {

  data() {
    return {
      checkBoundCallback: null,
    };
  },

  beforeDestroy() {
    this.disableCheckBound();
  },

  methods: {
    checkBound(e) {
      let curEl = e.target;

      while (curEl) {
        if (curEl === this.$el) {
          return;
        }
        curEl = curEl.parentNode;
      }

      const checkBoundCallback = this.checkBoundCallback;

      if (typeof checkBoundCallback === 'function') {
        checkBoundCallback();
      }
    },
    enableCheckBound(callback) {
      this.checkBoundCallback = callback;

      // 当 event.target 在其本身事件中被移除时获取不到 parentNode, 所以设置 useCapture 为 true 能让监测优先执行
      document.addEventListener('click', this.checkBound, true);
    },
    disableCheckBound() {
      this.checkBoundCallback = null;
      document.removeEventListener('click', this.checkBound, true);
    },
  },
};
