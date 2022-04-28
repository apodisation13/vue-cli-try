<template>
  <div class="start">

    <div class="resource">
      <b><resource-comp /></b>
    </div>

    <div class="win_price">
      ВЫ ВЫИГРАЛИ <b>{{ win_price }}</b> ресурсов!
    </div>

  </div>
</template>

<script>
import ResourceComp from "@/components/ResourceComp";
export default {
  name: "win-page",
  components: {ResourceComp},
  computed: {
    win_price() {
      if (this.$store.state.game.level.difficulty === "easy") return this.$store.state.user_actions.win_level_easy
      else if (this.$store.state.game.level.difficulty === "normal") return this.$store.state.user_actions.win_level_normal
      else if (this.$store.state.game.level.difficulty === "hard") return this.$store.state.user_actions.win_level_hard
      else return 'Уровень не выбран!'
    },
  },
  async created() {
    if (!this.$store.state.user_actions.win_redirect) return

    await this.$store.dispatch("pay_resource", {
      "wood": this.$store.getters['resource'].wood + this.win_price,
    })
    this.$store.commit("set_win_redirect", false)
  }
}
</script>

<style scoped>
.start {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 40vh;
  border: solid 2px black;
}

.resource {
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.win_price {
  width: 100%;
  text-align: center;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}
</style>