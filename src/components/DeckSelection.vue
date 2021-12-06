<template>
ЩЁЛКНИТЕ НА ИКОНКУ ДЕКИ ДЛЯ ЕЁ ВЫБОРА

<div class="decks_pool_view">
  <div class="deck-view"  v-for="(deck, index) in deck_pool" :key='deck'
  @click="select_deck(index)">
    <div class="deck" >
      {{ deck.deck_name }} <br>
      Жизни деки -- {{ deck.deck_health }}
    </div>
  </div>
</div>

<div class="selected_deck" >
  <div v-if="is_selected">
    ВЫБРАННАЯ ДЕКА - <br>
  {{ deck_pool[selected_deck].deck_name }} <br>
  {{ $store.state.health }} <br>
  </div>
</div>

</template>

<script>

export default {
  data() {
    return {
      deck_pool: this.$store.state.decks,
      selected_deck: 0,  // индекс выбранной деки
      is_selected: false,  // что хоть что-то выбрано
      once_flag: false,  // флаг чтобы 1 раз добавить только базовую деку
    }
  },
  methods: {
    select_deck(id) {
      alert(id)
      this.selected_deck = id
      this.is_selected = true
      this.$store.commit('set_current_deck', this.deck_pool[this.selected_deck].deck)
      this.$store.commit('set_health', this.deck_pool[this.selected_deck].deck_health)
    },
  }

}
</script>

<style scoped>
.decks_pool_view {
  width: 800px;
  height: 330px;
  border: solid 1px black;
  margin: 10px;
  overflow: scroll;
}

.btn_save_deck {
  width: 120px;
  height: 50px;
  margin: 10px;
}

.selected_deck {
  width: 200px;
  height: 200px;
  border: solid 1px black;
  margin: 10px;
}

.deck-view {
    width: 100px;
    height: 150px;
    border: solid 1px black;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
    margin: 3px;
}

.deck {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

</style>