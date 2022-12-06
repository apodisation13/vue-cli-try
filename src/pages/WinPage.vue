<template>
  <div class="start">
    <div class="win_price">
      ВАШ ВЫИГРЫШ <br /><br />
      scraps: <b>{{ pay_data.scraps }}</b>
      <img
        :src="require(`@/assets/icons/resources/scraps.svg`)"
        alt=""
        class="wood"
      />
      <br /><br />
      wood: <b>{{ pay_data.wood }}</b>
      <img
        :src="require(`@/assets/icons/resources/wood.svg`)"
        alt=""
        class="wood"
      />
      <br /><br />
      kegs: <b>{{ pay_data.kegs }}</b>
      <img
        :src="require(`@/assets/icons/resources/kegs.svg`)"
        alt=""
        class="wood"
      />
      <br /><br />
      big kegs: <b>{{ pay_data.big_kegs }}</b>
      <img
        :src="require(`@/assets/icons/resources/big_kegs.svg`)"
        alt=""
        class="wood"
      />
      <br /><br />
      keys: <b>{{ pay_data.keys }}</b>
      <img
        :src="require(`@/assets/icons/resources/keys.svg`)"
        alt=""
        class="wood"
      />
      <br /><br />
      <div v-if="related_levels.length">
        Вы открыли уровни: <br />
        {{ related_levels }}
      </div>
    </div>
  </div>
</template>

<script>
import { getRewardForLevel } from "@/logic/random_rewards"
export default {
  name: "win-page",
  computed: {
    win_price() {
      if (this.$store.state.game.level.difficulty === "easy")
        return this.$store.state.user_actions.game_prices.win_level_easy
      else if (this.$store.state.game.level.difficulty === "normal")
        return this.$store.state.user_actions.game_prices.win_level_normal
      else if (this.$store.state.game.level.difficulty === "hard")
        return this.$store.state.user_actions.game_prices.win_level_hard
      else return "Уровень не выбран!"
    },
    all_seasons() {
      return this.$store.getters["all_seasons"]
    },
  },
  data() {
    return {
      pay_data: {},
      related_levels: [],
    }
  },
  async created() {
    if (!this.$store.state.user_actions.win_redirect) return
    this.$store.dispatch("re_set_deck") // и тут переустанавливаем выбранную деку
    await this.pay_resources() // получаем ресурсы за выигрыш
    await this.open_levels() // открываем связанные уровни в дереве
    this.$store.commit("set_win_redirect", false)
  },
  methods: {
    // оплата ресурсов за прохождение уровня
    async pay_resources() {
      this.pay_data = getRewardForLevel(this.win_price)

      await this.$store.dispatch("pay_resource", {
        wood: this.$store.getters["resource"].wood + this.pay_data.wood,
        scraps: this.$store.getters["resource"].scraps + this.pay_data.scraps,
        kegs: this.$store.getters["resource"].kegs + this.pay_data.kegs,
        big_kegs:
          this.$store.getters["resource"].big_kegs + this.pay_data.big_kegs,
        keys: this.$store.getters["resource"].keys + this.pay_data.keys,
      })
    },
    // открытие всех связанных уровней при прохождении уровня
    async open_levels() {
      const currentLevel = this.$store.getters["currentLevel"]
      if (currentLevel.random) return // при рандомном уровне сразу выходим отсюда

      const season = this.$store.getters["get_season"] // выбранный сезон из стора, выбирается по открытию дерева
      const level = season.levels.find(lev => lev.level.id === currentLevel.id) // ищем уровень из списка уровней сезона
      if (!level || level.finished) return // если уровень УЖЕ пройден, то нет смысла открывать его детей

      this.related_levels = level.level.related_levels
      if (this.related_levels.length === 0) return // если связанных уровней нет, открывать нечего

      const seasonIndex = this.all_seasons.findIndex(sea => sea === season)
      const data = {
        finished_level: level.level.id, // если он приходит, то открываем уровни, иначе удаляем все кроме первого
        related_levels: this.related_levels, // список [1,2,3] id уровней, которые надо открыть
        finished_user_level_id: level.id, // id записи UserLevel, ей поставим finished=true
        season_id: season.id,
        seasonIndex: seasonIndex,
      }
      await this.$store.dispatch("open_new_levels", data)
    },
  },
}
</script>

<style scoped>
div {
  color: white;
}

.start {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 70vh;
  border: solid 2px black;
}

.win_price {
  width: 100%;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.wood {
  max-height: 30px;
}
</style>
