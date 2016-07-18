export default {
  computed: {
    vid() {
      const name = this.$options.name.toLowerCase();
      const uid = this._uid; // eslint-disable-line no-underscore-dangle
      return `${name}_${uid}`;
    },
  },
};
