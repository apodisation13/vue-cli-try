<template>
  <div class="footer" v-if="menuNeeded">
    <button class="levels footer__btn" @click="$router.push('/levelselect')">
      Уровни
    </button>
    <button class="game footer__btn" @click="$router.push('/start_game')">
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
  position: absolute;
  width: 100%;
  padding: 0 10px 10px;
  display: flex;
  justify-content: space-between;
  /*TODO: тут одинаковое???*/
  text-align: center;
  justify-content: space-around;
  bottom: 0;
}

.footer__btn {
  background: #667080;
  border-radius: 6px;
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  padding: 5px 15px;
}
</style>
