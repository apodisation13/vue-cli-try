<template>
  <div class="enemy_leader_view" v-touch:swipe="close_self">
    <button-close @close_self="close_self" />

    <div class="enemy_border" :style="border(enemy_leader)">
      <img class="img" :src="enemy_leader.image" v-if="enemy_leader.image" alt="">
    </div>

    <div class="right-panel">
      <div class="diamond"
           v-if="enemy_leader.damage_per_turn"
           :style="background_color(enemy_leader)"
      ></div>
      <h3 v-if="enemy_leader.damage_per_turn"> Урон
        <br>&dagger;{{ enemy_leader.damage_per_turn }}
      </h3>

      <div class="hp"></div>
      <h3> Жизни
        <br>&hearts;{{ enemy_leader.hp }}
      </h3>

    </div>

    <div class="circle" v-if="enemy_leader.ability.name==='damage-once'">
      <span>1 - {{ enemy_leader.damage_once }}</span>
    </div>
    <div class="circle" v-else-if="enemy_leader.ability.name==='damage-per-turn'">
      <span>&#128337;1</span>
    </div>
    <div class="circle" v-else-if="enemy_leader.ability.name==='heal-self-per-turn'">
      <span>+&hearts;{{ enemy_leader.heal_self_per_turn }}</span>
    </div>
    <br>

    <p v-if="enemy_leader.passive"> ПАССИВНАЯ СПОСОБНОСТЬ </p><br>
    <p> {{ enemy_leader.ability.description }} </p>

  </div>
</template>

<script>
import { border_leader, background_color } from '@/logic/border_styles'
import ButtonClose from "@/components/UI/ButtonClose"
export default {
  name: 'enemy-leader-modal',
  components: {ButtonClose},
  props: {
    enemy_leader: {
      required: true,
      type: Object,
    },
  },
  methods: {
    close_self() {
      this.$emit('close_enemy_leader_modal')
    },
    border(e) {
      return border_leader(e)
    },
    background_color(e) {
      return background_color(e)
    },
  },
  emits: [
    'close_enemy_leader_modal'
  ],
}
</script>

<style scoped>

.enemy_leader_view {
  background-color: floralwhite;
  width: 100%;
  height: 76%;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -67%);
  z-index: 9999;
}

h3 {
  display: inline;
  font-size: 14pt;
}

p {
  font-size: 12pt;
}

.enemy_border {
  width: 65%;
  height: 55%;
  display: inline;
  float: left;
  margin-left: 1%;
  border-radius: 1%;
}

.right-panel {
  width: 30%;
  height: 55%;
  display: inline;
  float: right;
  margin-bottom: 3%;
  /*border: solid 2px red;*/
}

.img {
  width: 99%;
  height: 99%;
  margin: auto;
}

.diamond {
  height: 5vh;
  width: 5vh;
  transform: rotateX(45deg) rotateZ(45deg);
  margin: 3% auto auto;
}

.hp {
  width: 40%;
  height: 10%;
  background-color: green;
  border-radius: 20%;
  margin: 3% auto auto;
}

.circle {
  display: inline-grid;
  width: 14%;
  height: 7%;
  background: orangered;
  border-radius: 50%;
  margin: 3% auto;
}

</style>