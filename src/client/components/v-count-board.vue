<template>
  <div class="v-count-board clearfix">
    <item class="item" v-for="d in items" track-by="$index" :value="d"></item>
    <span class="unit">{{unit}}</span>
  </div>
</template>

<script>
  import item from './v-count-board-item.vue';

  export default {
    components: { item },

    props: ['value', 'unit'],

    computed: {
      items() {
        const val = parseInt(this.value, 10);
        return val > -1 ? String(val).split('') : [];
      },
    },
  };
</script>

<style lang="sass">
  .v-count-board {
    position: relative;

    .item {
      float: left;

      &:not(:last-of-type) {
        margin-right: 10px;
      }
    }

    .unit {
      background-color: #00b9f1;
      border-radius: 50%;
      color: #fff;
      height: 31px;
      line-height: 31px;
      position: absolute;
      top: -10px;
      text-align: center;
      right: -40px;
      width: 31px;
    }
  }
</style>
