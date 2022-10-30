<template>
  <div class="overlay-popup" :style="{height: this.height}">
    <div>
    <div class="d-flex justify-content-between align-items-stretch mb-4 mt-2">
      <div class="page-title">
        <div>서비스 이용을 위해</div>
        <div>약관에 동의해주세요.</div>
      </div>
      <div style="user-select: none" @click="closeModal">
        닫기
      </div>
    </div>
    <div>
      <Checkbox
          :input-ref="'agreeAll'"
          :label="'전체 약관 동의'"
          :is-checked="isAllChecked"
          :is-bold="true"
          @update="(val) => {isAllChecked = val}"
          class="mb-3"
          @click="checkAll"
      />
      <hr>
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <Checkbox
            :input-ref="'serviceAgree'"
            :label="'서비스 이용 약관 동의(필수)'"
            :is-checked="isServiceAgree"
            :is-bold="false"
            @update="(val) => {isServiceAgree = val}"
        />
        <div class="policyDetail">내용보기</div>
      </div>
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <Checkbox
            :input-ref="'privacyAgree'"
            :label="'개인정보 이용방침 동의(필수)'"
            :is-checked="isPrivacyAgree"
            :is-bold="false"
            @update="(val) => {isPrivacyAgree = val}"
        />
        <div class="policyDetail">내용보기</div>
      </div>
    </div>
    </div>

    <div class="mb-1">
      <div class="button-primary">
        다음
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "../commons/input/Checkbox.vue";

export default {
  name: "PolicyAgree",
  components: {
    Checkbox
  },
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
    checkAll() {
      if (this.isAllChecked) {
        this.isServiceAgree = false
        this.isPrivacyAgree = false
      } else {
        this.isServiceAgree = true
        this.isPrivacyAgree = true
      }
    }
  },
  data() {
    return {
      isAllChecked: false,
      isServiceAgree: false,
      isPrivacyAgree: false
    }
  },
}
</script>

<style scoped>
.overlay-popup {
  position: fixed;
  bottom: 0;
  height: 50vh;
  max-height: 50vh;
  width: 100%;
  max-width: 592px;
  align-self: center;
  background-color: rgba(255, 255, 255, 1);
  z-index: 9999;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding-top: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: flex;
  flex-direction: column;
  /*transform: translateY(100%);*/
  justify-content: space-between;
}

.policyDetail {
  font-size: 12px;
  cursor: pointer;
  user-select: none;
}


</style>
