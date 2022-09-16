<template>
  <modal-window v-if="visible">
    <button-close @close_self="close_self" />

    <div>
      <cards-list
        :cards="hand_current"
        @chose_player_card="chose_player_card"
      />
    </div>

    <div>
      <h1>Изменить карту можно ещё {{ redraws }} раз</h1>
    </div>
    <h2>В колоде осталось ещё {{ deck_current.length }} карт</h2>
    <cards-list :cards="deck_current" />
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/UI/ModalWindow"
import CardsList from "@/components/CardsList"
import ButtonClose from "@/components/UI/ButtonClose"
export default {
  name: "redraw-modal",
  components: { ButtonClose, CardsList, ModalWindow },
  data() {
    return {
      visible: true,
      redraws: 3,
      hand_current: this.hand.slice(),
      deck_current: this.deck.slice(),
      redraw_array: [],
    }
  },
  props: {
    deck: {
      required: true,
      type: Array,
    },
    hand: {
      required: true,
      type: Array,
    },
  },
  created() {
    if (!this.deck.length) this.close_self()
  },
  methods: {
    close_self() {
      this.visible = false

      this.redraw_array.forEach(element => {
        this.deck_current.push(element) // вернуть в деку карты
      })

      this.$emit("redraw_finished", {
        deck: this.deck_current,
        hand: this.hand_current,
      })
    },

    chose_player_card(card) {
      this.redraws -= 1

      this.redraw_array.push(card) // добавили карту в темп-список
      let random = Math.floor(Math.random() * this.deck_current.length)
      this.hand_current.splice(
        this.hand_current.indexOf(card),
        1,
        this.deck_current[random]
      ) // обновить
      this.deck_current.splice(random, 1) // удалить этот i-й элемент

      if (this.redraws === 0 || !this.deck_current.length) this.close_self()
    },
  },
}
</script>

<style scoped></style>
