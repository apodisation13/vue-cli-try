<template>
<div class="footer" v-if="cond !== '/game'">
  <button class="levels" @click="$router.push('/levelselect')">
    Уровни
  </button>
  <button class="game" @click="$router.push('/game')">
    Игра
  </button>
  <button class="deckbuilder" @click="$router.push('/deckbuild')">
    Колоды
  </button>
</div>
</template>

<script>
export default {
  name: "MenuFooter",
  computed: {
    cond() {
      return this.$router.currentRoute.value.fullPath
    }
  },
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 1%;
  left: 1%;
  /*border: solid 1px red;*/
  width: 98%;
  height: 5vh;
  display: flex;
  text-align: center;
  margin: auto;
}

.game {
  margin: auto;
  width: 25vw;
  height: 100%;
  border-radius: 50%;
}

.levels {
  position: absolute;
  left: 5%;
  width: 25vw;
  height: 100%;
}

.deckbuilder {
  position: absolute;
  right: 5%;
  width: 25vw;
  height: 100%;
}

</style>