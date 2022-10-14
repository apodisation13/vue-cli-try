<template>
  <div>
    <div class="not_logged_in" v-if="!isLoggedIn">
      <div class="not_logged_in__text">
        Зарегистрироваться можно по
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
  margin-top: 15%;
  margin-bottom: 28px;
  width: 100%;
  height: 6.5vh;
}

.not_logged_in__text {
  width: 70%;
  font-family: "Philosopher";
  font-style: normal;
  font-weight: 700;
  font-size: 29px;
  line-height: 100%;
  text-align: center;
  background: linear-gradient(
    153.5deg,
    #b07b15 16.59%,
    #facf5d 47.17%,
    #b48328 82.62%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0px 3.64345px 3.64345px rgba(0, 0, 0, 0.25);
  height: 60px;
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
