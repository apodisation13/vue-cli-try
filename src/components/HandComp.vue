<template>

<div class="hand" v-for="(card, index) in hand" :key='card'>

  <div v-if="card"
    @click.right="i=index, show_card_modal=true" @mouseleave="show_card_modal=false"
    @contextmenu.prevent 
    @click="chose_player_card(index)"
    
    class="hand_card"
    :style="[
      card.category == 'bronze' ? {'backgroundColor': 'lightyellow'} :
      card.category == 'silver' ? {'backgroundColor': 'silver'} :
      card.category == 'gold' ? {'backgroundColor': 'gold'} :
      {}]"
    >
      
      <p v-if="hp_needed">Жизни {{ card.hp }}</p> 
      
      {{ card.dmg }}<br>{{ card.charges }}<br>
      
      <p v-if="card.ability.heal">Лечение {{ card.ability.heal }}</p>
      <p v-if="card.ability.damage_all">УРОН!</p>  
      
      <!-- <card-modal :card='card' /> -->

  </div>
</div> 

<card-modal v-if="hand[i]" :card='hand[i]' :show_card_modal='show_card_modal' />

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
      show_card_modal: false
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

.hand_card {
    width: 100px;
    height: 150px;
    border: solid 1px black;
    border-radius: 5px;
    text-align: center;
    vertical-align: middle;
    display: table-cell;
}

</style>
