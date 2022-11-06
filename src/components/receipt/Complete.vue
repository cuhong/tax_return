<template>
  <div class="main-container">
    <TopBar/>
    <div class="page-title mb-3 mt-3">
      {{name}}님의 신청이 접수되었습니다.
    </div>
        <div class="page-sub-text mb-5">
          <div>{{name}}님의 {{businessTypeDisplay}}</div>
          <div>세금 환급 신청이 접수되었습니다. </div>
          <div>담당자 검토 후 연락드리겠습니다.</div>
        </div>
    <div>

    </div>
  </div>
    <div class="bottom-container">
      <Transition name="button-slide">
        <div
            class="button-primary"
            @click="goToHome"
        >
          처음으로
        </div>
      </Transition>
    </div>
</template>

<script>
import TopBar from "../partials/TopBar.vue";
import store from "../../store/index.js";
import urlJoin from "url-join";
import {verifyToken} from "../../services/auth.js";
const {VITE_HOST, VITE_BACKEND_HOST} = import.meta.env;
import {StorageType, useStorage} from "vue3-storage";


const storage = useStorage('allfee_');

export default {
  name: "Complete.vue",
  async mounted() {
    var target
    store.commit('loader/setIsLoading', true);
    try {
      const campaignCode = "2022youtubereturn"
      const ledgerId = this.$route.query.ledgerId
      const requestUrl = urlJoin(VITE_BACKEND_HOST, `/campaign/${campaignCode}/ledger/${ledgerId}/`);
      const authStatus = await verifyToken()
      if (!authStatus) {
        target = {"name": "Login"}
        throw "로그인이 필요합니다,."
      }
      const response = await this.axios.get(
          requestUrl,{
            headers: {
              Authorization: `Bearer ${storage.getStorageSync('accessToken')}`
            }
          }
      )
      if (response.data.code !== "0000") {
        target = {"name": "CompanyHome"}
        throw response.data.msg
      }
      this.name = response.data.data.customer.name
      this.businessType = response.data.data.customer.business_type
      console.log(response.data)
    } catch (e) {
      alert(e)
    } finally {
      store.commit('loader/setIsLoading', false);
      if (target) {
        this.$router.push(target)
      }
    }
  },
  components: {
    TopBar,
  },
  watch: {
    '$store.state.layout.height'(val) {
      this.height = val;
    }
  },
  computed: {
    businessTypeDisplay() {
      if (this.businessType === "personal") {
        return "프리랜서/개인사업자"
      } else if (this.businessType === "corp") {
        return "법인사업자"
      }
      return "사업자";
    }
  },
  data() {
    return {
      height: this.$store.getters['layout/height'],
      name: "",
      businessType: ""
    }
  },
  methods: {
    goToHome() {
      this.$router.push({name: 'CompanyHome'})
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
.show-agree-modal-leave-to {
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
