<template>
  <div class="start-game__page">
    <div class="start">
      <div class="play_price">
        Для этой игры надо заплатить <b>{{ play_price }}</b> wood!
      </div>
      <button class="btn_start" @click="start_game" :disabled="loading">
        НАЧАТЬ
      </button>
    </div>
    <div class="decks">
      <div>Выбранный уровень: {{ $store.state.game.level.name }}</div>
      <selected-deck />
      <deck-selection />
    </div>
  </div>
</template>

<script>
import DeckSelection from "@/components/DeckSelection"
import SelectedDeck from "@/components/Pages/LevelPage/SelectedDeck"
export default {
  name: "StartGame",
  components: { SelectedDeck, DeckSelection },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    play_price() {
      if (this.$store.state.game.level.difficulty === "easy")
        return this.$store.state.user_actions.game_prices.play_level_easy
      else if (this.$store.state.game.level.difficulty === "normal")
        return this.$store.state.user_actions.game_prices.play_level_normal
      else if (this.$store.state.game.level.difficulty === "hard")
        return this.$store.state.user_actions.game_prices.play_level_hard
      else return "Уровень не выбран!"
    },
  },
  methods: {
    async start_game() {
      this.loading = true
      try {
        // await this.$store.dispatch("pay_resource", {
        //   wood: this.$store.getters["resource"].wood + this.play_price,
        // })
        this.$store.commit("set_start_game_redirect", true)
        setTimeout(() => {
          this.$router.push("/game") // ВОТ ТУТ мы переходим на игру и ТОЛЬКО тут (с флагом, что запрос успешно)
          this.loading = false
        }, 1000)
      } catch (err) {
        alert("Что-то пошло не так, сыграть невозможно")
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.start-game__page {
  padding: 10px;
  height: calc((var(--vh) * 100) - 178px);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.start {
  width: 70%;
  height: 30vh;
  border: solid 2px black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn_start {
  display: block;
  margin-top: 15px;
  padding: 20px 50px;
}

.play_price {
  text-align: center;
}

.decks {
  width: 99%;
  bottom: 10%;
}
</style>
