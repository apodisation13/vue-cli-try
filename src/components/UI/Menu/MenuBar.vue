<template>
  <div class="menu" v-touch:swipe.left="close_menu">
    <div>
      <button class="close_button" @click="close_menu">
        <span>Закрыть</span>
      </button>
    </div>
    <button class="menu_button" @click="$router.push('/')">
      <span>На гл</span>
    </button>
    <button
      class="menu_button"
      :style="{ backgroundColor: 'green' }"
      v-if="level && isLoggedIn"
      @click="$router.push('/game')"
    >
      <span>Играть</span>
    </button>

    <button
      class="menu_button"
      v-if="isLoggedIn"
      @click="$router.push('/levelselect')"
    >
      Уровни
    </button>

    <button
      class="menu_button"
      v-if="isLoggedIn"
      @click="$router.push('/deckbuild')"
    >
      <span>БД</span>
    </button>

    <button
      class="menu_button"
      v-if="isLoggedIn"
      @click="$router.push('/bonus')"
    >
      Бонус
    </button>

    <button class="menu_button" @click="$router.push('/rules')">
      <span>Правила</span>
    </button>

    <button
      class="menu_button"
      v-if="isLoggedIn"
      @click="$router.push('/settings')"
    >
      <span>Настройки</span>
    </button>

    <button class="switch_sound" v-if="sound" @click="turn_sound">
      <span>ON</span>
    </button>
    <button class="switch_sound" v-else @click="turn_sound">
      <span>OFF</span>
    </button>
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
      return this.$store.getters["isLoggedIn"]
    },
  },
  methods: {
    turn_sound() {
      this.$store.commit("set_play_sound", !this.$store.state.play_sound)
    },
    close_menu() {
      // this.$emit('close_menu')
      this.$store.commit("set_show_menu", false)
    },
  },
  // emits: ['close_menu'],
}
</script>

<style>
.menu {
  background-color: dodgerblue;
  background-image: linear-gradient(
    to right,
    rgba(130, 144, 255),
    rgba(30, 250, 255)
  );
  width: 30%;
  height: 100%;
  border-radius: 0 12px 12px 0;
  text-align: center;
  position: fixed;
  z-index: 99999;
  font-size: 14pt;
  display: block;
}

.menu_button {
  width: 80%;
  height: 5vh;
  margin-top: 5%;
  border-radius: 50% 20% / 10% 40%;
  border: dashed 2px yellow;
  font-family: "Brush Script MT", cursive;
  font-size: 14pt;
}

.switch_sound {
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  font-size: 10pt;
  margin-left: 5%;
  margin-right: 1%;
  margin-top: 5%;
  border: dashed 2px red;
}
</style>
