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
      return !this.$store.state.isGame
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
  justify-content: space-between;
  text-align: center;
  margin: auto;
}

.game {
  width: 50%;
  height: 100%;
}

.levels {
  width: 20%;
  height: 100%;
}

.deckbuilder {
  width: 20%;
  height: 100%;
}

.footer__btn{
  background: #667080;
  border-radius: 6px;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  height: 48px;
}

</style>