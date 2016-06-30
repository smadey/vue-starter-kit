<template>
  <div class="v-dropdown" :class="computedClasses">
    <div class="v-dropdown-selected" @click="toggle">
      <span>{{selectedLabel}}</span><i class="fa fa-chevron-down"></i>
    </div>

    <div class="v-dropdown-items" v-show="active">
      <ul>
        <li v-for="item in items"
          :class="{selected: $index === selectedIndex}"
          @click="select(item, $index)">
          {{item[labelKey]}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import boundMixin from './mixins/bound';

  export default {
    mixins: [boundMixin],

    props: {
      selectedIndex: {
        type: Number,
        default: 0,
      },
      items: Array,
      labelKey: {
        type: String,
        default: 'title',
      },
      disabled: Boolean,
    },
    data() {
      return {
        active: false,
      };
    },
    computed: {
      computedClasses() {
        return {
          'is-disabled': this.disabled,
        };
      },
      selectedLabel() {
        const items = this.items;
        const selectedIndex = this.selectedIndex;

        if (items[selectedIndex]) {
          return items[selectedIndex][this.labelKey];
        }

        return '';
      },
    },
    methods: {
      toggle() {
        if (!this.items.length) {
          return;
        }

        if (this.active) {
          this.hide();
        } else {
          this.show();
        }
      },
      show() {
        this.active = true;
        this.enableCheckBound(() => this.hide());
      },
      hide() {
        this.active = false;
        this.disableCheckBound();
      },
      select(item, index) {
        this.hide();
        this.selectedIndex = index;
        this.$emit('change', item, index);
      },
    },
  };
</script>

<style lang="sass">
  .v-dropdown {
    position: relative;

    &-selected {
      color: #fff;
      cursor: pointer;
      position: relative;

      i {
        font-size: 12px;
        margin-left: 5px;
        vertical-align: middle;
      }
    }

    &-items {
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      left: 10%;
      padding: 10px 0;
      position: absolute;
      transition: opacity 0.218s;
      width: 80%;
      z-index: 200;

      &:before {
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #fff;
        content: '';
        height: 0;
        left: 50%;
        margin-left: -7px;
        position: absolute;
        top: -7px;
        width: 0;
      }

      li {
        color: #262626;
        cursor: pointer;
        font-size: 14px;
        height: 32px;
        line-height: 32px;
        text-align: center;

        &.selected {
          cursor: default;
        }

        &.selected,
        &:hover {
          background-color: #d4d4d4;
        }
      }
    }

    &.is-disabled {
      opacity: .65;
      pointer-events: none;
    }
  }
</style>
