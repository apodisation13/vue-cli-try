<template>
  <div>
    <div class="not_logged_in" v-if="!isLoggedIn">
      <div class="not_logged_in__text">
        Для регистрации перейдите по
        <router-link to="/login">ссылке</router-link>
      </div>
    </div>
    <div class="not_logged_in" v-if="isLoggedIn">
      <div class="not_logged_in__text">
        Добро пожаловать, {{ this.$store.state.login.user.username }}
      </div>
    </div>
    <div class="news">
      <news-list />
    </div>
  </div>
</template>

<script>
import NewsList from "@/components/NewsList.vue"

export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"]
    },
  },
  components: {
    NewsList,
  },
}
</script>

<style scoped>
div,
button {
  font-family: "Brush Script MT", cursive;
  font-size: 14pt;
}

.not_logged_in {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 38px;
  margin-bottom: 37px;
  width: 100%;
  height: 6.5vh;
}

.not_logged_in__text {
  width: 95%;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
}

.not_logged_in__text a {
  color: black;
}

.news {
  width: 100%;
  height: 60vh;
  /*background-color: darkgrey;*/
}
</style>
