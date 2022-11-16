<template>
  <modal-window
    :style="{ backgroundColor: 'floralwhite' }"
    v-touch:swipe="close_self"
  >
    <button-close @close_self="close_self" />

    <div>
      {{ enemy.name }}
    </div>

    <div class="enemy_border" :style="border(enemy)">
      <img class="img" :src="enemy.image" v-if="enemy.image" alt="" />
    </div>

    <div class="damage_and_hp">
      <div class="circle" v-if="enemy.move.name === 'down'">
        <span>&#8595;</span>
      </div>
      <div class="circle" v-else-if="enemy.move.name === 'stand'">
        <span>&#9737;</span>
      </div>
      <div class="circle" v-else-if="enemy.move.name === 'random'">
        <span>&#9736;</span>
      </div>
      <br />

      <div class="diamond" :style="background_color(enemy)"></div>
      <h3>Урон <br />&dagger;{{ enemy.damage }}</h3>

      <div
        class="triangle"
        :style="background_color(enemy)"
        v-if="enemy.has_passive"
      ></div>
      <div
        class="text"
        :style="{ 'font-size': '20pt' }"
        v-if="enemy.has_passive"
      >
        <b>&#8987;</b>
      </div>

      <div v-if="enemy.shield" :style="{ 'font-size': '30pt' }">
        &#128737;
        <br />
        ЩИТ!
      </div>
      <div class="hp"></div>
      <h3>Жизни <br />&hearts;{{ enemy.hp }}</h3>
    </div>

    <div class="text" v-if="enemy.shield">
      <b>Щит защищает врага от урона! После попадания щит снимается</b>
    </div>

    <div class="text"><b>ХОДИТ</b> - {{ enemy.move.description }}</div>

    <div class="text" v-if="enemy.has_passive">
      <b>ПАССИВНАЯ СПОСОБНОСТЬ</b>
    </div>
    <div class="text" v-if="enemy.has_passive">
      {{ enemy.passive_ability.description }}
    </div>
  </modal-window>
</template>

<script>
import { border_for_card, background_color } from "@/logic/border_styles"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import ModalWindow from "@/components/ModalWindows/ModalWindow"
export default {
  name: "enemy-modal",
  components: { ModalWindow, ButtonClose },
  props: {
    enemy: {
      // объект противника по индексу поля
      required: true,
      type: Object,
    },
  },
  methods: {
    close_self() {
      this.$emit("close_field_modal")
    },
    border(e) {
      return border_for_card(e)
    },
    background_color(e) {
      return background_color(e)
    },
  },
  emits: ["close_field_modal"],
}
</script>

<style scoped>
h3 {
  font-size: 14pt;
  display: block;
}

.enemy_border {
  width: 65%;
  height: 55%;
  display: inline;
  float: left;
  margin-left: 1%;
  border-radius: 1%;
}

.damage_and_hp {
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

.hp {
  width: 40%;
  height: 10%;
  background-color: green;
  border-radius: 20%;
  margin: 3% auto auto;
}

.diamond {
  /*height: 12%;*/
  /*width: 36%;*/
  height: 5vh;
  width: 5vh;
  transform: rotateX(45deg) rotateZ(45deg);
  margin: 3% auto auto;
  /* background-color: purple; */
  /* border: solid 1px yellow; */
}

.triangle {
  width: 5vh;
  height: 5vh;
  border-radius: 20%;
  font-size: 10pt;
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

span {
  position: relative;
  font-size: 22pt;
  color: white;
  margin: auto;
}

.text {
  margin-bottom: 1%;
  font-size: 12pt;
}
</style>
