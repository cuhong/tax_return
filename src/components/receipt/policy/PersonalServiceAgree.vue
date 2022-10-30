<template>
  <div class="fullscreen-white-overlay" :style="{height: this.height}">
  </div>
</template>

<script>
export default {
  name: "PersonalServiceAgree",
  props: {
    height: {
      type: String,
      default: "100%"
    },
  }
}
</script>

<style scoped>
.fullscreen-white-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  /*max-width: 592px;*/
  align-self: center;
  background-color: white;
  z-index: 99999;
}
</style>
