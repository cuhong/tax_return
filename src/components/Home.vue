<template>
  <div class="main-container">
    <TopBar/>
    <div class="page-title mb-3 mt-3">
      모르고 돌려받지 못한 세금 알피가 찾아드려요
    </div>
    <div class="page-sub-text">
      <div>최신 조세동향을 바탕으로 </div>
      <div>
        돌려받지 못한 여러분의 세금을 찾아드려요.
      </div>
    </div>
  </div>
  <div class="bottom-container">
    <div class="button-primary mb-3" @click="goToLogin">
      시작버튼
    </div>
    <div class="copyright">
      <div class="copyright-title mb-2">
        법률사무소 문정
      </div>
      <div class="copyright-detail mb-1">
        <div>대표변호사: 양홍수 | 개인정보보호책임자: 홍찬의</div>
        <div>사업자등록번호: 307-14-69585</div>
        <div>서울 서초구 서초대로 254, 708, 709호(서초동, 오퓨런스)</div>
        <div class="mb-3">이메일 munjunglaw@gmail.com</div>
        <div>Copyright © Law Office Munjung. All rights reserved.</div>
      </div>
      <div class="policy">
        <div @click="goToPolicyService">이용약관</div>
        <div @click="goToPolicyPrivacy">개인정보 처리방침</div>
      </div>
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
    },
    goToPolicyService() {
      this.$router.push({name:'PolicyService'})
    },
    goToPolicyPrivacy() {
      this.$router.push({name:'PolicyPrivacy'})
    }
  }
}
</script>

<style scoped>
.policy {
  font-size: 12px;
  color: #4f4f4f;
  display: flex;
}
.policy div {
  margin-right: 1rem;
  cursor: pointer;
}
.copyright-title {
  font-size: 14px;
  font-weight: 600;
  color: #4f4f4f
}
.copyright-detail div {
  font-size: 12px;
  color: #4f4f4f
}
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
