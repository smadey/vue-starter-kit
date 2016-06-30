import vOrnament from '../v-ornament.vue';

export default {
  components: {
    vOrnament,
  },

  data() {
    return {
      ready: false,
      groupWidth: 0,
      groupHeight: 0,
    };
  },

  ready() {
    this.groupWidth = this.$el.offsetWidth;
    this.groupHeight = this.$el.offsetHeight;

    this.$nextTick(() => (this.ready = true));
  },
};
