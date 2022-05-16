<template>
  <div class="start">

    <div class="resource">
      <b><resource-comp /></b>
    </div>

    <div class="win_price">
      ВАШ ВЫИГРЫШ <br>
      scraps: <b>{{ pay_data.scraps }}</b><br>
      wood: <b>{{ pay_data.wood }}</b><br>
      kegs: <b>{{ pay_data.kegs }}</b><br>
      big kegs: <b>{{ pay_data.big_kegs }}</b><br>
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
  data() {
    return {
      pay_data: {},
    }
  },
  async created() {
    if (!this.$store.state.user_actions.win_redirect) return

    this.pay_data.wood = this.win_price
    this.pay_data.scraps = this.win_price
    let kegs = [0,0,0,1]  // 25%!!!
    let chance = kegs[Math.floor(Math.random() * kegs.length)]
    if (chance === 1) this.pay_data.kegs = 1
    else this.pay_data.kegs = 0
    let big_kegs = [0,0,0,0,0,0,0,1]  // 18%!!!
    let chance2 = big_kegs[Math.floor(Math.random() * big_kegs.length)]
    if (chance2 === 1) this.pay_data.big_kegs = 1
    else this.pay_data.big_kegs = 0

    await this.$store.dispatch("pay_resource", {
      "wood": this.$store.getters['resource'].wood + this.pay_data.wood,
      "scraps": this.$store.getters['resource'].scraps + this.pay_data.scraps,
      "kegs": this.$store.getters['resource'].kegs + this.pay_data.kegs,
      "big_kegs": this.$store.getters['resource'].big_kegs + this.pay_data.big_kegs,
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
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}
</style>