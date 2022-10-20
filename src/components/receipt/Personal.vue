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
      <div v-show="screen === 'name'">
        <div class="input-text-container">
          <div class="input-header">
            신청자명 ({{screenIndex}}/{{screens.length}})
          </div>
          <label class="label-text" for="name">신청자명</label>
          <input class="input-text" type="text" @input="nameInput" name="name" id="name" ref="name">
        </div>
      </div>
      <div v-show="screen === 'cellphone'">
        <div class="input-text-container mb-3">
          <div class="input-header">
            휴대전화번호 ({{screenIndex}}/{{screens.length}})
          </div>
          <label class="label-text" for="cellphone">휴대전화번호</label>
          <input class="input-text" type="text" @input="cellphoneInput" @focus="cellphoneInputFocus" @blur="cellphoneInputBlur" name="cellphone" id="cellphone" ref="cellphone">
        </div>
      </div>
      <div v-show="screen === 'ssn'">
        <div class="input-text-container mb-3">
          <div class="input-header">
            주민등록번호 ({{screenIndex}}/{{screens.length}})
          </div>
          <label class="label-text" for="ssn">주민등록번호</label>
          <input class="input-text" type="text" @input="ssnInput" @focus="ssnInputFocus" @blur="ssnInputBlur" name="ssn" id="ssn" ref="ssn">
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-container">
    <div
      :class="{
        'button-disabled': !businessType,
        'button-primary': businessType
      }"
      @click="next"
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
  data() {
    return {
      screen: "name",
      screens: ["name", "cellphone", "ssn"],
      businessType: 'personal',
      name: "",
      cellphone: "",
      cellphoneDisplay: "",
      ssn: ""
    }
  },
  mounted() {
    this.$refs[this.screens[0]].focus()
  },
  methods: {
    next() {
      var index = this.screens.findIndex((screenName) => {return screenName === this.screen})
      console.log('index '+ index)
      var screenName = this.screens[index]
      try {
        if (screenName === "name") {
          nameValidator(this.name)
        } else if (screenName === "cellphone") {
          cellphoneValidator(this.cellphone)
        } else if (screenName === "ssn") {
          ssnValidator(this.ssn)
        }
        const nextScreen = this.screens[index + 1]
        if (nextScreen === undefined) {
          alert('개발 중입니다.')
        } else {
          this.screen = nextScreen
          this.$nextTick(() => {
            this.$refs[nextScreen].focus()
          })
        }
      } catch (e) {
        alert(e)
      }
    },
    nameInput(event) {
      this.name = event.target.value
    },
    cellphoneInput(event) {
      this.cellphone = onlyDigit(event.target.value).substring(0, 11)
      event.target.value = cellphoneFormatter(this.cellphone)
    },
    cellphoneInputFocus(event) {
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
      event.target.value = onlyDigit(event.target.value)
    },
    ssnInputBlur(event) {
      event.target.value = ssnFormatter(onlyDigit(event.target.value))
    },
  },
  computed: {
    screenIndex() {
      return this.screens.findIndex((screenName) => {
        return screenName === this.screen
      }) + 1
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
  flex: 1 1 0%;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%
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
  flex: 1 1 0%;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%
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

</style>
