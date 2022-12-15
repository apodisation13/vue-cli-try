<template>
  <div>
    <div class="not_logged_in" v-if="!isLoggedIn">
      <div class="global_text not_logged_in__text">
        Зарегистрироваться можно по
        <router-link to="/login">ссылке</router-link>
      </div>
    </div>
    <div class="not_logged_in" v-if="isLoggedIn">
      <div class="global_text not_logged_in__text">
        Добро пожаловать, {{ this.$store.state.login.user.username }}
      </div>
    </div>
    <div class="news">
      <news-list />
    </div>
  </div>
</template>

<script>
import NewsList from "@/components/Pages/MainPage/NewsList.vue"

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
.not_logged_in {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 25px;
  width: 100%;
  height: 6.5vh;
}

.not_logged_in__text {
  width: 70%;
  height: 60px;
  font-size: 29px;
  background: var(--six-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.not_logged_in__text a {
  text-decoration: underline;
  text-decoration-color: #b07b15;
}

.news {
  width: 100%;
  height: 50vh;
}
</style>
