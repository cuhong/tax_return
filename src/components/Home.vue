<template>
  <div class="main-container">
    <TopBar/>
    <div class="page-title mb-3 mt-3">
      첫 소개 페이지
    </div>
    <div class="page-sub-text">
      <div>어쩌구 저쩌구 첫 소개 페이지에요.</div>
      <div>문장을 못쓰겠어요.</div>
    </div>
  </div>
  <div class="bottom-container">
    <div class="button-primary" @click="goToLogin">
      시작버튼
    </div>
  </div>
</template>

<script>
import TopBar from "../components/partials/TopBar.vue";
// import Loader from "../components/partials/Loader.vue";

export default {
  name: "Home",
  components: {
    TopBar
  },
  methods: {
    goToLogin() {
      this.$router.push({name:'Login', query: {next: "CompanyReceipt"}})
    }
  }
}
</script>

<style scoped>

.button-primary {
  flex-direction: row;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;
  min-height: 3.25rem;
  font-size: 1rem;
  border: none;
  line-height: 20.72px;
  box-sizing: border-box;
  text-transform: uppercase;
  letter-spacing: normal;
  background: var(--main-bg);
  color: rgb(255, 255, 255);
  font-weight: 900;
  display: inline-flex;
  flex: 1 1 0;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%
}
</style>
