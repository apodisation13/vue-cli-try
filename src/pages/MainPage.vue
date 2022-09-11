<template>
  <div>
    <div class="not_logged_in" v-if="!isLoggedIn">
<<<<<<< HEAD
      <div class="not_logged_in__text">
        Для регистрации перейдите по
        <router-link to="/login">ссылке</router-link>
      </div>
    </div>
    <div class="not_logged_in" v-if="isLoggedIn">
      <div class="not_logged_in__text">Добро пожаловать, username</div>
=======
      <div>Перейдите по ссылке</div>
      <router-link to="/login">Регистрация\Вход</router-link>
>>>>>>> dev
    </div>
    <div class="info">
      <!-- <b>Тут будут новости</b>
      <div v-if="isLoggedIn">
        <div class="info_block">
          Если провести пальцем вниз по кнопке аватарка, откроется подменю.<br />
          Если провести по подменю пальцем вверх,подменю закроется.<br />
          Если провести пальцем вправо, откроется меню.<br />
        </div>
        <div class="info_block" v-if="$store.state.show_menu">
          <div>Ну вот отлично! Меню открылось!</div>
          <div>
            А закрыть его можно по кнопке Закрыть в нём, или провести в нём
            пальцем влево! Попробуйте!
          </div>
        </div>

        <div class="info_block" v-if="$store.state.show_menu">
          <div>
            <b>Навигация по меню:</b>
          </div>
          <div>База данных - информация о картах, лидерах</div>
          <div>
            Уровни - информация о доступных уровнях, выбрать колоду для игры
          </div>
          <div>Игра - играть в саму игру!</div>
          <div>
            А внизу значок on/off - включен ли звук (on - включен, off -
            выключен).
          </div>
        </div>
      </div>

      <div class="info_block">
        Внимание! Меню так же доступно на любой странице, только найти свободное
<<<<<<< HEAD
        место чтобы его вызвать :) -->
      <!-- </div> -->
      <!-- <div class="news">
        <div class="news__header">
          <button @click="() => (this.currentSlide = this.currentSlide + 1)">
            {{ "<" }}
          </button>
          <b>Тут будут новости</b>
          <button>{{ ">" }}</button>
          <p>Тут будут новости</p>
        </div>
        <div
          class="news__content"
          :style="{ 'margin-left': '-' + 80 * currentSlide + '%' }"
        >
          <div class="news__element" v-for="element in news" :key="element.id">
            {{ element.description }}
          </div>
        </div>
      </div> -->
      <news-list />
=======
        место чтобы его вызвать :)
      </div>
>>>>>>> dev
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
<<<<<<< HEAD
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
=======
  margin-top: 1vh;
  width: 99%;
  height: 15vh;
  border: solid 2px red;
>>>>>>> dev
}

.info {
  width: 100%;
  height: 60vh;
  /*background-color: darkgrey;*/
}

.info_block {
  margin-top: 2%;
}
<<<<<<< HEAD

.news__element {
  flex: 0 0 auto;
  border: 1px solid black;
  max-width: 350px;
  overflow: scroll;
  margin-left: 15px;
}
=======
>>>>>>> dev
</style>
