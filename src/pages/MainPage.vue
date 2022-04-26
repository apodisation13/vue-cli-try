<template>
  <div>
    <div class="user_info" v-if="isLoggedIn">
      <div>
        ПРИВЕТ {{ username }}!
      </div>
      <resource-comp />
      <button
          class="exit"
          @click="logout"
      >Выход</button>
    </div>

    <div class="not_logged_in" v-if="!isLoggedIn">
      <div>Вы пока не вошли или не зарегистрированы. Перейдите по ссылке</div>
      <router-link to='/login'>Регистрация\Вход</router-link>
    </div>
    <div class="logged_in" v-else>
      <div>Отлично! Вы вошли! Проведите пальцем вправо для открытия меню</div>
    </div>

    <div class="info">
      <b>НУ А ВОТ ТУТ БУДЕТ ЧТО-ТО</b>
      <div v-if="isLoggedIn">
        <div class="info_block">
          Если провести пальцем вправо, откроется меню, попробуйте.
        </div>
        <div class="info_block" v-if="$store.state.show_menu">
          <div>
            Ну вот отлично! Меню открылось!
          </div>
          <div>
            А закрыть его можно по кнопке Закрыть в нём, или провести в нём пальцем влево!
            Попробуйте!
          </div>
        </div>

        <div class="info_block" v-if="$store.state.show_menu">
          <div>
            <b>Навигация по меню:</b>
          </div>
          <div>
            База данных - информация о картах, лидерах
          </div>
          <div>
            Уровни - информация о доступных уровнях, выбрать колоду для игры
          </div>
          <div>
            Игра - играть в саму игру!
          </div>
          <div>
            А внизу значок on/off - включен ли звук (on - включен, off - выключен).
          </div>
        </div>

      </div>

      <div class="info_block">
        Внимание! Меню так же доступно на любой странице, только найти свободное место чтобы его вызвать :)
      </div>

    </div>


  </div>
</template>

<script>
import ResourceComp from "@/components/ResourceComp"
export default {
  components: {ResourceComp},
  computed: {
    isLoggedIn() {
      return this.$store.getters['isLoggedIn']
    },
    username() {
      return this.$store.getters['getUser'].username
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

.not_logged_in {
  position: absolute;
  top: 2%;
  left: 31%;
  width: 36%;
  height: 20vh;
  border: solid 2px red;
}

.logged_in {
  position: absolute;
  top: 2%;
  left: 31%;
  width: 36%;
  height: 20vh;
  border: solid 2px darkorange;
  background-color: lime;
}

.info {
  position: absolute;
  left: 31%;
  top: 24%;
  width: 68%;
  height: 60vh;
  background-color: darkgrey;
}

.info_block {
  margin-top: 2%;
}
</style>