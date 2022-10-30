<template>
  <div class="main-container-container">
    <TopBar/>
    <div class="page-title mb-3 mt-3">
      사업자 형태를 선택하세요
    </div>
    <div class="page-sub-text mb-5">
      <div>사업자 형태에 맞는</div>
      <div>접수 절차를 도와드릴께요.</div>
    </div>
    <div>
      <div class="input-radio-container">
        <input class="input-radio" type="radio" v-model="businessType" name="businessType" id="personal" value="personal">
        <label class="label-radio" for="personal">
          <span>프리랜서/개인사업자</span>
        </label>
      </div>
      <div class="input-radio-container">
        <input class="input-radio" type="radio" v-model="businessType" name="businessType" id="corp" value="corp">
        <label class="label-radio" for="corp">
          <span>법인사업자</span>
        </label>
      </div>
    </div>
  </div>
  <div class="bottom-container">
    <div :class="{
      'button-disabled': !businessType,
      'button-primary': businessType
    }" @click="receipt">
      {{ this.businessType === null ? "사업자 형태를 선택하세요" : "다음 단계" }}
    </div>
  </div>
</template>

<script>
import TopBar from "../partials/TopBar.vue";

export default {
  name: "Receipt",
  components: {
    TopBar
  },
  data() {
    return {
      businessType: null
    }
  },
  methods: {
    receipt() {
      if (this.businessType === null) {
        alert('사업자 형태를 선택하세요.')
      } else if (this.businessType === 'corp') {
        alert('법인사업자 접수 기능은 준비 중입니다.')
      } else {
        this.$router.push({name: "CompanyReceiptPersonal"})
      }
    }
  }
}
</script>

<style scoped>




input[type="radio"].input-radio {
  display: none;
}

input[type="radio"].input-radio + label {
  display:inline-block;
  width: 100%;
  background-color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border: rgb(145, 145, 145) 1px solid;
  border-radius: 0.5rem;
  line-height: 1.5;
  color: rgb(105, 112, 119);
  cursor: default;
  font-size: 1rem;
  font-weight: 600;
}

input[type="radio"]:checked.input-radio + label {
  background-color: var(--sub-bg);
  border: var(--sub-bg) 1px solid;
  color: white;
}


</style>
