<template>
  <div>
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
        await this.$store.dispatch("pay_resource", {
          wood: this.$store.getters["resource"].wood + this.play_price,
        })
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
div {
  color: white;
}

.start {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 30vh;
  border: solid 2px black;
}

.btn_start {
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 20%;
  position: absolute;
}

.play_price {
  width: 100%;
  text-align: center;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}

.decks {
  position: absolute;
  width: 99%;
  bottom: 10%;
}
</style>
