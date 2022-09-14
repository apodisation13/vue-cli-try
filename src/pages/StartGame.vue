<template>
  <div>
    <div class="start">
      <div class="play_price">
        Для этой игры надо заплатить <b>{{ play_price }}</b> wood!
      </div>
      <button class="btn_start" @click="start_game">НАЧАТЬ</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartGame",
  computed: {
    play_price() {
      if (this.$store.state.game.level.difficulty === "easy")
        return this.$store.state.user_actions.play_level_easy
      else if (this.$store.state.game.level.difficulty === "normal")
        return this.$store.state.user_actions.play_level_normal
      else if (this.$store.state.game.level.difficulty === "hard")
        return this.$store.state.user_actions.play_level_hard
      else return "Уровень не выбран!"
    },
  },
  methods: {
    async start_game() {
      try {
        await this.$store.dispatch("pay_resource", {
          wood: this.$store.getters["resource"].wood + this.play_price,
        })
        this.$store.commit("set_start_game_redirect", true)
        await this.$router.push("/game") // ВОТ ТУТ мы переходим на игру и ТОЛЬКО тут (с флагом, что запрос успешно)
      } catch (err) {
        // TODO: Добавить сюда обработку ошибки
        alert("Что-то пошло не так, сыграть невозможно")
      }
    },
  },
}
</script>

<style scoped>
.start {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 50vh;
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
</style>
