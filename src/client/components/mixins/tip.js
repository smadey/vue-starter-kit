/**
 * example:
 * <v-tip :active="tipActive" :mode="tipMode" :text="tipText" @close="closeTip"></v-tip>
 */
import vTip from '../v-tip.vue';

export default {
  components: {
    vTip,
  },

  data() {
    return {
      tipActive: false,
      tipMode: null,
      tipText: null,
    };
  },

  methods: {
    showTip(mode, text, onClose) {
      this.tipActive = true;
      this.tipMode = mode;
      this.tipText = text;
      this.tipClose = onClose;
    },
    closeTip() {
      if (typeof this.tipClose === 'function') {
        this.tipClose();
      }

      this.tipActive = false;
      this.tipMode = null;
      this.tipText = null;
      this.tipClose = null;
    },
  },

};
