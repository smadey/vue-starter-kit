<template>
  <div class="v-uploader" :class="computedClasses">
    <input type="file" :accept="accept" :multiple="multiple" @change="upload" />
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      multiple: Boolean,
      accept: String,
      disabled: Boolean,
    },
    computed: {
      computedClasses() {
        const classes = {
          'is-disabled': this.disabled,
        };

        return classes;
      },
    },
    methods: {
      upload(e) {
        const files = e.target.files;

        if (files.length) {
          this.$emit('upload', this.multiple ? files : files[0]);
        }

        e.target.value = '';
      },
    },
  };
</script>

<style lang="sass">
  .v-uploader {
    position: relative;

    input[type="file"] {
      bottom: 0;
      cursor: pointer;
      left: 0;
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;

      &::-webkit-file-upload-button {
        cursor: inherit;
      }
    }

    &.is-disabled {
      opacity: .65;
      pointer-events: none;
    }
  }
</style>
