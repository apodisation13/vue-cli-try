<template>
  <div class="footer" v-if="menuNeeded">
    <button class=" btn-footer levels" @click="$router.push('/levelselect')">
      Уровни
    </button>
    <button class="btn-footer game" @click="$router.push('/game')">
      Игра
    </button>
    <button class="btn-footer deckbuilder" @click="$router.push('/deckbuild')">
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
  text-align: center;
  justify-content: space-around;
  bottom: 0;
}

.btn-footer {
  padding: 5px 15px;
}

.game {
  border-radius: 50%;
}

</style>