<template>
  <div class="select" :tabindex="tabindex" @blur="open = false">
    <div class="select__selected" :class="{ open: open }" @click="open = !open">
      {{ getFormattedOption(selected) }}
    </div>
    <div class="select__items" :class="{ hide: !open }">
      <div
          v-for="(option, i) of options"
          :key="i"
          @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ getFormattedOption(option) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
          ? this.default
          : this.options.length > 0
              ? this.options[0]
              : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
  methods: {
    getFormattedOption (option) {
      if (typeof option === 'string') {
        return option[0].toUpperCase() + option.slice(1)
      }
      return option
    }
  }
}
</script>

<style lang="scss">
.select {
  position: relative;
  text-align: left;
  outline: none;
  width: 200px;
  height: inherit;
  line-height: 47px;

  &__selected {
    background-color: #FFFFFF;
    border-radius: 6px;
    border: 1px solid #666666;
    color: #353535;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;

    &.open {
      border: 1px solid;
      border-radius: 6px 6px 0px 0px;
    }
    &:after {
      position: absolute;
      content: "";
      top: 22px;
      right: 1em;
      width: 0;
      height: 0;
      border: 5px solid #000000;
      border-color: #000000 transparent transparent transparent;
    }
  }
  &__items {
    color: #353535;
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    position: absolute;
    background-color: #FFFFFF;
    left: 0;
    right: 0;
    z-index: 1;

    div {
      color: #353535;
      padding-left: 1em;
      cursor: pointer;
      user-select: none;
    }
    &.hide {
      display: none;
    }
  }
}
</style>
