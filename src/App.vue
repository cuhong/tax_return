<template>
  <div id="app" class="container-fluid restricted-width" ref="main">
<!--      <router-link to="/">main</router-link>-->
<!--      <router-link to="/info">info</router-link>-->
      <router-view></router-view>
  </div>
</template>

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

@supports (-webkit-touch-callout: none) {
  .restricted-width {
    /* for ios safari 15, safe-area-inset-bottom is 0, so a special fix apply here */
    height: -webkit-fill-available;
  }
}
</style>

