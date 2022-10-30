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
                ref="ssn">
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
                ref="cellphone">
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
              @keyup.enter="enterName">
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-container">
    <div
        class="button-primary"
        @click="enterName"
        v-if="showNameInputButton"
    >
      다음
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
      nameEntered: false,
      cellphone: "",
      cellphoneDisplay: "",
      cellphoneEntered: false,
      ssn: "",
      focus: null,
      showCellphone: false,
      showSsn: false
    }
  },
  computed: {
    showNameInputButton() {
      if (this.nameEntered === true) {
        return false
      }
      return nameValidator(this.name)
    },
    allInfoEntered() {
      return this.nameEntered === true && this.cellphoneEntered === true && this.ssn.length === 13
    }
  },
  methods: {
    enterName() {
      this.nameEntered = true
      this.showCellphone = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs['cellphone'].focus()
        }, 300)
      })
    },
    nameInput(event) {
      console.log(event)
      this.nameEntered = false
      this.name = event.target.value
    },
    nameInputFocus(event) {
      this.focus = 'name'
    },
    nameInputBlur(event) {
      this.focus = null
    },
    cellphoneInput(event) {
      try {
        const value = onlyDigit(event.target.value).substring(0, 11)
        cellphoneValidator(value)
        this.cellphone = value
        event.target.value = cellphoneFormatter(this.cellphone)
        this.showSsn = this.showSsn || true
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs['ssn'].focus()
          }, 300)
        })
      } catch (e) {
        this.cellphone = onlyDigit(event.target.value).substring(0, 11)
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

/*.label-text {*/
/*  display: none;*/
/*}*/

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


.slide-leave-active,
.slide-enter-active {
  transition: transform 0.1s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-2rem);
}

</style>
