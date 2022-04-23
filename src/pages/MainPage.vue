<template>
    <div>
      ЭТО ГЛАВНАЯ СТРАНИЦА<br><br>

      <router-link to='/about'>О нас</router-link><br><br>

      <router-link
          to='/login'
          v-if="!isLoggedIn"
      >
        Регистрация\Вход
      </router-link><br>

      <div class="user_info" v-if="isLoggedIn">
        ПРИВЕТ {{ username }}!
        <button
            class="exit"
            @click="logout"
        >Выход</button>
      </div>
    </div>
</template>

<script>
  export default {
    computed: {
      isLoggedIn() {
        return this.$store.getters['isLoggedIn']
      },
      username() {
        return this.$store.getters['getUsername']
      },
    },
    methods: {
      logout() {
        this.$store.dispatch("logout")
      },
    },
  }
</script>

<style>
.user_info {
  position: absolute;
  top: 2%;
  right: 2%;
  width: 30%;
  height: 20vh;
  border: solid 2px blueviolet;
}

.exit {
  width: 60%;
  height: 5vh;
  position: absolute;
  bottom: 2%;
  right: 2%;
}
</style>