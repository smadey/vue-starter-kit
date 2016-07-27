<template>
  <div class="app container">
    <v-modal :show="modalShow" :mode="modalMode" :body="modalBody"
      @resolve="resolveModal" @reject="rejectModal"></v-modal>
  </div>
</template>

<script>
  import modalMixin from '../components/mixins/modal';

  export default {
    mixins: [modalMixin],

    ready() {
      this.openModal('primary', 'Hello, Vue');
    },
  };
</script>

<style lang="sass">
  @import "../sass/variable.scss";
  @import "../sass/reset.scss";
  @import "../sass/font-awesome.scss";
  @import "../sass/utils.scss";
  @import "../sass/transition.scss";

  html, body {
    height: 100%;
  }

  .app {
    background: url('../img/logo.png') 50% 50% / 200px 200px no-repeat;
    height: 100%;
  }

  .v-count-board {
    margin: 20% auto;
    width: 200px;
  }

</style>
