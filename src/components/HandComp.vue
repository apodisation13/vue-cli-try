<template>

<div class="hand" v-for="(card, index) in hand" :key='card'>
  <p v-if="card.category==='bronze'" @click="chose_player_card(index)">
    <button @contextmenu.prevent class="bronze_hand_card">
      {{ card.dmg }}<br>{{ card.charges }} 
      <card-modal :handindex='hand[index]' />
    </button>
  </p>
  <p v-if="card.category==='silver'" @click="chose_player_card(index)">
    <button @contextmenu.prevent class="silver_hand_card">
      {{ card.dmg }}<br>{{ card.charges }} 
      <card-modal :handindex='hand[index]' />
    </button>
  </p>
  <p v-if="card.category==='gold'" @click="chose_player_card(index)">
    <button @contextmenu.prevent class="gold_hand_card">
      {{ card.dmg }}<br>{{ card.charges }} 
      <card-modal :handindex='hand[index]' />
    </button>
  </p>
</div>  

</template>

<script>


export default {
  name: 'hand-comp',
  props: {
    hand: {
      required: true,
      type: Array
    },
  },
  methods: {
    chose_player_card(id) {
      this.index = id
      this.$emit('chose_player_card', this.index)  // передаём this.index по эмиту 
    },  
  },
  data() {
    return {
      index: null  // данные для передачи наверх
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
    margin: 3px;  /*отступ между картами*/
}

.bronze_hand_card {
    width: 100px;
    height: 150px;
    background: lightyellow;
}

.silver_hand_card {
    width: 100px;
    height: 150px;
    background: silver;
}

.gold_hand_card {
    width: 100px;
    height: 150px;
    background: gold;
}

</style>
