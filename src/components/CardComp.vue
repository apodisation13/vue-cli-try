<template>
  <div
      @contextmenu.prevent
      @click.right="show_modal"
      v-touch:longtap="show_modal"
  >

    <img class="img" :src="card.image" v-if="card.image" alt="">

    <div class="typee" v-if="card.type === 'Special'">
      <span :style="{'font-size': '14pt'}">&starf;</span>
    </div>

    <div class="diamond" :style="background_color(card)">
      <span class="span3">&dagger;{{ card.damage }}</span>
    </div>

    <div class="circle" :style="{'backgroundColor': 'orange'}"
         v-if="card.ability.name === 'damage-all'">
      <span>&#9850;</span>
    </div>
    <div class="circle" :style="{'backgroundColor': 'orange'}"
         v-if="card.ability.name === 'spread-damage'">
      <span :style="{'font-size': '14pt'}">&#9798;</span>
    </div>
    <div class="circle" :style="{'backgroundColor': 'green'}"
         v-else-if="card.ability.name === 'heal'">
      <span :style="{'font-size': '8pt'}">+&hearts;{{ card.heal }}</span>
    </div>
    <div class="circle" :style="{'backgroundColor': 'purple'}"
         v-else-if="card.ability.name === 'resurrect'">
      <span>&#10014;&#8680;</span>
    </div>
    <div class="circle" :style="{'backgroundColor': 'purple'}"
         v-else-if="
            card.ability.name === 'draw-one-card' ||
            card.ability.name === 'play-from-deck' ||
            card.ability.name === 'play-from-grave'
         ">
      <span>&#127136;</span>
    </div>
    <div class="circle" :style="{'backgroundColor': 'purple'}"
         v-else-if="card.ability.name === 'give-charges-to-card-in-hand-1'">
      <span>+1&#8607;</span>
    </div>

    <div class="triangle" v-if="card.has_passive" :style="background_color(card)">
      <span>&#8987;</span>
    </div>
    <div class="charges">
      <span>{{ card.charges }}&#8607;</span>
    </div>

    <div class="hp" v-if="hp_needed">
      <span>&hearts;{{ card.hp }}</span>
    </div>

    <card-modal v-if="show_card_modal"
      :card='card'
      :hp_needed="hp_needed"
      @close_card_modal="show_card_modal=false"
    />

  </div>
</template>

<script>
import { background_color } from '@/logic/border_styles'
import CardModal from "@/components/ModalWindows/CardModal"
export default {
  name: 'card-comp',
  components: {CardModal},
  props: {
    card: {
      type: Object,
      required: true,
    },
    hp_needed: {  // hp только для декбилдера, для игры не нужно оно
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show_card_modal: false,
    }
  },
  methods: {
    background_color(card) {
      return background_color(card)
    },
    show_modal() {
      this.show_card_modal = true
    },
  },
}
</script>

<style scoped>
.img {
  width: 99%;
  height: 99%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.diamond {
  position: absolute;
  top: 1%;
  right: 6%;
  height: 4vh;
  width: 4vh;
  transform: rotateX(45deg) rotateZ(45deg);
  /* background-color: purple; */
  /* border: solid 1px yellow; */
}

.span3 {
  position: absolute;
  /*transform: translate(-50%, -50%);*/
  top: 25%;
  right: 2%;
  color: whitesmoke;
  font-size: 11pt;
  transform:  rotateZ(-45deg);
}

.circle {
  position: absolute;
  width: 34%;
  height: 4vh;
  border-radius: 50%;
  top: 30%;
  right: 3%;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10pt;
}

.charges {
  width: 20%;
  height: 20%;
  background-color: hotpink;
  position: absolute;
  bottom: 2%;
  right: 2%;
  border-radius: 20%;
}

.triangle {
  width: 15%;
  height: 15%;
  position: absolute;
  bottom: 25%;
  right: 2%;
  border-radius: 20%;
  font-size: 10pt;
}

.hp {
  width: 30%;
  height: 20%;
  background-color: green;
  position: absolute;
  bottom: 2%;
  left: 2%;
  border-radius: 20%;
}

.typee {
  width: 10%;
  height: 10%;
  left: 1%;
  top: 1%;
  position: absolute;
}
</style>