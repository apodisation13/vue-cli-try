<template>
<div class="card_view">
  <button class="close_button" @click="close_self">Закрыть</button>
  <br>

  <div class="card_border" :style="border(card)">
    <img class="img" :src="card.image" v-if="card.image" alt="">
  </div>

  <div class="right_panel">

  </div>

  <p>ОПИСАНИЕ</p>
<!--      <h2> Урон карты - {{ card.damage }} </h2><br>-->
<!--      <h2> Заряды карты - {{ card.charges }} </h2><br>-->
<!--      <h2> Тип абилки - {{ card.ability }} </h2><br>-->
<!--      <h3 v-if="card.type === 'Special'">sp</h3><br>-->

</div>
</template>

<script>
import { background_color } from '@/logic/border_styles'
export default {
  name: 'card-modal',
  props: {
    card: {
      required: true,
      type: Object
    },
  },
  methods: {
    close_self() {
      this.$emit('close_card_modal')
    },
    border(card) {
      if (card.color === 'Bronze') return {'border': 'solid 1px lightsalmon'}
      else if (card.color === 'Silver') return {'border': 'solid 3px silver'}
      else if (card.color === 'Gold') return {'border': 'solid 3px gold'}
      else return {}
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
  background-color: greenyellow;
  width: 100%;
  height: 98%;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

.card_border {
  width: 65%;
  height: 55%;
  display: inline;
  float: left;
  margin-left: 1%;
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
  border: solid 2px red;
}

</style>