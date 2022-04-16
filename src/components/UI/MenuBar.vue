<template>

<div class="menu">
    
  <button class="menu_button"
  @click="$router.push('/')">Гл</button>
  
  <button class="menu_button" style="backgroundColor: green;"
  v-if="level"
  @click="$router.push('/game')">И</button>
  
  <button class="menu_button"
  @click="$router.push('/levelselect')">У</button>
  
  <button class="menu_button" 
  @click="$router.push('/deckbuild')">ДБ</button>
  
  <button class="menu_button"
  @click="$router.push('/about')">О</button>

  <button class="switch_sound" v-if="sound" @click="turn_sound">Оn</button>
  <button class="switch_sound" v-else @click="turn_sound">Оff</button>

</div>
</template>

<script>
export default {
  // кнопка появится только после загрузки дефолтного уровня и деки
  computed: { 
    level() {
      return this.$store.state.level
    },
    sound() {
      return this.$store.state.play_sound
    },
  },
  methods: {
    turn_sound() {
      this.$store.commit('set_play_sound', !this.$store.state.play_sound)
    },
  },
}
</script>

<style>

.menu {
  width: 100%;
  /* height: 70px; */
  max-height: 5vh;
  background-color: indigo;
  display: flex;
  align-items: center;  /* вот эта хрень отвечает за то, чтобы посередине были элементы */  
  /* padding: 0 15px; */
}

.menu_button {
  /* width: 100px; */
  width: 15vh;
  /* height: 50px; */
  max-height: 3vh;
  font-size: 6pt;
  margin-left: 5%;
}

.switch_sound {
  width: 5vh;
  max-height: 3vh;
  font-size: 6pt;
  margin-left: 5%;
  margin-right: 1%;
}

</style>