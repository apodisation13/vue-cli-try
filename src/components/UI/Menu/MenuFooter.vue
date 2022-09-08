<template>
  <div class="footer" v-if="menuNeeded">
    <button class="levels footer__btn" @click="$router.push('/levelselect')">
      Уровни
    </button>
    <button class="game footer__btn" @click="$router.push('/game')">
      Игра
    </button>
    <button class="deckbuilder footer__btn" @click="$router.push('/deckbuild')">
      Колоды
    </button>
  </div>
</template>

<script>
export default {
  name: "MenuFooter",
  computed: {
    // меню не нужны, если в роутере есть notRequireMenu (страницы загрузки, игры)
    menuNeeded() {
      return !this.$router.currentRoute.value.meta.notRequireMenu
    },
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
  width: 25vw;
  height: 100%;
}

.levels {
  left: 5%;
  width: 25vw;
  height: 100%;
}

.deckbuilder {
  right: 5%;
  width: 25vw;
  height: 100%;
}

.footer__btn{

}

</style>