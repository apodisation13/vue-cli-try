<template>
  <div class="field_view">
    <button class="close_button" @click="close_self">Закрыть</button>
    <br>

    <div class="enemy_border" :style="border(card)">
      <img class="img" :src="card.image" v-if="card.image" alt="">
    </div>

    <div class="damage_and_hp">
      <div class="diamond" :style="background_color(card)"></div>
      <h3> Урон
        <br>&dagger;{{ card.damage }}
      </h3>

      <div class="hp" v-if="hp_needed"></div>
      <h3 v-if="hp_needed"> Жизни
        <br>&hearts;{{ card.hp }}
      </h3>

      <div class="charges"></div>
      <h3> Заряды
        <br>{{ card.charges }}
      </h3>
    </div>

    <div class="circle" :style="{'backgroundColor': 'orange'}"
         v-if="card.ability.name === 'damage-all'">
      <span>&#9850;</span>
    </div>
    <div class="circle" :style="{'backgroundColor': 'green'}"
         v-else-if="card.ability.name === 'heal'">
      <span :style="{'font-size': '12pt'}">+&hearts;{{ card.heal }}</span>
    </div>
    <div class="circle" :style="{'backgroundColor': 'purple'}"
         v-else-if="card.ability.name === 'resurrect'">
      <span>&#10014;&#8680;</span>
    </div>
    <br>
    <p> {{ card.ability.description }} </p>

  </div>
</template>

<script>
import { border, background_color } from '@/logic/border_styles'
export default {
  name: 'card-modal',
  props: {
    card: {  // объект противника по индексу поля
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
    border(e) {
      return border(e)
    },
    background_color(e) {
      return background_color(e)
    },
    emits: ['close_card_modal']
  },
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

.charges {
  width: 20%;
  height: 10%;
  background-color: hotpink;
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