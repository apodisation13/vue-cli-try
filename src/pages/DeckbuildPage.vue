<template>
  <div class="card_pool_view">
    <hand-comp :hand='deck' :hp_needed=true
    @chose_player_card='chose_player_card' />
  </div>

  <div class="deck_build_view">
    <hand-comp :hand='real_deck'/>
  </div>

  Размер деки: {{ real_deck.length }}/{{ number_of_card_in_deck }} <br>
  Жизни деки: {{ $store.state.health }}<br>

  <button class="btn_save_deck" @click="save_deck"
  :style="[
  real_deck.length < number_of_card_in_deck ? 
  {'backgroundColor': 'red'} : 
  {'backgroundColor': 'green'}
  ]">
    СОХРАНИТЬ ДЕКУ
  </button>

</template>

<script>
import { DECK, } from '@/logic/draw_hand'

export default {
  data() {
    return {
      deck: DECK,
      real_deck: [],
      number_of_card_in_deck: 10,  // Определяет количество карт в деке
    }
  },
  methods: {
    chose_player_card(index) {
      if (
        !this.real_deck.includes(this.deck[index]) 
        && this.real_deck.length < this.number_of_card_in_deck
        ) 
        {
          this.real_deck.push(this.deck[index])
          this.$store.commit('change_health', this.deck[index].hp)
      }
      else {alert('нельзя карту добавить ещё раз')}
    },
    save_deck() {
      if (this.real_deck.length >= this.number_of_card_in_deck) {
        this.$store.commit('set_current_deck', this.real_deck)
        alert('сохранили')
      }
      else {alert('в деке должно быть минимум 10 карт')}
    }
  }
}
</script>

<style scoped>
.card_pool_view {
  width: 800px;
  height: 330px;
  border: solid 1px black;
  margin: 10px;
  overflow: scroll;
}

.deck_build_view {
  width: 800px;
  height: 180px;
  border: solid 1px black;
  margin: 10px;
  overflow: scroll;
}

.btn_save_deck {
  width: 100px;
  height: 50px;
}
</style>