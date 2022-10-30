<template>
  <ServiceAgree :height="height" v-if="showServicePolicy" @closeModal="() => {showServicePolicy=false}"/>
  <PrivacyAgree :height="height" v-if="showPrivacyPolicy" @closeModal="() => {showPrivacyPolicy=false}"/>
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
        <div style="cursor: pointer; user-select: none" @click="() => {showServicePolicy=true}">이용약관</div>
        <div style="cursor: pointer; user-select: none" @click="() => {showPrivacyPolicy=true}">개인정보 처리방침</div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../components/partials/TopBar.vue";
import ServiceAgree from "./policy/ServiceAgree.vue";
import PrivacyAgree from "./policy/PrivacyAgree.vue";

export default {
  name: "Home",
  components: {
    TopBar,
    ServiceAgree,
    PrivacyAgree
  },
  methods: {
    goToLogin() {
      this.$router.push({name:'Login', query: {next: "CompanyReceipt"}})
    }
  },
  watch: {
    '$store.state.layout.height'(val) {
      this.height = val;
    }
  },
  data() {
    return {
      showServicePolicy: false,
      showPrivacyPolicy: false,
      height: this.$store.getters['layout/height']
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

</style>
