<template>
  <div class="footer" v-if="menuNeeded && isLoggedIn">
    <button class="levels footer__btn" @click="$router.push('/levelselect')">
      <span class="footer__text">Режимы</span>
    </button>
    <button class="game footer__btn" @click="$router.push('/start_game')">
      <themed-button title="Игра" />
    </button>
    <button class="deckbuilder footer__btn" @click="$router.push('/deckbuild')">
      <span class="footer__text">Склад</span>
    </button>
  </div>
</template>

<script>
import ThemedButton from "@/components/UI/Buttons/ThemedButton.vue"

export default {
  name: "MenuFooter",
  components: { ThemedButton },
  computed: {
    // меню не нужны, если в роутере есть notRequireMenu (страницы загрузки, игры)
    menuNeeded() {
      return !this.$router.currentRoute.value.meta.notRequireMenu
    },
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"]
    },
  },
}
</script>

<style scoped>
.footer {
  position: absolute;
  width: 100%;
  display: flex;
  text-align: center;
  bottom: 0;
}

.footer__btn {
  background: linear-gradient(
    180deg,
    #465361 0%,
    rgba(37, 44, 50, 0.35) 50.52%,
    #1d252d 99.48%
  );
  border: none;
  border-top: 3px solid;
  border-image-source: linear-gradient(
    93.48deg,
    #b07b15 -6.47%,
    #facf5d 41.82%,
    #b48328 97.8%
  );
  border-image-slice: 1;
  height: 52px;
  margin-top: auto;
}

.footer__text {
  font-family: "Philosopher", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    183.6deg,
    #edb13e 2.96%,
    #f4d977 65.79%,
    #eeb850 129.95%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.game {
  border: 3px solid;
  border-image-source: linear-gradient(
    93.48deg,
    #b07b15 -6.47%,
    #facf5d 41.82%,
    #b48328 97.8%
  );
  border-image-slice: 1;
  height: 78px;
  width: 40%;
  background: #000000;
  padding: 2px;
}

.deckbuilder,
.levels {
  width: 30%;
}

.game .footer__text {
  font-size: 27px;
  padding: 5px;
  border-radius: 3px;
}
</style>
