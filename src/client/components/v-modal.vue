<template>
  <v-backdrop class="v-modal" v-if="show">
    <v-align>
      <div class="v-modal-dialog">
        <i class="v-modal-close fa fa-close" @click="reject"></i>

        <slot name="title">
          <div class="v-modal-head">{{title}}</div>
        </slot>
        <slot name="body">
          <div class="v-modal-body">{{body}}</div>
        </slot>
        <slot name="foot">
          <div class="v-modal-foot">
            <v-button :theme="mode" @click="resolve">{{okText}}</v-button>
            <v-button @click="reject">{{cancelText}}</v-button>
          </div>
        </slot>
      </div>
    </v-align>
  </v-backdrop>
</template>

<script>
  import { util } from 'vue';

  import vAlign from './v-align.vue';
  import vBackdrop from './v-backdrop.vue';
  import vButton from './v-button.vue';

  export default {
    components: {
      vAlign,
      vBackdrop,
      vButton,
    },
    props: {
      show: {
        type: Boolean,
        require: true,
      },
      mode: {
        type: String,
        default: 'primary',
      },
      title: {
        type: String,
        default: '提示',
      },
      body: {
        type: String,
        default: '',
      },
      okText: {
        type: String,
        default: '确定',
      },
      cancelText: {
        type: String,
        default: '取消',
      },
      disableCloseOnResolve: Boolean,
    },
    watch: {
      show(val) {
        const body = document.body;

        if (val) {
          if (body.clientWidth < window.innerWidth) {
            const scrollbarWidth = this.getScrollBarWidth();

            if (scrollbarWidth > 0) {
              body.style.paddingRight = `${scrollbarWidth}px`;
            }
          }
          util.addClass(body, 'has-modal-open');
        } else {
          body.style.paddingRight = '';
          util.removeClass(body, 'has-modal-open');
        }
      },
    },
    methods: {
      resolve() {
        if (!this.disableCloseOnResolve) {
          this.show = false;
        }
        this.$emit('resolve');
      },
      reject() {
        this.show = false;
        this.$emit('reject');
      },
      getScrollBarWidth() {
        const doc = document;
        const body = doc.body;

        const scrollDiv = doc.createElement('div');
        scrollDiv.className = 'v-modal-scrollbar-measure';

        body.appendChild(scrollDiv);
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        body.removeChild(scrollDiv);

        return scrollbarWidth;
      },
    },
  };
</script>

<style lang="sass">
  body.has-modal-open {
    overflow: hidden;
  }

  .v-modal {
    background-color: rgba(0, 0, 0, .6);

    &-dialog {
      background-color: #fff;
      border-radius: 2px;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      width: 360px;
    }

    .v-modal-close {
      color: #999;
      cursor: pointer;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      position: absolute;
      right: 3px;
      text-align: center;
      top: 0;
      width: 30px;
      z-index: 201;

      &:hover {
        color: #333;
      }
    }

    &-head {
      border-bottom: 1px solid #e5e5e5;
      color: #333;
      font-weight: bold;
      font-size: 16px;
      padding: 15px 20px;
    }

    &-body {
      color: #444;
      overflow-y: auto;
      padding: 30px 20px;
      position: relative;
    }

    &-foot {
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
      box-shadow: inset 0 1px 0 #fff;
      letter-spacing: -4px;
      overflow: hidden;
      padding: 19px 20px 20px;
      position: relative;
      text-align: right;

      button {
        margin-left: 10px;
      }
    }

    &-scrollbar-measure {
      position: absolute;
      top: -9999px;
      width: 50px;
      height: 50px;
      overflow: scroll;
    }
  }
</style>
