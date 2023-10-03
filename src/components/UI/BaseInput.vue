<template>
  <input :value="value" :placeholder="placeholder" class="base-input" @input="updateValue">
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Input'
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss">
.base-input {
  border-radius: 5px;
  border: none;
  padding: 10px;
  color: #353535;
  font-size: 17px;
  font-family: 'Roboto', sans-serif;

  &:focus {
    outline: none;
  }
}
</style>
