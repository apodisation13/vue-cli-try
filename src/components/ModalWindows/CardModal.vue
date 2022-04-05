<template>
  <modal-window :style="{'backgroundColor': 'floralwhite'}" v-touch:swipe="close_self">
    <button-close @close_self="close_self" />

    <div class="enemy_border" :style="border(card)">
      <img class="img" :src="card.image" v-if="card.image" alt="">
    </div>

    <div class="damage_and_hp">
      <div class="diamond" :style="background_color(card)"></div>
      <h3> Урон <br>
        &dagger;{{ card.damage }}
      </h3>

      <div class="hp" v-if="hp_needed"></div>
      <h3 v-if="hp_needed"> Жизни <br>
        &hearts;{{ card.hp }}
      </h3>

      <div class="charges"></div>
      <h3> Заряды <br>
        {{ card.charges }}&#8607;
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
    <div class="circle" :style="{'backgroundColor': 'purple'}"
         v-else-if="card.ability.name === 'draw-one-card'">
      <span>&#127136;</span>
    </div>
    <div class="circle" :style="{'backgroundColor': 'purple'}"
         v-else-if="card.ability.name === 'give-charges-to-card-in-hand-1'">
      <span>+1&#8607;</span>
    </div>
    <br>

    <div class="text">
      СПОСОБНОСТЬ - {{ card.ability.description }}
    </div>

    <div class="text" v-if="card.has_passive">ПАССИВНАЯ СПОСОБНОСТЬ</div>
    <div class="text" v-if="card.has_passive">{{ card.passive_ability.description }}</div>


  </modal-window>
</template>

<script>
import { border_for_card, background_color } from '@/logic/border_styles'
import ButtonClose from "@/components/UI/ButtonClose"
import ModalWindow from "@/components/UI/ModalWindow"
export default {
  name: 'card-modal',
  components: {ModalWindow, ButtonClose},
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
      return border_for_card(e)
    },
    background_color(e) {
      return background_color(e)
    },
  },
  emits: [
    'close_card_modal'
  ],
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

.damage_and_hp {
  width: 30%;
  height: 60%;
  display: inline;
  float: right;
  margin-bottom: 3%;
  /*border: solid 2px red;*/
}

h3 {
  display: inline;
  font-size: 14pt;
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
  margin: auto;
}

.text {
  margin-bottom: 1%;
  font-size: 14pt;
}

</style>