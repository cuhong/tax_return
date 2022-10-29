<template>
  <Loader/>
  <div id="app" class="container-fluid restricted-width" ref="main">
      <router-view></router-view>
  </div>
</template>

<script>
import Loader from "../src/components/partials/Loader.vue";
export default {
  components: {
    Loader
  },
  mounted() {
    window.addEventListener('resize', this.setHeight);
    this.setHeight()
  },
  unmounted() {
    window.removeEventListener('resize', this.setHeight);
  },
  methods: {
    setHeight() {
      var height = document.documentElement.clientHeight;
      this.$refs['main'].style.height = `${height}px`;
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
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  padding-bottom: 1.5rem;
  justify-content: space-between;
  overflow-y: auto;
}
</style>

