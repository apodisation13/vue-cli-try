<template>
  <modal-window
    :style="{ backgroundColor: 'floralwhite' }"
    v-touch:swipe="close_self"
  >
    <button-close @close_self="close_self" />

    <div>
      {{ enemy_leader.name }}
    </div>
    <div class="enemy_border" :style="border(enemy_leader)">
      <img
        class="img"
        :src="enemy_leader.image"
        v-if="enemy_leader.image"
        alt=""
      />
    </div>

    <div class="right-panel">
      <div class="circle" v-if="enemy_leader.ability.name === 'damage-once'">
        <span>{{ enemy_leader.damage_once }}</span>
      </div>
      <div
        class="circle"
        v-else-if="enemy_leader.ability.name === 'damage-per-turn'"
      >
        <span>&#128337;1</span>
      </div>
      <div
        class="circle"
        v-else-if="enemy_leader.ability.name === 'heal-self-per-turn'"
      >
        <span>&hearts;{{ enemy_leader.heal_self_per_turn }}</span>
      </div>
      <div
        class="circle"
        v-else-if="enemy_leader.ability.name === 'decrease-all-player-damage-1'"
      >
        <span>-1&dagger;</span>
      </div>
      <div
        class="diamond"
        :style="background_color(enemy_leader)"
        v-if="enemy_leader.damage_per_turn"
      ></div>
      <h3 v-if="enemy_leader.damage_per_turn">
        <br />&dagger;{{ enemy_leader.damage_per_turn }}
      </h3>

      <div class="hp"></div>
      <h3>
        Жизни <br />
        &hearts;{{ enemy_leader.hp }}
      </h3>
    </div>

    <div class="text" v-if="enemy_leader.has_passive">
      ПАССИВНАЯ СПОСОБНОСТЬ
    </div>
    <div class="text">
      <b>СПОСОБНОСТЬ</b> - {{ enemy_leader.ability.description }}
    </div>
  </modal-window>
</template>

<script>
import { border_leader, background_color } from "@/logic/border_styles"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import ModalWindow from "@/components/ModalWindows/ModalWindow"
export default {
  name: "enemy-leader-modal",
  components: { ModalWindow, ButtonClose },
  props: {
    enemy_leader: {
      required: true,
      type: Object,
    },
  },
  methods: {
    close_self() {
      this.$emit("close_enemy_leader_modal")
    },
    border(e) {
      return border_leader(e)
    },
    background_color(e) {
      return background_color(e)
    },
  },
  emits: ["close_enemy_leader_modal"],
}
</script>

<style scoped>
.enemy_border {
  width: 65%;
  height: 60%;
  display: inline;
  float: left;
  margin-left: 1%;
  border-radius: 1%;
  margin-bottom: 1%;
}

.img {
  width: 99%;
  height: 99%;
  margin: auto;
}

.right-panel {
  width: 30%;
  height: 60%;
  display: inline;
  float: right;
  margin-bottom: 3%;
  /*border: solid 2px red;*/
}

h3 {
  display: block;
  font-size: 14pt;
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
  width: 25%;
  height: 15%;
  background: orangered;
  border-radius: 50%;
  margin: 3% auto;
}

.text {
  margin-bottom: 1%;
  font-size: 12pt;
}

span {
  position: relative;
  font-size: 22pt;
  color: white;
  margin: auto;
}
</style>
