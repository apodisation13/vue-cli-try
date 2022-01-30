<template>

<div class="hand" v-for="(card, index) in hand" :key='card'>

  <div v-if="card"
    @click.right="i=index, show_card_modal=true" @mouseleave="show_card_modal=false"
    @contextmenu.prevent 
    @click="chose_player_card(index)"
    
    class="hand_card"
    :style="[
        card.color == 'Bronze' ? {'border': 'solid 3px lightsalmon'} :
        card.color == 'Silver' ? {'border': 'solid 4px silver'} :
        card.color == 'Gold' ? {'border': 'solid 5px gold'} :
        {}]"
    >
      <div class="typee" v-if="card.type == 'Special'">
        <span>&starf;</span>
      </div>
      
      <div class="diamond3" 
      :style="['diamond3', (
        card.faction == 'Soldiers' ? {'backgroundColor': 'blue'} :
        card.faction == 'Monsters' ? {'backgroundColor': 'red'} :
        card.faction == 'Animals' ? {'backgroundColor': 'green'} :
        {})
      ]"
      >
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
  methods: {
    get_index(i) {
      return i
    },
    chose_player_card(id) {
      // alert(id)
      this.i = id
      this.$emit('chose_player_card', this.i)  // передаём this.index по эмиту 
    }, 
  },
  data() {
    return {
      i: null,  // данные для передачи наверх
      show_card_modal: false,
    }
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
  margin: 30px 50px;
}

.diamond3 {
  position: relative;
  margin: -10px 50px;
  top: 10%;
  right: 5%;
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
