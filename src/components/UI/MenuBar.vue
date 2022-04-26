<template>

  <div class="menu" v-touch:swipe.left="close_menu">

    <button class="close_button"
            @click="close_menu"
    >Закрыть</button>

    <button class="menu_button"
            @click="$router.push('/')"
    >На главную</button>

    <button class="menu_button"
            :style="{'backgroundColor': 'green'}"
            v-if="level && isLoggedIn"
            @click="$router.push('/game')"
    >Играть</button>

    <button class="menu_button"
            v-if="isLoggedIn"
            @click="$router.push('/levelselect')"
    >Уровни и колоды</button>

    <button class="menu_button"
            v-if="isLoggedIn"
            @click="$router.push('/deckbuild')"
    >База данных</button>

    <button class="menu_button"
            v-if="isLoggedIn"
            @click="$router.push('/bonus')"
    >Бонусы</button>

    <button class="menu_button"
            @click="$router.push('/rules')"
    >Правила игры</button>

    <button class="menu_button"
            v-if="isLoggedIn"
            @click="$router.push('/settings')"
    >Настройки</button>


    <button class="switch_sound" v-if="sound" @click="turn_sound">Оn</button>
    <button class="switch_sound" v-else @click="turn_sound">Оff</button>

  </div>
</template>

<script>
export default {
  // кнопка появится только после загрузки дефолтного уровня и деки
  computed: { 
    level() {
      return this.$store.state.game.level
    },
    sound() {
      return this.$store.state.play_sound
    },
    isLoggedIn() {
      return this.$store.getters['isLoggedIn']
    },
  },
  methods: {
    turn_sound() {
      this.$store.commit('set_play_sound', !this.$store.state.play_sound)
    },
    close_menu() {
      // this.$emit('close_menu')
      this.$store.commit('set_show_menu', false)
    },
  },
  // emits: ['close_menu'],
}
</script>

<style>

.menu {
  background-color: dodgerblue;
  width: 30%;
  height: 100%;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  z-index: 99999;
  font-size: 14pt;
}

.menu_button {
  width: 80%;
  height: 5vh;
  margin-top: 5%;
  border-radius: 3%;
}

.switch_sound {
  width: 5vh;
  max-height: 3vh;
  font-size: 6pt;
  margin-left: 5%;
  margin-right: 1%;
}

</style>