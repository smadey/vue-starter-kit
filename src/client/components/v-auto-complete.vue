<template>
  <div class="v-auto-complete" :class="computedClasses">
    <v-dropdown :active.sync="showItems">
      <v-input :value.sync="value" :placeholder="placeholder"></v-input>

      <ul slot="menu">
        <li v-for="item in items"
          :class="{ selected: item == value }"
          @click="select(item)">
          {{item}}
        </li>
      </ul>
    </v-dropdown>

    <partial name="errors"></partial>
  </div>
</template>

<script>
  import validatorMixin from './mixins/validator';

  import vDropdown from './v-dropdown.vue';
  import vInput from './v-input.vue';

  export default {
    mixins: [validatorMixin],

    components: {
      vDropdown,
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
        showItems: false,
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
    watch: {
      showItems(val, oldVal) {
        if (oldVal && !val) {
          this.validate();
        }
      },
    },
    methods: {
      select(item) {
        this.showItems = false;
        this.value = item;

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
    vertical-align: middle;

    .v-dropdown-menu {
      border-radius: 3px;
      border-top: 1px solid #eee;
      width: 100%;

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
