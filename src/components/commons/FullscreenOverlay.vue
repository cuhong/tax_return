<template>
  <div class="fullscreen-overlay" :style="{height: this.height}">
  </div>
</template>

<script>
export default {
  name: "FullscreenOverlay",
  props: {
    height: {
      type: String,
      default: "100%"
    },
  }
}
</script>

<style scoped>
.fullscreen-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  /*max-width: 592px;*/
  align-self: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
</style>
