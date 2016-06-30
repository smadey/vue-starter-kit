<template>
  <div class="v-ornament-lines">
    <v-ornament v-for="item in items"
      v-if="ready"
      :group-width="groupWidth"
      :group-height="groupHeight"
      :min-x="item.minX"
      :max-x="item.maxX"
      :min-y="item.minY"
      :max-y="item.maxY"
      :angle="0"
      @remove="removeItem(item)" moveable>
      <div class="line" :style="item.style"></div>
    </v-ornament>
  </div>
</template>

<script>
  import ornamentGroupMixin from './mixins/ornament-group.js';

  function random(from, to) {
    let rand = Math.random();

    if (to > 0) {
      rand = rand * Math.abs(to - from) + Math.min(from, to);
    } else {
      rand = rand * from;
    }

    return Math.ceil(rand);
  }

  export default {
    mixins: [ornamentGroupMixin],

    data() {
      const items = [];
      const len = 10;
      const iWidth = 100 / len;
      let i = 0;

      while (i < len) {
        items.push({
          minX: iWidth * i,
          maxX: iWidth * (i + 1),
          style: this.getRandomSize(),
        });
        i++;
      }

      return {
        items,
      };
    },

    methods: {
      removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.items.push({
          minX: item.minX,
          maxX: item.maxX,
          minY: 100,
          maxY: 100,
          style: this.getRandomSize(),
        });
      },
      getRandomSize() {
        return {
          height: `${random(40, 50)}px`,
        };
      },
    },
  };
</script>

<style lang="sass">
  .v-ornament-lines {
    bottom: -50px;
    left: -50px;
    overflow: hidden;
    pointer-events: none;
    position: fixed;
    right: -50px;
    top: -50px;
    z-index: 300;

    .line {
      background-color: #ddd;
      height: 50px;
      width: 2px;
    }
  }
</style>
