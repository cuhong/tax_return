<template>
  <div class="topbar-container">
    <img class="logo" alt="logo" src="../../assets/logo/logo-color.png">
    <div class="contact-button" @click="openChat">
      문의하기
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
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
.topbar-container {
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  height: 56px;
  width: 100%;
  justify-content: space-between;
}

.logo {
  object-fit: cover;
  height: 100%;
}

.contact-button {
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  line-height: 24px;
  color: rgb(105, 112, 119);
  background-color: rgb(246, 246, 246);
  padding-left: 5px;
  padding-right: 5px;
  height: 28px;
}
</style>
