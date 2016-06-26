/**
 * example:
 * <v-loading :show="loadingShow"></v-loading>
 */

import vLoading from '../v-loading.vue';

export default {
  components: {
    vLoading,
  },

  data() {
    return {
      loadingShow: false,
    };
  },

  methods: {
    showLoading() {
      this.loadingShow = true;
    },
    hideLoading() {
      this.loadingShow = false;
    },
  },

};
