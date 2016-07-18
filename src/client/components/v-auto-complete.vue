<template>
  <div class="v-auto-complete" :class="computedClasses">
    <v-input :value.sync="value"
      :placeholder="placeholder"
      :disabled="disabled"
      @focus="show"></v-input>

    <partial name="errors"></partial>

    <div class="v-auto-complete-items" v-show="active">
      <ul>
        <li v-for="item in items"
          :class="{selected: item == value}"
          @click="select(item)">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import boundMixin from './mixins/bound';
  import validatorMixin from './mixins/validator';

  import vInput from './v-input.vue';

  export default {
    mixins: [boundMixin, validatorMixin],

    components: {
      vInput,
    },

    props: {
      value: {},
      items: Array,
      placeholder: String,
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
          'is-invalid': !this.valid,
        };
      },
      // filterdItems() {
      //   return this.items.filter(d => (!this.value || d.indexOf(this.value) > -1));
      // },
    },
    methods: {
      show() {
        this.active = true;
        this.enableCheckBound(() => this.hide());
      },
      hide() {
        this.active = false;
        this.disableCheckBound();
      },
      select(item) {
        this.hide();
        this.value = item;

        this.validate();
        this.$emit('change', this.value);
      },
    },
  };
</script>

<style lang="sass">
  @import "./sass/variable.scss";
  @import "./sass/mixins.scss";

  .v-auto-complete {
    display: inline-block;
    position: relative;
    vertical-align: middle;

    &-items {
      background-color: #fff;
      border-radius: 3px;
      border-top: 1px solid #eee;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      max-height: 300px;
      min-width: 200px;
      overflow-y: auto;
      position: absolute;
      transition: opacity 0.218s;
      width: 100%;
      z-index: 200;

      li {
        color: #808080;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        padding: 0 12px;
        text-align: left;
        white-space: nowrap;

        &.selected,
        &:hover {
          background-color: #e1e1e1;
        }
      }
    }

    &-errors {
      @extend %validator-errors;
    }

    &.is-disabled {
      @extend %disabled;
    }

    &.is-invalid {
      .v-input input {
        border-color: $danger;
      }
    }
  }
</style>
