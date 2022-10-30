<template>
  <div class="fullscreen-white-overlay" :style="{height: this.height}">

    <div class="topbar-container">
      <img class="logo" alt="logo" src="../../assets/logo/logo-color-small.png">
      <div style="cursor: pointer; user-select: none" @click="closeModal">
        닫기
      </div>
    </div>

    <div class="p-3">
      <div class="page-title mb-3 mt-2">
        개인정보 처리 방침
      </div>
      <div>
        <h6>개인정보 수집, 이용 동의</h6>
        <p>
          ① 개인정보 수집 목적 : 국세/지방세 경정청구를 위한 자료 확인
        </p>
        <p>
          ② 개인정보 수집 항목 : 성명, 생년월일, 이메일, 휴대전화번호, 해당연도 국세/지방세 납부내역, 환급계좌, 병역사항
        </p>
        <p>
          ③ 보유 및 이용기간
        </p>
        <ol class="terms">
          <li>보유기간 : 회원 탈퇴시</li>
          <li>이용기간 : 경정청구 용역 제공 기간</li>
        </ol>
        <p>
          ④ 동의 거부권 및 불이익 : 정보주체는 개인정보 수집, 이용에 동의하지 않을 권리가 있으며, 동의를 거부할 경우 경정청구 용역 서비스를 받으실 수 없습니다.
        </p>
        <p>위 개인정보를 수집, 이용하는 것에 동의합니다</p>

        <h6>개인정보 처리방침</h6>

        <p>
          법률사무소 문정(알피)(이하 “회사”)는 “개인정보 보호법”, “전자상거래 등에서의 소비자보호에 관한 법률”, “정보통신망 이용촉진 및 정보보호 등에 관한 법률” 등 관련 법령에 따라 이용자의 개인정보를 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 개인정보처리방침에 따라 개인정보를 처리하고 있습니다.
        </p>
        <h6>
          개인정보의 처리 목적
        </h6>
        <p>
          회사는 서비스 이용에 필수적인 개인정보를 다음과 같은 목적을 위하여 처리합니다. 처리하는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 처리 목적과 항목이 변경되는 경우에는 사전에 이용자의 동의를 받습니다.
        </p>
        <h6>
          서비스 제공에 관한 계약이행 및 요금 정산
        </h6>


        <p>
          ① 서비스 제공에 관한 계약이행 및 요금 정산
        </p>
        <p>
          ② 종합소득세, 법인세, 부가가치세, 연말정산 등 각종 세금 관련 업무
        </p>
        <p>
          ③ 세무 상담 및 경정청구을 위한 서비스 지원
        </p>
        <p>
          ④ 정기·비정기 대금 자동 또는 수동 결제 등
        </p>
        <p>
          ⑤ 본인인증
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrivacyAgree",
  props: {
    height: {
      type: String,
      default: "100%"
    },
  },
  emits: ['closeModal'],
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
}
</script>

<style scoped>
.fullscreen-white-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 592px;
  align-self: center;
  background-color: white;
  z-index: 99999;
  overflow-y: auto;
}
</style>
