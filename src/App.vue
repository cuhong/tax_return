<template>
  <Loader :is-loading="isLoading"/>
  <div id="app" class="container-fluid restricted-width" ref="main">
      <router-view></router-view>
  </div>
</template>

<script>
import Loader from "../src/components/partials/Loader.vue";
// import { useStore } from "vuex";
export default {
  data: () => ({
    // height: document.documentElement.clientHeight
    height: window.innerHeight,
  }),
  components: {
    Loader
  },
  watch: {
    height(newHeight) {
      document.body.style.height = `${newHeight}px`
      // this.$refs['main'].style.height = `${newHeight}px`
    }
  },
  mounted() {
    window.addEventListener('resize', this.setHeight);
  },
  unmounted() {
    window.removeEventListener('resize', this.setHeight);
  },
  computed: {
    isLoading() {
      return this.$store.state.loader.isLoading
    }
  },
  methods: {
    setHeight() {
      this.height = document.documentElement.clientHeight;
      // this.height = window.innerHeight;
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

