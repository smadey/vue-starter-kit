/**
 * example:
 * <v-modal :show="modalShow" :mode="modalMode" :body="modalBody"
 * @resolve="resolveModal" @reject="rejectModal"></v-modal>
 */

import vModal from '../v-modal.vue';

export default {
  components: {
    vModal,
  },

  data() {
    return {
      modalShow: false,
      modalMode: null,
      modalBody: null,
      modalResolve: null,
      modalReject: null,
    };
  },

  methods: {
    openModal(mode, body, onResolve, onReject) {
      this.modalShow = true;
      this.modalMode = mode;
      this.modalBody = body;
      this.modalResolve = onResolve;
      this.modalReject = onReject;
    },
    resolveModal() {
      if (typeof this.modalResolve === 'function') {
        this.modalResolve();
      }

      this.modalShow = false;
      this.modalMode = null;
      this.modalBody = null;
      this.modalResolve = null;
      this.modalReject = null;
    },
    rejectModal() {
      if (typeof this.modalReject === 'function') {
        this.modalReject();
      }

      this.modalShow = false;
      this.modalMode = null;
      this.modalBody = null;
      this.modalResolve = null;
      this.modalReject = null;
    },
  },

};
