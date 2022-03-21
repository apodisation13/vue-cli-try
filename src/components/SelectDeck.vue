<template>
  <div class="selected_deck" v-if="$store.state.current_deck.length > 0">
    ВЫБРАННАЯ ДЕКА - Жизни {{ $store.state.health }} <br>
    Лидер {{ $store.state.leader.name }}
  </div>

  <div class="deck_pool">
    ВЫБЕРЕТЕ ДЕКУ (дважды ЛКМ)<br>

    <div class="deck" :style="background_color(deck)"
         v-for="(deck, index) in decks" :key='deck'
         @dblclick="select_deck(index)"
    >

      <deck-preview-comp
        :deck="deck"
      />

    </div>
  </div>


</template>

<script>
import { background_color_deck } from '@/logic/border_styles'
export default {
  name: 'select-deck',
  data() {
    return {
      is_selected: false,  // какая-то дека выбрана
    }
  },
  methods: {
    background_color(deck) {
      return background_color_deck(deck)
    },

    // осуществить выбор деки для игры, дважды ЛКМ
    select_deck(i) {
      this.is_selected = true
      this.$store.dispatch("set_deck_in_play", {deck: this.decks[i]})
    },
  },

  computed: {
    decks() {
      return this.$store.state.decks
    }
  }
}
</script>

<style scoped>

.selected_deck {
  width: 95%;
  height: 6vh;
  border: solid 1px black;
  margin: 1%;
}

.deck_pool {
  margin: 1%;
  width: 95%;
  height: 30vh;
  border: solid 1px orchid;
  overflow: scroll;
}

.deck {
  margin: 1%;
  width: 95%;
  height: 20%;
  font-size: 10pt;
  border-radius: 5%;
  padding-left: 1%;
}

</style>