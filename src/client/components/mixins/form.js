import childrenMixin from './children';

import vButton from '../v-button.vue';
import vCheckbox from '../v-checkbox.vue';
import vInput from '../v-input.vue';
import vRadio from '../v-radio.vue';
import vRadioGroup from '../v-radio-group.vue';
import vSelect from '../v-select.vue';
import vValidator from '../v-validator.vue';

export default {
  mixins: [childrenMixin],

  components: {
    vButton,
    vCheckbox,
    vInput,
    vRadio,
    vRadioGroup,
    vSelect,
    vValidator,
  },

  methods: {
    // /**
    //  * 记录表单初始话状态
    //  */
    // setFormInitialState() {
    //   const children = this.getAllChildren();

    //   let child;

    //   Object.keys(children).forEach((key) => {
    //     child = children[key];

    //     if (child && child.setInitialState) {
    //       child.setInitialState();
    //     }
    //   });
    // },

    // /**
    //  * 重置表单
    //  */
    // resetFormState() {
    //   const children = this.getAllChildren();

    //   let child;

    //   Object.keys(children).forEach((key) => {
    //     child = children[key];

    //     if (child && child.resetState) {
    //       child.resetState();
    //     }
    //   });
    // },

    /**
     * 重置表单验证状态
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
     * 验证表单所有元素
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
