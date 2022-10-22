<template>
  <div id="app" class="container-fluid restricted-width" ref="main">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: () => ({
    height: document.documentElement.clientHeight
  }),
  watch: {
    height(newHeight) {
      this.$refs['main'].style.height = `${newHeight}px`
    }
  },
  mounted() {
    window.addEventListener('resize', this.setHeight);
  },
  unmounted() {
    window.removeEventListener('resize', this.setHeight);
  },
  methods: {
    setHeight() {
      this.height = document.documentElement.clientHeight;
    }
  }
}
</script>
<style scoped>
.restricted-width {
  max-width: 592px;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  overflow: auto;
  padding: 0 1.5rem 1.5rem;
  height: 100vh;
  justify-content: space-between;
}
</style>

