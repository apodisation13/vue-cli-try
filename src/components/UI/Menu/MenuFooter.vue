<template>
  <div class="footer" v-if="menuNeeded">
    <button class="levels footer__btn" @click="$router.push('/levelselect')">
      <span class="footer__text">Режимы</span>
    </button>
    <button class="game footer__btn" @click="$router.push('/start_game')">
      <div class="game__outer-wrapper" :style="styleOuter">
        <div class="game__wrapper" :style="styleWrapper">
          <div class="footer__text">Игра</div>
        </div>
      </div>
    </button>
    <button class="deckbuilder footer__btn" @click="$router.push('/deckbuild')">
      <span class="footer__text">Склад</span>
    </button>
  </div>
</template>

<script>
import { styleOuter, styleWrapper } from "@/logic/border_styles"

export default {
  name: "MenuFooter",
  computed: {
    // меню не нужны, если в роутере есть notRequireMenu (страницы загрузки, игры)
    menuNeeded() {
      return !this.$router.currentRoute.value.meta.notRequireMenu
    },
    styleOuter() {
      return styleOuter(this.$store.getters["selectedTheme"])
    },
    styleWrapper() {
      return styleWrapper(this.$store.getters["selectedTheme"])
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
  font-family: "Philosopher",serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
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

.game__wrapper {
  box-shadow: inset -4px -4px 4px rgba(0, 0, 0, 0.25),
    inset 4px 4px 10px rgba(186, 218, 255, 0.4);
  padding: 4px;
  /* border-radius: 3px;
  border: 3px solid; */
  /* border-image-source: linear-gradient(100.28deg, #11941E 0.7%, #2FB53C 20.71%, #CEFFDC 49.22%, #2FB53C 91.17%, #11941E 100%);
  border-image-slice: 1; */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game__outer-wrapper {
  /*background: linear-gradient(*/
  /*  100.28deg,*/
  /*  #11941e 0.7%,*/
  /*  #2fb53c 20.71%,*/
  /*  #ceffdc 49.22%,*/
  /*  #2fb53c 91.17%,*/
  /*  #11941e 100%*/
  /*);*/
  height: 100%;
  width: 100%;
  padding: 3px;
  border-radius: 5px;
}

/* .game__wrapper :before{
  display: block;
  position: absolute;
  padding: 5px;
  content: "";
} */

.game .footer__text {
  font-size: 27px;
  padding: 5px;
  border-radius: 3px;
  /* box-shadow: 0px 0px 3px 3px; */
  /* background: linear-gradient(92.75deg, #1AFF4C -14.41%, rgba(141, 255, 166, 0) 57.8%, #1AFF4C 122.86%); */
  /* linear-gradient(92.75deg, #1AFF4C -14.41
  %, rgba(141, 255, 166, 0) 57.8%, #1AFF4C 122.86%) */
}
</style>
