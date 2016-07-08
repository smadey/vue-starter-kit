<template>
  <div class="v-pagination">
    <ul>
      <!-- prev -->
      <li class="v-pagination-item prev" :class="{disabled: page < 2}">
        <a href="javascript:;" @click="prev">{{prevText}}</a>
      </li>
      <!-- first -->
      <li class="v-pagination-item first" v-if="showFirst">
        <a href="javascript:;" @click="go(1)">1</a>
      </li>
      <!-- prev ellipsis -->
      <li class="v-pagination-item" v-if="showFirst">
        <span class="v-pagination-ellipsis">{{ellipsis}}</span>
      </li>

      <li class="v-pagination-item" v-for="num in pages"
        :class="{current: num === page}">
        <a href="javascript:;" @click="go(num)">{{num}}</a>
      </li>

      <!-- next ellipsis -->
      <li class="v-pagination-item" v-if="showLast">
        <span class="v-pagination-ellipsis">{{ellipsis}}</span>
      </li>
      <!-- last -->
      <li class="v-pagination-item last" v-if="showLast">
        <a href="javascript:;" @click="go(total)">{{total}}</a>
      </li>
      <!-- next -->
      <li class="v-pagination-item" :class="{disabled: page > total - 1}">
        <a href="javascript:;" @click="next">{{nextText}}</a>
      </li>
    </ul>
    <!-- <div class="v-pagination-jump">
      <input type="text" class="v-pagination-input" v-model="page" />
      <a href="javascript:;" class="v-pagination-go">GO</a>
    </div> -->
  </div>
</template>

<script>
  export default {
    props: {
      total: {
        type: Number,
        required: true,
      },
      page: {
        type: Number,
        default: 1,
      },
      pagesLength: {
        type: Number,
        default: 5,
      },
      ellipsis: {
        type: String,
        default: '...',
      },
      prevText: {
        type: String,
        default: '<<',
      },
      nextText: {
        type: String,
        default: '>>',
      },
    },
    computed: {
      pages() {
        const pages = [];

        const page = this.page;
        const total = this.total;
        const pagesLength = this.pagesLength;

        const half = parseInt(pagesLength / 2, 10);

        let start = 1;
        let end = total;

        if (pagesLength >= total - 1) {
          // start = 1;
          // end = total;
        } else if (page <= (half + 2)) {
          // start = 1;
          end = Math.max(page + half, pagesLength);
        } else if (page <= total - (half + 2)) {
          start = page - half;
          end = page + half;
        } else {
          start = Math.min(page - half, total - (pagesLength - 1));
          // end = total;
        }

        while (start <= end) {
          pages.push(start++);
        }

        return pages;
      },
      showFirst() {
        return this.pages[0] > 1;
      },
      showLast() {
        return this.pages[this.pages.length - 1] < this.total;
      },
    },
    watch: {
      page(val) {
        if (val > 0) {
          this.$emit('change', val);
        }
      },
    },
    methods: {
      prev() {
        if (this.page > 1) {
          this.page--;
        }
      },
      next() {
        if (this.page < this.total) {
          this.page++;
        }
      },
      go(page) {
        if (page > this.total) {
          this.page = this.total;
        } else if (page > 1) {
          this.page = page;
        } else {
          this.page = 1;
        }
      },
    },
  };
</script>

<style lang="sass">
  .v-pagination {
    text-align: right;

    ul {
      display: inline-block;
      vertical-align: middle;
    }

    li {
      background-color: #fff;
      float: left;

      & + li {
        margin-left: 8px;
      }

      a, span {
        display: block;
        font-size: 14px;
        height: 32px;
        line-height: 32px;
        min-width: 32px;
        padding: 0 10px;
        text-align: center;
      }

      a {
        color: #262626;
      }

      span {
        color: #444;
      }

      &:hover a {
        background-color: #ededed;
      }

      &.current a {
        background-color: #317cd3;
        cursor: default;
        color: #fff;
      }

      &.disabled a {
        background-color: #fff;
        cursor: default;
        color: #ccc;
      }
    }
  }
</style>
