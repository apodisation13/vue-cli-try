<template>
  <div class="start">
    <div class="win_price">
      ВАШ ВЫИГРЫШ <br />
      scraps: <b>{{ pay_data.scraps }}</b
      ><br />
      wood: <b>{{ pay_data.wood }}</b
      ><br />
      kegs: <b>{{ pay_data.kegs }}</b
      ><br />
      big kegs: <b>{{ pay_data.big_kegs }}</b
      ><br />
      <div>Вы открыли уровни: {{ related_levels }}</div>
    </div>
  </div>
</template>

<script>
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
    await this.pay_resources() // получаем ресурсы за выигрыш
    await this.open_levels() // открываем связанные уровни в дереве
    this.$store.commit("set_win_redirect", false)
  },
  methods: {
    async pay_resources() {
      this.pay_data.wood = this.win_price
      this.pay_data.scraps = this.win_price
      let kegs = [0, 0, 0, 1] // 25%!!!
      let chance = kegs[Math.floor(Math.random() * kegs.length)]
      if (chance === 1) this.pay_data.kegs = 1
      else this.pay_data.kegs = 0
      let big_kegs = [0, 0, 0, 0, 0, 0, 0, 1] // 18%!!!
      let chance2 = big_kegs[Math.floor(Math.random() * big_kegs.length)]
      if (chance2 === 1) this.pay_data.big_kegs = 1
      else this.pay_data.big_kegs = 0

      await this.$store.dispatch("pay_resource", {
        wood: this.$store.getters["resource"].wood + this.pay_data.wood,
        scraps: this.$store.getters["resource"].scraps + this.pay_data.scraps,
        kegs: this.$store.getters["resource"].kegs + this.pay_data.kegs,
        big_kegs:
          this.$store.getters["resource"].big_kegs + this.pay_data.big_kegs,
      })
    },
    async open_levels() {
      const id = this.$store.state.game.level.id // id уровня, в который мы играли

      const season = this.$store.getters["get_season"] // выбранный сезон из стора, выбирается по открытию дерева
      const level = season.levels.filter(lev => lev.level.id === id)[0] // ищем уровень из списка уровней сезона
      if (level.finished) return // если уровень УЖЕ пройден, то нет смысла открывать его детей

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
  width: 50%;
  height: 40vh;
  border: solid 2px black;
}

.win_price {
  width: 100%;
  text-align: center;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}
</style>
