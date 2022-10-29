<!--/**-->
<!--# singo2 = TilkoComplexTaxReport(-->
<!--#     "6", "홍찬의", "19860906", "01024846313", "8609061020710",-->
<!--#     "20200101", "20201231", api_key-->
<!--# )-->
<!--**/-->
<template>
  <div class="main-container-container">
    <TopBar/>
    <div class="page-title mb-3 mt-3">
      개인사업자 서류 접수
    </div>
    <div class="page-sub-text mb-5">
      <div>개인사업자 세금 환급을 위해</div>
      <div>필요한 정보를 입력해주세요.</div>
    </div>
    <div>
      <Transition name="slide">
      <div v-show="cellphoneEntered">
        <div class="input-text-container mb-3">
          <div :class="{'input-header-focused': focus === 'ssn', 'input-header': focus !== 'ssn'}">
            주민등록번호
          </div>
          <label class="label-text" for="ssn">주민등록번호</label>
          <input class="input-text"
                 type="text"
                 inputmode="decimal"
                 pattern="\d*"
                 @input="ssnInput"
                 @focus="ssnInputFocus"
                 @blur="ssnInputBlur"
                 name="ssn"
                 id="ssn"
                 ref="ssn">
        </div>
      </div>
      </Transition>
      <Transition name="slide">
        <div v-show="nameEntered">
          <div class="input-text-container mb-3">
            <div :class="{'input-header-focused': focus === 'cellphone', 'input-header': focus !== 'cellphone'}">
              휴대전화번호
            </div>
            <label class="label-text" for="cellphone">휴대전화번호</label>
            <input
                class="input-text"
                type="text"
                inputmode="decimal"
                pattern="\d*"
                @input="cellphoneInput"
                @focus="cellphoneInputFocus"
                @blur="cellphoneInputBlur"
                name="cellphone"
                id="cellphone"
                ref="cellphone">
          </div>
        </div>
      </Transition>

      <div>
        <div class="input-text-container">
          <div :class="{'input-header-focused': focus === 'name', 'input-header': focus !== 'name'}">
            신청자명
          </div>
          <label class="label-text" for="name">신청자명</label>
          <input
              class="input-text"
              type="text"
              @input="nameInput"
              name="name"
              id="name"
              ref="name"
              @focus="focus='name'"
              @blur="focus=null"
              @keyup.enter="enterName">
          <small v-if="nameError">
            {{nameError}}
          </small>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-container">
    <div
      class="button-primary"
      @click="enterName"
      v-if="!nameEntered"
    >
      {{ this.businessType === null ? "사업자 형태를 선택하세요" : "다음 단계" }}
    </div>
  </div>
</template>

<script>
import TopBar from "../partials/TopBar.vue";
import {nameValidator, ssnValidator, cellphoneValidator, onlyDigit} from "../../utils/validator.js";
import {cellphoneFormatter, ssnFormatter} from "../../utils/formatter.js";

export default {
  name: "Personal",
  components: {
    TopBar
  },
  mounted() {
    this.$refs['name'].focus();
  },
  data() {
    return {
      businessType: 'personal',
      name: "",
      nameError: null,
      nameEntered: false,
      cellphone: "",
      cellphoneDisplay: "",
      cellphoneEntered: false,
      ssn: "",
      focus: null,
    }
  },
  methods: {
    enterName() {
      try {
        nameValidator(this.name)
        this.nameEntered = true
        this.$nextTick(() => {
          this.$refs['cellphone'].focus()
        })
      } catch (e) {
        this.nameError = e
        this.$refs['name'].focus()
      }
    },
    nameInput(event) {
      this.nameError = null
      this.nameEntered = false
      this.name = event.target.value
    },
    cellphoneInput(event) {
      try {
        this.cellphoneEntered = false
        const value = onlyDigit(event.target.value).substring(0, 11)
        cellphoneValidator(value)
        this.cellphone = value
        event.target.value = cellphoneFormatter(this.cellphone)
        this.cellphoneEntered = true
        this.$nextTick(() => {
          this.$refs['ssn'].focus()
        })
      } catch (e) {
        this.cellphoneEntered = false
        this.cellphone = onlyDigit(event.target.value).substring(0, 11)
      }
    },
    cellphoneInputFocus(event) {
      this.focus = 'cellphone'
      event.target.value = onlyDigit(event.target.value)
    },
    cellphoneInputBlur(event) {
      event.target.value = cellphoneFormatter(onlyDigit(event.target.value))
    },
    ssnInput(event) {
      this.ssn = onlyDigit(event.target.value).substring(0, 13)
      event.target.value = ssnFormatter(this.ssn)
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
  width: 100%;
  user-select: none;
}

.button-disabled {
  flex-direction: row;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  cursor: not-allowed;
  outline: none;
  min-height: 3.25rem;
  font-size: 1rem;
  border: none;
  line-height: 20.72px;
  box-sizing: border-box;
  text-transform: uppercase;
  letter-spacing: normal;
  background: rgb(145, 145, 145);
  color: rgb(255, 255, 255);
  font-weight: 900;
  display: inline-flex;
  flex: 1 1 0;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  user-select: none;
}

.label-text {
  display: none;
}

.input-text {
  border:none;
  border-bottom: rgb(145, 145, 145) 1px solid;
  padding: 1rem;
  outline: none;
  width: 100%;
  background-color: white;
  margin-bottom: 1rem;
  line-height: 1.5;
  color: rgb(105, 112, 119);
  cursor: default;
  font-size: 1rem;
  font-weight: 600;
}

.input-text:focus {
  border-bottom: var(--main-bg) 2px solid;
  outline: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.slide-leave-active,
.slide-enter-active {
  transition: transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translate(0, 30%);
}

</style>
