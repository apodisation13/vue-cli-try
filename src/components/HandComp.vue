<template>
<div class="hand" >

  <div class="card" :style="border(card, index)"
  v-for="(card, index) in hand" :key='index'>

    <div 
      @contextmenu.prevent 
      @click.right="i=index; show_card_modal=true" @mouseleave="show_card_modal=false"
      @click="chose_player_card(index)"
      >
    
    <img class="img" :src="card.image" v-if="card.image" alt="">
      
    <div class="typee" v-if="card.type === 'Special'">
      <span>&starf;</span>
    </div>
    
    <div class="diamond" :style="background_color(card)">
      <span3>&dagger;{{ card.damage }}</span3>
    </div>
    
    <div class="circle" :style="{'backgroundColor': 'orange'}"
    v-if="card.ability === 'damage-all'">
      <span>&#9850;</span>
    </div>
    <div class="circle" :style="{'backgroundColor': 'green'}"
    v-if="card.ability === 'heal'">
      <span>+&hearts;{{ card.heal }}</span>
    </div>
    
    <div class="charges">
      <span>{{ card.charges }}</span>
    </div>
      
    <div class="hp" v-if="hp_needed">
      <span>&hearts;{{ card.hp }}</span>
    </div>  
  
    
  </div>
</div>
</div>

<card-modal 
v-if="hand[i]" 
:card='hand[i]' 
:show_card_modal='show_card_modal'
/>

</template>

<script>
import { border, background_color } from '@/logic/border_styles'

export default {
  name: 'hand-comp',
  props: {
    hand: {
      required: true,
      type: Array
    },
    hp_needed: {  // hp только для декбилдера, для игры не нужно оно
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      i: null,  // данные для передачи наверх
      show_card_modal: false,
    }
  },
  methods: {
    chose_player_card(id) {
      this.i = id
      this.$emit('chose_player_card', this.i)  // передаём this.index по эмиту 
    },
    border(card, index) {
      return border(card, index)
    },
    background_color(card) {
      return background_color(card)
    },
  },
  emits: [
    'chose_player_card', 
  ],
}
</script>

<style scoped>

.hand {
  width: 98%;
  height: 21vh;
  /* border: solid 1px blue; */
  clear: both;
  overflow: auto;
  white-space: nowrap;
}

.card {
  width: 26%;
  height: 18.5vh;
  /* border: solid 3px gold; */
  border-radius: 2%;
  display: inline-block;
  margin-right: -12%;
  margin-left: 0.5%;
  margin-top: 0.1%;
  position: relative;
}

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

span3 {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 25%;
  right: 2%;
  color: black;
  font-size: 10pt;
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
  font-size: 8pt;
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
