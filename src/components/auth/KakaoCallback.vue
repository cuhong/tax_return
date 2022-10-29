

<template>
  <div class="main-container">
    <TopBar/>
    <div class="page-title mb-3 mt-3">
      로그인 중입니다
    </div>
    <div class="page-sub-text">
      <div>잠시만 기다려주세요...</div>
    </div>
  </div>
</template>

<script>
import TopBar from "../partials/TopBar.vue";
import {requestKakaoLogin} from "../../services/kakaoAuth.js";
import {setToken} from "../../services/auth.js";

export default {
  name: "KakaoCallback",
  beforeUnmount() {
  },
  async mounted() {
    this.$store.commit("loader/setIsLoading", true);
    try {
      const kakaoParam = this.$route.query
      if (kakaoParam.code) {
        const kakaoAuthCode = kakaoParam.code
        const kakaoLoginResponse = await requestKakaoLogin(kakaoAuthCode)
        if (kakaoLoginResponse.result !== true) {
          throw kakaoLoginResponse.message
        }
        const {access, refresh} = kakaoLoginResponse.data
        setToken(access, refresh)
        alert("로그인에 성공했습니다.")
      } else if (kakaoParam.error === "access_denied") {
        this.$router.push({name: "Login"})
      } else {
        throw "로그인 처리중 오류가 발생했습니다."
      }
    } catch (e) {
      alert(e)
      this.$router.push({name: "Login"})
    } finally {
    }
  },
  components: {
    TopBar,
  },
}
</script>

<style scoped>

</style>
