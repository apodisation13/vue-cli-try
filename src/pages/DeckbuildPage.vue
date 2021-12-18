<template>

<div class="deck_selection">
  <deck-selection />
</div>

<a v-once>{{ get() }}</a>
<div class="card_pool_view">
  <hand-comp :hand='pool' :hp_needed=true
  @chose_player_card='append_into_deck_in_progress' />
</div>

<div class="deck_build_view">
  <hand-comp :hand='deck_is_progress' :hp_needed=true
  @chose_player_card='delete_from_deck_in_progress' />
</div>

Размер деки: {{ deck_is_progress.length }}/{{ number_of_cards_in_deck }} <br>
Жизни деки: {{ health }}<br>

<button class="btn_save_deck" @click="save_deck"
:style="[
deck_is_progress.length < number_of_cards_in_deck ? 
{'backgroundColor': 'red'} : 
{'backgroundColor': 'green'}
]">
  СОХРАНИТЬ ДЕКУ
</button>

</template>

<script>
import DeckSelection from '@/components/DeckSelection'

export default {
  components: {
    DeckSelection,
  },
  data() {
    return {
      pool: [],
      deck_is_progress: [],
      number_of_cards_in_deck: 10,  // Определяет количество карт в деке
      number: 1,  // для сохранения деки имя1, имя2, имя3 итп
      health: 0,  // жизни текущей деки
   }
  },
  methods: {
    get() {
      let url = 'http://127.0.0.1:8000/api/v1/cards/'
      fetch(url) 
        .then((response) => response.json()) 
        .then((result) => {
          this.pool = result
        });
    },

    append_into_deck_in_progress(index) {
      if (
        !this.deck_is_progress.includes(this.pool[index]) 
        && this.deck_is_progress.length < this.number_of_cards_in_deck
        ) 
        {
          this.deck_is_progress.push(this.pool[index])
          this.health = this.health + this.pool[index].hp
      }
      else {alert('нельзя карту добавить ещё раз')}
    },

    delete_from_deck_in_progress(id) {
      this.health -= this.deck_is_progress[id].hp
      this.deck_is_progress.splice(id, 1)
    },

    save_deck() {
      if (this.deck_is_progress.length >= this.number_of_cards_in_deck) {
        // this.$store.commit('set_current_deck', this.deck_is_progress)
        
        // сохраняем деку в базу дек 
        let dict = {
          'deck_name': `deck${this.number}`,
          'deck': this.deck_is_progress,
          'deck_health': this.health
           }
        this.$store.commit('append_into_decks', dict)
        this.number += 1  // +1 для следующего имени деки
        this.deck_is_progress = []  // убрать всё из поля сборки деки
        this.health = 0
        alert('сохранили')
      }
      else {alert('в деке должно быть минимум 10 карт')}
    },
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

.deck_selection {
  width: 700px;
  height: 600px;
  border: solid 1px black;
  overflow: scroll;
  position: absolute;
  top: 80px;
  right: 20px;
}

</style>