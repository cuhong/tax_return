<template>
  <div class="topbar-container">
    <img class="logo" alt="logo" src="../../assets/logo/logo-color-small.png" @click="goToHome">
    <div class="contact-button" @click="openChat">
      문의하기
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    goToHome() {
      this.$router.push({name: "CompanyHome"})
    },
    openChat() {
      this.$loadScript("https://t1.kakaocdn.net/kakao_js_sdk/2.0.0/kakao.min.js")
          .then(() => {
            Kakao.init('6228841445005683b635c83ae61d4a85');
            Kakao.Channel.chat({
              channelPublicId: '_xjxhBsxj'
            });
          })
    }
  }
}
</script>

<style scoped>

</style>
