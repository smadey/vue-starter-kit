import childrenMixin from './children';

import vButton from '../v-button.vue';
import vCheckbox from '../v-checkbox.vue';
import vInput from '../v-input.vue';
import vSelect from '../v-select.vue';

export default {
  mixins: [childrenMixin],

  components: {
    vButton,
    vCheckbox,
    vInput,
    vSelect,
  },

  methods: {
    /**
     * 重置表单
     */
    resetFormValid() {
      const children = this.getAllChildren();

      let child;

      Object.keys(children).forEach((key) => {
        child = children[key];

        if (child && child.resetValid) {
          child.resetValid();
        }
      });
    },

    /**
     * 验证表单
     */
    validateFormValid() {
      const children = this.getAllChildren();

      let child;
      let pass = true;

      Object.keys(children).forEach((key) => {
        child = children[key];

        if (child.validate) {
          child.validate();

          if (!child.valid) {
            pass = false;
          }
        }
      });

      return pass;
    },
  },
};
