<template>
  <div>

    <div class="not_logged_in" v-if="!isLoggedIn">
      <div>Перейдите по ссылке</div>
      <router-link to='/login'>Регистрация\Вход</router-link>
    </div>

    <div class="info">
      <b>Тут будут новости</b>
      <div v-if="isLoggedIn">
        <div class="info_block">
          Если провести пальцем вниз по кнопке аватарка, откроется подменю.<br>
          Если провести по подменю пальцем вверх,подменю закроется.<br>
          Если провести пальцем вправо, откроется меню.<br>
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
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters['isLoggedIn']
    },
  },
}
</script>

<style scoped>
div, button {
  font-family: 'Brush Script MT', cursive;
  font-size: 14pt;
}

.not_logged_in {
  position: absolute;
  top: 7vh;
  margin-top: 1vh;
  width: 99%;
  height: 15vh;
  border: solid 2px red;
}

.info {
  position: absolute;
  bottom: 12%;
  width: 100%;
  height: 60vh;
  /*background-color: darkgrey;*/
}

.info_block {
  margin-top: 2%;
}
</style>