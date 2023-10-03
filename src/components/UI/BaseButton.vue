<template>
  <button class="base-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>

<style lang="scss">
.base-button {
  border-radius: 5px;
  background: #519945;
  border: none;
  height: 41px;
  color: #FFFFFF;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
}
</style>
