<template>

<div class="hand" v-for="(card, index) in hand" :key='card'>

  <div v-if="card" 
    @contextmenu.prevent 
    @click.right="i=index, show_card_modal=true" @mouseleave="show_card_modal=false"
    @click="chose_player_card(index)"
    class="hand_card" :style="border(card)"
    >
    
    <img class="img" :src="card.image" v-if="card.image">
    <div class="box">
      
      <div class="typee" v-if="card.type == 'Special'">
        <span>&starf;</span>
      </div>
      
      <div class="diamond3" :style="background_color(card)">
        <span3>&dagger;{{ card.damage }}</span3>
      </div>
      
      <div class="circle" v-if="card.ability == 'damage-all'">
        <span>&#9850;</span>
      </div>
      <div class="circle" v-if="card.ability == 'heal'">
        <span :style="{'font-size': '10pt'}">+&hearts;{{ card.heal }}</span>
      </div>
      
      <div class="charges">
        <span>{{ card.charges }}</span>
      </div>
      
      <div class="hp" v-if="hp_needed">
        <span :style="{'font-size': '11pt'}">&hearts;{{ card.hp }}</span>
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
    border(card) {
      if (card.color == 'Bronze') return {'border': 'solid 3px lightsalmon'}
      else if (card.color == 'Silver') return {'border': 'solid 4px silver'}
      else if (card.color == 'Gold') return {'border': 'solid 5px gold'}
      else return {}
    }, 
    background_color(card) {
      if (card.faction == 'Soldiers') return {'backgroundColor': 'blue'}
      else if (card.faction == 'Monsters') return {'backgroundColor': 'red'}
      else if (card.faction == 'Animals') return {'backgroundColor': 'green'}
      else return {}
    },
  },
  emits: [
    'chose_player_card', 
  ],
}
</script>

<style scoped>

/*класс кннопка карта игрока*/
.hand {
    display: inline-block;  /*элементы в ряд*/
    margin: 2px 100px 160px 20px;
}

.hand_card {
    width: 100px;
    height: 150px;
    border-radius: 5px;
    position: absolute;
    border: solid 2px black;
}

.box { 
  margin: -150px;
}

.img {
  width: 94px;
  height: 144px;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.typee {
  width: 20%;
  height: 20%;
  left: 1%;
  top: 1%; 
  position: absolute;
}

.charges {
  width: 20%;
  height: 20%;
  /* border: solid green; */
  background-color: hotpink;
  position: absolute;
  bottom: 2%;
  right: 5%;
  border-radius: 2px;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 14pt;
}

.hp {
  width: 35%;
  height: 20%;
  /* border: solid green; */
  background-color: lawngreen;
  position: absolute;
  bottom: 2%;
  left: 5%;
  border-radius: 2px;
}

.circle {
  position: absolute;
  width: 40px;
  height: 40px;
  background: orange;
  border-radius: 50%;
  /* margin: 30px 50px; */
  top: 30%;
  right: 3%;
}

.diamond3 {
  position: absolute;
  /* margin: -10px 50px; */
  top: 0;
  right: 8%;
  height: 40px;
  width: 40px;
  transform: rotateX(45deg) rotateZ(45deg);
  /* box-shadow: 0px 0px 12px red; */
  /* background-color: purple; */
  /* border: solid 2px yellow; */
}

span3 {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 15%;
  right: 15%;
  color: black;
  font-size: 15pt;
  transform:  rotateZ(-45deg);
}

</style>
