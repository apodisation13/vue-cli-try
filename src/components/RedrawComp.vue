<template>
  <modal-window class="redraw-modal-window"
    v-if="visible" >
    <button-close @close_self="close_self" />

    <card-list-component :cards="hand" @chose_player_card="chose_player_card" />

    <div>
      <h1>Изменить карту можно ещё {{ redraws }} раз</h1>
    </div>
    <h2>В колоде осталось ещё {{ deck.length }} карт</h2>
    <card-list-component :cards="deck" />
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindows/ModalWindow"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import { choice } from "@/lib/utils"
import CardListComponent from "@/components/CardListComponent"
export default {
  name: "redraw-comp",
  components: { CardListComponent, ButtonClose, ModalWindow },
  data() {
    return {
      visible: true,
      redraws: 3,
      hand: this.gameObj.hand.slice(),
      deck: this.gameObj.deck.slice(),
      redraw_array: [],
    }
  },
  props: {
    gameObj: {
      required: true,
      type: Object,
    },
  },
  created() {
    if (!this.gameObj.deck.length) this.close_self()
  },
  methods: {
    close_self() {
      this.visible = false

      this.redraw_array.forEach(element => {
        this.deck.push(element) // вернуть в деку карты
      })

      this.$emit("redraw_finished", {
        deck: this.deck,
        hand: this.hand,
      })
    },

    chose_player_card(card) {
      this.redraws -= 1
      this.redraw_array.push(card) // добавили карту в темп-список
      let random = choice(this.deck)
      // заменяем ту карту, на которую ткнули, на новую случайную карту из колоды
      this.hand.splice(this.hand.indexOf(card), 1, this.deck[random])
      this.deck.splice(random, 1) // удалить этот i-й элемент
      if (this.redraws === 0 || !this.deck.length) this.close_self()
    },
  },
}
</script>

<style scoped>
.redraw-modal-window {
  overflow-y: scroll ;
}

</style>
