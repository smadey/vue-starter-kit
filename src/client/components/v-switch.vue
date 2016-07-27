 <template>
    <div class="v-switch" :class="[checkedCls, { 'is-disabled': disabled }]"
        @click="onChanged">
        <div class="v-switch-inner">
            <span class="v-switch-btn">{{text}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            checked: Number,
            checkedText: String,
            unCheckedText: String,
            disabled: Boolean,
        },
        data() {
            return {
                checkedCls: '',
                text: '',
            };
        },
        compiled() {
            if (this.checked === 1) {
                this.checkedCls = 'v-switch-checked';
                this.text = this.checkedText;
            } else {
                this.checked = 0;
                this.text = this.unCheckedText;
            }
        },
        watch: {
            checked(value) {
                if (value === 1) {
                    this.checkedCls = 'v-switch-checked';
                    this.text = this.checkedText;
                } else {
                    this.checkedCls = '';
                    this.text = this.unCheckedText;
                }
            },
        },
        methods: {
            onChanged() {
                if (this.checked === 0) {
                    this.checked = 1;
                } else {
                    this.checked = 0;
                }
                this.$emit('changed', this.checked);
            },
        },
    };
</script>
<style lang="sass">
    @import '../sass/variable.scss';
    @import '../sass/mixins.scss';

    .v-switch {
        cursor: pointer;
        display: inline-block;
        position: relative;
        vertical-align: middle;

        .v-switch-inner {
            background-color: $switch-background;
            border: $switch-border;
            border-radius: $switch-border-radius;
            height: $switch-height;
            line-height: $switch-line-height;
            position: relative;
            width: $switch-width;
            transition: all 0.3s ease-in;

            &:after {
                background-color: #fff;
                border-radius: 100%;
                content: '';
                height: $switch-height - 4px;
                left: 2px;
                position: absolute;
                top: 1px;
                transition: all 0.3s ease-in;
                width: $switch-height - 4px;
            }

        }

        .v-switch-btn {
            font-size: 12px;
            left: $switch-width - $switch-height + 1px;
            position: absolute;
            top: -1px;
        }

        &-checked {
            .v-switch-inner {
                background-color: $switch-checked-background;
                border: $switch-border-checked;
                color: $switch-checked-color;

                &:after {
                    left: $switch-width - $switch-height + 1px;
                }
            }

            .v-switch-btn {
                left: 6px;
            }
        }

        &.is-disabled {
            @extend %disabled;
        }
    }
</style>





