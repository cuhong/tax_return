<template>
  <PersonalServiceAgree :height="height" v-if="showServicePolicy"/>
  <Transition name="show-agree-modal">
    <PolicyAgree :height="height" v-if="showAgreeModal" @closeModal="() => {showAgreeModal=false}"/>
  </Transition>
  <FullscreenOverlay :height="height" v-if="showAgreeModal"/>
  <div class="main-container">
    <TopBar/>
    <div class="page-title mb-5 mt-3">
      프리랜서/개인사업자 서류 접수
    </div>
    <!--    <div class="page-sub-text mb-5">-->
    <!--      <div>개인사업자 세금 환급을 위해</div>-->
    <!--      <div>필요한 정보를 입력해주세요.</div>-->
    <!--    </div>-->
    <div>
      <Transition name="slide">
        <div v-show="showSsn">
          <div class="input-text-container">
            <Transition name="label-fade">
              <label v-if="focus==='ssn' || this.ssn !== ''" class="input-header">주민등록번호</label>
            </Transition>
            <label v-if="focus!=='ssn'" class="input-header-hidden">주민등록번호</label>
            <input
                placeholder="주민등록번호"
                class="input-text"
                type="text"
                inputmode="decimal"
                pattern="\d*"
                @input="ssnInput"
                @focus="ssnInputFocus"
                @blur="ssnInputBlur"
                name="ssn"
                id="ssn"
                ref="ssn"
                tabindex="3">
          </div>
        </div>
      </Transition>
      <Transition name="slide">
        <div v-show="showCellphone">
          <div class="input-text-container">
            <Transition name="label-fade">
              <label v-if="focus==='cellphone' || this.cellphone !== ''" class="input-header">휴대폰 번호</label>
            </Transition>
            <label v-if="focus!=='cellphone'" class="input-header-hidden">휴대폰 번호</label>
            <input
                placeholder="휴대폰 번호"
                class="input-text"
                type="text"
                inputmode="decimal"
                pattern="\d*"
                @input="cellphoneInput"
                @focus="cellphoneInputFocus"
                @blur="cellphoneInputBlur"
                name="cellphone"
                id="cellphone"
                ref="cellphone"
                tabindex="2">
          </div>
        </div>
      </Transition>

      <div>
        <div class="input-text-container">
          <Transition name="label-fade">
            <label v-if="focus==='name' || this.name !== ''" class="input-header">이름</label>
          </Transition>
          <label v-if="focus!=='name'" class="input-header-hidden">이름</label>
          <input
              placeholder="이름"
              class="input-text"
              type="text"
              @input="nameInput"
              name="name"
              id="name"
              ref="name"
              @focus="nameInputFocus"
              @blur="nameInputBlur"
              @keyup.enter.prevent="enterName"
              @keyup.tab.prevent="enterName"
              tabindex="1">
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-container">
    <Transition name="button-slide">
      <div
          class="button-primary"
          @click="enterName"
          v-if="showNameInputButton"
      >
        다음
      </div>
    </Transition>
    <Transition name="button-slide">
      <div class="button-primary"
           v-if="allInfoEntered"
           @click="showAgreeModal=true">
        다음
      </div>
    </Transition>
  </div>
</template>

<script>
import TopBar from "../partials/TopBar.vue";
import PolicyAgree from "./PolicyAgree.vue";
import FullscreenOverlay from "../commons/FullscreenOverlay.vue";
import {nameValidator, ssnValidator, cellphoneValidator, onlyDigit} from "../../utils/validator.js";
import {cellphoneFormatter, ssnFormatter} from "../../utils/formatter.js";
import PersonalServiceAgree from "./policy/PersonalServiceAgree.vue";

export default {
  name: "Personal",
  components: {
    TopBar,
    PolicyAgree,
    FullscreenOverlay,
    PersonalServiceAgree
  },
  mounted() {
    setTimeout(() => {
      this.$refs.name.focus();
    }, 300);
  },
  watch: {
    '$store.state.layout.height'(val) {
      this.height = val;
    }
  },
  data() {
    return {
      businessType: 'personal',
      name: "",
      // showNameInputButton: false,
      cellphone: "",
      cellphoneDisplay: "",
      cellphoneEntered: false,
      cellphoneError: "",
      ssn: "",
      focus: null,
      showCellphone: false,
      showSsn: false,
      showAgreeModal: false,
      showServicePolicy: false,
      height: this.$store.getters['layout/height']
    }
  },
  computed: {
    showNameInputButton() {
      if (this.showCellphone === true) {
        return false
      }
      return nameValidator(this.name)
    },
    allInfoEntered() {
      try {
        if (nameValidator(this.name) === false) {
          return false
        }
        cellphoneValidator(this.cellphone)
        ssnValidator(this.ssn)
        return true
      } catch {
        return false
      }

    }
  },
  methods: {
    enterName() {
      if (nameValidator(this.name)) {
        // this.showNameInputButton = false
        this.showCellphone = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs['cellphone'].focus()
          }, 300)
        })
      } else {
        alert("이름을 입력해주세요.")
      }
    },
    nameInput(event) {
      // this.showNameInputButton = nameValidator(this.name)
      this.name = event.target.value
    },
    nameInputFocus(event) {
      this.focus = 'name'
    },
    nameInputBlur(event) {
      this.focus = null
    },
    cellphoneInput(event) {
      const value = onlyDigit(event.target.value).substring(0, 11)
      event.target.value = cellphoneFormatter(value)
      try {
        this.cellphone = cellphoneValidator(value)
        this.showSsn = this.showSsn || true
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs['ssn'].focus()
          }, 300)
        })
      } catch (e) {
        this.cellphone = value
      }
    },
    cellphoneInputFocus(event) {
      this.focus = 'cellphone'
      event.target.value = onlyDigit(event.target.value)
    },
    cellphoneInputBlur(event) {
      this.focus = null
      event.target.value = cellphoneFormatter(onlyDigit(event.target.value))
    },
    ssnInput(event) {
      const value = onlyDigit(event.target.value).substring(0, 13)
      event.target.value = ssnFormatter(value)
      try {
        this.ssn = ssnValidator(value)
        setTimeout(() => {
          this.$refs['ssn'].blur()
        }, 300)
      } catch (e) {
        this.ssn = value
      }
    },
    ssnInputFocus(event) {
      this.focus = 'ssn'
      event.target.value = onlyDigit(event.target.value)
    },
    ssnInputBlur(event) {
      event.target.value = ssnFormatter(onlyDigit(event.target.value))
    },
  }
}
</script>

<style scoped>
.input-text {
  border: none;
  border-bottom: rgb(145, 145, 145) 1px solid;
  /*padding: 1rem;*/
  outline: none;
  width: 100%;
  background-color: white;
  margin-bottom: 1rem;
  line-height: 1.5;
  color: rgb(105, 112, 119);
  cursor: default;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.4rem;
}

.input-text:focus {
  font-size: 1.5rem;
}

.input-text:focus {
  border-bottom: var(--main-bg) 2px solid;
  outline: 0;
}

.input-text:focus::placeholder {
  color: rgba(0, 0, 0, 0);
}


.show-agree-modal-enter-from,
.show-agree-modal-leave-to{
  transform: translateY(100%);
}
.show-agree-modal-enter-active,
.show-agree-modal-leave-active {
  transition: transform 0.2s ease-out;
}

.label-fade-enter-active {
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
}

.label-fade-leave-active {
  transition: opacity 0.1s ease-in, transform 0.1s ease-in;
}

.label-fade-enter-from {
  transform: translateY(2rem) translateX(0.5rem);
  opacity: 0;
}

.label-fade-leave-to {
  transform: translateY(2rem) translateX(0.5rem);
  opacity: 100;
}

.button-slide-enter-active {
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
}

.button-slide-leave-active {
  transition: opacity 0.1s ease-in, transform 0.1s ease-in;
}

.button-slide-enter-from {
  transform: translateY(2rem);
  opacity: 0;
}

.button-slide-leave-to {
  transform: translateY(2rem);
  opacity: 100;
}


.slide-leave-active,
.slide-enter-active {
  transition: transform 0.1s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-2rem);
}

</style>
