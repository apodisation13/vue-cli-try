<template>
  <div :class="deckbuilder ? 'deck_pool_for_deckbuilder' : 'deck_pool' ">
    ВЫБЕРЕТЕ ДЕКУ (дважды ЛКМ)<br>

    <div class="deck"
         :style="background_color(deck)"
         v-for="(deck, index) in decks" :key='deck'
         @dblclick="select_deck(index)"
    >

      <deck-preview-comp :deck="deck" />

      <button v-if="deckbuilder && deck.id !== 1"
        @click="change_deck(deck)"
      >Изменить</button>

      <button v-if="deckbuilder && deck.id !== 1"
        @click="delete_deck(deck)"
      >Удалить</button>

    </div>

    <yesno-modal
        :visible='show_yesno'
        @confirm='confirm_delete'
        @cancel='cancel_delete'
    />
  </div>
</template>

<script>
import { background_color_deck } from '@/logic/border_styles'
import DeckPreviewComp from "@/components/DeckPreviewComp"
import YesnoModal from "@/components/ModalWindows/YesnoModal"
export default {
  name: 'deck-selection',
  components: {YesnoModal, DeckPreviewComp},
  props: {
    deckbuilder: {  // отображать или нет выбранная дека, отображать или нет кнопки изменить\удалить
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      is_selected: false,  // хоть какая-то дека выбрана
      show_yesno: false, // показать да\нет по кнопке удалить деку
      deck_id: undefined, // id деки, которую надо удалить
    }
  },
  methods: {
    background_color(deck) {
      return background_color_deck(deck)
    },

    // осуществить выбор деки для игры, дважды ЛКМ
    select_deck(i) {
      this.is_selected = true
      this.$store.dispatch("set_deck_in_play", this.decks[i])
    },

    delete_deck(deck) {
      this.show_yesno = true
      this.deck_id = deck.id  // запоминаем id деки, которую надо удалить
    },

    confirm_delete() {
      this.show_yesno = false
      this.$store.dispatch("delete_deck", this.deck_id)
    },

    cancel_delete() {
      this.show_yesno = false
    },

    change_deck(deck) {
      alert(deck.id)
    },
  },

  computed: {
    decks() {
      return this.$store.state.decks
    },
  },

  emits: ['emit_state_deck_index'],
}
</script>

<style scoped>

.deck_pool {
  margin: 1%;
  width: 95%;
  height: 30vh;
  border: solid 1px orchid;
  overflow: scroll;
}

.deck_pool_for_deckbuilder {
  margin: 1%;
  width: 95%;
  height: 80vh;
  border: solid 1px orchid;
  overflow: scroll;
}

.deck {
  width: 95%;
  height: 6vh;
  font-size: 10pt;
  border-radius: 5%;
  padding-left: 1%;
  margin: 1% 1% 3%;
}

</style>