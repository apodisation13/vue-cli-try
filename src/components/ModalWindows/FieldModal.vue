<template>
<div class="field_view">
  <button class="close_button" @click="close_self">Закрыть</button>
  <br>

  <div class="enemy_border" :style="border(enemy)">
    <img class="img" :src="enemy.image" v-if="enemy.image" alt="">
  </div>

  <div class="damage_and_hp">
    <div class="diamond" :style="background_color(enemy)"></div>
    <h3> Урон
      <br>&dagger;{{ enemy.damage }}
    </h3>


    <div class="hp"></div>
    <h3> Жизни
      <br>&hearts;{{ enemy.hp }}
    </h3>
  </div>

  <div class="circle" v-if="enemy.move.name==='down'">
    <span>&#8595;</span>
  </div>
  <div class="circle" v-else-if="enemy.move.name==='stand'">
    <span>&#9737;</span>
  </div>
  <div class="circle" v-else-if="enemy.move.name==='random'">
    <span>&#9736;</span>
  </div><br>
  <p> {{ enemy.move.description }} </p>
 </div>
</template>

<script>
import { border, background_color } from '@/logic/border_styles'
export default {
  name: 'field-modal',
  props: {
    enemy: {  // объект противника по индексу поля
      required: true,
      type: Object
    },
  },
  methods: {
    close_self() {
      this.$emit('close_field_modal')
    },
    border(e) {
      return border(e)
    },
    background_color(e) {
      return background_color(e)
    },
  },
  emits: [
    'close_field_modal'
  ],
}
</script>

<style scoped>

.field_view {
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

.close_button {
  margin-top: 2%;
  width: 20%;
  height: 5%;
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

.circle {
  display: inline-grid;
  width: 14%;
  height: 7%;
  background: orangered;
  border-radius: 50%;
  margin: 3% auto;
}

span {
  position: relative;
  font-size: 22pt;
  color: white;
}


</style>