<template>
<div class="card_view">
  <button class="close_button" @click="close_self">Закрыть</button>
  <br>

  <div class="card_border" :style="border(card)">
    <img class="img" :src="card.image" v-if="card.image" alt="">
  </div>

  <div class="right_panel">

    <div class="diamond" :style="background_color(card)"></div>
    <h3> Урон
      <br>&dagger;{{ card.damage }}
    </h3>
    <br><br>

<!--    <div class="hp" v-if="hp_needed" ></div>-->
<!--    <h3 v-if="hp_needed"> Жизни-->
<!--      <br>&hearts;{{ card.hp }}-->
<!--    </h3>-->
<!--    <br><br>-->

    <div class="charges"></div>
    <h3> Заряды
      <br>{{ card.charges }}
    </h3>

  </div>
  <br><br><br><br><br><br>
  <br><br>



  <div class="circle" v-if="card.ability.name==='damage-one'">
    <span>&#8595;</span>
  </div>
  <p> {{ card.ability.description }} </p>


<!--      <h3 v-if="card.type === 'Special'">sp</h3><br>-->

</div>
</template>

<script>
import { border, background_color } from '@/logic/border_styles'
export default {
  name: 'card-modal',
  props: {
    card: {
      required: true,
      type: Object
    },
    hp_needed: {  // hp только для декбилдера, для игры не нужно оно
      type: Boolean,
      default: false
    },
  },
  methods: {
    close_self() {
      this.$emit('close_card_modal')
    },
    border(card) {
      return border(card)
    },
    background_color(card) {
      return background_color(card)
    },
  },
  emits: [
      'close_card_modal',
  ],
}
</script>

<style scoped>

.card_view {
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
  margin-top: 4%;
  font-size: 12pt;
  white-space: normal;
}

.card_border {
  width: 65%;
  height: 55%;
  display: inline;
  float: left;
  margin-left: 1%;
  border-radius: 1%;
}

.img {
  width: 99%;
  height: 99%;
  margin: auto;
}

.right_panel {
  width: 30%;
  height: 55%;
  display: inline;
  float: right;
  margin-bottom: 3%;
  /*border: solid 2px red;*/
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

.charges {
  width: 20%;
  height: 10%;
  background-color: hotpink;
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
  position: relative;
}

span {
  position: relative;
  font-size: 22pt;
  color: white;
}

</style>