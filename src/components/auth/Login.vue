<template>
  <div class="main-container">
    <TopBar/>
    <div class="page-title mb-3 mt-3">
      카카오로 로그인
    </div>
    <div class="page-sub-text">
      <div>5분 안에 간편한 신고, 더 간편한 환급!</div>
      <div>지금 카카오로 쉽게 가입하고 신고해보세요.</div>
    </div>
  </div>
  <div class="bottom-container">
    <div class="kakao-button" @click="requestKakaoAuth">
      카카오계정으로 계속하기
    </div>
  </div>
</template>

<script>

import TopBar from "../partials/TopBar.vue";
import {requestKakaoAuthCode} from "../../services/kakaoAuth.js";


export default {
  name: "Login",
  components: {
    TopBar,
  },
  mounted() {
    this.$store.commit("loader/setIsLoading", false);
  },
  beforeUnmount() {
    this.$store.commit("loader/setIsLoading", false);
  },
  methods: {
    async requestKakaoAuth() {
      try {
        this.$store.commit("loader/setIsLoading", true);
        requestKakaoAuthCode()
      } catch (e) {
        alert('카카오 로그인에 실패했습니다.')
      }
    },
  }
}
</script>

<style scoped>

.kakao-button {
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
  background: rgb(250, 225, 0);
  color: rgb(59, 30, 30);
  font-weight: 900;
  display: inline-flex;
  flex: 1 1 0%;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  user-select: none;
}
</style>
