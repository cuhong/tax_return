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
      this.$store.commit('layout/setHeight', `${height}px`);
      this.$refs['main'].style.height = `${height}px`;
    }
  }
}
</script>
<style scoped>
</style>

